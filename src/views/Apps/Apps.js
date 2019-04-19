import React, {Component} from 'react';
import {Card, CardBody, CardHeader, ListGroup, ListGroupItem} from 'reactstrap';

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
              <ListGroupItem>Cras justo odio</ListGroupItem>
              <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              <ListGroupItem>Morbi leo risus</ListGroupItem>
              <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
              <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>

      </div>
    );
  }
}

export default Apps;
