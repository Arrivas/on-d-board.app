import React, { isValidElement, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserSliceInitialState } from "../App";
import { useDispatch, useSelector } from "react-redux";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
import auhtStorage from "../auth/storage";
import AuthStack from "./auth/AuthStack";
import UserRootStack from "./user/UserRootStack";
import { setUser } from "../store/userSlice";
import { logIn, logOut } from "../auth/useAuth";
import VerifyEmail from "../components/login/verifyEmail/VerifyEmail";
import LandlordRootStack from "./landlord/LandlordRootStack";

const Routes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: UserSliceInitialState) => state.user);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [userState, setUserState] = useState<any>(null);
  const [refreshInterval, setRefreshInterval] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const getUserInfo = async () => {
    const fetchedUser: any = [];
    const uid = await auhtStorage.getId();
    if (uid === "anonymous") {
      dispatch(setUser("anonymous"));
    } else {
      await firebase
        .firestore()
        .collection("tenants")
        .limit(1)
        .where("uid", "==", uid)
        .get()
        .then((data) => {
          data.forEach((doc) => fetchedUser.push(doc.data()));
        })
        .catch(async () => {
          await firebase
            .firestore()
            .collection("landlords")
            .limit(1)
            .where("uid", "==", uid)
            .get()
            .then((data) => {
              data.forEach((doc) => fetchedUser.push(doc.data()));
            });
        });

      dispatch(setUser(fetchedUser[0]));
    }
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        if (authUser?.isAnonymous) {
          dispatch(setUser("anonymous"));
          logIn("anonymous");
          setIsEmailVerified(true);
          clearInterval(refreshInterval);
        } else {
          logIn(authUser?.uid);
          getUserInfo();
          setUserState(authUser);
          if (authUser?.emailVerified === true) {
            setIsEmailVerified(true);
          }

          authUser.reload().then(() => {
            setIsEmailVerified(authUser.emailVerified);
          });
        }
      }
    });

    if (firebase.auth().currentUser?.uid) {
      getUserInfo();
    }

    return () => {
      clearInterval(refreshInterval);
      subscriber();
    };
  }, []);

  useEffect(() => {
    let interval: any;
    if (!isEmailVerified && userState) {
      interval = setInterval(() => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser && !refreshing) {
          if (currentUser?.emailVerified === true) {
            logIn(currentUser.uid);
            getUserInfo();
            setRefreshing(false);
          }
          setRefreshing(true);
          currentUser.reload().then(() => {
            setRefreshing(false);
            setIsEmailVerified(currentUser.emailVerified);
          });
        }
      }, 2000);
      setRefreshInterval(interval);
    } else {
      clearInterval(refreshInterval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isEmailVerified, userState]);

  return (
    <NavigationContainer>
      {(user?.user?.userType === "tenant" && !isEmailVerified) ||
      (user?.user?.userType === "landlord" && !isEmailVerified) ? (
        <VerifyEmail
          isEmailVerified={isEmailVerified}
          setIsEmailVerified={setIsEmailVerified}
          userState={userState}
        />
      ) : user?.user === "anonymous" || user?.user?.userType === "tenant" ? (
        <UserRootStack />
      ) : user?.user?.userType === "landlord" ? (
        <LandlordRootStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Routes;
