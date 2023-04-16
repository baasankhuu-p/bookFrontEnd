import axios from "axios";
import { RestApiUrl } from "../../Constants";
export const getOperators = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${RestApiUrl}/api/manage`, config);
};

export const updateManage = (token, data, id) => {
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
