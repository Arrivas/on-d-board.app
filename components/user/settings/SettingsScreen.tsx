import { View, Text, TouchableNativeFeedback } from "react-native";
import React from "react";
import authStorage from "../../../auth/storage";
import { logOut } from "../../../auth/useAuth";
import { setUser } from "../../../store/userSlice";
import { useDispatch } from "react-redux";

const SettingsScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  return (
    <TouchableNativeFeedback
      onPress={() => {
        dispatch(setUser(null));
        navigation.navigate("logout");
        logOut();
      }}
    >
      <View>
        <Text>SettingsScreen</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default SettingsScreen;
