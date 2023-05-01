import { View, Text, TouchableNativeFeedback } from "react-native";
import React from "react";
import FormikField from "../forms/FormikFiel";
import AppFormField from "../forms/AppFormField";
import SubmitButton from "../forms/SubmitButton";
import * as Yup from "yup";
import { CreateEmail } from "./createAccount/CreateAccount";
import colors from "../../config/colors";

interface TenantFirstStepProps {
  handleCheckEmailSubmit: (
    values: CreateEmail,
    { setSubmitting, setErrors }: any
  ) => void;
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
}

const userTypItems = [
  { id: 1, label: "Tenant", value: "tenant" },
  { id: 2, label: "Landlord", value: "landlord" },
];

const CheckEmail: React.FC<TenantFirstStepProps> = ({
  handleCheckEmailSubmit,
  userType,
  setUserType,
}) => {
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
  });

  const initialValues = {
    email: "",
  };

  return (
    <View style={{ flex: 1 }} className="w-full  justify-center">
      <Text className="my-2 self-start">Your email address</Text>
      <FormikField
        onSubmit={handleCheckEmailSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="email"
          placeholder="example@example.com"
          iconName="email"
        />
        {/* usertype */}
        <View className=" flex-row justify-between my-4">
          <Text className="font-semibold">User Type:</Text>
          <View className="flex-row sapce-x-5">
            {userTypItems.map((item) => (
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple("#eee", false)}
                onPress={() => setUserType(item.value)}
                key={item.id}
              >
                <View className="py-3 px-5">
                  <Text
                    className="font-semibold"
                    style={{
                      color:
                        userType === item.value
                          ? colors.primary
                          : colors.lightGray,
                    }}
                  >
                    {item.label}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </View>
        </View>

        <SubmitButton
          title="Next"
          textClass="text-white rounded-md"
          extraStyle="rounded-md"
        />
      </FormikField>
    </View>
  );
};

export default CheckEmail;
