import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row } from 'reactstrap';
import AppKeys from '../AppKeys';

const propTypes = {
  app: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    appId: PropTypes.string,
    appSecret: PropTypes.string,
    description: PropTypes.string,
  }),
};
const defaultProps = {};

class AppDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appSecretShown: false,
    };
  }


  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardBody className="pl-5 pr-5">
                <Row className="d-flex align-items-center">
                  <Col xl="6" lg="8">
                    <Row>
                      <Col xl="2" lg="4" className="mb-3 d-flex align-items-center">
                        <img src={'../../assets/img/default_app_icon.png'} className="img-circle img-fluid" alt=""/>
                      </Col>
                      <Col xl="10" lg="8">
                        {this.props.app && <h3 className="font-weight-bold">{this.props.app.name}</h3>}
                        {this.props.app && <p>{this.props.app.description}</p>}
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={{ size: 4, offset: 2 }} lg="4">
                    {this.props.app && <AppKeys appId={this.props.app.appId} appSecret={this.props.app.appSecret}/>}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

AppDetails.propTypes = propTypes;
AppDetails.defaultProps = defaultProps;

export default withRouter(AppDetails);
