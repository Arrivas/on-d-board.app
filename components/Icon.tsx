import React from "react";
import { View } from "react-native";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
  Octicons,
} from "@expo/vector-icons";

interface Icon {
  antName?: keyof typeof AntDesign.glyphMap;
  featherName?: keyof typeof Feather.glyphMap;
  ionName?: keyof typeof Ionicons.glyphMap;
  materialComName?: keyof typeof MaterialCommunityIcons.glyphMap;
  materialName?: keyof typeof MaterialIcons.glyphMap;
  simpleName?: keyof typeof SimpleLineIcons.glyphMap;
  octName?: keyof typeof Octicons.glyphMap;
  iconLibrary?: string;
  size?: number;
  color?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const Icon = ({
  iconLibrary = "",
  size = 15,
  color = "#000",
  className = "",
  style,
  antName,
  featherName,
  ionName,
  materialComName,
  materialName,
  simpleName,
  octName,
}: Icon) => {
  return (
    <>
      <View className={className} style={style}>
        {iconLibrary === "AntDesign" ? (
          <AntDesign name={antName} size={size} color={color} />
        ) : iconLibrary === "Feather" ? (
          <Feather name={featherName} size={size} color={color} />
        ) : iconLibrary === "IonIcons" ? (
          <Ionicons name={ionName} size={size} color={color} />
        ) : iconLibrary === "MaterialCommunityIcons" ? (
          <MaterialCommunityIcons
            name={materialComName}
            size={size}
            color={color}
          />
        ) : iconLibrary === "MaterialIcons" ? (
          <MaterialIcons name={materialName} size={size} color={color} />
        ) : iconLibrary === "SimpleLineIcons" ? (
          <SimpleLineIcons name={simpleName} size={size} color={color} />
        ) : (
          iconLibrary === "Octicons" && (
            <Octicons name={octName} size={size} color={color} />
          )
        )}
      </View>
    </>
  );
};

export default Icon;
