import React, { useContext } from "react";
import { Alert, Text, Image, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { CustomLight, HBColor } from "../Constants";
import { TouchableOpacity } from "react-native";
import UserContext from "../context/userContext";
import { deletebookOrder } from "../service/customer/useOrder";
export default ({ item }) => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const removeItemHandler = () => {
    Alert.alert(`Захиалга цуцлах уу`, `${item.Book.bookname}`, [
      { text: "болих" },
      {
        text: "зөвшөөрөх",
        onPress: () => {
          deleteOrder(item.Book._id, state.token);
        },
      },
    ]);
  };
  const deleteOrder = (BookID, token) => {
    deletebookOrder(BookID, token)
      .then((response) => {
        state.setMessage(
          `Устгагдлаа: "${response.data.order2Book.BookId.bookname}"`
        );
        state.setOverread(!state.Overread);
      })
      .catch((err) => {
        if (err.response.data.message)
          state.setMessage(err.response.data.message);
        else state.setMessage(err.message);
      });
  };
  const onPressHandlerBook = () => {
    navigation.navigate("Book", { book: item.Book });
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        margin: 5,
      }}
    >
      <TouchableOpacity onPress={onPressHandlerBook}>
        <Image
          style={css.image}
          source={{
            uri: `https://book.mn/timthumb.php?src=https://book.mn/uploads/products/${item.Book.photo}&w=400`,
          }}
        />
      </TouchableOpacity>
      <Text style={css.quantity}> {item.Quantity} </Text>
      <TouchableOpacity style={css.iconRemoveBtn} onPress={removeItemHandler}>
        <MaterialCommunityIcons
          style={css.iconRemove}
          name="cart-remove"
          size={16}
          color={HBColor}
        />
      </TouchableOpacity>
    </View>
  );
};
const css = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
    width: 150,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 2,
  },
  quantity: {
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: CustomLight,
    color: HBColor,
    borderColor: HBColor,
    borderWidth: 0.2,
    fontWeight: "bold",
    paddingHorizontal: 2,
    borderRadius: 10,
  },
  iconRemoveBtn: {
    position: "absolute",
    bottom: 4,
    right: 4,
  },
  iconRemove: {
    borderColor: "red",
    borderWidth: 0.4,
    backgroundColor: CustomLight,
    color: "red",
    fontWeight: "bold",
    padding: 4,
    borderRadius: 15,
  },
});
