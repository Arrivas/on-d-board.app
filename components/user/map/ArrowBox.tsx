import React from "react";
import { View, Text } from "react-native";
import { formatAsCurrency } from "../../../functions/formatAsCurrency";

interface ArrowBoxProps {
  text: string;
  selectedRegion: {
    latitude: string;
    longitude: string;
  };
  currentRegion: {
    latitude: string;
    longitude: string;
  };
}

const ArrowBox: React.FC<ArrowBoxProps> = ({
  text,
  currentRegion,
  selectedRegion,
}) => {
  return (
    <>
      <View
        className={`${
          currentRegion === selectedRegion ? "bg-green-600" : "bg-gray-400"
        } max-w-[180px] border-2 border-white`}
      >
        <Text className="font-semibold text-white p-2 px-4">
          {formatAsCurrency(Number(text))}
        </Text>
      </View>
      <View
        className={`self-center bottom-1 -z-50 w-0 h-0 ${
          currentRegion === selectedRegion
            ? "border-green-600"
            : "border-gray-400"
        } border-t-8 border-r-4 border-b-0 border-l-4 transform rotate-45`}
      />
    </>
  );
};

export default ArrowBox;
