import { View, Text, TouchableNativeFeedback, Image } from "react-native";
import React from "react";
import moment from "moment";

export interface BookingsItemCardProps {
  bookings: {
    apartmentRoomsId: string;
    bookingDetails: {
      apartmentName: string;
      bedInformation: {
        isDoubleDeck: boolean;
        location: string;
      };
      imgUrl: string;
      name: string;
      price: string | number;
    };
    tenantDetails: {
      firstName: string;
      imageUrl: string;
      lastName: string;
      phoneNumber: string;
      uid: string;
    };
    createdAt: string;
  };
  navigation: any;
}

const BookingsItemCard: React.FC<BookingsItemCardProps> = ({
  bookings,
  navigation,
}) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#eee", false)}
      onPress={() =>
        navigation.replace("BookStack", {
          screen: "SuccessPage",
          params: { ongoing: bookings },
        })
      }
    >
      <View
        className="self-start mr-2 bg-white h-[120px] w-[150px] rounded-b-lg m-1"
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
        <View className="" style={{ flex: 1 }}>
          <Image
            className="h-full w-full rounded-t-lg"
            source={{ uri: bookings.bookingDetails.imgUrl }}
          />
        </View>
        <View className="p-1 px-2" style={{ flex: 0.8 }}>
          <Text className="font-semibold" numberOfLines={1}>
            {bookings.bookingDetails.apartmentName}
          </Text>
          <Text className="font-light" numberOfLines={1}>
            {Number(
              moment
                .duration(
                  moment(new Date(bookings.createdAt))
                    .add(72, "hours")
                    .diff(moment())
                )
                .asHours()
            ).toFixed(0)}{" "}
            - hours left
          </Text>
          {/* <Text className="font-semibold" numberOfLines={1}>
            {moment(new Date(bookings.createdAt)).format("MMM Do YYYY")}
          </Text> */}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default BookingsItemCard;
