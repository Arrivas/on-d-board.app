import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableNativeFeedback,
} from "react-native";
import React, { useState } from "react";
import FormikField from "../forms/FormikFiel";
import AppFormField from "../forms/AppFormField";
import SubmitButton from "../forms/SubmitButton";
import SafeScreenView from "../SafeScreenView";
import getDimensions from "../../config/getDimensions";
import GoogleSvg from "./GoogleSvg";
import colors from "../../config/colors";

interface LoginVal {
  email: string;
  password: string;
}

const LoginComponent = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const { width } = getDimensions();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: LoginVal) => {
    console.log(values);
  };

  const handleGoogleSignIn = () => {
    console.log("google signin");
  };

  return (
    <SafeScreenView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          className="items-center flex-1"
          style={{
            paddingHorizontal: width >= 500 ? width * 0.2 : width * 0.08,
          }}
        >
          <View
            className=" w-full justify-center"
            style={{
              paddingTop: width * 0.05,
            }}
          >
            <View>
              <Image
                className="h-[80px] w-[80px] self-center my-2"
                source={require("../../assets/logo.png")}
              />
              <View className="mb-2">
                <Text className="text-center">
                  Welcome! login to your account
                </Text>
              </View>
            </View>
            <FormikField initialValues={initialValues} onSubmit={handleSubmit}>
              <AppFormField
                name="email"
                iconName="email"
                placeholder="email@address.com"
              />
              <AppFormField
                name="password"
                isPassword={true}
                iconName="lock"
                placeholder="password"
                showPassword={showPassword}
                onShowPassword={setShowPassword}
              />
              <SubmitButton title="Login" textClass="text-white" />
            </FormikField>
            <View className="py-2">
              <TouchableNativeFeedback
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <View className="self-start">
                  <Text
                    className="text-gray-400 py-1"
                    style={{
                      // fontSize: width >= 500 ? width * 0.018 : width * 0.032,
                      fontSize: 13,
                    }}
                  >
                    forgot password?
                  </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => navigation.navigate("Create Account")}
              >
                <View className="self-start">
                  <Text
                    className="text-gray-400 text-xs py-1"
                    style={{
                      // fontSize: width >= 500 ? width * 0.018 : width * 0.032,
                      fontSize: 13,
                    }}
                  >
                    create account
                  </Text>
                </View>
              </TouchableNativeFeedback>
              <View
                className="border-b border-gray-200 w-[70%] self-center"
                style={{
                  paddingVertical: width * 0.03,
                }}
              />
              <TouchableWithoutFeedback onPress={handleGoogleSignIn}>
                <View
                  className="flex-row self-center justify-center items-center"
                  style={{
                    paddingVertical: width * 0.09,
                  }}
                >
                  <GoogleSvg />
                  <Text
                    className="ml-2 font-semibold"
                    style={{
                      color: colors.primary,
                      fontSize: width >= 500 ? width * 0.025 : width * 0.035,
                    }}
                  >
                    Sign In With Google
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View
            className=" w-full"
            style={{
              flex: 0.5,
            }}
          ></View>
        </View>
      </TouchableWithoutFeedback>
    </SafeScreenView>
  );
};

export default LoginComponent;