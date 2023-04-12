import React from 'react'
import { Text, View } from 'react-native'
import { HBColor } from '../../Constants'
import { UIActivityIndicator } from 'react-native-indicators'
const Spinner = ({ showText = true }) => {
  return (
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      <UIActivityIndicator color={HBColor} />
      {showText && (
        <Text
          style={{
            top: 10,
            fontWeight: 'bold',
            fontSize: 12,
            color: HBColor
          }}
        >
          Түр хүлээнэ үү...
        </Text>
      )}
    </View>
  )
}

export default Spinner
