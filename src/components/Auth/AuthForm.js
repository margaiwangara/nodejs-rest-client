import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuthForm from '@/hooks/authForm';

function AuthForm({ page, btnText, heading }) {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false);
  const { value, handleChange, handleSubmit: onSubmit } = useAuthForm(page);
  const { handleSubmit, register, errors } = useForm();

  return (
    <div className="card" style={{ marginTop: '20vh' }}>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-center pb-2 border-bottom mb-3">{heading}</h3>
          {page === 'register' ? (
            <div className="form-group">
              <input
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                type="text"
                name="name"
                placeholder="Name"
                value={value.name}
                onChange={handleChange}
                ref={register({ required: true })}
              />
              {errors.name && (
                <span className="invalid-feedback">Name is required</span>
              )}
            </div>
          ) : (
            ''
          )}
          <div className="form-group">
            <input
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              type="email"
              name="email"
              placeholder="E-Mail"
              value={value.email}
              onChange={handleChange}
              ref={register({ required: true })}
            />
            {errors.email && (
              <span className="invalid-feedback">Name is required</span>
            )}
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <span
              onClick={(e) => setPasswordToggle(!passwordToggle)}
              style={passwordToggleStyle}
            >
              <FontAwesomeIcon
                icon={passwordToggle ? 'eye-slash' : 'eye'}
                color="#375a7f"
              />
            </span>
            <input
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              type={passwordToggle ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={value.password}
              onChange={handleChange}
              ref={register({ required: true })}
            />
            {errors.password && (
              <span className="invalid-feedback">Password is required</span>
            )}
          </div>
          {page === 'register' ? (
            <div className="form-group" style={{ position: 'relative' }}>
              <span
                style={passwordToggleStyle}
                onClick={(e) =>
                  setConfirmPasswordToggle(!confirmPasswordToggle)
                }
              >
                <FontAwesomeIcon
                  icon={confirmPasswordToggle ? 'eye-slash' : 'eye'}
                  color="#375a7f"
                />
              </span>
              <input
                className={`form-control ${
                  errors.confirm_password ? 'is-invalid' : ''
                }`}
                type={confirmPasswordToggle ? 'text' : 'password'}
                name="confirm_password"
                placeholder="Confirm Password"
                value={value.confirm_password}
                onChange={handleChange}
                ref={register({ required: true })}
              />
              {errors.confirm_password && (
                <span className="invalid-feedback">
                  Confirm Password is required
                </span>
              )}
            </div>
          ) : (
            ''
          )}

          <button className="btn btn-primary btn-block mb-3" type="submit">
            {btnText}
          </button>

          <div className="text-center p-t-115">
            <span className="txt1">
              {page === 'login'
                ? 'Don’t have an account? '
                : page === 'register'
                ? 'Already a member? '
                : ''}
            </span>

            {page === 'login' ? (
              <Link to="/register" className="txt2">
                Register
              </Link>
            ) : page === 'register' ? (
              <Link to="/login" className="txt2">
                Login
              </Link>
            ) : (
              ''
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

const passwordToggleStyle = {
  position: 'absolute',
  right: 0,
  padding: '0.375rem 0.75rem',
  cursor: 'pointer',
};
export default AuthForm;
