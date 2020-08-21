import React from 'react';
import Loading from '@/utils/Loading';
import TitleComponent from '@/container/DefaultLayout/TitleComponent';

const AuthContainer = React.lazy(() =>
  import('@/container/Auth/AuthContainer'),
);

function Register() {
  return (
    <React.Suspense fallback={Loading()}>
      <TitleComponent title="Register" />
      <AuthContainer
        page="register"
        btnText="Register"
        heading="Create Account"
      />
    </React.Suspense>
  );
}

export default Register;
