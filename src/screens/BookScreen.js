import React from 'react'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native'
import { CustomLight, HBColor, HBWhite } from '../Constants'
import useBooks from '../service/useBooks'
import BookItem from './../components/BookItem'
import Spinner from '../components/useComponent/Spinner'
import SearchBook from '../components/SearchBook'
import { View } from 'react-native'
import { useState } from 'react'
import { BookSearchNotFound } from '../components/useComponent/notfound'
export default () => {
  const [books, error, loading] = useBooks()
  const [searchValue, setSearchValue] = useState('')
  if (error) {
    return (
      <Text style={{ color: 'red', margin: 30 }}>Алдаа гарлаа! {error}</Text>
    )
  }
  const filterBooks = books.filter(el => el.bookname.includes(searchValue))
  console.log(filterBooks)
  if (!books) {
    return null
  }
  return (
    <View>
      <SearchBook value={searchValue} onValueChange={setSearchValue} />
      <ScrollView style={{ flexDirection: 'column', marginBottom: '20%' }}>
        {loading && <Spinner />}
        {filterBooks.length > 0 ? (
          filterBooks.map((item, index) => (
            <BookItem
              book={item}
              key={index}
              style={itemCss}
              content={itemCss.content}
            />
          ))
        ) : (
          <BookSearchNotFound />
        )}
      </ScrollView>
    </View>
  )
}
const itemCss = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: 160,
    backgroundColor: HBWhite,
    borderRadius: 15,
    shadowRadius: 4,
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 1
  },
  image: {
    width: '40%',
    borderRadius: 15,
    marginVertical: 2
  },
  count: {
    position: 'absolute',
    top: 5,
    left: 5,
    fontSize: 14,
    padding: 5,
    backgroundColor: HBColor,
    color: CustomLight,
    borderRadius: 15
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 6
  },
  bookName: {
    color: HBColor,
    fontSize: 14
  },
  author: {
    color: HBColor,
    fontWeight: 'bold',
    fontSize: 15
  },
  sale: {
    color: 'green',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 13
  },
  price: {
    textAlign: 'left',
    flex: 1,
    fontWeight: 'bold',
    fontSize: 13,
    color: 'green'
  },
  rate: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 10
  },
  content: {
    color: HBColor,
    fontSize: 10,
    paddingVertical: 10
  }
})
