import routes from './routes';

const sidebarNav = [
  {
    name: 'Dashboard',
    url: routes.DASHBOARD.path,
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'Apps',
  },
  {
    name: 'Add New',
    url: routes.NEW_APP.path,
    icon: 'icon-plus',
  },
  {
    name: 'All',
    url: routes.APP_LIST.path,
    icon: 'icon-list',
  },
];

export default sidebarNav;
