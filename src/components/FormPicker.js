import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { HBColor, CustomLight } from "../Constants";
import Feather from "react-native-vector-icons/Feather";
const FormText = (props) => {
  return (
    <View>
      <Text style={{ fontSize: 16, paddingTop: 35, color: HBColor }}>
        {props.label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          borderBottomColor: "#f2f2f2",
          borderBottomWidth: 1,
          paddingBottom: 5,
        }}
      >
        <Feather name={props.icon} size={20} color={HBColor} />
        <Picker
          selectedValue={props.value}
          onValueChange={props.onValueChange}
          style={{
            flex: 1,
            color: HBColor,
            textTransform: "capitalize",
            fontSize: 12,
          }}
          itemStyle={{
            color: HBColor,
            fontSize: 16,
          }}
        >
          {props.data.map((category, index) => (
            <Picker.Item
              key={index}
              label={category}
              value={props.values[index]}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default FormText;

const styles = StyleSheet.create({});
