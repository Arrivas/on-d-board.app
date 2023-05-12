import { View, Text, TouchableNativeFeedback } from "react-native";
import React from "react";
import colors from "../../../../../config/colors";
import { Bedspaces } from "../../../../../App";

interface SelectBedLocationType {
  selectedBedspace: Bedspaces | undefined;
  setSelectedBedspace: React.Dispatch<
    React.SetStateAction<Bedspaces | undefined>
  >;
}

const SelectBedLocation: React.FC<SelectBedLocationType> = ({
  selectedBedspace,
  setSelectedBedspace,
}) => {
  return (
    <>
      <View className="mb-2 flex-row">
        <Text className="font-bold self-center" style={{ flex: 1 }}>
          Location
        </Text>
        <View className="flex-row items-center" style={{ flex: 1 }}>
          <TouchableNativeFeedback
            onPress={() => {
              const selectedCopy = {
                ...selectedBedspace,
              };
              selectedCopy.bedspace!.bedInformation.location = "Upper Deck";
              setSelectedBedspace(selectedCopy as Bedspaces);
            }}
          >
            <View className="mr-1 p-2 w-[50%]">
              <Text
                className="font-semibold"
                style={{
                  color:
                    selectedBedspace?.bedspace?.bedInformation?.location ===
                    "Upper Deck"
                      ? "#000"
                      : colors.lightGray,
                }}
              >
                Upper Deck
              </Text>
            </View>
          </TouchableNativeFeedback>
          <View className="h-[70%] max-h-[30px] w-[1px] bg-gray-200" />
          <TouchableNativeFeedback
            onPress={() => {
              const selectedCopy = {
                ...selectedBedspace,
              };
              selectedCopy.bedspace!.bedInformation.location = "Lower Deck";

              setSelectedBedspace(selectedCopy as Bedspaces);
            }}
          >
            <View className="ml-1 p-2 w-[50%]">
              <Text
                className="font-semibold"
                style={{
                  color:
                    selectedBedspace?.bedspace?.bedInformation?.location ===
                    "Lower Deck"
                      ? "#000"
                      : colors.lightGray,
                }}
              >
                Lower Deck
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </>
  );
};

export default SelectBedLocation;
