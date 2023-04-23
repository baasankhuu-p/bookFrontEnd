import { useContext, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { CustomBlue, HBColor } from "../../../Constants";
import FormText from "../../../components/FormText";
import MyTouchableBtn from "../../../components/MyToachableBtn";
import UserContext from "../../../context/userContext";
import { updateCategory } from "../../../service/useCategory";
export default ({ route }) => {
  console.log(route.params.data);
  const state = useContext(UserContext);
  const navigation = useNavigation();

  const [category, setCategory] = useState(route.params.data);
  const [error, setError] = useState({
    name: false,
    description: false,
  });

  const checkName = (text) => {
    setError({
      ...error,
      name: text.length < 5 || text.length > 25,
    });

    setCategory({
      ...category,
      name: text,
    });
  };

  const checkContent = (text) => {
    setError({
      ...error,
      description: text.length < 5 || text.length > 1000,
    });
    setCategory({
      ...category,
      description: text,
    });
  };
  const saveCategory = () => {
    if (category) {
      updateCategory(state.token, category, category._id)
        .then((result) => {
          ToastAndroid.show(
            `Категорийн мэдээллийг амжилттай өөрчиллөө`,
            ToastAndroid.SHORT
          );
          state.setOverread(!state.Overread);
          navigation.goBack();
        })
        .catch((err) => {
          ToastAndroid.show(
            `Алдаа ${err.response.data.message}`,
            ToastAndroid.SHORT
          );
        });
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
            Категорийн мэдээллийг өөрчлөх
          </Text>
          <FormText
            label="Категорийн нэр"
            placeholder="Категорийн нэр"
            icon="book-open"
            value={category.name}
            onChangeText={checkName}
            errorText="Категорийн нэрийн урт 5-25 тэмдэгтээс тогтоно."
            errorShow={error.name}
          />
          <FormText
            label="Категорийн агуулга"
            placeholder="Категорийн агуулга "
            style={{ fontSize: 10 }}
            icon="edit"
            multiline
            numberOfLines={10}
            value={category.description}
            onChangeText={checkContent}
            errorText="Категорийн тайлбар 5-с дэээш 1000 хүртэлх тэмдэгтээс хэтрэхгүй"
          />

          <View style={{ marginTop: 10 }}>
            <MyTouchableBtn
              iconname="add-circle-outline"
              btncss={{ backgroundColor: CustomBlue }}
              title="Хадгалах"
              onPress={saveCategory}
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
