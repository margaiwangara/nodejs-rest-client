import { GET_USERS } from '../actionTypes';
import apiRequest from '@/services/api';

export const getUsersAction = (data) => ({
  type: GET_USERS,
  ...data,
});

function getUsers(dispatch) {
  return new Promise((resolve, reject) => {
    return apiRequest('get', '/api/users')
      .then(({ count, data }) => {
        dispatch(getUsersAction({ count, users: data }));
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
}

export { getUsers };
