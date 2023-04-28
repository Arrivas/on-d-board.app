import React from "react";
import { View, Text } from "react-native";
import { useFormikContext } from "formik";
import AppTextInput from "./AppTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AppFormFieldProps {
  name: string;
  showPassword?: boolean;
  onShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  onShowSelectTime?: React.Dispatch<React.SetStateAction<boolean>>;
  containerStyle?: string;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  customError?: string;
  description?: boolean;
  placeholder?: string;
  isPassword?: boolean;
}

const AppFormField: React.FC<AppFormFieldProps> = ({
  name,
  showPassword,
  onShowPassword,
  onShowSelectTime,
  containerStyle = "",
  iconName,
  customError,
  description,
  placeholder,
  isPassword,
  ...rest
}) => {
  const { setFieldTouched, handleChange, errors, touched, values }: any =
    useFormikContext();

  return (
    <View className={containerStyle}>
      <AppTextInput
        isPassword={isPassword}
        placeholder={placeholder}
        value={values[name]}
        onChangeText={handleChange(name)}
        name={name}
        setFieldTouched={setFieldTouched}
        showPassword={showPassword}
        onShowPassword={onShowPassword}
        iconName={iconName}
        description={description}
        {...rest}
      />
      {errors[name] && touched[name] && (
        <Text className={`text-red-400 px-5 bottom-2`}>
          {customError ? customError : errors[name]}
        </Text>
      )}
      {customError && (
        <Text className={`text-red-400 px-5 bottom-2`}>{customError}</Text>
      )}
    </View>
  );
};

export default AppFormField;
