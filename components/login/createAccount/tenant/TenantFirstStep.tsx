import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import FormikField from "../../../forms/FormikFiel";
import AppFormField from "../../../forms/AppFormField";
import SubmitButton from "../../../forms/SubmitButton";
import * as Yup from "yup";
import { CreateEmail, CreateUser } from "../CreateAccount";

interface TenantFirstStepProps {
  handleFirstStepSubmit: (values: CreateUser) => void;
}

const TenantFirstStep: React.FC<TenantFirstStepProps> = ({
  handleFirstStepSubmit,
}) => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    phoneNumber: Yup.string().required(),
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
          onSubmit={handleFirstStepSubmit}
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
          <AppFormField name="phoneNumber" placeholder="+63" iconName="phone" />
          <AppFormField
            name="password"
            placeholder="password"
            iconName="lock"
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

export default TenantFirstStep;
