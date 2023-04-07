import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Logo from '../components/Logo'
import { HBColor } from '../Constants'
import { SigninScreen, SignupScreen } from './'
import GoBack from '../components/useComponent/GoBack'
const Stack = createStackNavigator()

export default ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Signin'
        component={SigninScreen}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <GoBack />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: HBColor }
        }}
      />
      <Stack.Screen
        name='Signup'
        component={SignupScreen}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <GoBack />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: HBColor }
        }}
      />
    </Stack.Navigator>
  )
}
