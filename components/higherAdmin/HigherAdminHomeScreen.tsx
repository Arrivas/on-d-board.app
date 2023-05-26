import React, { useState, useContext } from "react";
import { Alert, View, Text, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import SafeScreenView from "../SafeScreenView";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/storage";
import "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setUser } from "../../store/userSlice";
import { setLoading } from "../../store/loadingSlice";
import Tenant from "./home/Tenant";
import getDimensions from "../../config/getDimensions";
import NoItemsYet from "../NoItemsYet.";

const HigherAdminHomeScreen = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const dispatch = useDispatch();
  const { height, width } = getDimensions();

  const handleDecline = (request: any) => {
    Alert.alert("Decline", "you are about to decline this credentials?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          const collection =
            request.from === "tenant" ? "tenants" : "landlords";
          const docId =
            request.from === "tenant"
              ? request.tenantDocId
              : request.landlordDocId;

          firebase
            .firestore()
            .collection(collection)
            .doc(docId)
            .get()
            .then((doc) => {
              const data: any = doc.data();
              data.accountStatus = "declined";

              firebase
                .firestore()
                .collection(collection)
                .doc(docId)
                .update(data)
                .then(() => {
                  dispatch(setLoading(false));
                })
                .catch((err) => {
                  console.log(err);
                  dispatch(setLoading(false));
                });
            })
            .catch((err) => {
              console.log(err);
              dispatch(setLoading(false));
            });

          const updatedRequests = user.requests.filter((item: any) =>
            request.from === "tenant"
              ? item.tenantDocId !== request.tenantDocId
              : item.landlordDocId !== request.landlordDocId
          );

          const userCopy = { ...user, requests: updatedRequests };

          firebase
            .firestore()
            .collection("higherAdmins")
            .doc(user.docId)
            .update(userCopy)
            .then(() => {
              dispatch(setUser(userCopy));
            })
            .catch((err) => {
              console.log(err);
            });

          dispatch(setLoading(false));
        },
      },
    ]);
  };

  const handleAccept = (request: any) => {
    Alert.alert(
      "Approve",
      "confirmed that you are about to approve this credentials?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch(setLoading(true));

            const collection =
              request.from === "tenant" ? "tenants" : "landlords";
            const docId =
              request.from === "tenant"
                ? request.tenantDocId
                : request.landlordDocId;

            firebase
              .firestore()
              .collection(collection)
              .doc(docId)
              .get()
              .then((doc) => {
                const data: any = doc.data();
                data.accountStatus = "verified";

                firebase
                  .firestore()
                  .collection(collection)
                  .doc(docId)
                  .update(data)

                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });

            const updatedRequests = user.requests.filter((item: any) =>
              request.from === "customer"
                ? item.tenantDocId !== request.tenantDocId
                : item.landlordDocId !== request.landlordDocId
            );

            const userCopy = { ...user, requests: updatedRequests };

            firebase
              .firestore()
              .collection("higherAdmins")
              .doc(user.docId)
              .update(userCopy)
              .then(() => {
                dispatch(setUser(userCopy));
              })
              .catch((err) => {
                console.log(err);
              });
            dispatch(setLoading(false));
          },
        },
      ]
    );
  };

  return (
    <SafeScreenView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {user?.requests?.length !== 0 ? (
          user?.requests?.map((item: any) => (
            <View key={item.createdAt}>
              {item.from === "tenant" ? (
                <Tenant
                  item={item}
                  height={height}
                  width={width}
                  loading={loading}
                  handleDecline={handleDecline}
                  handleAccept={handleAccept}
                />
              ) : (
                <></>
                // <Shop
                //   item={item}
                //   height={height}
                //   width={width}
                //   loading={loading}
                //   handleDecline={handleDecline}
                //   handleAccept={handleAccept}
                // />
              )}
            </View>
          ))
        ) : (
          <NoItemsYet />
        )}
      </ScrollView>
    </SafeScreenView>
  );
};

export default HigherAdminHomeScreen;
