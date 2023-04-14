import axios from "axios";
import { RestApiUrl } from "../../Constants";

export const getConfirmDelivery = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${RestApiUrl}/api/delivery`, config);
};
