import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Logo from "../../../components/Logo";
import Category from "../Category/Category";
import Add from "../Category/Add";
import Edit from "../Category/Edit";
import { TouchableOpacity } from "react-native";
import GoBack from "../../../components/useComponent/GoBack";
import { BackAlert } from "../../../components/useComponent/Alert";
import { useNavigation } from "@react-navigation/native";
export default () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Category">
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="EditCategory"
        component={Edit}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="addCategory"
        component={Add}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: "center",
          headerLeft: false,
        }}
      />
    </Stack.Navigator>
  );
};
