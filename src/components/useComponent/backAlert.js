import { Alert } from 'react-native'
export default navigation => {
  Alert.alert('Анхаар!!', 'Та үнэхээр буцахыг хүсч байна уу?', [
    {
      text: 'Болих'
    },
    {
      text: 'Буцах',
      onPress: () => navigation.goBack()
    }
  ])
}
