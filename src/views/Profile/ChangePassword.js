import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiRequest from '@/services/api';
import { addError, removeError } from '@/store/actions/error';
import ErrorDisplay from '@/components/Error/ErrorDisplay';

const INITIAL_STATE = {
  current_password: '',
  password: '',
  confirm_password: '',
};

function ChangePassword() {
  const [value, setValue] = useState(INITIAL_STATE);
  const { error } = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    apiRequest('put', '/api/auth/account/edit/password', {
      ...value,
      oldPassword: value.current_password,
      confirmPassword: value.confirm_password,
    })
      .then((res) => {
        console.log('changed password');
        alert('Password changed successfully');
        dispatch(removeError());
        setValue(INITIAL_STATE);
      })
      .catch((error) => {
        dispatch(addError(error));
      });
  };
  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <h4 className="pb-2 mb-3 border-bottom">Change Password</h4>
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
          <button type="submit" className="btn btn-primary btn-block">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
