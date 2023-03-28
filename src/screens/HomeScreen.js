import React, { useState } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import useCategory from '../service/useCategory'
import { CategoryBookList, SearchBook } from '../components'
import { BackgroundBlueColor, ErrColor } from '../Constants'
export default () => {
  const [searchValue, setSearchValue] = useState('')
  const [categories, errorMessage, searchCategory] = useCategory()
  return (
    <ScrollView style={css.container}>
      <SearchBook
        value={searchValue}
        onValueChange={setSearchValue}
        onFinishEnter={() => searchCategory(searchValue)}
      />
      {errorMessage ? (
        <Text style={css.error}>{errorMessage}</Text>
      ) : (
        categories.map(category => (
          <CategoryBookList
            searchValue={searchValue}
            key={category._id}
            style={{ marginVertical: 10 }}
            data={category}
          />
        ))
      )}
    </ScrollView>
  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: BackgroundBlueColor,
    flex: 1,
    padding: 10
  },
  error: {
    color: ErrColor,
    marginHorizontal: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
})
