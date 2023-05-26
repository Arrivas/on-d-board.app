import { View, BackHandler, Alert, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import SafeScreenView from "../../../SafeScreenView";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import CheckApartmentName from "./CheckApartmentName";
import LocationApartment from "./LocationApartment";
import NewAmenities from "./NewAmenities";
import { Amenities, Apartments } from "../../../../App";
import { SecondStepValues } from "./LocationApartment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { setUser } from "../../../../store/userSlice";
import { setApartments } from "../../../../store/apartmentsSlice";

const NewApartment = ({ navigation }: any) => {
  const user = useSelector((state: RootState) => state.user.user);
  const apartments = useSelector(
    (state: RootState) => state.apartments.apartments
  );
  const [progress, setProgress] = useState<number | string>(1);
  const [geoLocation, setGeoLocation] = useState<any>();
  const handleCancelRegistration = () => navigation.goBack();
  const [selectedAmenities, setSelectedAmenities] = useState<Amenities[]>([
    { value: "beach-access", offering: false },
    { value: "free wifi", offering: false },
    { value: "free parking", offering: false },
    { value: "air-conditioned", offering: false },
  ]);
  const [geoError, setGeoError] = useState<string>("");
  const [secondStepValues, setSecondStepValues] = useState<
    SecondStepValues | undefined
  >();
  // values
  const [firstStepValues, setFirstStepValues] = useState<{
    apartmentName: string;
    description: string;
  }>({
    apartmentName: "",
    description: "",
  });
  const [selectedBarangay, setSelectedBarangay] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        Alert.alert(
          "Cancel Creating",
          "Are you sure you want to cancel creating new apartment?",
          [
            {
              text: "No",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => handleCancelRegistration(),
            },
          ],
          { cancelable: false }
        );
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  const handleCreate = async (values: any, { setErrors }: any) => {
    setSecondStepValues(values);
    if (geoLocation?.latitude === undefined)
      return setGeoError("select your location to prcoeed");
    setGeoError("");
    const toSubmitObj: any = {
      apartmentInfo: {
        address: values.address,
        apartmentName: firstStepValues.apartmentName,
        barangay: selectedBarangay,
        description: firstStepValues.description,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/on-d-board.appspot.com/o/no_image.jpg?alt=media&token=70198e54-cf22-4c64-a3e7-eece584ab754",
        geoLocation,
        price: {
          from: values?.priceFrom,
          to: values?.priceTo,
        },
        amenities: selectedAmenities,
      },
      landlordInfo: {
        contactNo: values?.landlordContact,
        ownerName: values?.ownerName,
      },
      specifications: {
        bathroomCount: values?.bathroomCount,
        bedspace: values?.bedspace,
      },
      docId: "",
    };
    await firebase
      .firestore()
      .collection("apartments")
      .add(toSubmitObj)
      .then(async (res) => {
        const userCopy: any = { ...user };
        const apartmentsCopy: any = [...apartments];

        toSubmitObj.docId = res.id;
        res.update({ docId: res.id });

        userCopy.apartmentIds = [...userCopy.apartmentIds, res.id];
        console.log(userCopy);
        apartmentsCopy.push(toSubmitObj as Apartments);

        await firebase
          .firestore()
          .collection("landlords")
          .doc(user.docId)
          .update(userCopy);

        dispatch(setApartments(apartmentsCopy));
        dispatch(setUser(userCopy));
        navigation.navigate("HomeStack");
        ToastAndroid.show("created successfully", ToastAndroid.SHORT);
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeScreenView>
      {/* <TouchableWithoutFee dback onPress={() => Keyboard.dismiss()}> */}
      <View className="flex-1 items-center justify-center px-5">
        {progress === 1 ? (
          <CheckApartmentName
            firstStepValues={firstStepValues}
            setProgress={setProgress}
            setFirstStepValues={setFirstStepValues}
          />
        ) : progress === 2 ? (
          <NewAmenities
            setProgress={setProgress}
            selectedAmenities={selectedAmenities}
            setSelectedAmenities={setSelectedAmenities}
          />
        ) : (
          <LocationApartment
            selectedBarangay={selectedBarangay}
            setSelectedBarangay={setSelectedBarangay}
            setGeoError={setGeoError}
            geoError={geoError}
            handleCreate={handleCreate}
            secondStepValues={secondStepValues}
            setGeoLocation={setGeoLocation}
            geoLocation={geoLocation}
            setProgress={setProgress}
            setSecondStepValues={setSecondStepValues}
          />
        )}
      </View>
      {/* </TouchableWithoutFeed back> */}
    </SafeScreenView>
  );
};

export default NewApartment;
