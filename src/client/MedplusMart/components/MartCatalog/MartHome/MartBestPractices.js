import React, { useState } from 'react'
import SafeAndSecureIcon from '../../../../images/common/safe-and-secure.svg'
import OnlineReportsIcon from "../../../../images/common/online-reports.svg"
import HomeSampleCollectionIcon from "../../../../images/common/home-sample-collection.svg"
import CompititivePrice from "../../../../images/common/compititive-prices.svg"
import MartBestPracticesGhostImage from './MartBestPracticesGhostImage'
const MartBestPractices = () => {
    const [isLoading, setIsLoading] = useState(true);
  return (
    <React.Fragment>
            {isLoading && <div className="practices-div-container">
                <h6 className="mb-4 h5">Why MedPlusMart</h6>
                <div className="container-fluid">
                    <div className="row pt-2">
                        <div className="col-xl-3 col-xs-6 col-md-6 col-lg-6">
                            <span className="img-container">
                                <img className="img-fluid" src={SafeAndSecureIcon} alt="Maximize your savings" title="Maximize your savings" role="img"/>
                            </span>
                            <h6 className="mb-3">100% Safe & Secure</h6>
                            <p className="mb-0">We take all safety and hygiene measures to keep our customers safe.</p>
                        </div>
                        <div className="col-xl-3 col-xs-6 col-md-6 col-lg-6">
                            <span className="img-container">
                                <img className="img-fluid" src={OnlineReportsIcon} alt="Click and Pick" title="Click and Pick" role="img"/>
                            </span>
                            <h6 className="mb-3">Click and Pick</h6>
                            <p className="mb-0">Click to buy a range of products across categories</p>
                        </div>
                        <div className="col-xl-3 col-xs-6 col-md-6 col-lg-6">
                            <span className="img-container">
                                <img className="img-fluid" src={HomeSampleCollectionIcon} alt="Home Sample Collection" title="Home Sample Collection" role="img"/>
                            </span>
                            <h6 className="mb-3">Home Delivery</h6>
                            <p className="mb-0">We offer convenient home delivery of medicines & general goods</p>
                        </div>
                        <div className="col-xl-3 col-xs-6 col-md-6 col-lg-6">
                            <span className="img-container">
                                <img className="img-fluid" src={CompititivePrice} alt="Competitive Prices" title="Competitive Prices" role="img" />
                            </span>
                            <h6 className="mb-3">Unlimited Health Records</h6>
                            <p className="mb-0">Save all your health records (Medical Records...)</p>
                        </div>
                    </div>
                </div>
            </div>}
           {!isLoading && <MartBestPracticesGhostImage/>}
        </React.Fragment>
  )
}
export default MartBestPractices