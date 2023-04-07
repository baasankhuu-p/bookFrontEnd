import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import useCategory from '../service/useCategory'
import { CategoryBookList, SearchBook } from '../components'
import { BackgroundBlueColor, ErrColor } from '../Constants'
import Spinner from '../components/useComponent/Spinner'
import toastInfo from '../components/useComponent/toastInfo'
import UserContext from '../context/userContext'
export default () => {
  const [searchValue, setSearchValue] = useState('')
  const [categories, errorMessage, searchCategory, loading] = useCategory()
  const state = useContext(UserContext)
  console.log('=>', state.isUsersRole)
  useEffect(() => {
    toastSet()
  }, [errorMessage, searchCategory])
  const toastSet = () => {
    if (errorMessage) {
      Toast.show(toastInfo('error', errorMessage, 3000))
    } else if (categories.length > 0) {
      Toast.show(toastInfo('success', '👋👋👋', 3000))
    }
  }
  return (
    <ScrollView style={css.container}>
      <SearchBook
        value={searchValue}
        onValueChange={setSearchValue}
        onFinishEnter={() => searchCategory(searchValue)}
      />
      <Toast ref={ref => Toast.setRef(ref)} />
      {loading && <Spinner />}
      {categories &&
        categories.map(category => (
          <CategoryBookList
            searchValue={searchValue}
            key={category._id}
            style={{ marginVertical: 10 }}
            data={category}
          />
        ))}
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
