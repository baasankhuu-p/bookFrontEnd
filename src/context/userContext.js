import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { RestApiUrl } from '../Constants'
export const UserStore = props => {
  const [isLogin, setIsLogin] = useState(null)
  const [token, setToken] = useState(null)
  const [isManageRole, setisManageRole] = useState(false)
  const [isUsersRole, setisUsersRole] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const toggleSwitch = () => setisManageRole(previousState => !previousState)
  const signin = (email, password) => {
    if (isManageRole) {
      axios
        .post(`${RestApiUrl}/api/manage/login`, {
          email: email ? email.trim() : email,
          password: password ? password.trim() : password
        })
        .then(result => {
          setisUsersRole(result.data.user.roler)
          loginUserSuccessful(result.data.token, email, password)
        })
        .catch(err => {
          loginFailed(err.message)
          console.log('Нэвтрэх явцад алдаа гарлаа.....')
        })
    } else if (!isManageRole) {
      axios
        .post(`${RestApiUrl}/api/customer/login`, {
          email: email ? email.trim() : email,
          password: password ? password.trim() : password
        })
        .then(result => {
          setisUsersRole('customer')
          loginUserSuccessful(result.data.token, email, password)
        })
        .catch(err => {
          loginFailed(err.message)
          console.log('Нэвтрэх явцад алдаа гарлаа.....')
        })
    }
  }
  const signup = (name, lname, email, phone, password, address) => {
    axios
      .post(`${RestApiUrl}/api/customer/register`, {
        fname: name.trim(),
        lname: lname.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password.trim(),
        address: address.trim()
      })
      .then(result => {
        console.log(`Амжилттай бүртгэлээ`)
        loginUserSuccessful(result.data.token, email, password)
      })
      .catch(err => {
        console.log('Бүртгэх явцад алдаа гарлаа')
        loginFailed(err.message)
      })
  }
  const loginUserSuccessful = (token, email, password) => {
    setIsLogin(true)
    setToken(token)
    setEmail(email)
    setPassword(password)
    AsyncStorage.setItem('custom_token', token)
      .then(result => {
        console.log('токенийг хадгаллаа......')
      })
      .catch(err => {
        console.log('Токен хадгалж чадсангүй.....')
        loginFailed(err.message)
      })
  }
  const loginFailed = error => {
    console.log(error)
    setIsLogin(false)
    setEmail(null)
    setPassword(null)
    setisManageRole(false)
    isUsersRole(null)
  }
  return (
    <UserContext.Provider
      value={{
        isLogin,
        setIsLogin,
        isManageRole,
        isUsersRole,
        signin,
        signup,
        toggleSwitch,
        token,
        setToken
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
const UserContext = createContext()
export default UserContext
