import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { OCustomGray } from '../Constants'

export default props => {
  return <TextInput {...props} style={styles.text} />
}

const styles = StyleSheet.create({
  text: {
    borderBottomColor: OCustomGray,
    borderBottomWidth: 2,
    marginHorizontal: 40,
    marginVertical: 12,
    padding: 4
  }
})
