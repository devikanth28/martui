import React from "react"
const SubscriptionThankYou = (props) => {
    return (
        <React.Fragment>
            <div className="subs-thankyou-container d-none">
                <div className="thankyou-content">
                    <div className="thankyou-bg">
                        <div className="w-100">
                            <div className="p-0 ph-item m-0" style= {{'background-color':'unset'}}>
                                <div className="ph-col-12 p-0 m-0">
                                    <div className="ph-row p-0 m-0 mb-4">
                                        <div className="ph-picture mx-auto" style= {{'height':'52px','width':'52px'}}></div>
                                    </div>
                                    <div className="ph-row p-0 m-0">
                                        <div className="ph-col-10 mx-auto mb-3" style= {{'height':'28px'}}></div>
                                    </div>
                                    <div className="ph-row p-0 m-0">
                                        <div className="ph-col-12 mb-3" style= {{'height':'28px'}}></div>
                                        <div className="ph-col-2 empty mx-0 mb-4" style= {{'height':'16px'}}></div>
                                        <div className="ph-col-8 mx-0 mb-5" style= {{'height':'16px'}}></div>
                                    </div>
                                    <div className="ph-row p-0 m-0">
                                        <div className="ph-col-4 mb-3 mx-auto" style= {{'height':'16px'}}></div>
                                        <div className="ph-col-10 mx-auto mb-0" style= {{'height':'28px'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="subs-description pb-0">
                        <div className="p-0 ph-item m-0">
                            <div className="ph-col-12 p-0 m-0 mb-2">
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-col-12 m-0 mb-3 p-0" style= {{'height':'24px'}}></div>
                                </div>
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-col-12 m-0 mb-3 p-0" style= {{'height':'24px'}}></div>
                                </div>
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-col-12 m-0 mb-3 p-0" style= {{'height':'24px'}}></div>
                                </div>
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-col-12 m-0 mb-3 p-0" style= {{'height':'24px'}}></div>
                                </div>
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-col-12 m-0 mb-3 p-0" style= {{'height':'24px'}}></div>
                                </div>
                                <hr className="solid mx-n3"/>
                                <div className ="ph-row p-0 m-0">
                                <div className ="ph-col-12 m-0 mb-3 p-0" style= {{'height':'24px'}}></div>
                                </div>
                                <div className ="ph-row mb-0">
                                <div className ="ph-col-12 m-0 mb-0 p-0" style= {{'height':'24px'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 py-3">
                        <div className="p-0 ph-item m-0" style={{'background-color': 'unset'}}>
                            <div className="ph-col-12 p-0 m-0">
                                <div className="ph-row justify-content-center p-0 jum-0">
                                    <div className="ph-col-4 mb-0 mr-3 p-0" style={{'height': '35px'}}></div>
                                    <div className="ph-col-4  m-0 p-0" style={{'height': '35px'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="subs-thankyou-container">
                <div className="thankyou-content">
                    <div className="thankyou-bg">
                        <span className="icon-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="33.257" height="21.759" viewBox="0 0 33.257 21.759">
                                <path fill="none" stroke="#08ce73" stroke-linecap="round" stroke-linejoin="round" stroke-width="3px" d="M3461.25,769.73l8.881,10.548,20.145-18.141" transform="translate(-3459.137 -760.019)" />
                            </svg>
                        </span>
                        <h2 className="mb-3 text-center text-white">Thank You!</h2>
                        <p className="mb-4 text-center text-white">Membership of Gold Plan is successfully placed</p>
                        <p className="text-center text-white mb-0">Order ID</p>
                        <h6 className="h4 text-white mb-0">OTGRW18000009025</h6>
                    </div>
                    <div className="subs-description pb-0">
                        <div className="mb-2">
                            <p className="d-flex justify-content-between">
                                <span>No.of Members</span>
                                <span className="font-weight-bold">3</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span>Base Plan Charges</span>
                                <span className="font-weight-bold">&#x20B9; 00.00</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span>Additional Charges (2 Members)</span>
                                <span className="font-weight-bold">&#x20B9; 00.00</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span>Discount Applied</span>
                                <span className="font-weight-bold">- &#x20B9; 00.00</span>
                            </p>
                            {/* <p className="d-flex justify-content-between">
                                <span>Base Plan Charges</span>
                                <span className="font-weight-bold">&#x20B9; 00.00</span>
                            </p> */}
                            <p className="d-flex justify-content-between">
                                <span>Payment Type</span>
                                <span className="font-weight-bold">COD</span>
                            </p>
                        </div>
                        <hr className="solid mx-n3" />
                        <p className="d-flex justify-content-between">
                            <span>Amount to be paid</span>
                            <span className="font-weight-bold">&#x20B9; 00.00</span>
                        </p>
                        <p className="d-flex justify-content-between saving-text">
                            <span>Total Savings</span>
                            <span className="font-weight-bold">&#x20B9; 00.00</span>
                        </p>
                    </div>
                    <div className="d-flex justify-content-center bg-white py-3 w-100">
                        <button className="btn px-5 brand-secondary mr-3" onClick={() => props.history.push("/myBookings")}>Subscriptions</button>
                        <button className="btn px-5 btn-brand">Continue Shopping</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default SubscriptionThankYou