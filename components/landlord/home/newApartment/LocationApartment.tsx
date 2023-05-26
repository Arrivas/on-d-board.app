import {
  View,
  Text,
  TouchableNativeFeedback,
  Alert,
  ToastAndroid,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import FormikField from "../../../forms/FormikField";
import AppFormField from "../../../forms/AppFormField";
import SubmitButton from "../../../forms/SubmitButton";
import * as Yup from "yup";
import Icon from "../../../Icon";
import * as Location from "expo-location";
import PinLocationModal from "../PinLocationModal";
import { PinnedLocation } from "../EditApartmentDetails";
import ErrorMessage from "../../../forms/ErrorMessage";
import getDimensions from "../../../../config/getDimensions";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../store/loadingSlice";
import SelectBarangay from "../edit/SelectBarangay";
export interface SecondStepValues {
  address: string;
  ownerName: string;
  landlordContact: string;
  bathroomCount: number | string;
  bedspace: number | string;
  priceFrom: number | string;
  priceTo: number | string;
}

interface LocationApartmentProps {
  setProgress: React.Dispatch<React.SetStateAction<string | number>>;
  setSecondStepValues: React.Dispatch<
    React.SetStateAction<SecondStepValues | undefined>
  >;
  geoLocation: PinnedLocation;
  setGeoLocation: React.Dispatch<React.SetStateAction<PinnedLocation | null>>;
  setGeoError: React.Dispatch<React.SetStateAction<string>>;
  secondStepValues: SecondStepValues | undefined;
  handleCreate: any;
  geoError: string;
  selectedBarangay: string;
  setSelectedBarangay: React.Dispatch<React.SetStateAction<string>>;
}

const LocationApartment: React.FC<LocationApartmentProps> = ({
  setProgress,
  geoLocation,
  setGeoLocation,
  secondStepValues,
  handleCreate,
  geoError,
  setGeoError,
  selectedBarangay,
  setSelectedBarangay,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { height } = getDimensions();
  const dispatch = useDispatch();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    address: Yup.string().required("field must not be empty"),
    ownerName: Yup.string().required("field must not be empty"),
    landlordContact: Yup.string()
      .matches(phoneRegExp, "must be a valid phone number 09xxxxxxxxx")
      .min(11, "too short")
      .max(11, "too long")
      .required(),
    bathroomCount: Yup.number().required("field must not be empty"),
    bedspace: Yup.number().required("field must not be empty"),
    priceFrom: Yup.number().required("field must not be empty"),
    priceTo: Yup.number().required("field must not be empty"),
  });

  const initialValues = {
    address: secondStepValues?.address || "",
    ownerName: secondStepValues?.ownerName || "",
    landlordContact: secondStepValues?.landlordContact || "",
    bathroomCount: secondStepValues?.bathroomCount || "",
    bedspace: secondStepValues?.bedspace || "",
    priceFrom: secondStepValues?.priceFrom || "",
    priceTo: secondStepValues?.priceTo || "",
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setGeoLocation(null);
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return dispatch(setLoading(false));
    }

    let location: any = await Location.getCurrentPositionAsync({});
    setGeoLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setGeoError("");
    ToastAndroid.show("device location has been set", ToastAndroid.SHORT);
  };

  return (
    <View className="py-5 items-center">
      <FormikField
        onSubmit={handleCreate}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <View
          style={{
            height: height - 50,
          }}
        >
          <ScrollView>
            <Text className="font-semibold text-2xl my-10 self-center">
              Location
            </Text>
            {/* geolocation */}
            <View className="w-full px-2">
              <Text className="text-xs self-start">barangay</Text>
              <SelectBarangay
                setSelectedBarangay={setSelectedBarangay}
                selectedBarangay={selectedBarangay}
                type="new"
              />

              <Text className="text-xs self-start">address</Text>
              <AppFormField name="address" placeholder="Address" />

              <View className="my-2 mb-3">
                <View className="flex-row justify-between">
                  <Text className="text-xs font-semibold">latitude</Text>
                  <Text>{Number(geoLocation?.latitude)?.toFixed(7)}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-xs font-semibold">longitude</Text>
                  <Text>{Number(geoLocation?.longitude)?.toFixed(7)}</Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center justify-between mb-1">
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
            <ErrorMessage error={geoError} />

            {/* landlord info */}
            <Text className="font-semibold text-2xl my-10 self-center">
              Landlord info
            </Text>
            <View className="space-x-1">
              <Text className="text-xs">onwer name</Text>
              <AppFormField name="ownerName" placeholder="onwer name" />
              <Text className="text-xs">contact no.</Text>
              <AppFormField
                name="landlordContact"
                placeholder="contact no."
                keyboardType="number-pad"
              />
            </View>

            {/* specifications */}
            <Text className="font-semibold text-2xl my-10 self-center">
              Specifications
            </Text>
            <View className="flex-row space-x-1">
              <View className="flex-1">
                <Text className="text-xs">bathroom count</Text>
                <AppFormField
                  keyboardType="number-pad"
                  name="bathroomCount"
                  placeholder="bathroom count"
                />
              </View>
              <View className="flex-1">
                <Text className="text-xs">bedspace count</Text>
                <AppFormField
                  keyboardType="number-pad"
                  name="bedspace"
                  placeholder="bedspace count"
                />
              </View>
            </View>
            <Text className="font-semibold text-2xl my-10 self-center">
              Bedspace pricing
            </Text>
            <View className=" items-center flex-row space-x-1">
              <View className="flex-1">
                <Text className="text-xs">min price</Text>
                <AppFormField
                  keyboardType="number-pad"
                  name="priceFrom"
                  placeholder="min"
                />
              </View>
              <View className="flex-1">
                <Text className="text-xs">max price</Text>
                <AppFormField
                  keyboardType="number-pad"
                  name="priceTo"
                  placeholder="max"
                />
              </View>
            </View>
          </ScrollView>
        </View>
        {/* button */}
        <View className="flex-row self-end items-end">
          <View>
            <TouchableNativeFeedback onPress={() => setProgress(2)}>
              <View className="flex-row p-2 self-end items-center">
                <Icon
                  materialComName="chevron-left"
                  color="black"
                  iconLibrary="MaterialCommunityIcons"
                  size={25}
                />
              </View>
            </TouchableNativeFeedback>
          </View>

          <View className="self-end">
            <SubmitButton
              mode="chevronRight"
              title="create"
              textClass="text-black"
            />
          </View>
        </View>
      </FormikField>
      {modalVisible && (
        <PinLocationModal
          pinnedLocation={geoLocation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setPinnedLocation={setGeoLocation}
        />
      )}
    </View>
  );
};

export default LocationApartment;
