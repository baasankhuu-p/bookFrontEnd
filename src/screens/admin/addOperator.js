import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { ScrollView, StyleSheet, View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CustomBlue, CustomLight, HBColor, OCustomGray } from "../../Constants";
import MyTextInput from "../../components/MyTextInput";
import MyTouchableBtn from "../../components/MyToachableBtn";
import { createOperator } from "../../service/admin/useOperator";
import { ToastAndroid } from "react-native";
export default ({}) => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);

  const saveHandler = () => {
    const body = {
      username: username.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password: password.trim(),
      roler: "operator",
    };
    //...
    createOperator(state.token, body)
      .then((result) => {
        ToastAndroid.show("Амжилттай бүртгэлээ", ToastAndroid.SHORT);
        state.setOverread(!state.Overread);
        cancelHandler();
      })
      .catch((err) => {
        ToastAndroid.show(
          `Алдаа гарлаа: ${err.response.data.message}`,
          ToastAndroid.SHORT
        );
      });
  };
  const cancelHandler = () => {
    setUsername(null);
    setEmail(null);
    setPhone(null);
    setPassword(null);
    navigation.goBack();
  };
  return (
    <ScrollView style={css.container}>
      <View style={css.profile}>
        <Image
          style={css.image}
          source={require("../../assets/image/png/adduser.png")}
        />
        <Text style={css.username}>Ажилтан бүртгэх</Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <MyTextInput
          onChangeText={setUsername}
          value={username}
          autoCapitalize="none"
          iconname="person-outline"
          placeholder="Ажилтны нэр"
        />
        <MyTextInput
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          iconname="md-mail-open-outline"
          placeholder="Ажилтны е-мейл"
        />
        <MyTextInput
          onChangeText={setPhone}
          value={phone}
          iconname="call-outline"
          keyboardType="numeric"
          placeholder="Ажилтны холбоо барих дугаар"
        />
        <MyTextInput
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="Нэвтрэх нууц үг"
          value={password}
          iconname="build-outline"
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <MyTouchableBtn
          iconname="add-circle-outline"
          btncss={{ backgroundColor: CustomBlue }}
          title="Нэмэх"
          onPress={saveHandler}
        />
        <MyTouchableBtn
          iconname="arrow-back-circle"
          btncss={{ backgroundColor: "orange" }}
          title="Буцах"
          onPress={cancelHandler}
        />
      </View>
    </ScrollView>
  );
};
const css = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: OCustomGray,
    marginTop: 20,
  },
  profile: {
    flex: 1,
    height: 160,
    backgroundColor: CustomLight,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
    paddingVertical: 20,
  },
  image: {
    borderWidth: 2,
    borderColor: HBColor,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontWeight: "500",
    color: HBColor,
    fontSize: 15,
  },
});
