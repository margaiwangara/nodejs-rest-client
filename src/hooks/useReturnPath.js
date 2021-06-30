import React, { useEffect } from 'react';

export const useStoreReturnPath = (props) => {
  const path = props?.location?.state?.from?.pathname;
  // check if from exists and store in local storage
  useEffect(() => {
    let isMounted = true;

    if (isMounted && path) {
      window.localStorage.setItem('returnUrl', path);
    }

    return () => {
      isMounted = false;
    };
  }, [path]);
};
