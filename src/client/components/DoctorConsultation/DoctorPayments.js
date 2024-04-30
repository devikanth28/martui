import React from 'react';
import DoctorReviewDetail from "./DoctorReviewDetail"
import DoctorCartSummary from "./DoctorCartSummary"

function DoctorPayments(props) {
    return (
        <React.Fragment>
            <div className="container-lg container-fluid">
                <div className="row px-sm-3">
                    <div className="col-8 pl-0 pr-2">
                        <DoctorReviewDetail/>
                    </div>
                    <div className="col-4 pl-2 pr-0">
                        <section className="select-offers border-dotted-green">
                            <div className="header">
                                <p>Apply Coupon</p>
                            </div>
                            <div className="px-3 py-2">
                                <div className="input-group mb-2">
                                    <input type="text" className="form-control " placeholder="Enter Coupon code" autocomplete="off" aria-label="Enter Coupon code" aria-describedby="button-apply"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-dark" type="button">Apply</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <DoctorCartSummary/>
                    </div>
                </div>
            </div>
            <footer className="footer fixed-bottom mt-auto py-2">
                <div className="container-lg container-fluid  px-0 px-sm-3">
                    <div className="row align-items-center no-gutters">
                    	<div className="col-12 text-right"><button role="button" className="btn brand-secondary px-5">Back</button><button role="button" className="btn btn-outline-brand px-5 ml-3">Add More Tests</button></div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    );
}

export default DoctorPayments;