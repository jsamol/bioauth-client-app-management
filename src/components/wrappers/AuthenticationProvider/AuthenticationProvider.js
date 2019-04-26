import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keycloak from 'keycloak-js';
import apiController from '../../../network';
import { header, httpMethod, httpStatus, tokenMinValidity } from '../../../network/ApiConst';
import { withCookies } from 'react-cookie';
import {activeProfile} from "../../../config/appConfig";

const propTypes = {
  children: PropTypes.any.isRequired,

  setKeycloak: PropTypes.func.isRequired,
  deleteKeycloak: PropTypes.func.isRequired,

  keycloak: PropTypes.object,
  authenticated: PropTypes.bool.isRequired,
};

const defaultProps = {};

class AuthenticationProvider extends Component {

  constructor(props) {
    super(props);

    this.onRequestIntercepted = this.onRequestIntercepted.bind(this);
    this.onRequestErrorIntercepted = this.onRequestErrorIntercepted.bind(this);
    this.onResponseIntercepted = this.onResponseIntercepted.bind(this);
    this.onResponseErrorIntercepted = this.onResponseErrorIntercepted.bind(this);

    this.state = {
      tokenRefreshed: false,
    };
  }

  componentDidMount() {
    apiController.registerInterceptor(
      this.onRequestIntercepted,
      this.onRequestErrorIntercepted,
      this.onResponseIntercepted,
      this.onResponseErrorIntercepted,
    );
    const keycloakPath = `/keycloak-${activeProfile}.json`;
    const keycloak = Keycloak(keycloakPath);
    keycloak.init({ onLoad: 'login-required' })
      .success((res) => {
        this.props.setKeycloak(keycloak);
      }).error(() => {
        // TODO: Handle error properly
       console.log('Authentication: error');
      });
  }

  onRequestIntercepted(url, config) {
    if (this.props.authenticated) {
      config.headers[header.AUTHORIZATION] = `Bearer ${this.props.keycloak.token}`;
    }

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
    if (response.status === httpStatus.UNAUTHORIZED && !this.state.tokenRefreshed) {
      this.props.keycloak
        .updateToken(tokenMinValidity)
        .success((res) => this.onTokenRefresh())
        .error((error) => this.onTokenRefreshError());
    } else if (response.status === httpStatus.UNAUTHORIZED && this.state.tokenRefreshed) {
      this.onTokenRefreshError();
    } else if (this.state.tokenRefreshed) {
      this.setState({ tokenRefreshed: false });
    }
    return response;
  }

  onResponseErrorIntercepted(error) {
    return error;
  }

  onTokenRefresh() {
    this.setState({ tokenRefreshed: true });
    apiController.request();
  }

  onTokenRefreshError() {
    apiController.unregisterRequest();
    this.setState({ tokenRefreshed: false });
    this.props.deleteKeycloak();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

AuthenticationProvider.propTypes = propTypes;
AuthenticationProvider.defaultProps = defaultProps;

export default withCookies(AuthenticationProvider);
