import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandlordTab from "./LandlordTab";
const Stack = createNativeStackNavigator();

const LandlordRootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LandlordStack"
      component={LandlordTab}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default LandlordRootStack;
