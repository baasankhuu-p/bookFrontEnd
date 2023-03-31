import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Logo from '../components/Logo'
import { HBColor } from '../Constants'
import OrderScreen from './OrderScreen'
export default ({ navigation }) => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Orders'
        component={OrderScreen}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: HBColor }
        }}
      />
    </Stack.Navigator>
  )
}
