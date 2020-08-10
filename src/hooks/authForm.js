import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authUser, forgotPassword } from '@/store/actions/auth';
import { addError, removeError } from '@/store/actions/error';

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
  };
}

export default useAuthForm;
