import React, { useEffect } from "react";
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

const Routes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: UserSliceInitialState) => state.user);

  const getUserInfo = async () => {
    const uid = await auhtStorage.getId();
    if (uid === "anonymous") {
      dispatch(setUser("anonymous"));
    } else {
      const user = await firebase.auth().currentUser;
      if (user) {
        dispatch(setUser({ user }));
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    const subscriber = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser?.isAnonymous) {
        dispatch(setUser("anonymous"));
        auhtStorage.storeId("anonymous");
      } else if (authUser) {
        dispatch(setUser(authUser));
      }
    });

    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      {user.user === "anonymous" ? <UserRootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
