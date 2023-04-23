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
export const createBooks = (token, data) => {
  config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(`${RestApiUrl}/api/books`, data, config);
};

export const uploadImageBooks = (token, bookid, data) => {
  // ...
};
export const deleteBooks = (token, bookid) => {
  config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${RestApiUrl}/api/books/${bookid}`, config);
};

export const updateBook = (token, data, bookId) => {
  config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(`${RestApiUrl}/api/books/${bookId}`, data, config);
};
