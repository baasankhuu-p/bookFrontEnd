import React, { useState } from 'react' //React librarr using
import { Text, StyleSheet, ScrollView, View } from 'react-native' //reactnaitve-iin (core) component-uud
import { CustomLight, HBColor, HBWhite } from '../Constants' // Uund programmdaa ashglah undsen unguud bolon API hostoo tohiruulj ogsn
import useBooks from '../service/useBooks' //API-tai haritsah code
import BookItem from './../components/BookItem' // hereglegchiin component->Nom bolgoniig neg component bolgoj avsn
import Spinner from '../components/useComponent/Spinner' //  hereglegchiin component ->reload hiij bhd tur huleene uu gesen achaalliig haruulah
import SearchBook from '../components/SearchBook' // hereglegchiin component->nom haih
import { BookSearchNotFound } from '../components/useComponent/notfound' // hereglegchiin component->hooson uyd delgetsiig hooson gesn message-tei delgetseer duurgeh
export default () => {
  const [books, error, loading] = useBooks() //API-d bolovsruulalt hiij butsaah datag huvisagechidd hadgalj baina
  const [searchValue, setSearchValue] = useState('') //Hailtiin utgiig hadgalah state
  if (error) {
    //aldaa baival aldaanii text haruulna
    return (
      <Text style={{ color: 'red', margin: 30 }}>Алдаа гарлаа! {error}</Text>
    )
  }
  const filterBooks = books.filter(el => el.bookname.includes(searchValue)) //Hailt hiij bn filter, Include functs ni javascript-n san bogood filter ni shuuj avah include ni tuhain ogogdol dotor ene temdegt baina uu gesen shalgaltiig hiih uuregtei
  if (!books) {
    //nom baihgui bol BookSearchNotFound gesen hereglegchiin componentiig delgetsend zurna
    return <BookSearchNotFound />
  }
  return (
    //Datagaa haruulj bui baidal
    <View>
      <SearchBook value={searchValue} onValueChange={setSearchValue} />
      <ScrollView style={{ flexDirection: 'column', marginBottom: '20%' }}>
        {loading && <Spinner />}
        {filterBooks.length > 0 ? (
          filterBooks.map((item, index) => (
            <BookItem // Bookitem ni hereglegchiin component bogood props-oor book,key,style,content-g damjuulna
              book={item}
              key={index}
              style={itemCss}
              content={itemCss.content}
            />
          ))
        ) : (
          <BookSearchNotFound /> //nom baihgui bol BookSearchNotFound gesen hereglegchiin componentiig delgetsend zurna
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
