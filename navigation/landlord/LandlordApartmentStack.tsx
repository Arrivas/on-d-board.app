import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewApartment from "../../components/landlord/home/ViewApartment";
import EditApartmentDetails from "../../components/landlord/home/EditApartmentDetails";

const Stack = createNativeStackNavigator();

const LandlordApartmentStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ViewApartment"
      component={ViewApartment}
      options={{ headerShadowVisible: false }}
    />
    <Stack.Screen
      name="EditApartmentDetails"
      component={EditApartmentDetails}
      options={{ headerShadowVisible: false, title: "Edit Apartment Details" }}
    />
  </Stack.Navigator>
);

export default LandlordApartmentStack;
