import React, { useState } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import qs from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addError, removeError } from '@/store/actions/error';
import { resetPassword } from '@/store/actions/auth';
import Loading from '@/utils/Loading';
import FullLoading from '@/components/Loading/Loading';
import { wrapperStyling, passwordToggleStyle } from '@/utils/styling';
import TitleComponent from '@/container/DefaultLayout/TitleComponent';

const INITIAL_STATE = {
  password: '',
  confirm_password: '',
};

function ResetPassword() {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false);
  const [value, setValue] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const parsed = qs.parse(location.search);
  const token = parsed.token;
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.error);

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // check if password and confirm password match
    if (value.password !== value.confirm_password) {
      const confirmError = {
        message: 'Password and Confirm Password must match',
      };
      dispatch(addError(confirmError));
      setLoading(false);
      return;
    }

    // make request
    resetPassword(token, value)
      .then(() => {
        dispatch(removeError());
        setLoading(false);
        history.push('/login');
      })
      .catch((error) => {
        setLoading(false);
        dispatch(addError(error));
      });
  };

  return (
    <div className="container">
      <TitleComponent title="Reset Password" />
      <div style={wrapperStyling} className="row">
        <div className="col-md-6 offset-md-3">
          <React.Suspense fallback={Loading()}>
            <div
              className="card"
              style={{ marginTop: '20vh', position: 'relative' }}
            >
              {loading && <FullLoading />}
              <div className="card-body">
                {!token ? (
                  <div className="d-flex flex-column p-3 align-items-center">
                    <i className="fa fa-times-circle fa-5x text-danger"></i>
                    <p className="h6 text-center" style={{ margin: '15px 0' }}>
                      Unauthorized Access. Please provide a valid token to reset
                      your password.
                    </p>
                    <Link to="/login" className="btn btn-primary btn-block">
                      Go to Login
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="text-center border-bottom mb-3">
                      <h3>Reset Password</h3>
                    </div>
                    {error ? (
                      <div className="alert alert-danger">
                        {Array.isArray(error.message) ? (
                          <ul className="list-unstyled p-0 m-0">
                            {error.message.map((e, i) => (
                              <li key={i}>{e}</li>
                            ))}
                          </ul>
                        ) : (
                          error.message
                        )}
                      </div>
                    ) : (
                      ''
                    )}
                    <div
                      className="form-group"
                      style={{ position: 'relative' }}
                    >
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
                        type={passwordToggle ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="new-password"
                        name="password"
                        value={value.password}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ position: 'relative' }}
                    >
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
                        type={confirmPasswordToggle ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        name="confirm_password"
                        value={value.confirm_password}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <button type="submit" className="btn btn-block btn-primary">
                      Reset Password
                    </button>
                    <div className="mt-3">
                      <Link to="/login" className="btn btn-secondary btn-block">
                        <FontAwesomeIcon icon="chevron-left" className="mr-1" />{' '}
                        Go to Login
                      </Link>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
