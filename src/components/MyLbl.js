import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CustomLight, HBColor, OCustomGray } from "../Constants";

export default ({ text, iconname, lblcss, txtcss, icncss }) => {
  return (
    <View style={[css.information, lblcss]}>
      <Ionicons style={[css.infoIcon, icncss]} size={25} name={iconname} />
      <Text style={[css.infoText, txtcss]}>{text}</Text>
    </View>
  );
};

const css = StyleSheet.create({
  information: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 2,
    padding: 10,
    backgroundColor: CustomLight,
    borderColor: OCustomGray,
    borderWidth: 2,
    borderRadius: 10,
  },
  infoIcon: {
    color: HBColor,
  },
  infoText: {
    marginLeft: 10,
    textTransform: "capitalize",
    fontSize: 15,
    color: HBColor,
    fontWeight: "bold",
  },
});
