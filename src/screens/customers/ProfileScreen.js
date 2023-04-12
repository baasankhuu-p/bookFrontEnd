import React, { useContext } from 'react'
import UserContext from '../../context/userContext'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native'
export default () => {
  const state = useContext(UserContext)
  return (
    <ScrollView style={css.container}>
      <Button onPress={state.logout} title='Гарах' />
      <Text>
        {state.userInfo.lname} {state.userInfo.fname}
      </Text>
      <Text>{state.userInfo.address}</Text>
      <Text>{state.userInfo.email}</Text>
      <Text>{state.userInfo.phone}</Text>
      <Text>{state.userInfo.CreatedDate}</Text>
    </ScrollView>
  )
}
const css = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  image: { height: 100, backgroundColor: 'red' }
})
