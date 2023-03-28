import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './HomeScreen'
import Logo from '../components/Logo'
import { CustomLight, HBColor } from '../Constants'
import BookIScreen from './BookIScreen'
import { TouchableOpacity } from 'react-native'
import GoBack from '../components/iconComponent/GoBack'
const Stack = createStackNavigator()

export default ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: HBColor }
        }}
      />
      <Stack.Screen
        name='Book'
        component={BookIScreen}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <GoBack />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: HBColor },
          headerBackTitleStyle: { color: CustomLight }
        }}
      />
    </Stack.Navigator>
  )
}
