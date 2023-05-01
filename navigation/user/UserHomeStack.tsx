import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserHomeScreen from "../../components/user/UserHomeScreen";
import ApartmentDetails from "../../components/user/book/ApartmentDetails";

const Stack = createNativeStackNavigator();

const Logout = () => <></>;

const UserHomeStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={UserHomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="logout"
      component={Logout}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default UserHomeStack;
