import { View, Text, TouchableNativeFeedback } from "react-native";
import React, { useState } from "react";
import { FieldArray, FormikProps } from "formik";
import FormikField from "../../../forms/FormikField";
import SubmitButton from "../../../forms/SubmitButton";
import SafeScreenView from "../../../SafeScreenView";
import { Bedspaces } from "../../../../App";
import Icon from "../../../Icon";
import colors from "../../../../config/colors";
import AppFormField from "../../../forms/AppFormField";

const EditBedspace = ({ route }: any) => {
  const { maxBedspaceCount } = route.params;
  const [bedspaces, setBedspaces] = useState<Bedspaces[]>([]);
  const [selectedBedspace, setSelectedBedspace] = useState<Bedspaces>();

  const handleSumit = (values: any) => {
    console.log(values);
  };

  const handleAddBedspace = () => {
    if (bedspaces.length >= maxBedspaceCount) return;
    const bedspaceCopy = [...bedspaces];
    bedspaceCopy.push({
      bedspace: {
        bedInformation: {
          isDoubleDeck: false,
          location: "",
        },
        imgUrl: "",
        isAvailable: true,
        name: `bedspace${bedspaceCopy.length + 1}`,
        price: 0,
      },
    });
    setBedspaces(bedspaceCopy);
  };

  return (
    <SafeScreenView>
      <View className="flex-1 px-4">
        <View className="flex-1">
          <Text className="font-semibold my-1">available bedspace</Text>
          <View className="flex flex-row flex-wrap">
            {bedspaces.map((item) => (
              <TouchableNativeFeedback
                key={item.bedspace.name}
                onPress={() => setSelectedBedspace(item)}
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
            ))}
            {/* add button */}

            {bedspaces.length < maxBedspaceCount && (
              <TouchableNativeFeedback onPress={handleAddBedspace}>
                <View className="bg-gray-200 p-3 px-4 mr-2 mb-2 rounded-md flex-row items-center">
                  <Text>add</Text>
                  <Icon featherName="plus" iconLibrary="Feather" />
                </View>
              </TouchableNativeFeedback>
            )}
          </View>
        </View>
        <View
          style={{
            flex: 2,
          }}
        ></View>
      </View>
    </SafeScreenView>
  );
};

export default EditBedspace;
