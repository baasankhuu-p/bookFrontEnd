import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CustomLight, HBColor, OCustomGray } from "../Constants";

export default ({
  onChangeText,
  value,
  secureTextEntry,
  autoCapitalize,
  placeholder,
  iconname,
  keyboardType,
}) => {
  // return <TextInput {...props} style={styles.textInput} />
  return (
    <View style={css.information}>
      <Ionicons style={css.infoIcon} size={25} name={iconname} />
      <TextInput
        onChangeText={onChangeText}
        value={value}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        style={css.infoTxt}
        keyboardType={keyboardType}
      />
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
  infoIcon: { color: HBColor, marginRight: 10 },
  infoTxt: {
    width: "80%",
    fontSize: 15,
    color: HBColor,
    fontWeight: "bold",
  },
});
