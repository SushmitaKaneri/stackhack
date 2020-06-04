import React, { Component } from 'react';
import {  Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/Logo.jpg'
import sygnet from '../../assets/img/brand/logo.jpg'
import "./header.css";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(props )
  {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = { 
      loginState: false  
    };
  }

  logout(){
      axios.get('/api/user/logout',{ withCredentials: true})
    .then(res=>{
      let loginState = false;
      this.setState({loginState});
      alert("Logged out successfully");
      window.location.reload();
    })
    .catch(err=>{
      
    });
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 175, height: 50, alt: 'Logo' }}
          minimized={{ src: sygnet, width: 70, height: 30, alt: 'Logo' }}
        />
        

        <Nav className="d-md-down-none" navbar>
        <NavItem className="px-3"></NavItem>
          <NavItem className="px-3">
            <NavLink href="#/dashboard" className="tabsstyling">Home</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/philosophy" className="tabsstyling">Philosophy</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/process" className="tabsstyling">Process</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/assess" className="tabsstyling" activeClassName='is-active'>Assess</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/timetable" className="tabsstyling">Timetable</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/Lesson_modules" className="tabsstyling">Lesson Modules</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/login" onClick={this.state.loginState === true ? this.logout : null } className="tabsstyling">{this.state.loginState === true ? "Logout" : "Login"}</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">Login</Badge></NavLink>
          </NavItem> */}
          <NavItem></NavItem>
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              <DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown> */}
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }

  async componentDidUpdate(){
    await axios.get('/api/user/authenticate',{ withCredentials: true})
     .then(res=>{
       let loginState = true;
       this.setState({loginState});       
     })
     .catch(err=>{
      
     })
  }
  
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
