import React from 'react';
import AppointmentBanner from "../../images/common/online-doctor-banner-icon.svg"
import WalkinBanner from "../../images/common/store-doctor-banner-icon.svg"
function DoctorSplitBanner(props) {
    return (
        <React.Fragment>
            <div className="my-32 mt-0">
                <div className="row doctor-split-banner-container">
                    <div className="col pr-2">
                        <div className="banner-link-container online-type" style={{backgroundImage : "url("+AppointmentBanner+")"}}>
                            {/* <img src={AppointmentBanner} alt="Online Doctors" className="img-fluid w-100"/> */}
                            <div className='="test-dark'>
                                <p className="font-weight-light h3 mb-0">Make an appointment with our</p>
                                <h5 className="mb-0">Online Doctors</h5>
                            </div>
                            <div>
                            <a onClick = {()=>props.history.push({pathname: '/doctorsOnline', state: 'online'})} href="" title="See who is available online" className="btn btn-brand btn-lg rounded-pill banner-hover-btn">
                                See who is available online
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g id="right_white_icon_24px" transform="translate(-48.941 -351.846)">
                                        <rect id="BG_Guide" data-name="BG Guide" width="24" height="24" transform="translate(48.941 351.846)" fill="none"></rect>
                                        <path id="Path_22926" data-name="Path 22926" d="M61.82,354.579a1.7,1.7,0,0,0-.238.716,1.028,1.028,0,0,0,.358.715l7.513,6.917H49.9a.954.954,0,1,0,0,1.908H69.453l-7.394,6.917a.936.936,0,0,0,0,1.312.945.945,0,0,0,1.312.119l9.3-8.586a.936.936,0,0,0,0-1.312l-9.3-8.706a.912.912,0,0,0-.6-.238C62.178,354.222,61.94,354.341,61.82,354.579Z" fill="#fff"></path>
                                    </g>
                                </svg>
                            </a>
                            </div>
                        </div>
                    </div>
                    <div className="col pl-2">
                        {/* <a className="d-block" title="Meet with our doctors in person at our clinics" href="javascript:void(0)">
                            <img src={WalkinBanner} alt="walkin Doctors" className="img-fluid w-100"/>
                        </a> */}
                        <div className="banner-link-container offline-type" style={{backgroundImage : "url("+WalkinBanner+")"}}>
                            {/* <img src={AppointmentBanner} alt="Online Doctors" className="img-fluid w-100"/> */}
                            <div className='="test-dark'>
                                <p className="font-weight-light h3 mb-0">Meet with our doctors in</p>
                                <h5 className="mb-0">Person at Our Clinics</h5>
                            </div>
                            <div>
                            <a onClick = {()=>props.history.push({pathname: '/doctorsOnline', state: 'walkin'})} href="" title="Step into see our doctors" className="btn btn-brand btn-lg rounded-pill banner-hover-btn">
                                Step into see our doctors
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g id="right_white_icon_24px" transform="translate(-48.941 -351.846)">
                                        <rect id="BG_Guide" data-name="BG Guide" width="24" height="24" transform="translate(48.941 351.846)" fill="none"></rect>
                                        <path id="Path_22926" data-name="Path 22926" d="M61.82,354.579a1.7,1.7,0,0,0-.238.716,1.028,1.028,0,0,0,.358.715l7.513,6.917H49.9a.954.954,0,1,0,0,1.908H69.453l-7.394,6.917a.936.936,0,0,0,0,1.312.945.945,0,0,0,1.312.119l9.3-8.586a.936.936,0,0,0,0-1.312l-9.3-8.706a.912.912,0,0,0-.6-.238C62.178,354.222,61.94,354.341,61.82,354.579Z" fill="#fff"></path>
                                    </g>
                                </svg>
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DoctorSplitBanner;