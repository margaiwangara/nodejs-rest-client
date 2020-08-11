import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUserDetails,
  setAuthorizationToken,
  set2faCode,
  send2faCode,
  confirm2faCode,
  setCurrentUser,
  removeCurrentUser,
} from '@/store/actions/auth';
import { addError } from '@/store/actions/error';
import CountDown from 'react-countdown';
import { wrapperStyling } from '@/utils/styling';
import Loading from '@/utils/Loading';

const INITIAL_STATE = {
  code: '',
};

function TwoFactor() {
  const [value, setValue] = useState(INITIAL_STATE);
  const history = useHistory();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.error);
  const { code, expiry } = useSelector((state) => state.user);

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(INITIAL_STATE);
    // check if code matches
    confirm2faCode(value.code, dispatch).then(() => {
      const token = window.localStorage.getItem('jwt');
      if (token) {
        getUserDetails()
          .then(
            ({
              email,
              name,
              createdAt,
              profileImage,
              twoFactorCode,
              twoFactorCodeExpire,
              recoveryEmail,
              twoFactorEnable,
            }) => {
              const userDetails = {
                email,
                name,
                createdAt,
                profileImage,
                twoFactorCode,
                twoFactorCodeExpire,
                recoveryEmail,
                twoFactorEnable,
              };
              dispatch(setCurrentUser(userDetails));
              history.push('/');
            },
          )
          .catch(() => dispatch(removeCurrentUser()));
      }
      history.push('/login');
    });
  };

  useEffect(() => {
    // get jwt from localstorage and populate state
    const token = window.localStorage.getItem('jwt');
    if (token) {
      // set token as header
      setAuthorizationToken(token);
      // get user data
      getUserDetails()
        .then(({ twoFactorCode, twoFactorCodeExpire }) => {
          // if code doesn't exist push to dashboard
          if (!twoFactorCode) {
            history.push('/');
          }
          // set 2facode
          dispatch(set2faCode(twoFactorCode, twoFactorCodeExpire));
        })
        .catch(() => {
          // redirect to login
          history.push('/login');
        });
    } else {
      // redirect
      history.push('/login');
    }
  }, [code]);

  const resendCode = (e) => {
    // send 2fa code
    send2faCode()
      .then(({ code, expiry }) => {
        dispatch(set2faCode(code, expiry));
      })
      .catch((error) => addError(error));
  };

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed || minutes < 1) {
      return (
        <span className="text-danger">
          {minutes}:{seconds}
        </span>
      );
    } else {
      return (
        <span className="text-success">
          {minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <div className="container">
      <div className="row" style={wrapperStyling}>
        <div className="col-md-6 offset-md-3">
          <React.Suspense fallback={Loading()}>
            <div className="card" style={{ marginTop: '20vh' }}>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="text-center border-bottom mb-3">
                    <h3>Two Factor Authentication</h3>
                    <p className="text-muted mb-1">
                      Please input the code sent to your e-mail address to
                      access your account.{' '}
                      {expiry ? (
                        <span>
                          The code will expire in:{' '}
                          <span
                            className="font-weight-bold d-block"
                            style={{ fontSize: '2.5rem' }}
                          >
                            {<CountDown date={expiry} renderer={renderer} />}
                          </span>
                        </span>
                      ) : (
                        ''
                      )}
                    </p>
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
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Code"
                      name="code"
                      value={value.code}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <button className="btn btn-primary btn-block" type="submit">
                    Submit Code
                  </button>
                  <button
                    className="btn btn-secondary btn-block"
                    type="button"
                    onClick={resendCode}
                  >
                    Resend Code
                  </button>
                </form>
              </div>
            </div>
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}

export default TwoFactor;
