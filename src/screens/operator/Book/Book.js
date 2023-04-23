import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
const thousandify = require("thousandify");
import Modal from "react-native-modal";
import UserContext from "../../../context/userContext";
import { deleteBooks, getBooks } from "../../../service/useBooks";
import {
  BackgroundBlueColor,
  CustomLight,
  HBColor,
  OCustomGray,
} from "../../../Constants";
import SearchBook from "../../../components/SearchBook";
import { getTextSubst } from "../../../utils/functions";
import Spinner from "../../../components/useComponent/Spinner";
import { useNavigation } from "@react-navigation/native";
export default () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState([]);
  const [bookitem, setBookitem] = useState(null);
  const [removeItem, setRemoveItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    setBooks([]);
    getBooks()
      .then((result) => {
        setLoading(false);
        setBooks(result.data.data);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data) {
          ToastAndroid.show(
            `Алдаа: ${
              err.response.data.message
                ? err.response.data.message
                : err.message
            }`,
            ToastAndroid.SHORT
          );
        }
      });
  }, [state.Overread]);
  const filterBooks = books.filter((el) => el.bookname.includes(searchValue));

  //Nomiin delgerengui
  const onBookDetails = (item) => {
    setBookitem(item);
    if (bookitem) {
      setIsVisible(true);
    }
  };
  //Nomiin medeelliig oorcloh
  const editBook = (item) => {
    navigation.navigate("Ном", { screen: "EditBooks", params: { data: item } });
    visibleClose();
  };

  //Nomiig ustgeh
  const removeBook = (item) => {
    setRemoveItem(item);
    if (removeItem) {
      visibleClose();
      Alert.alert(`Анхаар !`, `'${item.bookname}' энэ номыг устгах уу`, [
        {
          text: "Устга",
          onPress: () =>
            deleteBooks(state.token, item._id)
              .then((result) => {
                state.setOverread(!state.Overread);
                visibleClose();
                ToastAndroid.show("Ном устгагдлаа", ToastAndroid.SHORT);
              })
              .catch((err) => {
                ToastAndroid.show(
                  `Ном устгах явцад алдаа гарлаа: ${
                    err.response.data.message
                      ? err.response.data.message
                      : err.message
                  }`,
                  ToastAndroid.SHORT
                );
              }),
        },
        {
          text: "Болих",
        },
      ]);
      setRemoveItem(null);
    }
  };
  //Modal tsonh haah
  const visibleClose = () => {
    setIsVisible(false);
    setBookitem(null);
  };
  return (
    <>
      {bookitem && (
        <>
          <Modal isVisible={isVisible}>
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
            <View style={modalcss.modalContainer}>
              <View>
                <Text style={modalcss.titlesmall}>Номын мэдээлэл</Text>

                <View style={modalcss.modalInnerContainer}>
                  <Text style={{ ...modalcss.modalTxt }}>
                    Категорын нэр: {bookitem.category.name}
                  </Text>
                </View>
                <View style={modalcss.modalInnerContainer}>
                  <Text style={{ ...modalcss.modalTxt }}>
                    Номын нэр: {bookitem.bookname}
                  </Text>
                </View>
                <View style={modalcss.modalInnerContainer}>
                  <Text style={modalcss.modalTxt}>
                    Зохиолчын нэр: {bookitem.author}
                  </Text>
                </View>
                <View style={modalcss.modalInnerContainer}>
                  <Text style={modalcss.modalTxt}>
                    Хуудасны тоо: {bookitem.pages}
                  </Text>
                </View>
                <View style={modalcss.modalInnerContainer}>
                  <Text style={modalcss.modalTxt}>
                    Хямдрал:{" "}
                    {bookitem.salePrice == 0
                      ? "Байхгүй"
                      : bookitem.salePrice * 100 + " %"}
                  </Text>
                </View>
                <View style={modalcss.modalInnerContainer}>
                  <Text style={modalcss.modalTxt}>
                    Бүртгэсэн огноо:{bookitem.createdAt.split("T")[0]}
                  </Text>
                </View>
                <View style={modalcss.buttons}>
                  <TouchableOpacity
                    onPress={() => {
                      editBook(bookitem);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="book-edit-outline"
                      size={25}
                      style={{
                        ...modalcss.editremove,
                        backgroundColor: HBColor,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      removeBook(bookitem);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="book-remove-outline"
                      size={25}
                      style={{
                        ...modalcss.editremove,
                        backgroundColor: "red",
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
      <View style={css.container}>
        <View style={css.innerContainer}>
          <SearchBook
            customstyle={{
              width: "70%",
              height: 47,
              borderRadius: 10,
              marginHorizontal: 0,
            }}
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <Text style={css.count}>Нийт: {books.length}</Text>
        </View>
        <ScrollView>
          <View style={{ ...css.item, backgroundColor: HBColor }}>
            <Text
              style={{
                ...css.bookname,
                ...css.contenttitle,
              }}
            >
              Номын нэр
            </Text>
            <Text
              style={{
                ...css.bookcount,
                ...css.contenttitle,
              }}
            >
              Тоо(ш)
            </Text>
            <Text
              style={{
                ...css.price,
                ...css.contenttitle,
              }}
            >
              Үнэ(₮)
            </Text>
            <Text
              style={{
                ...css.date,
                ...css.contenttitle,
              }}
            >
              Огноо
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Ном", { screen: "addBooks" })}
              style={{
                width: "6%",
              }}
            >
              <Ionicons
                name="md-add-circle-outline"
                size={20}
                color={CustomLight}
              />
            </TouchableOpacity>
          </View>
          {loading && <Spinner />}
          {filterBooks &&
            filterBooks.length > 0 &&
            filterBooks.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    onBookDetails(item);
                  }}
                >
                  <View style={css.item}>
                    <Text style={css.bookname}>
                      {getTextSubst(item.bookname, 12)}
                    </Text>
                    <Text style={css.bookcount}>{item.count}ш</Text>
                    <Text style={css.price}>{thousandify(item.price)}₮</Text>
                    <Text style={css.date}>{item.createdAt.split("T")[0]}</Text>
                    <MaterialCommunityIcons
                      name="unfold-more-horizontal"
                      style={css.moreIcon}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </>
  );
};
const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundBlueColor,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3,
    marginHorizontal: 10,
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 1,
    backgroundColor: CustomLight,
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  contenttitle: {
    textAlign: "left",
    fontSize: 13,
    color: CustomLight,
    fontWeight: "bold",
  },
  bookname: {
    fontSize: 12,
    color: HBColor,
    width: "35%",
  },
  bookcount: { fontSize: 12, color: HBColor, width: "14%" },
  price: {
    color: "green",
    width: "20%",
    fontSize: 12,
  },
  date: {
    color: HBColor,
    fontSize: 12,
    width: "23%",
  },
  moreIcon: {
    color: HBColor,
    fontSize: 15,
    textAlign: "right",
    width: "5%",
  },
});
const modalcss = StyleSheet.create({
  modalContainer: {
    flex: 0.7,
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
    fontSize: 16,
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
    fontSize: 12,
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
