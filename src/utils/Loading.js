import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loading = () => (
  <div style={loadingStyle}>
    <FontAwesomeIcon icon="spinner" spin size="5x" />
  </div>
);

const loadingStyle = {
  height: '100vh',
  width: '100%',
  position: 'fixed',
  overflow: 'hidden',
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 50,
};

export default Loading;
