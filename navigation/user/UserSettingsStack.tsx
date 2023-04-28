import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../../components/user/settings/SettingsScreen";

const Stack = createNativeStackNavigator();

const UserSettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Settings" component={SettingsScreen}></Stack.Screen>
  </Stack.Navigator>
);

export default UserSettingsStack;
