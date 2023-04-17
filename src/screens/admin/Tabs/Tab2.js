import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Logo from "../../../components/Logo";
import CustomersScreen from "../CustomersScreen";
import CustomersEdit from "../CustomersEdit";
import addCustomer from "../addCustomer";
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
      <Stack.Screen
        name="CustomersEdit"
        component={CustomersEdit}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="addCustomer"
        component={addCustomer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
