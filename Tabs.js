import React, { useContext } from 'react'
import { View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import AProfile from './src/screens/admin/AProfile'
import OperatorScreen from './src/screens/admin/OperatorsScreen'
import CustomersScreen from './src/screens/admin/CustomersScreen'
import Tab1 from './src/screens/Tab1'
import Tab2 from './src/screens/Tab2'
import Tab3 from './src/screens/Tab3'
import Tab4 from './src/screens/Tab4'
import Tab5 from './src/screens/Tab5'
import { HBColor } from './src/Constants'
import { IconName } from './src/utils/functions'
import UserContext from './src/context/userContext'
import SplashScreen from './src/screens/SplashScreen'
import Logo from './src/components/Logo'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
const Tab = createBottomTabNavigator()
export default ({ ref }) => {
  const state = useContext(UserContext)
  switch (state.userInfo.roler) {
    case 'admin':
      return (<><NavigationContainer><SplashScreen />
        {/* {state} */}
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: HBColor,
            tabBarInactiveTintColor: HBColor,
            headerTitle: () => (
              <>
                <Logo />
              </>
            ),
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: HBColor },
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name={IconName(route.name, focused)}
                  size={size}
                  color={color}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                />
              )
            }
          })}
        >
          <Tab.Screen name='Оператор' component={OperatorScreen} />
          <Tab.Screen name='Үйлчлүүлэгчид' component={CustomersScreen} />
          <Tab.Screen name='Профайл' component={AProfile} />
        </Tab.Navigator>
      </NavigationContainer>
        <Toast ref={ref} /></>)
    case 'operator':
      return (<View><SplashScreen />
        <Button
          title={state.userInfo.roler + state.userInfo.username + ' Гарах'}
          onPress={state.logout}
        />
      </View>);
    default: return (
      <>
        <NavigationContainer><SplashScreen />
          {/* {state} */}
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: HBColor,
              tabBarInactiveTintColor: HBColor,
              headerTitle: null,
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                return (
                  <Ionicons
                    name={IconName(route.name, focused)}
                    size={size}
                    color={color}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />
                )
              }
            })}
          >
            <Tab.Screen name='Нүүр' component={Tab1} />
            <Tab.Screen name='Ном' component={Tab2} />
            <Tab.Screen name='Захиалга' component={Tab3} />
            <Tab.Screen name='Хүргэлт' component={Tab4} />
            <Tab.Screen name='Профайл' component={Tab5} />
          </Tab.Navigator>
        </NavigationContainer>
        <Toast ref={ref} />
      </>
    )
  }
}