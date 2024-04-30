import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem }  from 'reactstrap';
const HolidayEtaConfiguration = () => {
    const [dropdownOpen,setDropdownOpen]=useState(false);
    const toggle=()=>{
        setDropdownOpen(!dropdownOpen)
    }
    const data = ["ALL", "STATE", "CITY", "WAREHOUSEID"]
  return (
    <section>
          <h1 className='h5 p-3 header'>Holiday ETA Configuration</h1>
          <div className='p-3'>
          <label>Area</label>
              <div className="custom-dropdown">
                  <Dropdown isOpen={dropdownOpen} toggle={toggle} onClick={(e) => e.stopPropagation()}>
                      <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                          Select type
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                              <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                                  <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                                  <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                              </g>
                          </svg>
                      </DropdownToggle>
                      <DropdownMenu id="dropdDownMenu" className="border-0 shadow">
                          {data.map((val) => {
                              return (
                                  <DropdownItem>{val}</DropdownItem>
                              )
                          })}
                      </DropdownMenu>
                  </Dropdown>
              </div>
              <div className='d-flex'>
                  <p className='mt-1'>Start Date</p>
                  <div className="form-group each-group has-float-label ml-3 form-group-error">
                      <input type="text" className="form-control type-address" maxlength="10" autocomplete="off" placeholder=" " value="" name="Date"/>
                      <label htmlFor="Date">YYYY-MM-DD</label>
                      <p className="d-none">Enter Proper Date</p>
                  </div>
              </div>
              <div className='d-flex'>
                  <p className='mt-1'>No Of Days</p>
                  <div className="form-group each-group has-float-label ml-3 form-group-error">
                      <input type="text" className="form-control type-address" maxlength="10" autocomplete="off" placeholder=" " value="" name="Days"/>
                      <label htmlFor="Days">Enter No Of Days</label>
                      <p className="d-none">plz Enter No Of days</p>
                  </div>
              </div>
              <button type="button" className="btn brand-secondary custom-btn-lg px-5 rounded-pill">close</button>
              <button type="button" role="button" className="btn btn-brand-gradient custom-btn-lg px-5 rounded-pill ml-3">Save</button>
            </div>
      </section>
  )
}

export default HolidayEtaConfiguration