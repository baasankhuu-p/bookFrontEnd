//icon set
export const IconName = (routeName, focused) => {
  switch (routeName) {
    case 'Нүүр':
      return focused ? 'home' : 'home-outline'
    case 'Ном':
      return focused ? 'book' : 'book-outline'
    case 'Захиалга':
      return focused ? 'cart' : 'cart-outline'
    case 'Хүргэлт':
      return focused ? 'car' : 'car-outline'
    case 'Профайл':
      return focused ? 'person' : 'person-outline'
    case 'Оператор':
      return focused ? 'shield-checkmark' : 'shield-checkmark-outline'
    case 'Үйлчлүүлэгчид':
      return focused ? 'md-people' : 'md-people-outline'
    default:
      return 'question'
  }
}
//length substr
export const getTextSubst = (text, count = text.length) => {
  if (text.length <= count) {
    return text
  }
  return text.substr(0, count) + '...'
}

//Toast type message return
export const toastInfo = (type, title, date, message) => {
  return {
    position: 'top',
    type: type,
    text1: title,
    text2: message,
    visibilityTime: date,
    autoHide: true,
    topOffset: 20,
    bottomOffset: 30,
    onShow: () => {},
    onHide: () => {}
  }
}
