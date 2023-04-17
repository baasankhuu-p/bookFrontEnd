import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Logo from "../../../components/Logo";
import Book from "../Book/Book";
import Edit from "../Book/Edit";
import Add from "../Book/Add";
export default () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="getbook">
      <Stack.Screen
        name="getbookBooks"
        component={Book}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="EditBooks"
        component={Edit}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="addBooks"
        component={Add}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
