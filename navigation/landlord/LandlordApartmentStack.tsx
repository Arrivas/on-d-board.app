import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewApartment from "../../components/landlord/home/ViewApartment";
import EditApartmentDetails from "../../components/landlord/home/EditApartmentDetails";
import EditFrontImage from "../../components/landlord/home/edit/EditFrontImage";
import EditBedspace from "../../components/landlord/home/edit/EditBedspace";

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
      options={{ headerShadowVisible: false, title: "Edit" }}
    />
    <Stack.Screen
      name="EditFrontImage"
      component={EditFrontImage}
      options={{ headerTransparent: true, title: "Edit" }}
    />
    <Stack.Screen
      name="EditBedspace"
      component={EditBedspace}
      options={{ headerShadowVisible: true, title: "Edit" }}
    />
  </Stack.Navigator>
);

export default LandlordApartmentStack;
