import React from 'react';

const Home = React.lazy(() => import('@/views/Home/Home'));

const routes = [
  {
    exact: true,
    path: '/',
    name: 'Home',
    component: Home,
  },
];

export default routes;
