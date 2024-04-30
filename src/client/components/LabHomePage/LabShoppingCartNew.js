import React, { useState } from "react"
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import EditPatientModel from "./EditPatientModel"
const LabShoppingCartNew=(props)=>{
    const [openPatientModal, setOpenPatientModal] = useState(true)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openGetPhysicalReportModal, setOpenGetPhysicalReportModal] = useState(false)
    const [editAddressModal, setEditAddressModal] = useState(false)
    function toggleOpenPatientModal(){
        setOpenPatientModal(!openPatientModal)
    }
    const showEditModel=()=>{
        toggleOpenPatientModal()
        toggleOpenEditModal()
    }
    function toggleOpenEditModal(){
        setOpenEditModal(!openEditModal)
    }
    function toggleGetPhysicalReportModal(){
        setOpenGetPhysicalReportModal(!openGetPhysicalReportModal)
    }
    function toggleEditAddressModal(){
        setEditAddressModal(!editAddressModal)
    }
    const showEditAddressModel=()=>{
        toggleGetPhysicalReportModal()
        toggleEditAddressModal()
    }
    return(
        <React.Fragment>
            <main role="main" className="container-fluid container-lg">
                <div className="row">
                    <div className="col-8 pl-0 pr-2">
                        <div className="labs-patient-info">
                            <div className="each-info">
                                <section>
                                    <div className="header">
                                        <p>Selected Patient</p>
                                    </div>
                                    <div className="lab-patient-card">
                                        <div>
                                        <h6 className="mb-0"><p className="patient-name text-truncate">Sampath Kumar Ch</p> <span className="badge badge-primary ml-1 align-top">MID 234568</span></h6>
                                        <small className="text-secondary">38Yrs / Male</small>
                                        </div>
                                        <a className="btn btn-outline-primary cate-btn" href="javascript:void(0)" title="Change" onClick={()=>toggleOpenPatientModal()}>Change</a>
                                    </div>
                                </section>
                            </div>
                            <div className="each-info">
                                <section>
                                    <div className="header">
                                        <p>Add Doctor to Patient</p>
                                    </div>
                                    <div className="px-3 pb-3 pt-2">
                                    <div className="input-group">
                                        <input type="text" id="docName" className="form-control " placeholder="Enter Doctor Name" autocomplete="off" aria-label="Enter Doctor Name" aria-describedby="button-apply" value=""/>
                                        <div className="input-group-append"><button className="btn btn-dark" type="button" style={{"min-width": "75px"}}>Submit</button></div>
                                    </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <section>
                            <div className="header">
                                <p>Home collection is available for some of the tests you have selected. Would you like:</p>
                            </div>
                            <div className="d-flex justify-content-between px-3 pb-3 pt-2">
                                <div className="w-100">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="labCollection" className="custom-control-input" name="collectionType"/>
                                        <label className="custom-control-label pl-2 pointer" for="labCollection">
                                        <p className="font-weight-bold mb-0 font-14">All samples collected at Lab</p>
                                        <small>All sample are collected at Lab Walk-in</small>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-100">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="partialLabCollection" className="custom-control-input" name="collectionType"/>
                                        <label className="custom-control-label pl-2 pointer" for="partialLabCollection">
                                        <p className="font-weight-bold mb-0 font-14">Partial Home sample collection</p>
                                        <small>3 Tests at Home and 2 tests at Lab Walk-in</small>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="header">
                                <p>Selected Tests (for Home Collection)</p>
                            </div>
                            <ul className="product-listview list-group list-group-flush test-items">
                                <li className="list-group-item">
                                    <div className="each-test">
                                        <h6>HEMOGLOBIN (Hb)</h6>
                                        <p className="mb-0"><small>Price</small> <span className="font-weight-bold"><strong className="rupee">₹</strong>&nbsp;80.00</span></p>
                                        <small className="text-secondary">Note: Do not eat or drink anything other than water for 8-12 hours before the test.</small>
                                        <button className="action btn btn-outline-danger rounded-pill test-action" type="button">
                                        <span className="spinner-border spinner-border-sm d-none align-text-top" role="status" aria-hidden="true"></span><span className="sr-only"></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
                                            <g id="Group_5352" data-name="Group 5352" transform="translate(-180.059 -283.942)">
                                                <rect id="Rectangle_3094" data-name="Rectangle 3094" width="20" height="20" transform="translate(180.059 283.942)" fill="none"></rect>
                                                <g id="Group_5352-2" data-name="Group 5352" transform="translate(182.357 285.718)">
                                                    <path id="Path_3051" data-name="Path 3051" d="M197.765,288.24H194.01v-.159a2.012,2.012,0,0,0-2-2.02h-2.517a2.01,2.01,0,0,0-2,2.02v.159h-4.115a.568.568,0,1,0,0,1.136h1.417v10.868a2.378,2.378,0,0,0,2.36,2.384h7.2a2.376,2.376,0,0,0,2.358-2.383V289.376h1.059a.568.568,0,0,0,0-1.136Zm-8.276-1.044h2.52a.883.883,0,0,1,.878.885v.157h-4.268v-.157A.884.884,0,0,1,189.489,287.2Zm6.1,13.048a1.245,1.245,0,0,1-1.238,1.247h-7.2a1.244,1.244,0,0,1-1.238-1.247V289.376h9.671Z" transform="translate(-182.808 -286.061)"></path>
                                                    <path id="Path_3052" data-name="Path 3052" d="M192.249,301.464h.022a.6.6,0,0,0,.594-.571v-6.8a.592.592,0,1,0-1.185,0v6.753A.6.6,0,0,0,192.249,301.464Z" transform="translate(-184.33 -287.337)"></path>
                                                    <path id="Path_3053" data-name="Path 3053" d="M195.276,301.47h.022a.6.6,0,0,0,.594-.571l0-.051V294.1a.592.592,0,0,0-.592-.566h-.022a.6.6,0,0,0-.57.567v6.751A.6.6,0,0,0,195.276,301.47Z" transform="translate(-184.85 -287.343)"></path>
                                                    <path id="Path_3054" data-name="Path 3054" d="M189.223,301.464h.022a.6.6,0,0,0,.593-.571v-6.8a.592.592,0,1,0-1.184,0v6.753A.6.6,0,0,0,189.223,301.464Z" transform="translate(-183.811 -287.337)"></path>
                                                </g>
                                            </g>
                                        </svg>
                                        Remove
                                        </button>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="each-test">
                                        <h6>HEMOGLOBIN (Hb)</h6>
                                        <p className="mb-0"><small>Price</small> <span className="font-weight-bold"><strong className="rupee">₹</strong>&nbsp;80.00</span></p>
                                        <small className="text-secondary">Note: Do not eat or drink anything other than water for 8-12 hours before the test.</small>
                                        <button className="action btn btn-outline-danger rounded-pill test-action" type="button">
                                        <span className="spinner-border spinner-border-sm d-none align-text-top" role="status" aria-hidden="true"></span><span className="sr-only"></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
                                            <g id="Group_5352" data-name="Group 5352" transform="translate(-180.059 -283.942)">
                                                <rect id="Rectangle_3094" data-name="Rectangle 3094" width="20" height="20" transform="translate(180.059 283.942)" fill="none"></rect>
                                                <g id="Group_5352-2" data-name="Group 5352" transform="translate(182.357 285.718)">
                                                    <path id="Path_3051" data-name="Path 3051" d="M197.765,288.24H194.01v-.159a2.012,2.012,0,0,0-2-2.02h-2.517a2.01,2.01,0,0,0-2,2.02v.159h-4.115a.568.568,0,1,0,0,1.136h1.417v10.868a2.378,2.378,0,0,0,2.36,2.384h7.2a2.376,2.376,0,0,0,2.358-2.383V289.376h1.059a.568.568,0,0,0,0-1.136Zm-8.276-1.044h2.52a.883.883,0,0,1,.878.885v.157h-4.268v-.157A.884.884,0,0,1,189.489,287.2Zm6.1,13.048a1.245,1.245,0,0,1-1.238,1.247h-7.2a1.244,1.244,0,0,1-1.238-1.247V289.376h9.671Z" transform="translate(-182.808 -286.061)"></path>
                                                    <path id="Path_3052" data-name="Path 3052" d="M192.249,301.464h.022a.6.6,0,0,0,.594-.571v-6.8a.592.592,0,1,0-1.185,0v6.753A.6.6,0,0,0,192.249,301.464Z" transform="translate(-184.33 -287.337)"></path>
                                                    <path id="Path_3053" data-name="Path 3053" d="M195.276,301.47h.022a.6.6,0,0,0,.594-.571l0-.051V294.1a.592.592,0,0,0-.592-.566h-.022a.6.6,0,0,0-.57.567v6.751A.6.6,0,0,0,195.276,301.47Z" transform="translate(-184.85 -287.343)"></path>
                                                    <path id="Path_3054" data-name="Path 3054" d="M189.223,301.464h.022a.6.6,0,0,0,.593-.571v-6.8a.592.592,0,1,0-1.184,0v6.753A.6.6,0,0,0,189.223,301.464Z" transform="translate(-183.811 -287.337)"></path>
                                                </g>
                                            </g>
                                        </svg>
                                        Remove
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </section>
                        <section>
                            <div className="header">
                                <p>Selected Tests ( for Lab Walk-In)</p>
                            </div>
                            <ul className="product-listview list-group list-group-flush test-items">
                                <li className="list-group-item">
                                    <div className="each-test">
                                        <h6>HEMOGLOBIN (Hb)</h6>
                                        <p className="mb-0"><small>Price</small> <span className="font-weight-bold"><strong className="rupee">₹</strong>&nbsp;80.00</span></p>
                                        <small className="text-secondary">Note: Do not eat or drink anything other than water for 8-12 hours before the test.</small>
                                        <button className="action btn btn-outline-danger rounded-pill test-action" type="button">
                                        <span className="spinner-border spinner-border-sm d-none align-text-top" role="status" aria-hidden="true"></span><span className="sr-only"></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
                                            <g id="Group_5352" data-name="Group 5352" transform="translate(-180.059 -283.942)">
                                                <rect id="Rectangle_3094" data-name="Rectangle 3094" width="20" height="20" transform="translate(180.059 283.942)" fill="none"></rect>
                                                <g id="Group_5352-2" data-name="Group 5352" transform="translate(182.357 285.718)">
                                                    <path id="Path_3051" data-name="Path 3051" d="M197.765,288.24H194.01v-.159a2.012,2.012,0,0,0-2-2.02h-2.517a2.01,2.01,0,0,0-2,2.02v.159h-4.115a.568.568,0,1,0,0,1.136h1.417v10.868a2.378,2.378,0,0,0,2.36,2.384h7.2a2.376,2.376,0,0,0,2.358-2.383V289.376h1.059a.568.568,0,0,0,0-1.136Zm-8.276-1.044h2.52a.883.883,0,0,1,.878.885v.157h-4.268v-.157A.884.884,0,0,1,189.489,287.2Zm6.1,13.048a1.245,1.245,0,0,1-1.238,1.247h-7.2a1.244,1.244,0,0,1-1.238-1.247V289.376h9.671Z" transform="translate(-182.808 -286.061)"></path>
                                                    <path id="Path_3052" data-name="Path 3052" d="M192.249,301.464h.022a.6.6,0,0,0,.594-.571v-6.8a.592.592,0,1,0-1.185,0v6.753A.6.6,0,0,0,192.249,301.464Z" transform="translate(-184.33 -287.337)"></path>
                                                    <path id="Path_3053" data-name="Path 3053" d="M195.276,301.47h.022a.6.6,0,0,0,.594-.571l0-.051V294.1a.592.592,0,0,0-.592-.566h-.022a.6.6,0,0,0-.57.567v6.751A.6.6,0,0,0,195.276,301.47Z" transform="translate(-184.85 -287.343)"></path>
                                                    <path id="Path_3054" data-name="Path 3054" d="M189.223,301.464h.022a.6.6,0,0,0,.593-.571v-6.8a.592.592,0,1,0-1.184,0v6.753A.6.6,0,0,0,189.223,301.464Z" transform="translate(-183.811 -287.337)"></path>
                                                </g>
                                            </g>
                                        </svg>
                                        Remove
                                        </button>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="each-test">
                                        <h6>HEMOGLOBIN (Hb)</h6>
                                        <p className="mb-0"><small>Price</small> <span className="font-weight-bold"><strong className="rupee">₹</strong>&nbsp;80.00</span></p>
                                        <small className="text-secondary">Note: Do not eat or drink anything other than water for 8-12 hours before the test.</small>
                                        <button className="action btn btn-outline-danger rounded-pill test-action" type="button">
                                        <span className="spinner-border spinner-border-sm d-none align-text-top" role="status" aria-hidden="true"></span><span className="sr-only"></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
                                            <g id="Group_5352" data-name="Group 5352" transform="translate(-180.059 -283.942)">
                                                <rect id="Rectangle_3094" data-name="Rectangle 3094" width="20" height="20" transform="translate(180.059 283.942)" fill="none"></rect>
                                                <g id="Group_5352-2" data-name="Group 5352" transform="translate(182.357 285.718)">
                                                    <path id="Path_3051" data-name="Path 3051" d="M197.765,288.24H194.01v-.159a2.012,2.012,0,0,0-2-2.02h-2.517a2.01,2.01,0,0,0-2,2.02v.159h-4.115a.568.568,0,1,0,0,1.136h1.417v10.868a2.378,2.378,0,0,0,2.36,2.384h7.2a2.376,2.376,0,0,0,2.358-2.383V289.376h1.059a.568.568,0,0,0,0-1.136Zm-8.276-1.044h2.52a.883.883,0,0,1,.878.885v.157h-4.268v-.157A.884.884,0,0,1,189.489,287.2Zm6.1,13.048a1.245,1.245,0,0,1-1.238,1.247h-7.2a1.244,1.244,0,0,1-1.238-1.247V289.376h9.671Z" transform="translate(-182.808 -286.061)"></path>
                                                    <path id="Path_3052" data-name="Path 3052" d="M192.249,301.464h.022a.6.6,0,0,0,.594-.571v-6.8a.592.592,0,1,0-1.185,0v6.753A.6.6,0,0,0,192.249,301.464Z" transform="translate(-184.33 -287.337)"></path>
                                                    <path id="Path_3053" data-name="Path 3053" d="M195.276,301.47h.022a.6.6,0,0,0,.594-.571l0-.051V294.1a.592.592,0,0,0-.592-.566h-.022a.6.6,0,0,0-.57.567v6.751A.6.6,0,0,0,195.276,301.47Z" transform="translate(-184.85 -287.343)"></path>
                                                    <path id="Path_3054" data-name="Path 3054" d="M189.223,301.464h.022a.6.6,0,0,0,.593-.571v-6.8a.592.592,0,1,0-1.184,0v6.753A.6.6,0,0,0,189.223,301.464Z" transform="translate(-183.811 -287.337)"></path>
                                                </g>
                                            </g>
                                        </svg>
                                        Remove
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <div className="col-4 pl-2 pr-0">
                        <div className="custom-control custom-checkbox font-weight-normal">
                            <input type="checkbox" className="custom-control-input" id="need-physical-copy"  onClick={() => toggleGetPhysicalReportModal()} />
                            <label className="custom-control-label pointer small" htmlFor="need-physical-copy">I need a physical copy of my reports delivered to my address (Rs. 25/-)</label>
                        </div>
                    </div>
                </div>
            </main>





            <Modal backdrop="static" keyboard={false} isOpen={openPatientModal} className="modal-dialog my-account-modal modal-dialog-centered hide-close" tabIndex="-1" autoFocus={false}>
                <ModalHeader className="labs-patient-header">
                    Select Patient
                    <button className="btn btn-outline-brand btn-sm float-right" onClick={()=>showEditModel()}>Add New Patient</button>
                </ModalHeader>
                <ModalBody className="p-3">
                    <div className="scroll-content">
                        <div className="border rounded mb-3 p-2">
                            <div className="custom-control custom-radio font-weight-normal d-flex justify-content-between">
                                <input type="radio" className="custom-control-input" name="patients"  id="patient-1"/>
                                <label for="patient-1" className="custom-control-label pointer w-100">
                                    <div>
                                        <h6 className="mb-0">Sampath Kumar Ch <span className="badge badge-primary ml-1">MID 234568</span></h6>
                                        <small className="text-secondary">38Yrs / Male</small>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="border rounded mb-3 p-2">
                            <div className="custom-control custom-radio font-weight-normal d-flex justify-content-between">
                                <input type="radio" className="custom-control-input" name="patients"  id="patient-2"/>
                                <label for="patient-2" className="custom-control-label pointer w-100">
                                    <div>
                                        <h6 className="mb-0">Sampath Kumar Ch <span className="badge badge-primary ml-1">MID 234568</span></h6>
                                        <small className="text-secondary">38Yrs / Male</small>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="border rounded mb-0 p-2">
                            <div className="custom-control custom-radio font-weight-normal d-flex justify-content-between align-items-center">
                                <input type="radio" className="custom-control-input" name="patients"  id="patient-3"/>
                                <label for="patient-3" className="custom-control-label pointer w-100">
                                    <div>
                                        <h6 className="mb-0">Sampath Kumar Ch <span className="badge badge-primary ml-1">MID 234568</span></h6>
                                        <small className="text-secondary">38Yrs / Male</small>
                                    </div>
                                </label>
                                <a className="btn btn-link text-primary no-underline mr-n2" href="javascript:void(0)" title="Edit" onClick={()=> showEditModel()}>Edit</a>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={() => toggleOpenPatientModal()}>Cancel</button>
                        <button type="button" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" onClick={() => toggleOpenPatientModal()}>Save & Continue</button>
                    </div>
                </ModalBody>
            </Modal>
            <EditPatientModel openEditModal={openEditModal} toggleOpenEditModal={toggleOpenEditModal} showEditModel={showEditModel}/>
            <Modal backdrop="static" keyboard={false} isOpen={openGetPhysicalReportModal} className="modal-dialog my-account-modal modal-dialog-centered hide-close" tabIndex="-1" autoFocus={false}>
                <ModalHeader className="labs-patient-header">
                    Get Physical Report
                    <button className="btn btn-outline-success btn-sm float-right" onClick={()=>showEditAddressModel()}>Add New Address</button>
                </ModalHeader>
                <ModalBody className="p-3">
                    <div className="scroll-content">
                        <div className="border rounded mb-3 p-2">
                            <div className="custom-control custom-radio font-weight-normal">
                                <input type="radio" className="custom-control-input" name="physical-report-address"  id="address-1"/>
                                <label for="address-1" className="custom-control-label pointer w-100">
                                    <div>
                                        <p className="font-weight-bold mb-1">Sampath Kumar Ch</p>
                                        <p className="mb-0">404, 5th floor, Manasa Apartments, Tata Chary Colony, Shyamlal, Begumpet, Hyderabad, Andhra Pradesh 500016</p>
                                    </div>
                                </label>
                                <p className="d-block mt-2 mb-0 font-14">
                                    <a className="no-underline text-primary" href="tel:04067006700" title="Click to Call">
                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                            <g transform="translate(-180.438 -213.832)">
                                                <rect width="24" height="24" transform="translate(180.438 213.832)" fill="none"></rect>
                                                <g transform="translate(182.199 215.78)">
                                                    <g transform="translate(0 1.429)">
                                                    <path d="M185.394,217.171a2.043,2.043,0,0,0-.705.124,3.87,3.87,0,0,0-.728.361l-.369.26a3.029,3.029,0,0,0-.264.236,3.822,3.822,0,0,0-.979,1.742c-.771,2.889,1.118,7.237,4.7,10.82,3,3,6.621,4.87,9.442,4.87a5.349,5.349,0,0,0,1.377-.171,3.8,3.8,0,0,0,1.738-.975,2.837,2.837,0,0,0,.265-.3l.262-.374a3.9,3.9,0,0,0,.334-.689,2.167,2.167,0,0,0-.821-2.518l-2.625-1.833a2.261,2.261,0,0,0-3.063.546l-.509.731-.126-.089a24.713,24.713,0,0,1-5.47-5.468l-.089-.127.732-.51a2.2,2.2,0,0,0,.545-3.063l-1.832-2.624A2.229,2.229,0,0,0,185.394,217.171Zm11.1,17.253c-2.524,0-5.828-1.735-8.623-4.53-3.246-3.247-5.057-7.237-4.4-9.7a2.668,2.668,0,0,1,.678-1.22,1.807,1.807,0,0,1,.135-.126l.318-.225a2.535,2.535,0,0,1,.493-.24,1.03,1.03,0,0,1,1.162.4l1.831,2.622a1.042,1.042,0,0,1-.257,1.449l-1.193.833a.576.576,0,0,0-.16.783,24.809,24.809,0,0,0,6.813,6.815.585.585,0,0,0,.785-.16l.833-1.195a1.071,1.071,0,0,1,1.447-.257l2.624,1.833a1.006,1.006,0,0,1,.4,1.163l-.007.017a2.439,2.439,0,0,1-.206.435l-.223.321a1.537,1.537,0,0,1-.156.173,2.649,2.649,0,0,1-1.219.677A4.167,4.167,0,0,1,196.492,234.424Z" transform="translate(-182.178 -217.171)" fill="#343a40"></path>
                                                    </g>
                                                    <g transform="translate(9.963)">
                                                    <path d="M192.615,215.757a.58.58,0,0,0-.034,1.158,9.141,9.141,0,0,1,8.548,8.546.589.589,0,0,0,.621.543.579.579,0,0,0,.537-.615,10.284,10.284,0,0,0-3-6.636h0a10.28,10.28,0,0,0-6.634-3Z" transform="translate(-192.036 -215.757)" fill="#343a40"></path>
                                                    </g>
                                                    <g transform="translate(8.736 3.129)">
                                                    <path d="M191.427,218.853a.611.611,0,0,0-.6.544.58.58,0,0,0,.145.419.572.572,0,0,0,.4.2h0a6.708,6.708,0,0,1,6.274,6.275.589.589,0,0,0,.621.541h0a.578.578,0,0,0,.536-.613,7.869,7.869,0,0,0-7.362-7.36Z" transform="translate(-190.822 -218.853)" fill="#343a40"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        04067006700
                                    </a>
                                    <a className="text-primary ml-3 no-underline" href="http://maps.google.com/?saddr=17.4485835,78.39080349999999&amp;daddr=17.43716000,78.36606000" target="_blank" title="Get Directions">
                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                            <g transform="translate(-336.335 -141.914)">
                                                <rect fill="none" width="18" height="18" transform="translate(336.335 141.914)"></rect>
                                                <g transform="translate(336.335 141.914)">
                                                <path fill="#404040" d="M348.655,145.064a9,9,0,1,0,9,9A9.011,9.011,0,0,0,348.655,145.064Zm0,17.01a8.01,8.01,0,1,1,8.01-8.01A8.019,8.019,0,0,1,348.655,162.074Z" transform="translate(-339.655 -145.064)"></path>
                                                <g transform="translate(3.732 4.602)">
                                                    <path fill="#404040" d="M351.815,150.1a.985.985,0,0,0-.451.11l-7.087,3.642a.99.99,0,0,0,.242,1.847l2.985.649a.137.137,0,0,1,.1.077l1.272,2.777a.99.99,0,0,0,1.856-.158l2.045-7.7a.991.991,0,0,0-.337-1.023h0A.985.985,0,0,0,351.815,150.1Zm-2.108,8.3a.135.135,0,0,1-.124-.08l-1.3-2.841-3.053-.664a.137.137,0,0,1-.034-.256l6.256-3.216a.136.136,0,0,1,.148.015.138.138,0,0,1,.047.143l-1.8,6.8a.137.137,0,0,1-.121.1Z" transform="translate(-343.741 -150.104)"></path>
                                                </g>
                                                </g>
                                            </g>
                                        </svg>
                                        Get Directions
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="border rounded mb-0 p-2">
                            <div className="custom-control custom-radio font-weight-normal">
                                <input type="radio" className="custom-control-input" name="physical-report-address"  id="address-2"/>
                                <label for="address-2" className="custom-control-label pointer w-100">
                                    <div>
                                        <p className="font-weight-bold mb-1">Sampath Kumar Ch</p>
                                        <p className="mb-0">404, 5th floor, Manasa Apartments, Tata Chary Colony, Shyamlal, Begumpet, Hyderabad, Andhra Pradesh 500016</p>
                                    </div>
                                </label>
                                <p className="d-block mt-2 mb-0 font-14">
                                    <a className="no-underline text-primary" href="tel:04067006700" title="Click to Call">
                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                            <g transform="translate(-180.438 -213.832)">
                                                <rect width="24" height="24" transform="translate(180.438 213.832)" fill="none"></rect>
                                                <g transform="translate(182.199 215.78)">
                                                    <g transform="translate(0 1.429)">
                                                    <path d="M185.394,217.171a2.043,2.043,0,0,0-.705.124,3.87,3.87,0,0,0-.728.361l-.369.26a3.029,3.029,0,0,0-.264.236,3.822,3.822,0,0,0-.979,1.742c-.771,2.889,1.118,7.237,4.7,10.82,3,3,6.621,4.87,9.442,4.87a5.349,5.349,0,0,0,1.377-.171,3.8,3.8,0,0,0,1.738-.975,2.837,2.837,0,0,0,.265-.3l.262-.374a3.9,3.9,0,0,0,.334-.689,2.167,2.167,0,0,0-.821-2.518l-2.625-1.833a2.261,2.261,0,0,0-3.063.546l-.509.731-.126-.089a24.713,24.713,0,0,1-5.47-5.468l-.089-.127.732-.51a2.2,2.2,0,0,0,.545-3.063l-1.832-2.624A2.229,2.229,0,0,0,185.394,217.171Zm11.1,17.253c-2.524,0-5.828-1.735-8.623-4.53-3.246-3.247-5.057-7.237-4.4-9.7a2.668,2.668,0,0,1,.678-1.22,1.807,1.807,0,0,1,.135-.126l.318-.225a2.535,2.535,0,0,1,.493-.24,1.03,1.03,0,0,1,1.162.4l1.831,2.622a1.042,1.042,0,0,1-.257,1.449l-1.193.833a.576.576,0,0,0-.16.783,24.809,24.809,0,0,0,6.813,6.815.585.585,0,0,0,.785-.16l.833-1.195a1.071,1.071,0,0,1,1.447-.257l2.624,1.833a1.006,1.006,0,0,1,.4,1.163l-.007.017a2.439,2.439,0,0,1-.206.435l-.223.321a1.537,1.537,0,0,1-.156.173,2.649,2.649,0,0,1-1.219.677A4.167,4.167,0,0,1,196.492,234.424Z" transform="translate(-182.178 -217.171)" fill="#343a40"></path>
                                                    </g>
                                                    <g transform="translate(9.963)">
                                                    <path d="M192.615,215.757a.58.58,0,0,0-.034,1.158,9.141,9.141,0,0,1,8.548,8.546.589.589,0,0,0,.621.543.579.579,0,0,0,.537-.615,10.284,10.284,0,0,0-3-6.636h0a10.28,10.28,0,0,0-6.634-3Z" transform="translate(-192.036 -215.757)" fill="#343a40"></path>
                                                    </g>
                                                    <g transform="translate(8.736 3.129)">
                                                    <path d="M191.427,218.853a.611.611,0,0,0-.6.544.58.58,0,0,0,.145.419.572.572,0,0,0,.4.2h0a6.708,6.708,0,0,1,6.274,6.275.589.589,0,0,0,.621.541h0a.578.578,0,0,0,.536-.613,7.869,7.869,0,0,0-7.362-7.36Z" transform="translate(-190.822 -218.853)" fill="#343a40"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        04067006700
                                    </a>
                                    <a className="text-primary ml-3 no-underline" href="http://maps.google.com/?saddr=17.4485835,78.39080349999999&amp;daddr=17.43716000,78.36606000" target="_blank" title="Get Directions">
                                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                            <g transform="translate(-336.335 -141.914)">
                                                <rect fill="none" width="18" height="18" transform="translate(336.335 141.914)"></rect>
                                                <g transform="translate(336.335 141.914)">
                                                <path fill="#404040" d="M348.655,145.064a9,9,0,1,0,9,9A9.011,9.011,0,0,0,348.655,145.064Zm0,17.01a8.01,8.01,0,1,1,8.01-8.01A8.019,8.019,0,0,1,348.655,162.074Z" transform="translate(-339.655 -145.064)"></path>
                                                <g transform="translate(3.732 4.602)">
                                                    <path fill="#404040" d="M351.815,150.1a.985.985,0,0,0-.451.11l-7.087,3.642a.99.99,0,0,0,.242,1.847l2.985.649a.137.137,0,0,1,.1.077l1.272,2.777a.99.99,0,0,0,1.856-.158l2.045-7.7a.991.991,0,0,0-.337-1.023h0A.985.985,0,0,0,351.815,150.1Zm-2.108,8.3a.135.135,0,0,1-.124-.08l-1.3-2.841-3.053-.664a.137.137,0,0,1-.034-.256l6.256-3.216a.136.136,0,0,1,.148.015.138.138,0,0,1,.047.143l-1.8,6.8a.137.137,0,0,1-.121.1Z" transform="translate(-343.741 -150.104)"></path>
                                                </g>
                                                </g>
                                            </g>
                                        </svg>
                                        Get Directions
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={() => toggleGetPhysicalReportModal()}>Cancel</button>
                        <button type="button" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" onClick={() => toggleGetPhysicalReportModal()}>Save & Continue</button>
                    </div>
                </ModalBody>
            </Modal>


            <footer class="footer fixed-bottom mt-auto py-2">
                <div class="container px-0">
                    <div class="row align-items-center no-gutters">
                        <div class="col-12 text-right"><button type="button" class="brand-secondary btn px-5 rounded-pill">Add More Tests</button><button type="submit" class="btn btn-brand-gradient ml-3 px-5 rounded-pill">Proceed to sample Collection</button></div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}
export default LabShoppingCartNew