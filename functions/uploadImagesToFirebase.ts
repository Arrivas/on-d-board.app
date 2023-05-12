import firebase from "@react-native-firebase/app";
import { SelectedImage } from "../App";

export const uploadImagesToFirebase = async (
  images: SelectedImage[],
  apartmentName: string
) => {
  const imageUrls = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const storageRef = firebase.storage().ref(`${apartmentName}/${image.name}`);

    try {
      await storageRef.putFile(image.uri as string);
      const imageUrl = await storageRef.getDownloadURL();
      imageUrls.push(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  return imageUrls;
};
