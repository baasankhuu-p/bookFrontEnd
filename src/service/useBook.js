import { useState, useEffect } from 'react'
import axios from 'axios'
import { RestApiUrl } from '../Constants'
export default category => {
  const [books, setBooks] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const searchBooks = () => {
    console.log('Хайлт эхэллээ...')
  }

  useEffect(() => {
    axios
      .get(`${RestApiUrl}/api/v1/categories/${category}/books?limit=500`)
      .then(result => {
        console.log('Номыг амжилттай хүлээж авлаа...')
        setBooks(result.data.data)
        setErrorMessage(null)
      })
      .catch(err => {
        let message = err.message
        if (message === 'Request failed with status code 404') {
          message = 'Сервердээр алдаа гарлаа'
        } else if (message === 'Network Error') {
          message =
            'Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу.'
          setErrorMessage(message)
        }
      })
  }, [])

  return [books, errorMessage, searchBooks]
}
