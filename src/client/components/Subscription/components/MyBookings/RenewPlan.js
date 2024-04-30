import React from "react"
const RenewPlan=(props)=>{
    return(
        <React.Fragment>
            <div className="position-relative body-height ml-3 w-100">
                <div className="membership-gradient-div">
                    <div>
                        <h6 className="mb-1">Gold Membership</h6>
                        <small>MID: 234568</small>
                        <span className="dot-separator text-dark" style={{"line-height" : "0.5"}}></span>
                        <small>06/2022</small>
                    </div>
                    <button className="btn btn-dark">Change Plan</button>
                </div>
                <div className="row">
                    <div className="col-6 pr-0">
                        <div className="renew-plan-member-select">
                            <div className="each-member">
                                <div className="custom-control custom-checkbox pl-0">
                                    <input type="checkbox" className="custom-control-input" id="member-1" name="member-select"/>
                                    <label className="custom-control-label" for="member-1">Member 1<small className="text-secondary d-block">Member ID: 234568</small></label>
                                </div>
                            </div>
                            <div className="each-member">
                                <div className="custom-control custom-checkbox pl-0">
                                    <input type="checkbox" className="custom-control-input" id="member-2" name="member-select"/>
                                    <label className="custom-control-label" for="member-2">Member 2<small className="text-secondary d-block">Member ID: 234568</small></label>
                                </div>
                            </div>
                            <button className="brand-secondary btn px-5 rounded-pill" type="button" onClick={() => props.history.push("/LabBookings")}>Add a member to plan</button>
                        </div>
                    </div>
                    <div className="col-6">
                        <section className="cart-summary shadow-none border">
                            <div className="header">
                                <p>Cart Summary</p>
                            </div>
                            <div className="body pb-0">
                                <p className="mb-3"><span className="text-secondary">No. Of Members</span><span>02</span></p>
                                <p className="mb-3"><span className="text-secondary">Base Plan Charges</span><span><strong className="rupee">₹</strong> 00.00</span></p>
                                <p className="mb-3"><span className="text-secondary">Additional Charges (2 Members)</span><span><strong className="rupee">₹</strong> 000.00</span></p>
                                <p className="mb-3"><span className="text-secondary">Discount Applied</span><span>- <strong className="rupee">₹</strong> 000.00</span></p>
                                <p className="mb-0"><span className="text-secondary">Payment Type</span><span> COD</span></p>
                            </div>
                            <div className="footer border-top font-lg mb-0"><span className="text-secondary">Total Amount to be Paid</span><span><strong className="rupee">₹</strong> 00.00</span></div>
                        </section>
                    </div>
                </div>
                <div className="border-top footer justify-content-end p-3 position-absolute text-right w-100 mb-0 shadow-none" style={{"bottom" : "0", "left" : "0"}}>
                    <button className="btn brand-secondary mr-3 px-5">Cancel</button>
                    <button className="btn btn-brand px-5">Pay Now</button>
                </div>
            </div>
        </React.Fragment>
    )
}
export default RenewPlan;