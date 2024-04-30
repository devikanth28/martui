import React from "react"
import SafeAndSecureIcon from "../../images/common/safe-and-secure.svg"
import OnlineReportsIcon from "../../images/common/online-reports.svg"
import HomeSampleCollectionIcon from "../../images/common/home-sample-collection.svg"
import CompititivePricesIcon from "../../images/common/compititive-prices.svg"
import MedplusAdvantage from "../../images/common/medplus-advantage.svg"


const PracticesWeOffer = (props) => {
    return (
        <React.Fragment>
            { !props.isFromProductDetail && <div className="practices-div-container">
                { !props.source =="homePage" && <h6 className="mb-4 h5">Best Practises We Offer</h6>}
                <div className="container-fluid">
                    <div className="row pt-2">
                        <div className="col-3">
                            <span className="img-container">
                                <img className="img-fluid" src={SafeAndSecureIcon} alt="100% Safe & Secure" title="100% Safe & Secure" />
                            </span>
                            <h6 className="mb-3">100% Safe & Secure</h6>
                            <p className="mb-0">We take all safety and hygiene measures to keep our customers safe</p>
                        </div>
                        <div className="col-3">
                            <span className="img-container">
                                <img className="img-fluid" src={OnlineReportsIcon} alt="Online Reports" title="Online Reports" />
                            </span>
                            <h6 className="mb-3">Online Reports</h6>
                            <p className="mb-0">You can download reports from online and our turn around time is 24 hours</p>
                        </div>
                        <div className="col-3">
                            <span className="img-container">
                                <img className="img-fluid" src={HomeSampleCollectionIcon} alt="Home Sample Collection" title="Home Sample Collection" />
                            </span>
                            <h6 className="mb-3">Home Sample Collection</h6>
                            <p className="mb-0">Our professional technicians will come and collect your sample</p>
                        </div>

                        <div className="col-3">
                            <span className="img-container">
                                <img className="img-fluid" src={MedplusAdvantage} alt="MedPlus Advantage" title="MedPlus Advantage" />
                            </span>
                            <h6 className="mb-3">MedPlus Advantage</h6>
                            <p className="mb-0">Enjoy upto 75% discount on diagnostic tests and health packages</p>
                        </div>
                        
                        <div className="col-3">
                            <span className="img-container">
                                <img className="img-fluid" src={CompititivePricesIcon} alt="Competitive Prices" title="Competitive Prices" />
                            </span>
                            <h6 className="mb-3">Competative Price</h6>
                            <p className="mb-0">We offer best prices on our diagnostic test and health packages</p>
                        </div>
                    </div>
                </div>

                {/* Ghost Image */}
                <div className="d-none">
                <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-2 m-0"></div></div>
                <div className="container-fluid">
                    <div className="row pt-2">
                        <div className="col-3">
                            <span className="img-container">
                                <div className="ph-row p-0 mb-4">
                                    <div className="ph-picture m-0" style={{ "height": "57px", "width": "57px" }}></div>
                                </div>
                            </span>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-4 m-0"></div></div>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-12 m-0 mb-2"></div><div className="ph-col-2 m-0"></div></div>
                        </div>
                        <div className="col-3">
                            <span className="img-container">
                                <div className="ph-row p-0 mb-4">
                                    <div className="ph-picture m-0" style={{ "height": "57px", "width": "57px" }}></div>
                                </div>
                            </span>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-4 m-0"></div></div>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-12 m-0 mb-2"></div><div className="ph-col-2 m-0"></div></div>
                        </div>
                        <div className="col-3">
                            <span className="img-container">
                                <div className="ph-row p-0 mb-4">
                                    <div className="ph-picture m-0" style={{ "height": "57px", "width": "57px" }}></div>
                                </div>
                            </span>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-4 m-0"></div></div>
                            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-12 m-0 mb-2"></div><div className="ph-col-2 m-0"></div></div>
                        </div>
                        <div className="col-3">
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
            { props.isFromProductDetail && <section className="bg-transparent shadow-none">
                <div className="mb-4 pb-2 practises-div">
                    <div className="align-items-start d-flex mb-4">
                        <span>
                            <span className="img-container">
                                <img src={SafeAndSecureIcon} alt="100% Safe & Secure" title="100% Safe & Secure"/>
                            </span>
                        </span>
                        <div className="pl-3">
                            <h6 className="mb-3">100% Safe & Secure</h6>
                            <p className="mb-0">We take all safety and hygiene measuresto keep our customers safe</p>
                        </div>
                    </div>
                    <div className="align-items-start d-flex mb-4">
                        <span>
                            <span className="img-container">
                                <img src={OnlineReportsIcon} alt="Online Reports" title="Online Reports"/>
                            </span>
                        </span>
                        <div className="pl-3">
                            <h6 className="mb-3">Online Reports</h6>
                            <p className="mb-0">You can download reports from online and our turn around time is 24 hours</p>
                        </div>
                    </div>
                    <div className="align-items-start d-flex mb-4">
                        <span>
                            <span className="img-container">
                                <img src={HomeSampleCollectionIcon} alt="Home Sample Collection" title="Home Sample Collection"/>
                            </span>
                        </span>
                        <div className="pl-3">
                            <h6 className="mb-3">Home Sample Collection</h6>
                            <p className="mb-0">Our professional technicians will come and collect your sample</p>
                        </div>
                    </div>
                    {/* <div className="align-items-start d-flex">
                                <span>
                                    <span className="img-container">
                                        <img src={MedplusAdvantage} alt="MedPlus Advantage" title="MedPlus Advantage"/>
                                    </span>
                                </span>
                                <div className="pl-3">
                                    <h6 className="mb-3">MedPlus Advantage</h6>
                                    <p className="mb-0">Enjoy upto 75% discount on diagnostic tests and health packages</p>
                                </div>
                    </div> */}
                    <div className="align-items-start d-flex">
                        <span>
                            <span className="img-container">
                                <img src={CompititivePricesIcon} alt="Competitive Prices" title="Competitive Prices"/>
                            </span>
                        </span>
                        <div className="pl-3">
                            <h6 className="mb-3">Competative Price</h6>
                            <p className="mb-0">We offer best prices on our diagnostic test and health packages</p>
                        </div>
                    </div> 
                </div>
            </section>}
        </React.Fragment>
    )
}
export default PracticesWeOffer;