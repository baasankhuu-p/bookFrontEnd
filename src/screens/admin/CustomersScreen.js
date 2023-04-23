import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import UserContext from "../../context/userContext";
import {
  BackgroundBlueColor,
  CustomLight,
  HBColor,
  OCustomGray,
} from "../../Constants";
import { getTextSubst } from "../../utils/functions";
import { deleteCustomer, getCustomers } from "../../service/admin/useCustomer";

export default () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [customers, setCustomer] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getCustomers(state.token)
      .then((result) => {
        setCustomer(result.data.customer);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state.Overread]);

  const [oItem, setItem] = useState(null);
  const onHandlerItem = (data) => {
    setItem(data);
    if (oItem) {
      setVisible(true);
    }
    setItem(data);
  };

  const visibleClose = () => {
    setItem(null);
    setVisible(false);
  };

  const infoEdit = () => {
    navigation.navigate("Үйлчлүүлэгчид", {
      screen: "CustomersEdit",
      params: { data: oItem },
    });
    setItem(null);
    setVisible(false);
  };

  const removeCustomer = (item) => {
    if (item) {
      deleteCustomer(state.token, item._id)
        .then((result) => {
          ToastAndroid.show("Амжилттай устлаа", ToastAndroid.SHORT);
          state.setOverread(!state.Overread);
          visibleClose();
        })
        .catch((err) => {
          ToastAndroid.show(
            `Алдаа гарлаа: ${err.response.data.message}`,
            ToastAndroid.SHORT
          );
        });
    }
  };
  const addCustomer = () => {
    navigation.navigate("Үйлчлүүлэгчид", {
      screen: "addCustomer",
    });
  };
  return (
    <>
      {customers ? (
        <View style={{ flex: 1, backgroundColor: BackgroundBlueColor }}>
          {/* screen */}
          {oItem && (
            <Modal isVisible={visible}>
              <TouchableOpacity onPress={visibleClose}>
                <FontAwesome
                  name="remove"
                  size={25}
                  style={{
                    color: CustomLight,
                    position: "absolute",
                    left: 5,
                    bottom: 5,
                  }}
                />
              </TouchableOpacity>
              <View style={css.modalContainer}>
                <View>
                  <Text style={css.titlesmall}>Мэдээлэл</Text>

                  <View style={css.modalInnerContainer}>
                    <Text style={css.modalTxt}>
                      Үйлчлүүлэгчийн нэр:{" "}
                      <Text style={{ color: "green" }}>{oItem.fname}</Text>
                    </Text>
                  </View>

                  <View style={css.modalInnerContainer}>
                    <Text style={css.modalTxt}>
                      И-мейл хаяг:{" "}
                      <Text style={{ color: "green" }}>{oItem.email}</Text>
                    </Text>
                  </View>

                  <View style={css.modalInnerContainer}>
                    <Text style={css.modalTxt}>
                      Гэрийн хаяг:{" "}
                      <Text style={{ color: "green" }}>{oItem.address}</Text>
                    </Text>
                  </View>

                  <View style={css.modalInnerContainer}>
                    <Text style={css.modalTxt}>
                      Холбоо барих дугаар:{" "}
                      <Text style={{ color: "green" }}>{oItem.phone}</Text>
                    </Text>
                  </View>

                  <View style={css.modalInnerContainer}>
                    <Text style={css.modalTxt}>
                      Бүртгүүлсэн огноо:{" "}
                      <Text style={{ color: "green" }}>
                        {oItem.CreatedDate.split("T")[0]}
                      </Text>
                    </Text>
                  </View>
                  <View style={css.buttons}>
                    <TouchableOpacity onPress={infoEdit}>
                      <MaterialCommunityIcons
                        name="account-edit-outline"
                        size={25}
                        style={{
                          ...css.editremove,
                          backgroundColor: HBColor,
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeCustomer(oItem)}>
                      <MaterialCommunityIcons
                        name="account-remove-outline"
                        size={25}
                        style={{
                          ...css.editremove,
                          backgroundColor: "red",
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
          <ScrollView contentContainerStyle={css.container}>
            <View style={css.innerContainer}>
              <Text style={css.count}>
                Үйлчлүүлэгчийн тоо: {customers.length}
              </Text>
              <TouchableOpacity onPress={addCustomer}>
                <Ionicons
                  name="md-person-add-outline"
                  style={{
                    ...css.count,
                    backgroundColor: "rgba(0,0,0,0)",
                    fontSize: 25,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <View style={{ ...css.item, ...css.itemTitle }}>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}>Нэр</Text>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}></Text>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}>
                  У/Дугаар
                </Text>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}>
                  Г/Хаяг
                </Text>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}> </Text>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}>Огноо</Text>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}>
                  {"          "}
                </Text>
              </View>
            </View>
            {customers.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => onHandlerItem(item)}
                  key={index}
                >
                  <View style={css.item}>
                    <Text style={css.infoitem}>
                      {getTextSubst(item.fname, 10)}
                    </Text>
                    <Text style={css.infoitem}>{item.phone}</Text>
                    <Text style={css.infoitem}>
                      {getTextSubst(item.address, 8)}
                    </Text>
                    <Text style={css.infoitem}>
                      {item.CreatedDate.split("T")[0]}
                    </Text>
                    <View>
                      <Ionicons
                        name="md-information-circle-outline"
                        style={{
                          color: HBColor,
                          fontSize: 20,
                          borderRadius: 10,
                        }}
                        size={15}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const css = StyleSheet.create({
  container: {
    backgroundColor: BackgroundBlueColor,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    alignItems: "center",
    paddingVertical: 7,
  },
  content: {
    flex: 1,
    flexDirection: "column",
  },
  count: {
    fontWeight: "bold",
    fontSize: 15,
    backgroundColor: "rgba(0,255,0,0.1)",
    color: "green",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: CustomLight,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 2,
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  itemTitle: {
    paddingVertical: 10,
    backgroundColor: HBColor,
  },
  infoitem: {
    color: HBColor,
    fontSize: 11,
  },
  infoTitle: {
    fontWeight: "bold",
    color: CustomLight,
    fontSize: 13,
  },
  modalContainer: {
    flex: 0.62,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 25,
    marginHorizontal: 10,
    backgroundColor: CustomLight,
    borderRadius: 20,
    color: HBColor,
  },
  titlesmall: {
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 18,
    color: HBColor,
    textAlign: "center",
  },
  modalInnerContainer: {
    marginVertical: 5,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: OCustomGray,
  },
  modalTxt: {
    fontSize: 14,
    color: HBColor,
    fontWeight: "500",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  editremove: {
    paddingHorizontal: 30,
    paddingVertical: 2,
    borderRadius: 10,
    color: CustomLight,
    fontSize: 30,
  },
});
