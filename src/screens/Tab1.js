import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { BookInfoScreen, HomeScreen } from './'
import Logo from '../components/Logo'
import { CustomLight, HBColor } from '../Constants'
import GoBack from '../components/useComponent/GoBack'
import backAlert from '../components/useComponent/backAlert'
const Stack = createStackNavigator()

export default () => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator initialRouteName='Home'>
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
        component={BookInfoScreen}
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
