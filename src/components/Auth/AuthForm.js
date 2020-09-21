import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { removeError } from '@/store/actions/error';
import useAuthForm from '@/hooks/authForm';
import { passwordToggleStyle } from '@/utils/styling';
import { GoogleLogin } from 'react-google-login';
import googleIcon from '@/assets/images/google.svg';
import facebookIcon from '@/assets/images/facebook.svg';
import { GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID } from '@/utils/env';
import FullLoading from '@/components/Loading/Loading';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import SocialButton from '@/utils/SocialButton';
import ErrorDisplay from '@/components/Error/ErrorDisplay';

function AuthForm({ page, btnText, heading }) {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false);
  const {
    value,
    handleChange,
    handleSubmit: onSubmit,
    handleForgotPassword,
    googleLoginSuccess,
    googleLoginFailure,
    responseFacebook,
    loading,
  } = useAuthForm(page);
  const { handleSubmit, register, errors } = useForm();
  const { error } = useSelector((state) => state.error);
  const history = useHistory();
  const dispatch = useDispatch();

  history.listen(() => {
    dispatch(removeError());
  });

  return (
    <div className="card" style={{ marginTop: '20vh', position: 'relative' }}>
      {loading && <FullLoading />}
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-center pb-2 border-bottom mb-3">{heading}</h3>
          <ErrorDisplay error={error} />
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
          {page === 'login' && (
            <span
              className="small d-flex justify-content-end"
              style={{ marginTop: '-12px', marginBottom: '10px' }}
            >
              <Link to="/forgot-password" onClick={handleForgotPassword}>
                Forgot Password?
              </Link>
            </span>
          )}
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

          {page === 'login' && (
            <>
              <div className="d-flex align-items-center mt-4">
                <span
                  className="d-block border border-secondary"
                  style={{ borderWidth: '5px', flex: 2 }}
                ></span>
                <span className="px-2 text-muted text-uppercase">OR</span>
                <span
                  className="d-block border border-secondary"
                  style={{ borderWidth: '5px', flex: 2 }}
                ></span>
              </div>
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                render={(props) => (
                  <SocialButton
                    renderProps={props}
                    btnProps={{
                      btnClass: 'btn-outline-secondary',
                      icon: googleIcon,
                      btnText: 'Login With Google',
                    }}
                  />
                )}
                onSuccess={googleLoginSuccess}
                onFailure={googleLoginFailure}
                cookiePolicy={'single_host_origin'}
              />

              <FacebookLogin
                appId={FACEBOOK_CLIENT_ID}
                callback={responseFacebook}
                render={(props) => (
                  <SocialButton
                    renderProps={props}
                    btnProps={{
                      btnClass: `facebook-btn ${
                        process.env.NODE_ENV === 'development' ? 'disabled' : ''
                      }`,
                      icon: facebookIcon,
                      btnText: 'Login With Facebook',
                    }}
                  />
                )}
              />
            </>
          )}

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

export default AuthForm;
