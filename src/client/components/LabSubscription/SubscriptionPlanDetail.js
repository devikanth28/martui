import React from "react"
const SubscriptionPlanDetail =(props)=>{
    return(
        <React.Fragment>

            {/* Ghost Images start */}
            
            <div className="my-4 py-2 d-none">
                <section className="p-48">
                    <div className="plan-details-container">
                        <div className="ph-row" style={{"width":"80%"}}>
                            <div className="ph-col-4 ph-item mb-3"></div>
                        </div>
                        <div className="ph-row">
                            <div className="ph-col-4 ph-item mb-3"></div>
                        </div>
                        <div className="ph-row">
                            <div className="ph-col-2 mb-4 pb-2"></div>
                        </div>
                        <div className="ph-row">
                            <div className="ph-col-12 ph-item mb-4 pb-2"></div>
                        </div>
                        <div className="row my-4 py-3">
                        <div className="col-6">
                        <div className="ph-row">
                            <div className="ph-col-6 mb-4 pb-2"></div>
                        </div>
                        </div>
                        <div className="col-6">
                        <div className="ph-row">
                            <div className="ph-col-6 mb-4 pb-2"></div>
                        </div>
                        </div>
                        <div className="col-6">
                        <div className="ph-row">
                            <div className="ph-col-6 mb-4 pb-2"></div>
                        </div>
                        </div>
                        <div className="col-6">
                        <div className="ph-row">
                            <div className="ph-col-6 mb-4 pb-2"></div>
                        </div>
                        </div>
                        <div className="col-6">
                        <div className="ph-row">
                            <div className="ph-col-6 mb-4 pb-2"></div>
                        </div>
                        </div>
                        <div className="col-6">
                        <div className="ph-row">
                            <div className="ph-col-6 mb-4 pb-2"></div>
                        </div>
                        </div>
                        <div className="col-6">
                        <div className="ph-row">
                            <div className="ph-col-6 mb-4 pb-2"></div>
                        </div>
                        </div>
                        </div>
                        <div class="ph-row" style={{"width":"60%"}}>
                            <div class="ph-col-2 ph-item"></div></div>
                        </div>
                </section>
            </div>

            {/* Ghost Images end */}


            <div className="my-4 py-2">
                <section className="p-48">
                    <div className="plan-details-container">
                        <h6 className="heading-text mb-3">Plan Gold Benefits</h6>
                        {/* <h5 className="text-secondary mb-4 pb-2">Tagline of benefits</h5> */}
                        <h6 className="price-text mb-3"><span className="rupee h1 m-0 font-weight-bold">&#x20B9;</span>&nbsp;399.99
                            <span className="ml-2">
                                <span className="text-secondary rupee h4 m-0 font-weight-bold">&#x20B9;</span>&nbsp;
                                <del className="h2 text-secondary">12345.00</del>
                            </span>
                            <span className="h4 font-weight-normal"> / Year</span>
                        </h6>
                        <p className="font-weight-bold mb-4 pb-2">But I must explain to you how all this</p>
                        <div className="lab-subscription-detail">
                            <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is…</p>
                            <ul>
                                <li><p>Upto x% off on Pathology tests</p></li>
                                <li><p>Upto x% off on Radiology tests</p></li>
                                <li><p>Upto x% off on doctor consultations</p></li>
                                <li><p>Upto x% off on Tele consultations</p></li>
                                <li><p>Add upto x members in the plan</p></li>
                                <li><p>Add a member at Rs xxx only</p></li>
                                <li><p>Get surprise coupon on purchasing the plan</p></li>
                            </ul>
                        </div>
                        <button className="btn btn-brand shadow btn-lg px-5" onClick={() => props.history.push("/LabSubscriptionCorporateRegister")}>Buy Now</button>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}
export default SubscriptionPlanDetail