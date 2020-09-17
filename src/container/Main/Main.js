import React, { useEffect } from 'react';
import { useHistory, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setAuthorizationToken,
  removeCurrentUser,
  getUserDetails,
  setCurrentUser,
} from '@/store/actions/auth';
import { userData } from '@/utils/user';

const Login = React.lazy(() => import('@/views/Auth/Login'));
const Register = React.lazy(() => import('@/views/Auth/Register'));
const TwoFactor = React.lazy(() => import('@/views/Auth/TwoFactor'));
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
        .then((data) => {
          const userDetails = userData(data);
          dispatch(setCurrentUser(userDetails));
        })
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
      <PublicRoute
        exact
        path="/two-factor"
        name="Two Factor"
        component={TwoFactor}
      />
      <PrivateRoute path="/" component={DefaultLayout} />
    </Switch>
  );
}

export default Main;
