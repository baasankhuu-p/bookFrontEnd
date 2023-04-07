import { useState, useEffect } from 'react'
import axios from 'axios'
import { RestApiUrl } from '../Constants'
export default () => {
  const [categories, setCategories] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const searchCategory = searchValue => {
    console.log('Хайлт эхэллээ...', searchValue)
  }

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${RestApiUrl}/api/categories`)
      .then(result => {
        console.log('Категорийг амжилттай хүлээж авлаа...')
        setCategories(result.data.data)
        setErrorMessage(null)
        setLoading(false)
      })
      .catch(err => {
        let message = err.message
        if (message === 'Request failed with status code 404') {
          message = 'Сервердээр алдаа гарлаа'
          setLoading(false)
        } else if (message === 'Network Error') {
          message =
            'Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу.'
          setLoading(false)
        } else {
          message = 'Алдаа гарлаа ' + err
          setErrorMessage(message)
          setLoading(false)
        }
      })
  }, [])
  return [categories, errorMessage, searchCategory, loading]
}
