import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Switch } from 'react-native'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {
  CustomBlue,
  CustomBrown,
  HBColor,
  RestApiUrl,
  BackgroundBlueColor,
  CustomLight
} from '../Constants'
import { MyTextInput } from '../components'
import MyToachableBtn from '../components/MyToachableBtn'
import toastInfo from '../components/useComponent/toastInfo'
export default ({ navigation }) => {
  //Admin,operator || Customer
  const [isRole, setIsRole] = useState(false)
  const toggleSwitch = () => setIsRole(previousState => !previousState)
  //Input variables
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  AsyncStorage.getItem('token')
    .then(result => setToken(result))
    .catch(err => console.log(err.message))
  const onHandlerSignin = () => {
    if (email == '' || password == '') {
      // Toast.show(toastInfo('error', 'Мэдээллээ бүрэн бөглөнө үү ⚠', 5000))
      console.log('Мэдээллээ бүрэн бөглөнө үү ⚠')
    }
    if (isRole) {
      axios
        .post(`${RestApiUrl}/api/manage/login`, {
          email: email.trim(),
          password: password.trim()
        })
        .then(result => {
          console.log(result.data)
          AsyncStorage.setItem('token', result.data.token)
            .then(result => {
              console.log('токенийг хадгаллаа..')
            })
            .catch(err => {
              console.log('Токен хадгалж чадсангүй.')
            })
          return console.log('Токен хадгалж чадсангүй.')
        })
        .catch(err => {
          return console.log('Нэвтрэх явцад алдаа гарлаа')
        })
    } else {
      axios
        .post(`${RestApiUrl}/api/customer/login`, {
          email: email.trim(),
          password: password.trim()
        })
        .then(result => {
          AsyncStorage.setItem('custom_token', result.data.token)
            .then(result => {
              console.log('токенийг хадгаллаа..')
            })
            .catch(err => {
              console.log('Токен хадгалж чадсангүй..')
            })
          return console.log('Амжилттай бүртгэлээ..')
        })
        .catch(err => {
          return console.log('Нэвтрэх явцад алдаа гарлаа')
        })
    }
  }
  return (
    <ScrollView style={css.container}>
      <Image
        style={css.image}
        source={require('../assets/image/png/Signin.png')}
      />
      <Text style={css.heading}>Онлайн номын дэлгүүрт тавтай морилно уу.</Text>
      <View style={css.switch}>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isRole ? CustomLight : HBColor}
          onValueChange={toggleSwitch}
          value={isRole}
        />
        <Text style={css.manage}>Удирдлагын эрх</Text>
      </View>
      <MyTextInput
        onChangeText={setEmail}
        autoCapitalize='none'
        placeholder='Имейл хаягаа оруулна уу'
        style={css.input}
      />
      <MyTextInput
        onChangeText={setPassword}
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder='Нууц үгээ оруулна уу'
        style={css.input}
      />
      <MyToachableBtn
        title='НЭВТРЭХ'
        style={[css.button, css.loginButton]}
        onPress={onHandlerSignin}
      />
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
    borderBottomColor: BackgroundBlueColor,
    fontSize: 18,
    fontWeight: 'bold',
    color: HBColor
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
  },
  switch: {
    marginHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  manage: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: HBColor,
    fontSize: 13,
    fontWeight: 'bold'
  }
})
