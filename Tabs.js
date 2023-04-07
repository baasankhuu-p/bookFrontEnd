import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import { Tab1, Tab2, Tab3, Tab4, Tab5 } from './src/screens'
import { CustomLight, HBColor, OCustomLight } from './src/Constants'
import { IconName } from './src/utils/functions'
import UserContext from './src/context/userContext'

const Tab = createBottomTabNavigator()

export default () => {
  const state = useContext(UserContext)
  console.log(state)
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: CustomLight,
          tabBarInactiveTintColor: OCustomLight,
          headerTitle: null,
          headerShown: false,
          tabBarLabel: () => null,
          tabBarStyle: { backgroundColor: HBColor },
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome
                name={IconName(route.name)}
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
        <Tab.Screen name='Tab1' component={Tab1} />
        <Tab.Screen name='Tab2' component={Tab2} />
        <Tab.Screen name='Tab3' component={Tab3} />
        <Tab.Screen name='Tab4' component={Tab4} />
        <Tab.Screen name='Tab5' component={Tab5} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
