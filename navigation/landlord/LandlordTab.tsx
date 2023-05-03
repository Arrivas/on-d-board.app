import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LandlordHomeStack from "./LandlordHomeStack";
import Icon from "../../components/Icon";
import colors from "../../config/colors";
import { View } from "react-native";
import LandlordSettingsStack from "./LandLordSettingsStack";

const Tab = createBottomTabNavigator();

const UserTab = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarItemStyle: {
        justifyContent: "center",
        alignItems: "center",
      },
    }}
  >
    <Tab.Screen
      name="HomeStack"
      component={LandlordHomeStack}
      options={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        title: "Home",
        tabBarStyle: {
          height: 55,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          textAlignVertical: "center",
          marginBottom: 6,
        },
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
      component={LandlordSettingsStack}
      options={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        title: "Settings",
        tabBarStyle: {
          height: 55,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          textAlignVertical: "center",
          marginBottom: 6,
        },
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

export default UserTab;
