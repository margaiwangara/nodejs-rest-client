import axios from 'axios';
import { BASE_URL } from '@/utils/env';

export const setTokenHeader = (token) => {
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete axios.defaults.headers.common['Authorization'];
};

function apiRequest(method, path, payload) {
  return new Promise((resolve, reject) => {
    return axios
      .request({
        method,
        url: path,
        baseURL: BASE_URL,
        data: payload,
        withCredentials: true,
      })
      .then((res) => resolve(res.data))
      .catch((error) => {
        //
        reject(error?.response?.data?.error);
      });
  });
}

export default apiRequest;
