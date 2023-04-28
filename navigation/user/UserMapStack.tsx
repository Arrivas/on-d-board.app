import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NearbyDormMap from "../../components/user/map/NearbyDormMap";

const Stack = createNativeStackNavigator();

const UserMapStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="NearbyDormMap"
      component={NearbyDormMap}
      options={{ title: "Nearby Dorms" }}
    />
  </Stack.Navigator>
);

export default UserMapStack;
