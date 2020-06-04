import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Form } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import server_url from '../../../constant';
export let userdescription = "";
export let username = "";

class Forgot extends Component {
   constructor(props){
     super(props);
     this.forgot = this.forgot.bind(this);
     this.handle_change = this.handle_change.bind(this);
     this.state = {
        "email":"",
        "password": ""
     }
   }
   
   handle_change(e) {
    this.setState({
      [e.target.name]: e.target.value
  })
   }

  forgot(e)
   {
     e.preventDefault();
   let requiredInputsValidation = true;
    if (this.state.email == "") {
      $('#email-alert').show();
      requiredInputsValidation = false;
    } else {
      $('#email-alert').hide();
    }
    if (this.state.password == "") {
      $('#password-alert').show();
      requiredInputsValidation = false;
    } else {
      $('#password-alert').hide();
    }
    if(requiredInputsValidation){
     axios.post(server_url+"/api/user/forgot", this.state)
          .then((result) => {alert("Password reset successful");
          return this.props.history.push('./Login')
          })
          .catch(err => alert("Invalid Email"));
      }
   }
  render() {    
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Reset Password</h1>
                    <p className="text-muted">Set New Password</p>
                    <Form onSubmit={this.forgot} method="POST">
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" name="email" onChange={this.handle_change}/>
                      <span id="email-alert" className="alertText">Email is required</span>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" name="password" onChange={this.handle_change}/>
                      <span id="password-alert" className="alertText">Password is required</span>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        {/* <Link to="./../Dashboard1"> */}<Button type="submit" color="primary" className="px-4">Reset Password</Button>{/* </Link> */}
                      </Col>
                      <Col xs="6" className="text-right">
                       
                      </Col>
                    </Row>
                    </Form>
                  </CardBody>
                </Card>
                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Forgot;
