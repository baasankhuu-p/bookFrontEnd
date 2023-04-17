import axios from "axios";
import { RestApiUrl } from "../../Constants";
export const getCustomers = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${RestApiUrl}/api/customer`, config);
};

export const updateCustomers = (token, data, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(`${RestApiUrl}/api/customer/${id}`, data, config);
};
export const updateCustomer = (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(`${RestApiUrl}/api/customer`, data, config);
};
export const createCustomer = (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(`${RestApiUrl}/api/customer`, data, config);
};
export const deleteCustomer = (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${RestApiUrl}/api/customer/${id}`, config);
};
