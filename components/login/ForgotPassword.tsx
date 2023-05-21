import { View, Text, Image, ScrollView, ToastAndroid } from "react-native";
import React, { useState } from "react";
import FormikField from "../forms/FormikField";
import AppFormField from "../forms/AppFormField";
import * as Yup from "yup";
import { horizontalScale } from "../../config/metrics";
import SubmitButton from "../forms/SubmitButton";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import ErrorMessage from "../forms/ErrorMessage";
import DisplayMessage from "./verifyEmail/DisplayMessage";

const ForgotPassword = ({ navigation }: any) => {
  const [resetError, setResetError] = useState("");
  const [displayMessage, setDisplayMessage] = useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("email"),
  });

  const handleSubmit = (val: any, { setErrors }: any) => {
    firebase
      .auth()
      .fetchSignInMethodsForEmail(val.email.trim())
      .then((doc) => {
        if (doc?.length === 0) {
          return setErrors({
            email: "email is not assiociated with any account",
          });
        }
        firebase
          .auth()
          .sendPasswordResetEmail(val.email.trim())
          .then(() => {
            setDisplayMessage(true);
          });
      })
      .catch((err) => console.log(err, "reset email"));
    ToastAndroid.show("reset link has been sent", ToastAndroid.SHORT);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View
        style={{
          paddingHorizontal: horizontalScale(22),
        }}
        className="flex-1 bg-white"
      >
        <FormikField
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Image
            className="w-[120px] h-[120px] self-center"
            source={require("../../assets/verify_email.png")}
            resizeMode="cover"
          />
          <Text className="py-3">
            Enter the email address assiociated with your account and we'll send
            you an instruction to reset your password.
          </Text>
          <AppFormField name="email" placeholder="email" />
          <ErrorMessage error={resetError} />
          <SubmitButton
            title="send"
            containerStyle="w-[40%] self-end"
            textClass="text-white"
          />
        </FormikField>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;
