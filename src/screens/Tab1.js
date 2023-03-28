import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './HomeScreen'
import Logo from '../components/Logo'
import { CustomLight, HBColor } from '../Constants'
import BookScreen from './BookInfoScreen'
import { TouchableOpacity } from 'react-native'
import GoBack from '../components/useComponent/GoBack'
import backAlert from '../components/useComponent/backAlert'
import { useNavigation } from '@react-navigation/native'
const Stack = createStackNavigator()

export default () => {
  const navigation = useNavigation()
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
        component={BookScreen}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => backAlert(navigation)}>
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
