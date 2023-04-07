import React, { useContext, useState } from 'react'
import { Text, Image, StyleSheet, ScrollView, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import {
  CustomBlue,
  CustomBrown,
  HBColor,
  RestApiUrl,
  BackgroundBlueColor
} from '../Constants'
import { MyTextInput } from '../components'
import MyToachableBtn from '../components/MyToachableBtn'
import toastInfo from '../components/useComponent/toastInfo'
import UserContext from '../context/userContext'
export default () => {
  const navigation = useNavigation()
  const [lastName, setLastname] = useState('Purev')
  const [firstName, setFirstname] = useState('Baaskaa')
  const [email, setEmail] = useState('purevbaasankhuu@gmail.com')
  const [phone, setPhone] = useState('99455432')
  const [password, setPassword] = useState('1234')
  const [confirmPass, setConfirmPass] = useState('1234')
  const [address, setAddress] = useState('Bayangokl')
  const state = useContext(UserContext)
  const onHandlerSignup = () => {
    if (
      lastName == '' ||
      firstName == '' ||
      email == '' ||
      phone == '' ||
      password == '' ||
      confirmPass == '' ||
      address == ''
    ) {
      Toast.show(toastInfo('error', 'Мэдээллээ бүрэн бөглөнө үү ⚠', 5000))
    } else if (password != confirmPass) {
      Toast.show(
        toastInfo('error', 'Нууц үг хоорондоо таарахгүй байна 🔐', 5000)
      )
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
      <Toast ref={ref => Toast.setRef(ref)} />
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
