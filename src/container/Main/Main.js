import React, { useEffect } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setAuthorizationToken,
  removeCurrentUser,
  getUserDetails,
  setCurrentUser,
} from '@/store/actions/auth';
import { userData } from '@/utils/user';
import { removeError } from '@/store/actions/error';

const Login = React.lazy(() => import('@/views/Auth/Login'));
const Register = React.lazy(() => import('@/views/Auth/Register'));
const TwoFactor = React.lazy(() => import('@/views/Auth/TwoFactor'));
const ResetPassword = React.lazy(() =>
  import('@/views/ForgotPassword/ResetPassword'),
);
const EmailConfirmation = React.lazy(() =>
  import('@/views/EmailConfirmation/EmailConfirmation'),
);
const NotFound = React.lazy(() => import('@/views/Error/404'));
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
    setAuthorizationToken(authToken);
    let isMounted = true;
    getUserDetails()
      .then((data) => {
        if (isMounted) {
          const userDetails = userData(data);
          dispatch(setCurrentUser(userDetails));
        }
      })
      .catch(() => {
        if (isMounted) {
          dispatch(removeCurrentUser());
        }
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  history.listen(() => {
    dispatch(removeError());
  });

  return (
    <Switch>
      <Route
        exact
        path="/two-factor"
        name="Two Factor"
        render={(props) => <TwoFactor {...props} />}
      />
      <Route
        exact
        path="/404"
        name="Not Found"
        render={(props) => <NotFound {...props} />}
      />
      <PublicRoute
        exact
        path="/register"
        name="Register"
        component={Register}
      />
      <PublicRoute
        exact
        path="/confirm-email"
        name="Confirm Email"
        component={EmailConfirmation}
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
