import axios from "axios";
import { RestApiUrl } from "../../Constants";
export const getOperators = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${RestApiUrl}/api/manage`, config);
};

export const updateOperator = (token, data, id) => {
  const body = {
    username: data.username,
    email: data.email,
    phone: data.phone,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(`${RestApiUrl}/api/manage/${id}`, body, config);
};
export const createOperator = (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(`${RestApiUrl}/api/manage`, data, config);
};
export const deleteOperator = (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${RestApiUrl}/api/manage/${id}`, config);
};
