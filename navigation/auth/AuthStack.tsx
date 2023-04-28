import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginComponent from "../../components/login/LoginComponent";
import StartScreen from "../../components/login/StartScreen";
import CreateAccount from "../../components/login/createAccount/CreateAccount";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="authStart"
      component={StartScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Login"
      component={LoginComponent}
      options={{ headerShadowVisible: false }}
    />
    <Stack.Screen
      name="Create Account"
      component={CreateAccount}
      options={{ headerShadowVisible: false }}
    />
  </Stack.Navigator>
);

export default AuthStack;
