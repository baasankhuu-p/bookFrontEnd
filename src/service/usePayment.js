import axios from "axios";
import { RestApiUrl } from "../Constants";

export const getPaymentAll = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${RestApiUrl}/api/payment/all`, config);
};
