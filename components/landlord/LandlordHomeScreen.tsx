import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  ToastAndroid,
} from "react-native";
import React, { useEffect } from "react";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import { Apartments } from "../../App";
import { fetchApartments } from "../../functions/fetchApartments";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import SafeScreenView from "../SafeScreenView";
import LandlordApartmentCard from "./home/LandlordApartmentCard";
import Icon from "../Icon";
import { setApartments } from "../../store/apartmentsSlice";
import { setLoading } from "../../store/loadingSlice";

const LandlordHomeScreen = ({ navigation }: any) => {
  const user = useSelector((state: RootState) => state.user);
  const apartments = useSelector(
    (state: RootState) => state.apartments.apartments
  );
  const { apartmentIds } = user.user;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    let isMounted = true;
    if (isMounted) {
      fetchApartments(undefined, apartmentIds).then((res) =>
        dispatch(setApartments(res))
      );
    }
    dispatch(setLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRemoveApartment = async (
    apartmentRoomsId: string | undefined,
    currentDocId: string
  ) => {
    dispatch(setLoading(true));
    const apartmentsCopy = [...apartments];
    if (apartmentRoomsId !== undefined || apartmentRoomsId !== "") {
    }
    await firebase
      .firestore()
      .collection("apartmentRooms")
      .doc(apartmentRoomsId)
      .delete();
    const newApartments = apartmentsCopy.filter(
      (item) => item.docId !== currentDocId
    );
    dispatch(setApartments(newApartments));
    await firebase
      .firestore()
      .collection("apartments")
      .doc(currentDocId)
      .delete();
    ToastAndroid.show("removed successfully", ToastAndroid.SHORT);
    dispatch(setLoading(false));
  };

  return (
    <SafeScreenView>
      <View className="flex-1 p-5">
        <Text className="font-bold text-2xl">My Apartments</Text>
        <View className="mt-5">
          <ScrollView>
            {apartments?.map((item: Apartments, index: number) => {
              return (
                <LandlordApartmentCard
                  handleRemoveApartment={handleRemoveApartment}
                  key={index}
                  item={item}
                  navigation={navigation}
                />
              );
            })}
            <TouchableNativeFeedback>
              <View className="flex-row items-center bg-gray-100 w-full p-5 rounded-md">
                <Icon antName="plus" iconLibrary="AntDesign" />
                <Text className="font-semibold">add apartment</Text>
              </View>
            </TouchableNativeFeedback>
          </ScrollView>
        </View>
      </View>
    </SafeScreenView>
  );
};

export default LandlordHomeScreen;
