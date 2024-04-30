import React from "react"
import Validate from "../../../../../helpers/Validate"

const MDxPoints = (props) => {

    const validate = Validate();
    const cartSummary = props.cartSummary;

    return (
        <React.Fragment>
            {cartSummary && <section className="cart-summary">
                <div className="body">
                    <div className="custom-control custom-checkbox font-weight-normal">
                        <input type="checkbox" className="custom-control-input" id="MdxPoints" onClick={() => props.handleMdxUsageClick()} checked={props.mdxFlag} />
                        <label for="MdxPoints" className="custom-control-label pointer w-100">
                            <div className="d-flex justify-content-between">
                                {validate.isNotEmpty(cartSummary.customerMdxPoints) && parseFloat(cartSummary.customerMdxPoints) > 0 &&
                                    <div>
                                        <p className="font-weight-normal mb-0">MDx Wallet</p>
                                        <p className="font-weight-normal font-12 text-secondary mb-0">Balance Points: 
                                        {(cartSummary.applyMdxPointsPayment && cartSummary.applicableMdxPoints && parseFloat(cartSummary.applicableMdxPoints) > 0) ? parseFloat(cartSummary.customerMdxPoints - cartSummary.applicableMdxPoints).toFixed(2) : parseFloat(cartSummary.customerMdxPoints).toFixed(2)}</p>
                                    </div>
                                }
                                <div>
                                    <p className="font-weight-normal mb-0">Points Used</p>
                                    <p className={props.mdxFlag ? "mb-0 float-right" : "font-weight-normal font-12 text-secondary mb-0 float-right"}>{(cartSummary.applyMdxPointsPayment && cartSummary.applicableMdxPoints && parseFloat(cartSummary.applicableMdxPoints) > 0) ? parseFloat(cartSummary.applicableMdxPoints).toFixed(2) : 0}</p>
                                </div>
                            </div>
                        </label>

                    </div>
                </div>
            </section>}
        </React.Fragment>
    )
}
export default MDxPoints
