import { View, Text, TouchableNativeFeedback } from "react-native";
import React from "react";
import { Amenities } from "../../../../App";
import SelectAmenities from "../edit/SelectAmenities";
import Icon from "../../../Icon";

interface NewAmenitiesProps {
  selectedAmenities: Amenities[];
  setSelectedAmenities: React.Dispatch<React.SetStateAction<Amenities[]>>;
  setProgress: React.Dispatch<React.SetStateAction<number | string>>;
}

const NewAmenities: React.FC<NewAmenitiesProps> = ({
  selectedAmenities,
  setSelectedAmenities,
  setProgress,
}) => {
  return (
    <View>
      <Text className="font-semibold text-2xl mb-2 self-center">
        Apartment Amenities
      </Text>
      <Text className="self-center text-gray-300">(optional)</Text>
      <SelectAmenities
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
      />
      <View className="flex-row self-end items-end">
        <View>
          <TouchableNativeFeedback onPress={() => setProgress(1)}>
            <View className="flex-row p-2 self-end items-center">
              <Icon
                materialComName="chevron-left"
                color="black"
                iconLibrary="MaterialCommunityIcons"
                size={25}
              />
            </View>
          </TouchableNativeFeedback>
        </View>

        <View className="self-end">
          <TouchableNativeFeedback onPress={() => setProgress(3)}>
            <View className="flex-row p-2 self-end items-center">
              <Icon
                materialComName="chevron-right"
                color="black"
                iconLibrary="MaterialCommunityIcons"
                size={25}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
};

export default NewAmenities;
