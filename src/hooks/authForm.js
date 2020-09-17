import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  authUser,
  forgotPassword,
  setAuthorizationToken,
  getUserDetails,
  send2faCode,
  set2faCode,
  setCurrentUser,
} from '@/store/actions/auth';
import { addError, removeError } from '@/store/actions/error';
import apiRequest from '@/services/api';

const INITIAL_STATE = {
  name: '',
  surname: '',
  email: '',
  password: '',
  confirm_password: '',
};

function useAuthForm(page) {
  const [value, setValue] = useState(INITIAL_STATE);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    // e.preventDefault();

    // check if password and confirm password match

    authUser(dispatch, page, value, history)
      .then(() => console.log('Login Success'))
      .catch(() => console.log('Login Failed'));
  };

  const googleLoginSuccess = (response) => {
    apiRequest('post', '/api/auth/google', { tokenId: response.tokenId })
      .then(({ token }) => {
        setAuthorizationToken(token);
        getUserDetails().then((userResponse) => {
          const { twoFactorEnable } = userResponse;
          console.log('twoFactorEnable', twoFactorEnable);

          // if 2fa is enabled send 2fa code else set token and redirect to home
          if (twoFactorEnable) {
            send2faCode()
              .then(({ code, expiration }) => {
                console.log('2faCodeSent. Yayyyy!');
                dispatch(set2faCode(code, expiration));

                // set jwt token in localStorage
                window.localStorage.setItem('jwt', token);
                history.push('/two-factor');
              })
              .catch((error) => {
                console.log('2faCodeError. Nayyyy!', error);
                history.push('/login');
              });
          } else {
            // set jwt
            window.localStorage.setItem('jwt', token);
            // dispatch user details
            const { ...userDetails } = userResponse;
            dispatch(setCurrentUser(userDetails));
            history.push('/');
          }
        });
      })
      .catch((error) => dispatch(addError(error)));
  };

  const googleLoginFailure = (response) => {
    console.log('failure', response);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (!value.email) {
      const error = {
        message: 'Please provide an email address',
      };

      dispatch(addError(error));
      return;
    }

    forgotPassword(value)
      .then(() => {
        dispatch(removeError());
        alert(
          'An email to reset your password has been sent to the email address provided.',
        );
      })
      .catch((error) => {
        dispatch(addError(error));
      });
  };

  return {
    value,
    handleChange,
    handleSubmit,
    handleForgotPassword,
    googleLoginSuccess,
    googleLoginFailure,
  };
}

export default useAuthForm;
