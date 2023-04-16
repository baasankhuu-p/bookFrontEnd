import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../context/userContext";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { CustomBlue, CustomLight, HBColor, OCustomGray } from "../../Constants";
import MyLbl from "../../components/MyLbl";
import MyTouchableBtn from "../../components/MyToachableBtn";
export default () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const logoutHandler = () => {
    Alert.alert("Анхаар", "Системээс гарахдаа итгэлтэй байна уу.", [
      {
        text: "Болих",
        onPress: () => console.log("Болих"),
      },
      {
        text: "Гарах",
        onPress: () => {
          console.log("системээс гарлаа");
          state.logout();
        },
      },
    ]);
  };
  const editInformationHandler = () => {
    navigation.navigate("EditProfile");
  };
  return (
    <>
      {state.userInfo && state.userInfo.CreatedDate && (
        <ScrollView style={css.container}>
          <View style={css.profile}>
            <TouchableOpacity
              onPress={editInformationHandler}
              style={{ position: "absolute", right: 10, top: 10 }}
            >
              <AntDesign name="edit" size={24} style={css.infoIcon} />
            </TouchableOpacity>
            <Image
              style={css.image}
              source={require("../../assets/image/png/admin.png")}
            />
            <Text style={css.username}>{state.userInfo.username}</Text>
          </View>
          <MyLbl iconname="logo-steam" text={state.userInfo.roler} />
          <MyLbl iconname="md-mail-open-outline" text={state.userInfo.email} />
          <MyLbl iconname="call-outline" text={state.userInfo.phone} />
          <MyLbl
            iconname="md-timer-outline"
            text={state.userInfo.CreatedDate.split("T")[0]}
          />
          <MyTouchableBtn
            iconname="log-out-outline"
            btncss={{ backgroundColor: CustomBlue }}
            title="Гарах"
            onPress={logoutHandler}
          />
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
    borderWidth: 1,
    borderColor: HBColor,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontWeight: "500",
    color: HBColor,
    fontSize: 18,
    textTransform: "capitalize",
  },
  infoIcon: {
    color: HBColor,
    marginTop: 10,
    marginRight: 10,
  },
});
