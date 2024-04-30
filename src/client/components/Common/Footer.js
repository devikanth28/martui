import React, { Component, useEffect, useState } from 'react';
import FooterImg from '../../images/common/footer-img.svg';
import MedPlusLab from '../../images/common/MedPlusLab.png';
import MedPlusLens from '../../images/common/MedPlusLens.png';
import Call from '../../images/common/call.svg';
import WhatsApp from '../../images/common/whatsapp.svg';
import BulkOrder from '../../images/common/bulk-order.svg';
import Community from '../../images/common/footer-community-cssbg.svg';
import Return from '../..//images/common/footer-return-cssbg.svg';
import DownloadApp from '../../images/common/download-app.png';
import AppStore from '../../images/common/App_Store-cssbg.svg';
import PlayStore from '../../images/common/Google_Play_Store-cssbg.svg';
import Sitemap from '../..//images/common/sitemap.svg';
import Privacy from '../../images/common/privacy.svg';
import TermsConditions from '../../images/common/footer-term-cssbg.svg';
import UserInfoAction from '../../../redux/action/UserInfoAction';
import Validate from '../../helpers/Validate';
import CommonHeaderService from '../../services/CommonHeaderService';
import CampaignModal from "./CampaignModal";
import { Alert, ALERT_TYPE_SUCCESS, ALERT_TYPE_INFO } from './Alert';
import qs from 'qs';
import Authentication from '../Authentication/Authentication';
import DoctorsFooter from './DoctorsFooter';
import LabsFooter from './LabsFooter';
import { DIAGNOSTICS_URL_PREFIX } from '../MedplusLabs/constants/LabConstants';
import { Link } from 'react-router-dom';
import MedPlusLens_icon from '../../images/common/MedPlusLens_icon.svg'

const Footer = (props) => {

    const userInfoAction = UserInfoAction();
    const userInfo = userInfoAction.getUserInfo();
    const userContactDetails = userInfoAction.getUserContactDetails();
    const validate = Validate();
    let params = qs.parse(props.location.search,{ignoreQueryPrefix:true});
    const [ enableCampaignModal, setEnableCampaignModal] = useState( (params && params.utm_campaign && params.utm_source) ? true : false);
    const [utmObject, setUtmObject] = useState({});
    const [ showCampaignModal, setShowCampaignModal] = useState( Authentication.isCookieAuthenticated(userInfo) ? false : true)
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [emailAddress, setEmailAddress] = useState(validate.isNotEmpty(userContactDetails.emailAddress) ? userContactDetails.emailAddress : "")
    const [errorMsg, setErrorMsg] = useState({});
    const [isProcessLoading, setProcessLoading] = useState(false);
    const commonHeaderService = CommonHeaderService();
    const [generalFooter, setGeneralFooter] = useState();
    const [pharmacyFooter, setPharmacyFooter] = useState();
    const [doctorRequest, setDoctorReq] = useState(false);
    
    useEffect(() => {
        setEmailAddress(userContactDetails.emailAddress);
    }, [userContactDetails.emailAddress]);
    useEffect(()=>{
        setDynamicFooters();
        generateUtmData();
    },[])

    const generateUtmData = () => {
        if(enableCampaignModal){
            setUtmObject({
                ...utmObject,
                 "campaignUserRequestPage" : props.location.pathname,
                 "campaignName" : params.utm_campaign,
                 "campaignSource" : params.utm_source
            });
        }
    }
    const setDynamicFooters = () => {
        commonHeaderService.getFooter().then((response) => {
            if (response.statusCode == "SUCCESS" && response.dataObject) {
                if(response.dataObject.generalFooter){
                    setGeneralFooter(response.dataObject.generalFooter);
                }
                if(response.dataObject.pharmacyFooter){
                    setPharmacyFooter(response.dataObject.pharmacyFooter);
                }
            } else {
                resetFooterData();
            }
        }).catch(err => {
            resetFooterData();
        })
    }

    const resetFooterData = () =>{
        setGeneralFooter();
        setPharmacyFooter();
    }
    const handleInputChange = event => {
        let feildName = event.target.id;
        let feildValue = event.target.value;
        let errMsg = validate.email(event.target.value, 45);
        if (errMsg) {
            setErrorMsg({ [feildName]: errMsg });
        } else {
            setErrorMsg({});
        }
        setEmailAddress(feildValue);
    }
    const submitSubscribeRequest = (event) => {
        if ("Enter" === event.key) {
            subscribeNewsletter(emailAddress);
        }
    }
    const subscribeNewsletter = () => {
        setProcessLoading(true);
        if (validate.isEmpty(emailAddress) || validate.isNotEmpty(validate.email(emailAddress, 45))) {
            setErrorMsg({ ["emailAddress"]: validate.email(emailAddress, 45) });
            setEmailAddress(); setProcessLoading(false);
            return;
        }
        commonHeaderService.subscribeNewsletter(emailAddress).then(response => {
            setProcessLoading(false);
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_SUCCESS });
            } else {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_INFO });
            }
        }).catch(function (error) {
            console.log(error);
            setProcessLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_INFO });
            return;
        });
    }
    return (
        <React.Fragment>
            <Alert className="toast-container b-m" alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo} />
            {enableCampaignModal && validate.isNotEmpty(utmObject) && <CampaignModal enableCampaignModal={enableCampaignModal} setEnableCampaignModal={setEnableCampaignModal} isSubscriptionCampaign={utmObject.campaignName.toLowerCase().indexOf("medplusadvantage") != -1 ? true : false } utmObject={utmObject} showCampaignModal={showCampaignModal} setShowCampaignModal={setShowCampaignModal}/>}
            <section className="main-footer">
                <div className="download-app">
                    <div className="col-5 appimg">
                        <img alt="Download App" className="img-fluid pt-5" src={DownloadApp} />
                    </div>
                    <div className="col py-sm-3 text-center">
                        <h1>Download Our App Now</h1>
                        <p>Buy general store products and medicines from <br />your mobile at anytime, anywhere</p>
                        <p>Available on:</p>
                        <a className="btn btn-link p-0 mr-2" href="https://play.google.com/store/apps/details?id=com.medplus.mobile.android" target="_blank" rel="noopener" title="Get it on Google Play">
                            <img alt="Get it on Google Play" src={PlayStore} />
                        </a>
                        <a className="btn btn-link ml-2 p-0" href="https://itunes.apple.com/us/app/medplus-drug-directory-store/id1070265254?mt=8" target="_blank" rel="noopener" title="Available on the App Store">
                            <img alt="Available on the App Store" src={AppStore} />
                        </a>
                    </div>
                </div>
                <div className="contact">
                    <div className="col-5 p-0 col-sm-3">
                        {/*
                        <img alt="whatsapp" src={WhatsApp}/> 
                        <p>
                            <small className="text-secondary d-block">WhatsApp:</small>
                            <strong >9247666000</strong>
                        </p>
                        */}
                        <img alt="Call" className="align-top mr-2 position-relative" src={Call} />
                        <p className="d-inline-block px-0 mb-0">
                            <small className="text-secondary d-block">Need any help?</small>
                            <a className="text-dark" href="tel:040-67006700" title="Need any help? 040-67006700"><strong>040-67006700</strong></a>
                        </p>
                    </div>
                    <div className="col p-0 text-right">
                        <p className="text-left">
                            <small className="text-secondary d-block">Subscribe for</small>
                            <strong >Latest Offers</strong>
                        </p>
                        <div className="form-group filled-form text-left has-float-label ">
                            <input type="text" className={validate.isNotEmpty(errorMsg["emailAddress"]) ? "form-control is-invalid" : "form-control"} id="emailAddress" name="emailAddress" maxLength="45" required="" autoComplete="new-off" onBlur={handleInputChange} onChange={handleInputChange} onKeyPress={(event) => submitSubscribeRequest(event)} value={emailAddress} placeholder=" " title='Please fill in this field'/>
                            <label className="select-label">Your email address here</label>
                            <div className="invalid-feedback position-absolute">
                                {errorMsg['emailAddress']}
                            </div>
                        </div>
                        <button type="button" className="btn btn-brand-gradient rounded-pill px-4 custom-btn-lg" disabled={isProcessLoading} onClick={() => subscribeNewsletter()} >
                            {isProcessLoading ? "" : "Subscribe"}
                            {isProcessLoading &&
                                <React.Fragment>
                                    <div className='px-4'>
                                        <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                        <span className="sr-only"></span>
                                    </div>
                                </React.Fragment>
                            }
                        </button>
                    </div>
                </div>
                <div className="border-bottom  primary-links">
                    <div>
                        <Link to="/aboutUs" title="About Us" className='btn btn-link no-underline'>About Us</Link>
                        <Link to="/faq" title="FAQs" className='btn btn-link no-underline'>FAQs</Link>
                        <a href="https://pharmacy.medplusmart.com" title="Locate A MedPlus Store" target="_blank" className='btn btn-link no-underline'>Locate A <span className="hidden-xs">MedPlus </span>Store</a>
                        <Link to="/ordersHistory" title="Track Orders" className='btn btn-link no-underline'>Track Orders</Link>
                        <Link to="/brands" title="Browse All Brands" className='btn btn-link no-underline'>Browse All Brands</Link>
                        <Link to="/customerFeedBack" title="Customer Feedback" className='btn btn-link no-underline'>Customer Feedback</Link>
                        <Link to="/community-delivery" title="Community Delivery" className='btn btn-link no-underline'>Community Delivery</Link>
                        <Link to="/bulkOrder" title="Bulk Order" className='btn btn-link no-underline'>Bulk Order</Link>
                        <Link to="/contactUs" title="Contact Us" className='btn btn-link no-underline'>Contact Us</Link>

                    </div>
                    <div className="text-right">
                        <Link to={{pathname:"https://seal.godaddy.com/verifySeal?sealID=gwfhYzQBYIT2HVDkSA7p2XUpzkVVZrLRuEHNvrtqW4XEWe5BggPQrij2O0lo"}} target="_blank" rel="noopener">
                            <img src="https://www.medplusmart.com/new_theme/web/images/siteseal_gd_3_h_l_m.png" alt="GoDaddy Verified &amp; Secured" title="GoDaddy Verified &amp; Secured" />
                        </Link>
                    </div>
                </div>
                <div className="col-12 p-3">
                    <div className="footerPayments">
                        <h6 className="color-dgry">Payments</h6>
                        <button className="cursorarw visa-position border-0 bg-transparent" title="Visa"></button>
                        <button className="cursorarw mastercard-position border-0 bg-transparent" title="MasterCard"></button>
                        <button className="cursorarw maestro-position border-0 bg-transparent" title="Maestro"></button>
                        <button className="cursorarw paytm-position border-0 bg-transparent" title="Paytm"></button>
                        <button className="cursorarw netbanking-position border-0 bg-transparent" title="Net Banking"></button>
                        <button className="cursorarw cash-on-delivery-position border-0 bg-transparent" title="Cash On Delivery"></button>
                    </div>

                    <div className="row p-0 mt-2 dynamic-footer-links mx-sm-0 no-gutters">
                        <div className='col-6'>
                            { validate.isEmpty(generalFooter) ? <StaticGeneralFooter/> : <div dangerouslySetInnerHTML={{ __html: generalFooter }} />} 
                            {validate.isEmpty(pharmacyFooter) ? <StaticPharmacyFooter/> : <div dangerouslySetInnerHTML={{ __html: pharmacyFooter }} />} 
                        </div>
                        <div className='col-6'>
                             <LabsFooter history={props.history} setDoctorReq={setDoctorReq}/> 
                             {
                              doctorRequest && <DoctorsFooter  history={props.history}/>
                             }
                            
                        </div>
                    </div>
                </div>
                <div className="col about-medplus">
                    <p className="font-14"><strong>About MedPlusMart:</strong></p>
                    <p><strong>MedPlus</strong>: One of the most trusted gateways to medicines and general provision</p>
                    <p>With an aim to eradicate fake and ineffective medicines, and supply high-quality medicines in India, MedPlus was launched in 2006 in Hyderabad. According to WHO research, every 1 or 2 in 10 medicines are proven to be adulterated in low/medium income countries like India and MedPlus aspires to bring about a change in this statistic. To encourage and elevate transparency in the functioning of the pharmaceutical industry, MedPlus has been successfully contributing in providing genuine and unadulterated medicines since its inception. Currently operating in 300+ cities, with 1500+ offline stores in India, MedPlus is the second largest pharmacy chain in India today. Welcome to a seamless and impeccable shopping experience!</p>
                    <p className='font-14'><strong>6 Reasons for you to Shop from MedPlus</strong>:</p>
                    <ol>
                        <li><strong>Authentic medicines: </strong> Be 100% assured of receiving genuine medicines</li>
                        <li><strong>Monthly provisions:</strong> One stop store for both medicines as well as monthly provisions (kiraana)</li>
                        <li><strong>Quick to-door deliveries:</strong> We ensure the delivery of well-packaged products to your doorstep at quick timelines.</li>
                        <li><strong>Pocket-friendly:</strong> Our range of discounts, offers and deals will allow you to go economical everyday, everytime. We recommend you to explore <Link class="strong" to="/paybackspecialsale" title="Payback Special Sale"><ins>Payback Special Sale</ins></Link>, our special saving scheme.</li>
                        <li><strong>Customer-friendly:</strong> Order from the comfort of your sofa with our easy browsing and smooth billing procedure. Our hassle-free <Link className="strong" to="/pharmaHome" title="Upload"><ins>Upload</ins></Link> option allows you to seamlessly upload your prescription online and have your medicines delivered to you!</li>
                        <li><strong>Track and Re-Order:</strong> Conveniently refer to all your previous bills and orders which will allow you to re-order with a single click.</li>
                    </ol>
                    <p>Also, for those of you who prefer offline shopping, <Link className="strong" to="/storelocator" title="Locate your nearest store"><ins>locate your nearest store</ins></Link> and get going!</p>
                </div>
                <div className="row footer-img">
                    <div className="col-7 ">
                        <div className="row p-0">
                            <div className="col-6">
                                <div className="footerPartners">
                                    <h6 className="color-dgry">Partners</h6>
                                    {/* <a href="https://www.medpluslab.com" target="_blank" className="text-center" rel="noopener">
                                    <img src={MedPlusLab} title="MedPlusLab.com" alt="MedPlusLab.com" />
                                </a> */}
                                    <a href="https://www.medpluslens.com" target="_blank" className="text-center" rel="noopener">
                                        <img src={MedPlusLens_icon} title="MedPlusLens.com" alt="MedPlusLens.com" />
                                    </a>
                                </div>
                            </div>
                            <div className="col">
                                <div className="footerFallowus">
                                    <h6 className="color-dgry">Follow us</h6>
                                    <span itemScope="" itemType="https://schema.org/Organization">
                                        <ul className="pl-0">
                                            <li>
                                                <a itemProp="sameAs" href="https://www.facebook.com/IndiaMedPlus" target="_blank" rel="noopener" title="Facebook">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Facebook_Gray" width="36" height="36" viewBox="0 0 36 36">
                                                        <rect id="Rectangle_5538" data-name="Rectangle 5538" width="36" height="36" transform="translate(0 0)" fill="none" />
                                                        <g id="Group_16696" data-name="Group 16696" transform="translate(0 0)">
                                                            <g id="Group_16694" data-name="Group 16694" transform="translate(0 0)">
                                                                <path id="Path_24097" data-name="Path 24097" d="M4515.62,672.94a18,18,0,1,1,18-18A18.02,18.02,0,0,1,4515.62,672.94Z" transform="translate(-4497.62 -636.941)" fill="#a8a8a8" />
                                                            </g>
                                                            <g id="Group_16695" data-name="Group 16695" transform="translate(12.923 7.111)">
                                                                <path id="Path_24098" data-name="Path 24098" d="M4519.512,658.848v10.528a.274.274,0,0,0,.274.274h3.909a.274.274,0,0,0,.274-.274v-10.7h2.834a.273.273,0,0,0,.272-.251l.273-3.223a.275.275,0,0,0-.274-.3h-3.106v-2.288a.97.97,0,0,1,.971-.97h2.184a.275.275,0,0,0,.274-.274v-3.224a.275.275,0,0,0-.274-.274h-3.691a3.922,3.922,0,0,0-3.922,3.922V654.9h-1.955a.274.274,0,0,0-.274.274V658.4a.273.273,0,0,0,.274.274h1.955Z" transform="translate(-4517.283 -647.874)" fill="#fff" fillRule="evenodd" />
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a itemProp="sameAs" href="https://www.youtube.com/channel/UCIkVRQNwi4cCWREexw307gg" target="_blank" rel="noopener" title="YouTube">
                                                    <svg id="Youtube_Gray" xmlns="http://www.w3.org/2000/svg" width="36.001" height="36" viewBox="0 0 36.001 36">
                                                        <rect id="Rectangle_5539" data-name="Rectangle 5539" width="35.907" height="36" transform="translate(0.094 0)" fill="none" />
                                                        <g id="Group_16700" data-name="Group 16700" transform="translate(0 0)">
                                                            <g id="Group_16697" data-name="Group 16697" transform="translate(0 0)">
                                                                <path id="Path_24099" data-name="Path 24099" d="M4586.843,677.372a17.953,17.953,0,1,1,17.953-17.953A17.973,17.973,0,0,1,4586.843,677.372Z" transform="translate(-4568.89 -641.466)" fill="#a8a8a8" />
                                                            </g>
                                                            <g id="Group_16699" data-name="Group 16699" transform="translate(7.489 10.596)">
                                                                <g id="Group_16698" data-name="Group 16698">
                                                                    <path id="Path_24100" data-name="Path 24100" d="M4601.575,662.237a4.626,4.626,0,0,0-4.625-4.625h-12a4.625,4.625,0,0,0-4.625,4.625v5.622a4.625,4.625,0,0,0,4.625,4.626h12a4.626,4.626,0,0,0,4.625-4.626Zm-7.569,3.094-4.785,2.624c-.208.113-.395-.038-.395-.275v-5.386c0-.239.193-.39.4-.271l4.817,2.762A.314.314,0,0,1,4594.006,665.331Z" transform="translate(-4580.327 -657.611)" fill="#fff" />
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a itemProp="sameAs" href="https://twitter.com/MedPlusIndia" target="_blank" rel="noopener" title="Twitter">
                                                    <svg id="Twiter_Gray"  xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                                                        <g id="twitter-x-logo-36" transform="translate(0 -0.003)">
                                                            <g id="Group_28654" data-name="Group 28654" transform="translate(0 0.003)">
                                                                <path id="Path_47771" data-name="Path 47771" d="M36,18A17.985,17.985,0,0,1,18,36h0A18,18,0,1,1,18,0h0A18,18,0,0,1,36,18" transform="translate(0 -0.003)" fill="#a8a8a8" />
                                                                <path id="Path_47772" data-name="Path 47772" d="M325.729,313.628l-.774-1.122-5.069-7.348h-5.512l7.5,10.968.773,1.131,4.98,7.286h5.633Zm-2.261,2.659-.772-1.13-6-8.772h2.541l4.889,7.088.775,1.123,6.014,8.718h-2.648Z" transform="translate(-305.816 -296.85)" fill="#fafafa" />
                                                                <path id="Path_47773" data-name="Path 47773" d="M334.377,672.464l.772,1.13-.824.969-6.194,7.286h-1.748l7.17-8.417Z" transform="translate(-317.497 -654.156)" fill="#fafafa" />
                                                                <path id="Path_47774" data-name="Path 47774" d="M681.551,305.159l-7.2,8.47-.823.968-.775-1.123.824-.967,6.26-7.348Z" transform="translate(-654.436 -296.851)" fill="#fafafa" />
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a itemProp="sameAs" href="https://in.linkedin.com/in/medplus" target="_blank" rel="noopener" title="Linkedin">
                                                    <svg id="Linkidin_Gray" xmlns="http://www.w3.org/2000/svg" width="35.974" height="36" viewBox="0 0 35.974 36">
                                                        <rect id="Rectangle_5540" data-name="Rectangle 5540" width="35.026" height="36" transform="translate(0.272 0)" fill="none" />
                                                        <g id="Group_16706" data-name="Group 16706" transform="translate(0 0)">
                                                            <g id="Group_16704" data-name="Group 16704" transform="translate(0 0)">
                                                                <g id="Group_16701" data-name="Group 16701">
                                                                    <path id="Path_24101" data-name="Path 24101" d="M4726.333,672.96a17.987,17.987,0,1,1,17.987-17.987A18.008,18.008,0,0,1,4726.333,672.96Z" transform="translate(-4708.347 -636.987)" fill="#a8a8a8" />
                                                                </g>
                                                                <g id="Group_16703" data-name="Group 16703" transform="translate(9.423 13.851)">
                                                                    <g id="Group_16702" data-name="Group 16702">
                                                                        <path id="Path_24102" data-name="Path 24102" d="M4741.351,663.472v6.715a.3.3,0,0,1-.3.3h-3.466a.3.3,0,0,1-.3-.3v-6.245c0-1.643-.587-2.766-2.06-2.766a2.225,2.225,0,0,0-2.086,1.487,2.776,2.776,0,0,0-.134.991v6.532a.3.3,0,0,1-.3.3h-3.466a.3.3,0,0,1-.3-.3c.008-1.663.043-9.733.007-11.629a.3.3,0,0,1,.3-.3h3.458a.3.3,0,0,1,.3.3v1.433c-.009.014-.021.027-.028.04H4733v-.04a4.037,4.037,0,0,1,3.665-2.021c2.676,0,4.683,1.749,4.683,5.506Zm-18.431,7.016h3.465a.3.3,0,0,0,.3-.3V658.555a.3.3,0,0,0-.3-.3h-3.465a.3.3,0,0,0-.3.3v11.632A.3.3,0,0,0,4722.919,670.488Z" transform="translate(-4722.619 -657.967)" fill="#fff" />
                                                                    </g>
                                                                </g>
                                                            </g>
                                                            <g id="Group_16705" data-name="Group 16705" transform="translate(9.155 8.226)">
                                                                <circle id="Ellipse_1067" data-name="Ellipse 1067" cx="2.177" cy="2.177" r="2.177" fill="#fff" />
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </div>
                            <p className="m-3 pt-3 border-top w-100">&copy; 2022 MedPlusMart.com. All rights reserved.</p>
                        </div>
                    </div>
                    <div className="col">
                        <img alt="footer-img" className="img-fluid" src={FooterImg} />
                    </div>
                </div>

                <div className="bottom-text">
                    <ul>
                        <li><img alt="bulk-order" src={BulkOrder} /> <Link title='Bulk Order' to="/bulkOrder" role="link"> Bulk Order</Link></li>
                        <li><img alt="community" src={Community} /> <Link to="/community-delivery" title='Community Delivery' role="link">Community Delivery</Link></li>
                        <li><img alt="sitemap" src={Sitemap} /> <Link to="/view-sitemap" title='Sitemap' role="link">Sitemap</Link></li>
                        <li><img alt="privacy" src={Privacy} /> <Link to="/privacypolicy" title='Privacy' role="link">Privacy</Link></li>
                        <li><img alt="return" src={Return} /> <Link to="/returnsandcancellations" title='Returns & Cancellations' role="link">Returns & Cancellations</Link></li>
                        <li><img alt="terms-condition" src={TermsConditions} /><Link to="/termsandconditions" title='Terms & Conditions' role="link">Terms & Conditions</Link></li>
                    </ul>
                </div>
            </section>
        </React.Fragment>
    )
}


const StaticGeneralFooter = () =>{
    return(
        <div>
            <h3 className="title">General Store</h3>
            <ul className="inline-list">
                <li className="size-12">Baby-Needs</li>
                <li>
                    <a href="/category/Baby-Needs/Baby-Food/20031/10104" title="Baby Food" role="link">
                        Baby Food
                    </a>
                </li>
                <li>
                    <a href="categories/baby-needs_10104/baby-care_20001" title="Baby Care">
                        Baby Care
                </a>
                </li>
            </ul>
            <ul className="inline-list">
                <li className="size-12">Personal Care</li>
                <li>
                    <a href="/category/Personal-Care/Skin-Care/20002/10102" title="Skin Care" role="link">
                        Skin Care
                    </a>
                </li>
                <li>
                    <a href="/category/Personal-Care/Sanitary-n-Hygiene/20003/10102" title="Sanitary &amp; Hygiene" role="link">
                        Sanitary &amp; Hygiene
                    </a>
                </li>
                <li>
                    <a href="/category/Personal-Care/Oral-Care/20004/10102" title="Oral Care" role="link">
                        Oral Care
                    </a>
                </li>
                <li>
                    <a href="/category/Personal-Care/Hair-Care/20005/10102" title="Hair Care" role="link">
                        Hair Care
                    </a>
                </li>
                <li>
                    <a href="/category/Personal-Care/Bath-n-Body-Products/20006/10102" title="Bath &amp; Body Products" role="link">
                        Bath &amp; Body Products
                    </a>
                </li>
                <li>
                    <a href="/category/Personal-Care/Sexual-Wellness/20007/10102" title="Sexual Wellness" role="link">
                        Sexual Wellness
                    </a>
                </li>
                <li>
                    <a href="/category/Personal-Care/Deodorants-n-Perfumes/20008/10102" title="Deodorants &amp; Perfumes" role="link">
                        Deodorants &amp; Perfumes
                    </a>
                </li>
                <li>
                    <a href="/category/Personal-Care/Eyes-Ears-n-Lips/20009/10102" title="Eyes, Ears &amp; Lips" role="link">
                        Eyes, Ears &amp; Lips
                    </a>
                </li>
                <li>
                    <a href="/category/Personal-Care/Shaving-n-Hair-Removal/20010/10102" title="Shaving &amp; Hair Removal" role="link">
                        Shaving &amp; Hair Removal
                    </a>
                </li>
                <li>
                    <a href="/category/Personal-Care/Hand-Foot-n-Nails/20011/10102" title="Hand, Foot &amp; Nails" role="link">
                        Hand, Foot &amp; Nails
                    </a>
                </li>
            </ul>
            <ul className="inline-list">
                <li className="size-12">Health-n-Nutrition</li>
                <li>
                    <a href="/category/Health-n-Nutrition/Health-Drinks/20082/10103" title="Health Drinks" role="link">
                        Health Drinks
                    </a>
                </li>
                <li>
                    <a href="/category/Health-n-Nutrition/Breakfast-Cereals/20034/10103" title="Breakfast Cereals" role="link">
                        Breakfast Cereals
                    </a>
                </li>
                <li>
                    <a href="/category/Health-n-Nutrition/Nutritional-Foods/20083/10103" title="Nutritional Foods" role="link">
                        Nutritional Faaaoods
                    </a>
                </li>
                <li>
                    <a href="/category/Health-n-Nutrition/Weight-Management/20077/10103" title="Weight Management" role="link">
                        Weight Management
                    </a>
                </li>
            </ul>
            <ul className="inline-list">
                <li className="size-12">OTC-n-Health-Needs</li>
                <li>
                    <a href="/category/OTC-n-Health-Needs/First-Aid/20061/10106" title="First Aid" role="link">
                        First Aid
                    </a>
                </li>
                <li>
                    <a href="/category/OTC-n-Health-Needs/Pain-Relief/20062/10106" title="Pain Relief" role="link">
                        Pain Relief
                    </a>
              
                </li>
                <li>
                    <a href="/category/OTC-n-Health-Needs/Cold-Relief/20063/10106" title="Cold Relief" role="link">
                        Cold Relief
                    </a>
                </li>
                <li>
                    <a href="/category/OTC-n-Health-Needs/Joint-Care-n-Support/20064/10106" title="Joint Care &amp; Support" role="link">
                        Joint Care &amp; Support
                    </a>
                </li>
                <li>
                    <a href="/category/OTC-n-Health-Needs/Skin-n-Foot-Care/20065/10106" title="Skin &amp; Foot Care" role="link">
                        Skin &amp; Foot Care
                    </a>
                </li>
                <li>
                    <a href="/category/OTC-n-Health-Needs/Digestives-n-Laxatives/20066/10106" title="Digestives &amp; Laxatives" role="link">
                        Digestives &amp; Laxatives
                    </a>
                </li>
                <li>
                    <a href="/category/OTC-n-Health-Needs/Healthcare-Devices/20067/10106" title="Healthcare Devices" role="link">
                        Healthcare Devices
                    </a>
                </li>
                <li>
                    <a href="/category/OTC-n-Health-Needs/Anti-Smoking-Products/20068/10106" title="Anti-Smoking Products" role="link">
                        Anti-Smoking Products
                    </a>
                </li>
            </ul>
            <ul className="inline-list">
                <li className="size-12">Vitamins-n-Supplements</li>
                <li>
                    <a href="/category/Vitamins-n-Supplements/Sports-Supplements/20076/10107" title="Sports Supplements" role="link">
                        Sports Supplements
                    </a>
                </li>
                <li>
                    <a href="/category/Vitamins-n-Supplements/Vitamins-n-Minerals/20078/10107" title="Vitamins &amp; Minerals" role="link">
                        Vitamins &amp; Minerals
                    </a>
                </li>
                <li>
                    <a href="/category/Vitamins-n-Supplements/Herbal-Supplements/20079/10107" title="Herbal Supplements" role="link">
                        Herbal Supplements
                    </a>
                </li>
                <li>
                    <a href="/category/Vitamins-n-Supplements/Jamieson/20087/10107" title="Jamieson" role="link">
                        Jamieson
                    </a>
                </li>
            </ul>
            <ul className="inline-list">
                <li className="size-12">Diabetic-Needs</li>
                <li>
                    <a href="/category/Diabetic-Needs/Diabetic-Testing-Needs/20085/10108" title="Diabetic Testing Needs" role="link">
                        Diabetic Testing Needs
                    </a>
                </li>
                <li>
                    <a href="/category/Diabetic-Needs/Diabetic-Nutrition/20086/10108" title="Diabetic Nutrition" role="link">
                        Diabetic Nutrition
                    </a>
                </li>
                <li>
                    <a href="/category/Diabetic-Needs/Diabetic-Aids/20084/10108" title="Diabetic Aids" role="link">
                        Diabetic Aids
                    </a>
                </li>
            </ul>
            <ul className="inline-list">
                <li className="size-12">Household-Needs</li>
                <li>
                    <a href="/category/Household-Needs/Cleaning-Needs/20046/10105" title="Cleaning Needs" role="link">
                        Cleaning Needs
                    </a>
                </li>
                <li>
                    <a href="/category/Household-Needs/Detergents/20047/10105" title="Detergents" role="link">
                        Detergents
                    </a>
                </li>
                <li>
                    <a href="/category/Household-Needs/Home-Utilities/20048/10105" title="Home Utilities" role="link">
                        Home Utilities
                    </a>
                </li>
                <li>
                    <a href="/category/Household-Needs/Kitchen-Utilities/20049/10105" title="Kitchen Utilities" role="link">
                        Kitchen Utilities
                    </a>
                </li>
                <li>
                    <a href="/category/Household-Needs/Luggage/20054/10105" title="Luggage" role="link">
                        Luggage
                    </a>
                </li>
                <li>
                    <a href="/category/Household-Needs/Bakery-n-Confectionary/20032/10105" title="Bakery &amp; Confectionary" role="link">
                        Bakery &amp; Confectionary
                    </a>
                </li>
                <li>
                    <a href="/category/Household-Needs/Beverages/20033/10105" title="Beverages" role="link">
                        Beverages
                    </a>
                </li>
                <li>
                    <a href="/category/Household-Needs/Branded-Organic-n-Ayurvedic/20041/10105" title="Branded Organic &amp; Ayurvedic" role="link">
                        Branded Organic &amp; Ayurvedic
                    </a>
                </li>
            </ul>
        </div>
    )
}

const StaticPharmacyFooter = () =>{
    return(
        <div>
            <h6 className="title">Pharmacy</h6>
            <ul className="inline-list mb-4">
                <li className="size-12"><Link to="/pharmaHome" className="p-0" role="link">Medicine Information</Link></li>
                <li><Link to="/viewPrescription" role="link">Health Records</Link></li>
                <li><Link to="/requestProduct" role="link">Request a Product</Link></li>
                <li><Link to="/storelocator" role="link">Store Locator</Link></li>
                <li><Link to="/topSearches" role="link">Top Searches</Link></li>
                <li><Link to="/alphabetWiseProducts/0-9" role="link">Alphabet Wise Products</Link></li>
            </ul>
            <ul className="inline-list">
                <li className="size-12">Therapeutic category</li>
                <li><a href="/drugsInfo/medicines/antacids-antireflux-agents-n-antiulcerants/10002/10003" title="Gastrointestinal &amp; Hepatobiliary System" role="link">Gastrointestinal &amp; Hepatobiliary System</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/cardiac-drugs/10013/10014" title="Cardiovascular &amp; Hematopoietic system" role="link">Cardiovascular &amp; Hematopoietic system</a>
                </li>
                <li><a href="/drugsInfo/medicines/respiratory-stimulants/10033/10034" title="Respiratory System" role="link">Respiratory System</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/anxiolytics/10039/10040" title="Central Nervous System">Central Nervous System</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/disease-modifying-anti-rheumatic-drugs-dmards-/10054/10055" title="Musculo-Skeletal System" role="link">Musculo-Skeletal System</a>
                </li>
                <li><a href="/drugsInfo/medicines/androgens-n-related-synthetic-drugs/10062/10063" title="Hormones" role="link">Hormones</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/oral-contraceptives/10070/10071" title="Contraceptive Agents" role="link">Contraceptive Agents</a>
                     
                </li>                    
                <li><a href="/drugsInfo/medicines/aminoglycosides/10074/10075" title="Infectious Disease Drugs" role="link">Infectious Disease Drugs</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/cytotoxic-chemotherapy/10094/10095" title="Oncology" role="link">Oncology</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/preparations-for-vaginal-conditions/10100/10101" title="Genito - Urinary System" role="link">Genito - Urinary System</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/insulin-preparations/10107/10108" title="Endocrine &amp; Metabolic System" role="link">Endocrine &amp; Metabolic System</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/vitamins/10115/10116" title=" Vitamins &amp; Minerals" role="link"> Vitamins &amp; Minerals</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/infant-nutritional-products/10119/10120" title="Nutrition" role="link">Nutrition</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/eye-anti-infectives-n-antiseptics/10126/10127" title="Eye" role="link">Eye</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/ear-anti-infectives-n-antiseptics/10135/10136" title="Ear &amp; Mouth / Throat" role="link">Ear &amp; Mouth / Throat</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/topical-antibiotics/10140/10141" title="Dermatologicals" role="link">Dermatologicals</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/anaesthetics-local-n-general/10153/10154" title="Anaesthetics &amp; Intravenous Solutions" role="link">Anaesthetics &amp; Intravenous Solutions</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/antihistamines-n-antiallergics/10156/10157" title="Allergy &amp; Immune System" role="link">Allergy &amp; Immune System</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/-antidotes-and-detoxifying-agents/10160/10161" title=" Antidotes, Detoxifying Agents &amp; Drugs Used in Substance Dependence" role="link"> Antidotes, Detoxifying Agents &amp; Drugs Used in Substance Dependence</a>
                     
                </li>
                <li><a href="/drugsInfo/medicines/miscellaneous/10163/10164" title="Miscellaneous" role="link">Miscellaneous</a>
                </li>
            </ul>
            <ul className="inline-list">
                <li className="size-12"> Surgicals products by category</li>
                <li><a href="/drugsInfo/surgicals/agents/11001/11002" title="Anaesthesia" role="link">Anaesthesia</a>
                     
                </li>
                <li><a href="/drugsInfo/surgicals/cathlab/11004/11005" title="Cardiovascular" role="link">Cardiovascular</a>
                     
                </li>
                <li><a href="/drugsInfo/surgicals/antiseptics-disinfectants/11008/11009" title="CSSD" role="link">CSSD</a>
                     
                </li>
                <li><a href="/drugsInfo/surgicals/feeding-tubes/11016/11017" title="Catheters &amp; Tubes" role="link">Catheters &amp; Tubes</a>
                     
                </li>
                <li><a href="/drugsInfo/surgicals/cannulas-n-infusion-sets/11022/11023" title="IV Needs" role="link">IV Needs</a>
                     
                </li>
                <li><a href="/drugsInfo/surgicals/trolleys-n-wheelchairs/11028/11029" title="Mobilization Equipment" role="link">Mobilization Equipment</a>
                     
                </li>
                <li><a href="/drugsInfo/surgicals/instruments-n-accessories/11032/11033" title="Orthopaedic" role="link">Orthopaedic</a>
                     
                </li>
                <li><a href="/drugsInfo/surgicals/instruments-n-accessories/11037/11038" title="Surgicals" role="link">Surgicals</a>
                     
                </li>
                <li><a href="/drugsInfo/surgicals/crash-cart-supplies/11044/11045" title="Pulmonary/Emergency Care" role="link">Pulmonary/Emergency Care</a>
                     
                </li>
                <li><a href="/drugsInfo/surgicals/reagents-n-consumables/11048/11049" title="Diagnostic/Imaging" role="link">Diagnostic/Imaging</a>
                </li>
            </ul>
        </div>
    )
}

const StaticDiagnosticsFooter = () =>{
    return(
        <div>
            <h3 className="title">Diagnostics</h3>
            <ul className='inline-list'>
                <li className='size-12'>Department Wise Diagnostic Tests</li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/department/clinical-pathology_11`} title='Clinical Pathology'  role="link">Clinical Pathology</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/department/profile-parameters_12`} title='Profile Parameters' role="link">Profile Parameters</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/department/serology_1`} title='Serology' role="link">Serology</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/department/microbiology_2`} title='Microbiology' role="link">Microbiology</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/department/biochemistry_3`} title='Biochemistry' role="link">Biochemistry</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/department/hematology_6`} title='Hematology' role="link">Hematology</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/department/molecular-biology_7`} title='Molecular Biology' role="link">Molecular Biology</Link></li>
            </ul>
            <ul className='inline-list'>
                <li className='size-12'>Radiology &amp; Imaging Services</li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/mri_labs_20013`} title="MRI" role="link">MRI</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/ct-scan_labs_20014`} title="CT Scan" role="link">CT Scan</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/x-ray_labs_20015`} title="X-Ray" role="link">X-Ray</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/3d-or-4d-ultrasound_labs_20017`} title="3D/4D UltraSound" role="link">3D/4D UltraSound</Link><span className='mx-2'></span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/mammography_labs_20018`} title="Mammography" role="link">Mammography</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/tmt_labs_20019`} title="TMT" role="link">TMT</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/eeg--or--enmg_labs_20020`} title="EEG/ENMg" role="link">EEG/ENMG</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/2d-echo_labs_20021`} title="2D Echo" role="link">2D Echo</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/bone-densitometry_labs_20022`} title="Bone Denistometry" role="link">Bone Denistometry</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/dental-opg--or--cbct_labs_20023`} title="Dental OPG / CBCT" role="link">Dental OPG / CBCT</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/audiometry_labs_20024`} title="Audiometry" role="link">Audiometry</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/ecg-(electrocardiogram)_labs_20025`} title='ECG (Electrocardiogram)' role="link">ECG (Electrocardiogram)</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/video-endoscopy_labs_20026`} title="Video Endoscopy" role="link">Video Endoscopy</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/pulmonary-function-test-(pft)_labs_20027`} title="Pulmonary Function Test (PFT)" role="link">Pulmonary Function Test (PFT)</Link></li>
            </ul> role="link"
            <ul className="inline-list">
                <li className="size-12">Condition Based Diagnostic Tests:</li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/lab-profiles--n--packages_labs_20012`} title="Lab Profile and Packages" role="link">Lab Profiles &amp; Packages</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/heart_labs_20028`} title='Heart' role="link">Heart</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/liver_labs_20029`} title='Liver' role="link">Liver</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/lungs_labs_20030`} title='Lungs' role="link">Lungs</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/fertility_labs_20031`} title='Fertility' role="link">Fertility</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/kidney_labs_20032`} title='Kidney' role="link">Kidney</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/allergy_labs_20033`} title='Allergy' role="link">Allergy</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/thyroid_labs_20034`} title='Thyroid' role="link">Thyroid</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/vitamins_labs_20035`} title='Vitamins' role="link">Vitamins</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/anaemia_labs_20036`} title='Anaemia' role="link">Anaemia</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/fever_labs_20037`} title='Fever' role="link">Fever</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/diabetes_labs_20038`} title='Diabetes' role="link">Diabetes</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/bone_labs_20039`} title='Bone' role="link">Bone</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/immunity_labs_20040`} title="Immunity" role="link">Immunity</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/cancer_labs_20041`} title='Cancer' role="link">Cancer</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/hormones_labs_20042`} title='Hormones' role="link">Hormones</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/prostate_labs_20043`} title="Prostate" role="link">Prostate</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/pregnancy_labs_20044`} title='Pregnancy' role="link">Pregnancy</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/hiv_labs_20045`} title='HIV' role="link">HIV</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/tuberculosis_labs_20046`} title='Tuberculosis' role="link">Tuberculosis</Link><span className="mx-2">/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/other-pathology-tests_labs_20047`} title='Other Pathology Tests' role="link">Other Pathology Tests</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/musculo-skeletal-disorders_labs_20048`} title="Musculo Skeletal Disorders" role="link">Musculo Skeletal Disorders</Link><span className='mx-2'>/</span> </li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/toxicology_labs_20049`} title="Toxicology" role="link">Toxicology</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/clotting-disorders_labs_20050`} title='Clotting Disorders' role="link">Clotting Disorders</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/drug-level-monitoring_labs_20051`} title='Drug level Monitoring' role="link">Drug Level Monitoring</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/heavy-metals_labs_20052`} title="Heavy Metals" role="link">Heavy Metals</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/infectious-disease_labs_20053`} title="Infectious Disease" role="link">Infectious Disease</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/blood-disorders_labs_20054`} title="Blood Disorders" role="link">Blood Disorders</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/autoimmune-disorders_labs_20055`} title="Autoimmune Disorders" role="link">Autoimmune Disorders</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/stomach_labs_20056`} title='Stomach' role="link">Stomach</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/inflammatory-markers_labs_20057`} title="Inflammatory Markers" role="link">Inflammatory Markers</Link><span className='mx-2'>/</span></li>
                <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/electrolytes_labs_20058`} title="Electrolytes" role="link">Electrolytes</Link></li>
            </ul>
        </div>
    )
}

const StaticDoctorsFooter = () =>{
    return(
        <div>
            <h3 className='title'>Doctor Consultation</h3>
                    <ul className="inline-list">
                        <li className="size-12">By Specialization:</li>
                        <li><Link to="/doctorconsultation/doctors/specialization_general-medicine_1" title="General Medicine">General Medicine</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_family-practice_3" title="Family Practice">Family Practice</Link><span className='mx-2'>/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_paediatrics_4" title="Paediatrics">Paediatrics</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_obstetrics-and-gynaecology_5" title="Obstetrics and Gynaecology">Obstetrics and Gynaecology</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_diabetology_6" title="Diabetology">Diabetology</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_diabetes-n-endocrinology_7" title="Diabetes and Endocrinology"><span className='mx-2'>/</span></Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_cardiology_8" title="Cardiology">Cardiology</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_neurology_10" title="Neurology">Neurology</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_dermatology_19" title="Dermatology">Dermatology</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_ent_26" title="ENT">ENT</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_infectious-disease_35" title="Infectious Disease">Infectious Disease</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_cosmetology_56" title="Cosmetology">Cosmetology</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_reproductive-medicine_65" title="Reproductive Medicine">Reproductive Medicine</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_paediatric-allergology_72" title="Paediatric Allergology">Paediatric Allergology</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_paediatric-infectious-disease_77" title="Paediatric Infectious Disease">Paediatric Infectious Disease</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_ivf_95" title="IVF">IVF</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_complicated-pregnancy_132" title="Complicated Pregnancy">Complicated Pregnancy</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_audiology_138" title="Audiology">Audiology</Link></li>
                    </ul>
                    <ul className="inline-list">
                        <li className="size-12">By Symptoms:</li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_chest-pain_1" title="Chest Pain">Chest Pain</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_cold-and-fever_2" title="Cold and Fever">Cold and Fever</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_depression_3" title="Depression">Depression</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_weight-loss_4" title="Weight Loss">Weight Loss</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_constipation_5" title="Constipation">Constipation</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_dark-circles_7" title="Dark Circles">Dark Circles</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_low-back-pain_8" title="Low Back Pain">Low Back Pain</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_irregular-periods_9" title="Irregular Periods">Irregular Periods</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_throat-pain_10" title="Throat Pain">Throat Pain</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_hair-fall_11" title="Hair Fall">Hair Fall</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_breathing-problems_12" title="Breathing Problems">Breathing Problems</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_acne-and-scars_14" title="Acne and Scars">Acne and Scars</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_abdominal-pain_15" title="Abdominal Pain">Abdominal Pain</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_sexual-health_17" title="Sexual Health">Sexual Health</Link><span className="mx-2">/</span></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_pregnancy_18" title="Pregnancy">Pregnancy</Link></li>
                    </ul>
        </div>
    )
}

export default Footer;
