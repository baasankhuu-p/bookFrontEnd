//icon set
export const IconName = (routeName, focused) => {
  switch (routeName) {
    case "Нүүр":
      return focused ? "home" : "home-outline";
    case "Ном":
      return focused ? "book" : "book-outline";
    case "Захиалга":
      return focused ? "cart" : "cart-outline";
    case "Хүргэлт":
    case "Хүргэлтүүд":
      return focused ? "car" : "car-outline";
    case "Профайл":
    case "Ажилтан":
      return focused ? "person" : "person-outline";
    case "Оператор":
      return focused ? "shield-checkmark" : "shield-checkmark-outline";
    case "Үйлчлүүлэгчид":
      return focused ? "md-people" : "md-people-outline";
    case "Категори":
      return focused ? "bookmarks" : "bookmarks-outline";
    case "Гүйлгээ":
      return focused ? "md-wallet" : "md-wallet-outline";
    default:
      return "question";
  }
};
//length substr
export const getTextSubst = (text, count = text.length) => {
  if (text.length <= count) {
    return text;
  }
  return text.substr(0, count) + "...";
};
