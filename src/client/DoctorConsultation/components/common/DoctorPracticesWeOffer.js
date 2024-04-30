import React from "react"
import SafeAndSecureIcon from "../../../images/common/safe-and-secure.svg";
import OnlineReportsIcon from "../../../images/common/online-reports.svg"
import HomeSampleCollectionIcon from "../../../images/common/home-sample-collection.svg"
import MedplusAdvantage from "../../../images/common/medplus-advantage.svg"
import CompititivePrice from "../../../images/common/compititive-prices.svg"
import ConsultationPracticesIcon from "../../../images/common/consultation-practises.svg"


const DoctorPracticesWeOffer = (props) => {
    return (
        <React.Fragment>
            { !props.isFromDoctorDetail && 
                <div className="practices-div-container">
                { props.source !="homePage" && 
                    <h6 className="mb-4 h5">Best Practises We Offer</h6>
                }
                <div className="container-fluid">
                    <div className="row pt-2">
                        <div className="col">
                            <span className="img-container">
                                <img className="img-fluid" src={SafeAndSecureIcon} alt="100% Safe & Secure" title="100% Safe & Secure" />
                            </span>
                            <h6 className="mb-2">100% Safe & Secure</h6>
                            <p className="mb-0">We take all safety and hygiene measures to keep our customers safe</p>
                        </div>
                        <div className="col">
                            <span className="img-container">
                                <img className="img-fluid" src={OnlineReportsIcon} alt="Online Health Records" title="Online Health Records" />
                            </span>
                            <h6 className="mb-2">Online Health Records</h6>
                            <p className="mb-0">You can access your health records online and download them all at one place</p>
                        </div>
                        <div className="col">
                            <span className="img-container">
                                <img className="img-fluid" src={ConsultationPracticesIcon} alt="Online / Walk-In Consultation" title="Online / Walk-In Consultation" />
                            </span>
                            <h6 className="mb-2">Online / Walk-In Consultation</h6>
                            <p className="mb-0">Experienced doctors now available for both Online and Walk In consultations</p>
                        </div>

                        <div className="col">
                            <span className="img-container">
                                <img className="img-fluid" src={MedplusAdvantage} alt="MedPlus Advantage" title="MedPlus Advantage" />
                            </span>
                            <h6 className="mb-2">MedPlus Advantage</h6>
                            <p className="mb-0">Enjoy upto 50% discount on Doctor Consultations</p>
                        </div>
                        
                         <div className="col">
                            <span className="img-container">
                                <img className="img-fluid" src={CompititivePrice} alt="Competitive Prices" title="Competitive Prices" />
                            </span>
                            <h6 className="mb-2">Competitive Prices</h6>
                             <p className="mb-0">Our prices for doctor consultations and diagnostics are the best in the business
</p>
                        </div> 
                    </div>
                </div>

                {/* Ghost Image */}
                <div className="d-none">
                <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-2 m-0"></div></div>
                <div className="container-fluid">
                    <div className="row pt-2">
                        <div className="col">
                            <span className="img-container">
                                <div className="ph-row p-0 mb-4">
                                    <div className="ph-picture m-0" style={{ "height": "57px", "width": "57px" }}></div>
                                </div>
                            </span>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-4 m-0"></div></div>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-12 m-0 mb-2"></div><div className="ph-col-2 m-0"></div></div>
                        </div>
                        <div className="col">
                            <span className="img-container">
                                <div className="ph-row p-0 mb-4">
                                    <div className="ph-picture m-0" style={{ "height": "57px", "width": "57px" }}></div>
                                </div>
                            </span>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-4 m-0"></div></div>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-12 m-0 mb-2"></div><div className="ph-col-2 m-0"></div></div>
                        </div>
                        <div className="col">
                            <span className="img-container">
                                <div className="ph-row p-0 mb-4">
                                    <div className="ph-picture m-0" style={{ "height": "57px", "width": "57px" }}></div>
                                </div>
                            </span>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-4 m-0"></div></div>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-12 m-0 mb-2"></div><div className="ph-col-2 m-0"></div></div>
                        </div>
                        <div className="col">
                            <span className="img-container">
                                <div className="ph-row p-0 mb-4">
                                    <div className="ph-picture m-0" style={{ "height": "57px", "width": "57px" }}></div>
                                </div>
                            </span>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-4 m-0"></div></div>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-12 m-0 mb-2"></div><div className="ph-col-2 m-0"></div></div>
                        </div>
						<div className="col">
                            <span className="img-container">
                                <div className="ph-row p-0 mb-4">
                                    <div className="ph-picture m-0" style={{ "height": "57px", "width": "57px" }}></div>
                                </div>
                            </span>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-4 m-0"></div></div>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-12 m-0 mb-2"></div><div className="ph-col-2 m-0"></div></div>
                        </div>
                    </div>
                </div>
                </div>
            </div>}
            { props.isFromDoctorDetail && 
                <React.Fragment>
                    <section className="bg-transparent shadow-none">
                        <div className="mb-4 pb-2 practises-div">
                            <h6 className="mb-4 h5">Best Practises We Offer</h6>
                            <div className="align-items-start d-flex mb-4">
                                <span>
                                    <span className="img-container">
                                        <img src={SafeAndSecureIcon} alt="100% Safe & Secure" title="100% Safe & Secure"/>
                                    </span>
                                </span>
                                <div className="pl-3">
                                    <h6 className="mb-2">100% Safe & Secure</h6>
                                    <p className="mb-0">We take all safety and hygiene measuresto keep our customers safe</p>
                                </div>
                            </div>
                            <div className="align-items-start d-flex mb-4">
                                <span>
                                    <span className="img-container">
                                        <img src={OnlineReportsIcon} alt="Online Health Records" title="Online Health Records"/>
                                    </span>
                                </span>
                                <div className="pl-3">
                                    <h6 className="mb-2">Online Health Records</h6>
                                    <p className="mb-0">You can access your health records online and download them all at one place</p>
                                </div>
                            </div>
                            <div className="align-items-start d-flex mb-4">
                                <span>
                                    <span className="img-container">
                                        <img src={ConsultationPracticesIcon} alt="Online / Walk-In Consultation" title="Online / Walk-In Consultation"/>
                                    </span>
                                </span>
                                <div className="pl-3">
                                    <h6 className="mb-2">Online / Walk-In Consultation</h6>
                                    <p className="mb-0">Experienced doctors now available for both Online and Walk In consultations</p>
                                </div>
                            </div>
                            <div className="align-items-start d-flex mb-4">
                                <span>
                                    <span className="img-container">
                                        <img src={MedplusAdvantage} alt="MedPlus Advantage" title="MedPlus Advantage"/>
                                    </span>
                                </span>
                                <div className="pl-3">
                                    <h6 className="mb-2">MedPlus Advantage</h6>
                                    <p className="mb-0">Enjoy upto 50% discount on Doctor Consultations</p>
                                </div>
                            </div>
                            <div className="align-items-start d-flex">
                                <span>
                                    <span className="img-container">
                                        <img src={CompititivePrice} alt="Competative Price" title="Competative Price"/>
                                    </span>
                                </span>
                                <div className="pl-3">
                                    <h6 className="mb-2">Competative Price</h6>
                                    <p className="mb-0">Our prices for doctor consultations and diagnostics are the best in the business</p>
                                </div>
                            </div> 
                        </div>
                    </section>
                </React.Fragment>
            }
        </React.Fragment>
    )
}
export default DoctorPracticesWeOffer;