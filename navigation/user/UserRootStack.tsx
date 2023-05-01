import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserTab from "./UserTab";
import UserMapStack from "./UserMapStack";
import UserBookStack from "./UserBookStack";

const Stack = createNativeStackNavigator();

const UserRootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="UserTab"
      component={UserTab}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="MapStack"
      component={UserMapStack}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="BookStack"
      component={UserBookStack}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default UserRootStack;
