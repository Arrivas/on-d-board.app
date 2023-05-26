import { View, Text } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

const barangays = [
  "Aliwekwek",
  "Baay",
  "Balangobong",
  "Balococ",
  "Bantayan",
  "Basing",
  "Capandanan",
  "Domalandan Center",
  "Domalandan East",
  "Domalandan West",
  "Dorongan",
  "Dulag",
  "Estanza",
  "Lasip",
  "Libsong East",
  "Libsong West",
  "Malawa",
  "Malimpuec",
  "Maniboc",
  "Matalava",
  "Naguelguel",
  "Namolan",
  "Pangapisan North",
  "Pangapisan Sur",
  "Poblacion",
  "Quibaol",
  "Rosario",
  "Sabangan",
  "Talogtog",
  "Tonton",
  "Tumbar",
  "Wawa",
];

interface SelectedBarangayProps {
  selectedBarangay: string;
  setSelectedBarangay: React.Dispatch<React.SetStateAction<string>>;
  type?: string;
}

const SelectBarangay: React.FC<SelectedBarangayProps> = ({
  selectedBarangay,
  setSelectedBarangay,
  type = "default",
}) => {
  return (
    <>
      {type === "default" ? (
        <View className="border border-[#a6a6a6] rounded-md">
          <Picker
            selectedValue={selectedBarangay}
            onValueChange={(itemValue) => setSelectedBarangay(itemValue)}
            className="bg-white border border-gray-400 rounded"
          >
            <Picker.Item label="Select barangay" value={null} />
            {barangays.map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>
      ) : (
        <View className="rounded-md bg-gray-100 mb-1">
          <Picker
            selectedValue={selectedBarangay}
            onValueChange={(itemValue) => setSelectedBarangay(itemValue)}
            className="bg-white border border-gray-400 rounded"
          >
            <Picker.Item label="Select barangay" value={null} />
            {barangays.map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>
      )}
    </>
  );
};

export default SelectBarangay;
