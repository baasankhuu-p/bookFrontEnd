import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../../components/Logo";
import Book from "../Book/Book";
import Edit from "../Book/Edit";
import Add from "../Book/Add";
import GoBack from "../../../components/useComponent/GoBack";
import { BackAlert } from "../../../components/useComponent/Alert";
export default () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="getbook">
      <Stack.Screen
        name="getbook"
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
          headerTitle: () => <Logo />,
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => BackAlert(navigation)}>
              <GoBack />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
