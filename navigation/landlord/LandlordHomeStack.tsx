import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandlordHomeScreen from "../../components/landlord/LandlordHomeScreen";

const Stack = createNativeStackNavigator();

const Logout = () => <></>;

const LandlordRootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={LandlordHomeScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="logout"
      component={Logout}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default LandlordRootStack;
