import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CustomBlue, CustomLight, HBColor, OCustomGray } from "../../Constants";
import MyTextInput from "../../components/MyTextInput";
import MyTouchableBtn from "../../components/MyToachableBtn";
import { createCustomer } from "../../service/admin/useCustomer";
export default ({}) => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [lname, setLname] = useState(null);
  const [fname, setFname] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [password, setPassword] = useState(null);

  const saveHandler = () => {
    const body = {
      lname: lname,
      fname: fname,
      email: email,
      phone: phone,
      password: password,
      address: address,
    };
    //...
    createCustomer(state.token, body)
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
    setLname(null);
    setFname(null);
    setEmail(null);
    setPhone(null);
    setPassword(null);
    setAddress(null);
    navigation.goBack();
  };
  return (
    <ScrollView style={css.container}>
      <View style={css.profile}>
        <Image
          style={css.image}
          source={require("../../assets/image/png/adduser.png")}
        />
        <Text style={css.username}>Үйлчлүүлэгч бүртгэх</Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <MyTextInput
          onChangeText={setLname}
          autoCapitalize="none"
          placeholder="Эцгийн нэрээ оруулна уу"
          value={lname}
          iconname="person-outline"
        />
        <MyTextInput
          onChangeText={setFname}
          autoCapitalize="none"
          placeholder="Нэрээ оруулна уу"
          value={fname}
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
          onChangeText={setAddress}
          autoCapitalize="none"
          placeholder="Гэрийн хаягаа оруулна уу"
          value={address}
          iconname="location-outline"
        />
        <MyTextInput
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="Нууц үгээ оруулна уу"
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
