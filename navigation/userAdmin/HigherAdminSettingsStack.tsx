import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HigherAdminSettingsScreen from "../../components/higherAdmin/HigherAdminSettingsScreen";

const Stack = createNativeStackNavigator();

const HigherAdminSettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Settings"
      component={HigherAdminSettingsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default HigherAdminSettingsStack;
