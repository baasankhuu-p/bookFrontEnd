import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileScreen from "../ProfileScreen";
import InformationEdit from "../InformationEdit";
export default Tab3 = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="EditProfile"
        component={InformationEdit}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
