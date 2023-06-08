import { View, TextInput, TouchableNativeFeedback, Text } from "react-native";
import React from "react";
import Icon from "../../Icon";

interface HomeSearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomeSearch: React.FC<HomeSearchProps> = ({
  setSearch,
  search,
  setModalVisible,
  modalVisible,
}) => {
  return (
    <TouchableNativeFeedback
      onPress={() => setModalVisible(!modalVisible)}
      className="z-50"
    >
      <View className="bg-white z-50 absolute bottom-[10px] w-[90%] self-center rounded-full flex-row items-center">
        {/* <TextInput
          placeholder="search.."
          className="z-50 p-3 px-6 pr-9 w-full"
          onChangeText={(text) => setSearch(text)}
          value={search}
        /> */}
        <View className="z-50 p-4 px-6 pr-9 rounded-full">
          <Text className="text-gray-300">search..</Text>
        </View>
        <Icon
          size={20}
          color="#ddd"
          ionName="search"
          iconLibrary="IonIcons"
          className="absolute right-4"
        />
      </View>
    </TouchableNativeFeedback>
  );
};

export default HomeSearch;
