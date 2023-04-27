import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
} from "react-native";
import {
  BackgroundBlueColor,
  CustomLight,
  HBColor,
  OCustomGray,
  RestApiUrl,
} from "../../Constants";

export default ({ deliveries }) => {
  return (
    <ScrollView style={css.container}>
      {deliveries.map((el, i) => {
        return (
          <View key={i} style={css.item}>
            <View style={css.itemInfo}>
              <View style={css.info}>
                <Text
                  style={{
                    color: HBColor,
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  Хүргэгдсэн огноо: {el.date.split("T")[0]}
                  {"  "}
                  {el.date.split("T")[1].split(":")[0]}:
                  {el.date.split("T")[1].split(":")[1]}:
                  {el.date.split(":")[2].split(".")[0]}
                </Text>
              </View>
            </View>

            <FlatList
              data={el.item}
              horizontal
              renderItem={({ item }) => (
                <>
                  <Image
                    style={css.image}
                    source={{
                      uri: `${RestApiUrl}/upload/book/${
                        item.BookId.photo ? item.BookId.photo : "no-photo.png"
                      }`,
                    }}
                  />
                  <Text style={css.quantity}>{item.Quantity}ш</Text>
                </>
              )}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};
const css = StyleSheet.create({
  container: {
    backgroundColor: BackgroundBlueColor,
  },
  item: {
    backgroundColor: CustomLight,
    borderWidth: 2,
    borderColor: OCustomGray,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  itemInfo: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
  info: { flex: 1, flexDirection: "row" },
  title: {
    color: HBColor,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: OCustomGray,
  },
  quantity: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 2,
    backgroundColor: CustomLight,
    color: HBColor,
    borderColor: HBColor,
    borderWidth: 0.2,
    fontWeight: "bold",
    paddingHorizontal: 2,
    borderRadius: 10,
  },
});
