import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  TouchableNativeFeedback,
} from "react-native";
import React, { useState } from "react";
import { Apartments } from "../../../App";

interface SearchModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  apartments: Apartments[];
  navigation: any;
}

const SearchModal: React.FC<SearchModalProps> = ({
  modalVisible,
  setModalVisible,
  apartments,
  navigation,
}) => {
  const [search, setSearch] = useState("");
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View className="fixed inset-0 flex items-center justify-center">
        <View className="bg-white rounded-lg p-6 w-full h-full flex1">
          <View className="flex-1">
            <Text className="text-xl font-bold mb-4">Search</Text>
            <TextInput
              className="rounded-full p-2 px-5 bg-gray-100"
              placeholder="search.."
              onChangeText={(value) => setSearch(value)}
            />

            {search ? (
              apartments
                .filter((item) =>
                  item.apartmentInfo.apartmentName
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((item) => {
                  const {
                    apartmentInfo,
                    docId,
                    landlordInfo,
                    specifications,
                    apartmentRoomsId,
                  } = item;
                  const { apartmentName, barangay, address } = apartmentInfo;
                  return (
                    <TouchableNativeFeedback
                      onPress={() =>
                        navigation.navigate("BookStack", {
                          screen: "ApartmentDetails",
                          params: { apartmentDetails: item },
                        })
                      }
                      key={docId}
                    >
                      <View className="my-2 p-2">
                        <Text>{apartmentName}</Text>
                        <View>
                          <Text className="font-bold">{barangay}</Text>
                          <Text>{address}</Text>
                        </View>
                      </View>
                    </TouchableNativeFeedback>
                  );
                })
            ) : (
              <View className="h-full w-full items-center justify-center">
                <Text className="text-gray-200 italic">search something..</Text>
              </View>
            )}
          </View>
          <View className="mt-10 flex-1">
            {!search && (
              <>
                <Text className="font-bold text-xl">Popular Apartments</Text>
                {apartments.slice(0, 2).map((item) => {
                  const {
                    apartmentInfo,
                    docId,
                    landlordInfo,
                    specifications,
                    apartmentRoomsId,
                  } = item;
                  const { apartmentName, barangay, address } = apartmentInfo;
                  return (
                    <TouchableNativeFeedback
                      onPress={() =>
                        navigation.navigate("BookStack", {
                          screen: "ApartmentDetails",
                          params: { apartmentDetails: item },
                        })
                      }
                      key={docId}
                    >
                      <View className="my-2 p-2">
                        <Text>{apartmentName}</Text>
                        <View>
                          <Text className="font-bold">{barangay}</Text>
                          <Text>{address}</Text>
                        </View>
                      </View>
                    </TouchableNativeFeedback>
                  );
                })}
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SearchModal;
