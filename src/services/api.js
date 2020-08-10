import axios from 'axios';

export const setTokenHeader = (token) => {
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete axios.defaults.headers.common['Authorization'];
};

function apiRequest(method, path, payload) {
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](path, payload)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error.response.data.error));
  });
}

export default apiRequest;
