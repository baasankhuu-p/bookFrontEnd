import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView
} from "react-native";
import { mainColor, lightColor, textColor } from "../../Constants";
import * as Animatable from "react-native-animatable";
import FormText from "../components/FormText";

const BookAdd = () => {
  const [book, setBook] = useState({
    name: "Элон Маск",
    author: "Ашли Ванс",
    price: "20000",
    content:
      "Элон маскийн амьдрал, бизнесийн салбарын хэрхэн оргилд хүрсэн тухай гайхалтай түүхийг өөрийнх нь ярианаас сэдэвлэн бичсэн гайхалтай ном.",
    bestseller: true
  });

  const checkName = text => {
    setBook({
      ...book,
      name: text
    });
  };

  const checkPrice = text => {
    setBook({
      ...book,
      price: text
    });
  };

  const checkAuthor = text => {
    setBook({
      ...book,
      author: text
    });
  };

  const checkContent = text => {
    setBook({
      ...book,
      content: text
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <StatusBar backgroundColor={mainColor} barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: mainColor
        }}
      >
        <Text style={{ fontSize: 30, color: lightColor }}>
          Шинээр ном нэмэх
        </Text>
        <Text style={{ fontSize: 16, color: lightColor, marginTop: 10 }}>
          Та номын мэдээллээ оруулна уу
        </Text>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        duration={800}
        style={{
          flex: 5,
          paddingHorizontal: 20,
          paddingVertical: 30,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30
        }}
      >
        <ScrollView>
          <Text>{book.name}</Text>
          <FormText
            label="Номын нэрийг оруулна уу"
            placeholder="Номын нэр"
            icon="book-open"
            value={book.name}
            onChangeText={checkName}
          />

          <FormText
            label="Номын зохиогчийг оруулна уу"
            placeholder="Зохиогчийн нэр"
            icon="user"
            value={book.author}
            onChangeText={checkAuthor}
          />

          <FormText
            label="Номын үнийг оруулна уу"
            keyboardType="numeric"
            placeholder="Номын үнэ"
            icon="dollar-sign"
            value={book.price}
            onChangeText={checkPrice}
          />

          <FormText
            label="Номын тайлбарыг оруулна уу"
            placeholder="Номын тайлбар 1000 тэмдэгтээс хэтрэхгүй"
            style={{ fontSize: 10 }}
            icon="edit"
            multiline
            numberOfLines={10}
            value={book.content}
            onChangeText={checkContent}
          />
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default BookAdd;

const styles = StyleSheet.create({});
