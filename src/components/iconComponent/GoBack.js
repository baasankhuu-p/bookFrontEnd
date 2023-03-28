import { Image } from 'react-native'

export default () => {
  return (
    <Image
      source={require('../../assets/image/png/back.png')}
      style={{ width: 25, height: 25, marginLeft: 15 }}
    />
  )
}
