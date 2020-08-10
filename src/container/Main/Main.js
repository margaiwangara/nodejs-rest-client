import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Login = React.lazy(() => import('@/views/Auth/Login'));
const Register = React.lazy(() => import('@/views/Auth/Register'));
const ResetPassword = React.lazy(() =>
  import('@/views/ForgotPassword/ResetPassword'),
);
const DefaultLayout = React.lazy(() =>
  import('@/container/DefaultLayout/DefaultLayout'),
);

function Main() {
  return (
    <Switch>
      <Route exact path="/register" name="Register" component={Register} />
      <Route exact path="/login" name="Login" component={Login} />
      <Route
        exact
        path="/reset-password"
        name="Reset Password"
        component={ResetPassword}
      />
      <Route path="/" component={DefaultLayout} />
    </Switch>
  );
}

export default Main;
