import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
export default ({ route }) => {
  const book = route.params.book
  return (
    <View>
      <Text>{book.bookname}</Text>
      <Text>{book.bookname}</Text>
      <Text>{book.bookname}</Text>
      <Text>{book.bookname}</Text>
      <Text>{book.bookname}</Text>
    </View>
  )
}
const css = StyleSheet.create({})
