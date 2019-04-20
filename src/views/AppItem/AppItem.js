import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import {Button, Col, Row} from "reactstrap";
import {Line} from "react-chartjs-2";
import {CustomTooltips} from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import routes from "../../navigation/BioAuthLayout/routes";

const line = {
  labels: [],
  datasets: [
    {
      label: 'BioAuth Usage',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(32, 168, 216, 0.4)',
      borderColor: 'rgba(32, 168, 216, 1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
    },
  ],
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,

};

const propTypes = {
  name: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  secret: PropTypes.string.isRequired,
  description: PropTypes.string,
  isOpened: PropTypes.bool.isRequired
};
const defaultProps = {};

class AppItem extends Component {

  constructor(props) {
    super(props);

    this.redirectToAppDetails = this.redirectToAppDetails.bind(this);
  }

  redirectToAppDetails() {
    this.props.history.push(`${routes.APP_LIST.path}/${this.props.name.replace(/\s+/g,'')}`)
  }

  render() {
    return (
      <div>
        <Row>
          <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
            <Row>
              <Col col="12" xl className="mb-3 mb-xl-0">
                {this.props.description && <p className="text-justify">{this.props.description}</p>}
              </Col>
            </Row>
            <Row>
              <Col col="10" sm="8" md="6" xl className="mb-3 mb-xl-0">
                <div>
                  <h5 className="font-weight-bold d-inline">clientId </h5>
                  <h5 className="d-inline">{this.props.clientId}</h5>
                </div>
                <div>
                  <h5 className="font-weight-bold d-inline">secret </h5>
                  <h5 className="d-inline">{this.props.secret}</h5>
                </div>
              </Col>
              <Col col="2">
                <div className="d-flex justify-content-end">
                  <Button color="ghost-primary" onClick={this.redirectToAppDetails}>More Info</Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
            {this.props.isOpened &&
              <div className="chart-wrapper">
                <Line data={line} options={options}/>
              </div>
            }
            </Col>
        </Row>
      </div>
    );
  }
}

AppItem.propTypes = propTypes;
AppItem.defaultProps = defaultProps;

export default withRouter(AppItem);
