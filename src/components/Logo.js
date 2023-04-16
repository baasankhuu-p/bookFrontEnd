import { View, Image, StyleSheet } from "react-native";

export default () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("./../assets/image/png/logo.png")}
        style={{ width: 150, height: 50, borderBottomWidth: 1 }}
      />
    </View>
  );
};
const css = StyleSheet.create({
  logo: {},
});
