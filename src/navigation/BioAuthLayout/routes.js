import React from 'react';

const Dashboard = React.lazy(() => import('../../views/Dashboard'));
const Apps = React.lazy(() => import('../../views/Apps'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/apps', name: 'Apps', component: Apps }
];

export default routes;
