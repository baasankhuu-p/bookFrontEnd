import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Star from 'react-native-star-view'
const thousandify = require('thousandify')
import { getTextSubst } from '../utils/functions'
import { CustomLight, HBColor, OCustomLight } from '../Constants'

export default ({ book }) => {
  const navigation = useNavigation()
  const [sale, setSale] = useState(false)
  useEffect(() => {
    const checkSale = book.price - book.salePrice * book.price
    checkSale < book.price ? setSale(true) : setSale(false)
  }, [book])

  const onPressHandler = () => {
    navigation.navigate('Book', { book })
  }
  return (
    <TouchableOpacity style={css.card} onPress={onPressHandler}>
      {book.photo !== 'no-photo.png' ? (
        <Image
          style={css.image}
          source={{
            uri: `https://book.mn/timthumb.php?src=https://book.mn/uploads/products/${book.photo}&w=400`
          }}
        />
      ) : (
        <Image
          style={css.image}
          source={require('./../assets/image/upload/Book/no-photo.png')}
        />
      )}
      <Text style={css.count}>{book.count} ш </Text>
      <View style={css.info}>
        <Text style={css.bookName}>{getTextSubst(book.bookname, 16)}</Text>
        <Text style={css.author}>{book.author}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={[
              css.price,
              sale
                ? {
                    fontSize: 12,
                    color: 'red',
                    textDecorationLine: 'line-through'
                  }
                : null
            ]}
          >
            {thousandify(book.price)}
          </Text>
          {book.averageRating >= 1 && (
            <Star score={book.averageRating} style={css.rate} />
          )}
        </View>
        {sale && (
          <Text style={css.sale}>
            {thousandify(book.price - book.price * book.salePrice)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}
const css = StyleSheet.create({
  card: {
    width: 130,
    backgroundColor: OCustomLight,
    borderRadius: 15,
    shadowRadius: 4,
    margin: 4,
    padding: 1
  },
  image: {
    height: 130,
    width: 'auto',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  count: {
    position: 'absolute',
    top: 2,
    left: 2,
    fontSize: 10,
    padding: 4,
    backgroundColor: HBColor,
    color: CustomLight,
    borderRadius: 15
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 3,
    paddingHorizontal: 6
  },
  bookName: {
    fontSize: 11
  },
  author: {
    fontWeight: 'bold',
    fontSize: 11
  },
  sale: {
    textAlign: 'left',
    flex: 1,
    fontWeight: 'bold',
    fontSize: 13
  },
  price: {
    textAlign: 'left',
    flex: 1,
    fontWeight: 'bold',
    fontSize: 13
  },
  rate: {
    textAlign: 'right',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: 50,
    height: 10
  }
})
