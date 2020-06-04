import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import "./register.css";
import axios from 'axios'; 
import server_url from '../../../constant';


class Register extends Component {
  constructor(props){
    super(props);
    this.submitreg = this.submitreg.bind(this); 
    this.handle_change = this.handle_change.bind(this);
    this.check = this.check.bind(this);
    this.state = {
      check: true
    }
  }
  handle_change(e) {
    this.setState({
      [e.target.name]: e.target.value
  })
}
check() {
  this.setState({check:false});
}

submitreg()
   {
     //console.log(this.state);
     axios.post(server_url+'/api/user/register', this.state)
          .then((result) => {
            //console.log(result)
            alert("Successfully Registered. Use your email id and password to login.");
            return this.props.history.push('./login');
          })
          .catch(err=>alert(err));
   } 

  render() {
    return (
      
      <div className="app align-items-center" >
        <Container >
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>

                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" onChange={this.handle_change} placeholder="First Name" name="first_name"/>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" onChange={this.handle_change} placeholder="Middle Name" name="middle_name"/>
                  </InputGroup>
       

                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" onChange={this.handle_change} placeholder="Last Name" name="last_name"/>
                  </InputGroup>
                  
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" onChange={this.handle_change} placeholder="Password" name="password"/>
                  </InputGroup>

                    <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText id="mobile">
                        <i className="fa fa-mobile" ></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" onChange={this.handle_change} placeholder="Contact" name="contact"/>
                  </InputGroup>
                  
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-envelope" ></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" onChange={this.handle_change} placeholder="Email" name="email"/>

                  </InputGroup>
                  
              <br/>

                  <InputGroup className="mb-3">
                 
                  	   <Row>
                    	<Col xs="12" sm="12" lg="12">
                  			<p id="terms">Terms: Contents of the application have Stackhack Todo copyrights. Use them wisely for good cause. 
                  			Redistribution of the contents for exchange of charges is strictly prohibited.
                  			</p>
                  		</Col>
                  		</Row>
                  
                  </InputGroup>


                  <InputGroup className="mb-3">
                  		<Input type="checkbox" id="agreeterms" onClick={this.check}/>
                  		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I agree to the above terms. 
                  </InputGroup>
                  <br/>

                  <Button color="success" onClick={this.submitreg} disabled={this.state.check}>Create Account</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
