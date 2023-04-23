import { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  ScrollView,
  ToastAndroid,
  Button,
  Platform,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";

import { CustomBlue, HBColor, RestApiUrl } from "../../../Constants";
import FormText from "../../../components/FormText";
import { getCategories } from "../../../service/useCategory";
import { createBooks } from "../../../service/useBooks";
import FormPicker from "../../../components/FormPicker";
import MyTouchableBtn from "../../../components/MyToachableBtn";
import UserContext from "../../../context/userContext";
export default () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  const [book, setBook] = useState({
    bookname: "",
    author: "",
    content: "",
    pages: "",
    price: "",
    count: "",
    salePrice: 0,
    category: "",
    photo: null,
  });
  const [error, setError] = useState({
    bookname: false,
    author: false,
    content: false,
    pages: false,
    price: false,
    count: false,
    salePrice: false,
  });

  let categoriesName = [],
    catID = [];
  useEffect(() => {
    getCategories()
      .then((result) => {
        setCategories(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (categories.length > 0 && categoriesName.length == 0) {
    categories.map((el) => {
      categoriesName.push(el.name);
    });
  }
  if (categories.length > 0 && catID.length == 0) {
    categories.map((el) => {
      catID.push(el._id);
    });
  }
  const checkName = (text) => {
    setError({
      ...error,
      bookname: text.length < 5 || text.length > 25,
    });

    setBook({
      ...book,
      bookname: text,
    });
  };

  const checkAuthor = (text) => {
    setError({
      ...error,
      author: text.length < 5 || text.length > 25,
    });
    setBook({
      ...book,
      author: text,
    });
  };
  const checkpages = (text) => {
    setError({
      ...error,
      pages: parseInt(text) > 2000,
    });
    setBook({
      ...book,
      pages: text,
    });
  };
  const checkPrice = (text) => {
    setError({
      ...error,
      price: parseInt(text) > 1000000,
    });
    setBook({
      ...book,
      price: text,
    });
  };

  const checkContent = (text) => {
    setError({
      ...error,
      content: text.length < 5 || text.length > 1000,
    });
    setBook({
      ...book,
      content: text,
    });
  };
  const checkCount = (text) => {
    setError({
      ...error,
      count: parseInt(text) > 1000,
    });
    setBook({
      ...book,
      count: text,
    });
  };
  const checkSale = (text) => {
    setError({
      ...error,
      salePrice: text > 100,
    });
    setBook({
      ...book,
      salePrice: text,
    });
  };
  const saveBooks = () => {
    createBooks(
      state.token,
      (data = { ...book, salePrice: parseInt(book.salePrice) / 100 })
    )
      .then((result) => {
        const newBook = result.data.data;
        console.log("===>newBook: >", newBook);

        const xhr = new XMLHttpRequest();
        const data = new FormData();
        data.append("file", {
          uri: book.photo,
          type: "image/jpg",
          name: "test.jpg",
        });
        xhr.open("PUT", `${RestApiUrl}/api/books/${newBook._id}/photo`);
        xhr.send(data);
        ToastAndroid.show(`Шинээр ном нэмэгдлээ`, ToastAndroid.SHORT);
        state.setOverread(!state.Overread);
        navigation.goBack();
      })
      .catch((err) => {
        ToastAndroid.show(
          `Алдаа ${err.response.data.message}`,
          ToastAndroid.SHORT
        );
      });
  };
  // Storage read image
  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setBook({ ...book, photo: result.assets[0].uri });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: HBColor }}>
      <StatusBar backgroundColor={HBColor} />
      <View
        style={{
          flex: 0.5,
          paddingHorizontal: 20,
          backgroundColor: HBColor,
        }}
      ></View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={800}
        style={{
          flex: 8,
          paddingVertical: 30,
          paddingHorizontal: 20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <ScrollView>
          <Text style={{ color: HBColor, fontWeight: "bold", fontSize: 20 }}>
            Номын мэдээлэл
          </Text>
          <Text style={{ color: HBColor, fontSize: 12 }}>Шинээр ном нэмэх</Text>
          <View
            style={{
              flex: 1,
              marginTop: 20,
              borderRadius: 15,
            }}
          >
            <TouchableOpacity onPress={handleChoosePhoto}>
              <View>
                <Image
                  source={{
                    uri: book.photo
                      ? book.photo
                      : "https://www.shutterstock.com/image-vector/cloud-upload-icon-260nw-755589382.jpg",
                  }}
                  style={{
                    height: 150,
                    marginHorizontal: 50,
                    borderRadius: 10,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <FormText
            label="Номын нэр"
            placeholder="Номын нэр"
            icon="book-open"
            value={book.name}
            onChangeText={checkName}
            errorText="Номын нэрийн урт 5-25 тэмдэгтээс тогтоно."
            errorShow={error.bookname}
          />
          <FormText
            label="Зохиолч"
            placeholder="Зохиогчийн нэр"
            icon="user"
            value={book.author}
            onChangeText={checkAuthor}
            errorText="Зохиолчийн нэрийн урт 5-25 тэмдэгтээс тогтоно."
            errorShow={error.author}
          />
          <FormText
            label="Хуудасны тоо"
            keyboardType="numeric"
            placeholder="Хуудасны тоо"
            icon="clipboard"
            value={book.pages}
            onChangeText={checkpages}
            errorText="Номын хуудасны тоо хэт их байна."
            errorShow={error.pages}
          />
          <FormText
            label="Номын үнэ"
            keyboardType="numeric"
            placeholder="Номын үнэ"
            icon="dollar-sign"
            value={book.price}
            onChangeText={checkPrice}
            errorText="Номын үнэ хэт урт тэмдэгт байна."
            errorShow={error.price}
          />
          <FormText
            label="Sale"
            keyboardType="numeric"
            placeholder="0-100"
            icon="heart"
            value={book.salePrice}
            onChangeText={checkSale}
            errorText="Номын 0-100 хувь буюу 3 тэмдэгтээс хэтрэхгүй."
            errorShow={error.salePrice}
          />
          <FormText
            label="Номын тоо"
            keyboardType="numeric"
            placeholder="Номын тоо"
            icon="clipboard"
            value={book.count}
            onChangeText={checkCount}
            errorText="Номын тоо хэт их байна."
            errorShow={error.count}
          />
          <FormText
            label="Номын агуулга"
            placeholder="Номын агуулга "
            style={{ fontSize: 10 }}
            icon="edit"
            multiline
            numberOfLines={10}
            value={book.content}
            onChangeText={checkContent}
            errorText="Номын тайлбар 5-с дэээш 1000 хүртэлх тэмдэгтээс хэтрэхгүй"
          />
          <FormPicker
            label="Номын категори :"
            value={book.category}
            icon="layers"
            data={categoriesName}
            values={catID}
            onValueChange={(value, index) => {
              setBook({ ...book, category: value });
            }}
          />

          <View style={{ marginTop: 10 }}>
            <MyTouchableBtn
              iconname="add-circle-outline"
              btncss={{ backgroundColor: CustomBlue }}
              title="Нэмэх"
              onPress={saveBooks}
            />
            <MyTouchableBtn
              iconname="arrow-back-circle"
              btncss={{ backgroundColor: "orange" }}
              title="Буцах"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};
