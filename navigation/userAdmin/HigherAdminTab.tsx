import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HigherAdminHomeStack from "./HigherAdminHomeStack";
import HigherAdminSettingsStack from "./HigherAdminSettingsStack";
import Icon from "../../components/Icon";
import colors from "../../config/colors";

const Tab = createBottomTabNavigator();

const HigherAdminTab = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="HomeStack"
      component={HigherAdminHomeStack}
      options={{
        title: "Home",
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({ color }) => (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <Icon
              iconLibrary="Feather"
              featherName="home"
              color={color}
              size={22}
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="SettingsStack"
      component={HigherAdminSettingsStack}
      options={{
        title: "Settings",
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({ color }) => (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <Icon
              iconLibrary="Feather"
              featherName="settings"
              color={color}
              size={22}
            />
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

export default HigherAdminTab;
