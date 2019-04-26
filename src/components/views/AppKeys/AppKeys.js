import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';
import Form from 'reactstrap/es/Form';

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
      <Form autoComplete="off">
        <div className="mb-3">
          <Label>App ID</Label>
          <Input readOnly="readonly" type="text" value={this.props.appId}/>
        </div>
        <div>
          <Label>App Secret</Label>
          <InputGroup>
            <Input
              readOnly="readonly"
              type={this.state.appSecretShown ? 'text' : 'password'}
              value={this.props.appSecret}/>
            <InputGroupAddon addonType="append">
              <Button color="secondary" onClick={this.toggleSecretVisibility}>
                {this.state.appSecretShown ? 'Hide' : 'Show'}
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </Form>
    );
  }
}

AppKeys.propTypes = propTypes;
AppKeys.defaultProps = defaultProps;

export default AppKeys;
