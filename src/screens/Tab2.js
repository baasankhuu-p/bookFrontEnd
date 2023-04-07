import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Logo from '../components/Logo'
import { HBColor } from '../Constants'
import { BookScreen } from './'
export default ({ navigation }) => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Books'
        component={BookScreen}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: HBColor }
        }}
      />
    </Stack.Navigator>
  )
}
