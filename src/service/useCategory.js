import { useState, useEffect } from 'react'
import axios from 'axios'
import { RestApiUrl } from '../Constants'
export default () => {
  const [categories, setCategories] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const searchCategory = searchValue => {
    console.log('Хайлт эхэллээ...', searchValue)
  }

  useEffect(() => {
    axios
      .get(`${RestApiUrl}/api/v1/categories`)
      .then(result => {
        console.log('Категорийг амжилттай хүлээж авлаа...')
        setCategories(result.data.data)
        setErrorMessage(null)
      })
      .catch(err => {
        let message = err.message
        if (message === 'Request failed with status code 404')
          message = 'Сервердээр алдаа гарлаа'
        else if (message === 'Network Error')
          message =
            'Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу.'
        else message = 'Алдаа гарлаа' + err
        setErrorMessage(message)
      })
  }, [])

  return [categories, errorMessage, searchCategory]
}
