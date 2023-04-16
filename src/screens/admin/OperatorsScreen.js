import React, { useContext, useEffect, useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import UserContext from "../../context/userContext";
import { getOperators } from "../../service/admin/useOperator";

export default () => {
  const state = useContext(UserContext);
  const [operators, setOperator] = useState(null);
  useEffect(() => {
    getOperators(state.token)
      .then((result) => {
        console.log(result.data.data);
        setOperator(result.data.data);
      })
      .catch((err) => {
        ToastAndroid.show(
          `Алдаа: ${err.response.data.message}`,
          ToastAndroid.SHORT
        );
      });
  }, [state.Overread]);
  return operators ? (
    <View>
      <Text>{operators.length}</Text>
    </View>
  ) : (
    <></>
  );
};
