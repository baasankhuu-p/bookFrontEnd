import axios from "axios";
import { RestApiUrl } from "../../Constants";

export const getNotDelivery = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${RestApiUrl}/api/delivery/not`, config);
};

export const createDeliveries = (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(`${RestApiUrl}/api/delivery`, data, config);
};

export const getConfirmDelivery = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${RestApiUrl}/api/delivery/all`, config);
};
