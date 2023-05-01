import { View, Text, TouchableNativeFeedback } from "react-native";
import React from "react";
import Icon from "../../Icon";
import colors from "../../../config/colors";

interface PerksProps {
  selectedPerks: any;
  setSelectedPerks: any;
}

const AmenityFilter: React.FC<PerksProps> = ({
  selectedPerks,
  setSelectedPerks,
}) => {
  const handlePerksPress = (label: string) => {
    setSelectedPerks(
      selectedPerks.includes(label)
        ? selectedPerks.filter((item: string) => item !== label)
        : [...selectedPerks, label]
    );
  };
  const perksItem = [
    {
      id: 1,
      label: "beach-access",
      icon: (
        <Icon
          iconLibrary="MaterialIcons"
          materialName="beach-access"
          size={25}
          color={
            selectedPerks.includes("beach-access")
              ? colors.primary
              : colors.lightGray
          }
        />
      ),
    },
    {
      id: 2,
      label: "free wifi",
      icon: (
        <Icon
          iconLibrary="IonIcons"
          ionName="wifi"
          size={25}
          color={
            selectedPerks.includes("free wifi")
              ? colors.primary
              : colors.lightGray
          }
        />
      ),
    },
    {
      id: 3,
      label: "free parking",
      icon: (
        <Icon
          iconLibrary="MaterialCommunityIcons"
          materialComName="parking"
          size={25}
          color={
            selectedPerks.includes("free parking")
              ? colors.primary
              : colors.lightGray
          }
        />
      ),
    },
    {
      id: 4,
      label: "air-conditioned",
      icon: (
        <Icon
          iconLibrary="IonIcons"
          ionName="snow"
          size={25}
          color={
            selectedPerks.includes("air-conditioned")
              ? colors.primary
              : colors.lightGray
          }
        />
      ),
    },
  ];
  return (
    <View
      className="bg-white w-[90%] rounded-xl -top-10 z-50 p-2 self-center justify-around flex-row"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}
    >
      {perksItem.map((item) => (
        <TouchableNativeFeedback
          onPress={() => handlePerksPress(item.label)}
          background={TouchableNativeFeedback.Ripple(
            colors.lightGray,
            true,
            30
          )}
          key={item.id}
        >
          <View className="items-center h-[60px] flex-items-center justify-center">
            {item.icon}
            <Text
              className={`text-xs`}
              style={{
                color: selectedPerks.includes(item.label)
                  ? colors.primary
                  : colors.lightGray,
              }}
            >
              {item.label}
            </Text>
          </View>
        </TouchableNativeFeedback>
      ))}
    </View>
  );
};

export default AmenityFilter;
