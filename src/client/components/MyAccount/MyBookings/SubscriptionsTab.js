import React, {useState} from 'react';
import RenewPlan from './RenewPlan';
import SubscriptionTransactionHistory from './SubscriptionTransactionHistory';
import UserSubscriptionCard from './UserSubscriptionCard';
const SubscriptionsTab = (props) => {

    
    return (
        <React.Fragment>
            <div>
                <div className="d-flex p-3">
                    <div className="my-bookings-tabs">
                        <div className="card" style={{width: '180px'}}>
                            <div className="card-body">
                                <a href="javascript:void(0)" title="Payments" onClick={()=>{props.toggleUserTab("Payments")}}>
                                    <div className={props.showUserContent == "Payments" ?  "active-tab d-flex mb-3" :  "d-flex mb-3" }>
                                        <span className="mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <g transform="translate(-303 -148)">
                                                <circle className="a" fill="#d6d8d9" opacity="0.5" cx="12" cy="12" r="12" transform="translate(303 148)"/>
                                                <g transform="translate(1252.441 -802.525)">
                                                    <path className="b" fill="#343a40" d="M-930.546,959.165l-2.982-5.021a1.089,1.089,0,0,0-1.516-.472L-943,958.407a1.025,1.025,0,0,0-.421,1.3c-.691.438-1.82,4.751-1.82,4.751l-.977.809a.644.644,0,0,0-.169.758l1.719,3.2a.6.6,0,0,0,.758.27,9.53,9.53,0,0,1,2.241-.691,3.111,3.111,0,0,0,1.516-.859c.4-.489,4.5-5.526,4.5-5.526a1.132,1.132,0,0,0-.236-1.634,1.176,1.176,0,0,0-1.55.236l-1.938,2.376a.663.663,0,0,1-1.1-.084l-1.011-1.7,8.509-5.071,1.719,2.881a.35.35,0,0,1-.118.455l-3.252,1.938v.034a1.1,1.1,0,0,1-.253.708l-1.988,2.443.051.084a.767.767,0,0,0,1.045.286l.118-.067a.906.906,0,0,0,.421-1.028.655.655,0,0,0,.253.034.816.816,0,0,0,.438-.118.9.9,0,0,0,.337-1.213h0a.7.7,0,0,0,.27.034.816.816,0,0,0,.438-.118.877.877,0,0,0,.371-1.129l2.14-1.264A1.024,1.024,0,0,0-930.546,959.165Zm-11.744,1.078-.455-.758a.334.334,0,0,1,.118-.455l7.953-4.734a.351.351,0,0,1,.455.118l.455.758Z" transform="translate(1 1)"/>
                                                    <path className="b" fill="#343a40" d="M-878.434,982.8l1.687-1a.366.366,0,0,0,.133-.493l-.569-.967a.366.366,0,0,0-.493-.133l-1.687,1a.366.366,0,0,0-.133.493l.569.967A.366.366,0,0,0-878.434,982.8Z" transform="translate(-54.219 -21.585)"/>
                                                </g>
                                            </g>
                                        </svg>
                                        </span>
                                        <p className="mb-0">Payments</p>
                                    </div>
                                </a>
                                <a href="javascript:void(0)" title="Renewal" onClick={()=>{props.toggleUserTab("Renewal")}}>
                                    <div className={props.showUserContent == "Renewal" ?  "active-tab d-flex" :  "d-flex" }>
                                        <span className="mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <g transform="translate(-303 -148)">
                                                <circle className="a" fill="#d6d8d9" opacity="0.5" cx="12" cy="12" r="12" transform="translate(303 148)"/>
                                                <g transform="translate(293.3 148.5)">
                                                    <path className="b" fill="#343a40" d="M27.1,30.7H24.932a1.1,1.1,0,0,1-.14.151l-.473.473.14.7h2.032v6.284H16.926V32.025h2.032l.14-.7-.49-.473-.14-.151H16.313a.647.647,0,0,0-.613.662v8.593a.647.647,0,0,0,.613.662H20.5V41.81h-.526a1.185,1.185,0,0,0-1.139,1.23h0a.32.32,0,0,0,.3.322h5.133a.32.32,0,0,0,.3-.322,1.185,1.185,0,0,0-1.139-1.23H22.9V40.618h4.187a.635.635,0,0,0,.613-.662V31.344A.6.6,0,0,0,27.1,30.7Zm-5.4,9.2a.456.456,0,1,1,.42-.454A.444.444,0,0,1,21.708,39.9Z" transform="translate(0 -22.862)"/>
                                                    <path className="b" fill="#343a40" d="M36.559,17.158l.928.909a.225.225,0,0,1,.053.151l-.245,1.325a.283.283,0,0,0,.4.322l1.086-.662a.179.179,0,0,1,.14,0l1.086.662a.279.279,0,0,0,.4-.322l-.245-1.325a.132.132,0,0,1,.053-.151l.928-.909a.3.3,0,0,0-.158-.511L39.712,16.5c-.053,0-.088-.038-.123-.095l-.526-1.23a.262.262,0,0,0-.49,0l-.526,1.23a.133.133,0,0,1-.123.095l-1.244.151A.3.3,0,0,0,36.559,17.158Z" transform="translate(-17.128 -10.134)"/>
                                                    <path className="b" fill="#343a40"  d="M48.268,4.147a.374.374,0,0,0,.368-.4V2.9a.369.369,0,1,0-.736,0v.852A.386.386,0,0,0,48.268,4.147Z" transform="translate(-26.559)"/>
                                                    <path className="b" fill="#343a40" d="M57.8,6.7a.479.479,0,0,0,.158.038.359.359,0,0,0,.333-.227l.35-.757a.407.407,0,0,0-.175-.53.352.352,0,0,0-.49.189l-.35.757A.4.4,0,0,0,57.8,6.7Z" transform="translate(-34.55 -2.179)"/>
                                                    <path className="b" fill="#343a40" d="M36.589,6.447a.391.391,0,0,0,.333.227.479.479,0,0,0,.158-.038.424.424,0,0,0,.175-.53L36.9,5.33a.366.366,0,0,0-.49-.189.424.424,0,0,0-.175.53Z" transform="translate(-16.912 -2.111)"/>
                                                    <path className="b" fill="#343a40" d="M43.684,47.052h.543a.2.2,0,0,0,.193-.208V44.781h.6a.227.227,0,0,0,.175-.36l-1.069-1.647a.2.2,0,0,0-.35,0L42.7,44.4a.227.227,0,0,0,.175.36h.6v2.063A.211.211,0,0,0,43.684,47.052Z" transform="translate(-22.238 -32.571)"/>
                                                </g>
                                            </g>
                                        </svg>
                                        </span>
                                        <p className="mb-0">Renewal</p>
                                    </div>
                                </a>
                                {/* <a href="javascript:void(0)" title="Upgrade">
                                    <div className={showUserContent == "Upgrade" ?  "active-tab d-flex" :  "d-flex" }>
                                        <span className="mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <g transform="translate(-303 -148)">
                                                    <circle className="a" fill="#d6d8d9" opacity="0.5" cx="12" cy="12" r="12" transform="translate(303 148)"/>
                                                    <g transform="translate(1252.441 -802.525)">
                                                        <path className="b" fill="#343a40" d="M-930.546,959.165l-2.982-5.021a1.089,1.089,0,0,0-1.516-.472L-943,958.407a1.025,1.025,0,0,0-.421,1.3c-.691.438-1.82,4.751-1.82,4.751l-.977.809a.644.644,0,0,0-.169.758l1.719,3.2a.6.6,0,0,0,.758.27,9.53,9.53,0,0,1,2.241-.691,3.111,3.111,0,0,0,1.516-.859c.4-.489,4.5-5.526,4.5-5.526a1.132,1.132,0,0,0-.236-1.634,1.176,1.176,0,0,0-1.55.236l-1.938,2.376a.663.663,0,0,1-1.1-.084l-1.011-1.7,8.509-5.071,1.719,2.881a.35.35,0,0,1-.118.455l-3.252,1.938v.034a1.1,1.1,0,0,1-.253.708l-1.988,2.443.051.084a.767.767,0,0,0,1.045.286l.118-.067a.906.906,0,0,0,.421-1.028.655.655,0,0,0,.253.034.816.816,0,0,0,.438-.118.9.9,0,0,0,.337-1.213h0a.7.7,0,0,0,.27.034.816.816,0,0,0,.438-.118.877.877,0,0,0,.371-1.129l2.14-1.264A1.024,1.024,0,0,0-930.546,959.165Zm-11.744,1.078-.455-.758a.334.334,0,0,1,.118-.455l7.953-4.734a.351.351,0,0,1,.455.118l.455.758Z" transform="translate(1 1)"/>
                                                        <path className="b" fill="#343a40" d="M-878.434,982.8l1.687-1a.366.366,0,0,0,.133-.493l-.569-.967a.366.366,0,0,0-.493-.133l-1.687,1a.366.366,0,0,0-.133.493l.569.967A.366.366,0,0,0-878.434,982.8Z" transform="translate(-54.219 -21.585)"/>
                                                    </g>
                                                </g>
                                            </svg>
                                        </span>
                                        <p className="mb-0">Upgrade</p>
                                    </div>
                                </a> */}
                            </div>
                        </div>
                </div>
                    {props.showUserContent == "" && <UserSubscriptionCard history={props.history}/>}
                    {props.showUserContent == "Payments" && <SubscriptionTransactionHistory/>}
                    {props.showUserContent == "Renewal" && <RenewPlan history={props.history}/>}
                </div>
            </div>
        </React.Fragment>
    )
}

export default SubscriptionsTab;