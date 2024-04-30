import React from "react"
import LabsProductInfo from "./LabsProductInfo";
import RelatedLabArticles from "./RelatedLabArticles"
import HealthPlusSubIcon from "../../images/common/health-plus-sub.png"
import PopularTestsList from "./PopularTestsList"
import {PopularTestJson} from "./LabStaticJsonData"
import SafeAndSecureIcon from "../../images/common/safe-and-secure.svg"
import OnlineReportsIcon from "../../images/common/online-reports.svg"
import HomeSampleCollectionIcon from "../../images/common/home-sample-collection.svg"
import CompititivePricesIcon from "../../images/common/compititive-prices.svg"
import Slider from "react-slick";
const LabsProductDetailPage =() =>{
    const settings ={
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        initialSlide: 0,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        pauseOnHover: true
    }
    return(
        <React.Fragment>
            <div className="row mx-0">
                <div className="col-8 pl-0 pr-2">
                    <section className="shadow-none p-3">
                            <div className= "d-flex justify-content-between">
                                <div>
                                <span className="font-14 text-secondary">Biochemistry</span>
                                <h5 className="mt-1 mb-3">Total Thyroxine (TT4)</h5>
                                <div className="d-flex align-items-center mb-3 pb-1">
                                    <span className="font-14 text-secondary">Also known as:</span>
                                    <button className="badge border-sort-btn bg-white px-2">T4</button>
                                    <button className="badge border-sort-btn bg-white px-2">TT4</button>
                                    <button className="badge border-sort-btn bg-white px-2">Total T4</button>
                                </div>
                                </div>
                                <div className="text-right">
                                        <a href="javascript:void(0)" title="click to share">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
                                                <g transform="translate(-843 -225)">
                                                    <g fill="#fff" stroke="#afb5ba" transform="translate(843 225)">
                                                        <circle stroke="none" cx="22" cy="22" r="22"></circle>
                                                        <circle fill="none" cx="22" cy="22" r="21.5"></circle>
                                                    </g>
                                                    <rect fill="none" width="24" height="24" rx="12" transform="translate(853 235)"></rect>
                                                    <path fill="#6c757d" d="M19.5,17.078a2.912,2.912,0,0,0-1.96.77L10.41,13.7a3.273,3.273,0,0,0,.09-.7,3.273,3.273,0,0,0-.09-.7l7.05-4.109A2.993,2.993,0,1,0,16.5,6a3.273,3.273,0,0,0,.09.7L9.54,10.809a3,3,0,1,0,0,4.379l7.12,4.159a2.82,2.82,0,0,0-.08.65,2.92,2.92,0,1,0,2.92-2.92Z" transform="translate(849.5 234)"></path>
                                                </g>
                                            </svg>
                                        </a>
                                </div>
                            </div>
                            <div className= "d-flex justify-content-between align-items-end">
                                <div className="col pl-0">
                                <h6 className="h3">
                                    <strong className="rupee font-14"> &#x20B9; </strong>60.00
                                    <span className="ml-2 text-secondary h6 font-weight-normal"><small>&#x20B9;</small>&nbsp;<del>200.00</del></span>
                                </h6>
                                <div className="align-items-end d-flex justify-content-between">
                                    <p className="text-success mb-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 18" className="align-top mr-2">
                                            <g transform="translate(0.198 -0.206)">
                                                <rect fill="none" width="18" height="18" transform="translate(-0.198 0.206)"></rect>
                                                <path fill="#08CE73" d="M9,18a1.663,1.663,0,0,1-1.137-.444L6.719,16.493a.561.561,0,0,0-.383-.149.589.589,0,0,0-.08.005l-1.578.214a1.722,1.722,0,0,1-.234.015,1.612,1.612,0,0,1-1.606-1.3l-.274-1.506a.529.529,0,0,0-.286-.377L.871,12.682a1.533,1.533,0,0,1-.7-2.075l.7-1.373a.507.507,0,0,0,0-.466l-.7-1.373A1.505,1.505,0,0,1,.074,6.237a1.578,1.578,0,0,1,.8-.918L2.278,4.6a.53.53,0,0,0,.286-.377L2.839,2.72a1.612,1.612,0,0,1,1.6-1.3,1.747,1.747,0,0,1,.235.016l1.578.214a.594.594,0,0,0,.078.005.563.563,0,0,0,.384-.149L7.863.444a1.679,1.679,0,0,1,2.273,0l1.145,1.063a.564.564,0,0,0,.385.15.592.592,0,0,0,.078-.005l1.578-.214a1.744,1.744,0,0,1,.235-.016,1.613,1.613,0,0,1,1.6,1.3l.274,1.5a.53.53,0,0,0,.286.378l1.407.716a1.578,1.578,0,0,1,.8.918,1.505,1.505,0,0,1-.095,1.157l-.7,1.373a.507.507,0,0,0,0,.466l.7,1.373a1.533,1.533,0,0,1-.7,2.075l-1.407.716a.529.529,0,0,0-.286.377l-.274,1.506a1.613,1.613,0,0,1-1.606,1.3,1.75,1.75,0,0,1-.234-.016l-1.578-.214a.589.589,0,0,0-.08-.005.561.561,0,0,0-.383.149l-1.145,1.063A1.663,1.663,0,0,1,9,18Zm2.339-8.329A2.025,2.025,0,1,0,13.363,11.7,2.027,2.027,0,0,0,11.339,9.671Zm2.148-4.3a.406.406,0,0,0-.254.09l-8.5,6.881a.4.4,0,1,0,.509.629l8.5-6.88a.405.405,0,0,0-.256-.72Zm-6.6-.969A2.025,2.025,0,1,0,8.909,6.431,2.027,2.027,0,0,0,6.884,4.406Zm4.455,8.5A1.215,1.215,0,1,1,12.554,11.7,1.216,1.216,0,0,1,11.339,12.911ZM6.884,7.646A1.215,1.215,0,1,1,8.1,6.431,1.216,1.216,0,0,1,6.884,7.646Z" transform="translate(-0.198 0.206)"></path>
                                            </g>
                                        </svg>
                                        Use MPACK to get 70% Off
                                    </p>
                                </div>  
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        { <button className="btn custom-btn-lg btn-link-secondary border px-5 mr-3 border-dark">Member Price&nbsp;&nbsp;<small>&#x20B9;</small>&nbsp;30.00</button> }
                                        <button className="btn btn-brand shadow px-5 custom-btn-lg">Add to Cart</button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="alert alert-warning mb-0 text-dark">
                                    <strong>Test Requirements</strong>
                                    <p className="font-14 mb-2">Sample Type: Blood, Method: Chemiluminescence</p>
                                    <strong>Test Precautions</strong>
                                    <p className="font-14 mb-0">Do not eat or drink anything other than water for 8-12 hours before the test.</p>
                                </div>
                            </div>
                    </section>


                    {/* GHost Image Here staart  Right-Side */}

                    <section className="shadow-none d-none">
                        <div className="row mx-0 py-3">
                            <div className="col-6">
                            <div className="ph-row mb-3 " style={{"width": "182px"}}>
                                <div className="ph-col-12"></div>
                            </div>
                                <div className="ph-row mt-1 mb-3" style={{"width": "28%"}}>
                                    <div className="ph-col-12" style={{"height": "1.5rem"}}></div>
                                </div>
                                <div className="ph-row mb-3 pb-1" style={{"width": "230px"}}>
                                    <div className="ph-col-12"></div>
                                </div>
                                <div className="ph-row mt-1 mb-3" style={{"width": "28%"}}>
                                    <div className="ph-col-12" style={{"height": "1.5rem"}}></div>
                                </div>
                                <div className="align-items-end d-flex justify-content-between">
                                        <div className="ph-row mb-3 " style={{"width": "182px"}}>
                                            <div className="ph-col-12"></div>
                                        </div>
                                    <div className="ph-row mb-3 mt-1" style={{"width": "199px"}}>
                                            <div className="ph-col-12 mb-0" style={{"height":"1.5rem"}}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 pl-0">
                                <div className="align-items-end d-flex flex-column h-100 justify-content-between">
                                    <div className="text-right">
                                        
                                        
                                    </div>
                                    <div className="border rounded p-3" style={{"width":"333px"}}>
                                    <div className="ph-row mb-1 " style={{"width": "165px"}}>
                                <div className="ph-col-12"></div>
                            </div>
                            <div className="ph-row mb-2" style={{"width": "249px"}}>
                                <div className="ph-col-12 mb-0"></div>
                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <div className=" mb-0 text-dark">
                                    <div className="ph-row  " style={{"width": "140px"}}>
                                        <div className="ph-col-12 mb-1"></div>
                                    </div>
                                    <div className="ph-row  mb-0" style={{"width": "593px"}}>
                                        <div className="ph-col-12 mb-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* GHost Image Here End  Right-Side */}
                    <LabsProductInfo  testIncludedAvailable={true} faqAvailable={true} kytAvailable={true} descAvailable={true}/>
                    <RelatedLabArticles />
                </div>
                <div className="col-4 pr-0 pl-2">
                    <a className="mb-3 d-block" href="javascript:void(0)" title="Health Plus Subsciprion">
                        <img className="mb-3 img-fluid w-100" src={HealthPlusSubIcon} alt="Health Plus Subsciprion"/>
                    </a>


					<section className="bg-transparent shadow-none">
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
                            <div className="align-items-start d-flex">
                                <span>
                                    <span className="img-container">
                                        <img src={CompititivePricesIcon} alt="Competitive Prices" title="Competitive Prices"/>
                                    </span>
                                </span>
                                <div className="pl-3">
                                    <h6 className="mb-3">Competitive Prices</h6>
                                    <p className="mb-0">We offer best prices on our diagnostic tests & health packages</p>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* Ghost Images Here */}

                    <div className="d-none">
                        <div className="ph-row ph-item p-0 m-0">
                            <div className="ph-picture" style={{ "height": "20rem" }}></div>
                        </div>
                        <div className="my-4">
                            <div className="d-flex mb-4">
                                <div className="ph-picture" style={{ "height": " 50px", "width": "50px" }}></div>
                                <div className="px-4 w-100">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mb-4">
                                <div className="ph-picture" style={{ "height": " 50px", "width": "50px" }}></div>
                                <div className="px-4 w-100">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mb-4">
                                <div className="ph-picture" style={{ "height": " 50px", "width": "50px" }}></div>
                                <div className="px-4 w-100">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mb-4">
                                <div className="ph-picture" style={{ "height": " 50px", "width": "50px" }}></div>
                                <div className="px-4 w-100">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Ghost Images end Here */}
                    <PopularTestsList sectionTitle="Frequently Booked Together" showPrice={true} testList={PopularTestJson}/>
                        <div className="mb-4 pb-2">
                            <h5 className="mb-3">Customer Reviews</h5>
                            <section className="shadown-none">
                                <div className="lab-customer-review-container d-block p-0 mb-0">
                                    <div className="content w-100 p-3">
                                        <Slider className="customer-feedback-slider" {...settings}>
                                            <div className="item">
                                                <div>
                                                    <h6>Ms. S Karthik,</h6>
                                                    <p className="text-secondary font-14">Moosapet (Hyderabad)</p>
                                                    <span>I booked Master Health Checkup from MedPlus Lab. They came right on time and the report was delivered on the same day. Their prices are also very reasonable considering the quality of service which they provide.</span>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div>
                                                    <h6>Ms. S Karthik,</h6>
                                                    <p className="text-secondary font-14">Moosapet (Hyderabad)</p>
                                                    <span>I booked Master Health Checkup from MedPlus Lab. They came right on time and the report was delivered on the same day. Their prices are also very reasonable considering the quality of service which they provide.</span>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div>
                                                    <h6>Ms. S Karthik,</h6>
                                                    <p className="text-secondary font-14">Moosapet (Hyderabad)</p>
                                                    <span>I booked Master Health Checkup from MedPlus Lab. They came right on time and the report was delivered on the same day. Their prices are also very reasonable considering the quality of service which they provide.</span>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div>
                                                    <h6>Ms. S Karthik,</h6>
                                                    <p className="text-secondary font-14">Moosapet (Hyderabad)</p>
                                                    <span>I booked Master Health Checkup from MedPlus Lab. They came right on time and the report was delivered on the same day. Their prices are also very reasonable considering the quality of service which they provide.</span>
                                                </div>
                                            </div>
                                        </Slider>
                                    </div>
                                </div>
                            </section>
                        </div>
                    <PopularTestsList sectionTitle="Popular Health Checkups" showIncludeParameters={true} testList={PopularTestJson}/>
                </div>
            </div>
        </React.Fragment>
    )
}
export default LabsProductDetailPage;