import React, { useContext, useState } from "react";
import UserContext from "../../context/userContext";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CustomBlue, CustomLight, HBColor, OCustomGray } from "../../Constants";
import MyTextInput from "../../components/MyTextInput";
import MyTouchableBtn from "../../components/MyToachableBtn";
import { updateOperator } from "../../service/admin/useOperator";
export default () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [username, setUsername] = useState(state.userInfo.username);
  const [email, setEmail] = useState(state.userInfo.email);
  const [phone, setPhone] = useState(`${state.userInfo.phone}`);
  const saveHandler = () => {
    const data = {
      username: username.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };
    updateOperator(state.token, data, state.userInfo._id)
      .then((result) => {
        state.setMessage("Амжилттай хадгаллаа");
        state.logout();
      })
      .catch((err) => {
        state.setMessage(err.response.data.message);
      });
  };
  const cancelHandler = () => {
    setUsername(null);
    setEmail(null);
    setPhone(null);
    navigation.goBack();
  };
  return (
    <>
      {state.userInfo && state.userInfo.CreatedDate && (
        <ScrollView style={css.container}>
          <View style={css.profile}>
            <Image
              style={css.image}
              source={require("../../assets/image/png/admin.png")}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <MyTextInput
              onChangeText={setUsername}
              value={username}
              autoCapitalize="none"
              iconname="person-outline"
              placeholder="Нэрээ оруулна уу"
            />
            <MyTextInput
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
              iconname="md-mail-open-outline"
              placeholder="имейл хаягаа оруулна уу"
            />
            <MyTextInput
              onChangeText={setPhone}
              value={phone}
              iconname="call-outline"
              keyboardType="numeric"
              placeholder="Дугаараа оруулна уу"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <MyTouchableBtn
              iconname="save-outline"
              btncss={{ backgroundColor: CustomBlue }}
              title="Хадгалах"
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
      )}
    </>
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
  username: {},
});
