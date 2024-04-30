import React from "react"
const UpgradePlan = (props) => {
    return (
        <React.Fragment>
            <div className="my-4 d-none py-2">
                <section>
                   <div className="select-membership-container upgrade-plan">
                        <div className="ph-item p-0 m-0" style={{'background-color': 'unset'}}>
                                <div className="ph-col-12 p-0 mb-5">
                                        <div className="ph-row mb-5 pb-3" style={{'height': '73px'}}>
                                                <div className="ph-col-12 p-0 m-0" style={{'height': '73px'}}></div>
                                        </div>
                                <div className="d-flex justify-content-center">
                                    <div className="each-membership-plan active-card">
                                            <div className="ph-row m-0 p-0">
                                                <div className="ph-col-12 p-0 mb-3" style={{'height': '38px'}}></div>
                                            </div>
                                            <div className="ph-row m-0 p-0">
                                                <div className="ph-col-12 p-0 mb-5" style={{'height': '100px'}}></div>
                                            </div>
                                            <div className="ph-row m-0 p-0">
                                                 <div className="ph-col-12 p-0 mb-5 pb-3" style={{'height': '256px'}}></div>
                                            </div>
                                            <div className="ph-row m-0 p-0">
                                                <div className="ph-col-8 rounded ml-auto mr-auto mb-0 rounded-pill p-0" style={{'height': '48px'}}></div>
                                            </div>  
                                    </div>
                                    <div className="each-membership-plan">
                                            <div className="ph-row m-0 p-0">
                                                <div className="ph-col-12 p-0 mb-3" style={{'height': '38px'}}></div>
                                            </div>
                                            <div className="ph-row m-0 p-0">
                                                <div className="ph-col-12 p-0 mb-5" style={{'height': '100px'}}></div>
                                            </div>
                                            <div className="ph-row m-0 p-0">
                                                <div className="ph-col-12 p-0 mb-5 pb-3" style={{'height': '192px'}}></div>
                                            </div>
                                            <div className="ph-row m-0 p-0">
                                                <div className="ph-col-8 rounded ml-auto mr-auto mb-0 rounded-pill p-0" style={{'height': '48px'}}></div>
                                            </div> 
                                    </div>
                                    <div className="each-membership-plan">
                                            <div className="ph-row m-0 p-0">
                                                <div className="ph-col-12 p-0 mb-3" style={{'height': '38px'}}></div>
                                            </div>
                                            <div className="ph-row m-0 p-0">
                                                <div className="ph-col-12 p-0 mb-5" style={{'height': '100px'}}></div>
                                            </div>
                                            <div className="ph-row m-0 p-0">
                                                <div className="ph-col-12 p-0 mb-5 pb-3" style={{'height': '192px'}}></div>
                                            </div>
                                            <div className="ph-row m-0 p-0">
                                                <div className="ph-col-8 rounded ml-auto mr-auto mb-0 rounded-pill p-0" style={{'height': '48px'}}></div>
                                            </div> 
                                    </div>
                                </div>
                                    </div>
                     </div>
                    </div>
                </section>
            </div>




            <div className="my-4 py-2">
                <section>
                    <div className="select-membership-container upgrade-plan">
                        <h6 className="title text-center mb-5 pb-3">Select Membership Plans</h6>
                        {/* <h5 className="text-secondary mb-5 pb-3 text-center">Tagline of benefits</h5> */}
                        <div className="d-flex justify-content-center">
                            <div className="each-membership-plan active-card">
                                <h6 className="h2 mb-3 text-white">Plan A</h6>
                                <h6 className="price-text mb-4">
                                    <span className="rupee mr-1">&#x20B9;</span>999.99
                                    <span className="striked-text">
                                        <span className="rupee h5 mr-1" style={{ "color": "unset" }}>&#x20B9;</span>
                                        <del className="h4" style={{ "color": "unset" }}>12345.00</del>
                                    </span>
                                </h6>
                                <ul className="mb-5 pb-3">
                                    <li className="mb-3"><p className="mb-0 truncate-line-2">But I must explain to y But I must explain to you… But I must explain to you… But I must explain to you…</p></li>
                                    <li className="mb-3"><p className="mb-0 truncate-line-2">But I must explain to y But I must explain to you… But I must explain to you… But I must explain to you…</p></li>
                                    <li className="mb-3"><p className="mb-0 truncate-line-2">But I must explain to y But I must explain to you… But I must explain to you… But I must explain to you…</p></li>
                                    <li className="mb-0"><p className="mb-0 truncate-line-2">But I must explain to y But I must explain to you… But I must explain to you… But I must explain to you…</p></li>
                                </ul>
                                <button className="btn details-btn bg-white btn-lg rounded rounded-pill px-5" onClick={() => props.history.push("/subscriptionPlan")}>Learn More</button>
                            </div>
                            <div className="each-membership-plan">
                                <h6 className="h2 mb-3">Plan A</h6>
                                <h6 className="price-text mb-4">
                                    <span className="rupee mr-1">&#x20B9;</span>999.99
                                    <span className="striked-text">
                                        <span className="rupee h5 mr-1" style={{ "color": "unset" }}>&#x20B9;</span>
                                        <del className="h4" style={{ "color": "unset" }}>12345.00</del>
                                    </span>
                                </h6>
                                <ul className="mb-5 pb-3">
                                    <li className="mb-3"><p className="mb-0 truncate-line-2">But I must explain to y But I must explain to you… But I must explain to you… But I must explain to you…</p></li>
                                    <li className="mb-3"><p className="mb-0 truncate-line-2">But I must explain to y But I must explain to you… But I must explain to you… But I must explain to you…</p></li>
                                    <li className="mb-0"><p className="mb-0 truncate-line-2">But I must explain to y But I must explain to you… But I must explain to you… But I must explain to you…</p></li>
                                </ul>
                                <button className="btn details-btn rounded rounded-pill px-5" onClick={() => props.history.push("/subscriptionPlan")}>Change Plan</button>
                                <p className="mb-0 mt-3">
                                    <a className="mt-3 text-primary no-underline" href="javascript:void(0)" title="learn more" onClick={() => props.history.push("/subscriptionPlan")}>Learn More</a>
                                </p>
                            </div>
                            <div className="each-membership-plan">
                                <h6 className="h2 mb-3">Plan A</h6>
                                <h6 className="price-text mb-4">
                                    <span className="rupee mr-1">&#x20B9;</span>999.99
                                    <span className="striked-text">
                                        <span className="rupee h5 mr-1" style={{ "color": "unset" }}>&#x20B9;</span>
                                        <del className="h3" style={{ "color": "unset" }}>12345.00</del>
                                    </span>
                                </h6>
                                <ul className="mb-5 pb-3">
                                    <li className="mb-3"><p className="mb-0 truncate-line-2">But I must explain to y But I must explain to you… But I must explain to you… But I must explain to you…</p></li>
                                    <li className="mb-3"><p className="mb-0 truncate-line-2">But I must explain to y But I must explain to you… But I must explain to you… But I must explain to you…</p></li>
                                    <li className="mb-0"><p className="mb-0 truncate-line-2">But I must explain to y But I must explain to you… But I must explain to you… But I must explain to you…</p></li>
                                </ul>
                                <button className="btn details-btn rounded rounded-pill px-5" onClick={() => props.history.push("/subscriptionPlan")}>Change Plan</button>
                                <p className="mb-0 mt-3">
                                    <a className="mt-3 text-primary no-underline" href="javascript:void(0)" title="learn more" onClick={() => props.history.push("/subscriptionPlan")}>Learn More</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}
export default UpgradePlan