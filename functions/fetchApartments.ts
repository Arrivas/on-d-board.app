import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import { Apartments } from "../App";

const fetchApartments = async (count?: number): Promise<Apartments[]> => {
  const results: Apartments[] = [];

  const query = count
    ? firebase.firestore().collection("apartments").limit(count)
    : firebase.firestore().collection("apartments");

  try {
    const snapshot = await query.get();
    if (snapshot.empty) {
      return results;
    }
    snapshot.forEach((doc) => {
      results.push(doc.data() as Apartments);
    });
  } catch (err) {
    console.log(err);
  }

  return results;
};

export { fetchApartments };
