import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import FormikField from "../../forms/FormikFiel";
import AppFormField from "../../forms/AppFormField";
import SubmitButton from "../../forms/SubmitButton";
import * as Yup from "yup";
import { CreateUser } from "./CreateAccount";

interface CreateUserDetailsProps {
  handleCreateUser: (values: CreateUser) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateUserDetails: React.FC<CreateUserDetailsProps> = ({
  handleCreateUser,
  showPassword,
  setShowPassword,
}) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "must be a valid phone number 09xxxxxxxxx")
      .min(11, "too short")
      .max(11, "too long")
      .required(),
    password: Yup.string()
      .required()
      .min(6, "password is too short - should be 6 chars minimum.")
      .max(16, "password is too long - should be 16 chars maximum."),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }} className="w-full items-center justify-center">
        <Text className="my-2 self-start">enter necessary details</Text>
        <FormikField
          onSubmit={handleCreateUser}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <AppFormField
            name="firstName"
            placeholder="first name"
            iconName="account"
          />
          <AppFormField
            name="lastName"
            placeholder="last name"
            iconName="account"
          />
          <AppFormField
            name="phoneNumber"
            placeholder="phoneNumber"
            iconName="phone"
          />
          <AppFormField
            name="password"
            placeholder="password"
            iconName="lock"
            isPassword={true}
            showPassword={showPassword}
            onShowPassword={setShowPassword}
          />

          <SubmitButton
            title="Next"
            textClass="text-white rounded-md"
            extraStyle="rounded-md"
          />
        </FormikField>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateUserDetails;
