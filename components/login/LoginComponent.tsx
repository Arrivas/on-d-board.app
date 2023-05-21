import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableNativeFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import FormikField from "../forms/FormikField";
import AppFormField from "../forms/AppFormField";
import SubmitButton from "../forms/SubmitButton";
import SafeScreenView from "../SafeScreenView";
import getDimensions from "../../config/getDimensions";
import GoogleSvg from "./GoogleSvg";
import colors from "../../config/colors";
import { firebase } from "@react-native-firebase/auth";
import { setLoading } from "../../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { LoadingSliceInitialState } from "../../App";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

interface LoginVal {
  email: string;
  password: string;
}

const LoginComponent = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const { width } = getDimensions();
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: LoadingSliceInitialState) => state.loading
  );

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = () =>
    Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

  const handleSubmit = async (values: LoginVal, { setErrors }: any) => {
    dispatch(setLoading(true));
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(values.email.trim(), values.password);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setErrors({ email: "email is not registered" });
      } else if (error.code === "auth/wrong-password") {
        setErrors({ password: "invalid email or password" });
      }
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "330920771163-te4atc96gjij5a9euihacqidn9tkjk9m.apps.googleusercontent.com",
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCred = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );
      await firebase.auth().signInWithCredential(googleCred);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log("cancelled");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("cancelled");
      } else {
        // some other error happened
        console.log("cancelled 4", error);
      }
    }
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
            <FormikField
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
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
