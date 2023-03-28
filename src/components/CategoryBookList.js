import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { CustomBlue } from '../Constants'
import useBook from '../service/useBook'
import { getTextSubst } from '../utils/functions'
import BookItem from './BookItem'

export default ({ data, searchValue }) => {
  const [books, errorMessage, searchBook] = useBook(data.id)
  const filterBooks = books.filter(el => el.bookname.includes(searchValue))
  return filterBooks.length > 0 ? (
    <View>
      <View style={css.row}>
        <Text style={css.title}>{data.name}</Text>
        <Text style={css.desc}>{getTextSubst(data.description, 100)}</Text>
        {errorMessage ? (
          <Text style={css.error}>{errorMessage}</Text>
        ) : (
          <FlatList
            style={{ overflow: 'hidden' }}
            horizontal
            data={filterBooks}
            renderItem={({ item }) => <BookItem book={item} />}
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
    color: 'black',
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
