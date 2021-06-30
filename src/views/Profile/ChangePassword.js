import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiRequest from '@/services/api';
import { addError, removeError } from '@/store/actions/error';
import ErrorDisplay from '@/components/Error/ErrorDisplay';
import TitleComponent from '@/container/DefaultLayout/TitleComponent';
import { useToast } from '@/hooks/useToast';

const INITIAL_STATE = {
  current_password: '',
  password: '',
  confirm_password: '',
};

function ChangePassword() {
  const [value, setValue] = useState(INITIAL_STATE);
  const { error } = useSelector((state) => state.error);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    apiRequest('put', '/api/auth/account/edit/password', {
      ...value,
      oldPassword: value.current_password,
      confirmPassword: value.confirm_password,
    })
      .then((res) => {
        setLoading(false);
        dispatch(removeError());
        setValue(INITIAL_STATE);
        return toast?.success('Password updated');
      })
      .catch((error) => {
        setLoading(false);
        setValue(INITIAL_STATE);
        dispatch(addError(error));
        return toast?.error('Password update failed');
      });
  };
  return (
    <>
      <TitleComponent title="Change Password" />
      <section className="default-inner__end--shared shadow">
        <form onSubmit={handleSubmit} className="p-2 w-100">
          <ErrorDisplay error={error} />
          <div className="form-group">
            <label htmlFor="currentPasswordField">Current Password</label>
            <input
              type="password"
              className="form-control"
              id="currentPasswordField"
              name="current_password"
              value={value.current_password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordField">Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordField"
              name="password"
              value={value.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPasswordField">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPasswordField"
              name="confirm_password"
              value={value.confirm_password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </form>
      </section>
    </>
  );
}

export default ChangePassword;
