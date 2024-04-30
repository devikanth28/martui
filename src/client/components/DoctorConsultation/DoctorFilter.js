import React, { useState } from 'react';
import { Col, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { Collapse } from 'reactstrap';
import RangeSlider from '../MartCatalogStaticPages/Filters/RangeSlider';
function DoctorFilter(props) {
    const [filterCollapse,setFilterCollapse] = useState({"specialization": false, "online": false,"gender": false})
    const CloseButton = <button type="button" onClick={props.toggleFilterModal} className="close icons clear-icn" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
    return (
        <React.Fragment>
            <Modal className="modal-dialog-right notification doctor-filter-modal" isOpen={props.filterModalOpen} toggle={props.toggleFilterModal}>
                <ModalHeader toggle={props.toggleFilterModal} close={CloseButton}>
                    Filters
                </ModalHeader>
                <ModalBody className="p-4">
                    <div className="filter-container">
                        <div className='each-filter-collapse'>
                            <a href="javascript:void(0)" title="Specialization" className="collapse-toggle no-underline" onClick={()=>setFilterCollapse((filterCollapse)=>{return ({...filterCollapse,"specialization":!filterCollapse.specialization})})}>
                                <div>
                                    <h6 className="mb-1">Specialization</h6>
                                    <small className="text-secondary">Cardiology, Orthopedics</small>
                                </div>
                                <span className="ml-2">
                                    <svg className={ filterCollapse.specialization ? "rotate-bottom collapse-arrow" : "rotate-up collapse-arrow"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <g transform="translate(-762 -906.838)">
                                            <rect fill="none" width="18" height="18" transform="translate(762 906.838)"/>
                                            <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)"/>
                                        </g>
                                    </svg>
                                </span>
                            </a>
                            <Collapse isOpen={filterCollapse.specialization}>
                                <div className="form-group has-float-label">
                                    <input type="text" className="form-control form-sm small" id="filter-doctor" name="filter-doctor" maxLength="100" autoComplete="off"  required placeholder=" " value=""/>
                                    <label for="filter-doctor">Search specialization</label>
                                </div>
                                <div>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="specialization1" name="filer-specialization"/>
                                        <label class="custom-control-label" for="specialization1">
                                            <div className="d-flex justify-content-between">
                                                <span>Specialization</span>
                                                <span>01</span>
                                            </div>
                                        </label>
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="specialization2" name="filer-specialization"/>
                                        <label class="custom-control-label" for="specialization2">
                                            <div className="d-flex justify-content-between">
                                                <span>Specialization</span>
                                                <span>01</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </Collapse>
                            <hr className="my-4"/>
                        </div>
                        <div className='each-filter-collapse'>
                            <a href="javascript:void(0)" title="Specialization" className="collapse-toggle no-underline" onClick={()=>setFilterCollapse((filterCollapse)=>{return ({...filterCollapse,"online":!filterCollapse.online})})}>
                                <div>
                                    <h6 className="mb-1">Online Status</h6>
                                    <small className="text-secondary">Online</small>
                                </div>
                                <span className="ml-2">
                                    <svg className={ filterCollapse.online ? "rotate-bottom collapse-arrow" : "rotate-up collapse-arrow"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <g transform="translate(-762 -906.838)">
                                            <rect fill="none" width="18" height="18" transform="translate(762 906.838)"/>
                                            <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)"/>
                                        </g>
                                    </svg>
                                </span>
                            </a>
                            <Collapse isOpen={filterCollapse.online}>
                                <div>
                                    <div class="custom-control custom-radio">
                                        <input type="radio" class="custom-control-input" id="online" name="filer-online"/>
                                        <label class="custom-control-label" for="online">
                                            <span>Online</span>
                                        </label>
                                    </div>
                                    <div class="custom-control custom-radio">
                                        <input type="radio" class="custom-control-input" id="offline" name="filer-online"/>
                                        <label class="custom-control-label" for="offline">
                                            <span>Offline</span>
                                        </label>
                                    </div>
                                </div>
                            </Collapse>
                            <hr className="my-4"/>
                        </div>
                        <div className='each-filter-collapse'>
                            <a href="javascript:void(0)" title="Specialization" className="collapse-toggle no-underline" onClick={()=>setFilterCollapse((filterCollapse)=>{return ({...filterCollapse,"gender":!filterCollapse.gender})})}>
                                <div>
                                    <h6 className="mb-1">Gender</h6>
                                    <small className="text-secondary">Male</small>
                                </div>
                                <span className="ml-2">
                                    <svg className={ filterCollapse.gender ? "rotate-bottom collapse-arrow" : "rotate-up collapse-arrow"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <g transform="translate(-762 -906.838)">
                                            <rect fill="none" width="18" height="18" transform="translate(762 906.838)"/>
                                            <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)"/>
                                        </g>
                                    </svg>
                                </span>
                            </a>
                            <Collapse isOpen={filterCollapse.gender}>
                                <div>
                                    <div class="custom-control custom-radio">
                                        <input type="radio" class="custom-control-input" id="male" name="filer-gender"/>
                                        <label class="custom-control-label" for="male">
                                            <span>Male</span>
                                        </label>
                                    </div>
                                    <div class="custom-control custom-radio">
                                        <input type="radio" class="custom-control-input" id="female" name="filer-gender"/>
                                        <label class="custom-control-label" for="female">
                                            <span>Female</span>
                                        </label>
                                    </div>
                                </div>
                            </Collapse>
                            <hr className="my-4"/>
                        </div>
                        <RangeSlider/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="w-100">
                        <div className="row">
                            <div className="col-4 pr-0">
                                <button className=" btn brand-secondary btn-block">Clear All</button>
                            </div>
                            <div className="col-8">
                                <button className="btn btn-brand btn-block">View (10)</button>
                            </div>
                        </div>
                    </div>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

export default DoctorFilter;