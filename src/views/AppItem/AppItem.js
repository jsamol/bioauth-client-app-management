import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Col, Row} from "reactstrap";

const propTypes = {
  clientId: PropTypes.string.isRequired,
  secret: PropTypes.string.isRequired,
  description: PropTypes.string
};
const defaultProps = {};

class AppItem extends Component {

  render() {
    return (
      <div>
        <Row>
          <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
            {this.props.description && <p>{this.props.description}</p>}
            <div>
              <h5 className="font-weight-bold d-inline">clientId </h5>
              <h5 className="d-inline">{this.props.clientId}</h5>
            </div>
            <div>
              <h5 className="font-weight-bold d-inline">secret </h5>
              <h5 className="d-inline">{this.props.secret}</h5>
            </div>
          </Col>
          <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">

          </Col>
        </Row>
      </div>
    );
  }
}

AppItem.propTypes = propTypes;
AppItem.defaultProps = defaultProps;

export default AppItem;
