import { View, Text, TouchableNativeFeedback } from "react-native";
import React from "react";
import Icon from "../../../Icon";
import { Amenities } from "../../../../App";
import colors from "../../../../config/colors";

interface SelectAmenitiesProps {
  selectedAmenities: Amenities[];
  setSelectedAmenities: React.Dispatch<React.SetStateAction<Amenities[]>>;
}

const SelectAmenities: React.FC<SelectAmenitiesProps> = ({
  selectedAmenities,
  setSelectedAmenities,
}) => {
  const IconAmenities: any = {
    "beach-access": (
      <Icon
        iconLibrary="MaterialIcons"
        materialName="beach-access"
        size={20}
        color={
          selectedAmenities.some(
            (item: Amenities) => item.value === "beach-access" && item.offering
          )
            ? "#fff"
            : colors.lightGray
        }
      />
    ),
    "free wifi": (
      <Icon
        iconLibrary="IonIcons"
        ionName="wifi"
        size={20}
        color={
          selectedAmenities.some(
            (item: Amenities) => item.value === "free wifi" && item.offering
          )
            ? "#fff"
            : colors.lightGray
        }
      />
    ),
    "free parking": (
      <Icon
        iconLibrary="MaterialCommunityIcons"
        materialComName="parking"
        size={18}
        color={
          selectedAmenities.some(
            (item: Amenities) => item.value === "free parking" && item.offering
          )
            ? "#fff"
            : colors.lightGray
        }
      />
    ),
    "air-conditioned": (
      <Icon
        iconLibrary="IonIcons"
        ionName="snow"
        size={20}
        color={
          selectedAmenities.some(
            (item: Amenities) =>
              item.value === "air-conditioned" && item.offering
          )
            ? "#fff"
            : colors.lightGray
        }
      />
    ),
  };

  return (
    <>
      <Text className="font-semibold mb-1">Amenties</Text>
      <View className="flex-wrap flex-row">
        {selectedAmenities?.map((item) => (
          <TouchableNativeFeedback
            key={item.value}
            onPress={() => {
              const selectedAmenitiesCopy = selectedAmenities.map((SA) => {
                if (SA.value === item.value) {
                  return { ...SA, offering: !SA.offering };
                }
                return SA;
              });
              setSelectedAmenities(selectedAmenitiesCopy);
            }}
          >
            <View
              className="p-2 px-3 rounded-md mb-1 mr-1 items-center justify-center flex-row"
              style={{
                backgroundColor:
                  item.offering === true ? colors.primary : "#eee",
              }}
            >
              {IconAmenities[item.value]}
              <Text
                style={{
                  color: item.offering ? "#fff" : colors.lightGray,
                }}
              >
                {item.value}
              </Text>
            </View>
          </TouchableNativeFeedback>
        ))}
      </View>
    </>
  );
};

export default SelectAmenities;
