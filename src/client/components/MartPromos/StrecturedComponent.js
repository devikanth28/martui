import React from 'react'
import Validate from '../../helpers/Validate';

const StrecturedComponent = (props) => {
    let plan = props.plan;
    let validate = Validate()
    let logo = require("../../images/common/medplus-diagnostics-identity.png");
    let venky = require("../../images/common/venkatesh_promo.png");
    return (
        <div className="page-center">
            <div className="container mart-promo-pages bg-white pb-0 pr-2 shadow">
                    <img src={logo} alt="MedPlus Diagnostics"/>
                <img src={venky} alt="Venkatesh" className='float-right pr-2' />
                <div className='cardiac'>
                    {validate.isNotEmpty(plan.title) && <span className=' font-weight-bold display-1'>{plan.title}</span>}
                    {validate.isNotEmpty(plan.slicePoints) && <span className='display-4 ml-2 font-weight-normal'>({plan.slicePoints} Slice)</span>}
                    {validate.isNotEmpty(plan.subTitle) && <span className='display-4 ml-2 font-weight-normal'>({plan.subTitle})</span>}
                    <h2 className="mb-4">
                        {validate.isNotEmpty(plan.itemOfferedPrice) && <div>
                            <strong className='rupee'>&#x40;</strong>
                            <span className="text-danger font-weight-bold">
                                <strong className='rupee'>&nbsp; &#x20B9;</strong>{plan.itemOfferedPrice}/- ONLY
                            </span>
                            {validate.isNotEmpty(plan.showinclusive)&& plan.showinclusive && <small>&nbsp;(all inclusive)</small>}
                        </div>}
                        {validate.isNotEmpty(plan.mrp) &&
                            <small>
                                <span className='rupee'>&#x20B9;</span>
                                <span className='strikethrough-diagonal font-weight-normal'>{plan.mrp}</span>
                            </small>}
                    </h2>
                    <div className='d-flex justify-content-between position-relative'>
                        <div>
                            {validate.isNotEmpty(plan.phoneNumber) &&
                                <a href={"tel:+91"+`${plan.phoneNumber}`} className="btn btn-brand-gradient rounded-pill mx-0 px-3 py-2 mt-4 mb-1" rel="noopener" title={`To book a slot, call +91 ${plan.phoneNumber}`} onClick={() => { props.clciktobookyourslot() }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" className='mr-3 align-sub'>
                                        <path id="Subtraction_1" data-name="Subtraction 1" d="M1568,31a15,15,0,0,1-10.606-25.606,15,15,0,1,1,21.213,21.213A14.9,14.9,0,0,1,1568,31Zm-6.13-24.76a.431.431,0,0,0-.263.127l-2.956,2.956a1.461,1.461,0,0,0-.37.788,5.861,5.861,0,0,0,.37,2.746,14.424,14.424,0,0,0,1.281,2.747,24.679,24.679,0,0,0,1.749,2.475c.649.816,1.139,1.4,1.417,1.7.253.269.478.5.652.677l.641.616c.447.413,1.043.911,1.773,1.479s1.542,1.142,2.4,1.7a12.4,12.4,0,0,0,2.807,1.343,6.656,6.656,0,0,0,2.086.376,4.461,4.461,0,0,0,.636-.044,1.446,1.446,0,0,0,.786-.369l2.957-2.956a.314.314,0,0,0,.1-.283.358.358,0,0,0-.2-.259l-4.311-2.537a.6.6,0,0,0-.319-.1.6.6,0,0,0-.419.2l-1.282,1.281a1.076,1.076,0,0,1-.788.32,4.015,4.015,0,0,1-1.958-.825,14.964,14.964,0,0,1-1.785-1.33c-.349-.323-.647-.609-.887-.85l-.763-.788a16.266,16.266,0,0,1-1.5-1.971,3.783,3.783,0,0,1-.763-1.9,1.232,1.232,0,0,1,.345-.763l1.084-1.084a.648.648,0,0,0,.123-.764l-2.39-4.482C1562.058,6.315,1561.973,6.239,1561.87,6.239Z" transform="translate(-1553 -1)" fill="#fff" />
                                    </svg>
                                    <span className="h2 text-white font-weight-normal">{ plan.phoneNumber.toString().substring(0,5) + "-" + plan.phoneNumber.toString().substring(5)}</span>
                                </a>
                            }
                            <h4 className='mt-2 mb-3 font-weight-normal'>Book your personal slot now</h4>
                            <div className='d-flex mt-4'>
                                <div className='d-flex ml-n2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className='mr-2'>
                                        <g id="location-icn" transform="translate(1327 -837)">
                                            <rect id="Rectangle_9222" data-name="Rectangle 9222" width="32" height="32" rx="4" transform="translate(-1327 837)" fill="none" />
                                            <path id="Icon_material-location-on" data-name="Icon material-location-on" d="M15.9,3a8.394,8.394,0,0,0-8.4,8.4c0,6.3,8.4,15.6,8.4,15.6s8.4-9.3,8.4-15.6A8.394,8.394,0,0,0,15.9,3Zm0,11.4a3,3,0,1,1,3-3A3,3,0,0,1,15.9,14.4Z" transform="translate(-1326.5 838)" fill="#e71c37" />
                                        </g>
                                    </svg><h4 className='mb-0'>Gachibowli</h4>
                                </div>
                                <div className='d-flex ml-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className='mr-2'>
                                        <g id="location-icn" transform="translate(1327 -837)">
                                            <rect id="Rectangle_9222" data-name="Rectangle 9222" width="32" height="32" rx="4" transform="translate(-1327 837)" fill="none" />
                                            <path id="Icon_material-location-on" data-name="Icon material-location-on" d="M15.9,3a8.394,8.394,0,0,0-8.4,8.4c0,6.3,8.4,15.6,8.4,15.6s8.4-9.3,8.4-15.6A8.394,8.394,0,0,0,15.9,3Zm0,11.4a3,3,0,1,1,3-3A3,3,0,0,1,15.9,14.4Z" transform="translate(-1326.5 838)" fill="#e71c37" />
                                        </g>
                                    </svg><h4 className='mb-0'>Habsiguda</h4>
                                </div>
                            </div>
                        </div>
                        <img className='position-absolute img-fluid' src={plan.imgUrl} alt={plan.imgDesc} style={{"right" : "0", "bottom" : "0"}} />
                    </div>
                    <hr />
                    <p className='mt-3 font-weight-normal'>Also get <span className='text-brand font-16 font-weight-bold'>FLAT 75% </span>on ALL Diagnostic Tests <br />(Scans & Blood Tests) for 1 year</p>
                </div>

            </div>
        </div>
    )
}

export default StrecturedComponent