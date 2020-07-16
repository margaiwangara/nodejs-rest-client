import React from 'react';
import Loading from '@/utils/Loading';

const AuthContainer = React.lazy(() =>
  import('@/container/Auth/AuthContainer'),
);

function Register() {
  return (
    <React.Suspense fallback={Loading()}>
      <AuthContainer
        page="register"
        btnText="Register"
        heading="Create Account"
      />
    </React.Suspense>
  );
}

export default Register;
