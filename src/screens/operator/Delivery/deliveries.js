import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
const thousandify = require("thousandify");
import UserContext from "../../../context/userContext";
import { getConfirmDelivery } from "../../../service/operator/useDelivery";
import { DeliveryNull } from "../../../components/useComponent/notfound";
import { BackgroundBlueColor, CustomLight, HBColor } from "../../../Constants";
import { FlatList } from "react-native";
import { getTextSubst } from "../../../utils/functions";

export default () => {
  const state = useContext(UserContext);
  const [deliveries, setDeliveries] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    getConfirmDelivery(state.token)
      .then((result) => {
        setDeliveries(result.data.data);
        console.log(deliveries);
      })
      .catch((err) => {
        console.log(err.result.data.message);
      });
  }, [state.Overread]);
  const [ditem, setItem] = useState({});
  const onHandlerDlvr = ({ data }) => {
    setItem(data);
    if (Object.keys(ditem).length > 0) {
      setIsVisible(true);
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
          {ditem.delivery && ditem.Payment && (
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
                        Гэрийн хаяг: {ditem.delivery.CustomerId.address}
                      </Text>
                      <Text style={modalcss.txtStyle}>
                        Утасны дугаар: {ditem.delivery.CustomerId.phone}
                      </Text>
                      <Text style={modalcss.txtStyle}>
                        И-мейл хаяг: {ditem.delivery.CustomerId.email}
                      </Text>
                      <Text
                        style={{ ...modalcss.txtStyle, color: "chocolate" }}
                      >
                        Хүргэгдсэн огноо:{" "}
                        {ditem.delivery.DeliveryDate.split("T")[0]}
                      </Text>
                    </View>
                    <Text style={modalcss.titlesmall}>Төлбөрийн мэдээлэл</Text>
                    <View style={modalcss.content}>
                      <Text style={modalcss.txtStyle}>
                        Гүйлгээний утга: {ditem.Payment.PaymentRndID}
                      </Text>
                      <Text style={modalcss.txtStyle}>
                        Гүйлгээний дүн: {thousandify(ditem.Payment.TotalPrice)}₮
                      </Text>
                    </View>
                    <Text style={modalcss.titlesmall}>Хүргэгдсэн ном</Text>

                    <View style={modalcss.content}>
                      <FlatList
                        horizontal
                        data={ditem.Orderdata}
                        renderItem={({ item }) => {
                          return (
                            <View style={modalcss.imageItem}>
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
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          )}

          <ScrollView contentContainerStyle={css.container}>
            <View style={css.innerContainer}>
              <Text style={css.count}>Нийт: {deliveries.length}</Text>
            </View>
            <FlatList
              data={deliveries}
              renderItem={({ item, index }) => {
                return (
                  //Grid
                  <TouchableOpacity
                    key={index}
                    onPress={() => onHandlerDlvr({ data: item })}
                  >
                    <View style={css.item}>
                      <Text style={css.fname}>
                        {item.delivery.CustomerId.fname}
                      </Text>
                      <Text style={css.phone}>
                        {item.delivery.CustomerId.phone}
                      </Text>
                      <Text style={css.date}>
                        {item.delivery.DeliveryDate.split("T")[0]}
                      </Text>
                      <MaterialCommunityIcons
                        style={css.delIcon}
                        name="unfold-more-horizontal"
                        size={18}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
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
  fname: {
    color: HBColor,
    fontWeight: "bold",
    fontSize: 13,
    textTransform: "capitalize",
  },
  phone: {
    color: HBColor,
    fontSize: 13,
  },
  address: {
    color: HBColor,
    fontSize: 13,
  },
  date: {
    color: HBColor,
    fontSize: 12,
  },
  delIcon: {
    color: HBColor,
    fontSize: 20,
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
    borderWidth: 5,
    borderColor: HBColor,
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
  delimage: {},
  bookname: {
    textAlign: "center",
    fontSize: 10,
    color: HBColor,
    fontWeight: "bold",
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
