import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  ScrollView,
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
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const ApartmentBooking = ({ route, navigation }: any) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [bedspaces, setBedspaces] = useState<Bedspaces[] | null | undefined>(
    null
  );
  const [selectedBedspace, setSelectedBedspace] = useState<Bedspaces>();
  const { docId } = route.params;

  const fetchBedspaces = async (): Promise<Bedspaces[] | null | undefined> => {
    const query = firebase.firestore().collection("apartmentRooms").doc(docId);
    try {
      const snapshot = await query.get();
      if (!snapshot.exists) return;
      return snapshot.data()?.bedspaces;
    } catch (err) {
      console.log(err);
    }
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
    const ongoing: any = {
      docId,
      tenantDetails: {
        imageUrl: user?.imageUrl,
        firstName: user?.firstName,
        lastName: user?.lastName,
        phoneNumber: user?.phoneNumber,
        uid: user?.uid,
      },
      bookingDetails: {
        bedInformation: selectedBedspace?.bedspace.bedInformation,
        imgUrl: selectedBedspace?.bedspace.imgUrl,
        name: selectedBedspace?.bedspace.name,
        price: selectedBedspace?.bedspace.price,
      },
    };
    await firebase
      .firestore()
      .collection("apartmentRooms")
      .doc(docId)
      .collection("bookings")
      .add(ongoing)
      .then((res) => {
        res.update({
          docId: res.id,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        ongoing.docId = res.id;
        navigation.replace("SuccessPage", { ongoing });
      });
    // navigation.navigate("SuccessPage", { ongoing });
    // const updatedBedspace = bedspaces?.map((item) => {
    //   if (item.bedspace.name === selectedBedspace?.bedspace.name)
    //     return {
    //       ...item,
    //       isAvailable: false,
    //     };
    //   return item;
    // });
    // await firebase
    //   .firestore()
    //   .collection("apartmentRooms")
    //   .doc(docId)
    //   .update({ bedspaces: updatedBedspace });
  };

  return (
    <SafeScreenView>
      <View className="flex-1 px-4">
        <Text className="font-semibold my-1">available bedspace</Text>
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
            <TouchableNativeFeedback onPress={handleBook}>
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
    </SafeScreenView>
  );
};

export default ApartmentBooking;
