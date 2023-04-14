import React, { useContext, useState } from "react";
import { Text, Image, StyleSheet, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  CustomBlue,
  CustomBrown,
  HBColor,
  BackgroundBlueColor,
} from "../Constants";
import { MyTextInput } from "../components";
import MyToachableBtn from "../components/MyToachableBtn";
import UserContext from "../context/userContext";
export default () => {
  const navigation = useNavigation();
  const [lastName, setLastname] = useState("testLastName");
  const [firstName, setFirstname] = useState("testName");
  const [email, setEmail] = useState("test@gmail.com");
  const [phone, setPhone] = useState("95959595");
  const [password, setPassword] = useState("12345678");
  const [confirmPass, setConfirmPass] = useState("12345678");
  const [address, setAddress] = useState("test address test");
  const state = useContext(UserContext);
  const onHandlerSignup = () => {
    if (
      lastName.trim() == "" ||
      firstName == "" ||
      email == "" ||
      phone == "" ||
      password == "" ||
      confirmPass == "" ||
      address == ""
    ) {
      console.log("Мэдээллээ бүрэн бөглөнө үү ⚠");
    } else if (password != confirmPass) {
      console.log("Нууц үг хоорондоо таарахгүй байна 🔐");
    }
    state.signup(firstName, lastName, email, phone, password, address);
  };
  return (
    <ScrollView style={css.container}>
      <Image
        style={css.image}
        source={require("../assets/image/png/Signup.png")}
      />
      <View style={{ margin: 4 }}>
        <Text style={css.heading}>
          Онлайн номын дэлгүүрт тавтай морилно уу.
        </Text>
        <MyTextInput
          onChangeText={setLastname}
          autoCapitalize="none"
          placeholder="Эцгийн нэрээ оруулна уу"
          value={lastName}
          iconname="person-outline"
        />
        <MyTextInput
          onChangeText={setFirstname}
          autoCapitalize="none"
          placeholder="Нэрээ оруулна уу"
          value={firstName}
          iconname="person-outline"
        />
        <MyTextInput
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Имейл хаягаа оруулна уу"
          value={email}
          iconname="md-mail-open-outline"
        />
        <MyTextInput
          onChangeText={setPhone}
          autoCapitalize="none"
          keyboardType="phone-pad"
          placeholder="Утасны дугаараа оруулна уу"
          value={phone}
          iconname="call-outline"
        />
        <MyTextInput
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="Нууц үгээ оруулна уу"
          value={password}
          iconname="build-outline"
        />
        <MyTextInput
          onChangeText={setConfirmPass}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="Дахин нууц үгээ оруулна уу"
          value={confirmPass}
          iconname="build-outline"
        />
        <MyTextInput
          onChangeText={setAddress}
          autoCapitalize="none"
          placeholder="Гэрийн хаягаа оруулна уу"
          value={address}
          iconname="location-outline"
        />
        <MyToachableBtn
          title="Бүртгүүлэх"
          style={[css.button, css.registerButton]}
          onPress={onHandlerSignup}
        />
        <MyToachableBtn
          title="Нэвтрэх"
          style={[css.button, css.loginButton]}
          onPress={() => {
            navigation.navigate("Signin");
          }}
        />
      </View>
    </ScrollView>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
    backgroundColor: BackgroundBlueColor,
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    height: 180,
    width: "100%",
    resizeMode: "cover",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  heading: {
    textAlign: "center",
    marginHorizontal: 35,
    borderBottomColor: BackgroundBlueColor,
    fontSize: 18,
    fontWeight: "bold",
    color: HBColor,
  },
  registerButton: {
    backgroundColor: CustomBlue,
  },
  loginButton: {
    backgroundColor: "rgba(0,0,0,0)",
    color: CustomBrown,
    fontSize: 11,
    textDecorationLine: "underline",
  },
});
