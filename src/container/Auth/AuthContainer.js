import React from 'react';
import Loading from '@/utils/Loading';

const AuthForm = React.lazy(() => import('@/components/Auth/AuthForm'));

function AuthContainer(props) {
  return (
    <div className="container">
      <div style={wrapperStyling} className="row">
        <div className="col-md-6 offset-md-3">
          <React.Suspense fallback={Loading()}>
            <AuthForm {...props} />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}

const wrapperStyling = {
  height: '100vh',
  width: '100%',
  boxSizing: 'border-box',
};
export default AuthContainer;
