import { View, Text, Image, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import getDimensions from "../../config/getDimensions";
import Icon from "../Icon";
import SafeScreenView from "../SafeScreenView";
import { verticalScale, moderateScale } from "../../config/metrics";
import HomeSearch from "./home/HomeSearch";
import AppartmentsCard from "./home/AppartmentsCard";
import { fetchApartments } from "../../functions/fetchApartments";
import { useDispatch, useSelector } from "react-redux";
import { setApartments } from "../../store/apartmentsSlice";
import { RootState } from "../../store";
import { setBooking } from "../../store/bookingSlice";
import { fetchBookings } from "../../functions/fetchBookings";
import HomeMap from "./home/HomeMap";
import BookingsItemCard from "./home/BookingsItemCard";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import { BookingItems } from "../../App";
import SearchModal from "./home/SearchModal";

const UserHomeScreen = ({ navigation }: any) => {
  const apartments = useSelector(
    (state: RootState) => state.apartments.apartments
  );
  const user = useSelector((state: RootState) => state.user.user);
  const bookings = useSelector((state: RootState) => state.booking.bookings);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { width } = getDimensions();

  function unsubscribe() {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("tenants")
        .doc(user?.docId)
        .collection("bookings")
        .onSnapshot(
          (snapshot) => {
            if (snapshot.empty) {
              resolve([]); // Resolve with an empty array if snapshot is empty
              return;
            }
            const result: any = [];
            snapshot.forEach((doc) => {
              const bookingData = doc.data();
              const bookingWithShowState = { ...bookingData, showState: false };
              result.push(bookingWithShowState);
            });
            resolve(result); // Resolve with the result array
          },
          (error) => {
            console.log(error);
            reject(error); // Reject with the error if onSnapshot encounters an error
          }
        );
    });
  }
  useEffect(() => {
    let isMounted = true;
    let unsubscribe: any;
    if (isMounted) {
      fetchApartments(5, undefined, user?.userType).then((res) =>
        dispatch(setApartments(res))
      );
      unsubscribe = firebase
        .firestore()
        .collection("tenants")
        .doc(user?.docId)
        .collection("bookings")
        .onSnapshot(
          (snapshot) => {
            if (snapshot.empty) return;
            const result: BookingItems[] = [];
            snapshot.forEach((doc) => {
              const bookingData = doc.data() as BookingItems;
              const bookingWithShowState = { ...bookingData, showState: false };
              result.push(bookingWithShowState);
            });
            dispatch(setBooking(result));
          },
          (error) => {
            console.log(error);
          }
        );
      fetchBookings(user.docId).then((res) => dispatch(setBooking(res)));
    }
    return () => {
      unsubscribe();

      isMounted = false;
    };
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      unsubscribe().then((res) => dispatch(setBooking(res)));
      fetchApartments(5, undefined, user?.userType).then((res) =>
        dispatch(setApartments(res))
      );
      setRefreshing(false);
    }, 1000);
  }, []);

  const recentFilteredBookings = bookings.filter((item) => {
    if (item.bookingDetails.bookingStatus === "completed") return;
    else if (item.bookingDetails.bookingStatus == "cancelled") return;
    else return item;
  });

  return (
    <SafeScreenView>
      <View className="flex-1 px-[2px]">
        {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
        <View
          className="w-full overflow-hidden rounded-b-[40px]"
          style={{
            height: verticalScale(250),
          }}
        >
          {/* search */}
          <HomeSearch
            search={search}
            setSearch={setSearch}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />

          <Image
            className="w-full object-cover rounded-b-[25px] -z-50"
            source={require("../../assets/capitol_2.jpg")}
            style={{
              transform: [{ scale: 1.3 }],
              height: verticalScale(250),
            }}
          />

          <View className="absolute inset-0 bg-black/40 w-full h-full " />
        </View>
        {/* </TouchableWithoutFeedback> */}
        {/* amenity */}
        {/* <AmenityFilter
          setSelectedPerks={setSelectedPerks}
          selectedPerks={selectedPerks}
        /> */}
        {/* contents */}
        <View
          className={`${
            recentFilteredBookings?.length !== 0 ? "top-1" : "-top-10"
          }`}
          style={{
            paddingHorizontal: width >= 500 ? width * 0.1 : width * 0.06,
            flex: 1,
          }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View className="flex-1">
              {recentFilteredBookings?.length !== 0 && (
                <View className="-top-2 p-1">
                  <Text className="font-bold py-2">Recently Booked</Text>
                  <ScrollView
                    horizontal
                    contentContainerStyle={{ flexGrow: 0 }}
                    showsHorizontalScrollIndicator={false}
                  >
                    {recentFilteredBookings?.map((item) => {
                      return (
                        <BookingsItemCard
                          key={item.tenantBookDocId}
                          bookings={item}
                          navigation={navigation}
                        />
                      );
                    })}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* recommended */}
            <View
              className={`flex-1 ${
                recentFilteredBookings?.length === 0 ? "mt-10" : "mt-0"
              }`}
            >
              <View>
                {apartments?.length !== 0 ? (
                  <Text className="font-bold py-2">Recommended for you</Text>
                ) : (
                  <Text className="font-thin text-xs self-center">
                    no available apartments at the moment..
                  </Text>
                )}

                <ScrollView
                  horizontal
                  contentContainerStyle={{ flexGrow: 0 }}
                  showsHorizontalScrollIndicator={false}
                >
                  {apartments.map((item, index) => {
                    return (
                      <AppartmentsCard
                        apartmentDetails={item}
                        navigation={navigation}
                        key={item.docId}
                      />
                    );
                  })}
                </ScrollView>
              </View>
              <HomeMap navigation={navigation} />
            </View>
          </ScrollView>
        </View>
      </View>
      <SearchModal
        navigation={navigation}
        apartments={apartments}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeScreenView>
  );
};

export default UserHomeScreen;
