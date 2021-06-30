import React from 'react';
import Loading from '@/utils/Loading';
import { wrapperStyling } from '@/utils/styling';

const AuthForm = React.lazy(() => import('@/components/Auth/AuthForm'));

function AuthContainer(props) {
  return (
    <section style={{ height: '100vh', width: '100%' }}>
      <section className="h-100 py-3 px-2 d-flex align-items-center justify-content-center">
        <React.Suspense fallback={Loading()}>
          <AuthForm {...props} />
        </React.Suspense>
      </section>
    </section>
  );
}

export default AuthContainer;
