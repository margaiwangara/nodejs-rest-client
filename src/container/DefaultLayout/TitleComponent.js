import React from 'react';
import Helmet from 'react-helmet';

function TitleComponent({ title }) {
  const defaultTitle = 'Home';

  return (
    <Helmet>
      <title>{`Drift | ${title ? title : defaultTitle}`}</title>
    </Helmet>
  );
}

export default TitleComponent;
