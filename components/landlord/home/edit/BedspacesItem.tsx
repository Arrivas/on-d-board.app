import { View, Text, TouchableNativeFeedback } from "react-native";
import React from "react";
import colors from "../../../../config/colors";
import { Bedspaces } from "../../../../App";

interface BedspaceItemProps {
  selectedBedspace: Bedspaces | undefined;
  setSelectedBedspace: React.Dispatch<
    React.SetStateAction<Bedspaces | undefined>
  >;
  setBedspaces: React.Dispatch<React.SetStateAction<Bedspaces[]>>;
  item: Bedspaces;
  bedspaces: Bedspaces[];
  setInputPrice: React.Dispatch<React.SetStateAction<string>>;
}

const BedspacesItem: React.FC<BedspaceItemProps> = ({
  selectedBedspace,
  setBedspaces,
  setSelectedBedspace,
  item,
  bedspaces,
  setInputPrice,
}) => {
  const isObjectNotEmpty = (obj: any): boolean => {
    return obj !== undefined && obj !== null && Object.keys(obj).length !== 0;
  };
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#eee", false)}
      onPress={() => {
        setSelectedBedspace(item);
        const isSelectedAvailable = isObjectNotEmpty(item);
        if (isSelectedAvailable) {
          const bedspaceCopy = [...bedspaces];
          const index = bedspaceCopy.findIndex(
            (bedspaceItem) => bedspaceItem.bedspace.name === item.bedspace.name
          );
          setInputPrice(bedspaceCopy[index].bedspace.price as string);
          bedspaceCopy[index] = item;
          setBedspaces(bedspaceCopy);
        }
      }}
    >
      <View
        className="bg-gray-200 p-3 px-4 mr-2 mb-2 rounded-md"
        style={{
          backgroundColor:
            selectedBedspace?.bedspace.name === item.bedspace.name
              ? colors.primary
              : "#eee",
        }}
      >
        <Text
          style={{
            color:
              selectedBedspace?.bedspace.name === item.bedspace.name
                ? "#fff"
                : "#000",
          }}
        >
          {item.bedspace.name}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default BedspacesItem;
