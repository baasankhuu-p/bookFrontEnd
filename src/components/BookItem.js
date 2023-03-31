import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Star from 'react-native-star-view'
const thousandify = require('thousandify')
import { getTextSubst } from '../utils/functions'

export default ({ book, style, textLen, content = { display: 'none' } }) => {
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
    <View style={style.ViewFrame && style.ViewFrame}>
      <TouchableOpacity style={style.card} onPress={onPressHandler}>
        {book.photo !== 'no-photo.png' ? (
          <Image
            style={style.image}
            source={{
              uri: `https://book.mn/timthumb.php?src=https://book.mn/uploads/products/${book.photo}&w=400`
            }}
          />
        ) : (
          <Image
            style={style.image}
            source={require('./../assets/image/upload/Book/no-photo.png')}
          />
        )}
        <Text style={style.count}>{book.count} ш </Text>
        <View style={style.info}>
          <Text style={style.bookName}>
            {getTextSubst(book.bookname, textLen)}
          </Text>
          <Text style={style.author}>{book.author}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={[
                style.price,
                sale
                  ? {
                      fontSize: 12,
                      color: 'red',
                      textDecorationLine: 'line-through'
                    }
                  : null
              ]}
            >
              {thousandify(book.price)} ₮
            </Text>
            {book.averageRating >= 1 && (
              <Star score={book.averageRating} style={style.rate} />
            )}
          </View>
          {sale && (
            <Text style={style.sale}>
              {thousandify(book.price - book.price * book.salePrice)} ₮
            </Text>
          )}
          <Text style={{ ...content }}>
            Контент: {getTextSubst(book.content, 90)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
