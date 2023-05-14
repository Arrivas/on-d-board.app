import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import Icon from "../../Icon";
import { moderateScale } from "../../../config/metrics";
import colors from "../../../config/colors";

const HomeMap = ({ navigation }: any) => {
  return (
    <View className="flex-1 justify-end">
      <Text className="font-bold py-2">Search around Lingayen</Text>
      {/* map */}
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate("MapStack", { screen: "NearbyDormMap" })
        }
      >
        <View className="w-full h-[150px] overflow-hidden rounded-md">
          <View className="absolute inset-0 z-50 self-center justify-around h-full">
            <View className="items-center justify-center flex-row">
              <Icon
                simpleName="map"
                iconLibrary="SimpleLineIcons"
                size={30}
                color="#eee"
                className="mr-2"
              />
              <Text
                className="font-bold text-[#eee]"
                style={{ fontSize: moderateScale(20) }}
              >
                Lingayen, Pangasinan
              </Text>
            </View>
            <TouchableNativeFeedback
              onPress={() =>
                navigation.navigate("MapStack", {
                  screen: "NearbyDormMap",
                })
              }
              background={TouchableNativeFeedback.Ripple(
                colors.lightGray,
                false
              )}
            >
              <View
                className="p-3 rounded-md"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-white text-center font-semibold">
                  Search Nearby Dorms
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <Image
            className="object-fill w-full h-full transform scale-150"
            source={require("../../../assets/map.png")}
          />
          <View className="bg-black/20 absolute w-full h-full" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HomeMap;
