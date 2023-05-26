import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const DocumentViewer = ({ images, selectedId1, selectedId2 }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const handlePreview = (index: number) => {
    setSelectedImage(index);
    setModalVisible(true);
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((image: any, index: number) =>
          index === 0 ? (
            <TouchableOpacity key={index} onPress={() => handlePreview(index)}>
              <>
                <Image
                  className="mr-1 rounded-md"
                  source={{ uri: image }}
                  style={{ height: 120, width: 120 }}
                  resizeMode="cover"
                />
                <Text className="text-center">{selectedId1}</Text>
              </>
            </TouchableOpacity>
          ) : index === 1 ? (
            <TouchableOpacity key={index} onPress={() => handlePreview(index)}>
              <>
                <Image
                  className="mr-1 rounded-md"
                  source={{ uri: image }}
                  style={{ height: 120, width: 120 }}
                  resizeMode="cover"
                />
                <Text className="text-center">{selectedId1}</Text>
              </>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity key={index} onPress={() => handlePreview(index)}>
              <>
                <Image
                  className="mr-1 rounded-md"
                  source={{ uri: image }}
                  style={{ height: 120, width: 120 }}
                  resizeMode="cover"
                />
                <Text className="text-center">{selectedId2}</Text>
              </>
            </TouchableOpacity>
          )
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View className="items-center justify-center flex-1">
          <Image
            resizeMode="contain"
            source={{ uri: images[selectedImage] }}
            style={{ width: "100%", height: "50%" }}
          />
          <View className="flex-row justify-around w-full my-2">
            <TouchableOpacity
              onPress={() => setSelectedImage(selectedImage - 1)}
              disabled={selectedImage === 0}
            >
              <Text
                style={{
                  fontSize: 20,
                  marginRight: 16,
                  color: selectedImage === 0 ? "#eee" : "black",
                }}
              >
                Prev
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedImage(selectedImage + 1)}
              disabled={selectedImage === images.length - 1}
            >
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 16,
                  color: selectedImage === images.length - 1 ? "#eee" : "black",
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DocumentViewer;
