export default (type, title, date, message) => {
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
