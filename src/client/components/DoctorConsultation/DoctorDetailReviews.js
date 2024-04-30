import React from 'react';
import DoctorProfile from "../../images/common/doctor-profile-1.png";
function DoctorDetailReviews(props) {
    return (
        <React.Fragment>
            <section className="shadow-none p-3 my-32">
                <h6>
                    <small className="text-secondary d-block mb-2">Patient reviews for</small>
                    Dr. Satyanath R V
                </h6>
                <div className="doctor-review-container">
                    <div className="each-review">
                        <img src={DoctorProfile} alt="Patient Name" title="Patient Name" height="36" className="rounded-circle"/>
                        <div>
                            <h6 className="mb-1">Patient Name</h6>
                            <div>
                                <small className="text-primary">
                                    <svg className="mr-1 align-text-bottom" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <g id="rating-stroke-icon" transform="translate(-0.195)">
                                            <rect id="Rectangle_6524" data-name="Rectangle 6524" width="16" height="16" transform="translate(0.195)" fill="none"/>
                                            <path id="noun_rating_1847488" d="M17.25,22.8l3.6,2.62a.725.725,0,0,0,1.119-.813L20.6,20.362l3.6-2.626v.007a.731.731,0,0,0-.425-1.324H19.318L17.94,12.173a.723.723,0,0,0-1.381,0l-1.377,4.246H10.729a.734.734,0,0,0-.729.735.726.726,0,0,0,.3.589v0l3.6,2.623s-1.377,4.245-1.374,4.245a.722.722,0,0,0,1.115.813Z" transform="translate(-9.71 -10.166)" fill="#343a40"/>
                                        </g>
                                    </svg>
                                    4.5
                                </small>
                                <span className="mx-2">|</span>
                                <small className="text-secondary">Sep 09, 2021</small>
                            </div>
                            <div className="mt-3">
                                <h6>Visited doctor for xxxx treatment</h6>
                                <p className="text-secondary mb-0">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet</p>
                            </div>
                        </div>
                    </div>
                    <div className="each-review">
                        <img src={DoctorProfile} alt="Patient Name" title="Patient Name" height="36" className="rounded-circle"/>
                        <div>
                            <h6 className="mb-1">Patient Name</h6>
                            <div>
                                <small className="text-primary">
                                    <svg className="mr-1 align-text-bottom" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <g id="rating-stroke-icon" transform="translate(-0.195)">
                                            <rect id="Rectangle_6524" data-name="Rectangle 6524" width="16" height="16" transform="translate(0.195)" fill="none"/>
                                            <path id="noun_rating_1847488" d="M17.25,22.8l3.6,2.62a.725.725,0,0,0,1.119-.813L20.6,20.362l3.6-2.626v.007a.731.731,0,0,0-.425-1.324H19.318L17.94,12.173a.723.723,0,0,0-1.381,0l-1.377,4.246H10.729a.734.734,0,0,0-.729.735.726.726,0,0,0,.3.589v0l3.6,2.623s-1.377,4.245-1.374,4.245a.722.722,0,0,0,1.115.813Z" transform="translate(-9.71 -10.166)" fill="#343a40"/>
                                        </g>
                                    </svg>
                                    4.5
                                </small>
                                <span className="mx-2">|</span>
                                <small className="text-secondary">Sep 09, 2021</small>
                            </div>
                            <div className="mt-3">
                                <h6>Visited doctor for xxxx treatment</h6>
                                <p className="text-secondary mb-0">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet</p>
                            </div>
                        </div>
                    </div>
                    <div className="each-review">
                        <img src={DoctorProfile} alt="Patient Name" title="Patient Name" height="36" className="rounded-circle"/>
                        <div>
                            <h6 className="mb-1">Patient Name</h6>
                            <div>
                                <small className="text-primary">
                                    <svg className="mr-1 align-text-bottom" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <g id="rating-stroke-icon" transform="translate(-0.195)">
                                            <rect id="Rectangle_6524" data-name="Rectangle 6524" width="16" height="16" transform="translate(0.195)" fill="none"/>
                                            <path id="noun_rating_1847488" d="M17.25,22.8l3.6,2.62a.725.725,0,0,0,1.119-.813L20.6,20.362l3.6-2.626v.007a.731.731,0,0,0-.425-1.324H19.318L17.94,12.173a.723.723,0,0,0-1.381,0l-1.377,4.246H10.729a.734.734,0,0,0-.729.735.726.726,0,0,0,.3.589v0l3.6,2.623s-1.377,4.245-1.374,4.245a.722.722,0,0,0,1.115.813Z" transform="translate(-9.71 -10.166)" fill="#343a40"/>
                                        </g>
                                    </svg>
                                    4.5
                                </small>
                                <span className="mx-2">|</span>
                                <small className="text-secondary">Sep 09, 2021</small>
                            </div>
                            <div className="mt-3">
                                <h6>Visited doctor for xxxx treatment</h6>
                                <p className="text-secondary mb-0">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet</p>
                            </div>
                        </div>
                    </div>
                    <button class="btn brand-secondary px-5 mt-4">Load More</button>
                </div>
            </section>
        </React.Fragment>
    );
}

export default DoctorDetailReviews;