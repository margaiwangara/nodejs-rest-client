import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loadingOverlay } from '@/utils/styling';

function Loading() {
  return (
    <div style={loadingOverlay}>
      <FontAwesomeIcon icon="spinner" spin size="3x" />
    </div>
  );
}

export default Loading;
