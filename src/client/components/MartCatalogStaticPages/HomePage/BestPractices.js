import React from 'react'
import SafeAndSecureIcon from '../../../images/common/safe-and-secure.svg'
import OnlineReportsIcon from "../../../images/common/online-reports.svg"
import HomeSampleCollectionIcon from "../../../images/common/home-sample-collection.svg"
import CompititivePrice from "../../../images/common/compititive-prices.svg"
import WhyMedplusMart from './HomePagePlaceholders/WhyMedplusMart'
const BestPractices = () => {
  return (
    <React.Fragment>
            <div className="practices-div-container">
                <h6 className="mb-4 h5">Why MedPlusMart</h6>
                <div className="container-fluid">
                    <div className="row pt-2">
                        <div className="col-3">
                            <span className="img-container">
                                <img className="img-fluid" src={SafeAndSecureIcon} alt="Maximize your savings" title="Maximize your savings" role="img"/>
                            </span>
                            <h6 className="mb-3">Maximize Your Savings</h6>
                            <p className="mb-0">With FlexiRewards, You can choose the reward cash discount or free goods.</p>
                        </div>
                        <div className="col-3">
                            <span className="img-container">
                                <img className="img-fluid" src={OnlineReportsIcon} alt="Click and Pick" title="Click and Pick" role="img"/>
                            </span>
                            <h6 className="mb-3">Click and Pick</h6>
                            <p className="mb-0">Click to buy a range of products across categorie</p>
                        </div>
                        <div className="col-3">
                            <span className="img-container">
                                <img className="img-fluid" src={HomeSampleCollectionIcon} alt="Home Sample Collection" title="Home Sample Collection" role="img"/>
                            </span>
                            <h6 className="mb-3">Home Delivery</h6>
                            <p className="mb-0">We offer convenient home delivery of medicines & general goods</p>
                        </div>
                        <div className="col-3">
                            <span className="img-container">
                                <img className="img-fluid" src={CompititivePrice} alt="Competitive Prices" title="Competitive Prices" role="img" />
                            </span>
                            <h6 className="mb-3">Unlimited Health Records</h6>
                            <p className="mb-0">Save all your health records (Medical Records...)</p>
                        </div>
                    </div>
                </div>
            </div>
            <WhyMedplusMart/>
        </React.Fragment>
  )
}
export default BestPractices