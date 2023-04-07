import React, { useState, useContext } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Switch } from 'react-native'
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
import UserContext from '../context/userContext'
export default ({ navigation }) => {
  const state = useContext(UserContext)
  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('1234')
  const onHandlerSignin = () => {
    if (email == '' || password == '') {
      console.log('Мэдээллээ бүрэн бөглөнө үү ⚠....')
    }
    state.signin(email, password)
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
          thumbColor={state.isManageRole ? CustomLight : HBColor}
          onValueChange={state.toggleSwitch}
          value={state.isManageRole}
        />
        <Text style={css.manage}>Удирдлагын эрх</Text>
      </View>
      <MyTextInput
        onChangeText={setEmail}
        value={email}
        autoCapitalize='none'
        placeholder='Имейл хаягаа оруулна уу'
        style={css.input}
      />
      <MyTextInput
        onChangeText={setPassword}
        value={password}
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
