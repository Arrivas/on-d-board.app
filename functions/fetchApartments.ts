import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import { Apartments } from "../App";

const fetchApartments = async (
  count?: number,
  ids?: string[],
  userType?: string
): Promise<Apartments[]> => {
  let results: Apartments[] = [];
  const query =
    count && userType === "landlord"
      ? firebase.firestore().collection("apartments").limit(count)
      : count && userType === "tenant"
      ? firebase
          .firestore()
          .collection("apartments")
          .limit(count)
          .where("accountStatus", "==", "verified")
      : userType === "tenant"
      ? firebase
          .firestore()
          .collection("apartments")
          .where("accountStatus", "==", "verified")
      : firebase.firestore().collection("apartments");

  try {
    const snapshot = await query.get();
    if (snapshot.empty) {
      return results;
    }
    if (ids !== undefined) {
      await firebase
        .firestore()
        .collection("apartments")
        .where("docId", "in", ids)

        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) =>
            results.push(doc.data() as Apartments)
          );
        });
    } else {
      if (userType === "landlord") return [];
      snapshot.forEach((doc) => {
        results.push(doc.data() as Apartments);
      });
    }
  } catch (err) {
    console.log(err);
  }

  return results;
};

export { fetchApartments };
