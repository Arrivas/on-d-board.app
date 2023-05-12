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
}

const BedspacesItem: React.FC<BedspaceItemProps> = ({
  selectedBedspace,
  setBedspaces,
  setSelectedBedspace,
  item,
  bedspaces,
}) => {
  const isObjectNotEmpty = (obj: any): boolean => {
    return obj !== undefined && obj !== null && Object.keys(obj).length !== 0;
  };
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#eee", false)}
      onPress={() => {
        const isSelectedAvailable = isObjectNotEmpty(selectedBedspace);
        if (isSelectedAvailable) {
          const bedspaceCopy = [...bedspaces];
          const index = bedspaceCopy.findIndex(
            (item) => item.bedspace.name === selectedBedspace!.bedspace.name
          );
          bedspaceCopy[index] = selectedBedspace as Bedspaces;
          setBedspaces(bedspaceCopy);
        }
        setSelectedBedspace(item);
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
