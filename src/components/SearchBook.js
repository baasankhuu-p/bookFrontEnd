import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { CustomBlue, OCustomGray } from '../Constants'

export default ({ value, onValueChange, onFinishEnter }) => {
  return (
    <View style={css.container}>
      <View style={css.iconContainer}>
        <Feather name='search' color='white' />
      </View>
      <TextInput
        style={css.input}
        laceholder='Ном хайх ..'
        value={value}
        onChangeText={onValueChange}
        placeholderTextColor={CustomBlue}
        autoCapitalize='none'
        autoCorrect={false}
        onEndEditing={onFinishEnter}
      />
    </View>
  )
}

const css = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: OCustomGray,
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: 8
  },
  iconContainer: {
    backgroundColor: CustomBlue,
    color: 'white',
    borderRadius: 20,
    padding: 6
  },
  input: {
    flex: 1,
    marginLeft: 10
  }
})