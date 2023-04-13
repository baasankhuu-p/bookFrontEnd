import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './HomeScreen'
import BookDetails from './BookDetails'
import Logo from '../components/Logo'
import { CustomLight, HBColor } from '../Constants'
import GoBack from '../components/useComponent/GoBack'
import { BackAlert } from '../components/useComponent/Alert'
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
        component={BookDetails}
        options={{
          headerTitle: () => <Logo />,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => BackAlert(navigation)}>
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
