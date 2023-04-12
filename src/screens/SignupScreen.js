import React, { useContext, useState } from 'react'
import { Text, Image, StyleSheet, ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  CustomBlue,
  CustomBrown,
  HBColor,
  BackgroundBlueColor
} from '../Constants'
import { MyTextInput } from '../components'
import MyToachableBtn from '../components/MyToachableBtn'
import UserContext from '../context/userContext'
export default () => {
  const navigation = useNavigation()
  const [lastName, setLastname] = useState('testLastName')
  const [firstName, setFirstname] = useState('testName')
  const [email, setEmail] = useState('test@gmail.com')
  const [phone, setPhone] = useState('95959595')
  const [password, setPassword] = useState('12345678')
  const [confirmPass, setConfirmPass] = useState('12345678')
  const [address, setAddress] = useState('test address test')
  const state = useContext(UserContext)
  const onHandlerSignup = () => {
    if (
      lastName.trim() == '' ||
      firstName == '' ||
      email == '' ||
      phone == '' ||
      password == '' ||
      confirmPass == '' ||
      address == ''
    ) {
      console.log('Мэдээллээ бүрэн бөглөнө үү ⚠')
    } else if (password != confirmPass) {
      console.log('Нууц үг хоорондоо таарахгүй байна 🔐')
    }
    state.signup(firstName, lastName, email, phone, password, address)
  }
  return (
    <ScrollView style={css.container}>
      <Image
        style={css.image}
        source={require('../assets/image/png/Signup.png')}
      />
      <Text style={css.heading}>Онлайн номын дэлгүүрт тавтай морилно уу.</Text>
      <MyTextInput
        onChangeText={setLastname}
        autoCapitalize='none'
        placeholder='Эцгийн нэрээ оруулна уу'
        style={css.input}
        value={lastName}
      />
      <MyTextInput
        onChangeText={setFirstname}
        autoCapitalize='none'
        placeholder='Нэрээ оруулна уу'
        style={css.input}
        value={firstName}
      />
      <MyTextInput
        onChangeText={setEmail}
        autoCapitalize='none'
        keyboardType='email-address'
        placeholder='Имейл хаягаа оруулна уу'
        style={css.input}
        value={email}
      />
      <MyTextInput
        onChangeText={setPhone}
        autoCapitalize='none'
        keyboardType='phone-pad'
        placeholder='Утасны дугаараа оруулна уу'
        style={css.input}
        value={phone}
      />
      <MyTextInput
        onChangeText={setPassword}
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder='Нууц үгээ оруулна уу'
        style={css.input}
        value={password}
      />
      <MyTextInput
        onChangeText={setConfirmPass}
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder='Дахин нууц үгээ оруулна уу'
        style={css.input}
        value={confirmPass}
      />
      <MyTextInput
        onChangeText={setAddress}
        autoCapitalize='none'
        placeholder='Гэрийн хаягаа оруулна уу'
        style={css.input}
        value={address}
      />
      <MyToachableBtn
        title='Бүртгүүлэх'
        style={[css.button, css.registerButton]}
        onPress={onHandlerSignup}
      />
      <MyToachableBtn
        title='Нэвтрэх'
        style={[css.button, css.loginButton]}
        onPress={() => {
          navigation.navigate('Signin')
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
    borderBottomColor: BackgroundBlueColor,
    fontSize: 18,
    fontWeight: 'bold',
    color: HBColor
  },
  input: {
    marginVertical: 20
  },
  registerButton: {
    backgroundColor: CustomBlue
  },
  loginButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: CustomBrown,
    fontSize: 11,
    textDecorationLine: 'underline'
  }
})
