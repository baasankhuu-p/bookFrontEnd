import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Logo from "../../../components/Logo";
import BookScreen from "../../BookScreen";
export default () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Books">
      <Stack.Screen
        name="Books"
        component={BookScreen}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};
