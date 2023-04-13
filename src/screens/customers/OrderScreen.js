import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Orders from "../customers/Orders";
import ConfirmOrder from "../customers/ConfirmOrder";
import UserContext from "../../context/userContext";
import { NotSignIn } from "../../components/useComponent/notfound";
const Tab = createMaterialTopTabNavigator();

export default () => {
  const state = useContext(UserContext)
  return (
    <>{state.isLogin ?
      (<Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 9
          },
        }}>
        <Tab.Screen
          name="ConfirmOrder"
          component={ConfirmOrder}
          options={{
            tabBarLabel: 'Баталгаажсан',
          }} />
        <Tab.Screen
          name="NotConfirmOrder"
          component={Orders}
          options={{
            tabBarLabel: 'Баталгаажаагүй',
          }} />

      </Tab.Navigator >) : (<NotSignIn />)}
    </>
  );
};
