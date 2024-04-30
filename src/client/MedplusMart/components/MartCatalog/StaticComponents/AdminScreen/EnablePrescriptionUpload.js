import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem }  from 'reactstrap';
const EnablePrescriptionUpload = () => {
    const [dropdownOpen,setDropdownOpen]=useState(false);
    const toggle=()=>{
        setDropdownOpen(!dropdownOpen)
    }
  return (
        <section className='container p-3'>
            <h1 className='h5 mb-3'>Enable Prescription Upload</h1>
            <div className='d-flex justify-content-center'>
                <label className='mt-2'>Enable Prescription Upload</label>
                {/* <select name="yes" className='py-1 ml-3 pl-1' style={{"border-radius":"0.25rem"}}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select> */}
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
                                        <DropdownItem size="sm" tag="a" title="Yes">
                                           Yes
                                        </DropdownItem>
                                        <DropdownItem size="sm" tag="a" title="No">
                                           No
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg">Submit</button>
            </div>
        </section>
  )
}

export default EnablePrescriptionUpload