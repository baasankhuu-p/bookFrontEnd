import React from 'react'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import {
  CustomBlue,
  CustomLight,
  HBColor,
  HBWhite,
  OpacityHBColor
} from '../Constants'
import useCategoryBooks from '../service/useCategoryBooks'
import { getTextSubst } from '../utils/functions'
import BookItem from './BookItem'

export default ({ data, searchValue }) => {
  const [show, setShow] = useState(false)
  const [books, errorMessage, searchBook] = useCategoryBooks(data.id)
  const filterBooks = books.filter(el => el.bookname.includes(searchValue))
  return filterBooks.length > 0 ? (
    <View>
      <View style={css.row}>
        <Text style={css.title}>{data.name}</Text>
        <TouchableOpacity
          onPress={() => {
            setShow(!show)
          }}
        >
          {show ? (
            <Text style={css.desc}>
              {getTextSubst(data.description)}(
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
            <Text style={css.desc}>
              {getTextSubst(data.description, 70)}(
              <Text
                style={[
                  {
                    color: HBColor,
                    fontWeight: 'bold',
                    textDecorationLine: 'underline'
                  }
                ]}
              >
                дэлгэрэнгүй
              </Text>
              )
            </Text>
          )}
        </TouchableOpacity>
        {errorMessage ? (
          <Text style={css.error}>{errorMessage}</Text>
        ) : (
          <FlatList
            style={{ overflow: 'hidden' }}
            horizontal
            data={filterBooks}
            renderItem={({ item }) => (
              <BookItem book={item} style={itemCss} textLen={16} />
            )}
          />
        )}
      </View>
    </View>
  ) : (
    <View></View>
  )
}

const css = StyleSheet.create({
  row: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10
  },
  title: {
    color: HBColor,
    fontWeight: 'bold',
    fontSize: 15,
    paddingHorizontal: 10,
    paddingTop: 5
  },
  desc: {
    paddingHorizontal: 10,
    fontSize: 12,
    color: CustomBlue,
    paddingTop: 5
  },
  error: {
    color: '#e02130',
    marginHorizontal: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
  }
})
const itemCss = StyleSheet.create({
  card: {
    width: 130,
    backgroundColor: HBWhite,
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
    color: 'green',
    textAlign: 'left',
    flex: 1,
    fontWeight: 'bold',
    fontSize: 13
  },
  price: {
    color: 'green',
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
