import React, {Component} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {apiController} from "../../../network/ApiController";

class NewApp extends Component {

  constructor(props) {
    super(props);

    this.handleTextChange = this.handleTextChange.bind(this);
    this.registerApp = this.registerApp.bind(this);

    this.state = {
      name: null,
      description: null,
      disableForm: false
    };
  }

  handleTextChange(event) {
    const target = event.target;

    let state = {};
    state[target.id] = target.value;

    this.setState(state);
  }

  registerApp(event) {
    event.preventDefault();
    this.setState({
      disableForm: true
    });
    apiController.registerApp(this.state.name, this.state.description, (res) => {
      // TODO: Handle response
      console.log(res);
    }, (error) => {
      // TODO: Handle error properly
      console.log(error);
    }, () => {
      this.setState({
        disableForm: false
      });
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="d-flex justify-content-center">
          <Col xl="6">
            <Card>
              <CardHeader>
                <strong>Register a New App</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.registerApp}>
                  <Row>
                    <Col sm="2" className="mb-3">
                      <img
                        src={'../../assets/img/default_app_icon.png'}
                        className="img-icon-lg d-inline"
                        alt="" />
                    </Col>
                    <Col sm="6" className="mb-1">
                      <FormGroup>
                        <Label htmlFor="name">Display Name</Label>
                        <Input
                          type="text"
                          id="name"
                          placeholder="The name to be associated with the App ID"
                          onChange={this.handleTextChange}
                          disabled={this.state.disableForm}
                          required />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <Input type="textarea" id="description" onChange={this.handleTextChange} disabled={this.state.disableForm} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Button type="submit" color="primary" disabled={this.state.disableForm}>Submit</Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewApp;
