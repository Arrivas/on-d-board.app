import React from "react";
import { View, Text } from "react-native";
import Lottie from "lottie-react-native";
import getDimensions from "../config/getDimensions";

function ActivityIndicator({ isVisible = false }) {
  const { height } = getDimensions();
  if (!isVisible) return null;

  return (
    <View
      className={`absolute h-full w-full z-50 bg-white opacity-70 items-center justify-center`}
      style={{ flex: 1 }}
    >
      <Lottie
        source={require("../assets/loading/city-loader.json")}
        autoPlay
        loop
        hardwareAccelerationAndroid
      />
    </View>
  );
}

export default ActivityIndicator;
