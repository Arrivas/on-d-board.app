import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../../components/user/settings/SettingsScreen";
import VerifyTenant from "../../components/user/settings/verification/VerifyTenant";

const Stack = createNativeStackNavigator();

const UserSettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Verification"
      component={VerifyTenant}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default UserSettingsStack;
