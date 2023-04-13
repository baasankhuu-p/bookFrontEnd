import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
const thousandify = require("thousandify");
import { FontAwesome } from "@expo/vector-icons";
import { CustomLight, HBColor } from "../../Constants";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import UserContext from "../../context/userContext";
import { toastInfo } from "../../utils/functions";
import { getOrder, orderPay } from "../../service/customer/useOrder";
import { OrderNull } from "../../components/useComponent/notfound";
import OrderItem from "../../components/OrderItem";
import { StyleSheet } from "react-native";
export default () => {
  const state = useContext(UserContext);
  //Zahialgiin nomuud
  const [orders, setOrders] = useState([]);
  const [payInfo, setPayinfo] = useState({});
  const [toastObj, setToastObj] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    getOrder(state.token)
      .then((result) => {
        setOrders(result.data.data);
      })
      .catch((err) => {
        const customErr = err.response.data.message;
        if (!customErr) {
          setToastObj({ type: "error", msg: `Алдаа: ${err.message}` });
        }
      });
    setToastObj(null);
  }, [state.Overread, payInfo]);
  useEffect(() => {
    //Aldaanii MSG ognoo Toast baidlaar
    if (toastObj) {
      Toast.show(toastInfo(toastObj.type, toastObj.msg, 2000));
    }
    setToastObj(null);
  }, [toastObj]);

  //Order Payments
  const onHandlePayment = (token) => {
    orderPay(token)
      .then((result) => {
        setPayinfo(result.data.payInfo);
        setIsVisible(true);
        state.setOverread(!state.Overread);
      })
      .catch((err) => {
        const customErr = err.response.data.message;
        if (!customErr) {
          setToastObj({ type: "error", msg: `Алдаа: ${err.message}` });
        } else {
          setToastObj({ type: "error", msg: customErr });
        }
      });
  };
  return (
    <>
      {orders.length > 0 ? (
        <ScrollView>
          <View>
            <Modal isVisible={isVisible}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {/* Close Button Custom */}
                <TouchableOpacity onPress={() => setIsVisible(false)}>
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
                <View style={css.container}>
                  <Text style={css.title}>Төлбөр төлөх зааварчилгаа</Text>
                  <Text style={[css.content, css.txtStyle]}>
                    Хэрэглэгч та Захиалга хийгдсэнээс хойш дор дурдсан дансруу
                    шилжүүлэх ба гүйлгээний утга хэсэгт ЗАХИАЛГЫН КОД /заавал/
                    бичиж шилжүүлэг хийнэ.
                  </Text>
                  <Text style={css.titlesmall}>Гүйлгээний утга болон дүн</Text>
                  <View style={css.content}>
                    <Text style={css.txtStyle}>
                      Захиалгын код: {payInfo.PaymentRndID}
                    </Text>
                    <Text style={css.txtStyle}>
                      Захиалгын дүн: {thousandify(payInfo.TotalPrice)}₮
                    </Text>
                  </View>
                  <Text style={[css.titlesmall]}>Хаан Банк</Text>
                  <View style={css.content}>
                    <Text style={css.txtStyle}>Дансны дугаар: 5801010101</Text>
                    <Text style={css.txtStyle}>
                      Хүлээн авагч: НОМЫН ДЭЛГҮҮР ХХК
                    </Text>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <TouchableOpacity onPress={() => onHandlePayment(state.token)}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  backgroundColor: HBColor,
                  color: CustomLight,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                }}
              >
                Төлөх
              </Text>
            </View>
          </TouchableOpacity>
          <FlatList
            data={orders}
            numColumns={3}
            renderItem={({ item }) => <OrderItem item={item} />}
            keyExtractor={(item) => item.Book._id}
            contentContainerStyle={{
              paddingHorizontal: 10,
              flex: 1,
            }}
          />
        </ScrollView>
      ) : (
        <OrderNull />
      )}
    </>
  );
};
const css = StyleSheet.create({
  container: {
    flex: 0.56,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 15,
    marginHorizontal: 10,
    backgroundColor: CustomLight,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: HBColor,
    color: HBColor,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    color: HBColor,
  },
  titlesmall: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    paddingHorizontal: 10,
    textTransform: "capitalize",
    fontSize: 14,
    color: HBColor,
  },
  content: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: HBColor,
  },
  txtStyle: {
    fontSize: 12,
    color: HBColor,
    fontWeight: "500",
  },
});
