import React from 'react';
import styled from 'styled-components';

const Spinner = ({ dimensions }) => {
  return (
    <SpinnerWrapper dimensions={dimensions || 50}>
      <div className="spinner"></div>
    </SpinnerWrapper>
  );
};

const SpinnerWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner {
    width: ${(props) => props.dimensions}px;
    height: ${(props) => props.dimensions}px;
    border-radius: 50%;
    padding: 3px;
    background: radial-gradient(farthest-side, var(--bs-green) 95%, #0000) 50% 0/12px
        12px no-repeat,
      radial-gradient(
          farthest-side,
          #0000 calc(100% - 5px),
          var(--bs-green) calc(100% - 4px)
        )
        content-box;
    animation: s6 2s infinite;
  }

  @keyframes s6 {
    to {
      transform: rotate(1turn);
    }
  }
`;

export default Spinner;
