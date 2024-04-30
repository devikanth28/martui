import React from 'react'
import LabImg from "../../images/common/mart-identity-cssbg.svg"
import AffixWrapper from '../Common/AffixWrapper';
import LocationIco from "../../images/common/location-icn.png";
 const PaymentHeader = () => {
    const currentCheckoutSteps = [
        "Shopping Cart",
        "Sample Collection",
        "Schedule Slot",
        "Order Summary",
        "Payments"
    ]
  return (
    <div>
        <header className="checkout-process navbar-expand-md">
              <nav className='navbar no-gutters'>
                  <div className="col">
                      <img srcSet={LabImg} height="30" />
                  </div>
              </nav>
              <AffixWrapper className="subnav-affix" id="subnav-affix" offset={0.5}>
                  <nav className="navbar subnav no-gutters" style={{ 'backgroundColor': '#ffffff', 'boxShadow': '0 0.125rem 0.25rem rgba(8, 8, 8, 0.075)', 'marginBottom': '1rem' }}>
                      <div className="col-4">
                          <div className="location">
                              <h6 className="m-0">
                                  <img className="mr-3" src={LocationIco} alt="Location Icon" height="34" title="" />
                                  <div className="mr-3 text-truncate" id="locationTooltip">
                                      {/* <small>Your current location is</small><br/> */}
                                      Pullela Gopichand Badminton Academy Isb Road, Madhava Reddy Colony, Gachibowli, Hyderabad, Telangana 500032, India<br />
                                      <small>Home Sample Collection Available</small>
                                      
                                  </div>
                              </h6>
                          </div>
                      </div>
                      <div className="col-12 col-lg-8">
                            <ul className="checkout-steps">
                                {currentCheckoutSteps.map((eachStep, index) => {
                                   
                                        return(
                                            <li key={index+1} title={eachStep} className={currentCheckoutSteps.length === index+1 ? 'active':""}>
                                                <span>{index+1}</span>{eachStep}
                                            </li>
                                        )
                                  
                                })}
                            </ul>
                        </div>
                  </nav>
              </AffixWrapper>
        </header>
    </div>
  )
}

export default PaymentHeader