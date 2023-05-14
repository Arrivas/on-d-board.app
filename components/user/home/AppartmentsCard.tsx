import { View, Text, Image, TouchableNativeFeedback } from "react-native";
import React from "react";
import { horizontalScale, verticalScale } from "../../../config/metrics";
import { AppartmentsCardProps } from "../../../App";

const AppartmentsCard: React.FC<AppartmentsCardProps> = ({
  navigation,
  apartmentDetails,
}) => {
  const { apartmentInfo } = apartmentDetails;
  const { apartmentName, address, imageUrl } = apartmentInfo;
  return (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate("BookStack", {
          screen: "ApartmentDetails",
          params: { apartmentDetails },
        })
      }
    >
      <View
        className="self-start mr-2 bg-white"
        style={{
          width: horizontalScale(160),
        }}
      >
        <Image
          className="rounded-lg"
          style={{
            height: verticalScale(160),
            width: "auto",
            // width: horizontalScale(150),
          }}
          source={{ uri: imageUrl }}
        />
        <View className="py-2">
          <Text className="font-bold">{apartmentName}</Text>
          <Text>{address}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default AppartmentsCard;
