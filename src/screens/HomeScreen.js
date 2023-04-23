import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { CategoryBookList, SearchBook } from "../components";
import { getCategories } from "../service/useCategory";
import { BackgroundBlueColor, ErrColor } from "../Constants";
import Spinner from "../components/useComponent/Spinner";
import UserContext from "../context/userContext";
import { ToastAndroid } from "react-native";
export default () => {
  const state = useContext(UserContext);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [categories] = useCategory();
  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((result) => {
        setCategories(result.data.data);
        setLoading(false);
      })
      .catch((err) => {
        ToastAndroid.show(
          `Алдаа гарлаа: ${
            err.response.data ? err.response.data.message : err.message
          }`,
          ToastAndroid.SHORT
        );
        setLoading(false);
      });
  }, []);
  return (
    <ScrollView style={css.container}>
      <SearchBook value={searchValue} onValueChange={setSearchValue} />
      {loading && <Spinner />}
      {categories &&
        categories.map((category) => (
          <CategoryBookList
            key={category._id}
            searchValue={searchValue}
            style={{ marginVertical: 10 }}
            data={category}
          />
        ))}
    </ScrollView>
  );
};
const css = StyleSheet.create({
  container: {
    backgroundColor: BackgroundBlueColor,
    flex: 1,
  },
  error: {
    color: ErrColor,
    marginHorizontal: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
