import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Collapse} from 'reactstrap';
import PropTypes from 'prop-types'

const AppItem = React.lazy(() => import("../AppItem"));

const propTypes = {
  appList: PropTypes.arrayOf(PropTypes.object).isRequired
};
const defaultProps = {};

class Apps extends Component {

  constructor(props) {
    super(props);
    this.toggleAccordion = this.toggleAccordion.bind(this);

    const appsNumber = this.props.appList.length;
    const accordion = appsNumber > 1 ? Array(appsNumber).fill(false) : [true];

    this.state = { accordion };
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : x);

    this.setState({
      accordion: state,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="icon-list"></i> Registered Apps
          </CardHeader>
          <CardBody>
            <div id="accordion">
              { this.props.appList.map((app, idx) => {
                const icon = app.icon ? app.icon : '../../assets/img/default_app_icon.png';
                return (
                  <Card key={idx} className="mb-1">
                    <CardHeader
                      id={`heading${idx}`}
                      className='m-0 cursor-pointer'
                      onClick={() => this.toggleAccordion(idx)}
                      aria-expanded={this.state.accordion[idx]}
                      aria-controls={`collapse${idx}`}>
                        <img src={icon} className="img-circle img-icon" alt="app-icon" />
                        <h5 className="text-left ml-2 d-inline-block m-0">{app.name}</h5>
                    </CardHeader>
                    <Collapse
                      isOpen={this.state.accordion[idx]}
                      data-parent="#accordion"
                      id={`collapse${idx}`}
                      aria-labelledby={`heading${idx}`}>
                      <CardBody>
                        <AppItem clientId={app.clientId} secret={app.secret} description={app.description} />
                      </CardBody>
                    </Collapse>
                  </Card>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

Apps.propTypes = propTypes;
Apps.defaultProps = defaultProps;

export default Apps;
