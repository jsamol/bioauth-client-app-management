import React, {Component} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {apiController} from "../../network/ApiController";

class NewApp extends Component {

  constructor(props) {
    super(props);

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.registerApp = this.registerApp.bind(this);

    this.state = {
      name: null,
      icon: null,
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

  handleFileChange(event) {
    this.setState({
      icon: URL.createObjectURL(event.target.files[0])
    });
  }

  registerApp(event) {
    event.preventDefault();
    this.setState({
      disableForm: true
    });
    apiController.registerApp(this.state.name, this.state.icon, this.state.description, (res) => {
      console.log(res);
    }, (error) => {
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
          <Col xl="8">
            <Card>
              <CardHeader>
                <strong>Register a New App</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.registerApp}>
                  <Row>
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
                    <Col sm="4" className="mb-3">
                      <FormGroup>
                        <Label htmlFor="icon">App Icon</Label>
                        <Input
                          type="file"
                          id="icon"
                          className="d-inline"
                          onChange={this.handleFileChange} disabled={this.state.disableForm} />
                      </FormGroup>
                    </Col>
                    <Col sm="2" className="mb-3">
                      <img
                        src={this.state.icon ? this.state.icon : '../../assets/img/default_app_icon.png'}
                        className="img-icon-lg d-inline"
                        alt="" />
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
