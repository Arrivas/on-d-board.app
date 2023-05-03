import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandlordSettingsScreen from "../../components/landlord/settings/LandlordSettingsScreen";

const Stack = createNativeStackNavigator();

const LandlordRootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Settings"
      component={LandlordSettingsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default LandlordRootStack;
