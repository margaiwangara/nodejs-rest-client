import React from 'react';
import Loading from '@/utils/Loading';
import TitleComponent from '@/container/DefaultLayout/TitleComponent';
import { useStoreReturnPath } from '@/hooks/useReturnPath';

const AuthContainer = React.lazy(() =>
  import('@/container/Auth/AuthContainer'),
);

function Login(props) {
  // store returnurl in localstorage
  useStoreReturnPath(props);

  return (
    <React.Suspense fallback={Loading()}>
      <TitleComponent title="Login" />
      <AuthContainer page="login" btnText="Login" heading="Welcome" />
    </React.Suspense>
  );
}

export default Login;
