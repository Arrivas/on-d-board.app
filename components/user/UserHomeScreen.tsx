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
import { Apartments } from "../../App";
import getDimensions from "../../config/getDimensions";
import Icon from "../Icon";
import SafeScreenView from "../SafeScreenView";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../config/metrics";
import HomeSearch from "./home/HomeSearch";
import Perks from "./home/Perks";
import AppartmentsCard from "./home/AppartmentsCard";
import colors from "../../config/colors";
import { fetchApartments } from "../../functions/fetchApartments";
import { useDispatch, useSelector } from "react-redux";
import { setApartments } from "../../store/apartmentsSlice";
import { RootState } from "../../store";

const UserHomeScreen = ({ navigation }: any) => {
  const apartments = useSelector(
    (state: RootState) => state.apartments.apartments
  );
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [selectedPerks, setSelectedPerks] = useState([]);

  const { width, height } = getDimensions();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchApartments(5).then((res) => dispatch(setApartments(res)));
    }
    return () => {
      isMounted = false;
    };
  }, []);

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
        <Perks
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
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* recommended */}
            <View className="flex-1">
              <View className="-top-2">
                <Text className="font-bold py-2">Recommended for you</Text>
                <ScrollView
                  horizontal
                  contentContainerStyle={{ flexGrow: 0 }}
                  showsHorizontalScrollIndicator={false}
                >
                  {apartments.map((item) => {
                    const { apartmentInfo, docId, tenantInfo } = item;
                    return (
                      <AppartmentsCard
                        key={docId}
                        address={apartmentInfo.address}
                        apartmentName={apartmentInfo.apartmentName}
                        docId={docId}
                        imageUrl={apartmentInfo.imageUrl}
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
