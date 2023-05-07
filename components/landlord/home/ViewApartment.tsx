import { View, Text, Image, TouchableNativeFeedback } from "react-native";
import React, { useLayoutEffect } from "react";
import { Apartments } from "../../../App";
import SafeScreenView from "../../SafeScreenView";
import Icon from "../../Icon";
import colors from "../../../config/colors";

const ViewApartment = ({ route, navigation }: any) => {
  const { item } = route.params;
  const { apartmentInfo, landlordInfo, amenities, docId } = item;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: apartmentInfo.apartmentName,
    });
  }, []);

  return (
    <SafeScreenView>
      <View className="p-2 flex-1">
        <TouchableNativeFeedback
          onPress={() => navigation.navigate("EditApartmentDetails", { item })}
        >
          <View className="flex-row space-x-2 w-full p-8 items-center rounded-md">
            <Icon
              materialName="apartment"
              iconLibrary="MaterialIcons"
              size={30}
            />
            <Text className="font-semibold">Edit Apartment Details</Text>
          </View>
        </TouchableNativeFeedback>
        <View className="bg-gray-200 w-full h-[1px] my-2" />
        <TouchableNativeFeedback>
          <View className="flex-row space-x-2 w-full p-8 items-center rounded-md">
            <Icon ionName="bed" iconLibrary="IonIcons" size={30} />
            <Text className="font-semibold">Edit Bedspace</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </SafeScreenView>
  );
};

export default ViewApartment;
