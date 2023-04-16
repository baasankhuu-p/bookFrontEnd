import { useEffect, useContext, useState } from "react";
import { StyleSheet, Text, ScrollView, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const thousandify = require("thousandify");
import { PayNull } from "../../components/useComponent/notfound";
import UserContext from "../../context/userContext";
import { getPaymentAll } from "../../service/usePayment";
import { BackgroundBlueColor, HBColor } from "../../Constants";
export default () => {
  const state = useContext(UserContext);
  const [payment, setPayment] = useState(null);
  useEffect(() => {
    if (state.token) {
      getPaymentAll(state.token)
        .then((result) => {
          setPayment(result.data.data);
        })
        .catch((err) => {
          setPayment(null);
          console.log(err.response.data);
        });
    }
  }, [state.Overread]);
  return payment ? (
    <View style={{ flex: 1, backgroundColor: BackgroundBlueColor }}>
      <ScrollView contentContainerStyle={css.container}>
        <View style={css.innerContainer}>
          <Text style={css.count}>Гүйлгээний тоо: {payment.length}</Text>
        </View>
        {payment.map((item, index) => {
          return (
            //Grid
            <View key={index}>
              <View style={css.item}>
                <Text style={css.infoitem}>{item.CustomerId.phone}</Text>
                <Text style={css.infoitem}>
                  ({item.PaymentID.PaymentRndID})
                </Text>
                <Text style={css.infoitem}>{thousandify(item.Price)}₮</Text>
                <Text style={css.infoitem}>
                  ({item.PaymentID.PaymentDate.split("T")[0]})
                </Text>
                <Text style={css.infoitem}>
                  {item.DeliverID ? (
                    <Ionicons
                      style={[css.infoitem, css.checked]}
                      name="checkmark-circle"
                      size={14}
                    />
                  ) : (
                    <Ionicons
                      style={[css.infoitem, css.notchecked]}
                      name="checkmark-circle-outline"
                      size={14}
                    />
                  )}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  ) : (
    <PayNull />
  );
};

const css = StyleSheet.create({
  container: {
    backgroundColor: BackgroundBlueColor,
  },
  innerContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
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
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 0.2,
    borderColor: HBColor,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  infoitem: {
    color: HBColor,
    fontSize: 11,
    fontWeight: "bold",
  },
  checked: {
    color: "green",
  },
  notchecked: {
    color: "red",
  },
});
