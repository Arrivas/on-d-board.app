import { View, Alert, ToastAndroid } from "react-native";
import React, { useState } from "react";
import SafeScreenView from "../../SafeScreenView";
import * as Location from "expo-location";
import { Amenities, LocationObject } from "../../../App";
import ApartmentDetailsComponent from "./edit/ApartmentDetailsComponent";

export interface PinnedLocation {
  latitude: string;
  longitude: string;
}

const EditApartmentDetails = ({ route, navigation }: any) => {
  const { item } = route.params;
  const { apartmentInfo, landlordInfo, docId, specifications } = item;
  const { amenities } = apartmentInfo;
  const [phoneLocation, setPhoneLocation] = useState<LocationObject | null>(
    null
  );
  const [pinnedLocation, setPinnedLocation] = useState<PinnedLocation | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAmenities, setSelectedAmenities] =
    useState<Amenities[]>(amenities);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setPinnedLocation(null);
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    let location: any = await Location.getCurrentPositionAsync({});
    setPhoneLocation(location);
    ToastAndroid.show("mobile location has been set", ToastAndroid.SHORT);
  };

  return (
    <SafeScreenView>
      <View className="flex-1">
        <ApartmentDetailsComponent
          docId={docId}
          modalVisible={modalVisible}
          phoneLocation={phoneLocation}
          pinnedLocation={pinnedLocation}
          setModalVisible={setModalVisible}
          setPinnedLocation={setPinnedLocation}
          getLocation={getLocation}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
          landlordInfo={landlordInfo}
        />
      </View>
    </SafeScreenView>
  );
};

export default EditApartmentDetails;
