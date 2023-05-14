import React from "react";
import { View, Text } from "react-native";

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <>
      {error ? (
        <View className="my-1">
          <Text className="text-red-400 px-5">{error}</Text>
        </View>
      ) : null}
    </>
  );
};

export default ErrorMessage;
