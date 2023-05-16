import { View, Text, TouchableNativeFeedback, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import SafeScreenView from "../../SafeScreenView";
import Icon from "../../Icon";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import colors from "../../../config/colors";

const bookingStatusItems = [
  { id: 1, label: "Pending" },
  { id: 2, label: "Ongoing" },
  { id: 3, label: "Cancelled" },
  { id: 4, label: "History" },
];

const ViewApartment = ({ route, navigation }: any) => {
  const { item } = route.params;
  const bookings = useSelector((state: RootState) => state.booking.bookings);
  const { apartmentInfo, docId } = item;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: apartmentInfo.apartmentName,
    });
  }, []);

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
            {bookingStatusItems.map((item) => (
              <View
                className="aspect-square flex-1 items-center justify-center bg-[#fafafa]"
                key={item.id}
              >
                <Text>0</Text>
                <Text className="text-xs text-gray-400">{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeScreenView>
  );
};

export default ViewApartment;
