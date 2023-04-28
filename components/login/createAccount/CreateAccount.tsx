import { View, Text, Alert, BackHandler } from "react-native";
import React, { useEffect } from "react";
import SafeScreenView from "../../SafeScreenView";

const CreateAccount = ({ navigation }: any) => {
  const handleCancelRegistration = () => navigation.goBack();

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
  return (
    <SafeScreenView>
      <View>
        <Text>CreateAccount</Text>
      </View>
    </SafeScreenView>
  );
};

export default CreateAccount;
