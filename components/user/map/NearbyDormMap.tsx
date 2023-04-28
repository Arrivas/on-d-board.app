import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import React, { useEffect, useState, useRef } from "react";
import getDimensions from "../../../config/getDimensions";
import { Apartments } from "../../../App";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import ArrowBox from "./ArrowBox";
import { horizontalScale, verticalScale } from "../../../config/metrics";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const NearbyDormMap = () => {
  const mapRef = useRef<MapView>(null);
  const apartments = useSelector(
    (state: RootState) => state.apartments.apartments
  );
  const [selectedRegion, setSelectedRegion] = useState(
    apartments[0].apartmentInfo.geoLocation
  );

  useEffect(() => {
    if (selectedRegion !== null) {
      const newRegion = {
        latitude: Number(selectedRegion.latitude),
        longitude: Number(selectedRegion.longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      mapRef.current?.animateToRegion(newRegion, 1000);
    }
  }, [selectedRegion]);

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        className="flex-1 h-full w-full"
        // mapType={'mutedStandard' || null}
        initialRegion={{
          latitude: 16.015838555783244,
          longitude: 120.23596948050755,
          latitudeDelta: 0.055,
          longitudeDelta: 0.055,
        }}
      >
        {apartments.map((item, index) => {
          const { apartmentInfo, docId } = item;
          const { geoLocation } = apartmentInfo;
          const { price } = apartmentInfo;
          return (
            <Marker
              key={docId}
              coordinate={{
                latitude: Number(geoLocation.latitude),
                longitude: Number(geoLocation.longitude),
              }}
            >
              <ArrowBox
                text={price.from}
                currentRegion={item.apartmentInfo.geoLocation}
                selectedRegion={selectedRegion}
              />
            </Marker>
          );
        })}
      </MapView>
      <View className="bottom-5 absolute px-5">
        <ScrollView
          horizontal
          snapToInterval={horizontalScale(220) + 2 * 4} // 4 is the margin value from 'mr-2'
          snapToAlignment="center"
          onScroll={(event) => {
            const scrollX = event.nativeEvent.contentOffset.x;
            const index = Math.round(scrollX / (horizontalScale(220) + 2 * 4));
            setSelectedRegion(apartments[index].apartmentInfo.geoLocation);
          }}
        >
          {apartments.map((item) => {
            const { apartmentInfo, docId } = item;
            const { geoLocation, imageUrl, address, apartmentName } =
              apartmentInfo;
            const { price } = apartmentInfo;

            return (
              <View
                key={docId}
                className="self-start mr-2 h-full bg-white object-contain"
                style={{
                  width: horizontalScale(250),
                }}
              >
                <Image
                  className="rounded-t-lg"
                  style={{
                    height: verticalScale(80),
                    width: "auto",
                    // width: horizontalScale(150),
                  }}
                  source={{ uri: imageUrl }}
                />
                <View className="p-2">
                  <Text className="font-bold">{apartmentName}</Text>
                  <Text>{address}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default NearbyDormMap;
