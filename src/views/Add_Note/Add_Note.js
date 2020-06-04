import React, { Component } from 'react';
import { Button, Label, Card, CardBody, CardImg, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import server_url from '../../constant';


class Add_Note extends Component {
 
constructor(props) {
  super(props);
  this.handleUpload=this.handleUpload.bind(this);
  this.onChangei=this.onChangei.bind(this);
  this.onChange=this.onChange.bind(this);
  this.handleLabelChange=this.handleLabelChange.bind(this);
  this.state = { 
    reminder: new Date(), reminderSet:false,
    loaded:0, image:'' ,title: '', description: '' };
}


  handleUpload = () => {
    const data = new FormData();
    
    data.append("image", this.state.image[0]);

    let title = document.getElementById("title").value;
    this.setState({title});
        
    let description = document.getElementById("description").value;
    let label = document.getElementById("label").value;
    this.setState({description});

    data.append('description',JSON.stringify(description));
    data.append('title',JSON.stringify(title));
    data.append('label',JSON.stringify(label));
    data.append('pin_color','');
    data.append('note_color','');
    data.append('bin_color','');
    data.append('archive_color','');
    data.append('status',JSON.stringify('Normal'));
    if(this.state.reminderSet) data.append('reminder',new Date(this.state.reminder));
    else data.append('reminder','');
    data.append('email',this.state.user);
    
    axios.post(server_url+'/api/upload/addnote', data,{
        
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: Math.ceil(ProgressEvent.loaded / ProgressEvent.total*100),
          })
        },
      })
      .then(res => {
        alert("Note Added Successfully! You can check it in Tasks.")
        return this.props.history.push('./dashboard');
      })
      .catch(err=>alert("Hello"));
  }

  onChange(e) {
    this.setState({reminder:e})
    this.setState({reminderSet:true});
  }

onChangei(e) {
  let files=e.target.files;
  this.setState( { image: files });  
}

handleLabelChange(event) {    this.setState({label: event.target.value});  }

componentDidMount(){
  axios.defaults.withCredentials = true;
  axios.get(server_url+'/api/user/authenticate',{ withCredentials: true})
    .then(res=>{
      let user=res.data
      this.setState({user})
    })
    .catch(err=>{
      return this.props.history.push('./login');
    })
    
}

  render() {
    return (
    <center>
      <div>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-2">
                <CardBody className="p-5">
                  <h1 style={{'color':'grey'}}><center>Add Note</center></h1>
					          <p>&nbsp; </p>
                  <InputGroup className="mb-3">
                    <Input type="text" placeholder="Title - Upto 25 Characters" id="title"/>
                  </InputGroup>
                  
				          <InputGroup className="mb-3">
                    <Input type="textarea" placeholder="Description" id="description"/>
                  </InputGroup>		
                  <InputGroup className="mb-3">
                    <Input type="select" id="label" value={this.state.label} onChange={this.handleLabelChange}>
                      <option value="">Select Upto 1 Label</option>
                      <option value="Personal">Personal</option>
                      <option value="Work">Work</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Others">Others</option>
                    </Input>
                  </InputGroup>	                      
                   <InputGroup className="mb-3">
                   <Row><Col md="4" lg="4" sm="4"><Label><b>Upload Image</b></Label></Col><Col md="8" lg="8" sm="8"><Input type="file" onChange={this.onChangei} placeholder="Select Image" /></Col></Row>
                  </InputGroup>
                  <InputGroup>
                  <Row><Col md="4" lg="4" sm="4"><Label><b>Due Date Reminder</b></Label></Col>
                  <Col md="8" lg="8" sm="8">
                  <DateTimePicker
                    onChange={this.onChange}
                    value={this.state.reminder}
                  /></Col></Row>
                  </InputGroup>
                  <hr/>                 
                        
                  <br/>
                  <Row>
                    <Col md="4" sm="4" lg="4">
                     <Button style={{backgroundColor: "#87ceeb"}} onClick={this.handleUpload} block>Add</Button>
                    </Col>
                    <Col md="8" sm="8" lg="8">
                     <Label>{this.state.loaded}%</Label>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
    
       
      </div></center>
    );
  }
}

export default Add_Note;
