import axios from "axios";
import { RestApiUrl } from "../../Constants";

export const CreateOrder = (BookID, quantity, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return axios.post(
    `${RestApiUrl}/api/orders/`,
    {
      BookID,
      quantity,
    },
    config
  );
};
export const getOrder = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return axios.get(`${RestApiUrl}/api/orders`, config);
};

export const getConfirmOrder = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${RestApiUrl}/api/orders/confirm`, config);
};
export const deletebookOrder = (BookID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${RestApiUrl}/api/orders/${BookID}`, config);
};

export const orderPay = (token) => {
  const config = {
    headers: { Authorization: "Bearer " + token },
  };
  return axios.post(`${RestApiUrl}/api/payment`, null, config);
};
