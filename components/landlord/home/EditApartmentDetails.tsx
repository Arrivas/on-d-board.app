import {
  View,
  Text,
  Image,
  Alert,
  TouchableNativeFeedback,
  ToastAndroid,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { verticalScale } from "../../../config/metrics";
import FormikField from "../../forms/FormikFiel";
import AppFormField from "../../forms/AppFormField";
import SafeScreenView from "../../SafeScreenView";
import Icon from "../../Icon";
import * as Location from "expo-location";
import { LocationObject } from "../../../App";
import PinLocationModal from "./PinLocationModal";

export interface PinnedLocation {
  latitude: string;
  longitude: string;
}

const EditApartmentDetails = ({ route, navigation }: any) => {
  const { item } = route.params;
  const { apartmentInfo, landlordInfo, amenities, docId } = item;
  const { apartmentName, description, geoLocation, price } = apartmentInfo;
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pinnedLocation, setPinnedLocation] = useState<PinnedLocation | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const initialValues = {
    apartmentName: apartmentName || "",
    description: description || "",
    latitude:
      pinnedLocation?.latitude ||
      location?.coords?.latitude ||
      geoLocation.latitude ||
      "",
    longitude:
      pinnedLocation?.longitude ||
      location?.coords?.longitude ||
      geoLocation.longitude ||
      "",
    priceFrom: price.from || "",
    priceTo: price.to || "",
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setPinnedLocation(null);
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location: any = await Location.getCurrentPositionAsync({});
    setLocation(location);
    ToastAndroid.show("mobile location has been set", ToastAndroid.SHORT);
  };

  const handleSubmit = () => {};

  return (
    <SafeScreenView>
      <View className="flex-1">
        <View>
          <Image
            className="w-full"
            style={{
              height: verticalScale(185),
            }}
            source={{ uri: apartmentInfo.imageUrl }}
          />
          <View className="bg-black absolute bottom-0 w-full items-center opacity-70">
            <Text className="text-white">Tap to change</Text>
          </View>
        </View>
        <View className="p-5">
          <FormikField initialValues={initialValues} onSubmit={handleSubmit}>
            <Text className="font-semibold mb-1">Apartment name</Text>
            <AppFormField
              name="apartmentName"
              placeholder="apartment name"
              useBorder={true}
              textInputViewClass="bg-white"
            />
            <Text className="font-semibold mb-1">Description</Text>
            <AppFormField
              name="description"
              placeholder="description"
              description={true}
              useBorder={true}
              textInputViewClass="bg-white"
            />
            {/* geo buttons */}
            <Text className="font-semibold">Geo location</Text>
            {/* <Text className="text-xs italic">
              Geo location is the process of determining the location of a
              device or user based on their geographic coordinates. The app is
              using geolocation to pinpoint the user's location and identify
              their apartment on a map for navigation purposes.
            </Text> */}
            <View className="flex-row items-center justify-between my-2">
              <TouchableNativeFeedback onPress={() => setModalVisible(true)}>
                <View className="flex-row flex-1 items-center justify-center space-x-1 p-3 bg-red-700 rounded-md">
                  <Icon
                    ionName="location"
                    iconLibrary="IonIcons"
                    color="#fff"
                  />
                  <Text className="text-white">pin location</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={getLocation}>
                <View className="flex-row flex-1 items-center justify-center space-x-1 p-3 border rounded-md ml-1">
                  <Icon
                    iconLibrary="MaterialIcons"
                    materialName="gps-fixed"
                    color="#333"
                  />
                  <Text>device location</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            {/* geo */}
            <View className="flex-row space-x-1">
              <View className="flex-1 flex-row justify-between">
                <Text className="text-xs font-semibold">latitude</Text>
                <Text>{Number(initialValues?.latitude)?.toFixed(7)}</Text>
              </View>
              <View className="flex-1 flex-row justify-between">
                <Text className="text-xs font-semibold">longitude</Text>
                <Text>{Number(initialValues?.longitude)?.toFixed(7)}</Text>
              </View>
            </View>

            {/* price */}
            <AppFormField
              name="priceFrom"
              placeholder="price - min"
              description={true}
              useBorder={true}
              textInputViewClass="bg-white"
            />
            <AppFormField
              name="priceTo"
              placeholder="price - min"
              description={true}
              useBorder={true}
              textInputViewClass="bg-white"
            />
          </FormikField>
        </View>
        <PinLocationModal
          pinnedLocation={pinnedLocation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setPinnedLocation={setPinnedLocation}
        />
      </View>
    </SafeScreenView>
  );
};

export default EditApartmentDetails;
