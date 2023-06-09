import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Logo from "../../../components/Logo";
import DeliveryScreen from "../DeliveryScreen";
export default () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Deliveries">
      <Stack.Screen
        name="Deliveries"
        component={DeliveryScreen}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};
