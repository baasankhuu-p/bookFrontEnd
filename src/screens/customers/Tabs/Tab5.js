import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ToastAndroid } from "react-native";
import ProfileScreen from "../ProfileScreen";
import SigninScreen from "../../SigninScreen";
import SignupScreen from "../../SignupScreen";
import UserContext from "../../../context/userContext";
import SplashScreen from "../../SplashScreen";
import InformationEdit from "../InformationEdit";

const Stack = createStackNavigator();

export default () => {
  const state = useContext(UserContext);
  if (state.message !== null) {
    ToastAndroid.show(state.message, ToastAndroid.SHORT);
    state.setMessage(null);
  }
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
