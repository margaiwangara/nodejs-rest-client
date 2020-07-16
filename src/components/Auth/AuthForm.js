import React from 'react';
import { Link } from 'react-router-dom';

function AuthForm({ page, btnText, heading }) {
  return (
    <form className="login100-form validate-form">
      <span className="login100-form-title p-b-26">{heading}</span>
      <span className="login100-form-title p-b-48">
        <i className="zmdi zmdi-font"></i>
      </span>
      {page === 'register' ? (
        <div className="wrap-input100 validate-input">
          <input
            className="input100"
            type="text"
            name="name"
            placeholder="Name"
          />
        </div>
      ) : (
        ''
      )}
      <div className="wrap-input100 validate-input">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="E-Mail"
        />
      </div>

      <div className="wrap-input100 validate-input">
        <span className="btn-show-pass">
          <i className="zmdi zmdi-eye"></i>
        </span>
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>
      {page === 'register' ? (
        <div className="wrap-input100 validate-input">
          <span className="btn-show-pass">
            <i className="zmdi zmdi-eye"></i>
          </span>
          <input
            className="input100"
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
          />
        </div>
      ) : (
        ''
      )}

      <div className="container-login100-form-btn">
        <div className="wrap-login100-form-btn">
          <div className="login100-form-bgbtn"></div>
          <button className="login100-form-btn" type="submit">
            {btnText}
          </button>
        </div>
      </div>

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
  );
}

export default AuthForm;
