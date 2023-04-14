import React, { useContext, useState } from "react";
import UserContext from "../../context/userContext";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useCustomer } from "../../service/admin/useCustomer";

import { CustomLight, HBColor, OCustomGray } from "../../Constants";
import MyTextInput from "../../components/MyTextInput";
import { toastInfo } from "../../utils/functions";
export default () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [toastObj, setToastObj] = useState(null);

  const [lname, setLname] = useState(null);
  const [fname, setFname] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const saveHandler = () => {
    console.log("res");
    const data = {
      fname,
      lname,
      email,
      phone,
      address,
    };
    console.log(data);
    useCustomer(state.token, data)
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const cancelHandler = () => {
    setFname(null);
    setAddress(null);
    setEmail(null);
    setPhone(null);
    navigation.goBack();
  };
  // setToastObj({
  //   type: "error",
  //   msg: err.response.data.message,
  // });
  const toastMsgFnc = (toastObj) => {
    if (toastObj) {
      Toast.show(toastInfo(toastObj.type, toastObj.msg, 2000));
    }
    setToastObj(null);
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
              placeholder={state.userInfo.lname}
            />
            <MyTextInput
              onChangeText={setFname}
              value={fname}
              autoCapitalize="none"
              iconname="person-outline"
              placeholder={state.userInfo.fname}
            />

            <MyTextInput
              onChangeText={setAddress}
              value={address}
              autoCapitalize="none"
              iconname="location-outline"
              placeholder={state.userInfo.address}
            />
            <MyTextInput
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
              iconname="md-mail-open-outline"
              placeholder={state.userInfo.email}
            />
            <MyTextInput
              onChangeText={setPhone}
              value={phone}
              iconname="call-outline"
              keyboardType="numeric"
              placeholder={`${state.userInfo.phone}`}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={saveHandler}>
              <View style={css.information}>
                <Ionicons style={css.infoIcon} size={25} name="save-outline" />
                <Text style={css.infoText}>Хадгалах</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelHandler}>
              <View style={[css.information, css.cancel]}>
                <Ionicons style={css.infoIcon} size={25} name="save-outline" />
                <Text style={css.infoText}>Буцах</Text>
              </View>
            </TouchableOpacity>
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

  information: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 2,
    padding: 10,
    backgroundColor: HBColor,
    borderColor: OCustomGray,
    borderWidth: 2,
    borderRadius: 10,
  },
  infoIcon: {
    color: "white",
  },
  infoText: {
    marginLeft: 10,
    textTransform: "capitalize",
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  cancel: {
    backgroundColor: "orange",
  },
});
