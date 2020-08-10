import React from 'react';
import Loading from '@/utils/Loading';
import { wrapperStyling } from '@/utils/styling';

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

export default AuthContainer;
