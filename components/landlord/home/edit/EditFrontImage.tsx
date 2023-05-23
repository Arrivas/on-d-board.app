import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
import React, { useState } from "react";
import colors from "../../../../config/colors";
import * as ImagePicker from "expo-image-picker";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { setApartments } from "../../../../store/apartmentsSlice";
import { RootState } from "../../../../store";
import { setLoading } from "../../../../store/loadingSlice";
import { SelectedImage } from "../../../../App";

const EditFrontImage = ({ route, navigation }: any) => {
  const { imageUrl, docId, apartmentName } = route.params;
  const [selectedImage, setSelectedImage] = useState<SelectedImage>({});
  const dispatch = useDispatch();
  const apartments = useSelector(
    (state: RootState) => state?.apartments.apartments
  );

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.4,
    });

    if (!result.canceled) {
      setSelectedImage({
        uri: result.assets[0].uri,
        name: result.assets[0].uri.split("/").pop(),
      });
    } else {
      console.log("cancelled");
    }
  };

  const handleSaveImage = async () => {
    dispatch(setLoading(true));
    const apartmentsCopy = [...apartments];
    const index = apartmentsCopy.findIndex((item) => item.docId === docId);
    const startIndex =
      apartmentsCopy[index].apartmentInfo.imageUrl?.lastIndexOf("/") + 1;
    const endIndex = apartmentsCopy[index].apartmentInfo.imageUrl.indexOf("?");
    const imageName = apartmentsCopy[index].apartmentInfo.imageUrl.substring(
      startIndex,
      endIndex
    );

    let newImageUrl: string = "";
    if (selectedImage.name !== "") {
      try {
        const newStorageRef = firebase
          .storage()
          .ref(`${apartmentName}/${selectedImage.name}`);
        // @ts-ignore
        await newStorageRef.putFile(selectedImage?.uri);
        newImageUrl = await newStorageRef.getDownloadURL();
        // update db
        const storageRef = firebase.storage().ref(imageName);
        await storageRef.delete();
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
      }
      // update state
      apartmentsCopy[index].apartmentInfo.imageUrl = newImageUrl;
      await firebase
        .firestore()
        .collection("apartments")
        .doc(docId)
        .update(apartmentsCopy[index]);
      dispatch(setApartments(apartmentsCopy));
    }

    setSelectedImage({ uri: newImageUrl, name: "" });
    dispatch(setLoading(false));
  };

  return (
    <View className="flex-1">
      <View style={{ flex: 1 }} className="px-2 pt-2">
        <TouchableNativeFeedback onPress={pickImageAsync}>
          <View>
            <Image
              className="h-full w-full object-cover rounded-md"
              source={{
                uri: selectedImage.uri || imageUrl,
              }}
            />
            <View className="bg-black absolute bottom-0 w-full self-center items-center opacity-70">
              <Text className="text-white">Tap to change</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={{ flex: 1 }} className="p-5">
        <ScrollView>
          <View className="w-[80%] h-[40px] bg-gray-200" />
          <View className="flex-row items-center my-1">
            <View className="w-[60%] h-[25px] bg-gray-200" />
          </View>
          <View className="w-[90%] h-[60px] self-center bg-gray-200 rounded-md my-3" />
          <View className="w-[100%] my-1 h-[25px] bg-gray-200" />
          <View className="w-[100%] my-1 h-[25px] bg-gray-200" />
          <View className="w-[100%] my-1 h-[25px] bg-gray-200" />
          <View className="w-[100%] my-1 h-[25px] bg-gray-200" />
        </ScrollView>
        <TouchableNativeFeedback onPress={handleSaveImage}>
          <View
            className="my-4 rounded-md py-2"
            style={{
              backgroundColor: colors.primary,
            }}
          >
            <Text className="font-semibold text-white py-2 text-center">
              save image
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default EditFrontImage;
