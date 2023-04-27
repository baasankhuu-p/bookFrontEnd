import React, { useEffect, useState, useContext } from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
const thousandify = require("thousandify");
import Star from "react-native-star-view/lib/Star";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import IncDecInput from "../components/useComponent/IncDecInput ";
import {
  BackgroundBlueColor,
  CustomLight,
  HBColor,
  HBWhite,
  OCustomGray,
  RestApiUrl,
} from "../Constants";
import { getTextSubst } from "../utils/functions";
import { GetComment, WriteComment } from "../service/customer/useComments";
import { CommentNull } from "../components/useComponent/notfound";
import UserContext from "../context/userContext";
import { CreateOrder } from "../service/customer/useOrder";

export default ({ route }) => {
  const state = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [ordercount, setOrdercount] = useState(1);
  const book = route.params.book;
  const [sale, setSale] = useState(false);
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    //GET COMMENT
    GetComment(book._id)
      .then((result) => {
        setComments(result.data.comment);
      })
      .catch((err) => {
        state.setMessage(err.response.data.message);
      });
    book.salePrice > 0 ? setSale(true) : setSale(false);
    //item load
  }, [state.Overread, onHandlerOrder]);
  //Create Order
  const onHandlerOrder = (bookID, ordercount, token) => {
    Alert.alert(`${book.bookname} 📖`, `Авах тоо: (${ordercount} ширхэг)`, [
      {
        text: "Болих",
      },
      {
        text: "Захиалах",
        onPress: () =>
          CreateOrder(bookID, ordercount, token)
            .then((result) => {
              state.setMessage("Захиалга амжилттай хийгдлээ");
              navigation.navigate("Захиалга");
              state.setOverread(!state.Overread);
            })
            .catch((err) => {
              state.setMessage(err.response.data.message);
            }),
      },
    ]);

    setOrdercount(1);
  };

  //COMMENT WRITE
  const [commentCustomer, setCommentCustomer] = useState("");
  const [rateCustomer, setRateCusomter] = useState(0);
  const sendComment = () => {
    const token = state.token;
    WriteComment(book._id, rateCustomer, commentCustomer, token)
      .then((result) => {
        state.setMessage("Сэтгэгдлийг амжилттай илгээлээ");
        setCommentCustomer("");
        setRateCusomter(0);
        state.setOverread(!state.Overread);
      })
      .catch((err) => {
        state.setMessage(err.response.data.message);
      });
  };
  return (
    <ScrollView style={css.container}>
      <View style={css.contain}>
        <View style={[css.containheader, css.contain1]}>
          <Image
            style={css.image}
            source={{
              uri: `${RestApiUrl}/upload/book/${
                book.photo ? book.photo : "no-photo.png"
              }`,
            }}
          />
          <View style={css.bookinfo}>
            <Text
              style={{
                fontWeight: "bold",
                color: HBColor,
              }}
            >
              {book.bookname}
            </Text>
            <Text style={css.infoItem}>
              <Text style={css.bookininfo}>Зохиолч: </Text>
              <Text style={css.infoVal}> {book.author}</Text>
            </Text>
            <Text style={css.infoItem}>
              <Text style={css.bookininfo}>Хэвлэгдсэн огноо: </Text>
              <Text style={css.infoVal}> {book.entryDate.split("T")[0]}</Text>
            </Text>
            <Text style={css.infoItem}>
              <Text style={css.bookininfo}>Хуудас: </Text>
              <Text style={css.infoVal}>{book.pages}</Text>
            </Text>
            <Text style={css.infoItem}>
              <Text style={css.bookininfo}>Үндсэн үнэ: </Text>
              <Text
                style={[
                  css.infoVal,
                  sale
                    ? {
                        fontSize: 12,
                        color: "red",
                        textDecorationLine: "line-through",
                      }
                    : {
                        color: "green",
                      },
                ]}
              >
                {thousandify(book.price)} ₮
              </Text>
            </Text>
            {sale && (
              <Text style={css.infoItem}>
                <Text style={css.bookininfo}>Хямдарсан үнэ: </Text>
                {thousandify(book.price - book.price * book.salePrice)} ₮
              </Text>
            )}
            <Text style={css.infoItem}>
              <Text style={css.bookininfo}>Үлдсэн: </Text>
              <Text style={css.infoVal}> {book.count} ш</Text>
            </Text>
          </View>

          <View style={{ position: "absolute", bottom: 10, right: 10 }}>
            {book.averageRating >= 1 && (
              <Star score={book.averageRating} style={css.rate} />
            )}
          </View>
        </View>
        <View style={[css.containheader, css.contain2]}>
          <View>
            <IncDecInput
              max={book.count}
              order={ordercount}
              setOrder={setOrdercount}
            />
          </View>
          <TouchableOpacity
            onPress={() => onHandlerOrder(book._id, ordercount, state.token)}
          >
            <Ionicons name="cart" size={26} color={HBColor} />
          </TouchableOpacity>
        </View>
        <View style={[css.containheader, css.content]}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: HBColor }}>
            Тайлбар:{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShow(!show);
            }}
          >
            {show ? (
              <Text style={css.text}>
                {"  "} {book.content}(
                <Text
                  style={{
                    color: HBColor,
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}
                >
                  хураах
                </Text>
                )
              </Text>
            ) : (
              <Text style={css.text}>
                {"  "} {getTextSubst(book.content, 100)}(
                <Text
                  style={{
                    color: HBColor,
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}
                >
                  дэлгэрэнгүй
                </Text>
                )
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {comments.length > 0 && (
          <View style={[css.containheader, css.comment]}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 18, color: HBColor }}
              >
                Сэтгэгдэл:{" "}
              </Text>
            </View>
            <View>
              {comments.length > 0 ? (
                <FlatList
                  horizontal
                  data={comments}
                  renderItem={({ item, index }) => {
                    return (
                      <View key={index} style={css.commentSCitem}>
                        <Star score={item.Rating} style={css.commentrate} />
                        <Text style={{ fontSize: 12 }}>
                          {" "}
                          {getTextSubst(item.Comment, 100)}{" "}
                        </Text>
                        <View style={css.customer}>
                          <Text style={css.customername}>
                            {item.CustomerId.fname.substr(0, 1)}
                          </Text>
                          <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                            {item.CustomerId.fname}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                />
              ) : (
                <CommentNull text={{ fontSize: 12, color: "gray" }} />
              )}
            </View>
          </View>
        )}
        {/* Comment bichih */}
        <View style={css.commentWrite}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", color: HBColor, fontSize: 15 }}>
              {" "}
              Үнэлгээ:{" "}
            </Text>
            <Rating
              type="custom"
              ratingColor="#FF8F15"
              imageSize={20}
              startingValue={rateCustomer}
              onFinishRating={setRateCusomter}
            />
          </View>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={500}
            onChangeText={(text) => setCommentCustomer(text)}
            value={commentCustomer}
            placeholder="Сэтгэгдлээ бичнэ үү.."
            placeholderTextColor={HBColor}
            style={{
              paddingBottom: 50,
              backgroundColor: CustomLight,
              borderRadius: 10,
              borderWidth: 1,
              paddingHorizontal: 10,
              borderColor: OCustomGray,
            }}
          />
          <TouchableOpacity
            onPress={() => sendComment()}
            style={{
              position: "relative",
              marginVertical: 10,
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                position: "absolute",
                right: 10,
                top: 0,
                fontSize: 15,
                fontWeight: "bold",
                paddingVertical: 5,
                paddingHorizontal: 15,
                backgroundColor: HBColor,
                color: CustomLight,
                borderRadius: 2,
              }}
            >
              Илгээх
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const css = StyleSheet.create({
  container: {
    backgroundColor: BackgroundBlueColor,
    flex: 1,
    padding: 10,
  },
  image: {
    flex: 2,
    height: 200,
    borderRadius: 10,
    shadowColor: HBColor,
  },
  contain: {
    flex: 1,
    flexDirection: "column",
  },
  containheader: {
    paddingVertical: 10,
    borderBottomColor: OCustomGray,
    borderBottomWidth: 2,
  },
  contain1: {
    flex: 2,
    flexDirection: "row",
  },
  contain2: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  bookinfo: {
    flex: 3,
    paddingHorizontal: 10,
    justifyContent: "space-around",
    paddingVertical: 15,
    fontSize: 10,
  },
  bookininfo: {
    fontWeight: "bold",
    fontSize: 12,
    justifyContent: "flex-start",
  },
  infoVal: {
    fontSize: 12,
    justifyContent: "flex-end",
  },
  rate: {
    width: 100,
    height: 20,
  },
  content: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 12,
  },
  comment: {
    flex: 1,
    marginHorizontal: 10,
  },
  commentrate: {
    height: 20,
    width: 100,
  },
  commentSCitem1: {
    width: 240,
    backgroundColor: HBWhite,
    borderRadius: 15,
    shadowRadius: 4,
    margin: 4,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  commentSCitem: {
    width: 220,
    height: 130,
    backgroundColor: HBWhite,
    borderRadius: 10,
    shadowRadius: 4,
    marginHorizontal: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  customer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  customername: {
    backgroundColor: "gray",
    color: HBWhite,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 50,
    marginHorizontal: 5,
    fontSize: 18,
  },
  commentWrite: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 30,
    marginTop: 20,
    backgroundColor: CustomLight,
    padding: 20,
    borderRadius: 10,
  },
});
