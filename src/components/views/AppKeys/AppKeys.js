import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';

const propTypes = {
  appId: PropTypes.string.isRequired,
  appSecret: PropTypes.string.isRequired,
};
const defaultProps = {};

class AppKeys extends Component {

  constructor(props) {
    super(props);

    this.toggleSecretVisibility = this.toggleSecretVisibility.bind(this);

    this.state = {
      appSecretShown: false,
    };
  }

  toggleSecretVisibility() {
    const prevState = this.state.appSecretShown;
    this.setState({
      appSecretShown: !prevState,
    });
  }

  render() {

    return (
      <div>
        <div className="mb-3">
          <Label>App ID</Label>
          <Input readOnly="readonly" type="text" defaultValue={this.props.appId}/>
        </div>
        <div>
          <Label>App Secret</Label>
          <InputGroup>
            <Input
              readOnly="readonly"
              type={this.state.appSecretShown ? 'text' : 'password'}
              defaultValue={this.props.appSecret}/>
            <InputGroupAddon addonType="append">
              <Button color="secondary" onClick={this.toggleSecretVisibility}>
                {this.state.appSecretShown ? 'Hide' : 'Show'}
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    );
  }
}

AppKeys.propTypes = propTypes;
AppKeys.defaultProps = defaultProps;

export default AppKeys;
