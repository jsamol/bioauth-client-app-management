import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

const propTypes = {
  email: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

const defaultProps = {};

class BioAuthHeader extends Component {
  render() {

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand full={{ alt: 'BioAuth' }} minimized={{ alt: 'BioAuth' }}/>
        <AppSidebarToggler className="d-md-down-none" display="lg"/>
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <p className="d-inline font-weight-bold">{this.props.email}</p>
              <img src={'../../assets/img/default_user_icon.png'} className="img-avatar d-inline" alt=""/>
            </DropdownToggle>
            <DropdownMenu right style={{right: 'auto'}}>
              <DropdownItem onClick={this.props.logout}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

BioAuthHeader.propTypes = propTypes;
BioAuthHeader.defaultProps = defaultProps;

export default BioAuthHeader;
