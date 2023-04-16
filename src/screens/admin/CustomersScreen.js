import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import UserContext from "../../context/userContext";
import { getCustomers } from "../../service/admin/useCustomer";

export default () => {
  const state = useContext(UserContext);
  const [customers, setCustomer] = useState(null);
  useEffect(() => {
    if (state.token) {
      getCustomers(state.token)
        .then((result) => {
          console.log(result.data.data);
          setCustomer(result.data.data);
        })
        .catch((err) => {
          ToastAndroid.show(
            `Алдаа: ${err.response.data.message}`,
            ToastAndroid.SHORT
          );
        });
    }
  }, [state.Overread]);
  return customers ? (
    <ScrollView>
      <Text>Total: {customers.length}</Text>
      {customers.map((el, index) => (
        <View key={index}>
          <Text>{el._id}</Text>
          <Text>{el.address}</Text>
          <Text>{el.email}</Text>
          <Text>{el.fname}</Text>
          <Text>{el.lname}</Text>
          <Text>{el.phone}</Text>
          <Text></Text>
        </View>
      ))}
    </ScrollView>
  ) : (
    <></>
  );
};
