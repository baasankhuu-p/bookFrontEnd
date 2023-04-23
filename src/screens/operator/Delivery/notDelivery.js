import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
const thousandify = require("thousandify");

import UserContext from "../../../context/userContext";
import {
  createDeliveries,
  getNotDelivery,
} from "../../../service/operator/useDelivery";
import { DeliveryNull } from "../../../components/useComponent/notfound";
import {
  BackgroundBlueColor,
  CustomLight,
  HBColor,
  OCustomGray,
} from "../../../Constants";
import { getTextSubst } from "../../../utils/functions";

export default () => {
  const state = useContext(UserContext);
  const [deliveries, setDeliveries] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    getNotDelivery(state.token)
      .then((result) => {
        if (result.data.data) {
          setDeliveries(result.data.data);
        }
      })
      .catch((err) => {
        if (err.result.data) {
          console.log(err.result.data);
        }
      });
  }, [state.Overread]);

  const [ditem, setItem] = useState({});
  const onHandlerDlvr = ({ data }) => {
    setItem(data);
    if (Object.keys(ditem).length > 0) {
      setIsVisible(true);
    }
  };
  const createDelivery = (deliveritem) => {
    const body = {
      customerId: deliveritem.Orderdata.CustomerId._id,
      OrderID: deliveritem.Orderdata.id,
    };
    if (body && state.token) {
      setDeliveries([]);
      createDeliveries(state.token, body)
        .then((result) => {
          state.setOverread(!state.Overread);
          ToastAndroid.show("Хүргэлтийг баталгаажууллаа", ToastAndroid.SHORT);
          visibleClose();
        })
        .catch((err) => {
          state.setOverread(!state.Overread);
          visibleClose();
          ToastAndroid.show(
            `Алдаа: ${
              err.response.data.message
                ? err.response.data.message
                : err.message
            }`,
            ToastAndroid.SHORT
          );
        });
    }
  };
  const visibleClose = () => {
    setItem({});
    setIsVisible(false);
  };
  return (
    <>
      {deliveries && deliveries.length > 0 ? (
        <View style={{ flex: 1, backgroundColor: BackgroundBlueColor }}>
          {/* modal .. */}

          {ditem.Orderdata && ditem.Orderdata.PaymentID && (
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
                  <View style={modalcss.container}>
                    <Text style={modalcss.titlesmall}>Хүргэлт</Text>
                    <View style={modalcss.content}>
                      <Text style={modalcss.txtStyle}>
                        Гэрийн хаяг: {ditem.Orderdata.CustomerId.address}
                      </Text>
                      <Text style={modalcss.txtStyle}>
                        Утасны дугаар: {ditem.Orderdata.CustomerId.phone}
                      </Text>
                      <Text style={modalcss.txtStyle}>
                        И-мейл хаяг: {ditem.Orderdata.CustomerId.email}
                      </Text>
                    </View>
                    <Text style={modalcss.titlesmall}>Төлбөрийн мэдээлэл</Text>
                    <View style={modalcss.content}>
                      <Text style={modalcss.txtStyle}>
                        Гүйлгээний утга:{" "}
                        {ditem.Orderdata.PaymentID.PaymentRndID}
                      </Text>
                      <Text style={modalcss.txtStyle}>
                        Гүйлгээний дүн:{" "}
                        {thousandify(ditem.Orderdata.PaymentID.TotalPrice)}₮
                      </Text>
                    </View>
                    <Text style={modalcss.titlesmall}>Захиалгат ном</Text>

                    <View style={modalcss.content}>
                      <ScrollView horizontal>
                        {ditem.item.map((item, index) => {
                          return (
                            <View style={modalcss.imageItem} key={index}>
                              <Image
                                style={modalcss.image}
                                source={{
                                  uri: `https://book.mn/timthumb.php?src=https://book.mn/uploads/products/${item.BookId.photo}&w=400`,
                                }}
                              />
                              <Text style={modalcss.bookname}>
                                {getTextSubst(item.BookId.bookname, 25)}
                              </Text>
                              <Text style={modalcss.quantity}>
                                {item.Quantity}
                              </Text>
                            </View>
                          );
                        })}
                      </ScrollView>
                    </View>
                    <TouchableOpacity onPress={() => createDelivery(ditem)}>
                      <Text style={modalcss.send}>Хүргэлт хийх</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          )}
          <ScrollView contentContainerStyle={css.container}>
            <View style={css.innerContainer}>
              <Text style={css.count}>Нийт: {deliveries.length}</Text>
            </View>
            <View style={{ ...css.item, backgroundColor: HBColor }}>
              <Text style={[css.infotitle, css.fname]}>Нэр</Text>
              <Text style={[css.infotitle, css.phone]}>Дугаар</Text>
              <Text
                style={[css.infotitle, css.rndcode, { color: CustomLight }]}
              >
                Гүйлгээний дугаар
              </Text>
              <Text style={[css.infotitle, css.date]}>Огноо</Text>
            </View>
            {deliveries.map((item, index) => {
              return (
                //Grid
                <TouchableOpacity
                  key={index}
                  onPress={() => onHandlerDlvr({ data: item })}
                >
                  <View style={css.item}>
                    <Text style={[css.infocss, css.fname]}>
                      {item.Orderdata.CustomerId.lname.charAt(0)}.{" "}
                      {getTextSubst(item.Orderdata.CustomerId.fname, 10)}
                    </Text>
                    <Text style={[css.infocss, css.phone]}>
                      {item.Orderdata.CustomerId.phone}
                    </Text>
                    <Text style={[css.infocss, css.rndcode]}>
                      ({item.Orderdata.PaymentID.PaymentRndID})
                    </Text>
                    <Text style={[css.infocss, css.date]}>
                      {item.Orderdata.OrderDate.split("T")[0]}
                    </Text>
                    <MaterialCommunityIcons
                      style={[css.infocss, css.delIcon]}
                      name="truck-delivery-outline"
                      size={18}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <DeliveryNull />
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
    backgroundColor: "#f2e3c6",
    color: "#e6324b",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CustomLight,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 1,
    paddingVertical: 10,
  },
  infotitle: {
    paddingHorizontal: 1,
    color: CustomLight,
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },

  infocss: {
    paddingHorizontal: 1,
    color: HBColor,
    fontSize: 11,
    textAlign: "center",
  },
  fname: {
    textTransform: "capitalize",
    width: "24%",
  },
  phone: {
    width: "16%",
  },
  rndcode: {
    color: "green",
    width: "30%",
  },
  date: {
    width: "20%",
  },
  delIcon: {
    width: "10%",
  },
});

const modalcss = StyleSheet.create({
  container: {
    flex: 0.75,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 15,
    marginHorizontal: 10,
    backgroundColor: CustomLight,
    borderRadius: 20,
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
  imageItem: {
    marginHorizontal: 5,
    width: 90,
    height: 140,
    backgroundColor: BackgroundBlueColor,
    borderRadius: 5,
  },
  image: {
    width: 90,
    height: 100,
    borderRadius: 5,
  },
  bookname: {
    textAlign: "center",
    fontSize: 10,
    color: HBColor,
    fontWeight: "bold",
  },
  send: {
    backgroundColor: HBColor,
    color: CustomLight,
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 60,
    textAlign: "center",
    borderRadius: 15,
  },
  quantity: {
    position: "absolute",
    left: 7,
    top: 7,
    backgroundColor: CustomLight,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: HBColor,
    textAlign: "center",
    fontSize: 14,
    color: HBColor,
    fontWeight: "bold",
  },
});
