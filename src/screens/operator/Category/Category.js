import { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  ToastAndroid,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../../context/userContext";
import { deleteCategory, getCategories } from "../../../service/useCategory";
import Spinner from "../../../components/useComponent/Spinner";
import SearchBook from "../../../components/SearchBook";

import {
  BackgroundBlueColor,
  HBColor,
  CustomLight,
  OCustomGray,
} from "../../../Constants";
import { getTextSubst } from "../../../utils/functions";

export default () => {
  const state = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [categoryitem, setCategoryItem] = useState(null);
  const [removeItem, setRemoveItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((result) => {
        setLoading(false);
        setCategories(result.data.data);
      })
      .catch((err) => {
        setLoading(false);
        setCategories(null);
        ToastAndroid.show(
          `Алдаа: ${
            err.response.data ? err.response.data.message : err.message
          }`,
          ToastAndroid.SHORT
        );
      });
  }, [state.Overread]);
  const filterCategory = categories.filter((el) =>
    el.name.includes(searchValue)
  );

  const onCategoryDetails = (item) => {
    console.log(item);
    setCategoryItem(item);
    if (categoryitem) {
      setIsVisible(true);
    }
  }; //Categoryin medeelliig oorcloh
  const editCategory = (item) => {
    navigation.navigate("Категори", {
      screen: "EditCategory",
      params: { data: item },
    });
    visibleClose();
  };

  //Category ustgeh
  const removeCategory = (item) => {
    setRemoveItem(item);
    if (removeItem) {
      visibleClose();
      Alert.alert(`Анхаар !`, `'${item.name}' энэ категори-г устгах уу`, [
        {
          text: "Устга",
          onPress: () =>
            deleteCategory(state.token, item._id)
              .then((result) => {
                state.setOverread(!state.Overread);
                visibleClose();
                ToastAndroid.show("Категори устгагдлаа", ToastAndroid.SHORT);
              })
              .catch((err) => {
                ToastAndroid.show(
                  `Категори устгах явцад алдаа гарлаа: ${
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
    setCategoryItem(null);
  };
  return (
    <>
      {categoryitem && (
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
                <Text style={modalcss.titlesmall}>Категори мэдээлэл</Text>

                <View style={modalcss.modalInnerContainer}>
                  <Text style={{ ...modalcss.modalTxt }}>
                    Категорын нэр: {categoryitem.name}
                  </Text>
                </View>
                <View style={modalcss.modalInnerContainer}>
                  <Text style={{ ...modalcss.modalTxt }}>
                    Агуулга:{"  "}
                    <Text style={{ fontWeight: "300" }}>
                      {getTextSubst(categoryitem.description, 200)}
                    </Text>
                  </Text>
                </View>
                <View style={modalcss.buttons}>
                  <TouchableOpacity
                    onPress={() => {
                      editCategory(categoryitem);
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
                      removeCategory(categoryitem);
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
      {categories && (
        <View style={css.container}>
          <View style={css.innerContainer}>
            <SearchBook
              placeholder="Категори хайх..."
              customstyle={{
                width: "70%",
                height: 47,
                borderRadius: 10,
                marginHorizontal: 0,
              }}
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <Text style={css.count}>Нийт: {categories.length}</Text>
          </View>

          {/* category */}
          <ScrollView>
            <View style={{ ...css.item, backgroundColor: HBColor }}>
              <Text
                style={{
                  ...css.catname,
                  ...css.contenttitle,
                }}
              >
                Категори нэр
              </Text>
              <Text
                style={{
                  ...css.catname,
                  ...css.contenttitle,
                }}
              >
                Тайлбар
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
                onPress={() =>
                  navigation.navigate("Категори", { screen: "addCategory" })
                }
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
            {filterCategory &&
              filterCategory.length > 0 &&
              filterCategory.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      onCategoryDetails(item);
                    }}
                  >
                    <View style={css.item}>
                      <Text style={css.catname}>
                        {getTextSubst(item.name, 12)}
                      </Text>
                      <Text style={css.catdescription}>
                        {getTextSubst(item.description, 20)}
                      </Text>
                      <Text style={css.date}>
                        {item.createdAt.split("T")[0]}
                      </Text>
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
      )}
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
  catname: {
    fontSize: 12,
    color: HBColor,
    width: "35%",
  },
  catdescription: {
    fontSize: 12,
    color: HBColor,
    width: "35%",
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
    flex: 0.5,
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
