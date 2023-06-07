import { View, Text, TouchableNativeFeedback } from "react-native";
import React from "react";
import { logOut } from "../../../auth/useAuth";
import { setUser } from "../../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import SafeScreenView from "../../SafeScreenView";
import colors from "../../../config/colors";
import { RootState } from "../../../store";

const LandlordSettingsScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  return (
    <SafeScreenView>
      <View className="flex-1 px-4 py-5">
        <Text className="font-bold text-xl">Account</Text>
        {/* @ts-ignore */}
        {user.user === "anonymous" && (
          <>
            <Text>
              To prevent spam, users on On 'd Board users are required to create
              an account for verification purposes.
            </Text>

            {/* button check if user is logged in */}
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#eee", false)}
              onPress={() => {
                dispatch(setUser(null));
                navigation.navigate("logout");
                logOut();
              }}
            >
              <View
                className="my-4 rounded-md"
                style={{
                  backgroundColor: colors.primary,
                }}
              >
                <Text className="font-semibold text-white py-2 text-center">
                  Log in or create account
                </Text>
              </View>
            </TouchableNativeFeedback>
          </>
        )}
        <View className="ml-2 flex-row justify-between my-5">
          <Text>Account Status</Text>
          <Text
            className="p-2 rounded-full text-white px-3 text-xs"
            style={{ backgroundColor: colors.primary }}
          >
            {user?.user?.accountStatus === "notVerified"
              ? "not verified"
              : user?.user?.accountStatus === "waiting"
              ? "on process"
              : user?.user?.accountStatus === "declined"
              ? "declined"
              : "verified"}
          </Text>
        </View>
        <TouchableNativeFeedback
          disabled={user?.user?.accountStatus === "verified" ? true : false}
          onPress={() => navigation.navigate("Verification")}
        >
          <View className="my-2 self-end">
            <Text
              style={{
                color:
                  user?.user?.accountStatus === "verified"
                    ? "black"
                    : colors.primary,
              }}
              className={`${
                user?.user?.accountStatus === "verified" ? "" : "underline"
              }`}
            >
              {user?.user?.accountStatus === "verified"
                ? "your account is verified"
                : "verify your account now"}
            </Text>
          </View>
        </TouchableNativeFeedback>
        {/* logout */}
        {/* @ts-ignore */}
        {user.user !== "anonymous" && (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#eee", false)}
            onPress={() => {
              dispatch(setUser(null));
              navigation.navigate("logout");
              logOut();
            }}
          >
            <View
              className="my-4 rounded-md"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              <Text className="font-semibold text-white py-2 text-center">
                Logout
              </Text>
            </View>
          </TouchableNativeFeedback>
        )}
      </View>
    </SafeScreenView>
  );
};

export default LandlordSettingsScreen;
