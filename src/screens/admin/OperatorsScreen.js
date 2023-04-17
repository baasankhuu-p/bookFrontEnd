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
import { deleteOperator, getOperators } from "../../service/admin/useOperator";
import { BackgroundBlueColor, CustomLight, HBColor } from "../../Constants";
import { getTextSubst } from "../../utils/functions";

export default () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [operators, setOperator] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getOperators(state.token)
      .then((result) => {
        setOperator(result.data.data);
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
    navigation.navigate("Оператор", {
      screen: "OperatorEdit",
      params: { data: oItem },
    });
    setItem(null);
    setVisible(false);
  };
  const removeOperator = (item) => {
    if (item) {
      deleteOperator(state.token, item._id)
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
  const addOperator = () => {
    navigation.navigate("Оператор", {
      screen: "OperatorAdd",
    });
  };
  return (
    <>
      {operators ? (
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
                    <Text style={{ ...css.modalTxt }}>
                      Ажилтны эрх: {oItem.roler.toUpperCase()}
                    </Text>
                  </View>
                  <View style={css.modalInnerContainer}>
                    <Text style={css.modalTxt}>
                      Ажилтны нэр: {oItem.username}
                    </Text>
                  </View>
                  <View style={css.modalInnerContainer}>
                    <Text style={css.modalTxt}>И-мейл хаяг: {oItem.email}</Text>
                  </View>
                  <View style={css.modalInnerContainer}>
                    <Text style={css.modalTxt}>
                      Холбоо барих дугаар: {oItem.phone}
                    </Text>
                  </View>
                  <View style={css.modalInnerContainer}>
                    <Text style={css.modalTxt}>
                      Бүртгүүлсэн огноо: {oItem.CreatedDate.split("T")[0]}
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
                    <TouchableOpacity onPress={() => removeOperator(oItem)}>
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
              <Text style={css.count}>Ажилтны тоо: {operators.length - 1}</Text>
              <TouchableOpacity onPress={addOperator}>
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
                <Text style={{ ...css.infoitem, ...css.infoTitle }}>Имейл</Text>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}>
                  У/дугаар
                </Text>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}>Огноо</Text>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}>
                  {"  "}
                </Text>
              </View>
            </View>
            {operators.map((item, index) => {
              if (item.roler != "admin") {
                return (
                  <TouchableOpacity
                    onPress={() => onHandlerItem(item)}
                    key={index}
                  >
                    <View style={css.item}>
                      <Text style={css.infoitem}>
                        {getTextSubst(item.username, 10)}
                      </Text>
                      <Text style={css.infoitem}>
                        {getTextSubst(item.email, 10)}
                      </Text>
                      <Text style={css.infoitem}>{item.phone}</Text>
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
              }
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
    borderWidth: 0.2,
    borderColor: HBColor,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 2,
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  itemTitle: {
    paddingVertical: 10,
    marginTop: 0,
    backgroundColor: HBColor,
  },
  infoitem: {
    color: HBColor,
    fontSize: 11,
    fontWeight: "bold",
  },
  infoTitle: {
    color: CustomLight,
    fontSize: 13,
  },
  modalContainer: {
    flex: 0.55,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 25,
    marginHorizontal: 10,
    backgroundColor: CustomLight,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: HBColor,
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
    borderWidth: 1,
    borderRadius: 10,
    borderColor: HBColor,
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
