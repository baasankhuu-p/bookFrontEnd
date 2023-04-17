import axios from "axios";
import { RestApiUrl } from "../Constants";
export const getBooks = () => {
  return axios.get(`${RestApiUrl}/api/books`);
};

export const editBooks = (token, bookid, data) => {
  config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.update(`${RestApiUrl}/api/books/${bookid}`, data, config);
};

export const uploadImageBooks = (token, bookid, data) => {
  // ...
};
