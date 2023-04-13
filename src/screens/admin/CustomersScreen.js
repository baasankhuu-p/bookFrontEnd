import { View, Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import UserContext from '../../context/userContext'
import useCustomers from '../../service/admin/useCustomers'

export default () => {
  const state = useContext(UserContext)
  const [resData, pagenation, errorMessage, loading] = useCustomers()
  return (
    <ScrollView>
      <Text>Total: {pagenation.total}</Text>
      {resData.map((el, index) => (
        <View key={index}>
          <Text>{el._id}</Text>
          <Text>{el.address}</Text>
          <Text>{el.email}</Text>
          <Text>{el.fname}</Text>
          <Text>{el.lname}</Text>
          <Text>{el.phone}</Text>
          <Text></Text>
        </View>
      ))}
    </ScrollView>
  )
}
