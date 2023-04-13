import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import GoBack from '../components/useComponent/GoBack'
import Logo from '../components/Logo'
import ProfileScreen from './customers/ProfileScreen'
import SigninScreen from './SigninScreen'
import SignupScreen from './SignupScreen'
import { HBColor } from '../Constants'
import UserContext from '../context/userContext'
import SplashScreen from './SplashScreen'

const Stack = createStackNavigator()

export default ({ navigation }) => {
  const state = useContext(UserContext)
  return (
    <>
      <SplashScreen />
      <Stack.Navigator initialRouteName='Signin'>
        {state.isLogin ? (
          <Stack.Screen
            name='Profile'
            component={ProfileScreen}
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
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </>
  )
}
