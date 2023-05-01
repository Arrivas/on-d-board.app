import { View, Text } from "react-native";
import React from "react";
import { ApartmentSpecificationsProps } from "../../../App";

const Specifications: React.FC<ApartmentSpecificationsProps> = ({
  specifications,
  additionalStyle,
}) => {
  return (
    <>
      <View
        className={`flex-row bg-[#eee] justify-around p-2 rounded-md ${additionalStyle}`}
      >
        {specifications.map((item) =>
          item?.label ? (
            <View className="flex-row items-center space-x-1" key={item.label}>
              {item.icon}
              <Text className="font-semibold">
                {item.value} {item.label}{" "}
              </Text>
            </View>
          ) : null
        )}
      </View>
    </>
  );
};

export default Specifications;
