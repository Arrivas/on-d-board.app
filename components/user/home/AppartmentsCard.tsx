import { View, Text, Image } from "react-native";
import React from "react";
import { horizontalScale, verticalScale } from "../../../config/metrics";
import { AppartmentsCardProps } from "../../../App";

const AppartmentsCard: React.FC<AppartmentsCardProps> = ({
  docId,
  imageUrl,
  apartmentName,
  address,
}) => {
  return (
    <View
      key={docId}
      className="self-start mr-2 h-full bg-white object-contain"
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
  );
};

export default AppartmentsCard;
