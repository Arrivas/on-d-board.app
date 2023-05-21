import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  ToastAndroid,
} from "react-native";
import React from "react";
import Icon from "../../Icon";
import colors from "../../../config/colors";
import { Apartments } from "../../../App";
import DeleteDialog from "./DeleteDialog";

interface LandlordApartmentCardProps {
  item: Apartments;
  navigation?: any;
  handleRemoveApartment: (
    apartmentRoomsId: string | undefined,
    currentDocId: string,
    apartmentName: string
  ) => void;
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
}

const LandlordApartmentCard: React.FC<LandlordApartmentCardProps> = ({
  item,
  navigation,
  handleRemoveApartment,
  showDialog,
  setShowDialog,
  inputValue,
  setInputValue,
}) => {
  const { apartmentInfo, docId, apartmentRoomsId } = item;

  return (
    <>
      <View className="bg-gray-100 flex-row rounded-md mb-2">
        <View className="h-[120px] w-[120px]">
          <Image
            className="rounded-md w-auto h-[120px] rounded-r-none"
            source={{ uri: apartmentInfo.imageUrl }}
          />
        </View>
        <View className="flex-1 px-2 justify-center">
          <View className="">
            <Text className="font-semibold text-lg">
              {apartmentInfo.apartmentName}
            </Text>
            <Text>{apartmentInfo.address}</Text>
          </View>
          {/* bototm button */}
          <View className="flex-row py-2 ">
            <TouchableNativeFeedback onPress={() => setShowDialog(true)}>
              <View className="p-3 flex-1 flex-row items-center justify-center mr-1 space-x-1 bg-[#B30000] rounded-md">
                <Icon ionName="trash" iconLibrary="IonIcons" color="white" />
                <Text className="font-semibold text-white">remove</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() =>
                navigation.navigate("LandlordApartmentStack", {
                  screen: "ViewApartment",
                  params: { item },
                })
              }
              background={TouchableNativeFeedback.Ripple("#eee", false)}
            >
              <View
                className="p-3 flex-1 flex-row items-center justify-center space-x-1 rounded-md"
                style={{
                  backgroundColor: colors.primary,
                }}
              >
                <Icon
                  materialName="apartment"
                  iconLibrary="MaterialIcons"
                  color="white"
                />
                <Text className="font-semibold text-white">view</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
      <DeleteDialog
        setShowDialog={setShowDialog}
        apartmentName={item.apartmentInfo.apartmentName}
        dialogVisible={showDialog}
        setInputValue={setInputValue}
        handleDelete={() =>
          handleRemoveApartment(
            apartmentRoomsId,
            docId,
            item.apartmentInfo.apartmentName
          )
        }
        inputValue={inputValue}
      />
    </>
  );
};

export default LandlordApartmentCard;
