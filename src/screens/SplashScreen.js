import { View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Spinner from '../components/useComponent/Spinner'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserContext from '../context/userContext'
const SplashScreen = () => {
  const state = useContext(UserContext)
  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(data => {
        if (data !== null) {
          const user = JSON.parse(data)
          state.setToken(user.token)
          state.setEmail(user.userInfo.email)
          state.setIsLogin(true)
          state.setisManageRole(true)
          state.setUserInfo(user.userInfo)
        }
        state.setIsLoading(false)
      })
      .catch(err => console.log(err))
  }, [])
  if (state.isLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Spinner />
      </View>
    )
}

export default SplashScreen
