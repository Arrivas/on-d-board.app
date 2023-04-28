import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserHomeScreen from "../../components/user/UserHomeScreen";

const Stack = createNativeStackNavigator();

const Logout = () => <></>;

const UserHomeStack = () => (
  <Stack.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarVisible: route.name !== "NearbyDormMap",
    })}
  >
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
