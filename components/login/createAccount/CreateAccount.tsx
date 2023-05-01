import {
  View,
  Text,
  Alert,
  BackHandler,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeScreenView from "../../SafeScreenView";
import FormikField from "../../forms/FormikFiel";
import AppFormField from "../../forms/AppFormField";
import * as Yup from "yup";
import SubmitButton from "../../forms/SubmitButton";
import getDimensions from "../../../config/getDimensions";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import "@react-native-firebase/auth";

// tenant
import TenantFirstStep from "./tenant/TenantFirstStep";
import CheckEmail from "../CheckEmail";

export interface CreateEmail {
  email: string;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  password: string;
  userType: string;
}

const CreateAccount = ({ navigation }: any) => {
  const [tenantStep, setTenantStep] = useState<number>(1);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const handleCancelRegistration = () => navigation.goBack();
  const { width, height } = getDimensions();

  const [emailDetails, setEmailDetails] = useState<string>("");
  const [firstStepDetails, setFirstStepDetails] = useState<CreateUser | null>(
    null
  );
  const [userType, setUserType] = useState("tenant");

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        Alert.alert(
          "Cancel Registration",
          "Are you sure you want to cancel registration?",
          [
            {
              text: "No",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => handleCancelRegistration(),
            },
          ],
          { cancelable: false }
        );
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  const handleCheckEmailSubmit = (
    values: CreateEmail,
    { setSubmitting, setErrors }: any
  ) => {
    firebase
      .auth()
      .fetchSignInMethodsForEmail(values.email.trim())
      .then((doc) => {
        if (doc?.length !== 0) {
          return setErrors({
            email: "please select other email that is not taken",
          });
        }
        setIsValidEmail(true);
      });
  };

  const handleFirstStepSubmit = (values: CreateUser) => {
    setFirstStepDetails(values);
  };

  return (
    <SafeScreenView>
      <View
        className="flex-1 items-center justify-around"
        style={{
          paddingHorizontal: width >= 500 ? width * 0.2 : width * 0.08,
          paddingTop: width <= 360 ? 2 : width * 0.08,
        }}
      >
        <View>
          <View className="flex-1 items-center justify-around">
            {/* logo */}
            <View className="flex-row justify-center">
              <Image
                className="h-[40px] w-[40px] self-center my-2 mx-2"
                source={require("../../../assets/logo.png")}
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
            {/* form */}

            {!isValidEmail && (
              <CheckEmail
                handleCheckEmailSubmit={handleCheckEmailSubmit}
                userType={userType}
                setUserType={setUserType}
              />
            )}
            {isValidEmail && tenantStep === 1 && (
              <TenantFirstStep handleFirstStepSubmit={handleFirstStepSubmit} />
            )}

            {!isValidEmail && (
              <Text className="my-3">already have an account?</Text>
            )}
          </View>
        </View>
      </View>
    </SafeScreenView>
  );
};

export default CreateAccount;
