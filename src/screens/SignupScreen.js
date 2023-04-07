import React, { useState } from 'react'
import { Text, Image, StyleSheet, ScrollView, View } from 'react-native'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
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
export default () => {
  const navigation = useNavigation()
  const [lastName, setLastname] = useState('')
  const [firstName, setFirstname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState(0)
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [address, setAddress] = useState('')

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
    axios
      .post(`${RestApiUrl}/api/customer/register`, {
        fname: firstName.trim(),
        lname: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password.trim(),
        address: address.trim()
      })
      .then(result => {
        console.log(result.data)
        AsyncStorage.setItem('token', result.data.token)
          .then(result => {
            Toast.show(toastInfo('success', `токенийг хадгаллаа..`, 5000))
            navigation.navigate('Home')
          })
          .catch(err => {
            Toast.show(
              toastInfo('error', `Токен хадгалж чадсангүй. Шалтгаан..`, 5000)
            )
            console.log('Токен хадгалж чадсангүй. Шалтгаан :' + err.message)
          })
        return Toast.show(toastInfo('success', `Амжилттай бүртгэлээ`, 5000))
      })
      .catch(err => {
        return Toast.show(
          toastInfo(
            'error',
            'Бүртгэх явцад алдаа гарлаа',
            5000,
            ` ${err.response.data.message}`
          )
        )
      })
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
      />
      <MyTextInput
        onChangeText={setFirstname}
        autoCapitalize='none'
        placeholder='Нэрээ оруулна уу'
        style={css.input}
      />
      <MyTextInput
        onChangeText={setEmail}
        autoCapitalize='none'
        keyboardType='email-address'
        placeholder='Имейл хаягаа оруулна уу'
        style={css.input}
      />

      <MyTextInput
        onChangeText={setPhone}
        autoCapitalize='none'
        keyboardType='phone-pad'
        placeholder='Утасны дугаараа оруулна уу'
        style={css.input}
      />
      <MyTextInput
        onChangeText={setPassword}
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder='Нууц үгээ оруулна уу'
        style={css.input}
      />
      <MyTextInput
        onChangeText={setConfirmPass}
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder='Дахин нууц үгээ оруулна уу'
        style={css.input}
      />
      <MyTextInput
        onChangeText={setAddress}
        autoCapitalize='none'
        placeholder='Гэрийн хаягаа оруулна уу'
        style={css.input}
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
