import axios from 'axios'
import { RestApiUrl } from '../Constants'
export default category => {
  return axios.get(`${RestApiUrl}/api/categories/${category}/books`)
}
