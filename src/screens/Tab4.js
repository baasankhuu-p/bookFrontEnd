import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Logo from '../components/Logo'
import { HBColor } from '../Constants'
import { DeliveryScreen } from './'
export default ({ navigation }) => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator initialRouteName='Deliveries'>
      <Stack.Screen
        name='Deliveries'
        component={DeliveryScreen}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: HBColor }
        }}
      />
    </Stack.Navigator>
  )
}
