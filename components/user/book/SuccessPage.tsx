import { View, Text, ScrollView, TouchableNativeFeedback } from "react-native";
import React from "react";
import Icon from "../../Icon";
import SafeScreenView from "../../SafeScreenView";
import Moment from "moment";
import { formatAsCurrency } from "../../../functions/formatAsCurrency";
import getDimensions from "../../../config/getDimensions";
import colors from "../../../config/colors";

const SuccessPage = ({ route, navigation }: any) => {
  const { ongoing } = route.params;
  const { docId } = ongoing;
  const { price, name, apartmentName } = ongoing.bookingDetails;
  const { firstName, lastName, phoneNumber } = ongoing.tenantDetails;
  const { height } = getDimensions();

  return (
    <SafeScreenView>
      <View className="p-5 bg-[#f5f7fb] flex-1">
        <View
          className="self-center items-center bg-white w-full p-5 rounded-md"
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
          <View className="bg-[#224b322c] rounded-full h-[70px] w-[70px] items-center justify-center">
            <Icon
              ionName="checkmark-circle"
              iconLibrary="IonIcons"
              color="#166534"
              size={30}
            />
          </View>
          <Text className="font-semibold text-lg py-1">
            Successfully Booked
          </Text>
        </View>
        <View style={{ height: height - 250 }}>
          <ScrollView>
            <View className="self-center bg-white w-full p-5 rounded-md mt-2">
              <Text className="font-semibold text-lg py-1">
                Booking Details
              </Text>
              <View className="w-full">
                <View className=" flex-row my-1">
                  <Text className="flex-1 font-semibold">Ref Number</Text>
                  <Text className="flex-1 text-right" numberOfLines={1}>
                    {docId}
                  </Text>
                </View>
                <View className=" flex-row my-1">
                  <Text className="flex-1 font-semibold">Apartment Name</Text>
                  <Text className="flex-1 text-right">{apartmentName}</Text>
                </View>
                <View className=" flex-row my-1">
                  <Text className="flex-1 font-semibold">
                    Selected Bedspace
                  </Text>
                  <Text className="flex-1 text-right">{name}</Text>
                </View>
                <View className=" flex-row my-1">
                  <Text className="flex-1 font-semibold">Booking Time</Text>
                  <Text className="flex-1 text-right">
                    {Moment(new Date()).format("LLLL")}
                  </Text>
                </View>

                <View className=" flex-row my-1">
                  <Text className="flex-1 font-semibold">Price</Text>
                  <Text className="flex-1 text-right">
                    {formatAsCurrency(price)}
                  </Text>
                </View>
              </View>
            </View>
            <View className="self-center bg-white w-full p-5 rounded-md mt-2">
              <Text className="font-semibold text-lg py-1">Tenant Details</Text>
              <View className="w-full">
                <View className=" flex-row my-1">
                  <Text className="flex-1 font-semibold">First Name</Text>
                  <Text className="flex-1 text-right">{firstName}</Text>
                </View>
                <View className=" flex-row my-1">
                  <Text className="flex-1 font-semibold">Last Name</Text>
                  <Text className="flex-1 text-right">{lastName}</Text>
                </View>
                <View className=" flex-row my-1">
                  <Text className="flex-1 font-semibold">Phone#</Text>
                  <Text className="flex-1 text-right">{phoneNumber}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#eee", false)}
          onPress={() => navigation.navigate("Home")}
        >
          <View
            className="my-4 rounded-md p-2"
            style={{
              backgroundColor: colors.primary,
            }}
          >
            <Text className="font-semibold text-white py-2 text-center">
              Home
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </SafeScreenView>
  );
};

export default SuccessPage;
