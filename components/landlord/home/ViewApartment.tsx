import { View, Text, TouchableNativeFeedback, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import SafeScreenView from "../../SafeScreenView";
import Icon from "../../Icon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setBooking } from "../../../store/bookingSlice";
import { separateBookings } from "../../../functions/separateBookings";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import { BookingItems } from "../../../App";

const bookingStatusItems = [
  { id: 1, label: "Pending", tabLabel: "Pending" },
  { id: 2, label: "Ongoing", tabLabel: "Ongoing" },
  { id: 3, label: "Cancelled", tabLabel: "Cancelled" },
  { id: 4, label: "History", tabLabel: "History" },
];

const ViewApartment = ({ route, navigation }: any) => {
  const { item } = route.params;
  const bookings = useSelector((state: RootState) => state.booking.bookings);
  const { apartmentInfo, docId, apartmentRoomsId } = item;
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    let unsubscribe: any;
    if (isMounted) {
      unsubscribe = firebase
        .firestore()
        .collection("apartmentRooms")
        .doc(apartmentRoomsId)
        .collection("bookings")
        .onSnapshot(
          (snapshot) => {
            if (snapshot.empty) return;
            const result: BookingItems[] = [];
            snapshot.forEach((doc) => {
              const bookingData = doc.data() as BookingItems;
              const bookingWithShowState = { ...bookingData, showState: false };
              result.push(bookingWithShowState);
            });
            dispatch(setBooking(result));
          },
          (error) => {
            console.log(error);
          }
        );
    }
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: apartmentInfo.apartmentName,
    });
  }, []);

  const { pendings, cancellations, ongoing, history } =
    separateBookings(bookings);

  return (
    <SafeScreenView>
      <View className="p-2 flex-1">
        <View className="flex-1">
          <ScrollView>
            <TouchableNativeFeedback
              onPress={() =>
                navigation.navigate("EditFrontImage", {
                  imageUrl: apartmentInfo.imageUrl,
                  docId,
                  apartmentName: apartmentInfo.apartmentName,
                })
              }
            >
              <View className="flex-row space-x-2 w-full p-8 items-center rounded-md">
                <Icon featherName="image" iconLibrary="Feather" size={25} />
                <Text className="font-semibold">Edit Apartment Image</Text>
              </View>
            </TouchableNativeFeedback>
            <View className="bg-gray-200 w-full h-[1px] my-2" />
            <TouchableNativeFeedback
              onPress={() =>
                navigation.navigate("EditApartmentDetails", { item })
              }
            >
              <View className="flex-row space-x-2 w-full p-8 items-center rounded-md">
                <Icon
                  materialName="apartment"
                  iconLibrary="MaterialIcons"
                  size={25}
                />
                <Text className="font-semibold">Edit Apartment Details</Text>
              </View>
            </TouchableNativeFeedback>
            <View className="bg-gray-200 w-full h-[1px] my-2" />
            <TouchableNativeFeedback
              onPress={() =>
                navigation.navigate("EditBedspace", {
                  apartmentDocId: docId,
                })
              }
            >
              <View className="flex-row space-x-2 w-full p-8 items-center rounded-md">
                <Icon ionName="bed" iconLibrary="IonIcons" size={25} />
                <Text className="font-semibold">Edit/Add Bedspace</Text>
              </View>
            </TouchableNativeFeedback>
          </ScrollView>
        </View>
        <View className="flex-1 px-5">
          <Text className="mb-2">Booking Status</Text>
          <View className="flex-row space-x-2">
            {bookingStatusItems?.map((item) => (
              <TouchableNativeFeedback
                onPress={() =>
                  navigation.navigate("MyBookings", {
                    tabLabel: item.tabLabel,
                    apartmentRoomsId,
                  })
                }
                key={item.id}
              >
                <View className="aspect-square flex-1 items-center justify-center bg-[#fafafa]">
                  <Text>
                    {item.label === "Pending"
                      ? pendings?.length
                      : item.label === "Cancelled"
                      ? cancellations?.length
                      : item.label === "Ongoing"
                      ? ongoing?.length
                      : history?.length}
                  </Text>
                  <Text className="text-xs text-gray-400">{item.label}</Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </View>
        </View>
      </View>
    </SafeScreenView>
  );
};

export default ViewApartment;
