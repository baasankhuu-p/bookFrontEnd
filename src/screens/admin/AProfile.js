import { View, Button } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import UserContext from '../../context/userContext'
import { Text } from 'react-native'

export default () => {
  const state = useContext(UserContext)
  return (
    <View>
      <Button
        title={
          state.userInfo.roler + ' (' + state.userInfo.username + ') Гарах'
        }
        onPress={state.logout}
      />
      <Text></Text>
    </View>
  )
}
