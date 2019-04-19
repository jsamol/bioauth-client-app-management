import React, {Component} from 'react';
import {Card, CardBody, CardHeader, ListGroup, ListGroupItem} from 'reactstrap';
import PropTypes from 'prop-types'

const propTypes = {
  appList: PropTypes.arrayOf(PropTypes.object).isRequired
};
const defaultProps = {};

class Apps extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Registered Apps</strong>
          </CardHeader>
          <CardBody>
            <ListGroup>
              {this.props.appList.map((app) => {
                return <ListGroupItem>{app.name}</ListGroupItem>
              })}
            </ListGroup>
          </CardBody>
        </Card>

      </div>
    );
  }
}

Apps.propTypes = propTypes;
Apps.defaultProps = defaultProps;

export default Apps;
