import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import { Container } from 'reactstrap';
import apiController from '../../../network';
import sidebarNav from '../../../navigation/sidebarNav';
import routes from '../../../navigation/routes';
import stringUtils from '../../../utils/stringUtils';
import pathUtils from '../../../utils/pathUtils';

const BioAuthHeader = React.lazy(() => import('./Header'));
const BioAuthFooter = React.lazy(() => import('./Footer'));

const propTypes = {
  apps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      appId: PropTypes.string,
      appSecret: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
  userInfo: PropTypes.object,

  setApps: PropTypes.func.isRequired,
  setUserInfo: PropTypes.func.isRequired,

  authenticated: PropTypes.bool.isRequired,
};

const defaultProps = {};

class BioAuthLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  routeList = () => Object.keys(routes).map((key) => routes[key]);

  navigation = () => {
    const appsNavigation = this.props.apps.map((app) => {
      return {
        name: app.name,
        url: pathUtils.getAppDetailsPath(app),
        icon: 'fa fa-android',
      };
    });
    return { items: [...sidebarNav, ...appsNavigation] };
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.loadUserInfo();
      this.loadApps();
    }
  }

  loadUserInfo() {
    this.props.loadUserInfo().success((data) => {
      this.props.setUserInfo(data);
    }).error((error) => {
      // TODO: Handle error properly
      console.log(error);
    });
  }

  loadApps() {
    apiController.getApps((data) => {
      this.props.setApps(data);
    }, (error) => {
      // TODO: Handle error properly
      console.log(error);
    });
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <BioAuthHeader/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <Suspense>
              <AppSidebarNav navConfig={this.navigation()}/>
            </Suspense>
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={this.routeList()}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {this.routeList().map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}/>
                    ) : null;
                  })}
                  <Redirect from="/" exact={true} to="/dashboard"/>
                  <Redirect from="/*" to="/not-found"/>
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <BioAuthFooter/>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

BioAuthLayout.propTypes = propTypes;
BioAuthLayout.defaultProps = defaultProps;

export default BioAuthLayout;
