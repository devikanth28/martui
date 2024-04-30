import React from 'react';
import MyBookingsPlaceHolder from "../DoctorConsultation/MyBookingsPlaceHolder"

function PreviouslyConsultedDoctorsTab(props) {
    return (
        <React.Fragment>
            <div class="d-flex align-items-center justify-content-between mb-3"><h5 class="m-0">Other Consultations</h5></div>
            <div className={props.fullWidth ? 'previously-consulted-doctor-container full-width' : 'previously-consulted-doctor-container' }>
                {[0,1,2,3,4,5,6,7,8].map((each=>{
                    return(
                    <div className="each-consulted-doc-card">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="d-flex">
                                    <div className="consultaion-appointment"><img src="https://static1.medplusindia.com:555/jasmine/martpwa/V6/mCart/images/npa.7b876f5e7628bc1748f1f4d71392edc9.png" className="rounded rounded-circle d-block mx-auto mb-2" alt="divya" height="64" width="64"/></div>
                                    <div style={{"width": "calc(100% - 5rem)"}}>
                                        <small className="text-secondary mb-0 d-block">RN - 123456</small>
                                        <p className="mb-0">Dr. divya</p>
                                        <small className="text-secondary d-block">Interventional Cardiology</small><small>MBBS - MD- Cardio</small>
                                    </div>
                                </div>
                                <hr className="dashed" />
                                <div className="small">
                                    <small className="text-secondary">Patient &amp; Slot</small>
                                    <p className="font-weight-bold mb-0">new</p>
                                    <span className="text-secondary">22 Dec, 2021 at 06:00 PM - 06:15 PM</span>
                                </div>
                                <hr className="dashed" />
                                <div className="align-items-center d-flex justify-content-between mb-3">
                                    <div className="font-weight-bold"><small><small>₹</small>&nbsp;500.00</small><span className="align-middle h4 font-weight-bold mx-2">·</span><small>Confirmed</small></div>
                                    <small className="text-secondary">22 Dec, 2021</small>
                                </div>
                                <div className="align-ite d-flex justify-content-between"><span className="small font-weight-bold"><small className="text-secondary d-block font-weight-normal">Booking ID</small>PTGOR2100007038</span><span className="small font-weight-bold"><small className="text-secondary d-block font-weight-normal">Consultation Type</small>Online Consultation</span></div>
                            </div>
                            <div className="card-footer bg-white p-0">
                                <div className="row mx-0">
                                    <div className="col px-0"><button role="button" className="btn btn-link btn-sm btn-block no-underline text-primary py-3">Payments</button></div>
                                    <div className="col px-0"><button role="button" className="btn btn-link btn-sm btn-block no-underline text-primary py-3">Email Invoice</button></div>
                                    <div className="col px-0"><button role="button" className="btn btn-link btn-sm btn-block no-underline text-primary py-3">Prescription</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                }))}
                <MyBookingsPlaceHolder/>
            </div>
        </React.Fragment>
    );
}

export default PreviouslyConsultedDoctorsTab;