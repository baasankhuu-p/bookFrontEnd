import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
const thousandify = require("thousandify");
import { FontAwesome } from "@expo/vector-icons";
import {
  BackgroundBlueColor,
  CustomLight,
  HBColor,
  OCustomGray,
} from "../../Constants";
import UserContext from "../../context/userContext";
import { getOrder, orderPay } from "../../service/customer/useOrder";
import { OrderNull } from "../../components/useComponent/notfound";
import OrderItem from "../../components/OrderItem";
export default () => {
  const state = useContext(UserContext);
  //Zahialgiin nomuud
  const [orders, setOrders] = useState(null);
  const [payInfo, setPayinfo] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    getOrder(state.token)
      .then((result) => {
        setOrders(result.data.data);
      })
      .catch((err) => {
        const customErr = err.response.data.message;
        console.log(customErr);
      });
  }, [state.Overread]);
  //Order Payments
  const onHandlePayment = (token) => {
    orderPay(token)
      .then((result) => {
        setPayinfo(result.data.payInfo);
        setIsVisible(true);
        //Batalgaajsan gesn tsonhruu usreh
      })
      .catch((err) => {
        const customErr = err.response.data.message;
        if (!customErr) {
          state.setMessage(`Алдаа: ${err.message}`);
        } else {
          state.setMessage(`Алдаа: ${customErr}`);
        }
      });
  };
  const visibleClose = () => {
    setIsVisible(false);
    setOrders(null);
    state.setOverread(!state.Overread);
  };
  return (
    <>
      {orders && orders.length > 0 ? (
        <ScrollView style={{ backgroundColor: BackgroundBlueColor }}>
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
                <View style={css.container}>
                  <Text style={css.title}>Гүйлгээ хийх зааварчилгаа</Text>
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
                    <Text style={css.txtStyle}>Дансны дугаар: 58********</Text>
                    <Text style={css.txtStyle}>
                      Хүлээн авагч: "НОМЫН ДЭЛГҮҮР ХХК"
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
          <View
            style={{
              paddingHorizontal: 10,
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {orders.map((order, index) => (
              <View style={{ width: "33%", padding: 5 }} key={index}>
                <OrderItem item={order} />
              </View>
            ))}
          </View>
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
    borderColor: OCustomGray,
  },
  txtStyle: {
    fontSize: 12,
    color: HBColor,
    fontWeight: "500",
  },
});
