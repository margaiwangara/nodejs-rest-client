import React, { useEffect } from 'react';
import qs from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import apiRequest from '@/services/api';

function EmailConfirmation() {
  const location = useLocation();
  const history = useHistory();
  const parsed = qs.parse(location.search);
  const token = parsed.token;

  useEffect(() => {
    if (token) {
      apiRequest('get', `/api/auth/confirmemail?token=${token}`)
        .then(() => history.push('/login'))
        .catch(() => history.push('/404'));
    } else {
      history.push('/404');
    }
  }, []);

  return <div></div>;
}

export default EmailConfirmation;
