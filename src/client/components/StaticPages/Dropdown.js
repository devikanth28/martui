import React from 'react';
import {Dropdown, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
export default class Example extends React.Component {
    constructor(props) {
        super(props);    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
    
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
  render() {
    return (
        <React.Fragment>
      <div  className="custom-dropdown custom-dropdown-border w-25">
   <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
      <DropdownToggle caret color="white" className="btn btn-block pl-2 pr-5">
         Select a Sub Reason
      </DropdownToggle>
      <DropdownMenu>
         <span className="caret"></span>                                    
         <DropdownItem   title="value" >
            Dameged Item
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
               <g transform="translate(-12 -13)">
                  <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                  <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
               </g>
            </svg>
         </DropdownItem>
         <DropdownItem   title="value" >
            Expired Item
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
               <g transform="translate(-12 -13)">
                  <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                  <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
               </g>
            </svg>
         </DropdownItem>
      </DropdownMenu>
   </Dropdown>
</div>
      </React.Fragment>
      );
    };
  }

