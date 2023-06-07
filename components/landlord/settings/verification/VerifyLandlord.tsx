import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import SafeScreenView from "../../../SafeScreenView";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/storage";
import "@react-native-firebase/firestore";
import NotVerified from "./NotVerified";
import VerifyOnWait from "./VerifyOnWait";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { setUser } from "../../../../store/userSlice";
import { setLoading } from "../../../../store/loadingSlice";

const VerifyLandlord = () => {
  const [image1, setImage1] = useState<any>(null);
  const [image2, setImage2] = useState<any>(null);
  const [image3, setImage3] = useState<any>(null);
  const [image4, setImage4] = useState<any>(null);
  const [selectedId1, setSelectedId1] = useState(null);
  const [selectedId2, setSelectedId2] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

  const pickImage = async (setImage: any) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    if (!user?.lastName) return;
    dispatch(setLoading(true));
    const imageExtension1 = image1?.split(".")[image1.split(".").length - 1];
    const imageExtension2 = image2?.split(".")[image2.split(".").length - 1];
    const imageExtension3 = image3?.split(".")[image3.split(".").length - 1];
    const imageExtension4 = image4?.split(".")[image4.split(".").length - 1];
    let returnUrls: any = [];
    try {
      const images = [
        {
          uri: image1,
          name: `${user?.firstName} ${user?.lastName}_userCredential1.${imageExtension1}`,
        },
        {
          uri: image2,
          name: `${user?.firstName} ${user?.lastName}_userCredential2.${imageExtension2}`,
        },
        {
          uri: image3,
          name: `${user?.firstName} ${user?.lastName}_userCredential3.${imageExtension3}`,
        },
        {
          uri: image4,
          name: `${user?.firstName} ${user?.lastName}_userCredential4.${imageExtension4}`,
        },
      ];

      const promises = images.map(async (image) => {
        const ref = firebase
          .storage()
          .ref()
          .child(
            `userImages/${user?.firstName} ${user?.lastName}/${image.name}`
          );
        await ref.putFile(image.uri);
        return await ref.getDownloadURL();
      });

      const urls = await Promise.all(promises);
      returnUrls = urls;
    } catch (error) {
      console.error(error);
      dispatch(setLoading(false));
    }
    dispatch(setLoading(true));
    return returnUrls;
  };

  const handleSubmit = async () => {
    if (!image1 || !image2 || !image3 || !image4) return;
    const urls = await uploadImage().then((res) => res);

    const toSubmit = {
      from: "landlord",
      credUrls: urls,
      landlordDocId: user.docId,
      createdAt: new Date().toISOString(),
      selectedId: {
        selectedId1,
        selectedId2,
      },
      landlordName: `${user?.firstName} ${user?.lastName}`,
    };

    dispatch(setLoading(true));
    firebase
      .firestore()
      .collection("higherAdmins")
      .doc("Ej7bQGlfTeDjsG0KSiJj")
      .get()
      .then((doc) => {
        if (!doc.exists) {
          dispatch(setLoading(false));
          return console.log("cannot get higher admin");
        }
        const currentHigherAdmin: any = doc.data();
        const index = currentHigherAdmin?.requests?.findIndex(
          (item: any) => item.docId === user.docId
        );
        dispatch(setLoading(false));
        if (index >= 0) return;
        currentHigherAdmin?.requests.push(toSubmit);
        // update
        firebase
          .firestore()
          .collection("higherAdmins")
          .doc("Ej7bQGlfTeDjsG0KSiJj")
          .update(currentHigherAdmin);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(setLoading(true));
    const userCopy = { ...user };
    userCopy.accountStatus = "waiting";
    userCopy.submittedCredentials = toSubmit;
    dispatch(setUser(userCopy));
    firebase
      .firestore()
      .collection("landlords")
      .doc(user?.docId)
      .update(userCopy);
    dispatch(setLoading(false));
  };
  return (
    <SafeScreenView>
      {user?.accountStatus === "declined" ||
      user?.accountStatus === "notVerified" ? (
        <NotVerified
          handleSubmit={handleSubmit}
          image1={image1}
          image2={image2}
          image3={image3}
          image4={image4}
          setImage1={setImage1}
          setImage2={setImage2}
          setImage3={setImage3}
          setImage4={setImage4}
          pickImage={pickImage}
          selectedId1={selectedId1}
          selectedId2={selectedId2}
          setSelectedId1={setSelectedId1}
          setSelectedId2={setSelectedId2}
        />
      ) : (
        <VerifyOnWait images={user?.submittedCredentials?.credUrls} />
      )}
    </SafeScreenView>
  );
};

export default VerifyLandlord;
