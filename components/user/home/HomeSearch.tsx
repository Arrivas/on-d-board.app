import { View, TextInput } from "react-native";
import React from "react";
import Icon from "../../Icon";

interface HomeSearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
}

const HomeSearch: React.FC<HomeSearchProps> = ({ setSearch, search }) => {
  return (
    <View className="bg-white z-50 absolute bottom-[10px] w-[90%] self-center rounded-full flex-row items-center">
      <TextInput
        placeholder="search.."
        className="z-50 p-3 px-5 pr-9 w-full"
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      <Icon
        size={20}
        ionName="search"
        iconLibrary="IonIcons"
        className="absolute right-4"
      />
    </View>
  );
};

export default HomeSearch;
