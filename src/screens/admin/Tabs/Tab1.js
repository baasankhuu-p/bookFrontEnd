import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Logo from "../../../components/Logo";
import OperatorsScreen from "../OperatorsScreen";
import OperatorEdit from "../OperatorEdit";
import OperatorAdd from "../addOperator";
export default () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="operators">
      <Stack.Screen
        name="operators"
        component={OperatorsScreen}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="OperatorEdit"
        component={OperatorEdit}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OperatorAdd"
        component={OperatorAdd}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
