import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path, Polygon } from "react-native-svg";

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

const formatAsCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
};

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
