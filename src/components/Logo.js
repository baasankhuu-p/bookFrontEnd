import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'

export default () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onPress={() => {
        navigation.navigate('Home', {})
      }}
    >
      <Image
        source={require('./../assets/image/png/logo.png')}
        style={{ width: 120, height: 40 }}
      />
    </TouchableOpacity>
  )
}
const css = StyleSheet.create({
  logo: {}
})
