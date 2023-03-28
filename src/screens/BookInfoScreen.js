import React, { useEffect, useState } from 'react'
import { Image, ScrollView, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
const thousandify = require('thousandify')
import Star from 'react-native-star-view'
import IncDecInput from '../components/useComponent/IncDecInput '
import {
  BackgroundBlueColor,
  CustomLight,
  HBColor,
  OCustomGray
} from '../Constants'
export default ({ route }) => {
  const [order, setOrder] = useState(0)
  console.log('=>', order)
  const book = route.params.book
  const [sale, setSale] = useState(false)
  useEffect(() => {
    book.salePrice > 0 ? setSale(true) : setSale(false)
  }, [route])
  return (
    <ScrollView style={css.container}>
      <View style={css.contain}>
        <View style={[css.containheader, css.contain1]}>
          <Image
            style={{ ...css.image }}
            source={{
              uri: `https://book.mn/timthumb.php?src=https://book.mn/uploads/products/${book.photo}&w=400`
            }}
          />
          <View style={css.bookinfo}>
            <Text
              style={{
                fontWeight: 'bold',
                color: HBColor
              }}
            >
              {book.bookname}
            </Text>
            <Text style={css.infoItem}>
              <Text style={css.bookininfo}>Зохиолч: </Text>
              <Text style={css.infoVal}> {book.author}</Text>
            </Text>
            <Text style={css.infoItem}>
              <Text style={css.bookininfo}>Хэвлэгдсэн огноо: </Text>
              <Text style={css.infoVal}> {book.entryDate.split('T')[0]}</Text>
            </Text>
            <Text style={css.infoItem}>
              <Text style={css.bookininfo}>Хуудас: </Text>
              <Text style={css.infoVal}>{book.pages}</Text>
            </Text>
            <Text style={css.infoItem}>
              <Text style={css.bookininfo}>Үндсэн үнэ: </Text>
              <Text
                style={[
                  css.infoVal,
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
            </Text>
            {sale && (
              <Text style={css.infoItem}>
                <Text style={css.bookininfo}>Хямдарсан үнэ: </Text>
                {thousandify(book.price - book.price * book.salePrice)} ₮
              </Text>
            )}
            <Text style={css.infoItem}>
              <Text style={css.bookininfo}>Үлдсэн: </Text>
              <Text style={css.infoVal}> {book.count} ш</Text>
            </Text>
          </View>

          <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
            {book.averageRating >= 1 && (
              <Star score={book.averageRating} style={css.rate} />
            )}
          </View>
        </View>
        <View style={[css.containheader, css.contain2]}>
          <View>
            <IncDecInput max={book.count} setOrder={setOrder} />
          </View>
          <TouchableOpacity>
            <Text style={css.order}>Захиалах</Text>
          </TouchableOpacity>
        </View>
        <View style={css.content}>
          <Text>{book.content}</Text>
        </View>
      </View>
    </ScrollView>
  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: BackgroundBlueColor,
    flex: 1,
    padding: 10
  },
  image: {
    flex: 2,
    height: 200,
    borderRadius: 10,
    shadowColor: HBColor
  },
  contain: {
    flex: 1,
    flexDirection: 'column'
  },
  containheader: {
    paddingVertical: 10,
    borderBottomColor: OCustomGray,
    borderBottomWidth: 2
  },
  contain1: {
    flexDirection: 'row'
  },
  contain2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  bookinfo: {
    flex: 3,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    paddingVertical: 15,
    fontSize: 10
  },
  bookininfo: {
    fontWeight: 'bold',
    fontSize: 12,
    justifyContent: 'flex-start'
  },
  infoVal: {
    fontSize: 12,
    justifyContent: 'flex-end'
  },
  order: {
    backgroundColor: HBColor,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: CustomLight,
    borderRadius: 3,
    fontSize: 15
  },
  rate: {
    width: 100,
    height: 20
  }
})
