import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import GoBack from "../components/useComponent/GoBack";
import Logo from "../components/Logo";
import ProfileScreen from "./customers/ProfileScreen";
import SigninScreen from "./SigninScreen";
import SignupScreen from "./SignupScreen";
import { HBColor } from "../Constants";
import UserContext from "../context/userContext";
import SplashScreen from "./SplashScreen";
import InformationEdit from "./customers/InformationEdit";

const Stack = createStackNavigator();

export default ({ navigation }) => {
  const state = useContext(UserContext);
  return (
    <>
      <SplashScreen />
      <Stack.Navigator initialRouteName="Signin">
        {state.isLogin ? (
          <>
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="InformationEdit"
              component={InformationEdit}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Signin"
              component={SigninScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};
