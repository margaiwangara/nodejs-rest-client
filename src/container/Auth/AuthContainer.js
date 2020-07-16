import React from 'react';
import Loading from '@/utils/Loading';

const AuthForm = React.lazy(() => import('@/components/Auth/AuthForm'));

function AuthContainer(props) {
  return (
    <div className="container-login100">
      <div className="wrap-login100">
        <React.Suspense fallback={Loading()}>
          <AuthForm {...props} />
        </React.Suspense>
      </div>
    </div>
  );
}

export default AuthContainer;
