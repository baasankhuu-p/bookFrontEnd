import { useState, useEffect } from 'react'
import axios from 'axios'
import { RestApiUrl } from '../Constants'
export default bookID => {
  const [comments, setComments] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    axios
      .get(`${RestApiUrl}/api/comment/${bookID}`)
      .then(result => {
        console.log('Сэтгэгдлүүдийг амжилттай хүлээж авлаа...')
        setComments(result.data.comment)
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

  return [comments, errorMessage]
}
