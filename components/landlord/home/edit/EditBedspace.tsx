import {
  View,
  Text,
  TouchableNativeFeedback,
  TextInput,
  Image,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import SafeScreenView from "../../../SafeScreenView";
import { Apartments, Bedspaces } from "../../../../App";
import Icon from "../../../Icon";
import SelectBedType from "./bed/SelectBedType";
import * as ImagePicker from "expo-image-picker";
import SelectBedLocation from "./bed/SelectBedLocation";
import { formatAsCurrency } from "../../../../functions/formatAsCurrency";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/storage";
import { setApartments } from "../../../../store/apartmentsSlice";
import { useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { useSelector } from "react-redux";
import BedspacesItem from "./BedspacesItem";
import { uploadImagesToFirebase } from "../../../../functions/uploadImagesToFirebase";
import { setLoading } from "../../../../store/loadingSlice";
import ErrorMessage from "../../../forms/ErrorMessage";

const EditBedspace = ({ route, navigation }: any) => {
  const { apartmentDocId } = route.params;
  const apartments = useSelector(
    (state: RootState) => state.apartments.apartments
  );

  const currentApartment = apartments?.find(
    (item) => item.docId === apartmentDocId
  );
  const { apartmentInfo, apartmentRoomsId, specifications } =
    currentApartment as Apartments;
  const { apartmentName, price } = apartmentInfo;
  const { from: minPrice, to: maxPrice } = price;
  const { bedspace: maxBedspaceCount } = specifications;
  const [bedspaces, setBedspaces] = useState<Bedspaces[]>([]);
  const [selectedBedspace, setSelectedBedspace] = useState<
    Bedspaces | undefined
  >(undefined);
  const [inputPrice, setInputPrice] = useState<string>("0");
  const [imageError, setImageError] = useState("");
  const dispatch = useDispatch();

  const fetchBedspace = async (): Promise<Bedspaces[] | [] | undefined> => {
    if (!apartmentRoomsId) return;
    let res: Bedspaces | undefined = undefined;
    await firebase
      .firestore()
      .collection("apartmentRooms")
      .doc(apartmentRoomsId)
      .get()
      .then((doc) => {
        res = doc.data() as Bedspaces;
      });
    return res;
  };

  useEffect(() => {
    dispatch(setLoading(true));
    let isMounted = true;
    if (isMounted) {
      fetchBedspace().then((res: any) => {
        if (res === undefined) return setBedspaces([]);
        setBedspaces(res?.bedspaces);
      });
    }
    dispatch(setLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async () => {
    if (bedspaces.length === 0) return;
    dispatch(setLoading(true));
    const bedspacesCopy = [...bedspaces];
    const images = bedspacesCopy?.map((item) => {
      if (item.bedspace?.imgUrl.indexOf("on-d-board.appspot.com") !== -1)
        return { uri: null, name: null };
      return {
        uri: item.bedspace?.imgUrl,
        name: item.bedspace.imgUrl?.split("/").pop(),
      };
    });
    let hasError = "";
    bedspacesCopy.forEach((item) => {
      if (item.bedspace.price > maxPrice) {
        item.bedspace.price = maxPrice;
      }
      if (item.bedspace.imgUrl === "") {
        dispatch(setLoading(false));
        hasError = "please select image";
      }
    });

    if (hasError) {
      dispatch(setLoading(false));
      return setImageError(hasError);
    }
    const updatedBedspaces = await Promise.all(
      bedspacesCopy.map(async (bedspace, index) => {
        const image: any = images[index];
        if (image.uri === null) return { ...bedspace };
        if (image?.uri !== null || image?.uri !== "") {
          const imageUrl = await uploadImagesToFirebase([image], apartmentName);
          return {
            ...bedspace,
            bedspace: {
              ...bedspace.bedspace,
              imgUrl: imageUrl[0],
            },
          };
        }
      })
    );
    setBedspaces(updatedBedspaces as Bedspaces[]);
    if (apartmentRoomsId === "" || apartmentRoomsId === undefined) {
      await firebase
        .firestore()
        .collection("apartmentRooms")
        .add({ bedspaces: updatedBedspaces })
        .then(async (res) => {
          res.update({ docId: res.id });
          const apartmentsCopy = [...apartments];
          const index = apartmentsCopy.findIndex(
            (item) => item.docId === apartmentDocId
          );

          if (index !== -1) {
            apartmentsCopy[index] = {
              ...apartmentsCopy[index],
              apartmentRoomsId: res.id,
            };
            const updatedApartments = [...apartmentsCopy];
            dispatch(setApartments(updatedApartments));
          }
          await firebase
            .firestore()
            .collection("apartments")
            .doc(apartmentDocId)
            .update({ apartmentRoomsId: res.id })
            .then(() => {});
        })
        .catch((err) => console.log(err));
    } else {
      await firebase
        .firestore()
        .collection("apartmentRooms")
        .doc(apartmentRoomsId)
        .update({ bedspaces: updatedBedspaces })
        .then(() => console.log("saved"))
        .catch((err) => console.log(err));
    }
    ToastAndroid.show("saved successfully", ToastAndroid.SHORT);
    dispatch(setLoading(false));
  };

  const handleAddBedspace = () => {
    if (bedspaces.length >= Number(maxBedspaceCount)) return;

    setBedspaces((prevBedspaces) => {
      const bedspaceCopy = [...prevBedspaces];
      bedspaceCopy.push({
        bedspace: {
          apartmentName,
          bedInformation: {
            isDoubleDeck: false,
            location: "",
          },
          imgUrl: "",
          isAvailable: true,
          name: `bedspace${bedspaceCopy.length + 1}`,
          price: minPrice,
        },
      } as Bedspaces);
      return bedspaceCopy;
    });
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.4,
    });

    if (!result.canceled) {
      setImageError("");
      // setSelectedImage({
      //   uri: result.assets[0].uri,
      //   name: result.assets[0].uri.split("/").pop(),
      // });
      const selectedBedspaceCopy = { ...selectedBedspace };
      if (selectedBedspaceCopy && selectedBedspaceCopy.bedspace) {
        selectedBedspaceCopy.bedspace.imgUrl = result.assets[0].uri;
      }
      setSelectedBedspace(selectedBedspaceCopy as Bedspaces);
    } else {
      console.log("cancelled");
    }
  };

  const handleDelete = () => {
    const bedspaceCopy = [...bedspaces];
    const deletedBedspace = bedspaceCopy.filter(
      (item) => item.bedspace.name !== selectedBedspace?.bedspace.name
    );
    deletedBedspace.forEach((item, index) => {
      item.bedspace.name = `bedspace${index + 1}`;
    });
    setBedspaces(deletedBedspace);
    setSelectedBedspace(undefined);
  };

  return (
    <SafeScreenView>
      <View className="flex-1 px-4">
        <View className="flex-1">
          <Text className="font-semibold my-1">available bedspace</Text>
          <View className="flex flex-row flex-wrap">
            {bedspaces?.map((item) => (
              <BedspacesItem
                item={item}
                bedspaces={bedspaces}
                key={item?.bedspace.name}
                setBedspaces={setBedspaces}
                setInputPrice={setInputPrice}
                selectedBedspace={selectedBedspace}
                setSelectedBedspace={setSelectedBedspace}
              />
            ))}
            {/* add button */}
            {bedspaces?.length < Number(maxBedspaceCount) && (
              <TouchableNativeFeedback onPress={handleAddBedspace}>
                <View className="bg-gray-200 p-3 px-4 mr-2 mb-2 rounded-md flex-row items-center">
                  <Text>add</Text>
                  <Icon featherName="plus" iconLibrary="Feather" />
                </View>
              </TouchableNativeFeedback>
            )}
          </View>
        </View>
        <View
          style={{
            flex: 1,
          }}
          className="border-t border-gray-200 pt-2"
        >
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 15,
            }}
            keyboardShouldPersistTaps="handled"
          >
            {selectedBedspace !== undefined && (
              <>
                {bedspaces.length > 1 && (
                  <View className="flex-row items-center justify-between">
                    <Text className="font-bold">
                      {selectedBedspace?.bedspace.name}
                    </Text>
                    <TouchableNativeFeedback onPress={handleDelete}>
                      <View className="p-4 rounded-md self-start">
                        <Icon
                          featherName="trash-2"
                          iconLibrary="Feather"
                          size={20}
                        />
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                )}
                {/* image */}
                <View className="h-[250px] w-full">
                  {selectedBedspace.bedspace.imgUrl !== "" ? (
                    <TouchableNativeFeedback onPress={pickImageAsync}>
                      <Image
                        className="w-auto h-full rounded-md"
                        resizeMode="contain"
                        source={{ uri: selectedBedspace.bedspace.imgUrl }}
                      />
                    </TouchableNativeFeedback>
                  ) : (
                    <TouchableNativeFeedback onPress={pickImageAsync}>
                      <View className="flex-1 items-center justify-center w-full border border-gray-200 rounded-md">
                        <Icon
                          size={35}
                          ionName="ios-image-outline"
                          iconLibrary="IonIcons"
                          color="#d6d6d6"
                        />
                        <Text className="text-[#d6d6d6]">tap to add image</Text>
                      </View>
                    </TouchableNativeFeedback>
                  )}
                </View>
                {imageError && selectedBedspace.bedspace.imgUrl === "" && (
                  <ErrorMessage error={imageError} />
                )}
                {/* bed type */}
                <SelectBedType
                  selectedBedspace={selectedBedspace}
                  setSelectedBedspace={setSelectedBedspace}
                />
                {selectedBedspace.bedspace.bedInformation.isDoubleDeck && (
                  <SelectBedLocation
                    selectedBedspace={selectedBedspace}
                    setSelectedBedspace={setSelectedBedspace}
                  />
                )}
                {/* price */}
                <View className="flex-row">
                  <Text className="font-bold " style={{ flex: 1 }}>
                    Price
                  </Text>
                  <View className="flex-row">
                    <Text>min-max</Text>
                    <View className="flex-row">
                      <Text>({formatAsCurrency(Number(minPrice))}-</Text>
                      <Text>{formatAsCurrency(Number(maxPrice))})</Text>
                    </View>
                  </View>
                </View>
                <View className="flex-row items-center ">
                  <TextInput
                    keyboardType="number-pad"
                    className="border-b px-5 flex-1 border-gray-500  focus:border-black  p-1"
                    value={inputPrice}
                    onChangeText={(text) => {
                      const selectedBedspaceCopy = { ...selectedBedspace };
                      selectedBedspace.bedspace.price = text;
                      if (Number(text) > Number(maxPrice))
                        return setInputPrice(maxPrice);
                      setSelectedBedspace(selectedBedspaceCopy);
                      setInputPrice(text);
                    }}
                  />
                  <Text
                    className="text-right text-lg"
                    style={{
                      flex: 1,
                    }}
                  >
                    {formatAsCurrency(Number(inputPrice))}
                  </Text>
                </View>
              </>
            )}
          </ScrollView>
        </View>
        <TouchableNativeFeedback
          onPress={handleSave}
          background={TouchableNativeFeedback.Ripple("#b3b3b3", false)}
        >
          <View className="p-3 roudned-md self-end">
            <Text>Save</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </SafeScreenView>
  );
};

export default EditBedspace;
