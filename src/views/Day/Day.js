import React, { Component } from 'react';
import { Alert, Card, CardBody, Button, CardFooter, FormGroup, CardHeader, Col, Row, Label, Input, FormText, Collapse, Fade, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import 'font-awesome/css/font-awesome.min.css'; 
import {Link} from 'react-router-dom';
import server_url from '../../constant';



class Day extends Component {
  constructor(props) {
    super(props);
    this.pin = this.pin.bind(this)
    this.state = {
      result: null,
      _id: '',
      user:''
    };
  }
  
  status(setStatus,e){  
    if(e.target.id!=null){   
      let gid = e.target.id.substring(0,e.target.id.length-1)
      if(document.getElementById(e.target.id).style.color==='' || document.getElementById(e.target.id).style.color==='rgb(164, 197, 198)') {
        document.getElementById(e.target.id).style.color='#178515'
        axios.post(server_url+"/api/upload/status",{_id:gid,status:setStatus})
        .then(()=>{
        })
        .catch(err=>console.log(err));
        if(setStatus == 'Bin') alert("You can view the note in Bin section as well as in Tasks");
        else if(setStatus == 'Archive') alert("You can view the note in Archive/Completed section as well as in Tasks");
        return window.location.reload(false);
      }
      else{
        document.getElementById(e.target.id).style.color='#a4c5c6';
        axios.post(server_url+"/api/upload/status",{_id:gid,status:'Normal'})
        .then(()=>{
        })
        .catch(err=>console.log(err));
        return window.location.reload(false);
      }
    }
  }

pin(e){    
    if(e.target.id!=null){
    let gid = e.target.id.substring(0,e.target.id.length-1)
    if(document.getElementById(e.target.id).style.color==='' || document.getElementById(e.target.id).style.color==="rgb(164, 197, 198)") {
      document.getElementById(e.target.id).style.color='#178515'
      axios.post(server_url+"/api/upload/pin_color",{_id:gid,pin_color:'#178515'})
    .then(()=>{
    })
    .catch(err=>console.log(err));
    alert("You can view the note in Pinned section as well as in Tasks");
        return window.location.reload(false);
    }
    else {
      document.getElementById(e.target.id).style.color='#a4c5c6'
      axios.post(server_url+"/api/upload/unpin_color",{_id:gid})
    .then(()=>{
    })
    .catch(err=>console.log(err));
    alert("You can view the note in Tasks");
        return window.location.reload(false);
    }  
  }
}

  loadNotes(){
    axios.post(server_url+'/api/upload/todo', {email:this.state.user})
      .then((result) => {
        if(result.data == "No fetch") return this.props.history.push('./Login')
        result = result.data;
        this.setState({result},console.log(this.state.result));
      })
      .catch(err => alert(err));
  }

  Section(){
    if(this.state.result!=null){
    console.log(this.state.result)
    const element = this.state.result.map((e) => 
    <Col xs="12" sm="6" md="3">
           <Card className="border-info">
        <CardHeader style={{color:"#61c0bf",background:"#ecfbfc"}}> 
          <b>{this.state.result==null?"":e.title}</b> 
        </CardHeader>
        <CardBody id={e._id+'card'} style={{background:e.note_color}}>
          {e.description!=""?<Alert style={{color:"#ff8080",background:"#fffeec"}}>{e.description}</Alert>:""}
          <center>{e.image!=''?<img src={e.image} width="130" height="130"/>:''}</center>
          <center><Row>    
            <Col sm="1" md="1" lg="1"></Col>                
            <Col sm="2" md="2" lg="2"><i className="icon-pin font-xl d-block mt-4" style={{ cursor: 'pointer', color: e.pin_color==""?'#a4c5c6':e.pin_color }} id={e._id+'p'} onClick={this.pin} title="Pin"></i></Col>            
            <Col sm="2" md="2" lg="2">{e.status=='New'?<i className="fa fa-cloud font-xl d-block mt-4" style={{ cursor: 'pointer', color:'#178515' }} onClick={this.status.bind(this,'New')} id={e._id+'n'} title="New"></i>:<i className="fa fa-cloud font-xl d-block mt-4" style={{ cursor: 'pointer',color:'#a4c5c6' }} onClick={this.status.bind(this,'New')} id={e._id+'n'} title="New"></i>}</Col>
            <Col sm="2" md="2" lg="2">{e.status=='Progress'?<i className="fa fa-spinner font-xl d-block mt-4" style={{ cursor: 'pointer', color:'#178515' }} onClick={this.status.bind(this,'Progress')} id={e._id+'i'} title="In Progress"></i>:<i className="fa fa-spinner font-xl d-block mt-4" style={{ cursor: 'pointer',color:'#a4c5c6' }} onClick={this.status.bind(this,'Progress')} id={e._id+'i'} title="In Progress"></i>}</Col>
            <Col sm="2" md="2" lg="2">{e.status=='Archive'?<i className="fa fa-check font-xl d-block mt-4" style={{ cursor: 'pointer',color:'#178515' }} onClick={this.status.bind(this,'Archive')} id={e._id+'c'} title="Completed"></i>:<i className="fa fa-check font-xl d-block mt-4" style={{ cursor: 'pointer',color:'#a4c5c6'}} onClick={this.status.bind(this,'Archive')} id={e._id+'c'} title="Completed"></i>}</Col>
            <Col sm="2" md="2" lg="2">{e.status=='Bin'?<i className="fa fa-trash font-xl d-block mt-4" style={{ cursor: 'pointer', color:'#178515' }} onClick={this.status.bind(this,'Bin')} id={e._id+'b'} title="Bin"></i>:<i className="fa fa-trash font-xl d-block mt-4" style={{ cursor: 'pointer',color:'#a4c5c6' }} onClick={this.status.bind(this,'Bin')} id={e._id+'b'} title="Bin"></i>}</Col>
            <Col sm="1" md="1" lg="1"></Col>  
          </Row></center>
        </CardBody>
        <CardFooter style={{color:"#d9455f",background:"#fdfdc4"}}><center>{e.label!=''?<i className="icon-tag d-block mt-2">   {this.state.result==null?"":e.label}</i>:''}{e.reminder!=null? <i className="icon-clock d-block mt-2">   {e.reminder.substring(0,e.reminder.indexOf('T'))}  {e.reminder.substring(e.reminder.indexOf('T')+1,e.reminder.length-8)}</i>:''}</center></CardFooter>
      </Card>
    </Col>
       
    );

    return(element);   
    }
  }

  render() {
    return (
      <div className="animated fadeIn">  
       <br/>
        <Row>
        {this.Section()}
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
      {this.loadNotes()}
    })
    .catch(err=>{
      //console.log(err);
      return this.props.history.push('./login');
    })
    
  }

  
}




export default Day;
