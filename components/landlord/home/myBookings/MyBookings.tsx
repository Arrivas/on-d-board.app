import { View, Text, TouchableNativeFeedback, ScrollView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import SafeScreenView from "../../../SafeScreenView";
import colors from "../../../../config/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { separateBookings } from "../../../../functions/separateBookings";

// tabs
import PendingTab from "./PendingTab";
import CancelledTab from "./CancelledTab";
import OngoingTab from "./OngoingTab";
import HistoryTab from "./HistoryTab";

const tabLabelItems = [
  { id: 1, label: "Pending" },
  { id: 2, label: "Ongoing" },
  { id: 3, label: "Cancelled" },
  { id: 4, label: "History" },
];

const MyBookings = ({ route }: any) => {
  const { tabLabel } = route.params;
  const bookings = useSelector((state: RootState) => state.booking.bookings);
  const [activeLabel, setActiveLabel] = useState(tabLabel);

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    if (
      (scrollViewRef.current && tabLabel === "Cancelled") ||
      (scrollViewRef.current && tabLabel === "History")
    ) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      scrollToBottom();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const { pendings, cancellations, ongoing, history } =
    separateBookings(bookings);

  return (
    <SafeScreenView>
      {/* tab */}
      <View className="flex-1">
        <View className="flex-row w-full">
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={scrollToBottom}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {tabLabelItems?.map((item) => (
              <TouchableNativeFeedback
                onPress={() => setActiveLabel(item.label)}
                key={item.id}
              >
                <View
                  className="w-[120px] p-3 border-b"
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor:
                      activeLabel === item.label ? colors.primary : "#fff",
                  }}
                >
                  <Text className="self-center ">{item.label}</Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </ScrollView>
        </View>
        {/* content */}
        <View className="flex-1 h-full w-full">
          {activeLabel === "Pending" ? (
            <PendingTab
              activeLabel={activeLabel}
              bookings={bookings}
              pendings={pendings}
            />
          ) : activeLabel === "Cancelled" ? (
            <CancelledTab
              activeLabel={activeLabel}
              bookings={bookings}
              cancellations={cancellations}
            />
          ) : activeLabel === "Ongoing" ? (
            <OngoingTab
              activeLabel={activeLabel}
              bookings={bookings}
              ongoing={ongoing}
            />
          ) : (
            <HistoryTab
              activeLabel={activeLabel}
              bookings={bookings}
              history={history}
            />
          )}
        </View>
      </View>
    </SafeScreenView>
  );
};

export default MyBookings;
