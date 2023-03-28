import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import { CustomLight, HBColor } from '../../Constants'
export default ({ max, setOrder }) => {
  const [value, setValue] = useState(0)
  const decHandler = () => {
    if (value > 0) {
      setValue(value - 1)
    }
    setOrder(value)
  }
  const incHandler = () => {
    if (value < max) {
      setValue(value + 1)
    }
    setOrder(value)
  }
  return (
    <View style={css.container}>
      <TouchableOpacity onPress={() => decHandler()}>
        <Text style={css.dec}>-</Text>
      </TouchableOpacity>
      <Text style={css.val}>{value}</Text>
      <TouchableOpacity onPress={() => incHandler()}>
        <Text style={css.inc}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HBColor,
    borderRadius: 5
  },
  inc: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
    backgroundColor: HBColor,
    color: CustomLight
  },
  dec: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
    backgroundColor: HBColor,
    color: CustomLight
  },
  val: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderTopColor: HBColor,
    borderBottomColor: HBColor,
    fontSize: 14
  }
})
