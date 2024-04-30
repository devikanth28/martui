import React from "react";

const OrderCancellatioReasonConfiguration = () => {
    return(
        <>
            <section className="container admin-screen">
                <div className="p-3">
                <div>
                    <h1 className="h5">Order Cancellation Reason Configuration</h1>
                </div>
                <div className="p-4 mt-3">
                    <form>
                        <div className="d-flex justify-content-center align-items-baseline">
                            <div>
                                <sup className="text-danger">*</sup>Reason  
                            </div>
                            <div className="w-50 ml-2">
                                <div className="each-group has-float-label form-group-error">
                                    <input className="form-control w-100" id="reason" name="reason" placeholder=" " type="text"/>
                                    <label htmlfor="reason">
                                        Enter Order Cancellation Reason
                                    </label>
                                    <p className="d-none">plz Enter Order Cancellation Reson</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg">Clear</button>
                            <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg">Save</button>
                        </div>
                    </form>
                </div>
                </div>
            </section>
        </>
    );
};

export default OrderCancellatioReasonConfiguration;