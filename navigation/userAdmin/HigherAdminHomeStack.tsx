import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HigherAdminHomeScreen from "../../components/higherAdmin/HigherAdminHomeScreen";

const Stack = createNativeStackNavigator();
const Logout = () => <></>;

const HigherAdminHomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HigherAdminHomeScreen} />
    <Stack.Screen
      name="logout"
      component={Logout}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default HigherAdminHomeStack;
