import React, { useContext, useState } from "react";
import UserContext from "../../context/userContext";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { updateCustomer } from "../../service/admin/useCustomer";
import { CustomBlue, CustomLight, HBColor, OCustomGray } from "../../Constants";
import MyTextInput from "../../components/MyTextInput";
import MyTouchableBtn from "../../components/MyToachableBtn";
export default () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [lname, setLname] = useState(state.userInfo.lname);
  const [fname, setFname] = useState(state.userInfo.fname);
  const [address, setAddress] = useState(state.userInfo.address);
  const [email, setEmail] = useState(state.userInfo.email);
  const [phone, setPhone] = useState(`${state.userInfo.phone}`);
  const saveHandler = () => {
    const data = {
      fname,
      lname,
      email,
      phone,
      address,
    };
    updateCustomer(state.token, data)
      .then((result) => {
        state.setMessage("Амжилттай хадгаллаа");
        setTimeout(() => {
          state.logout();
        }, 2000);
      })
      .catch((err) => {
        state.setMessage(err.response.data.message);
      });
  };
  const cancelHandler = () => {
    setFname(null);
    setAddress(null);
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
              source={require("../../assets/image/png/user.png")}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <MyTextInput
              onChangeText={setLname}
              value={lname}
              autoCapitalize="none"
              iconname="person-outline"
              placeholder={"Овог нэрээ оруулна уу"}
            />
            <MyTextInput
              onChangeText={setFname}
              value={fname}
              autoCapitalize="none"
              iconname="person-outline"
              placeholder="Нэрээ оруулна уу"
            />

            <MyTextInput
              onChangeText={setAddress}
              value={address}
              autoCapitalize="none"
              iconname="location-outline"
              placeholder="Хаягаа оруулна уу"
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
