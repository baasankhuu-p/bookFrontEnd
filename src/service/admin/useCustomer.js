import axios from "axios";
import { RestApiUrl } from "../../Constants";
export const getCustomers = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${RestApiUrl}/api/customer`, config);
};

export const updateCustomer = (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    fname: data.fname,
    lname: data.lname,
    address: data.address,
    email: data.email,
    phone: data.phone,
  };
  return axios.put(`${RestApiUrl}/api/customer`, body, config);
};
