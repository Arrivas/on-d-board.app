import {
  View,
  Text,
  Image,
  Keyboard,
  ToastAndroid,
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { logOut } from "../../../auth/useAuth";
import SafeScreenView from "../../SafeScreenView";
import Icon from "../../Icon";
import colors from "../../../config/colors";
import DisplayMessage from "./DisplayMessage";
import { VerifyEmailProps } from "../../../App";

const VerifyEmail: React.FC<VerifyEmailProps> = ({
  setIsEmailVerified,
  isEmailVerified,
  userState,
}) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isSecondTime, setIsSecondTime] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmailVerification = () => {
    setTimeLeft(20);
    setIsSecondTime(true);
    if (!userState?.email) return;
    setLoading(true);
    userState
      .sendEmailVerification()
      .then(() => {
        ToastAndroid.show("verification sent", ToastAndroid.SHORT);
        setDisplayMessage(true);
        setLoading(false);
      })
      .catch((err: any) => console.log(err, "error"));
    setLoading(false);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
    }
    // exit early when we reach 0
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft]);

  return (
    <>
      {isEmailVerified ? (
        <></>
      ) : (
        <SafeScreenView enablePadding>
          <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View className="flex-1">
                {/* back to log in */}
                <View className="flex-1 items-center justify-center  ">
                  <Image
                    className="h-[100px] w-[100px]"
                    resizeMode="cover"
                    source={require("../../../assets/verify_email.png")}
                  />
                  {userState?.email && (
                    <Text>verify your email first before proceeding</Text>
                  )}
                  <Text className="font-bold pb-5">
                    {userState?.email || "please refresh the application"}
                  </Text>
                  {/* back to log in */}

                  {timeLeft === null ? (
                    <View className="w-[80%]">
                      <TouchableNativeFeedback
                        onPress={() => {
                          sendEmailVerification();
                          // setIsEmailVerified(true);
                        }}
                      >
                        <View
                          className="px-5 py-[14px] items-center rounded-md flex-row justify-center"
                          style={{
                            backgroundColor: colors.primary,
                          }}
                        >
                          <Text className="text-gray-50 font-bold">
                            {isSecondTime ? "re-send" : "send"} verification
                          </Text>
                          {loading ? (
                            <ActivityIndicator className="ml-2" color="white" />
                          ) : (
                            <></>
                          )}
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                  ) : (
                    <View>
                      <Text className="self-center font-semibold text-center">
                        please wait before re-sending again
                      </Text>
                      <Text className="self-center font-light">{timeLeft}</Text>
                    </View>
                  )}
                </View>
                <View className="items-center flex-1">
                  {/* display message */}
                  {displayMessage ? (
                    <DisplayMessage setDisplayMessage={setDisplayMessage} />
                  ) : null}
                  <View className="p-2">
                    <TouchableNativeFeedback
                      onPress={() => {
                        logOut();
                        setIsEmailVerified(false);
                      }}
                    >
                      <View className="flex-row">
                        <Icon size={22} iconLibrary="AntDesign" />
                        <Text>back to log in</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </>
        </SafeScreenView>
      )}
    </>
  );
};

export default VerifyEmail;
