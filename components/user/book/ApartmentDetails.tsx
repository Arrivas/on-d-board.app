import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import SafeScreenView from "../../SafeScreenView";
import Icon from "../../Icon";
import colors from "../../../config/colors";
import { formatAsCurrency } from "../../../functions/formatAsCurrency";
import ApartmentAmenities from "./ApartmentAmenities";
import Specifications from "./ApartmentSpecifications";

const ApartmentDetails = ({ route, navigation }: any) => {
  const { apartmentDetails } = route.params;
  const { apartmentInfo, tenantInfo, specifications, docId } = apartmentDetails;
  const {
    address,
    imageUrl,
    apartmentName,
    geoLocation,
    price,
    amenities,
    description,
  } = apartmentInfo;

  return (
    <SafeScreenView>
      <View className="flex-1">
        <View style={{ flex: 1 }} className="px-2 pt-2">
          <Image
            className="h-full w-full object-cover rounded-md"
            source={{ uri: imageUrl }}
          />
        </View>
        <View style={{ flex: 1 }} className="p-5">
          <ScrollView>
            <Text className="text-2xl font-semibold ">{apartmentName}</Text>
            <View className="flex-row items-center mb-3">
              <Icon ionName="location-outline" iconLibrary="IonIcons" />
              <Text>{address}</Text>
            </View>
            {/* specification */}
            <Specifications
              specifications={[
                {
                  label: "Bedspace",
                  value: specifications.bedspace,
                  icon: (
                    <Icon
                      ionName="bed-outline"
                      iconLibrary="IonIcons"
                      size={25}
                      color={colors.primary}
                    />
                  ),
                },
                {
                  label: "Bathroom",
                  value: specifications.bathroomCount,
                  icon: (
                    <Icon
                      materialComName="shower"
                      iconLibrary="MaterialCommunityIcons"
                      size={25}
                      color={colors.primary}
                    />
                  ),
                },
              ]}
            />
            <View className="max-h-[100px] ">
              <Text className="font-bold text-lg">Description</Text>
              <ScrollView>
                <Text style={{ textAlign: "justify" }}>{description}</Text>
              </ScrollView>
            </View>
            {/* amenities */}
            <ApartmentAmenities amenities={amenities} />
          </ScrollView>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate("ApartmentBooking", { docId })}
            background={TouchableNativeFeedback.Ripple("#EEE", false)}
          >
            <View
              className="bg-white border-t-0 rounded-md p-2"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,

                elevation: 2,
              }}
            >
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-green-700 font-bold text-lg">
                    {formatAsCurrency(Number(price.from))} -{" "}
                    {formatAsCurrency(Number(price.to))}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    price range(depends on room)
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="font-bold">View Deals</Text>
                  <Icon iconLibrary="IonIcons" ionName="chevron-forward" />
                </View>
              </View>
              <Text
                className="text-xs self-end"
                style={{
                  color: colors.lightGray,
                }}
              >
                more details
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </SafeScreenView>
  );
};

export default ApartmentDetails;
