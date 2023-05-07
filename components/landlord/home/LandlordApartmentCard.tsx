import { View, Text, Image, TouchableNativeFeedback } from "react-native";
import React from "react";
import Icon from "../../Icon";
import colors from "../../../config/colors";
import { Apartments } from "../../../App";

interface LandlordApartmentCardProps {
  item: Apartments;
  navigation?: any;
}

const LandlordApartmentCard: React.FC<LandlordApartmentCardProps> = ({
  item,
  navigation,
}) => {
  const { apartmentInfo, docId } = item;
  return (
    <View className="bg-gray-100 flex-row rounded-md mb-2" key={docId}>
      <View className="h-[120px] w-[120px]">
        <Image
          className="rounded-md w-auto h-[120px] rounded-r-none"
          source={{ uri: apartmentInfo.imageUrl }}
        />
      </View>
      <View className="flex-1 px-2 justify-center">
        <View className="">
          <Text className="font-semibold text-lg">
            {apartmentInfo.apartmentName}
          </Text>
          <Text>{apartmentInfo.address}</Text>
        </View>
        {/* bototm button */}
        <View className="flex-row py-2 ">
          <TouchableNativeFeedback>
            <View className="p-3 flex-1 flex-row items-center justify-center mr-1 space-x-1 bg-[#B30000] rounded-md">
              <Icon ionName="trash" iconLibrary="IonIcons" color="white" />
              <Text className="font-semibold text-white">remove</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() =>
              navigation.navigate("LandlordApartmentStack", {
                screen: "ViewApartment",
                params: { item },
              })
            }
            background={TouchableNativeFeedback.Ripple("#eee", false)}
          >
            <View
              className="p-3 flex-1 flex-row items-center justify-center space-x-1 rounded-md"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              <Icon
                materialName="apartment"
                iconLibrary="MaterialIcons"
                color="white"
              />
              <Text className="font-semibold text-white">view</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
};

export default LandlordApartmentCard;
