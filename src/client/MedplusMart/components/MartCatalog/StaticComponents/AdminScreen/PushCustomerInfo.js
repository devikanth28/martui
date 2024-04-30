import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem }  from 'reactstrap';
const PushCustomerInfo = () => {
    const [dropdownOpen,setDropdownOpen]=useState(false);
    const toggle=()=>{
        setDropdownOpen(!dropdownOpen)
    }
    const data = ["MORT", "MOB", "CRM"]
    return(
        <React.Fragment>
            <section className="container">
                <div className="py-3">
                    <h6 className="h5">Push Customer Info in Queue</h6>
                        <form>
                            <div>
                                <div className="each-group has-float-label">
                                <input className="form-control w-75" id="customerId" name="customerId" placeholder=" " type="text"/>
                                <label htmlfor="customerId">
                                    Enter Customer Ids
                                </label>
                                </div>
                            </div>
                            <div className="my-4">
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
                            </div>
                            <div>
                                <button type="button" className="btn btn-brand-gradient rounded-pill px-5 custom-btn-lg">
                                    Submit
                                </button>
                            </div>
                        </form>
                </div>
            </section>
        </React.Fragment>
    );
};

export default PushCustomerInfo;