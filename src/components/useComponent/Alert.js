import { Alert } from 'react-native'
import { Order } from '../../service/customer/useOrder'
export const BackAlert = navigation => {
  navigation.goBack()
  // Alert.alert('Анхаар!!', 'Та үнэхээр буцахыг хүсч байна уу?', [
  //   {
  //     text: 'Болих'
  //   },
  //   {
  //     text: 'Буцах',
  //     onPress: () => navigation.goBack()
  //   }
  // ])
}