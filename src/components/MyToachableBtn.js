import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { OCustomLight } from '../Constants'

const MyTouchableBtn = ({ title, style, onPress = undefined }) => {
  return (
    <TouchableOpacity style={css.container} onPress={onPress}>
      <Text style={[css.text, ...style]}>{title}</Text>
    </TouchableOpacity>
  )
}

const css = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 4
  },
  text: {
    color: OCustomLight,
    fontSize: 15,
    padding: 10,
    textAlign: 'center',
    width: '40%',
    borderRadius: 10
  }
})
export default MyTouchableBtn
