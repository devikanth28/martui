import React from 'react'
import UpcomingConsulationSlider from "../../../DoctorConsultation/UpcomingConsulationSlider"
import PreviouslyConsultedDoctorsTab from "../../../DoctorConsultation/PreviouslyConsultedDoctorsTab"
import DoctorProfile from "../../../../images/common/doctor-profile-2.png"
const DoctorConsultationTab = (props) => {
    return (
        <React.Fragment>
            <div className="row mt-3 mx-0">
                <div className="col-8">
                {/* <div className="col-12"> */}
                    <PreviouslyConsultedDoctorsTab fullWidth={false}/>
                </div>
                <div className='col-4 pl-0'>
                {/* <div className="col-12"> */}
                    <div className="d-flex align-items-center justify-content-between mb-3"><h5 className="m-0">Upcoming Consultation</h5></div>
                    <div className='upcoming-consultation doc-my-bookings-tabs'>
                    {/* <div className='upcoming-consultation doc-my-bookings-tabs full-width'> */}
                        { [0,1,2,3,4,5,6,7,8].map((each =>{
                            return(
                                <div className='each-upcoming-doc-card'>
                                    <div className="card">
                                        <div className='card-body p-3'>
                                            <div className="d-flex align-items-center">
                                                <div className="img-container">
                                                    <img src={DoctorProfile} alt="Dr. Satyanath" title="Dr. Satyanath" className="img-fluid rounded rounded-circle" width={64}/>
                                                    <span className="badge badge-success">Paid</span>
                                                </div>
                                                <div>
                                                    <h6 className="mb-2 text-truncate">Dr. Satyanath RV</h6>
                                                    <p className="small text-secondary mb-0">Dermatologist</p>
                                                    <p className="small mb-0">MD-Skin & VD</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer pt-2 pb-3 px-3 bg-white">
                                            <div className='mb-2'>
                                                <p className="font-weight-bold mb-0 text-truncate">Ch Sampath Kumar</p>
                                                <small className="text-secondary">Today at - 08:00 AM - 09:00 AM</small>
                                            </div>
                                            <div>
                                                <button className="btn btn-outline-dark btn-block btn-sm">Starts in 30mins</button>
                                                {/* <button className="btn btn-brand px-4 btn-sm">Start Consultation</button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DoctorConsultationTab;
