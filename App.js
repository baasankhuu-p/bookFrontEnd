import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import { Tab1 } from './src/screens'
import { Tab2 } from './src/screens'
import { Tab3 } from './src/screens'
import { Tab4 } from './src/screens'
import { Tab5 } from './src/screens'
import {
  CustomLight,
  HBColor,
  OCustomBlue,
  OCustomLight
} from './src/Constants'
import { IconName } from './src/utils/functions'

const Tab = createBottomTabNavigator()

const App = () => {
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

export default App
