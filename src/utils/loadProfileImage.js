import React from 'react';
import Identicon from 'react-identicons';
import { BASE_URL } from '@/utils/env';

export const loadProfileImage = (user, size = 80) => {
  const profileImage =
    user?.profileImage === 'no-image.jpg' ||
    user?.profileImage?.toLowerCase().startsWith('http') ? (
      <Identicon string={user?.email} size={size} />
    ) : (
      <img
        src={`${BASE_URL}/uploads/${user?.profileImage}`}
        alt="potrait"
        className="w-100 h-100 rounded"
        style={{ objectFit: 'cover' }}
      />
    );

  return profileImage;
};
