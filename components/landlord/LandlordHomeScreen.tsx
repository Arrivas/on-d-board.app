import { View, Text, ScrollView, TouchableNativeFeedback } from "react-native";
import React, { useEffect, useState } from "react";
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

  return (
    <SafeScreenView>
      <View className="flex-1 p-5">
        <Text className="font-bold text-2xl">My Apartments</Text>
        <View className="mt-5">
          <ScrollView>
            {apartments?.map((item: Apartments, index: number) => {
              return (
                <LandlordApartmentCard
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
