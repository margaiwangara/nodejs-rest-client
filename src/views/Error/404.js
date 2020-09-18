import React from 'react';
import TitleComponent from '@/container/DefaultLayout/TitleComponent';
import { errorPageStyling } from '@/utils/styling';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <TitleComponent title="404" />
      <div style={errorPageStyling}>
        <div className="d-flex">
          <h1
            className="font-weight-bold pr-1 py-2"
            style={{
              fontSize: '60px',
              borderRight: 'solid 2px var(--gray-dark)',
            }}
          >
            404
          </h1>
          <h1
            className="h1 font-weight-bold pl-1 py-2 text-muted"
            style={{ borderLeft: 'solid 2px var(--gray)' }}
          >
            Page Not Found
          </h1>
        </div>
        <p className="lead mt-2" style={{ fontSize: '18px' }}>
          Return to
          <Link to="/"> Homepage</Link>
        </p>
      </div>
    </>
  );
}

export default NotFound;
