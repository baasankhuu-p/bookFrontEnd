import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { OCustomGray } from '../Constants'

export default props => {
  return <TextInput {...props} style={styles.textInput} />
}

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: OCustomGray,
    borderBottomWidth: 2,
    marginHorizontal: 40,
    marginVertical: 12,
    padding: 4
  }
})
