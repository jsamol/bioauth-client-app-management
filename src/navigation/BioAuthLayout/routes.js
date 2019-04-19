import React from 'react';

const Dashboard = React.lazy(() => import('../../views/Dashboard/Dashboard'));
const Apps = React.lazy(() => import('../../views/Apps/Apps'));

const routeName = {
  HOME: "Home",
  DASHBOARD: "Dashboard",
  APPS: "Apps"
};

const routes = [
  { path: '/', exact: true, name: routeName.HOME },
  { path: '/dashboard', exact: true, name: routeName.DASHBOARD, component: Dashboard },
  { path: '/apps', exact: true, name: routeName.APPS, component: Apps }
];

export { routes, routeName };
