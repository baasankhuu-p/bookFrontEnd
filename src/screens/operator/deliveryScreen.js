import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UserContext from "../../context/userContext";
import ConfirmDelivery from "./Delivery/deliveries";
import NotDelivery from "./Delivery/notDelivery";
import { NotSignIn } from "../../components/useComponent/notfound";
const Tab = createMaterialTopTabNavigator();

export default () => {
  const state = useContext(UserContext);
  return (
    <>
      {state.isLogin ? (
        <Tab.Navigator
          initialRouteName="ConfirmDelivery"
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 9,
            },
          }}
        >
          <Tab.Screen
            name="ConfirmDelivery"
            component={ConfirmDelivery}
            options={{
              tabBarLabel: "Хүргэгдсэн",
            }}
          />
          <Tab.Screen
            name="NotConfirmDelivery"
            component={NotDelivery}
            options={{
              tabBarLabel: "Хүргэгдээгүй",
            }}
          />
        </Tab.Navigator>
      ) : (
        <NotSignIn />
      )}
    </>
  );
};
