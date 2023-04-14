import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

export default () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => {
        navigation.navigate("Home", {});
      }}
    >
      <Image
        source={require("./../assets/image/png/logo.png")}
        style={{ width: 150, height: 50, borderBottomWidth: 1 }}
      />
    </TouchableOpacity>
  );
};
const css = StyleSheet.create({
  logo: {},
});
