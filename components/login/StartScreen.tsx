import { View, Text, Image, TouchableNativeFeedback } from "react-native";
import React from "react";
import SafeScreenView from "../SafeScreenView";
import colors from "../../config/colors";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/loadingSlice";

const StartScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const handleGuestLogin = async () => {
    dispatch(setLoading(true));
    await firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        console.log("User signed in anonymously");
      })
      .catch((error) => {
        if (error.code === "auth/operation-not-allowed") {
          console.log("Enable anonymous in your firebase console.");
        }
        console.error(error);
      });
    dispatch(setLoading(false));
  };
  return (
    <SafeScreenView>
      <Image
        className="bg-contain h-[300px] w-full absolute bottom-0"
        source={require("../../assets/silhouette_blg.jpg")}
      />
      <View className="flex-1 items-center justify-around">
        <View className="">
          <Image
            className="h-[80px] w-[80px] self-center my-2"
            source={require("../../assets/logo.png")}
          />

          <View className="self-center">
            <Text className="font-bold text-lg leading-6 text-center">
              On d'
            </Text>
            <Text className="font-bold text-lg leading-6 text-center">
              Board
            </Text>
          </View>
        </View>

        <View className="space-y-2">
          <Text className="font-semibold text-center">continue as:</Text>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate("Login")}
            background={TouchableNativeFeedback.Ripple("#eee", false)}
          >
            <View
              className="p-3 px-12 rounded-md my-2"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              <Text className="text-white text-center">Landlord/Tenant</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={handleGuestLogin}
            background={TouchableNativeFeedback.Ripple("#eee", false)}
          >
            <View
              className="p-3 px-10 rounded-md"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              <Text className="text-white text-center">Guest</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </SafeScreenView>
  );
};

export default StartScreen;
