import { Text, View } from "react-native";
import React from "react";
import Dialog from "react-native-dialog";

interface DeleteDialogProps {
  dialogVisible: boolean;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  handleDelete: () => void;
  apartmentName: string;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  dialogVisible,
  setInputValue,
  inputValue,
  handleDelete,
  apartmentName,
  setShowDialog,
}) => {
  return (
    <Dialog.Container visible={dialogVisible}>
      <Dialog.Title className="text-black">Delete Apartment</Dialog.Title>
      <Text className="text-black">
        type <Text className="font-semibold">{apartmentName}</Text> to confirm
        apartment deletion
      </Text>

      <Dialog.Input
        className="text-black"
        placeholder="type here..."
        onChangeText={setInputValue}
        value={inputValue}
      />
      <View className="flex-row self-end">
        <Dialog.Button
          className="text-black"
          label="cancel"
          onPress={() => setShowDialog(false)}
        />
        <Dialog.Button
          className="text-black"
          label="remove"
          onPress={handleDelete}
        />
      </View>
    </Dialog.Container>
  );
};

export default DeleteDialog;
