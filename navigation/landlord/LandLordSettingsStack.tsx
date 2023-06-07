import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandlordSettingsScreen from "../../components/landlord/settings/LandlordSettingsScreen";
import VerifyLandlord from "../../components/landlord/settings/verification/VerifyLandlord";

const Stack = createNativeStackNavigator();

const LandlordRootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Settings"
      component={LandlordSettingsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Verification"
      component={VerifyLandlord}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default LandlordRootStack;
