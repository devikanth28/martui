import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem }  from 'reactstrap';
const ConfigureRedis = () => {
    const redisdb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,14, 15]
    const [dropdownOpen,setDropdownOpen]=useState(false);
    const toggle=()=>{
        setDropdownOpen(!dropdownOpen)
    }
    return(
        <section className="container mt-3 my-4 shadow">
            <div className="p-3 row">
            <div className="container-fluid">
                <div className="p-2">
                    <h5>Configure Redis Info</h5>
                </div>
            </div>
            <div className="d-flex justify-content-center col-12">
                <form noValidate className="col-12 d-flex flex-wrap justify-content-center align-items-baseline my-3">
                        <div className="col-2 form-group form-field form-group-error">
                            <div className="has-float-label">
                                <input type="text" id="RedisKey" name="RedisKey" className="form-control" placeholder=" " />
                                <label htmlFor="RedisKey">Redis Key</label>
                                <p className="d-none">Enter Valid Redis Key</p>
                            </div>
                        </div>
                        <div className="col-2 form-group form-field form-group-error">
                            <div className="has-float-label">
                                <input type="text" id="RedisValue" name="RedisValue" className="form-control" placeholder=" " />
                                <label htmlFor="RedisValue">Redis Value</label>
                                <p className="d-none">Enter Valid Redis Value</p>
                            </div>
                        </div>
                        <div className="col-2 form-group form-field form-group-error">
                            <div className="has-float-label">
                                <input type="text" id="expiry" name="expiry" className="form-control" placeholder=" " />
                                <label htmlFor="expiry">Expiry(Hours)</label>
                                <p className="d-none">Enter Valid Expiry Houres</p>
                            </div>
                        </div>
                        {/* <div className="col-2 form-group form-field">
                            <div className="has-float-label">
                                <select className="form-control" name="redisDB" aria-label="Select Type" placeholder=" ">
                                <option value="RedisDB">RedisDB</option>
                                    {redisdb.map((val) => {
                                        return (<option key={val} value={val}>{val}</option>)
                                    })}
                                </select>
                            </div>
                        </div> */}
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
                                    {redisdb.map((val) => {
                                        return (
                                        <DropdownItem>{val}</DropdownItem>
                                        )
                                    })}
                                       
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        <div className="col-2 px-0">
                            <button type="submit" class="btn  btn-brand-gradient ml-3 px-5 rounded-pill custom-btn">Submit</button>
                        </div>
                </form>
            </div>
        </div>
        </section>
        
    )

}

export default ConfigureRedis;