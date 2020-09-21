import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  authUser,
  forgotPassword,
  setAuthorizationToken,
  getUserDetails,
  setCurrentUser,
} from '@/store/actions/auth';
import { addError, removeError } from '@/store/actions/error';
import apiRequest from '@/services/api';
import { useToasts } from 'react-toast-notifications';
import { userData } from '@/utils/user';

const INITIAL_STATE = {
  name: '',
  surname: '',
  email: '',
  password: '',
  confirm_password: '',
};

function useAuthForm(page) {
  const [value, setValue] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    // e.preventDefault();
    setLoading(true);
    authUser(dispatch, page, value, history, setLoading)
      .then(() => {
        setLoading(false);
        console.log('Login Success');
      })
      .catch(() => {
        setLoading(false);
        console.log('Login Failed');
      });
  };

  const googleLoginSuccess = (response) => {
    setLoading(true);
    apiRequest('post', '/api/auth/google', { tokenId: response.tokenId })
      .then(({ token }) => {
        setAuthorizationToken(token);
        getUserDetails()
          .then((userResponse) => {
            // set jwt
            window.localStorage.setItem('jwt', token);
            // dispatch user details
            const userDetails = userData(userResponse);
            dispatch(setCurrentUser(userDetails));
            setLoading(false);
            history.push('/');
          })
          .catch((error) => console.log('Login With Google Failed'));
      })
      .catch((error) => dispatch(addError(error)));
  };

  const googleLoginFailure = (response) => {
    const content = 'Google login failed. Please try again later';
    addToast(content, {
      appearance: 'error',
      autoDismiss: true,
    });
    console.log('failure', response);
  };

  const responseFacebook = (response) => {
    setLoading(true);
    apiRequest('post', '/api/auth/facebook', {
      accessToken: response.accessToken,
      userId: response.userID,
    })
      .then(({ token }) => {
        setAuthorizationToken(token);
        getUserDetails()
          .then((userResponse) => {
            // set jwt
            window.localStorage.setItem('jwt', token);
            // dispatch user details
            const userDetails = userData(userResponse);
            dispatch(setCurrentUser(userDetails));
            setLoading(false);
            history.push('/');
          })
          .catch((error) => console.log('Login With Facebook Failed'));
      })
      .catch((error) => {
        const content = 'Facebook login failed. Please try again later';
        addToast(content, {
          appearance: 'error',
          autoDismiss: true,
        });
        console.log('Facebook Login Error', error);
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!value.email) {
      const error = {
        message: 'Please provide an email address',
      };

      dispatch(addError(error));
      setLoading(false);
      return;
    }

    forgotPassword(value)
      .then(() => {
        dispatch(removeError());
        setLoading(false);
        const content =
          'An email to reset your password has been sent to the email address provided.';
        addToast(content, {
          appearance: 'success',
          autoDismiss: true,
        });
      })
      .catch((error) => {
        dispatch(addError(error));
        setLoading(false);
      });
  };

  return {
    value,
    loading,
    handleChange,
    handleSubmit,
    handleForgotPassword,
    googleLoginSuccess,
    googleLoginFailure,
    responseFacebook,
  };
}

export default useAuthForm;
