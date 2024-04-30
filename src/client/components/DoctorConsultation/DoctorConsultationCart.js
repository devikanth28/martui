import React, { useState } from "react"
import Availablity from "./Availablity"
import DoctorSelectPatientModal from "./DoctorSelectPatientModal"
import SelectClinic  from "./SelectClinic"
import DoctorCartSummary from "./DoctorCartSummary"

const DoctorConsultationCart=(props)=>{
    console.log(props)
    const [openPopover,setPopover] = useState(true)
    const [storeType,setStoreType] = useState('Online')

    return  (
        <React.Fragment>
            <main role="main" className="container-lg container-fluid">
                <div className="row px-sm-3">
                    <div className="col-8 pl-0 pr-2">
                        <div className="labs-patient-info">
                            <div className="each-info mx-0 w-100">
                                <section>
                                    <div className="header">
                                        <p>Selected Patient</p>
                                    </div>
                                    <div className="lab-patient-card">
                                        <div>
                                        <h6 className="mb-0"><p className="patient-name text-truncate">Sampath Kumar Ch</p> <span className="badge badge-primary ml-1 align-top">MID 234568</span></h6>
                                        <small className="text-secondary">38Yrs / Male</small>
                                        </div>
                                        <a className="btn btn-outline-primary cate-btn" href="javascript:void(0)" title="Change" onClick={()=>setPopover(true)}>Change</a>
                                    </div>
                                </section>
                            </div>
                            {/* <div className="each-info">
                                <section>
                                    <div className="header">
                                        <p>Doctor Details</p>
                                    </div>
                                    <div className="px-3 pb-3 pt-2">
                                    <div className="input-group">
                                        <input type="text" id="docName" className="form-control " placeholder="Enter Doctor Name" autocomplete="off" aria-label="Enter Doctor Name" aria-describedby="button-apply" value=""/>
                                        <div className="input-group-append"><button className="btn btn-dark" type="button" style={{"min-width": "75px"}}>Submit</button></div>
                                    </div>
                                    </div>
                                </section>
                            </div> */}
                        </div>
                        <section>
                        <div className="header">
                                        <p> Doctor Details</p>
                                    </div>
                            <div className="p-3">
                                <div className="row">
                                    <div className="col pr-0">
                                        <p className="mb-2 font-14 text-secondary">Rn - 123456</p>
                                        <h6 className="mb-1">Dr. Manish</h6>
                                        <p className="mb-1 small text-secondary">Dermatalogist</p>
                                        <p className="mb-2 small">MD- Skin &amp; VD</p>
                                        <h6 className="mb-0 mt-3"><small>₹</small>&nbsp;99.00 <span className="text-secondary small ml-2"><small>₹</small>&nbsp;<del>99.00</del></span></h6>
                                    </div>
                                    <div className="align-items-end col d-flex">
                                        <button className="btn btn-block btn-sm d-flex justify-content-between align-items-center border-dark" type="button">
                                            <span>Member Price  <small>₹</small>&nbsp;2240.00</span>
                                            <span className="ml-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                                    <g transform="translate(-906.838 786) rotate(-90)">
                                                        <rect fill="none" width="24" height="24" transform="translate(762 906.838)"></rect>
                                                        <path fill="#343a40" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <Availablity isonline={props.location.state=='online'?true:false} iswalkin={props.location.state=='walkin'?true:false} storeType ={storeType} setStoreType = {setStoreType} />
                    </div>
                    <div className="col-4 pl-2 pr-0">
                        <DoctorCartSummary/>
                    </div>
                </div>
            </main>
            {openPopover && <DoctorSelectPatientModal openPopover={openPopover} setPopover={setPopover}/>}
            <footer className="footer fixed-bottom mt-auto py-2">
                <div className="container-lg container-fluid  px-0 px-sm-3">
                    <div className="row align-items-center no-gutters">
                        <div className="col-12 text-right"><button role="button" className="btn brand-secondary px-5">Back</button><button role="button" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" onClick={()=>{window.location.href = "/doctorPayments";}}>Confirm & Proceed</button></div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}
export default DoctorConsultationCart