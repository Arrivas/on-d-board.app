import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import { Apartments } from "../../App";
import { fetchApartments } from "../../functions/fetchApartments";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import SafeScreenView from "../SafeScreenView";
import LandlordApartmentCard from "./home/LandlordApartmentCard";
import Icon from "../Icon";

const LandlordHomeScreen = ({ navigation }: any) => {
  const user = useSelector((state: RootState) => state.user);
  const { apartmentIds } = user.user;
  const [apartments, setApartments] = useState<Apartments[]>();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchApartments(undefined, apartmentIds).then((res) =>
        setApartments(res)
      );
    }

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
            {apartments?.map((item) => {
              return (
                <LandlordApartmentCard
                  key={item.docId}
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
