import { View, Text, TouchableNativeFeedback, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import SafeScreenView from "../../SafeScreenView";
import Icon from "../../Icon";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Apartments } from "../../../App";

const ViewApartment = ({ route, navigation }: any) => {
  const { item } = route.params;
  const { apartmentInfo, specifications, docId } = item;
  const apartments = useSelector(
    (state: RootState) => state.apartments.apartments
  );
  const currentApartment = apartments?.find((item) => item.docId === docId);
  const bedspaceCount = currentApartment?.specifications.bedspace;

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
                  maxBedspaceCount: bedspaceCount,
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
        <View className="flex-1"></View>
      </View>
    </SafeScreenView>
  );
};

export default ViewApartment;
