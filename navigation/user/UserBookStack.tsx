import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ApartmentDetails from "../../components/user/book/ApartmentDetails";
import ApartmentBooking from "../../components/user/book/ApartmentBooking";

const Stack = createNativeStackNavigator();

const UserBookStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ApartmentDetails"
      component={ApartmentDetails}
      options={{
        headerTransparent: true,
        title: "",
      }}
    />
    <Stack.Screen
      name="ApartmentBooking"
      component={ApartmentBooking}
      options={{
        title: "Reservation",
        headerShadowVisible: false,
      }}
    />
  </Stack.Navigator>
);
export default UserBookStack;
