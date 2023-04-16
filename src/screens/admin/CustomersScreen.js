import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UserContext from "../../context/userContext";
import { getCustomers } from "../../service/admin/useCustomer";
import { BackgroundBlueColor, CustomLight, HBColor } from "../../Constants";
import { getTextSubst } from "../../utils/functions";

export default () => {
  const state = useContext(UserContext);
  const [customers, setCustomer] = useState(null);
  useEffect(() => {
    getCustomers(state.token)
      .then((result) => {
        setCustomer(result.data.customer);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state.Overread]);
  const [oItem, setItem] = useState({});
  const onHandlerItem = ({ data }) => {
    setItem(data);
  };

  return (
    <>
      {customers && customers.length > 0 ? (
        <View style={{ flex: 1, backgroundColor: BackgroundBlueColor }}>
          {/* screen */}
          <ScrollView contentContainerStyle={css.container}>
            <View style={css.innerContainer}>
              <Text style={css.count}>
                Үйлчлүүлэгчийн тоо: {customers.length}
              </Text>
            </View>
            <View>
              <View style={{ ...css.item, ...css.itemTitle }}>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}>Нэр</Text>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}></Text>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}>
                  У/Дугаар
                </Text>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}>
                  Г/Хаяг
                </Text>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}>Огноо</Text>
                <Text style={{ ...css.infoitem, ...css.infoTitle }}>
                  {"  "}
                </Text>
              </View>
            </View>
            {customers.map((item, index) => {
              return (
                <View key={index}>
                  <View style={css.item}>
                    <Text style={css.infoitem}>
                      {item.fname.substr(0, 1).charAt(0).toUpperCase()}.
                      {getTextSubst(item.fname, 8).charAt(0).toUpperCase() +
                        item.fname.slice(1)}
                    </Text>
                    <Text style={css.infoitem}>{item.phone}</Text>
                    <Text style={css.infoitem}>
                      {getTextSubst(item.address, 8)}
                    </Text>
                    <Text style={css.infoitem}>
                      {item.CreatedDate.split("T")[0]}
                    </Text>
                    <TouchableOpacity onPress={() => onHandlerItem(item)}>
                      <Ionicons
                        name="md-information-circle-outline"
                        style={{
                          ...css.infoitem,
                          fontSize: 15,
                          borderRadius: 10,
                        }}
                        size={15}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <></>
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
    marginHorizontal: 5,
    marginVertical: 2,
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  itemTitle: {
    paddingVertical: 10,
    marginTop: 0,
    backgroundColor: HBColor,
  },
  infoitem: {
    color: HBColor,
    fontSize: 11,
    fontWeight: "bold",
  },
  infoTitle: {
    color: CustomLight,
    fontSize: 13,
  },
});
