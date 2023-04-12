import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import UserContext from '../../context/userContext'
import useOperator from '../../service/admin/useOperator'

export default () => {
  const state = useContext(UserContext)
  let [resData, pagenation, errorMessage, loading] = useOperator()
  return (
    <View>
      <Text>
        {state.userInfo.username} == {state.userInfo.roler} =({pagenation.total}
        ш)
      </Text>
      {resData.map((el, index) => (
        <View key={index}>
          <Text>CreatedDate: {el.CreatedDate}</Text>
          <Text>_id: {el._id}</Text>
          <Text>email: {el.email}</Text>
          <Text>phone: {el.phone}</Text>
          <Text>roler: {el.roler}</Text>
          <Text>username: {el.username}</Text>
          <Text></Text>
        </View>
      ))}
    </View>
  )
}
