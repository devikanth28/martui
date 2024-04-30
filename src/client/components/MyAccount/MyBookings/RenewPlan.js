import React from "react"
const RenewPlan = (props) => {
    return (
        <React.Fragment>
            <div className="position-relative body-height ml-3 w-100 d-none">
                <div className="membership-gradient-div">
                    <div className="w-100">
                        <div className="ph-item p-0 m-0" style= {{'background-color':'unset'}}>
                            <div className="ph-col-12 p-0 m-0">
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-col-6 mb-3"></div>
                                    <div className="ph-col-6 mb-3 empty"></div>
                                    <div className="ph-col-2 mb-0 mr-3"></div>
                                    <div className="ph-col-6 mb-0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-100">
                        <div className="ph-item p-0 m-0" style= {{'background-color':'unset'}}>
                            <div className="ph-col-12 p-0 m-0">
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-picture  mb-0 ml-auto" style= {{'height':'35px','width':'105px'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 pr-0">
                        <div className="renew-plan-member-select">
                            <div className="each-member">
                                <div className="custom-control p-3 ">
                                    <div className="ph-item p-0 m-0">
                                        <div className="ph-col-12 p-0 m-0">
                                            <div className="ph-row p-0 m-0">
                                                <div className="ph-col-8 mb-3 p-0" style= {{'height':'18px'}}></div>
                                                <div className="ph-col-4 mb-3 empty p-0"></div>
                                                <div className="ph-col-12 p-0 m-0"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="each-member mb-0">
                                <div className="custom-control p-3 ">
                                    <div className="ph-item p-0 m-0">
                                        <div className="ph-col-12 p-0 m-0">
                                            <div className="ph-row p-0 m-0">
                                                <div className="ph-col-8 mb-3 p-0" style= {{'height':'18px'}}></div>
                                                <div className="ph-col-4 mb-3 empty p-0"></div>
                                                <div className="ph-col-12 p-0 m-0"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-1">
                                <div className="py-3">
                                    <div className="ph-item p-0 m-0">
                                        <div className="ph-col-12 p-0 m-0">
                                            <div className="ph-row">
                                                <div className="ph-col-12  p-0" style= {{'height':'35px'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <section className="cart-summary shadow-none border">
                            <div className="pb-0">
                                <div className="p-0 ph-item m-0">
                                    <div className="ph-col-12 p-0 m-0 mb-2">
                                        <div className="header py-3">
                                            <div className="ph-row w-100 m-0 p-0">
                                                <div className="ph-col-12 p-0 m-0"></div>
                                            </div>
                                        </div>
                                        <div className="body">
                                            <div className="ph-row w-100 mb-4 m-0 p-0">
                                                <div className="ph-col-12 p-0 m-0"></div>
                                            </div>
                                            <div className="ph-row w-100 mb-4 m-0 p-0">
                                                <div className="ph-col-12 p-0 m-0"></div>
                                            </div>
                                            <div className="ph-row w-100 mb-4 m-0 p-0">
                                                <div className="ph-col-12 p-0 m-0"></div>
                                            </div>
                                            <div className="ph-row w-100 mb-4 m-0 p-0">
                                                <div className="ph-col-12 p-0 m-0"></div>
                                            </div>
                                            <div className="ph-row w-100 mb-0 m-0 p-0">
                                                <div className="ph-col-12 p-0 m-0"></div>
                                            </div>
                                        </div>
                                        <div className="footer py-3 border-top font-lg mb-0">
                                            <div className="ph-row w-100 mb-0 m-0 p-0">
                                                <div className="ph-col-12 p-0 m-0"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <div className="position-relative body-height ml-3 w-100">
                <div className="membership-gradient-div">
                    <div>
                        <h6 className="mb-1">Gold Membership</h6>
                        <small>MID: 234568</small>
                        <span className="dot-separator text-dark" style={{ "line-height": "0.5" }}></span>
                        <small>06/2022</small>
                    </div>
                    <button className="btn btn-dark">Change Plan</button>
                </div>
                <div className="row">
                    <div className="col-6 pr-0">
                        <div className="renew-plan-member-select">
                            <div className="each-member">
                                <div className="custom-control custom-checkbox pl-0">
                                    <input type="checkbox" className="custom-control-input" id="member-1" name="member-select" />
                                    <label className="custom-control-label" for="member-1">Member 1<small className="text-secondary d-block">Member ID: 234568</small></label>
                                </div>
                            </div>
                            <div className="each-member">
                                <div className="custom-control custom-checkbox pl-0">
                                    <input type="checkbox" className="custom-control-input" id="member-2" name="member-select" />
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
                            <div className="body">
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
                <div className="border-top footer justify-content-end p-3 position-absolute text-right w-100 mb-0 shadow-none" style={{ "bottom": "0", "left": "0" }}>
                    <button className="btn brand-secondary mr-3 px-5">Cancel</button>
                    <button className="btn btn-brand px-5">Pay Now</button>
                </div>
            </div>
        </React.Fragment>
    )
}
export default RenewPlan;