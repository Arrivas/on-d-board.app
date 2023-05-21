import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import getDimensions from "../../config/getDimensions";
import Icon from "../Icon";
import SafeScreenView from "../SafeScreenView";
import { verticalScale, moderateScale } from "../../config/metrics";
import HomeSearch from "./home/HomeSearch";
import AmenityFilter from "./home/AmenityFilter";
import AppartmentsCard from "./home/AppartmentsCard";
import colors from "../../config/colors";
import { fetchApartments } from "../../functions/fetchApartments";
import { useDispatch, useSelector } from "react-redux";
import { setApartments } from "../../store/apartmentsSlice";
import { RootState } from "../../store";
import { setBooking } from "../../store/bookingSlice";
import { fetchBookings } from "../../functions/fetchBookings";
import { horizontalScale } from "../../config/metrics";
import HomeMap from "./home/HomeMap";
import BookingsItemCard from "./home/BookingsItemCard";
import { BookingSliceState } from "../../App";

const UserHomeScreen = ({ navigation }: any) => {
  const apartments = useSelector(
    (state: RootState) => state.apartments.apartments
  );
  const user = useSelector((state: RootState) => state.user.user);
  const bookings = useSelector((state: RootState) => state.booking.bookings);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [selectedPerks, setSelectedPerks] = useState([]);

  const { width } = getDimensions();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchApartments(5, undefined).then((res) => dispatch(setApartments(res)));
      fetchBookings(user.docId).then((res) => dispatch(setBooking(res)));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const recentFilteredBookings = bookings.filter((item) => {
    if (item.bookingDetails.bookingStatus === "completed") return;
    else if (item.bookingDetails.bookingStatus == "cancelled") return;
    else return item;
  });

  return (
    <SafeScreenView>
      <View className="flex-1 px-[2px]">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            className="w-full h-[320px] overflow-hidden rounded-b-[40px]"
            style={{
              height: verticalScale(250),
            }}
          >
            {/* search */}
            <HomeSearch search={search} setSearch={setSearch} />

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
        </TouchableWithoutFeedback>
        {/* amenity */}
        {/* <AmenityFilter
          setSelectedPerks={setSelectedPerks}
          selectedPerks={selectedPerks}
        /> */}
        {/* contents */}
        <View
          className="top-2"
          style={{
            paddingHorizontal: width >= 500 ? width * 0.1 : width * 0.06,
            flex: 1,
          }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
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
            <View className="flex-1">
              <View>
                <Text className="font-bold py-2">Recommended for you</Text>
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
    </SafeScreenView>
  );
};

export default UserHomeScreen;
