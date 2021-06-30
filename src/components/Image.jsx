import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, fallback, alt }) => {
  const [state, setState] = useState({
    src,
    errored: false,
  });

  const onError = () => {
    if (!state.errored) {
      setState({ src: fallback, errored: true });
    }
  };

  return (
    <img src={state.src} onError={onError} alt={alt} className="h-100 w-100" />
  );
};

export default Image;
