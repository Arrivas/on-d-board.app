import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import { Bedspaces } from "../../../App";
import SafeScreenView from "../../SafeScreenView";
import colors from "../../../config/colors";
import { formatAsCurrency } from "../../../functions/formatAsCurrency";
import Icon from "../../Icon";
import ApartmentSpecifications from "../book/ApartmentSpecifications";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setLoading } from "../../../store/loadingSlice";
import { addBooking } from "../../../store/bookingSlice";

const ApartmentBooking = ({ route, navigation }: any) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [bedspaces, setBedspaces] = useState<Bedspaces[] | null | undefined>(
    null
  );
  const [selectedBedspace, setSelectedBedspace] = useState<Bedspaces>();
  const { apartmentRoomsId } = route.params;
  const dispatch = useDispatch();
  const [isBooked, setIsBooked] = useState(false);

  const fetchBedspaces = async (): Promise<Bedspaces[] | null | undefined> => {
    dispatch(setLoading(true));
    const query = firebase
      .firestore()
      .collection("apartmentRooms")
      .doc(apartmentRoomsId);
    try {
      const snapshot = await query.get();
      dispatch(setLoading(false));
      if (!snapshot.exists) return;
      return snapshot.data()?.bedspaces;
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchBedspaces().then((res: Bedspaces[] | null | undefined) =>
        setBedspaces(res)
      );
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const isDoubleDeck =
    selectedBedspace && selectedBedspace?.bedspace.bedInformation?.isDoubleDeck;
  const bedLocation =
    selectedBedspace && selectedBedspace.bedspace.bedInformation?.location;
  const price = selectedBedspace && selectedBedspace?.bedspace.price;

  const handleBook = async () => {
    setIsBooked(true);
    const pending: any = {
      bookingDetails: {
        apartmentName: selectedBedspace?.bedspace.apartmentName,
        bedInformation: selectedBedspace?.bedspace.bedInformation,
        imgUrl: selectedBedspace?.bedspace.imgUrl,
        name: selectedBedspace?.bedspace.name,
        price: selectedBedspace?.bedspace.price,
        bookingStatus: "pending",
        cancelledBy: "",
        cancellationDate: "",
      },
      tenantDetails: {
        imageUrl: user?.imageUrl,
        firstName: user?.firstName,
        lastName: user?.lastName,
        phoneNumber: user?.phoneNumber,
        uid: user?.uid,
        tenantDocId: user?.docId,
      },
      apartmentRoomsId,
      apartmentBookDocId: "",
      tenantBookDocId: "",
    };

    await firebase
      .firestore()
      .collection("tenants")
      .doc(user.docId)
      .collection("bookings")
      .add(pending)
      .then((res) => {
        (pending.createdAt = new Date(
          firebase.firestore.Timestamp.now().seconds * 1000
        ).toISOString()),
          (pending.tenantBookDocId = res.id);
        res.update({
          tenantBookDocId: res.id,
          createdAt: new Date(
            firebase.firestore.Timestamp.now().seconds * 1000
          ).toISOString(),
        });
      });

    dispatch(addBooking(pending));
    dispatch(setLoading(true));
    let apartmentBookDocId = "";

    await firebase
      .firestore()
      .collection("apartmentRooms")
      .doc(apartmentRoomsId)
      .collection("bookings")
      .add(pending)
      .then(async (res) => {
        dispatch(setLoading(false));
        apartmentBookDocId = res.id;

        res.update({
          apartmentBookDocId,
          createdAt: new Date(
            firebase.firestore.Timestamp.now().seconds * 1000
          ).toISOString(),
        });
        pending.apartmentRoomsId = res.id;
      });

    if (bedspaces) {
      const selectedBedspaceName = selectedBedspace?.bedspace.name;
      const index = bedspaces.findIndex(
        (item) => item.bedspace.name === selectedBedspaceName
      );

      if (index !== undefined && index >= 0) {
        bedspaces[index].bedspace.isAvailable = false;
      }
    }
    await firebase
      .firestore()
      .collection("tenants")
      .doc(user.docId)
      .collection("bookings")
      .doc(pending.tenantBookDocId)
      .update({ apartmentBookDocId });

    await firebase
      .firestore()
      .collection("apartmentRooms")
      .doc(apartmentRoomsId)
      .update({ bedspaces })
      .then(() => {
        navigation.replace("SuccessPage", { pending });
      })
      .catch(() => {
        dispatch(setLoading(false));
        ToastAndroid.show(
          "cannot finish booking, something went wrong!",
          ToastAndroid.SHORT
        );
      });

    dispatch(setLoading(false));
  };

  return (
    <SafeScreenView>
      <View className="flex-1 px-4">
        {bedspaces?.length !== undefined && (
          <Text className="font-semibold my-1">available bedspace</Text>
        )}
        <View className="flex flex-row flex-wrap">
          {bedspaces?.map((item) => (
            <TouchableNativeFeedback
              disabled={!item.bedspace.isAvailable}
              onPress={() => setSelectedBedspace(item)}
              key={item.bedspace.name}
            >
              <View
                className="bg-gray-200 p-3 px-4 mr-2 mb-2 rounded-md"
                style={{
                  backgroundColor:
                    selectedBedspace?.bedspace.name === item.bedspace?.name
                      ? colors.primary
                      : item.bedspace.isAvailable
                      ? "#e7e9ed"
                      : "#eee",
                }}
              >
                <Text
                  className={` ${
                    selectedBedspace?.bedspace.name === item.bedspace.name
                      ? "text-white"
                      : item.bedspace.isAvailable
                      ? "text-black"
                      : "text-gray-300"
                  } font-semibold`}
                >
                  {item.bedspace.name}
                </Text>
              </View>
            </TouchableNativeFeedback>
          ))}
        </View>
        {/* preview */}
        <ScrollView className="mb-1">
          {selectedBedspace?.bedspace?.imgUrl && (
            <View className="">
              <Text className="font-semibold mb-1">preview</Text>
              <Image
                className="w-auto object-cover rounded-md h-[220px]"
                resizeMode="cover"
                source={{
                  uri: selectedBedspace?.bedspace?.imgUrl,
                }}
              />

              <ApartmentSpecifications
                additionalStyle="my-2 py-3"
                specifications={[
                  {
                    label: isDoubleDeck ? "Double Deck" : "Single Bed",
                    icon: isDoubleDeck ? (
                      <Icon
                        materialComName="bunk-bed-outline"
                        iconLibrary="MaterialCommunityIcons"
                      />
                    ) : (
                      <Icon
                        materialComName="bed"
                        iconLibrary="MaterialCommunityIcons"
                      />
                    ),
                  },
                  {
                    label:
                      bedLocation === "Upper Deck"
                        ? "Upper Deck"
                        : bedLocation === "Lower Deck"
                        ? "Lower Deck"
                        : "",
                    icon:
                      bedLocation === "Upper Deck" ? (
                        <Icon
                          FAName="long-arrow-up"
                          iconLibrary="FontAwesome"
                        />
                      ) : bedLocation === "Lower Deck" ? (
                        <Icon
                          FAName="long-arrow-down"
                          iconLibrary="FontAwesome"
                        />
                      ) : null,
                  },
                ]}
              />
              <View className="bg-yellow-100 p-4 rounded-md">
                <Text className="italic">
                  You must arrive within 72 hours prior to the booking, or else
                  the reservation will be automatically cancelled.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* reserve now */}
        {/* @ts-ignore */}
        {price && user !== "anonymous" ? (
          <View className="flex-row items-center justify-center space-x-2">
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#EEE", false)}
            >
              <View
                className="bg-white border-t-0 rounded-md p-2 mb-3 mt-1 flex-1"
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,

                  elevation: 2,
                }}
              >
                <View className="flex-row justify-between">
                  <View>
                    <Text className="text-green-700 font-bold text-lg">
                      {formatAsCurrency(
                        Number(selectedBedspace?.bedspace.price)
                      )}
                    </Text>
                    <Text className="text-xs text-gray-400">total price</Text>
                  </View>
                </View>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback disabled={isBooked} onPress={handleBook}>
              <View
                className="flex-row items-center bg-[#ff6666] px-2 rounded-md ml-1 mb-2 justify-center"
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                  paddingVertical: 20,
                }}
              >
                <Text className="font-bold text-white">Reserve Now</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        ) : (
          <></>
        )}
      </View>
      {/* show empty */}
      {bedspaces === undefined && (
        <View className="absolute left-0 h-full w-full items-center justify-center opacity-40 ">
          <Text className="font-semibold text-gray-500">
            no bedspaces available yet
          </Text>
        </View>
      )}
    </SafeScreenView>
  );
};

export default ApartmentBooking;
