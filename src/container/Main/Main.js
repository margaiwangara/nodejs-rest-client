import React, { useEffect } from 'react';
import { useHistory, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setAuthorizationToken,
  removeCurrentUser,
  getUserDetails,
  setCurrentUser,
} from '@/store/actions/auth';

const Login = React.lazy(() => import('@/views/Auth/Login'));
const Register = React.lazy(() => import('@/views/Auth/Register'));
const ResetPassword = React.lazy(() =>
  import('@/views/ForgotPassword/ResetPassword'),
);
const DefaultLayout = React.lazy(() =>
  import('@/container/DefaultLayout/DefaultLayout'),
);
const PrivateRoute = React.lazy(() => import('@/components/Auth/PrivateRoute'));
const PublicRoute = React.lazy(() => import('@/components/Auth/PublicRoute'));

function Main() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const authToken = window.localStorage.getItem('jwt');
    if (authToken) {
      setAuthorizationToken(authToken);
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
          },
        )
        .catch(() => dispatch(removeCurrentUser()));
    } else {
      dispatch(removeCurrentUser());
      history.push('/login');
    }
  }, []);
  return (
    <Switch>
      <PublicRoute
        exact
        path="/register"
        name="Register"
        component={Register}
      />
      <PublicRoute exact path="/login" name="Login" component={Login} />
      <PublicRoute
        exact
        path="/reset-password"
        name="Reset Password"
        component={ResetPassword}
      />
      <PrivateRoute path="/" component={DefaultLayout} />
    </Switch>
  );
}

export default Main;
