import { View, Text, TouchableNativeFeedback, FlatList } from "react-native";
import React from "react";
import colors from "../../../../../config/colors";
import { Bedspaces } from "../../../../../App";

interface SelectBedType {
  selectedBedspace: Bedspaces | undefined;
  setSelectedBedspace: React.Dispatch<
    React.SetStateAction<Bedspaces | undefined>
  >;
}

const SelectBedType: React.FC<SelectBedType> = ({
  selectedBedspace,
  setSelectedBedspace,
}) => {
  return (
    <>
      <View className="my-1 flex-row">
        <Text className="font-bold self-center" style={{ flex: 1 }}>
          Bed Type
        </Text>
        <View className="flex-row items-center" style={{ flex: 1 }}>
          <TouchableNativeFeedback
            onPress={() => {
              const selectedCopy = {
                ...selectedBedspace,
              };
              selectedCopy.bedspace!.bedInformation.isDoubleDeck = false;
              delete selectedCopy.bedspace!.bedInformation.location;
              setSelectedBedspace(selectedCopy as Bedspaces);
            }}
          >
            <View className="mr-1 p-2 w-[50%]">
              <Text
                className="font-semibold"
                style={{
                  color: selectedBedspace?.bedspace?.bedInformation
                    ?.isDoubleDeck
                    ? colors.lightGray
                    : "#000",
                }}
              >
                Single Bed
              </Text>
            </View>
          </TouchableNativeFeedback>
          <View className="h-[70%] max-h-[30px] w-[1px] bg-gray-200" />
          <TouchableNativeFeedback
            onPress={() => {
              const selectedCopy = {
                ...selectedBedspace,
              };
              selectedCopy.bedspace!.bedInformation.isDoubleDeck = true;
              selectedCopy.bedspace!.bedInformation.location = "Upper Deck";
              setSelectedBedspace(selectedCopy as Bedspaces);
            }}
          >
            <View className="ml-1 p-2 w-[50%]">
              <Text
                className="font-semibold"
                style={{
                  color: selectedBedspace?.bedspace?.bedInformation
                    ?.isDoubleDeck
                    ? "#000"
                    : colors.lightGray,
                }}
              >
                Double Deck
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </>
  );
};

export default SelectBedType;
