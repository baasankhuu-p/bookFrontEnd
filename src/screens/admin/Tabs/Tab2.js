import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Logo from "../../../components/Logo";
import CustomersScreen from "../CustomersScreen";
export default () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="customers">
      <Stack.Screen
        name="customers"
        component={CustomersScreen}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};
