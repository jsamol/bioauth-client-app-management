import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
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
import Keycloak from 'keycloak-js';
import apiController from '../../../network';
import sidebarNav from '../../../navigation/sidebarNav';
import routes from '../../../navigation/routes';
import stringUtils from '../../../utils/stringUtils';
import { header, httpMethod } from '../../../network/ApiConst';
import { withCookies } from 'react-cookie';

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
  setApps: PropTypes.func.isRequired,

  setKeycloak: PropTypes.func.isRequired,
  deleteKeycloak: PropTypes.func.isRequired,

  setUserInfo: PropTypes.func.isRequired,

  authenticated: PropTypes.bool.isRequired,
  loadUserInfo: PropTypes.func.isRequired,
};

const defaultProps = {};

class BioAuthLayout extends Component {

  constructor(props) {
    super(props);

    this.onRequestIntercepted = this.onRequestIntercepted.bind(this);
    this.onRequestErrorIntercepted = this.onRequestErrorIntercepted.bind(this);
    this.onResponseIntercepted = this.onResponseIntercepted.bind(this);
    this.onResponseErrorIntercepted = this.onResponseErrorIntercepted.bind(this);
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  routeList = () => Object.keys(routes).map((key) => routes[key]);

  navigation = () => {
    const appsNavigation = this.props.apps.map((app) => {
      return {
        name: app.name,
        url: routes.APP_DETAILS.path.replace(":appName", stringUtils.toUrlParam(app.name)),
        icon: 'fa fa-android',
      };
    });
    return { items: [...sidebarNav, ...appsNavigation] };
  };

  componentDidMount() {
    apiController.registerInterceptor(
      this.onRequestIntercepted,
      this.onRequestErrorIntercepted,
      this.onResponseIntercepted,
      this.onResponseErrorIntercepted
    );

    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({
      onLoad: 'login-required',
    }).success((res) => {
      this.props.setKeycloak(keycloak);
      apiController.token = keycloak.token;

      this.loadUserInfo();
      this.loadApps();
    }).error(() => {
      if (this.props.authenticated) {
        this.props.deleteKeycloak();
      }

      // TODO: Handle error properly
      console.log('Authentication: error');
    });
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

  onRequestIntercepted(url, config) {
    if (config.method === httpMethod.POST || config.method === httpMethod.PUT) {
      config.headers[header.XSRF_TOKEN] = this.props.cookies.get('XSRF-TOKEN');
      config.credentials = 'include';
    }
    return [url, config];
  }

  onRequestErrorIntercepted(error) {
    return error;
  }

  onResponseIntercepted(response) {
    return response;
  }

  onResponseErrorIntercepted(error) {
    return error;
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

export default withCookies(withRouter(BioAuthLayout));
