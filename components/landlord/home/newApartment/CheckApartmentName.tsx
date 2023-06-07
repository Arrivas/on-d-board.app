import { View, Text } from "react-native";
import React from "react";
import FormikField from "../../../forms/FormikField";
import AppFormField from "../../../forms/AppFormField";
import SubmitButton from "../../../forms/SubmitButton";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/app";
import * as Yup from "yup";

interface CheckApartmentNameProps {
  setProgress: React.Dispatch<React.SetStateAction<string | number>>;
  setFirstStepValues: React.Dispatch<
    React.SetStateAction<{ apartmentName: string; description: string }>
  >;
  firstStepValues: {
    apartmentName: string;
    description: string;
  };
}

const CheckApartmentName: React.FC<CheckApartmentNameProps> = ({
  setProgress,
  setFirstStepValues,
  firstStepValues,
}) => {
  const handleSubmit = async (values: any, { setErrors }: any) => {
    const res = await firebase
      .firestore()
      .collection("apartments")
      .where("apartmentInfo.apartmentName", "==", values.apartmentName)
      .limit(1)
      .get();
    if (!res.empty)
      return setErrors({ apartmentName: "apartment name already exists" });
    setFirstStepValues(values);
    setProgress(2);
  };

  const validationSchema = Yup.object({
    apartmentName: Yup.string().required("field must not be empty"),
    description: Yup.string().required("field must not be empty"),
  });

  const initialValues = {
    apartmentName: firstStepValues?.apartmentName || "",
    description: firstStepValues?.description || "",
  };

  return (
    <>
      <Text className="font-semibold text-2xl mb-2">New Apartment</Text>
      <FormikField
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <View>
          <Text className="text-xs self-start">apartment name</Text>
          <AppFormField name="apartmentName" placeholder="Apartment Name" />
          <Text className="text-xs self-start">description</Text>
          <AppFormField
            name="description"
            placeholder="Description"
            description={true}
          />
        </View>
        <View className="self-end">
          <SubmitButton
            mode="chevronRight"
            title="next"
            textClass="text-black"
          />
        </View>
      </FormikField>
    </>
  );
};

export default CheckApartmentName;
