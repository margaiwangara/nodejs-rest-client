import React from 'react';
import no_data from '@/assets/images/empty.svg';
import styled from 'styled-components';

const Empty = () => {
  return (
    <EmptyWrapper>
      <figure>
        <img src={no_data} alt="no-data" />
      </figure>
      <p>Nothing has been posted yet. Be the first to speak your mind!</p>
    </EmptyWrapper>
  );
};

const EmptyWrapper = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  flex-direction: column;
  overflow: hidden;

  figure {
    height: 150px;
    width: 150px;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
    }
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: var(--gray);
  }
`;
export default Empty;
