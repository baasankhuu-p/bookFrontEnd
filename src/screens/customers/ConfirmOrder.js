import { useState, useContext, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
const thousandify = require("thousandify");

import { OrderNull } from "../../components/useComponent/notfound";
import { getConfirmOrder } from "../../service/customer/useOrder";
import UserContext from "../../context/userContext";
import {
  BackgroundBlueColor,
  CustomLight,
  HBColor,
  OCustomGray,
  RestApiUrl,
} from "../../Constants";

export default () => {
  const state = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getConfirmOrder(state.token)
      .then((result) => {
        setOrders(result.data.data);
      })
      .catch((err) => {
        console.log("мэдээллийг унших үед Алдаа: ", err.response.data);
      });
  }, [state.Overread]);
  return (
    <>
      {orders.length > 0 ? (
        <ScrollView style={css.container}>
          {orders.map((el, i) => {
            return (
              <View key={i} style={css.item}>
                <View style={css.itemInfo}>
                  <View style={css.info}>
                    <Text
                      style={{
                        color: "red",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {el.Payment.PaymentDate.split("T")[0].replaceAll(
                        "-",
                        "/"
                      )}{" "}
                      {el.Payment.PaymentDate.split("T")[1].split(":")[0]}:
                      {el.Payment.PaymentDate.split("T")[1].split(":")[1]}:
                      {el.Payment.PaymentDate.split(":")[2].split(".")[0]}
                    </Text>
                  </View>
                  <View style={css.info}>
                    <Text style={css.title}>Гүйлгээний утга: </Text>
                    <Text style={{ color: HBColor, fontWeight: "bold" }}>
                      {el.Payment.PaymentRndID}
                    </Text>
                  </View>
                  <View style={css.info}>
                    <Text style={css.title}>Төлөгдсөн дүн: </Text>
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      {thousandify(el.Payment.TotalPrice)} ₮
                    </Text>
                  </View>
                </View>
                <FlatList
                  data={el.OrderData}
                  horizontal
                  renderItem={({ item }) => (
                    <Image
                      style={css.image}
                      source={{
                        uri: `${RestApiUrl}/upload/book/${
                          item.Book.photo ? item.Book.photo : "no-photo.png"
                        }`,
                      }}
                    />
                  )}
                />
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <OrderNull />
      )}
    </>
  );
};
const css = StyleSheet.create({
  container: {
    backgroundColor: BackgroundBlueColor,
  },
  item: {
    backgroundColor: CustomLight,
    borderWidth: 2,
    borderColor: OCustomGray,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  itemInfo: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
    justifyContent: "center",
  },
  info: { flex: 1, flexDirection: "row", justifyContent: "space-between" },
  title: {
    color: HBColor,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: OCustomGray,
  },
});
