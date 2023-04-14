import axios from "axios";
import { RestApiUrl } from "../Constants";
export default () => {
  return axios.get(`${RestApiUrl}/api/books`);
};
