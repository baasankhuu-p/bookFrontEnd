import React from 'react'
import { Text, Image, StyleSheet } from 'react-native'
import { CustomBlue, CustomBrown, BackgroundColor } from '../Constants'
import { MyTextInput } from '../components'
import MyToachableBtn from '../components/MyToachableBtn'
import { ScrollView } from 'react-native'

export default ({ navigation }) => {
  return (
    <ScrollView style={css.container}>
      <Image
        style={css.image}
        source={require('../assets/image/png/Signin.png')}
      />
      <Text style={css.heading}>
        " Онлайн номын дэлгүүрт тавтай морилно уу. "
      </Text>
      <MyTextInput
        autoCapitalize='none'
        placeholder='Имейл хаягаа оруулна уу'
        style={css.input}
      />
      <MyTextInput
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder='Нууц үгээ оруулна уу'
        style={css.input}
      />
      <MyToachableBtn title='НЭВТРЭХ' style={[css.button, css.loginButton]} />
      <MyToachableBtn
        title='БҮРТГҮҮЛЭХ'
        style={[css.button, css.registerButton]}
        onPress={() => {
          navigation.navigate('Signup')
        }}
      />
    </ScrollView>
  )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 4
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    width: '90%',
    resizeMode: 'cover',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10
  },
  heading: {
    textAlign: 'center',
    marginHorizontal: 35,
    borderBottomColor: BackgroundColor,
    fontSize: 18,
    fontWeight: 'bold',
    color: BackgroundColor
  },
  input: {
    marginVertical: 20
  },
  button: {
    marginVertical: 10
  },
  registerButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: CustomBrown,
    fontSize: 11,
    textDecorationLine: 'underline'
  },
  loginButton: {
    backgroundColor: CustomBlue
  }
})
