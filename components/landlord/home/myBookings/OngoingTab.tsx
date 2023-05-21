import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import Icon from "../../../Icon";
import { formatAsCurrency } from "../../../../functions/formatAsCurrency";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setBooking } from "../../../../store/bookingSlice";
import { BookingItems, BookingSliceState } from "../../../../App";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import { setLoading } from "../../../../store/loadingSlice";

interface OngoingTabProps {
  activeLabel: string;
  ongoing: BookingSliceState[];
  bookings: BookingItems[];
}

const OngoingTab: React.FC<OngoingTabProps> = ({
  activeLabel,
  ongoing,
  bookings,
}) => {
  const dispatch = useDispatch();

  const handleEndBooking = async (
    tenantDocId: string,
    tenantBookDocId: string,
    apartmentRoomsId: string,
    apartmentBookDocId: string,
    bedspaceName: string
  ) => {
    dispatch(setLoading(true));
    const query1 = firebase
      .firestore()
      .collection("tenants")
      .doc(tenantDocId)
      .collection("bookings");
    const query2 = firebase
      .firestore()
      .collection("apartmentRooms")
      .doc(apartmentRoomsId)
      .collection("bookings");

    const bookingsCopy = [...bookings];
    const index = bookingsCopy.findIndex(
      (item) => item.bookingDetails.name === bedspaceName
    );

    bookingsCopy[index].bookingDetails.bookingStatus = "completed";
    bookingsCopy[index].bookingDetails.cancellationDate =
      new Date().toISOString();

    await query1
      .doc(tenantBookDocId)
      .update({ bookingDetails: bookingsCopy[index].bookingDetails })
      .then(async (res) => {
        await query2
          .doc(apartmentBookDocId)
          .update({ bookingDetails: bookingsCopy[index].bookingDetails });
      })
      .catch((err) => console.log(err));
    dispatch(setBooking(bookingsCopy));
    // update bedspace availability
    const bedspaces: [] | any = [];
    await firebase
      .firestore()
      .collection("apartmentRooms")
      .get()
      .then((data) => {
        if (data.empty) return;
        data.forEach((doc) => bedspaces.push(doc.data().bedspaces));
      });
    bedspaces[0].filter((item: any) => {
      if (item.bedspace.name === bedspaceName) item.bedspace.isAvailable = true;
    });
    await firebase
      .firestore()
      .collection("apartmentRooms")
      .doc(apartmentRoomsId)
      .update({ bedspaces: bedspaces[0] });
    dispatch(setLoading(false));
  };

  return (
    <ScrollView>
      {activeLabel === "Ongoing" && (
        <>
          {ongoing.map((item: any) => {
            const {
              bookingDetails,
              tenantDetails,
              showState,
              apartmentRoomsId,
              apartmentBookDocId,
              tenantBookDocId,
              createdAt,
            } = item;
            const { firstName, lastName, imageUrl, phoneNumber, tenantDocId } =
              tenantDetails;
            const {
              apartmentName,
              imgUrl,
              bedInformation,
              bookingStatus,
              name,
              price,
            } = bookingDetails;
            const { isDoubleDeck, location } = bedInformation;
            return (
              <View
                className="p-5 px-7 bg-white mx-2 my-1"
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
                }}
                key={apartmentBookDocId}
              >
                <View className="flex-row justify-between ">
                  <View className="flex-1 flex-row">
                    <Icon
                      color="#bdbdbd"
                      size={25}
                      materialName="apartment"
                      iconLibrary="MaterialIcons"
                    />
                    <Text numberOfLines={1}>{apartmentName}</Text>
                  </View>
                  <View className="flex-1 items-end my-2">
                    <Text className="capitalize">{bookingStatus}</Text>
                  </View>
                </View>
                {/* content */}
                <View className="flex-row w-full">
                  <Image
                    className="h-[70px] w-[70px]"
                    source={{ uri: imgUrl }}
                  />
                  <View className="ml-5 flex-1">
                    <Text>{name}</Text>
                    <Text>{isDoubleDeck ? "Double Deck" : "Single Bed"}</Text>
                    <Text className="text-xs text-gray-400">{location}</Text>
                    <Text className="text-xs text-gray-400 self-end">
                      {formatAsCurrency(price)}/month
                    </Text>
                  </View>
                </View>
                <View className="w-full h-[1px] bg-gray-200 my-5" />

                {item.showState && (
                  <>
                    <View className="flex-row justify-between">
                      <View className="flex-1">
                        <Text className="font-semibold">Name</Text>
                      </View>
                      <View className="flex-1 items-end">
                        <View className="flex-row space-x-2">
                          <Text>{firstName}</Text>
                          <Text>{lastName}</Text>
                        </View>
                      </View>
                    </View>
                    <View className="flex-row justify-between">
                      <View className="flex-1">
                        <Text className="font-semibold">Phone#</Text>
                      </View>
                      <View className="flex-1 items-end">
                        <View className="flex-row space-x-2">
                          <Text>{phoneNumber}</Text>
                        </View>
                      </View>
                    </View>
                    <View className="flex-row justify-between">
                      <View className="flex-1">
                        <Text className="font-semibold">Booking Date</Text>
                      </View>
                      <View className="flex-1 items-end">
                        <View className="flex-row space-x-2">
                          <Text>
                            {moment(new Date(createdAt)).format("LLL")}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                )}
                <TouchableNativeFeedback
                  onPress={() => {
                    const bookingsCopy = [...bookings];
                    bookingsCopy.filter((copyItem) => {
                      if (copyItem.docId === item.docId) {
                        copyItem.showState = !copyItem.showState;
                      }
                    });
                    dispatch(setBooking(bookingsCopy));
                  }}
                >
                  <View className="w-full justify-between flex-row py-2">
                    <Text className="text-xs">Tenant Details</Text>
                    {showState ? (
                      <Icon ionName="chevron-up" iconLibrary="IonIcons" />
                    ) : (
                      <Icon ionName="chevron-down" iconLibrary="IonIcons" />
                    )}
                  </View>
                </TouchableNativeFeedback>

                {/* buttons */}
                <View className="flex-row self-end items-end space-x-4">
                  <TouchableNativeFeedback
                    onPress={() =>
                      handleEndBooking(
                        tenantDocId,
                        tenantBookDocId,
                        apartmentRoomsId,
                        apartmentBookDocId,
                        name
                      )
                    }
                  >
                    <View className="p-2">
                      <Text>end booking</Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            );
          })}
        </>
      )}
    </ScrollView>
  );
};

export default OngoingTab;
