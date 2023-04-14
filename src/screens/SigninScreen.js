import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import {
  CustomBlue,
  CustomBrown,
  HBColor,
  BackgroundBlueColor,
  CustomLight,
} from "../Constants";
import { MyTextInput } from "../components";
import MyToachableBtn from "../components/MyToachableBtn";
import UserContext from "../context/userContext";
import { Toast } from "react-native-toast-message/lib/src/Toast";
export default ({ navigation }) => {
  const state = useContext(UserContext);
  const [email, setEmail] = useState("baasankhuu@gmail.com");
  const [password, setPassword] = useState("12345678");
  const onHandlerSignin = () => {
    if (email == "" || password == "") {
      console.log("Мэдээллээ бүрэн бөглөнө үү ⚠");
    }
    state.signin(email, password);
  };

  return (
    <ScrollView style={css.container}>
      <Image
        style={css.image}
        source={require("../assets/image/png/Signin.png")}
      />
      <View style={{ margin: 4 }}>
        <Text style={css.heading}>
          Онлайн номын дэлгүүрт тавтай морилно уу.
        </Text>
        <View style={css.switch}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={state.isManageRole ? CustomLight : HBColor}
            onValueChange={state.toggleSwitch}
            value={state.isManageRole}
          />
          <Text style={css.manage}>Удирдлагын эрх</Text>
        </View>
        <MyTextInput
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          placeholder="Имейл хаягаа оруулна уу"
          iconname="person-outline"
        />
        <MyTextInput
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="Нууц үгээ оруулна уу"
          value={password}
          iconname="build-outline"
        />
        <MyToachableBtn
          title="НЭВТРЭХ"
          style={[css.button, css.loginButton]}
          onPress={onHandlerSignin}
        />
        <MyToachableBtn
          title="БҮРТГҮҮЛЭХ"
          style={[css.button, css.registerButton]}
          onPress={() => {
            navigation.navigate("Signup");
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
  button: {
    marginVertical: 10,
  },
  registerButton: {
    backgroundColor: "rgba(0,0,0,0)",
    color: CustomBrown,
    fontSize: 11,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: CustomBlue,
  },
  switch: {
    marginHorizontal: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  manage: {
    backgroundColor: "rgba(0,0,0,0)",
    color: HBColor,
    fontSize: 13,
    fontWeight: "bold",
  },
});
