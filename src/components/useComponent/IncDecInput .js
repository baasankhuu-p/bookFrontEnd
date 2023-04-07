import React, { useState } from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { CustomLight, HBColor } from '../../Constants'
export default ({ order, setOrder, max }) => {
  const decHandler = () => {
    if (order > 1) {
      setOrder(order - 1)
    }
  }
  const incHandler = () => {
    if (order < max) {
      setOrder(order + 1)
    }
  }
  return (
    <View style={css.container}>
      <TouchableOpacity onPress={() => decHandler()}>
        <Text style={css.dec}>-</Text>
      </TouchableOpacity>
      <Text style={css.val}>{order}</Text>
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
    fontSize: 15,
    borderRadius: 2
  }
})
