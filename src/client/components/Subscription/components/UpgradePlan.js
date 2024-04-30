import React from "react"
const UpgradePlan=(props)=>{
    return(
        <React.Fragment>
            <div className="my-4 py-2">
                <section>
                    <div className="select-membership-container upgrade-plan">
                        <h6 className="title text-center mb-4 pb-3">Select Membership Plans</h6>
                        {/* <h5 className="text-secondary mb-5 pb-3 text-center">Tagline of benefits</h5> */}
                        <div className="d-flex justify-content-center">
                            <div className="each-membership-plan active-card">
                                <h6 className="h2 mb-3">Plan A</h6>
                                <h6 className="price-text mb-4"><span className="rupee">&#x20B9;</span>&nbsp;99.9</h6>
                                <ul className="h5 mb-5 pb-3">
                                    <li className="mb-3"><p className="mb-0 text-truncate">But I must explain to you…</p></li>
                                    <li className="mb-3"><p className="mb-0 text-truncate">But I must explain to you…</p></li>
                                    <li className="mb-3"><p className="mb-0 text-truncate">But I must explain to you…</p></li>
                                    <li className="mb-0"><p className="mb-0 text-truncate">But I must explain to you…</p></li>
                                </ul>
                                <button className="btn details-btn bg-white btn-lg rounded rounded-pill px-5">Learn More</button>
                            </div>
                            <div className="each-membership-plan">
                                <h6 className="h2 mb-3">Plan A</h6>
                                <h6 className="price-text mb-4"><span className="rupee">&#x20B9;</span>&nbsp;99.9</h6>
                                <ul className="h5 mb-5 pb-3">
                                    <li className="mb-3"><p className="mb-0 text-truncate">But I must explain to you…</p></li>
                                    <li className="mb-3"><p className="mb-0 text-truncate">But I must explain to you…</p></li>
                                    <li className="mb-0"><p className="mb-0 text-truncate">But I must explain to you…</p></li>
                                </ul>
                                <button className="btn details-btn rounded rounded-pill px-5">Change Plan</button>
                                <p className="mb-0 mt-3">
                                    <a className="mt-3 text-primary no-underline" href="javascript:void(0)" title="learn more">Learn More</a>
                                </p>
                            </div>
                            <div className="each-membership-plan">
                                <h6 className="h2 mb-3">Plan A</h6>
                                <h6 className="price-text mb-4"><span className="rupee">&#x20B9;</span>&nbsp;99.9</h6>
                                <ul className="h5 mb-5 pb-3">
                                    <li className="mb-3"><p className="mb-0 text-truncate">But I must explain to you…</p></li>
                                    <li className="mb-3"><p className="mb-0 text-truncate">But I must explain to you…</p></li>
                                    <li className="mb-0"><p className="mb-0 text-truncate">But I must explain to you…</p></li>
                                </ul>
                                <button className="btn details-btn rounded rounded-pill px-5">Change Plan</button>
                                <p className="mb-0 mt-3">
                                    <a className="mt-3 text-primary no-underline" href="javascript:void(0)" title="learn more">Learn More</a>
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