import axios from "axios";
import { RestApiUrl } from "../Constants";
export const getCategories = () => {
  return axios.get(`${RestApiUrl}/api/categories`);
};
export const deleteCategory = (token, catid) => {
  config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${RestApiUrl}/api/categories/${catid}`, config);
};
export const createCategory = (token, data) => {
  config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(`${RestApiUrl}/api/categories/`, data, config);
};

export const updateCategory = (token, data, catid) => {
  config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(`${RestApiUrl}/api/categories/${catid}`, data, config);
};
