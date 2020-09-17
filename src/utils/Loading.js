import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loading = () => (
  <div style={loadingStyle}>
    <FontAwesomeIcon icon="spinner" spin size="2x" />
  </div>
);

const loadingStyle = {
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 50,
  padding: '20px 0',
};

export default Loading;
