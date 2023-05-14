import { View, Text, ScrollView } from "react-native";
import React from "react";
import Icon from "../../Icon";
import { Amenities } from "../../../App";
import colors from "../../../config/colors";
import { moderateScale } from "../../../config/metrics";

interface ApartmentAmenitiesProps {
  amenities: Amenities[];
}

const ApartmentAmenities: React.FC<ApartmentAmenitiesProps> = ({
  amenities,
}) => {
  const IconAmenities: any = {
    "beach-access": (
      <Icon
        iconLibrary="MaterialIcons"
        materialName="beach-access"
        size={20}
        color={
          amenities.some(
            (item: Amenities) => item.value === "beach-access" && item.offering
          )
            ? "#fff"
            : ""
        }
      />
    ),
    "free wifi": (
      <Icon
        iconLibrary="IonIcons"
        ionName="wifi"
        size={20}
        color={
          amenities.some(
            (item: Amenities) => item.value === "free wifi" && item.offering
          )
            ? "#fff"
            : ""
        }
      />
    ),
    "free parking": (
      <Icon
        iconLibrary="MaterialCommunityIcons"
        materialComName="parking"
        size={18}
        color={
          amenities.some(
            (item: Amenities) => item.value === "free parking" && item.offering
          )
            ? "#fff"
            : ""
        }
      />
    ),
    "air-conditioned": (
      <Icon
        iconLibrary="IonIcons"
        ionName="snow"
        size={20}
        color={
          amenities.some(
            (item: Amenities) =>
              item.value === "air-conditioned" && item.offering
          )
            ? "#fff"
            : ""
        }
      />
    ),
  };
  return (
    <>
      <View className="my-2">
        <Text className="font-bold">Amenities:</Text>
        <ScrollView horizontal>
          <View className="my-1 flex-row">
            {amenities
              ?.filter((item: Amenities) => item.offering)
              .map((item: Amenities) => (
                <View
                  key={item.value}
                  className="flex-row p-2 px-4 rounded-md mr-1 items-center justify-center"
                  style={{
                    backgroundColor: colors.primary,
                  }}
                >
                  {IconAmenities[item.offering ? item.value : ""]}
                  <Text className="text-white text-xs font-bold ml-1">
                    {item.offering && item.value}
                  </Text>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ApartmentAmenities;
