import React, { isValidElement, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
import auhtStorage from "../auth/storage";
import AuthStack from "./auth/AuthStack";
import UserRootStack from "./user/UserRootStack";
import { setUser } from "../store/userSlice";
import { logIn } from "../auth/useAuth";
import VerifyEmail from "../components/login/verifyEmail/VerifyEmail";
import LandlordRootStack from "./landlord/LandlordRootStack";
import ActivityIndicator from "../components/ActivityIndicator";
import { RootState } from "../store";
import { setLoading } from "../store/loadingSlice";
import HigherAdminTab from "./userAdmin/HigherAdminTab";

const Routes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const loading = useSelector((state: RootState) => state.loading);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [userState, setUserState] = useState<any>(null);
  const [refreshInterval, setRefreshInterval] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const getUserInfo = async () => {
    dispatch(setLoading(true));
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
        .then(async (data) => {
          if (!data.empty) {
            dispatch(setLoading(false));
            return data.forEach((doc) => fetchedUser.push(doc.data()));
          }
          await firebase
            .firestore()
            .collection("landlords")
            .limit(1)
            .where("uid", "==", uid)
            .get()
            .then((data) => {
              return data.forEach((doc) => fetchedUser.push(doc.data()));
            });
          await firebase
            .firestore()
            .collection("higherAdmins")
            .limit(1)
            .where("uid", "==", uid)
            .get()
            .then((data) => {
              data.forEach((doc) => fetchedUser.push(doc.data()));
            });
        })
        .catch(async () => {
          console.log("cannot get user info");
        });
      dispatch(setLoading(false));
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
      <ActivityIndicator isVisible={loading?.loading} />
      {(user?.user?.userType === "tenant" && !isEmailVerified) ||
      (user?.user?.userType === "landlord" && !isEmailVerified) ? (
        <VerifyEmail
          isEmailVerified={isEmailVerified}
          setIsEmailVerified={setIsEmailVerified}
          userState={userState}
        />
      ) : user?.user?.userType === "higherAdmin" ? (
        <HigherAdminTab />
      ) : // @ts-ignore
      user?.user === "anonymous" || user?.user?.userType === "tenant" ? (
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
