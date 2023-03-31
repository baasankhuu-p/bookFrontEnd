//Доор байрлах 5 icon  өөрчлөх хэсэг
export const IconName = routeName => {
  switch (routeName) {
    case 'Tab1':
      return 'home'
    case 'Tab2':
      return 'book'
    case 'Tab3':
      return 'shopping-cart'
    case 'Tab4':
      return 'truck'
    case 'Tab5':
      return 'user'
    default:
      return 'question'
  }
}
//Хэт урт байвал таслах
export const getTextSubst = (text, count = text.length) => {
  if (text.length <= count) {
    return text
  }
  return text.substr(0, count) + '...'
}
