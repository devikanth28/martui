import React from "react";
import Validate from "../../../../helpers/Validate";

const EstimatedReportDelivery = (props) => {
    return(
        <React.Fragment>
        { props.isCheckoutPage ? (<div className="d-flex mt-3">
                {/* blue information icon was commented and replaced with text message Note: */}
                {/* <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                    <g transform="translate(-762 -1106)">
                        <path d="M12.562.563a12,12,0,1,0,12,12A12,12,0,0,0,12.562.563Zm0,5.323A2.032,2.032,0,1,1,10.53,7.917,2.032,2.032,0,0,1,12.562,5.885Zm2.71,12.29a.581.581,0,0,1-.581.581H10.433a.581.581,0,0,1-.581-.581V17.014a.581.581,0,0,1,.581-.581h.581v-3.1h-.581a.581.581,0,0,1-.581-.581V11.595a.581.581,0,0,1,.581-.581h3.1a.581.581,0,0,1,.581.581v4.839h.581a.581.581,0,0,1,.581.581Z" transform="translate(761.437 1105.438)" style={{"fill": "#007bff"}}>
                        </path>
                    </g>
                </svg> */}
                <p className="text-warning mb-0 font-12">Note: &nbsp;</p>
                <ul className="p-0 m-0 reportdelivery">
                    {props.showGenderRestrictedMessage ? <li className="small p-0">Services restricted for different gender patients cannot be added in the same cart</li> : <React.Fragment/>}
                    {props.showDuplicateItemMessage && <li className="small p-0">This test is already a part of a package/s in this cart. Kindly remove to proceed.</li>}
                    {props.reportDeliveryTime && <li className="small py-0 pl-0">
                        Reports available in: <strong className="">{props.reportDeliveryTime}</strong> hours after test / sample collection
                    </li> }
                    {Validate().isNotEmpty(props.codallowed) && props.codallowed && <li className="small py-0 pl-0">
                        Cash on Collection is not available for this test
                    </li> }
                </ul>
               
            </div>) : (<p className="mb-0 mt-3">
                <span className="text-secondary font-14">Report Delivery With-in</span>
                <strong className="d-block">{props.reportDeliveryTime} hours after test / sample collection</strong>
            </p>)
        }
        </React.Fragment>
    )
}

export default EstimatedReportDelivery;