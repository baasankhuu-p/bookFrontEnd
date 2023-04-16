import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { RestApiUrl } from "../Constants";
export const UserStore = (props) => {
  //Systemd ymar negen hereglegch nevtersen eshiig shalgah boolean
  const [isLogin, setIsLogin] = useState(false);
  //Hereglegchiig tanih medeelluud
  const [token, setToken] = useState(null);
  const [isManageRole, setisManageRole] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  //Context acaallah uyd reload haruulah zorilgotoi boolean oruulj ogsn
  const [isLoading, setIsLoading] = useState(true);
  //hereglegchiin medeelliig nevterhed hadgalaad avna
  const [userInfo, setUserInfo] = useState({});
  // Overread
  const [Overread, setOverread] = useState(false);
  const [message, setMessage] = useState(null);
  const toggleSwitch = () => setisManageRole((previousState) => !previousState);

  const signin = (email, password) => {
    if (isManageRole) {
      axios
        .post(`${RestApiUrl}/api/manage/login`, {
          email: email ? email.trim() : email,
          password: password ? password.trim() : password,
        })
        .then((result) => {
          loginUserSuccessful(
            result.data.token,
            email,
            password,
            result.data.user
          );
        })
        .catch((err) => {
          loginFailed(err.response.data.message);
        });
    } else if (!isManageRole) {
      axios
        .post(`${RestApiUrl}/api/customer/login`, {
          email: email ? email.trim() : email,
          password: password ? password.trim() : password,
        })
        .then((result) => {
          console.log("Амжилттай нэвтэрлээ");
          loginUserSuccessful(
            result.data.token,
            email,
            password,
            result.data.customers
          );
        })
        .catch((err) => {
          loginFailed(err.response.data.message);
        });
    }
  };
  const signup = (name, lname, email, phone, password, address) => {
    axios
      .post(`${RestApiUrl}/api/customer/register`, {
        fname: name.trim(),
        lname: lname.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password.trim(),
        address: address.trim(),
      })
      .then((result) => {
        loginUserSuccessful(
          result.data.token,
          email,
          password,
          result.data.customers
        );
      })
      .catch((err) => {
        loginFailed(err.response.data.message);
      });
  };
  const loginUserSuccessful = async (token, email, password, userInfo) => {
    setMessage("Амжилттай нэвтэрлээ");
    setIsLogin(true);
    setToken(token);
    setEmail(email);
    setPassword(password);
    setUserInfo(userInfo);
    try {
      await AsyncStorage.setItem("user", JSON.stringify({ token, userInfo }));
      setOverread(!Overread);
    } catch (err) {
      loginFailed(err.response.data.message);
    }
  };
  const loginFailed = (error) => {
    setMessage(error);
    setIsLogin(false);
    setEmail(null);
    setPassword(null);
    setisManageRole(false);
    setUserInfo({});
  };
  const logout = async () => {
    setMessage("Системээс гарлаа");
    await AsyncStorage.removeItem("user");
    setIsLogin(false);
    setToken(null);
    setEmail(null);
    setPassword(null);
    setisManageRole(false);
    setUserInfo({});
  };
  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        email,
        setEmail,
        password,
        setPassword,
        isLogin,
        setIsLogin,
        isManageRole,
        setisManageRole,
        signin,
        signup,
        logout,
        toggleSwitch,
        userInfo,
        setUserInfo,
        isLoading,
        setIsLoading,
        Overread,
        setOverread,
        message,
        setMessage,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
const UserContext = createContext();
export default UserContext;
