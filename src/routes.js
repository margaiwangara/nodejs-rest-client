import React from 'react';

const Home = React.lazy(() => import('@/views/Home/Home'));
const EditProfile = React.lazy(() => import('@/views/Profile/EditProfile'));
const ChangePassword = React.lazy(() =>
  import('@/views/Profile/ChangePassword'),
);

const routes = [
  {
    exact: true,
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    exact: true,
    path: '/edit-profile',
    name: 'Edit Profile',
    component: EditProfile,
  },
  {
    exact: true,
    path: '/change-password',
    name: 'Change Password',
    component: ChangePassword,
  },
];

export default routes;
