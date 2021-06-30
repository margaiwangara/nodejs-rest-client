import {
  SET_CURRENT_USER,
  SEND_TWO_FACTOR_CODE,
  CONFIRM_TWO_FACTOR_CODE,
  REMOVE_CURRENT_USER,
} from '../actionTypes';
import apiRequest, { setTokenHeader } from '@/services/api';
import { addError } from './error';
import { RETURN_URL } from '@/utils/constants';

function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user,
});

export const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER,
});

export const set2faCode = (code, expiry) => ({
  type: SEND_TWO_FACTOR_CODE,
  code,
  expiry,
});

export const unset2faCode = () => ({
  type: CONFIRM_TWO_FACTOR_CODE,
});

function logoutUser(dispatch) {
  return new Promise((resolve, reject) => {
    if (window.localStorage.getItem('jwt')) {
      // clear localStorage
      window.localStorage.removeItem('jwt');
      dispatch(removeCurrentUser());
      resolve();
    }

    reject();
  });
}

function authUser(dispatch, page, formValue, history, setLoading) {
  // check for return url
  const returnUrl = window.localStorage.getItem(RETURN_URL);

  return new Promise((resolve, reject) => {
    return apiRequest('post', `/api/auth/${page}`, formValue)
      .then(({ token }) => {
        // if register or login // if login ?
        if (page === 'login') {
          // check if email if confirmed

          setAuthorizationToken(token);
          getUserDetails().then((userResponse) => {
            const { isEmailConfirmed, twoFactorEnable } = userResponse;
            //
            //
            if (!isEmailConfirmed) {
              const emailConfirmError = {
                message:
                  'Please confirm your email address to access your account',
              };

              dispatch(addError(emailConfirmError));
              return;
            }

            // if 2fa is enabled send 2fa code else set token and redirect to home
            if (twoFactorEnable) {
              setLoading(true);
              send2faCode()
                .then(({ code, expiration }) => {
                  //

                  dispatch(set2faCode(code, expiration));
                  setLoading(false);
                  // set jwt token in localStorage
                  window.localStorage.setItem('jwt', token);
                  history.push('/two-factor');
                })
                .catch((error) => {
                  //
                  setLoading(false);
                  history.push('/login');
                });
            } else {
              // set jwt
              window.localStorage.setItem('jwt', token);
              // dispatch user details
              const { ...userDetails } = userResponse;
              dispatch(setCurrentUser(userDetails));

              // clear local storage
              window.localStorage.removeItem(RETURN_URL);
              history.replace(returnUrl || '/');
            }
          });
        } else if (page === 'register') {
          window.localStorage.removeItem(RETURN_URL);
          history.replace(returnUrl || '/');
        }
        resolve();
      })
      .catch((error) => {
        dispatch(addError(error));
        reject();
      });
  });
}

function send2faCode() {
  return new Promise((resolve, reject) => {
    return apiRequest('put', '/api/auth/two-factor')
      .then(({ code, expiration }) => {
        // store expiration in localStorage
        // window.localStorage.setItem("two_factor_expire", expiration);
        resolve({ code, expiration });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function confirm2faCode(code, dispatch) {
  return new Promise((resolve, reject) => {
    return apiRequest('post', '/api/auth/two-factor', { code })
      .then(() => {
        dispatch(unset2faCode());
        resolve();
      })
      .catch((error) => {
        dispatch(addError(error));
        reject();
      });
  });
}

function getUserDetails() {
  return new Promise((resolve, reject) => {
    return apiRequest('get', '/api/auth/account')
      .then(({ data }) => {
        resolve(data);
      })
      .catch((error) => {
        reject();
      });
  });
}

function forgotPassword(formData) {
  return new Promise((resolve, reject) => {
    return apiRequest('post', '/api/auth/forgotpassword', formData)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function resetPassword(queryData, formData) {
  return new Promise((resolve, reject) => {
    return apiRequest(
      'post',
      `/api/auth/resetpassword?token=${queryData}`,
      formData,
    )
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export {
  authUser,
  send2faCode,
  confirm2faCode,
  getUserDetails,
  setAuthorizationToken,
  forgotPassword,
  resetPassword,
  logoutUser,
};
