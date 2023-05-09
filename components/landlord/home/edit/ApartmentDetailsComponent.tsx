import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import FormikField from "../../../forms/FormikField";
import AppFormField from "../../../forms/AppFormField";
import PinLocationModal from "../PinLocationModal";
import { Amenities, Apartments, LocationObject } from "../../../../App";
import { PinnedLocation } from "../EditApartmentDetails";
import Icon from "../../../Icon";
import SelectAmenities from "./SelectAmenities";
import SubmitButton from "../../../forms/SubmitButton";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import apartmentsSlice, {
  setApartments,
} from "../../../../store/apartmentsSlice";
import { RootState } from "../../../../store";
import { setLoading } from "../../../../store/loadingSlice";

interface ApartmentDetailsProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  pinnedLocation: PinnedLocation | null;
  setPinnedLocation: React.Dispatch<
    React.SetStateAction<PinnedLocation | null>
  >;
  getLocation: () => void;
  phoneLocation: LocationObject | null;
  selectedAmenities: Amenities[];
  setSelectedAmenities: React.Dispatch<React.SetStateAction<Amenities[]>>;
  landlordInfo: {
    contactNo: string;
    ownerName: string;
  };
  docId: string;
}

const ApartmentDetailsComponent: React.FC<ApartmentDetailsProps> = ({
  setModalVisible,
  pinnedLocation,
  modalVisible,
  setPinnedLocation,
  getLocation,
  phoneLocation,
  selectedAmenities,
  setSelectedAmenities,
  docId,
}) => {
  const dispatch = useDispatch();
  const apartments = useSelector(
    (state: RootState) => state?.apartments.apartments
  );
  const currentApartment: any = apartments.find((item) => item.docId === docId);
  const { apartmentInfo, landlordInfo, specifications } = currentApartment;
  const { apartmentName, description, geoLocation, price, address } =
    apartmentInfo;

  const initialValues = {
    apartmentName: apartmentName || "",
    description: description || "",
    latitude:
      pinnedLocation?.latitude ||
      phoneLocation?.coords?.latitude ||
      geoLocation.latitude ||
      "",
    longitude:
      pinnedLocation?.longitude ||
      phoneLocation?.coords?.longitude ||
      geoLocation.longitude ||
      "",
    priceFrom: price.from || "",
    priceTo: price.to || "",
    address: address || "",
    bathroomCount: specifications.bathroomCount || "",
    bedspace: specifications.bedspace || "",
    landlordContact: landlordInfo.contactNo || "",
    ownerName: landlordInfo.ownerName || "",
    imageUrl: apartmentInfo.imageUrl,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    dispatch(setLoading(true));
    const apartmentsCopy = [...apartments];
    const index = apartmentsCopy.findIndex((item) => item.docId === docId);

    const toSubmitObj: any = {
      apartmentInfo: {
        address: values.address,
        apartmentName: values.apartmentName,
        description: values.description,
        amenities: selectedAmenities,
        geoLocation: {
          latitude: values.latitude,
          longitude: values.longitude,
        },
        imageUrl: values.imageUrl,
        price: {
          from: values.priceFrom,
          to: values.priceTo,
        },
      },
      specifications: {
        bathroomCount: values.bathroomCount,
        bedspace: values.bedspace,
      },
      landlordInfo: {
        contactNo: values.landlordContact,
        ownerName: values.ownerName,
      },
      docId,
    };

    try {
      await firebase
        .firestore()
        .collection("apartments")
        .doc(docId)
        .update(toSubmitObj);
      apartmentsCopy[index] = toSubmitObj;
      dispatch(setApartments(apartmentsCopy));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }

    dispatch(setLoading(false));
  };

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
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

            <Text className="font-semibold mb-1">Address</Text>
            <AppFormField
              name="address"
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
            {/* geo */}
            <View className="my-2">
              <View className="flex-row justify-between">
                <Text className="text-xs font-semibold">latitude</Text>
                <Text>{Number(initialValues?.latitude)?.toFixed(7)}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-xs font-semibold">longitude</Text>
                <Text>{Number(initialValues?.longitude)?.toFixed(7)}</Text>
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

            {/* price */}
            <Text className="font-semibold mb-1">Bedspace pricing</Text>
            <View className=" items-center ">
              <View className="flex-1">
                <Text className="text-xs">min price</Text>
                <AppFormField
                  name="priceFrom"
                  placeholder="min"
                  description={true}
                  useBorder={true}
                  textInputViewClass="bg-white"
                />
              </View>
              <View className="flex-1">
                <Text className="text-xs">max price</Text>
                <AppFormField
                  name="priceTo"
                  placeholder="max"
                  description={true}
                  useBorder={true}
                  textInputViewClass="bg-white"
                />
              </View>
            </View>

            {/* specifications */}
            <Text className="font-semibold mb-1">Specifications</Text>
            <View className="flex-row space-x-1">
              <View className="flex-1">
                <Text className="text-xs">bathroom count</Text>
                <AppFormField
                  name="bathroomCount"
                  placeholder="bathroom count"
                  description={true}
                  useBorder={true}
                  textInputViewClass="bg-white"
                />
              </View>
              <View className="flex-1">
                <Text className="text-xs">bedspace count</Text>
                <AppFormField
                  name="bedspace"
                  placeholder="bedspace count"
                  description={true}
                  useBorder={true}
                  textInputViewClass="bg-white"
                />
              </View>
            </View>

            {/* amenities */}
            <SelectAmenities
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
            />

            {/* landlord info */}
            <Text className="font-semibold my-1">Landlord info</Text>
            <View className="space-x-1">
              <Text className="text-xs">onwer name</Text>
              <AppFormField
                name="ownerName"
                placeholder="onwer name"
                description={true}
                useBorder={true}
                textInputViewClass="bg-white"
              />
              <Text className="text-xs">contact no.</Text>
              <AppFormField
                name="landlordContact"
                placeholder="contact no."
                description={true}
                useBorder={true}
                textInputViewClass="bg-white"
              />
            </View>

            <SubmitButton title="save" textClass="text-white" />
          </FormikField>
        </View>
        <PinLocationModal
          pinnedLocation={pinnedLocation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setPinnedLocation={setPinnedLocation}
        />
      </ScrollView>
    </>
  );
};

export default ApartmentDetailsComponent;