import React from 'react';
import HealthPlusSubIcon from "../../../../../images/common/health-plus-sub.png"
import SafeAndSecureIcon from "../../../../../images/common/safe-and-secure.svg"
import OnlineReportsIcon from "../../../../../images/common/online-reports.svg"
import HomeSampleCollectionIcon from "../../../../../images/common/home-sample-collection.svg"
import CompititivePricesIcon from "../../../../../images/common/compititive-prices.svg"
import MedplusAdvantage from "../../../../../images/common/medplus-advantage.svg"

const Features = (props) => {
    return (
        <React.Fragment>
            <section className="bg-transparent shadow-none">
                <div className="mb-4 pb-2 practises-div">
                    <h6 class="mb-4 h5">Best Practises We Offer</h6>
                    <div className="align-items-start d-flex mb-4">
                        <span>
                            <span className="img-container">
                                <img src={SafeAndSecureIcon} alt="100% Safe & Secure" title="100% Safe & Secure" />
                            </span>
                        </span>
                        <div className="pl-3">
                            <h6 className="mb-2">100% Safe & Secure</h6>
                            <p className="mb-0">We take all safety and hygiene measures to keep our customers safe</p>
                        </div>
                    </div>
                    <div className="align-items-start d-flex mb-4">
                        <span>
                            <span className="img-container">
                                <img src={OnlineReportsIcon} alt="Online Reports" title="Online Reports" />
                            </span>
                        </span>
                        <div className="pl-3">
                            <h6 className="mb-2">Online Reports</h6>
                            <p className="mb-0">You can download reports from online and our turn around time is 24 hours</p>
                        </div>
                    </div>
                    <div className="align-items-start d-flex mb-4">
                        <span>
                            <span className="img-container">
                                <img src={HomeSampleCollectionIcon} alt="Home Sample Collection" title="Home Sample Collection" />
                            </span>
                        </span>
                        <div className="pl-3">
                            <h6 className="mb-2">Home Sample Collection</h6>
                            <p className="mb-0">Our professional technicians will come and collect your sample</p>
                        </div>
                    </div>
                    <div className="align-items-start d-flex mb-4">
                        <span>
                            <span className="img-container">
                                <img src={MedplusAdvantage} alt="MedPlus Advantage" title="MedPlus Advantage" />
                            </span>
                        </span>
                        <div className="pl-3">
                            <h6 className="mb-2">MedPlus Advantage</h6>
                            <p className="mb-0">Enjoy upto 75% discount on diagnostic tests and health packages</p>
                        </div>
                    </div>
                    <div className="align-items-start d-flex">
                        <span>
                            <span className="img-container">
                                <img src={CompititivePricesIcon} alt="Competitive Prices" title="Competitive Prices" />
                            </span>
                        </span>
                        <div className="pl-3">
                            <h6 className="mb-2">Competitive Prices</h6>
                            <p className="mb-0">We offer best prices on our diagnostic tests & health packages</p>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default Features;