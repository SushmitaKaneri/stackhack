import React, { Component } from 'react';
import { Button, Card, CardBody, CardImg, CardGroup, CardHeader,Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import server_url from '../../../constant';
class Login extends Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.handle_change = this.handle_change.bind(this);
    this.forgot = this.forgot.bind(this);
    this.state = {
      email : "",
      password : ""
    }

  }

  handle_change(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  login(){
    axios.defaults.withCredentials = true 
    axios.post(server_url+'/api/user/authenticate', {withCredentials:true, email: this.state.email , password:this.state.password})
    .then(res=>{
      axios.post(server_url+'/api/upload/todo', {email:this.state.email})
      .then((result) => {
        if(result.data.length>0) alert("Welcome, please check My Day Section for Today's Todo!")
      })
      .catch(err => alert(err));
        return this.props.history.push('./dashboard');
    })
    .catch(err=>{
      alert("Invalid User Credentials");
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
      const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
      const result = pattern.test(this.state.email);
      console.log(result);
      if(result) $('#email-alert').hide();
      else  {
        $('#email-alert').show();
        requiredInputsValidation = false;}
    }
    if(requiredInputsValidation){
      return this.props.history.push('./forgot');
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                <CardHeader><center><h2>Login</h2></center></CardHeader>
                  <CardBody>
                   <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" name="email" onChange={this.handle_change} />
                      <span id="email-alert" className="alertText">Correct Email is required</span>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" name="password" onChange={this.handle_change} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.login}>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0" onClick={this.forgot}>Forgot?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
				
                
				<Card className="text-red p-4 " style={{ marginLeft:100, backgroundColor:"#7be2f2"}}>
        <CardHeader><center><h2>Register</h2></center></CardHeader>
                  <CardBody className="text-center">
                    <div>
                      
                      <p>Click here to register yourself in Stackhack Todo  Community.</p>
                      <Link to="/register"><Button color="primary" className="mt-3" active>Register Now!</Button></Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
	 </div> 

    );
  }
}

export default Login;
