import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
// Admin
import ADTab1 from "./src/screens/admin/Tabs/Tab1";
import ADTab2 from "./src/screens/admin/Tabs/Tab2";
import ADTab3 from "./src/screens/admin/Tabs/Tab3";
// Operator
import opTab1 from "./src/screens/operator/Tabs/opTab1";
import opTab2 from "./src/screens/operator/Tabs/opTab2";
import opTab3 from "./src/screens/operator/Tabs/opTab3";
import opTab4 from "./src/screens/operator/Tabs/opTab4";
import opTab5 from "./src/screens/operator/Tabs/opTab5";

// Хэрэглэгч болон бусад
import Tab1 from "./src/screens/customers/Tabs/Tab1";
import Tab2 from "./src/screens/customers/Tabs/Tab2";
import Tab3 from "./src/screens/customers/Tabs/Tab3";
import Tab4 from "./src/screens/customers/Tabs/Tab4";
import Tab5 from "./src/screens/customers/Tabs/Tab5";

import { HBColor } from "./src/Constants";
import { IconName } from "./src/utils/functions";
import UserContext from "./src/context/userContext";
import SplashScreen from "./src/screens/SplashScreen";
import { Text } from "react-native";
const Tab = createBottomTabNavigator();
export default ({ ref }) => {
  const state = useContext(UserContext);
  switch (state.userInfo.roler) {
    case "admin":
      return (
        <>
          <NavigationContainer>
            <SplashScreen />
            {/* {state} */}
            <Tab.Navigator
              initialRouteName="Оператор"
              screenOptions={({ route }) => ({
                tabBarActiveTintColor: HBColor,
                tabBarInactiveTintColor: HBColor,
                headerTitle: null,
                headerShown: false,
                headerStyle: {
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#b9d7d9",
                },
                tabBarIcon: ({ focused, color, size }) => {
                  return (
                    <Ionicons
                      name={IconName(route.name, focused)}
                      size={size}
                      color={color}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  );
                },
              })}
            >
              <Tab.Screen name="Оператор" component={ADTab1} />
              <Tab.Screen name="Үйлчлүүлэгчид" component={ADTab2} />
              <Tab.Screen name="Профайл" component={ADTab3} />
            </Tab.Navigator>
          </NavigationContainer>
        </>
      );
    case "operator":
      return (
        <>
          <NavigationContainer>
            <SplashScreen />
            {/* {state} */}
            <Tab.Navigator
              initialRouteName="Ном"
              screenOptions={({ route }) => ({
                tabBarActiveTintColor: HBColor,
                tabBarInactiveTintColor: HBColor,
                headerTitle: null,
                headerShown: false,
                headerStyle: {
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#b9d7d9",
                },
                tabBarIcon: ({ focused, color, size }) => {
                  return (
                    <Ionicons
                      name={IconName(route.name, focused)}
                      size={size}
                      color={color}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  );
                },
              })}
            >
              <Tab.Screen name="Ном" component={opTab1} />
              <Tab.Screen name="Категори" component={Text} />
              <Tab.Screen name="Гүйлгээ" component={opTab3} />
              <Tab.Screen name="Хүргэлт" component={opTab4} />
              <Tab.Screen name="Ажилтан" component={opTab5} />
            </Tab.Navigator>
          </NavigationContainer>
        </>
      );
    default:
      return (
        <>
          <NavigationContainer>
            <SplashScreen />
            {/* {state} */}
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarActiveTintColor: HBColor,
                tabBarInactiveTintColor: HBColor,
                headerTitle: null,
                headerShown: false,
                headerStyle: {
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#b9d7d9",
                },
                tabBarIcon: ({ focused, color, size }) => {
                  return (
                    <Ionicons
                      name={IconName(route.name, focused)}
                      size={size}
                      color={color}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  );
                },
              })}
            >
              <Tab.Screen name="Нүүр" component={Tab1} />
              <Tab.Screen name="Ном" component={Tab2} />
              <Tab.Screen name="Захиалга" component={Tab3} />
              <Tab.Screen name="Хүргэлт" component={Tab4} />
              <Tab.Screen name="Профайл" component={Tab5} />
            </Tab.Navigator>
          </NavigationContainer>
        </>
      );
  }
};
