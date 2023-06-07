import { View, Modal, ToastAndroid } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { PinnedLocation } from "./EditApartmentDetails";

interface PinLocationModalProps {
  modalVisible: boolean;
  pinnedLocation: PinnedLocation | null;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPinnedLocation: React.Dispatch<React.SetStateAction<any>>;
}

const PinLocationModal: React.FC<PinLocationModalProps> = ({
  modalVisible,
  pinnedLocation,
  setModalVisible,
  setPinnedLocation,
}) => {
  function handleMapPress(e: any) {
    setPinnedLocation(e.nativeEvent.coordinate);
    ToastAndroid.show("Pinned Location Selected", ToastAndroid.SHORT);
  }

  return (
    <View className="flex-1">
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1">
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 16.015838555783244,
              longitude: 120.23596948050755,
              latitudeDelta: 0.055,
              longitudeDelta: 0.055,
            }}
            onPress={handleMapPress}
          >
            {pinnedLocation && (
              <Marker
                coordinate={{
                  latitude: Number(pinnedLocation?.latitude),
                  longitude: Number(pinnedLocation?.longitude),
                }}
              />
            )}
          </MapView>
        </View>
      </Modal>
    </View>
  );
};

export default PinLocationModal;
