import React from 'react';

const PaymentGhostImage = (props)=>{
    return (
    <React.Fragment>
        {props.isDoctorReviewPage &&
            <section>
                <div class="header d-block mb-0">
                    <div class="ph-item m-0 p-0 border-0">
                        <div class="ph-col-12 p-0">
                            <div class="ph-row p-0 m-3">
                                <div class="ph-col-4 mb-0"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-3 payment-options">
                    <ul>
                        <li>
                            <div class="select-payment-container">
                                <div class="ph-item mb-0">
                                    <div>
                                        <div class="ph-row">
                                            <div class="mb-3 ph-col-4"></div>
                                            <div class="ph-col-8 empty"></div>
                                            <div class="ph-col-4 "></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="select-payment-container">
                                <div class="ph-item mb-0">
                                    <div>
                                        <div class="ph-row">
                                            <div class="mb-3 ph-col-4"></div>
                                            <div class="ph-col-8 empty"></div>
                                            <div class="ph-col-4 "></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="select-payment-container">
                                <div class="ph-item mb-0">
                                    <div>
                                        <div class="ph-row">
                                            <div class="mb-3 ph-col-4"></div>
                                            <div class="ph-col-8 empty"></div>
                                            <div class="ph-col-4 "></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="select-payment-container">
                                <div class="ph-item mb-0">
                                    <div>
                                        <div class="ph-row">
                                            <div class="mb-3 ph-col-4"></div>
                                            <div class="ph-col-8 empty"></div>
                                            <div class="ph-col-4 "></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="select-payment-container">
                                <div class="ph-item mb-0">
                                    <div>
                                        <div class="ph-row">
                                            <div class="mb-3 ph-col-4"></div>
                                            <div class="ph-col-8 empty"></div>
                                            <div class="ph-col-4 "></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="select-payment-container">
                                <div class="ph-item mb-0">
                                    <div>
                                        <div class="ph-row">
                                            <div class="mb-3 ph-col-4"></div>
                                            <div class="ph-col-8 empty"></div>
                                            <div class="ph-col-4 "></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        }
        {(props.paymentLoader || props.planDetailsLoader) &&
        <div className="col-8 pl-0 pr-2">
            <section>
                <div className="header d-block mb-0">
                    <div className="ph-item m-0 p-0 border-0">
                        <div className="ph-col-12 p-0">
                            <div className="ph-row p-0 m-3">
                                <div className="ph-col-4 mb-0"></div>
                                <div className="ph-col-6 empty mb-0"></div>
                                <div className="ph-col-2 mb-0"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="payment-options">
                    <div className="ph-item mb-0 border-0">
                        <div className="ph-row">
                            <div className="ph-col-12 "></div>
                        </div>
                    </div>
                    <ul>
                    <li>
                        <div className="p-1 rounded-xl select-payment-container">
                            <div className="ph-item mb-0">
                                <div>
                                <div className="ph-row">
                                    <div className="ph-col-4"></div>
                                    <div className="ph-col-6 empty"></div>
                                    <div className="ph-col-2"></div>
                                    <div className="ph-col-6"></div>
                                    <div className="ph-col-6 empty"></div>
                                    <div className="ph-col-12 "></div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="p-1 rounded-xl select-payment-container">
                            <div className="ph-item mb-0">
                                <div>
                                <div className="ph-row">
                                    <div className="ph-col-4"></div>
                                    <div className="ph-col-6 empty"></div>
                                    <div className="ph-col-2"></div>
                                    <div className="ph-col-6"></div>
                                    <div className="ph-col-6 empty"></div>
                                    <div className="ph-col-12 "></div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="p-1 rounded-xl select-payment-container">
                            <div className="ph-item mb-0">
                                <div>
                                <div className="ph-row">
                                    <div className="ph-col-4"></div>
                                    <div className="ph-col-6 empty"></div>
                                    <div className="ph-col-2"></div>
                                    <div className="ph-col-6"></div>
                                    <div className="ph-col-6 empty"></div>
                                    <div className="ph-col-12 "></div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="p-1 rounded-xl select-payment-container">
                            <div className="ph-item mb-0">
                                <div>
                                <div className="ph-row">
                                    <div className="ph-col-4"></div>
                                    <div className="ph-col-6 empty"></div>
                                    <div className="ph-col-2"></div>
                                    <div className="ph-col-6"></div>
                                    <div className="ph-col-6 empty"></div>
                                    <div className="ph-col-12 "></div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="p-1 rounded-xl select-payment-container">
                            <div className="ph-item mb-0">
                                <div>
                                <div className="ph-row">
                                    <div className="ph-col-4"></div>
                                    <div className="ph-col-6 empty"></div>
                                    <div className="ph-col-2"></div>
                                    <div className="ph-col-6"></div>
                                    <div className="ph-col-6 empty"></div>
                                    <div className="ph-col-12 "></div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="p-1 rounded-xl select-payment-container">
                            <div className="ph-item mb-0">
                                <div>
                                <div className="ph-row">
                                    <div className="ph-col-4"></div>
                                    <div className="ph-col-6 empty"></div>
                                    <div className="ph-col-2"></div>
                                    <div className="ph-col-6"></div>
                                    <div className="ph-col-6 empty"></div>
                                    <div className="ph-col-12 "></div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    </ul>
                </div>
            </section>
        </div>}
        {(props.orderReviewLoader || props.planDetailsLoader) &&
        <div className="col-4 pl-2 pr-0">
            <section>
                <div className="header d-block mb-0">
                    <div className="ph-item m-0 p-0 border-0">
                        <div className="ph-col-12 p-0">
                        <div className="ph-row p-0 m-3">
                            <div className="ph-col-4 mb-0"></div>
                            <div className="ph-col-6 empty mb-0"></div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="ph-item mb-0">
                    <div>
                        <div className="ph-row">
                        <div className="ph-col-4"></div>
                        <div className="ph-col-6 empty"></div>
                        <div className="ph-col-6"></div>
                        <div className="ph-col-6 empty"></div>
                        <div className="ph-col-12 "></div>
                        </div>
                    </div>
                </div>
                <div className="ph-item mb-0">
                    <div>
                        <div className="ph-row">
                        <div className="ph-col-4"></div>
                        <div className="ph-col-6 empty"></div>
                        <div className="ph-col-6"></div>
                        <div className="ph-col-6 empty"></div>
                        <div className="ph-col-12 "></div>
                        </div>
                    </div>
                </div>
                <div className="ph-item rounded-xl">
                    <div>
                        <div className="ph-row">
                        <div className="ph-col-4"></div>
                        <div className="ph-col-6 empty"></div>
                        <div className="ph-col-6"></div>
                        <div className="ph-col-6 empty"></div>
                        <div className="ph-col-12 "></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>}
    </React.Fragment>
    )
}

export default PaymentGhostImage;
