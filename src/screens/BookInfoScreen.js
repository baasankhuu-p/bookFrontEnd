import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native'
const thousandify = require('thousandify')
import Star from 'react-native-star-view'
import { MaterialIcons } from '@expo/vector-icons'
import IncDecInput from '../components/useComponent/IncDecInput '
import {
  BackgroundBlueColor,
  HBColor,
  HBWhite,
  OCustomGray
} from '../Constants'
import { getTextSubst } from '../utils/functions'
import useComments from '../service/useComments'
import { CommentNull } from '../components/useComponent/notfound'
import { FlatList } from 'react-native'
export default ({ route }) => {
  const [order, setOrder] = useState(1)
  const book = route.params.book
  const [comments, error] = useComments(book.id)
  const [sale, setSale] = useState(false)
  const [show, setShow] = useState(false)
  if (error) {
    return (
      <Text style={{ color: 'red', margin: 30 }}>Алдаа гарлаа! {error}</Text>
    )
  }
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
                    : {
                        color: 'green'
                      }
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
            <IncDecInput max={book.count} order={order} setOrder={setOrder} />
          </View>
          <TouchableOpacity onPress={() => console.log(order)}>
            <MaterialIcons name='bookmark-border' size={26} color={HBColor} />
          </TouchableOpacity>
        </View>
        <View style={[css.containheader, css.content]}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: HBColor }}>
            Тайлбар:{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShow(!show)
            }}
          >
            {show ? (
              <Text>
                {'  '} {book.content}(
                <Text
                  style={{
                    color: HBColor,
                    fontWeight: 'bold',
                    textDecorationLine: 'underline'
                  }}
                >
                  хураах
                </Text>
                )
              </Text>
            ) : (
              <Text style={css.text}>
                {'  '} {getTextSubst(book.content, 100)}(
                <Text
                  style={{
                    color: HBColor,
                    fontWeight: 'bold',
                    textDecorationLine: 'underline'
                  }}
                >
                  дэлгэрэнгүй
                </Text>
                )
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={[css.containheader, css.comment]}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: HBColor }}>
            Сэтгэгдэл:{' '}
          </Text>
          <View>
            {comments.length > 0 ? (
              <FlatList
                horizontal
                data={comments}
                renderItem={({ item, index }) => {
                  return (
                    <View key={index} style={css.commentSCitem}>
                      <Star score={item.Rating} style={css.commentrate} />
                      <Text style={{ fontSize: 12 }}>
                        {' '}
                        {getTextSubst(item.Comment, 100)}{' '}
                      </Text>
                      <View style={css.customer}>
                        <Text style={css.customername}>
                          {item.CustomerId.fname.substr(0, 1)}
                        </Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                          {item.CustomerId.fname}
                        </Text>
                      </View>
                    </View>
                  )
                }}
              />
            ) : (
              <CommentNull text={{ fontSize: 12, color: 'gray' }} />
            )}
          </View>
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
    flex: 2,
    flexDirection: 'row'
  },
  contain2: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
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
  rate: {
    width: 100,
    height: 20
  },
  content: {
    flex: 1,
    marginHorizontal: 10
  },
  text: {
    fontSize: 12
  },
  comment: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 20
  },
  commentrate: {
    height: 20,
    width: 100
  },
  commentSCitem1: {
    width: 240,
    backgroundColor: HBWhite,
    borderRadius: 15,
    shadowRadius: 4,
    margin: 4,
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  commentSCitem: {
    width: 220,
    height: 130,
    backgroundColor: HBWhite,
    borderRadius: 10,
    shadowRadius: 4,
    marginHorizontal: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  customer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  customername: {
    backgroundColor: 'gray',
    color: HBWhite,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 50,
    marginHorizontal: 5,
    fontSize: 18
  },
  commentwrite: {}
})
