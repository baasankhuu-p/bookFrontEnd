import React, { useContext, useState } from "react";
import UserContext from "../../context/userContext";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  ToastAndroid,
  Text,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  CustomBlue,
  CustomLight,
  HBColor,
  BackgroundBlueColor,
  OCustomGray,
} from "../../Constants";
import MyTextInput from "../../components/MyTextInput";
import MyTouchableBtn from "../../components/MyToachableBtn";
import { updateCustomers } from "../../service/admin/useCustomer";
export default ({ route }) => {
  const state = useContext(UserContext);
  const data = route.params.data;

  const navigation = useNavigation();
  const [lname, setLname] = useState(data.lname);
  const [fname, setFname] = useState(data.fname);
  const [email, setEmail] = useState(data.email);
  const [address, setAddress] = useState(data.address);
  const [phone, setPhone] = useState(`${data.phone}`);

  const saveHandler = () => {
    const item = {
      lname: lname,
      fname: fname,
      email: email,
      address: address,
      phone: phone,
    };
    updateCustomers(state.token, item, data._id)
      .then((result) => {
        ToastAndroid.show("Амжилттай хадгаллаа ", ToastAndroid.SHORT);
        state.setOverread(!state.Overread);
        navigation.goBack();
      })
      .catch((err) => {
        state.setMessage(err.response.data.message);
        ToastAndroid.show(
          "Өөрчлөх явцад алдаа гарлаа: " + err.response.data.message,
          ToastAndroid.SHORT
        );
      });
  };
  const cancelHandler = () => {
    setLname(null);
    setFname(null);
    setPhone(null);
    setEmail(null);
    setAddress(null);

    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BackgroundBlueColor }}>
      <StatusBar backgroundColor={HBColor} />
      {data && data.CreatedDate && (
        <ScrollView style={css.container}>
          <View style={css.profile}>
            <Image
              style={css.image}
              source={require("../../assets/image/png/adduser.png")}
            />
            <Text style={css.username}>Үйлчлүүлэгчид</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <MyTextInput
              onChangeText={setLname}
              value={lname}
              autoCapitalize="none"
              iconname="person-outline"
              placeholder="Овог оруулна уу"
            />
            <MyTextInput
              onChangeText={setFname}
              value={fname}
              autoCapitalize="none"
              iconname="person-outline"
              placeholder="Нэрээ оруулна уу"
            />
            <MyTextInput
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
              iconname="md-mail-open-outline"
              placeholder="И-мейл хаяг"
            />
            <MyTextInput
              onChangeText={setPhone}
              value={phone}
              iconname="call-outline"
              keyboardType="numeric"
              placeholder="Холбоо барих дугаараа"
            />
            <MyTextInput
              onChangeText={setAddress}
              autoCapitalize="none"
              placeholder="Гэрийн хаяг"
              value={address}
              iconname="location-outline"
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
    </SafeAreaView>
  );
};
const css = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: OCustomGray,
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
    textTransform: "capitalize",
  },
});
