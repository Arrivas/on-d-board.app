import { View, Text, Alert, BackHandler, Image } from "react-native";
import React, { useEffect, useState } from "react";
import SafeScreenView from "../../SafeScreenView";
import getDimensions from "../../../config/getDimensions";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import "@react-native-firebase/auth";
import { setLoading } from "../../../store/loadingSlice";

// tenant
import CreateUserDetails from "./CreateUserDetails";
import CheckEmail from "../CheckEmail";
import { useDispatch } from "react-redux";

export interface CreateEmail {
  email: string;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  password: string;
  userType: string;
  email?: string;
  uid?: string;
  imageUrl?: string;
  accountStatus: string;
}

const CreateAccount = ({ navigation }: any) => {
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const handleCancelRegistration = () => navigation.goBack();
  const { width } = getDimensions();
  const [emailDetails, setEmailDetails] = useState<string>("");
  const [userType, setUserType] = useState("tenant");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

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

  const handleCheckEmailSubmit = (values: CreateEmail, { setErrors }: any) => {
    dispatch(setLoading(true));
    firebase
      .auth()
      .fetchSignInMethodsForEmail(values.email.trim())
      .then((doc) => {
        if (doc?.length !== 0) {
          return setErrors({
            email: "please select other email that is not taken",
          });
        }
        setEmailDetails(values.email.trim());
        setIsValidEmail(true);
      });
    dispatch(setLoading(false));
  };

  const handleCreateUser = async (values: CreateUser) => {
    values.email = emailDetails;
    values.accountStatus = "notVerified";
    try {
      dispatch(setLoading(true));
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password);
      // await user.sendEmailVerification();
      values.uid = user.uid;
      values.imageUrl =
        "https://firebasestorage.googleapis.com/v0/b/on-d-board.appspot.com/o/user.webp?alt=media&token=c8664080-498b-4311-be44-6ea8985081f2";
      values.userType = userType;
      await firebase
        .firestore()
        .collection(`${userType}s`)
        .add(values)
        .then((res) => {
          res.update({ docId: res.id });
        });
      return true;
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      return false;
    }
  };

  return (
    <SafeScreenView>
      <View
        className="flex-1 items-center justify-around"
        style={{
          paddingHorizontal: width >= 500 ? width * 0.2 : width * 0.08,
          paddingTop: width <= 360 ? 2 : width * 0.08,
        }}
      >
        <View>
          <View className="flex-1 items-center justify-around">
            {/* logo */}
            <View className="flex-row justify-center">
              <Image
                className="h-[40px] w-[40px] self-center my-2 mx-2"
                source={require("../../../assets/logo.png")}
              />

              <View className="self-center">
                <Text className="font-bold text-lg leading-6 text-center">
                  On d'
                </Text>
                <Text className="font-bold text-lg leading-6 text-center">
                  Board
                </Text>
              </View>
            </View>
            {/* form */}

            {!isValidEmail && (
              <CheckEmail
                handleCheckEmailSubmit={handleCheckEmailSubmit}
                userType={userType}
                setUserType={setUserType}
              />
            )}
            {isValidEmail && (
              <CreateUserDetails
                handleCreateUser={handleCreateUser}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            )}

            {!isValidEmail && (
              <Text className="mb-4 mt-2 text-gray-400">
                already have an account?
              </Text>
            )}
          </View>
        </View>
      </View>
    </SafeScreenView>
  );
};

export default CreateAccount;
