import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandlordTab from "./LandlordTab";
import LandlordApartmentStack from "./LandlordApartmentStack";

const Stack = createNativeStackNavigator();

const LandlordRootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LandlordStack"
      component={LandlordTab}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="LandlordApartmentStack"
      component={LandlordApartmentStack}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default LandlordRootStack;
