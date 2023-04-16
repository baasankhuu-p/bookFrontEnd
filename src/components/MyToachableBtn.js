import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HBColor, OCustomGray } from "../Constants";

const MyTouchableBtn = ({
  title,
  iconname = "",
  btncss = {},
  txtcss = {},
  onPress = undefined,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[css.information, btncss]}>
        <Ionicons style={css.infoIcon} size={25} name={iconname} />
        <Text style={[css.infoText, txtcss]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const css = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 4,
  },

  information: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 2,
    padding: 10,
    backgroundColor: HBColor,
    borderColor: OCustomGray,
    borderWidth: 2,
    borderRadius: 10,
  },
  infoIcon: {
    color: "white",
  },
  infoText: {
    marginLeft: 10,
    textTransform: "capitalize",
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
});
export default MyTouchableBtn;
