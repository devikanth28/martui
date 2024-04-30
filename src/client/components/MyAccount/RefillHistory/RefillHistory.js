import React, { useState, useEffect } from 'react';
import MyAccountService from '../../../services/MyAccountService';
import Validate from '../../../helpers/Validate';
import Alert from '../../Common/Alert';
import RefillHistoryGhostImage from './RefillHistoryGhostImage';
import moment from "moment";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OrderRefillBG from '../../../images/common/order-refill-cssbg.svg';
import CONFIG from '../../../constants/ServerConfig';
import NoRefilImage from '../../../images/common/no-refill.svg';


const RefillHistory = (props) => {

    const  myAccountService = MyAccountService();
    const validate = Validate();
    const [historyLoader, setHistoryLoader] = useState(false);
    const [refillHistory, setRefillHistory] = useState({});
    const [emptyRefillHistory, setEmptyRefillHistory] = useState(false);
    const [alertData, setAlertData] = useState({ message: "", type: "" });


    useEffect(() => {
        getRefillHistory();
      }, []);
    
    const getRefillHistory = ()=> {
        setHistoryLoader(true);
        myAccountService.getRefillHistory().then((response)=>{
            setHistoryLoader(false);
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
                if(validate.isNotEmpty(response.dataObject)){
                    setRefillHistory(response.dataObject);
                }else{
                    setEmptyRefillHistory(true);
                }
            }else {
                setAlertData({message:response.message, type: ""});
            }
        },(err)=>{
            setHistoryLoader(false);
            console.log(err);
        })

    }

    const closeAlertMessage = () => {
        setAlertData({message:"", type:""});
    }

    const getRefillDatails = (refillId) =>{
        /* let headerList = refillHistory.refillHeaders;
        const result = headerList.filter(header => header.refillId == refillId); */
        props.history.push('/refillInfo/'+refillId);
    }

    const redirectToHome = ()=>{
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    if( historyLoader){
        return(
            <React.Fragment>
                <Tabs className="bg-white shadow-sm">
                    <div className="header p-0 mb-0">
                        <TabList className="nav nav-pills">
                            <Tab className="nav-item border-0">
                                <span className="nav-link py-3 font-weight-bold active">Refill History</span>
                            </Tab>
                            <Tab className="nav-item border-0">
                                <span className="nav-link py-3 font-weight-bold">How it works</span>
                            </Tab>
                        </TabList>
                    </div>
                    <TabPanel>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div className="body px-3 pb-3">
                                    <div className="refill-history">
                                        <RefillHistoryGhostImage/>
                                    </div>
                                    {emptyRefillHistory &&
                                    <div className="no-products">
                                        <div className="div-center p-4">
                                            <img alt="no refill history" title="no refill history" src={NoRefilImage}/>
                                            <p className="title mt-3 font-weight-bold">No Refill History.</p>
                                            <button role="button" className="btn px-5 btn-brand-gradient rounded-pill custom-btn-lg" onClick={redirectToHome}>Start Ordering</button>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
                
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <Alert alertInfo={alertData} onDurationEnd={closeAlertMessage} duration='5000'/>
            <section className="block" >
                <Tabs>
                    <div className="header p-0 mb-0">
                        <TabList className="nav nav-pills">
                            <Tab className="nav-item border-0">
                                <button role="button" className="nav-link btn btn-link py-3 text-dark">Refill History</button>
                            </Tab>
                            <Tab className="nav-item border-0">
                                <button role="button" className="nav-link btn btn-link py-3 text-dark">How it works</button>
                            </Tab>
                        </TabList>
                    </div>
                    <TabPanel>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div className="body p-3">
                                    {!emptyRefillHistory &&
                                    <div className="refill-history">
                                        {refillHistory && refillHistory.refillHeaders && refillHistory.refillHeaders.map(eachRefill => {
                                            return (
                                                <div className="each-refill" >
                                                    <div className="order-heading">
                                                        <div>
                                                            {eachRefill.headerStatus && eachRefill.headerStatus=='ACTIVE' && <span className="text-success font-weight-bold"> Active</span>}
                                                            {eachRefill.headerStatus && eachRefill.headerStatus=='INACTIVE' && <span className="text-danger font-weight-bold"> Inactive</span>}
                                                            <span className="dot-separator text-dark"></span>
                                                            <span className="text-secondary">Refill ID</span>
                                                            <strong> {eachRefill.refillId}</strong>
                                                        </div>
                                                        {eachRefill.dateCreated && 
                                                        <div className="text-right" >
                                                            <span className="text-secondary">
                                                            Refill created on <strong className="text-dark"> {moment(new Date(eachRefill.dateCreated)).format("MMM DD, YYYY")}</strong>
                                                            </span>
                                                        </div>}
                                                    </div>
                                                    <div className="order-details">
                                                        <img alt="order" src={OrderRefillBG}/>
                                                        <p className="products-name w-50">
                                                            {refillHistory.refillOrderItemsCount[eachRefill.refillId]<2 &&
                                                                <span><span className="mb-1 pointer" title={refillHistory.productIdNameMap[eachRefill.refillItems[0].productId]}>{refillHistory.productIdNameMap[eachRefill.refillItems[0].productId]}</span></span>
                                                            }
                                                            {refillHistory.refillOrderItemsCount[eachRefill.refillId]==2 &&
                                                                <React.Fragment>
                                                                    <span><span className="mb-1 pointer" title={refillHistory.productIdNameMap[eachRefill.refillItems[0].productId]}>{refillHistory.productIdNameMap[eachRefill.refillItems[0].productId]}</span></span>
                                                                    <span><span className="mb-1 pointer" title={refillHistory.productIdNameMap[eachRefill.refillItems[1].productId]}>{refillHistory.productIdNameMap[eachRefill.refillItems[1].productId]}</span></span>
                                                                </React.Fragment>
                                                            }
                                                            {refillHistory.refillOrderItemsCount[eachRefill.refillId]>2 &&
                                                                <React.Fragment>
                                                                    <span><span className="mb-1 pointer" title={refillHistory.productIdNameMap[eachRefill.refillItems[0].productId]}>{refillHistory.productIdNameMap[eachRefill.refillItems[0].productId]}</span></span>
                                                                    <span><span className="mb-1 pointer" title={refillHistory.productIdNameMap[eachRefill.refillItems[1].productId]}>{refillHistory.productIdNameMap[eachRefill.refillItems[1].productId]}</span></span>
                                                                    <span className="mb-1 pointer d-inline-block ml-2 text-muted align-top">({refillHistory.refillOrderItemsCount[eachRefill.refillId]-2} MORE)</span>
                                                                </React.Fragment>
                                                            }
                                                        </p>
                                                        <p className="w-50">
                                                            {eachRefill.interval && <span className="text-dark">Delivery Interval <strong> Repeat Every {eachRefill.interval} days</strong></span>}
                                                            <br/>
                                                            <span className="text-dark">No of Items : <strong className="text-dark"> {refillHistory.refillOrderItemsCount[eachRefill.refillId]}</strong></span>			     
                                                        </p>
                                                    </div>
                                                    <div className="order-footer">
                                                        <div>
                                                            {eachRefill.lastOrderCreatedDate && 
                                                            <React.Fragment>
                                                                <a href="javascript:void(0)" className="text-info">
                                                                    Last Order Created on <strong>{moment(new Date(eachRefill.lastOrderCreatedDate)).format("MMM DD, YYYY")}</strong>
                                                                </a>
                                                            </React.Fragment>}
                                                            {(eachRefill.lastOrderCreatedDate && (eachRefill.refillOrderCreationDate && eachRefill.headerStatus && eachRefill.headerStatus=='ACTIVE')) &&<span className="dot-separator text-dark"></span>}
                                                            {eachRefill.refillOrderCreationDate && eachRefill.headerStatus && eachRefill.headerStatus=='ACTIVE' &&<span className="text-secondary">
                                                                
                                                                Next Order Date on <strong className="text-dark">{moment(new Date(eachRefill.refillOrderCreationDate)).format("MMM DD, YYYY")}</strong>
                                                            </span>}
                                                        </div>
                                                        <button role="button" className="btn btn-link btn-sm no-underline" title="View Refill" onClick={()=>getRefillDatails(eachRefill.refillId)}> View Refill </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>}
                                    {emptyRefillHistory &&
                                    <div className="no-products">
                                        <div className="div-center p-4">
                                            <img alt="no refill history" title="no refill history" src={NoRefilImage}/>
                                            <p className="title mt-3 font-weight-bold">No Refill History.</p>
                                            <button className="btn px-5 btn-brand-gradient rounded-pill custom-btn-lg" onClick={redirectToHome}>Start Ordering</button>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div id="pills-profile">
                            <div class="body additional-details-section mt-3">
                                <div class="d-flex">
                                <div class="col refill-faq">
                                    <div class="card-container">
                                        <h6>What is Refill Service</h6>
                                        <div class="card-content">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                                            <g id="convenience" data-name="convenience" transform="translate(-1636.604 -478.814)">
                                                <rect id="Rectangle_2692" data-name="Rectangle 2692" width="36" height="36" transform="translate(1636.604 478.814)" fill="none"></rect>
                                                <g id="convenience-2" data-name="convenience" transform="translate(1636.605 478.815)">
                                                    <path id="Path_1558" data-name="Path 1558" d="M1655.227,478.815a6.841,6.841,0,0,0-6.376,4.3l-.036.09-.094.029-11.765,3.668a.5.5,0,0,0-.205.834l4.394,4.395-2.782,4.638a.5.5,0,0,0,.272.734l4.057,1.352v11.035a.505.505,0,0,0,.326.47l.214.08,11.121,4.171a.5.5,0,0,0,.32,0l12.745-4.249a.5.5,0,0,0,.344-.476v-11.33l4.32-1.357a.5.5,0,0,0,.2-.834l-4.317-4.317,4.317-4.317a.5.5,0,0,0-.206-.835l-10.261-3.167-.033-.1A6.836,6.836,0,0,0,1655.227,478.815Zm-.206,34.63v-15.71l2.876,3.6a.506.506,0,0,0,.542.165l8.319-2.615v10.652Zm-1-.028-10.321-3.87V499.195l.27.09c3.13,1.038,4.943,1.646,6,2a11.536,11.536,0,0,0,1.543.493.515.515,0,0,0,.452-.244l2.051-3.42Zm-2.705-12.743-11.766-3.922,2.454-4.092,11.766,3.922Zm7.155-.24-3.107-3.882,11.763-3.922,3.868,3.867Zm-3.948-4.659-11.153-3.717,6.44-2.147.09.111a6.87,6.87,0,0,0,10.354.356l.09-.1,5.333,1.778Zm.708-4.22a5.871,5.871,0,1,1,5.869-5.869,5.867,5.867,0,0,1-5.869,5.869Zm11.9-.072-6.134-2.045.131-.22a6.876,6.876,0,0,0,.978-3.532c0-.175-.006-.349-.02-.523l-.024-.3,8.932,2.756Zm-25.209,0-3.866-3.865,10.427-3.251-.047.324a7.053,7.053,0,0,0-.073,1,6.793,6.793,0,0,0,.76,3.145l.112.214Z" transform="translate(-1636.605 -478.815)" fill="#404040"></path>
                                                </g>
                                                <g id="Group_3801" data-name="Group 3801" transform="translate(1646.23 503.888)">
                                                    <path id="Union_3" data-name="Union 3" d="M4.574,5.523.326,3.93a.5.5,0,0,1-.279-.261.5.5,0,0,1-.014-.386A.5.5,0,0,1,.5,2.958a.476.476,0,0,1,.175.032L4.925,4.583a.5.5,0,0,1,.294.647.51.51,0,0,1-.474.324A.491.491,0,0,1,4.574,5.523Zm0-3.023L3,1.908A.5.5,0,0,1,3.177.937a.532.532,0,0,1,.175.031l1.573.592a.5.5,0,0,1,.294.647.491.491,0,0,1-.262.28.479.479,0,0,1-.206.046A.515.515,0,0,1,4.574,2.5ZM0,.5A.5.5,0,1,1,.5,1,.5.5,0,0,1,0,.5Z" fill="#e71c37" stroke="rgba(0,0,0,0)" stroke-width="1"></path>
                                                </g>
                                                <g id="Group_3802" data-name="Group 3802" transform="translate(1651.68 481.353)">
                                                    <path id="Union_4" data-name="Union 4" d="M1.778,8.478l.628-.361a3.715,3.715,0,0,1-.281-6.833l.4.841a2.788,2.788,0,0,0,.3,5.158l-.5-.861.8-.465.988,1.708a.463.463,0,0,1-.171.635l-1.708.986ZM4.916,7.162A2.79,2.79,0,0,0,4.609,2l.5.861L4.3,3.328,3.318,1.62A.462.462,0,0,1,3.487.986L5.2,0l.465.8-.629.363A3.715,3.715,0,0,1,5.312,8Z" transform="translate(0 0)" fill="#08ce73" stroke="rgba(0,0,0,0)" stroke-width="1"></path>
                                                </g>
                                            </g>
                                            </svg>
                                            <div>
                                            <h6>Convenience</h6>
                                            <p>Automatically ordered and delivered</p>
                                            </div>
                                        </div>
                                        <div class="card-content">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="36.722" height="36" viewBox="0 0 36.722 36">
                                            <g id="worryfree" data-name="worryfree" transform="translate(-1614.954 -510.462)">
                                                <rect id="Rectangle_2693" data-name="Rectangle 2693" width="36" height="36" transform="translate(1615.453 510.462)" fill="none"></rect>
                                                <g id="Group_3809" data-name="Group 3809" transform="translate(1615.454 511.012)">
                                                    <g id="Group_3806" data-name="Group 3806" transform="translate(18.75 12.356)">
                                                        <g id="Group_3805-2" data-name="Group 3805">
                                                        <path id="Path_1564" data-name="Path 1564" d="M1642.776,528.266h-1.369V526.9a.456.456,0,0,0-.912,0v1.369h-1.369a.456.456,0,0,0,0,.913h1.369v1.368a.456.456,0,1,0,.912,0v-1.368h1.369a.491.491,0,0,0,.456-.456A.4.4,0,0,0,1642.776,528.266Z" transform="translate(-1638.67 -526.441)" fill="#e71c37"></path>
                                                        </g>
                                                    </g>
                                                    <g id="Group_3807" data-name="Group 3807" transform="translate(18.447 5.817)">
                                                        <path id="Union_2" data-name="Union 2" d="M6.311,14.826c-.152-.152-.077-.379.077-.531s.379-.077.531.075a1.445,1.445,0,0,0,1.978.381l1.369-.835a.435.435,0,0,1,.531.15.377.377,0,0,1-.075.533l-1.369.835a2.173,2.173,0,0,1-1.294.381A1.954,1.954,0,0,1,6.311,14.826ZM0,.456A.456.456,0,1,1,.456.913.456.456,0,0,1,0,.456Z" fill="#08ce73" stroke="rgba(0,0,0,0)" stroke-width="1"></path>
                                                    </g>
                                                    <g id="Group_3808" data-name="Group 3808">
                                                        <path id="Union_1" data-name="Union 1" d="M23.841,31.842a2.6,2.6,0,1,1,2.6,2.6A2.6,2.6,0,0,1,23.841,31.842Zm1.257,0a1.341,1.341,0,1,0,1.34-1.343A1.342,1.342,0,0,0,25.1,31.842Zm-14.158,0a2.6,2.6,0,1,1,2.6,2.6A2.6,2.6,0,0,1,10.94,31.842Zm1.255,0A1.342,1.342,0,1,0,13.538,30.5,1.344,1.344,0,0,0,12.2,31.842Zm-2-3.594a.62.62,0,0,1-.61-.487L4.851,7.191a.775.775,0,0,0-.76-.606H.628a.627.627,0,1,1,0-1.253H4.09A2.023,2.023,0,0,1,6.073,6.909l.75,3.263.013.059h7.1A2.19,2.19,0,0,1,14.4,9.014l2.18-2.93V4.9a1.5,1.5,0,0,1-.913-1.367V1.482A1.484,1.484,0,0,1,17.154,0h7.983A1.484,1.484,0,0,1,26.62,1.482V3.535a1.45,1.45,0,0,1-.911,1.377V6.084l2.18,2.934a2.392,2.392,0,0,1,.48,1.436v3.68l1.653-.965a3.58,3.58,0,0,1,2.778-.363,3.7,3.7,0,0,1,2.242,1.7h0a3.684,3.684,0,0,1-1.334,5.021l-.811.469-.631,3.23a2.037,2.037,0,0,1-2,1.648H10.2L10.693,27H28.132a.627.627,0,1,1,0,1.253ZM9.9,23.558l.014.061H30.272a.782.782,0,0,0,.767-.633l.421-2.162-3.147,1.819a3.962,3.962,0,0,1-1.832.452,3.68,3.68,0,0,1-3.157-1.73H16.241a2.32,2.32,0,0,1-2.318-2.32v-7.56h-6.8Zm15.217-6.313a2.56,2.56,0,0,0,2.547,4.441l0,0L30,20.372l-2.547-4.439Zm-10.131,1.8A1.256,1.256,0,0,0,16.241,20.3l6.543-.073a3.546,3.546,0,0,1,0-1.525h-7.8Zm15.609-4.92-2.109,1.235L31.034,19.8l2.105-1.233a2.67,2.67,0,0,0,.945-3.5,2.594,2.594,0,0,0-1.553-1.208,2.474,2.474,0,0,0-.658-.089A2.516,2.516,0,0,0,30.595,14.126ZM14.986,17.64h8.257a2.756,2.756,0,0,1,1.319-1.283L27.229,14.8V11.33H14.986ZM17.571,6.2a.47.47,0,0,1-.107.383l-2.259,3.09a3.144,3.144,0,0,1-.215.442H27.147a1.224,1.224,0,0,0-.205-.509L24.776,6.767h-4.2a.571.571,0,0,1,0-1.142h3.917V4.942H17.571Zm-.835-4.64V3.612a.375.375,0,0,0,.341.343h7.986a.375.375,0,0,0,.341-.343V1.558a.373.373,0,0,0-.341-.341H17.077A.373.373,0,0,0,16.736,1.558Z" fill="#404040" stroke="rgba(0,0,0,0)" stroke-width="1"></path>
                                                        <path id="Path_1567" data-name="Path 1567" d="M1653.275,544.566a.626.626,0,0,0-.443,1.07.647.647,0,0,0,.887,0,.627.627,0,0,0-.443-1.07Z" transform="translate(-1622.608 -517.571)" fill="#404040"></path>
                                                    </g>
                                                </g>
                                            </g>
                                            </svg>
                                            <div>
                                            <h6>Worry free</h6>
                                            <p>You will not run out of your medicines</p>
                                            </div>
                                        </div>
                                        <div class="card-content">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                                            <g id="savings" data-name="savings" transform="translate(-1619.142 -566.527)">
                                                <rect id="Rectangle_2694" data-name="Rectangle 2694" width="36" height="36" transform="translate(1619.142 566.527)" fill="none"></rect>
                                                <g id="Group_3812" data-name="Group 3812" transform="translate(1621.578 566.527)">
                                                    <g id="Group_3810" data-name="Group 3810">
                                                        <path id="Path_1570" data-name="Path 1570" d="M1639.929,593.2a8.488,8.488,0,1,0-8.489-8.489A8.488,8.488,0,0,0,1639.929,593.2Zm0-15.806a7.318,7.318,0,1,1-7.318,7.318A7.317,7.317,0,0,1,1639.929,577.4Z" transform="translate(-1623.842 -568.359)" fill="#404040"></path>
                                                        <path id="Path_1571" data-name="Path 1571" d="M1653.438,599.492a2.957,2.957,0,0,0-3.905-1.19l-4.585,2.167a3.737,3.737,0,0,0-3.184-1.965l-4.233-.116a4.468,4.468,0,0,1-1.924-.5l-.431-.223a7.6,7.6,0,0,0-7.038.007l.027-.976a.585.585,0,0,0-.569-.6l-4.642-.128a.586.586,0,0,0-.6.569l-.28,10.186a.585.585,0,0,0,.569.6l4.642.128h.016a.586.586,0,0,0,.586-.569l.013-.487,1.206-.646a2.067,2.067,0,0,1,1.544-.169l7.2,2.02.038.01a7.682,7.682,0,0,0,1.582.163,7.81,7.81,0,0,0,3.263-.711.563.563,0,0,0,.072-.041l10.441-6.753A.586.586,0,0,0,1653.438,599.492Zm-26.708,6.776-3.471-.1.247-9.016,3.471.1Zm15.475-.249a6.637,6.637,0,0,1-4.059.453l-7.182-2.016a3.237,3.237,0,0,0-2.413.264l-.616.33.165-5.995a6.432,6.432,0,0,1,6.536-.349l.431.223a5.653,5.653,0,0,0,2.43.628l4.234.116a2.567,2.567,0,0,1,2.439,2.046l-6.305-.174a.585.585,0,1,0-.032,1.17l6.959.191h.016a.585.585,0,0,0,.585-.569,3.718,3.718,0,0,0-.057-.759l4.7-2.222.014-.006a1.788,1.788,0,0,1,2.022.283Z" transform="translate(-1622.073 -572.089)" fill="#404040"></path>
                                                        <path id="Path_1572" data-name="Path 1572" d="M1641.77,573.259a.585.585,0,0,0,.585-.586v-5.561a.585.585,0,1,0-1.17,0v5.561A.585.585,0,0,0,1641.77,573.259Z" transform="translate(-1625.683 -566.527)" fill="#404040"></path>
                                                    </g>
                                                    <g id="Group_3811" data-name="Group 3811" transform="translate(11.11 2.927)">
                                                        <path id="Path_1573" data-name="Path 1573" d="M1647.183,570.136a.585.585,0,0,0-.586.586v2.634a.585.585,0,1,0,1.17,0v-2.634A.585.585,0,0,0,1647.183,570.136Z" transform="translate(-1637.816 -570.136)" fill="#08ce73"></path>
                                                        <path id="Path_1574" data-name="Path 1574" d="M1636.357,570.136a.585.585,0,0,0-.586.586v2.634a.585.585,0,1,0,1.17,0v-2.634A.585.585,0,0,0,1636.357,570.136Z" transform="translate(-1635.771 -570.136)" fill="#08ce73"></path>
                                                    </g>
                                                    <path id="Path_1575" data-name="Path 1575" d="M1643.76,584.109h-1.11l-.02-.107a1.892,1.892,0,0,0-.349-.783l-.16-.211h1.623a.054.054,0,0,0,.039-.015.056.056,0,0,0,.014-.036v-.6a.05.05,0,0,0-.015-.041.039.039,0,0,0-.036-.014H1638.9a.049.049,0,0,0-.041.013.051.051,0,0,0-.015.036v.775a.051.051,0,0,0,.015.036.058.058,0,0,0,.041.019h.844c.867,0,1.431.245,1.676.727l.1.192H1638.9a.058.058,0,0,0-.041.014.05.05,0,0,0-.014.036v.6a.051.051,0,0,0,.015.04c.01.01,0,.02.036.014h2.659l-.043.165a1.26,1.26,0,0,1-.665.811,2.743,2.743,0,0,1-1.3.265h-.644a.073.073,0,0,0-.039.015.05.05,0,0,0-.016.036v.739a.047.047,0,0,0,.013.034c.748.794,1.724,1.914,2.906,3.331a.055.055,0,0,0,.039.023h0l1.136,0a.05.05,0,0,0,.047-.023c.018-.031.016-.045.006-.054-1.137-1.392-2.032-2.437-2.674-3.119l-.188-.2.273-.023a2.815,2.815,0,0,0,1.534-.61,2.035,2.035,0,0,0,.7-1.277l.016-.114h1.091a.057.057,0,0,0,.038-.012.043.043,0,0,0,.016-.035v-.6a.045.045,0,0,0-.012-.038C1643.784,584.114,1643.778,584.106,1643.76,584.109Z" transform="translate(-1625.242 -569.508)" fill="#e71c37"></path>
                                                </g>
                                            </g>
                                            </svg>
                                            <div>
                                            <h6>Savings</h6>
                                            <p>Best savings on medicines for every order</p>
                                            </div>
                                        </div>
                                        <div class="card-content">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="36.501" height="36.5" viewBox="0 0 36.501 36.5">
                                            <g transform="translate(-1633.283 -583.717)">
                                                <rect fill="none" width="36" height="36" transform="translate(1633.283 584.217)"></rect>
                                                <path fill="#08ce73" d="M1642.373,606.217a8.97,8.97,0,1,0,8.97,8.97A8.97,8.97,0,0,0,1642.373,606.217Zm0,16.744a7.774,7.774,0,1,1,7.774-7.774A7.774,7.774,0,0,1,1642.373,622.961Z" transform="translate(0 -4.06)"></path>
                                                <path fill="#e71c37" d="M-9981.707-3052.564l-3.216-2.572v-3.875a.6.6,0,0,1,.6-.6.6.6,0,0,1,.6.6v3.3l2.768,2.213a.6.6,0,0,1,.093.84.6.6,0,0,1-.467.225A.591.591,0,0,1-9981.707-3052.564Zm-4.411-13.023a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h3.586a.6.6,0,0,1,.6.6.6.6,0,0,1-.6.6Z" transform="translate(11626.697 3666.548)"></path>
                                                <g transform="translate(1636.991 584.217)">
                                                    <path fill="#404040" stroke="rgba(0,0,0,0)" d="M-11607.562-3619.906a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h13.4a1.553,1.553,0,0,0,1.546-1.555v-16.981h-3.588a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h3.588v-4.425a1.554,1.554,0,0,0-1.546-1.555h-3.238v1.2a2.392,2.392,0,0,1-2.393,2.392h-.6a2.391,2.391,0,0,1-2.392-2.392v-.9h-9.568v.9a2.392,2.392,0,0,1-2.393,2.392h-.6a2.392,2.392,0,0,1-2.393-2.392v-1.2h-3.237a1.555,1.555,0,0,0-1.547,1.555v4.425h22.127a.6.6,0,0,1,.6.6.6.6,0,0,1-.6.6h-22.127v5.245a.6.6,0,0,1-.6.6.6.6,0,0,1-.6-.6v-10.866a2.75,2.75,0,0,1,2.742-2.751h3.237v-.6a2.392,2.392,0,0,1,2.393-2.392h.6a2.392,2.392,0,0,1,2.393,2.392v.9h9.568v-.9a2.391,2.391,0,0,1,2.392-2.392h.6a2.392,2.392,0,0,1,2.393,2.392v.6h3.238a2.751,2.751,0,0,1,2.742,2.751v22.6a2.75,2.75,0,0,1-2.742,2.751Zm5.979-28.7v2.99a1.2,1.2,0,0,0,1.2,1.2h.6a1.2,1.2,0,0,0,1.2-1.2v-2.99a1.2,1.2,0,0,0-1.2-1.2h-.6A1.194,1.194,0,0,0-11601.582-3648.608Zm-14.95,0v2.99a1.2,1.2,0,0,0,1.2,1.2h.6a1.2,1.2,0,0,0,1.2-1.2v-2.99a1.194,1.194,0,0,0-1.2-1.2h-.6A1.2,1.2,0,0,0-11616.532-3648.608Zm16.719,22.757a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h1.405a.6.6,0,0,1,.6.6.6.6,0,0,1-.6.6Zm-4.2,0a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h1.4a.6.6,0,0,1,.6.6.6.6,0,0,1-.6.6Zm4.2-2.8a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h1.405a.6.6,0,0,1,.6.6.6.6,0,0,1-.6.6Zm-4.2,0a.605.605,0,0,1-.6-.6.6.6,0,0,1,.6-.6h1.4a.6.6,0,0,1,.6.6.6.6,0,0,1-.6.6Zm-4.2,0a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h1.408a.6.6,0,0,1,.6.6.6.6,0,0,1-.6.6Zm8.4-2.8a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h1.405a.6.6,0,0,1,.6.6.6.6,0,0,1-.6.6Zm-4.2,0a.6.6,0,0,1-.6-.6.605.605,0,0,1,.6-.6h1.4a.6.6,0,0,1,.6.6.6.6,0,0,1-.6.6Zm-4.2,0a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h1.408a.6.6,0,0,1,.6.6.6.6,0,0,1-.6.6Zm8.4-2.8a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h1.405a.6.6,0,0,1,.6.6.6.6,0,0,1-.6.6Zm-4.2,0a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h1.4a.6.6,0,0,1,.6.6.6.6,0,0,1-.6.6Zm-4.2,0a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.6h1.408a.6.6,0,0,1,.6.6.6.6,0,0,1-.6.6Z" transform="translate(11623.708 3651)"></path>
                                                </g>
                                            </g>
                                            </svg>
                                            <div>
                                            <h6>Auto Reminder</h6>
                                            <p>We will remind you 2 days prior to processing your refill request</p>
                                            </div>
                                        </div>
                                        <div class="card-content">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="36.995" height="36.995" viewBox="0 0 36.995 36.995">
                                            <g transform="translate(-1635.284 -647.585)">
                                                <rect fill="none" width="36" height="36" transform="translate(1635.785 648.085)"></rect>
                                                <g transform="translate(1635.785 648.085)">
                                                    <path fill="#e71c37" d="M1647.843,660.143a.7.7,0,0,0,0-.995l-1.972-1.971,1.972-1.972a.7.7,0,1,0-.994-.995l-1.972,1.972-1.972-1.972a.7.7,0,0,0-.995.995l1.972,1.972-1.972,1.971a.7.7,0,1,0,.995.995l1.972-1.972,1.972,1.972a.7.7,0,0,0,.994,0Z" transform="translate(-1636.862 -649.162)"></path>
                                                    <path fill="#08ce73" d="M1670.028,653.647l-3.5,3.5-1.471-1.471a.7.7,0,1,0-.994.994l1.968,1.968a.7.7,0,0,0,.995,0l4-4a.7.7,0,0,0-.994-.994Z" transform="translate(-1640.892 -649.06)"></path>
                                                    <path fill="#404040" stroke="rgba(0,0,0,0)" d="M-11586.639-3719.038a.7.7,0,0,1-.461-.881l.982-3.132a15.359,15.359,0,0,0,.706-4.611v-5.879a.973.973,0,0,0-.972-.971.972.972,0,0,0-.971.971v2.044a.7.7,0,0,1-.7.7.7.7,0,0,1-.7-.7v-3.278a.973.973,0,0,0-.975-.971.973.973,0,0,0-.971.971v3.278a.7.7,0,0,1-.7.7.7.7,0,0,1-.7-.7v-3.278a.971.971,0,0,0-.971-.971.971.971,0,0,0-.971.971v3.278a.7.7,0,0,1-.706.7.7.7,0,0,1-.7-.7v-10.382a.976.976,0,0,0-.974-.974.975.975,0,0,0-.972.974v12.694a.7.7,0,0,1-.7.7.7.7,0,0,1-.7-.7v-1.33l-1.263,1.849a2.7,2.7,0,0,0-.213,2.66l2.814,6a.7.7,0,0,1-.336.933.69.69,0,0,1-.3.067.7.7,0,0,1-.636-.4l-2.814-6a4.117,4.117,0,0,1,.323-4.051l2.424-3.552v-5.961h-1.015a2.182,2.182,0,0,1-2.179-2.181v-11.668a2.182,2.182,0,0,1,2.179-2.181h11.671a2.183,2.183,0,0,1,2.181,2.181v11.668a2.183,2.183,0,0,1-2.181,2.181h-5.836l-.063,0v2.03a2.343,2.343,0,0,1,.971-.207,2.37,2.37,0,0,1,1.674.691,2.38,2.38,0,0,1,1.674-.691,2.379,2.379,0,0,1,2.22,1.519,2.381,2.381,0,0,1,1.131-.286,2.379,2.379,0,0,1,2.377,2.377v5.879a16.754,16.754,0,0,1-.77,5.031l-.983,3.132a.7.7,0,0,1-.67.493A.662.662,0,0,1-11586.639-3719.038Zm-7.413-22.84v1.5a.453.453,0,0,1,.063,0h5.836a.774.774,0,0,0,.772-.776v-11.668a.775.775,0,0,0-.772-.776h-11.671a.775.775,0,0,0-.773.776v11.668a.775.775,0,0,0,.773.776h1.015v-1.5a2.382,2.382,0,0,1,2.377-2.38A2.382,2.382,0,0,1-11594.052-3741.877Zm-13.958,2.907h-9.81a2.182,2.182,0,0,1-2.182-2.181v-11.668a2.182,2.182,0,0,1,2.182-2.181h11.668a2.181,2.181,0,0,1,2.181,2.181v11.668a2.181,2.181,0,0,1-2.181,2.181Zm-10.583-13.849v11.668a.773.773,0,0,0,.773.776h11.668a.777.777,0,0,0,.775-.776v-11.668a.777.777,0,0,0-.775-.776h-11.668A.774.774,0,0,0-11618.593-3752.819Z" transform="translate(11620 3755)"></path>
                                                </g>
                                            </g>
                                            </svg>
                                            <div>
                                            <h6>No Hassles</h6>
                                            <p>You can <strong>cancel</strong> or <strong>modify</strong> the refills at any time</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-7 p-0">
                                    <div>
                                        <h6>How it works?</h6>
                                        <ol className="text-secondary">
                                            <li>
                                            When placing your first order, Submit your refill request on the confirmation page.
                                            </li>
                                            <li>
                                            Upon successfully creation you will be able to see your request in My refills section in your account
                                            </li>
                                            <li>
                                            We will automatically process  your order as per selected interval 
                                            </li>
                                            <li>
                                            For any modification, visit My Refills section in your account
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </section>
        </React.Fragment>
    )
}

export default RefillHistory;