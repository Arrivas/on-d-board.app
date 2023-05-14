import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableNativeFeedback,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
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

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchApartments(5, undefined).then((res) => dispatch(setApartments(res)));
      fetchBookings(user.docId).then((res) => dispatch(setBooking(res)));
    }

    // const scrollListener = () => {
    //   const offsetY = scrollY.interpolate({
    //     inputRange: [0, 1], // Adjust the input range as per your requirement
    //     outputRange: [0, 1], // Adjust the output range as per your requirement
    //     extrapolate: 'clamp',
    //   });
    //   if (Animated. > 0) {
    //     Animated.timing(headerHeight, {
    //       toValue: 100, // Adjust the new header height when scrolled down
    //       duration: 300,
    //       useNativeDriver: false,
    //     }).start();
    //   } else {
    //     Animated.timing(headerHeight, {
    //       toValue: 200, // Adjust the original header height when scrolled back to the top
    //       duration: 300,
    //       useNativeDriver: false,
    //     }).start();
    //   }
    // };

    // scrollY.addListener(scrollListener);
    // return () => {
    //   isMounted = false;
    //   scrollY.removeListener(scrollListener);
    // };
  }, []);

  return (
    <SafeScreenView>
      <View className="flex-1 px-[2px]">
        <Animated.View
          style={{
            height: headerHeight,
            backgroundColor: "lightblue",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Header content */}
        </Animated.View>
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
              className="w-full object-cover rounded-b-[25px]"
              source={require("../../assets/capitol_2.jpg")}
              style={{
                transform: [{ scale: 1.3 }],
                height: verticalScale(250),
              }}
            />

            <View className="absolute inset-0 bg-black/40 w-full h-full " />
          </View>
        </TouchableWithoutFeedback>
        {/* perks */}
        <AmenityFilter
          setSelectedPerks={setSelectedPerks}
          selectedPerks={selectedPerks}
        />
        {/* contents */}
        <View
          className="-top-5"
          style={{
            paddingHorizontal: width >= 500 ? width * 0.1 : width * 0.06,
            flex: 1,
          }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
          >
            <View className="-top-2">
              <Text className="font-bold py-2">Recently Booked</Text>
              {bookings?.map((item) => (
                <TouchableNativeFeedback key={item.apartmentRoomsId}>
                  <View
                    className="self-start mr-2 bg-white object-contain"
                    style={{
                      width: horizontalScale(120),
                    }}
                  >
                    <View className="">
                      <View className="flex-1">
                        <Image
                          className="rounded-lg"
                          style={{
                            height: verticalScale(120),
                            width: 150,
                          }}
                          source={{ uri: item.bookingDetails.imgUrl }}
                        />
                      </View>
                      <View className="flex-1">
                        <Text>asd</Text>
                      </View>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              ))}
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
                        key={index}
                      />
                    );
                  })}
                </ScrollView>
              </View>
              <View className="flex-1 justify-end">
                <Text className="font-bold py-2">Search around Lingayen</Text>
                {/* map */}
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate("MapStack", { screen: "NearbyDormMap" })
                  }
                >
                  <View className="w-full h-[150px] overflow-hidden rounded-md">
                    <View className="absolute inset-0 z-50 self-center justify-around h-full">
                      <View className="items-center justify-center flex-row">
                        <Icon
                          simpleName="map"
                          iconLibrary="SimpleLineIcons"
                          size={30}
                          color="#eee"
                          className="mr-2"
                        />
                        <Text
                          className="font-bold text-[#eee]"
                          style={{ fontSize: moderateScale(20) }}
                        >
                          Lingayen, Pangasinan
                        </Text>
                      </View>
                      <TouchableNativeFeedback
                        onPress={() =>
                          navigation.navigate("MapStack", {
                            screen: "NearbyDormMap",
                          })
                        }
                        background={TouchableNativeFeedback.Ripple(
                          colors.lightGray,
                          false
                        )}
                      >
                        <View
                          className="p-3 rounded-md"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <Text className="text-white text-center font-semibold">
                            Search Nearby Dorms
                          </Text>
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                    <Image
                      className="object-fill w-full h-full transform scale-150"
                      source={require("../../assets/map.png")}
                    />
                    <View className="bg-black/20 absolute w-full h-full" />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeScreenView>
  );
};

export default UserHomeScreen;
