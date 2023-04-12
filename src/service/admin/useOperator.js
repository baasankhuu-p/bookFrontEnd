import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { RestApiUrl } from '../../Constants'
import UserContext from '../../context/userContext'
export default () => {
  const [resData, setResData] = useState([])
  const [pagenation, setPagenation] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const state = useContext(UserContext)
  const config = {
    headers: { Authorization: `Bearer ${state.token}` }
  }
  useEffect(() => {
    setLoading(true)
    axios
      .get(`${RestApiUrl}/api/manage`, config)
      .then(result => {
        setResData(result.data.data)
        setPagenation(result.data.pagenation)
        console.log(result.data.pagenation)
        setErrorMessage(null)
        setLoading(false)
      })
      .catch(err => {
        let message = err.message
        if (
          err.response.data &&
          err.response.data === 'Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна'
        ) {
          message = 'Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна.'
        } else if (message === 'Request failed with status code 404') {
          message = 'Сервердээр алдаа гарлаа'
          setLoading(false)
        } else if (message === 'Network Error') {
          message =
            'Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу.'
          setLoading(false)
        } else {
          message = 'Алдаа гарлаа' + err
          setErrorMessage(message)
          setLoading(false)
          console.log(message)
        }
      })
  }, [])

  return [resData, pagenation, errorMessage, loading]
}
