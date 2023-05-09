import React from "react";
import {
  TouchableNativeFeedback,
  View,
  Text,
  Keyboard,
  ActivityIndicator,
  TextStyle,
  ViewStyle,
  StyleProp,
} from "react-native";
import { useFormikContext } from "formik";
import colors from "../../config/colors";
import Icon from "../Icon";
import { moderateScale } from "../../config/metrics";

interface SubmitButtonProps {
  title: string;
  containerStyle?: string;
  disabled?: boolean;
  defaultStyle?: boolean;
  mode?: string;
  loading?: boolean;
  textStyle?: StyleProp<TextStyle>;
  textClass?: string;
  extraStyle?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title = "",
  containerStyle = "",
  disabled = false,
  defaultStyle = true,
  mode = "default",
  loading = false,
  textStyle,
  textClass,
  extraStyle,
}) => {
  const { handleSubmit } = useFormikContext();

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#eee", false)}
      disabled={disabled}
      onPress={() => {
        Keyboard.dismiss();
        return handleSubmit();
      }}
    >
      {mode === "default" ? (
        <View
          className={
            defaultStyle
              ? `${
                  disabled ? "opacity-70" : "opacity-100"
                } p-3 my-1 self-center items-center ${
                  loading ? "flex-row justify-center items-center" : ""
                } rounded-md ${extraStyle} `
              : containerStyle
          }
          style={{
            width: "100%",
            backgroundColor: defaultStyle ? colors.primary : "",
          }}
        >
          <Text
            className={`${textClass} `}
            style={[
              textStyle,
              {
                fontSize: moderateScale(16),
              },
            ]}
          >
            {title}
          </Text>
          {loading ? <ActivityIndicator size="small" color="white" /> : <></>}
        </View>
      ) : mode === "chevronRight" ? (
        <View className="flex-row p-2 self-end items-center">
          <Text className={`${textClass} text-lg`} style={textStyle}>
            {title}
          </Text>
          <Icon
            materialComName="chevron-right"
            color="black"
            iconLibrary="MaterialCommunityIcons"
            size={25}
          />
        </View>
      ) : (
        <View
          className={`flex-row self-end bg-[${colors.primary}] rounded-md items-center p-2 m-2`}
        >
          <Text className={`${textClass} text-lg`} style={textStyle}>
            {title}
          </Text>
          <Icon
            className="pl-1"
            materialName="send"
            iconLibrary="MaterialIcons"
            color="white"
          />
        </View>
      )}
    </TouchableNativeFeedback>
  );
};

export default SubmitButton;
