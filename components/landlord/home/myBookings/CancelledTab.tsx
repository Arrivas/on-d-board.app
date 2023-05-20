import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Image,
} from "react-native";
import React from "react";
import Icon from "../../../Icon";
import { useDispatch } from "react-redux";
import { formatAsCurrency } from "../../../../functions/formatAsCurrency";
import { setBooking } from "../../../../store/bookingSlice";
import { BookingItems, BookingSliceState } from "../../../../App";
import moment from "moment";

interface CancelledTabProps {
  activeLabel: string;
  bookings: BookingItems[];
  cancellations: BookingSliceState[];
}

const CancelledTab: React.FC<CancelledTabProps> = ({
  activeLabel,
  cancellations,
  bookings,
}) => {
  const dispatch = useDispatch();

  return (
    <ScrollView>
      {activeLabel === "Cancelled" && (
        <>
          {cancellations.map((item: any) => {
            const {
              bookingDetails,
              tenantDetails,
              showState,
              apartmentBookDocId,
              createdAt,
            } = item;
            const { firstName, lastName, imageUrl, phoneNumber, tenantDocId } =
              tenantDetails;
            const {
              apartmentName,
              imgUrl,
              bedInformation,
              bookingStatus,
              name,
              price,
              cancellationDate,
            } = bookingDetails;
            const { isDoubleDeck, location } = bedInformation;
            return (
              <View
                className="p-5 px-7 bg-white mx-2 my-1"
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
                }}
                key={apartmentBookDocId}
              >
                <View className="flex-row justify-between ">
                  <View className="flex-1 flex-row">
                    <Icon
                      color="#bdbdbd"
                      size={25}
                      materialName="apartment"
                      iconLibrary="MaterialIcons"
                    />
                    <Text numberOfLines={1}>{apartmentName}</Text>
                  </View>
                  <View className="flex-1 items-end my-2">
                    <Text className="capitalize">{bookingStatus}</Text>
                  </View>
                </View>
                {/* content */}
                <View className="flex-row w-full">
                  <Image
                    className="h-[70px] w-[70px]"
                    source={{ uri: imgUrl }}
                  />
                  <View className="ml-5 flex-1">
                    <Text>{name}</Text>
                    <Text>{isDoubleDeck ? "Double Deck" : "Single Bed"}</Text>
                    <Text className="text-xs text-gray-400">{location}</Text>
                    <Text className="text-xs text-gray-400 self-end">
                      {formatAsCurrency(price)}/month
                    </Text>
                  </View>
                </View>
                <View className="w-full h-[1px] bg-gray-200 my-5" />

                {item.showState && (
                  <>
                    <View className="flex-row justify-between">
                      <View className="flex-1">
                        <Text className="font-semibold">Name</Text>
                      </View>
                      <View className="flex-1 items-end">
                        <View className="flex-row space-x-2">
                          <Text>{firstName}</Text>
                          <Text>{lastName}</Text>
                        </View>
                      </View>
                    </View>
                    <View className="flex-row justify-between">
                      <View className="flex-1">
                        <Text className="font-semibold">Phone#</Text>
                      </View>
                      <View className="flex-1 items-end">
                        <View className="flex-row space-x-2">
                          <Text>{phoneNumber}</Text>
                        </View>
                      </View>
                    </View>
                    <View className="flex-row justify-between">
                      <View className="flex-1">
                        <Text className="font-semibold">Booking Date</Text>
                      </View>
                      <View className="flex-1 items-end">
                        <View className="flex-row space-x-2">
                          <Text>
                            {moment(new Date(createdAt)).format("LLL")}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                )}
                <TouchableNativeFeedback
                  onPress={() => {
                    const bookingsCopy = [...bookings];
                    bookingsCopy.filter((copyItem) => {
                      if (copyItem.docId === item.docId) {
                        copyItem.showState = !copyItem.showState;
                      }
                    });
                    dispatch(setBooking(bookingsCopy));
                  }}
                >
                  <View className="w-full justify-between flex-row py-2">
                    <Text className="text-xs">Tenant Details</Text>
                    {showState ? (
                      <Icon ionName="chevron-up" iconLibrary="IonIcons" />
                    ) : (
                      <Icon ionName="chevron-down" iconLibrary="IonIcons" />
                    )}
                  </View>
                </TouchableNativeFeedback>
                <View className="justify-between items-end">
                  <Text className="text-xs text-gray-300">cancelled at</Text>
                  <Text className="self-end text-xs text-gray-300">
                    {moment(new Date(cancellationDate)).format("LLL")}
                  </Text>
                </View>
              </View>
            );
          })}
        </>
      )}
    </ScrollView>
  );
};

export default CancelledTab;
