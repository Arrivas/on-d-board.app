import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableNativeFeedback,
  KeyboardType,
  TextInputProps,
} from "react-native";
import colors from "../../config/colors";
import getDimensions from "../../config/getDimensions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from "../../config/metrics";

interface AppTextInputProps {
  name: string;
  showPassword?: boolean;
  isPassword?: boolean;
  keyboardType?: KeyboardType;
  onShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  iconColor?: string;
  setFieldTouched: () => void;
  description?: boolean;
  iconName: any;
  value: any;
  onChangeText?: () => void;
  placeholder?: string;
  useBorder?: boolean;
  textInputViewClass?: string;
}

const InputText: React.FC<AppTextInputProps> = ({
  name,
  iconName,
  showPassword,
  keyboardType,
  isPassword,
  onShowPassword,
  iconColor = "#4c5464",
  setFieldTouched,
  description = false,
  value,
  placeholder,
  useBorder,
  textInputViewClass,
  ...rest
}) => {
  const [applyBorder, setApplyBorder] = useState(false);
  const { width } = getDimensions();

  return (
    <View
      className={`items-center flex-row rounded-md mb-3 bg-gray-100 ${textInputViewClass}`}
      style={{
        borderWidth: 1,
        borderColor: applyBorder
          ? colors.primary
          : useBorder
          ? "#a6a6a6"
          : "transparent",
        padding: moderateScale(8),
      }}
    >
      {iconName ? (
        <MaterialCommunityIcons
          style={{ left: width >= 500 ? width * 0.015 : width * 0.02 }}
          size={width >= 500 ? width * 0.025 : width * 0.045}
          color={applyBorder ? colors.primary : iconColor}
          iconLibrary="MaterialCommunityIcons"
          name={iconName}
        />
      ) : null}
      <TextInput
        placeholder={placeholder}
        style={{
          fontSize: width >= 500 ? width * 0.018 : width * 0.035,
          paddingHorizontal: width >= 500 ? width * 0.025 : width * 0.035,
        }}
        value={value}
        numberOfLines={description ? 2 : 1}
        multiline={description}
        clearButtonMode="always"
        secureTextEntry={isPassword ? !showPassword : showPassword}
        onBlur={() => {
          setApplyBorder(false);
        }}
        onFocus={() => setApplyBorder(true)}
        keyboardType={keyboardType}
        className="w-[95%]"
        {...rest}
      />
      {isPassword ? (
        <TouchableNativeFeedback
          onPress={() => {
            if (onShowPassword) {
              onShowPassword(!showPassword);
            }
          }}
        >
          <View
            className="absolute "
            style={{
              right: width >= 500 ? width * 0.015 : width * 0.03,
            }}
          >
            <MaterialCommunityIcons
              className="rounded-none bg-transparent p-2"
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              color="#4c5464"
              iconLibrary="MaterialCommunityIcons"
              size={width >= 500 ? width * 0.025 : width * 0.05}
            />
          </View>
        </TouchableNativeFeedback>
      ) : null}
    </View>
  );
};

export default InputText;
