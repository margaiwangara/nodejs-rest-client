import React from 'react';
import Loading from '@/utils/Loading';

const AuthContainer = React.lazy(() =>
  import('@/container/Auth/AuthContainer'),
);

function Login() {
  return (
    <React.Suspense fallback={Loading()}>
      <AuthContainer page="login" btnText="Login" heading="Welcome" />
    </React.Suspense>
  );
}

export default Login;
