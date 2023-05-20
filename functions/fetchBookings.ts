import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import { BookingSliceState } from "../App";

const fetchBookings = async (
  userDocId: string,
  mode = "user"
): Promise<BookingSliceState[]> => {
  const results: BookingSliceState[] = [];
  const query =
    mode === "user"
      ? firebase
          .firestore()
          .collection("tenants")
          .doc(userDocId)
          .collection("bookings")
      : firebase
          .firestore()
          .collection("apartmentRooms")
          .doc(userDocId)
          .collection("bookings");

  await query
    .get()
    .then((data) => {
      if (data.empty) return;
      data.forEach((doc) => results.push(doc.data() as BookingSliceState));
    })
    .catch((err) => console.log(err));
  return results;
};

export { fetchBookings };
