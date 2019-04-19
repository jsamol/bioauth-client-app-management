import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Collapse} from 'reactstrap';
import PropTypes from 'prop-types'

const AppItem = React.lazy(() => import("../AppItem"));

const accordion = (props) => {
  const appsNumber = props.appList.length;
  return appsNumber > 1 ? Array(appsNumber).fill(false) : [true];
};

const status = (props) => {
  return Array(props.appList.length).fill(false);
};

const propTypes = {
  appList: PropTypes.arrayOf(PropTypes.object).isRequired
};

const defaultProps = {};

class AppList extends Component {

  constructor(props) {
    super(props);

    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExited = this.onExited.bind(this);

    this.state = {
      accordion: accordion(props),
      status: status(props)
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.accordion.length !== props.appList.length || state.status.length !== props.appList.length) {
      return {
        accordion: accordion(props),
        status: status(props)
      };
    }

    return null
  }

  onEntered(tab) {
    this.onCollapseAction(tab, true)
  }

  onExited(tab) {
    this.onCollapseAction(tab, false)
  }

  onCollapseAction(tab, isOpen) {
    const prevState = this.state.status;
    const state = prevState.map((x, index) => tab === index ? isOpen : x);

    this.setState({
      status: state
    });
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
                      onEntered={() => this.onEntered(idx)}
                      onExited={() => this.onExited(idx)}
                      data-parent="#accordion"
                      id={`collapse${idx}`}
                      aria-labelledby={`heading${idx}`}>
                      <CardBody>
                        <AppItem
                          name={app.name}
                          clientId={app.clientId}
                          secret={app.secret}
                          description={app.description}
                          isOpened={this.state.status[idx]} />
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

AppList.propTypes = propTypes;
AppList.defaultProps = defaultProps;

export default AppList;
