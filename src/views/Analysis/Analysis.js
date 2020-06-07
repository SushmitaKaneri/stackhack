import React, { Component } from 'react';
import { Alert, Card, CardBody, Button, CardFooter, FormGroup, CardHeader, Col, Row, Label, Input, FormText, Collapse, Fade, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
import 'react-datepicker/dist/react-datepicker.css';
import 'font-awesome/css/font-awesome.min.css'; 
import {Link} from 'react-router-dom';
import server_url from '../../constant';



class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:''
    };
  }
  
  render() {
    let incomplete = (this.state.total - this.state.completed)/this.state.total * 100;
    let completed = this.state.completed/this.state.total * 100;
    return (
      <div className="animated fadeIn">  
       <Row>
          <Col md="4" sm="12" lg="4"></Col>
          <Col md="4" sm="12" lg="4">
            <PieChart
              data={[
                { title: 'Completed', value: completed, color: '#B5EAD7' },
                { title: 'Incomplete', value: incomplete, color: '#FF9AA2' }
              ]}
            />
            <Alert style={{backgroundColor:'#B5EAD7' }}><center>Completed: {completed}%    {this.state.completed}/{this.state.total}</center></Alert>
            <Alert style={{backgroundColor:'#FF9AA2',color:'white' }}><center>Incomplete: {incomplete}%    {(this.state.total - this.state.completed)}/{this.state.total}</center></Alert>
          </Col>
          <Col md="4" sm="12" lg="4"></Col>
        </Row>
      </div>
    );
  }
  componentDidMount(){
    axios.defaults.withCredentials = true;
    axios.get(server_url+'/api/user/authenticate',{ withCredentials: true})
      .then(res=>{
        let user=res.data
        this.setState({user})
        axios.post(server_url+'/api/upload/analysis',{ email: res.data})
        .then(res=>{
          this.setState({total:res.data.total,completed:res.data.completed})
          console.log(res.data)
        })
        .catch(err=>{
          console.log(err);
        })  
      })
      .catch(err=>{
        //console.log(err);
        return this.props.history.push('./login');
      })
    
    
  }
}

export default Analysis;
