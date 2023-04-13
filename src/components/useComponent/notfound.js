import { StyleSheet, Text, View, Image } from 'react-native'
import { BackgroundBlueColor, HBColor } from '../../Constants'
import { TouchableOpacity } from 'react-native'
export function BookSearchNotFound() {
  return (
    <View style={css.container}>
      <Text style={css.text}>Ном олдсонгүй...</Text>
    </View>
  )
}

export function CommentNull(style = '') {
  return (
    <View style={{ flex: 1, height: 100 }}>
      <Text style={{ ...style.text }}>
        {'  '}Энэ хүү номонд сэтгэгдэл байхгүй байна...
      </Text>
    </View>
  )
}
export function NotSignIn() {
  return (
    <View style={css.container}>
      <Text></Text>
      <Image
        style={css.icon}
        source={require('../../assets/image/png/signInNot.png')}
      />
      <Text style={css.text}>Та нэвтэрнэ үү</Text>
    </View >
  )
}
export function OrderNull() {
  return (
    <View style={css.container}>
      <Text></Text>
      <Image
        style={css.icon}
        source={require('../../assets/image/png/orderempty.webp')}
      />
      <Text style={css.text}>Захиалгын мэдээлэл хоосон байна</Text>
    </View>
  )
}

export function DeliveryNull() {
  return (
    <View style={css.container}>
      <Image
        style={css.icon}
        source={require('../../assets/image/png/deliveryempty.png')}
      />
      <Text style={css.text}>Хүргэлтийн мэдээлэл хоосон байна</Text>
    </View>
  )
}
const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: BackgroundBlueColor
  },
  icon: { width: 60, height: 60 },
  text: {
    fontSize: 15,
    color: HBColor,
    paddingHorizontal: 20,
    textAlign: 'center'
  }
})
