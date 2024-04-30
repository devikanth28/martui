import React from "react"
import Validate from '../../../../../helpers/Validate';
import EstimatedReportDelivery from "../../Common/EstimatedReportDelivery";
const SelectedTests=(props)=>{
    const validate = Validate();
    const testsInfo = validate.isNotEmpty(props.homeTests)?props.homeTests:props.walkInTests;
    console.log(testsInfo)
    const getTotalPrice = () => {
        let totalPrice = 0;
        testsInfo.map(each=>{
            totalPrice = totalPrice + parseFloat(each.price);
        })
        return totalPrice;
    }

    return(
        <React.Fragment>
            {validate.isNotEmpty(testsInfo) && 
                <section>
                            <div className="header">
                                <p>Selected {testsInfo.length} Tests</p>
                            </div>
                            <ul className="product-listview list-group list-group-flush">
                                {testsInfo.map((each,index)=>{
                                    return(
                                        <React.Fragment key={index}>
                                            {index > 0}
                                                <li className="list-group-item p-3">
                                                <div className="col">
                                                    <h6 className="m-0">{each.testName}</h6>
                                                    {
                                                    (
                                                        (validate.isNotEmpty(each.reportDeliveryTime) && each.reportDeliveryTime >0)
                                                        || (!each.codAllowed) ) && <EstimatedReportDelivery isCheckoutPage={true} reportDeliveryTime={each.reportDeliveryTime} codallowed={!each.codAllowed ? !each.codAllowed : undefined} />
                                                    }
                                                </div>
                                                    <div className="col-4 text-right p-0">
                                                        <p className="font-weight-bold m-0">
                                                        {parseFloat(each.price) < parseFloat(each.mrp) &&
                                                                <small class="mr-2 text-secondary">
                                                                    <small>₹</small><del>{parseFloat(each.mrp).toFixed(2)}</del>
                                                                </small>
                                                        }
                                                        <span className="ml-2"><strong className="rupee">₹</strong>{parseFloat(each.price).toFixed(2)}</span>
                                                        </p>
                                                    </div>
                                                </li>
                                        </React.Fragment>
                                    )
                                })}
                                 <li className="order-details-summary list-group-item">
                                    <div className="col">
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-xl-5 text-left font-weight-bold pr-0">
                                        <p><span>Total Price</span><span className="float-right"><strong className="rupee">₹</strong>{getTotalPrice().toFixed(2)} </span></p>
                                    </div>
                                </li>
                            </ul>
                </section>
                }
        </React.Fragment>
    )
}
export default SelectedTests