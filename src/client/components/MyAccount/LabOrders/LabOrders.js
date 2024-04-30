import React, { useState, useEffect } from 'react';
import LabOrderHeader from './LabOrderHeader';
import LabOrderService from '../../../services/LabOrderService';
import Alert from '../../Common/Alert';
import Validate from '../../../helpers/Validate';
import moment from "moment";
import LabOrderAction from "../../../../redux/action/LabOrderAction";
import UserInfoAction from '../../../../redux/action/UserInfoAction';
import LocalDB from '../../../DataBase/LocalDB';
import BroswerHelper from './../../../helpers/BroswerHelper';
import { DIAGNOSTICS_HOME } from '../../MedplusLabs/constants/LabConstants';
import { useChatModal } from '../../Chat/Common/useChatModal';
import ChatModal from '../../Chat/Common/ChatModal';

const LabOrders = (props) => {

    const labOrderService = LabOrderService();
    const validate = Validate();
    const labOrderAction = LabOrderAction();
    const userInfoAction = UserInfoAction();
    const [includeCanceled, setIncludeCanceled] = useState(false);
    const [labOrderHeader, setLabOrderHeader] = useState([]);
    const [pathLabStoresMap, setPathLabStoresMap] = useState({});
    const [agentsInfo, setAgentsInfo] = useState({});
    const [pageNo,setPageNo]=useState(1);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [showLoadMore, setShowLoadMore] = useState(false);
    const [nextLabOrdersLoader, setNextLabOrdersLoader] = useState(false);
    const [orderheaderLoading, setOrderheaderLoading] = useState(true);
    const [noMoreOrderHeader, setNoMoreOrderHeader] = useState(false);
    const [noLabOrderHeaderFound, setNoLabOrderHeaderFound] = useState(false);
    const [labOrderSyncLoader, setLabOrderSyncLoader] = useState(false);
    const [availableDate, setAvailableDate] = useState("");
    const [labServerUrl,setLabOrderUrl] = useState("");

    const refs = validate.isNotEmpty(labOrderHeader) ? labOrderHeader.reduce((acc, value) => {
        if(validate.isNotEmpty(value.orderId)){
            acc[value.orderId] = React.createRef();
        }
        return acc;
    }, {}) : [];

    useEffect(() => {
        let labOrderIdFromDetail = LocalDB.getValue("fromLabOrderDetail");
        LocalDB.removeValue("fromLabOrderDetail");
        const isFromDetailPage = validate.isNotEmpty(labOrderIdFromDetail);
        let labOrderInfoFromRedux = labOrderAction.getLabOrders();
        const userInfo = userInfoAction.getUserInfo();
        if(!(validate.isNotEmpty(labOrderInfoFromRedux) && validate.isNotEmpty(labOrderInfoFromRedux.labOrders) && validate.isNotEmpty(userInfo) && (userInfo.medplusId == labOrderInfoFromRedux.customerId))) {
            labOrderAction.clearLabOrders();
            labOrderInfoFromRedux = {};
        }else{
            setOrderheaderLoading(false);
            setShowLoadMore(true);
        }
        setAvailableDate(labOrderInfoFromRedux.available);
        setIncludeCanceled(labOrderInfoFromRedux.includeCanceled);
        setPathLabStoresMap(labOrderInfoFromRedux.pathLabStores);
        setAgentsInfo(labOrderInfoFromRedux.agentsInfo);
       setPageNo(labOrderInfoFromRedux.pageNo);
        let labOrders = isFromDetailPage && validate.isNotEmpty(labOrderInfoFromRedux.nonPersistLabOrders) ? labOrderInfoFromRedux.nonPersistLabOrders : labOrderInfoFromRedux.labOrders;
        prepareLabOrderObject(labOrderInfoFromRedux.includeCanceled, labOrders);
        setLabOrderSyncLoader(!isFromDetailPage);
        if(!isFromDetailPage) {
            getLabOrders(labOrderInfoFromRedux.includeCanceled ? labOrderInfoFromRedux.includeCanceled : false, 1);
        }

        try {
            const browserInfo = BroswerHelper().getBorwserInfo();
            if(isFromDetailPage && validate.isNotEmpty(browserInfo) && browserInfo.split(" ").length > 1 && validate.isNotEmpty(browserInfo.split(" ")[0]) && validate.isNumeric(browserInfo.split(" ")[1])) {
                let browserInfoArr = browserInfo.split(" ");
                let browserName = browserInfoArr[0];
                let browserVersion = browserInfoArr[1];
                let block = browserName === "Firefox" && parseInt(browserVersion) < 58 ? "start" : "center";
                if(labOrderIdFromDetail && refs[labOrderIdFromDetail] && refs[labOrderIdFromDetail].current) {
                    refs[labOrderIdFromDetail].current.scrollIntoView({
                        behavior: 'smooth',
                        block: block,
                    });
                }
            }
        } catch(err) {
            console.log(err);
        }
    },[]);

    const getLabOrders = (includeCanceled, pageNo) => {
        if(pageNo == 1){
            labOrderAction.clearLabOrders();
            setLabOrderHeader([]);
            setPathLabStoresMap({});
            setAgentsInfo({});
            setOrderheaderLoading(true);
            setLabOrderSyncLoader(true);
        }
        labOrderService.getLabOrders(true, pageNo).then(response => {
            setOrderheaderLoading(false);
            setLabOrderSyncLoader(false);
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                if(validate.isNotEmpty(response.dataObject)) {
                    setLabOrderUrl(response.dataObject.labServerUrl);
                    let pageNo= response.dataObject.pageNo;
                    setAvailableDate(response.dataObject.lastAvailableDate);
                   setPageNo(pageNo+1);
                   if(validate.isNotEmpty(response.dataObject.recordsCompleted) &&response.dataObject.recordsCompleted ) {
                    if(validate.isEmpty(response.dataObject.labOrderData) ||validate.isEmpty(response.dataObject.labOrderData.labOrders)) {
                            validate.isEmpty(labOrderHeader) ? setNoLabOrderHeaderFound(true) : setNoMoreOrderHeader(true);
                        }
                        setShowLoadMore(false);
                        return;
                    }
                    if(validate.isEmpty(response.dataObject.labOrderData) ||validate.isEmpty(response.dataObject.labOrderData.labOrders)) {
                        setOrderheaderLoading(true);
                        loadMoreOrder(pageNo+1);
                    } else {
                        let labOrderInfo = {"customerId" : response.dataObject.customerId, "labOrders" : response.dataObject.labOrderData.labOrders, "includeCanceled" : includeCanceled, "pathLabStores" : response.dataObject.labOrderData.pathLabStores, "agentsInfo" : response.dataObject.labOrderData.agentsInfo,  "available" : response.dataObject.lastAvailableDate,"pageNo":pageNo+1};
                        saveLabOrdersInRedux(labOrderInfo);
                        setPathLabStoresMap(response.dataObject.labOrderData.pathLabStores);
                        setAgentsInfo(response.dataObject.labOrderData.agentsInfo);
                        prepareLabOrderObject(includeCanceled, response.dataObject.labOrderData.labOrders);
                        setShowLoadMore(true);
                    }
                }
            } else {
                setNoLabOrderHeaderFound(true);
            }
        },(err)=>{
            setOrderheaderLoading(false);
            console.log(err);
        });
    }

    const loadMoreOrder = (pageNo) => {
        setNextLabOrdersLoader(true);
        labOrderService.getLabOrders(true,pageNo).then(response => {
            setNextLabOrdersLoader(false);
            setOrderheaderLoading(false);
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                if(validate.isNotEmpty(response.dataObject)) {
                    let pageNo = response.dataObject.pageNo;
                    setPageNo(pageNo+1);
                    if(validate.isNotEmpty(response.dataObject.recordsCompleted) &&response.dataObject.recordsCompleted ) {
                        if(validate.isEmpty(response.dataObject.labOrderData) ||validate.isEmpty(response.dataObject.labOrderData.labOrders)) {
                            validate.isEmpty(labOrderHeader) ? setNoLabOrderHeaderFound(true) : setNoMoreOrderHeader(true);
                        }
                        setShowLoadMore(false);
                        return;
                    }
                    if(validate.isEmpty(response.dataObject.labOrderData) || validate.isEmpty(response.dataObject.labOrderData.labOrders)) {
                        loadMoreOrder(pageNo+1);
                    } else {
                        let tempStoreData = {...response.dataObject.labOrderData.pathLabStores, ...pathLabStoresMap};
                        setPathLabStoresMap(tempStoreData);
                        let tempAgentsData = {...response.dataObject.labOrderData.agentsInfo, ...agentsInfo};
                        setAgentsInfo(tempAgentsData);
                        let labOrderReduxInfo = labOrderAction.getLabOrders();
                        let labOrderInfo = {};
                        let tempLabOrdersData = [];
                        if(validate.isEmpty(labOrderReduxInfo) || validate.isEmpty(labOrderReduxInfo.labOrders)) {
                            labOrderInfo = {"customerId" : response.dataObject.customerId, "labOrders" : response.dataObject.labOrderData.labOrders, "includeCanceled" : includeCanceled, "pathLabStores" : response.dataObject.labOrderData.pathLabStores, "agentsInfo" : response.dataObject.labOrderData.agentsInfo, "nonPersistLabOrders" : response.dataObject.labOrderData.labOrders,"available" : response.dataObject.lastAvailableDate,"pageNo":pageNo+1};
                            tempLabOrdersData = response.dataObject.labOrderData.labOrders;
                        } else {
                            tempLabOrdersData = [...labOrderHeader, ...response.dataObject.labOrderData.labOrders];
                            labOrderInfo = {"customerId" : response.dataObject.customerId, "nonPersistLabOrders" : tempLabOrdersData, "includeCanceled" : includeCanceled, "pathLabStores" : tempStoreData, "agentsInfo" : tempAgentsData, "available" : response.dataObject.lastAvailableDate,"pageNo":pageNo+1};
                        }
                        saveLabOrdersInRedux(labOrderInfo);
                        prepareLabOrderObject(includeCanceled, tempLabOrdersData);
                        setShowLoadMore(true);
                    }
                }
            }else{
                if(validate.isNotEmpty(response.responseData.oldestDateReached) && validate.isEmpty(labOrderHeader)) {
                    /* validate.isEmpty(labOrderHeader) ? setNoLabOrderHeaderFound(true) : setNoMoreOrderHeader(true); */
                    setNoLabOrderHeaderFound(true);
                }
                setShowLoadMore(false);
            }
        },(err)=>{
            setNextLabOrdersLoader(false);
            setShowLoadMore(false);
        })
    }
    
    const saveLabOrdersInRedux = (info) => {
		labOrderAction.saveLabOrders(info);
	}

    const includeCanceledOrders = (flag) => {
        setIncludeCanceled(flag);
        let reduxInfo = labOrderAction.getLabOrders();
        saveLabOrdersInRedux({...reduxInfo, "includeCanceled" : flag})
        let nonPersistData = reduxInfo.nonPersistLabOrders;
        let persistData = reduxInfo.labOrders;
        prepareLabOrderObject(flag, validate.isNotEmpty(nonPersistData) ? nonPersistData : persistData);
    }

    const prepareLabOrderObject = (includeCanceled, labOrders) => {
        if(labOrders && labOrders.length){
            let excludeCancelledOrdersList = labOrders.filter(eachOrder => eachOrder.status != 'C');
            includeCanceled ? setLabOrderHeader(labOrders) : setLabOrderHeader(excludeCancelledOrdersList);
        }
    }

    const [startChat,chatHeaderDetails,toggleChat] = useChatModal();

    return(
        <React.Fragment>
            <section>
                <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
                <ChatModal chatHeaderDetails={chatHeaderDetails} isModelOpen={startChat} toggleChat={toggleChat} eventType={"LAB_ORDER_CHAT"} />
                <div className="lab-orders">
                    <div className="header">
                        <p>My Lab Orders<br />{availableDate && <small className="text-secondary">Records available from {moment(new Date(availableDate)).format("MMM DD, YYYY")}</small>}</p>
                        <div className="custom-control custom-checkbox font-weight-normal">
                            {includeCanceled && <input type="checkbox" className="custom-control-input" id="include-cancel-order" onClick={(e) => includeCanceledOrders(e.target.checked)} checked/>}
                            {!includeCanceled && <input type="checkbox" className="custom-control-input" id="include-cancel-order" onClick={(e) => includeCanceledOrders(e.target.checked)}/>}
                            <label className="custom-control-label pointer" htmlFor="include-cancel-order">Include Cancelled Orders</label>
                        </div>
                    </div>
                    {labOrderSyncLoader &&
                        <div className="text-center w-100 mb-2">
                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                        </div>
                    }
                    <div className="lab-order-list">
                        {!orderheaderLoading && validate.isNotEmpty(labOrderHeader) && labOrderHeader.map(eachLabOrder => {
                            return (<LabOrderHeader key={eachLabOrder.orderId} toggleChat={toggleChat}  ref={element => {refs[eachLabOrder.orderId].current = element}} agentsInfo={agentsInfo} labOrder={eachLabOrder} pathLabStores={pathLabStoresMap} history={props.history} includeCanceled={includeCanceled} getLabOrders={getLabOrders}></LabOrderHeader>)
                        })}
                    
                        {/* {noMoreOrderHeader && !orderheaderLoading &&
                            <div class="text-center">
                                <button class="brand-secondary btn px-5">No more lab orders</button>
                            </div>
                        } */}
                        {validate.isEmpty(labOrderHeader) && noLabOrderHeaderFound && !orderheaderLoading &&
                            <div className="no-purchase-history body-height">
                                <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" width="85.86" height="92.336" viewBox="0 0 85.86 92.336">
                                    <g transform="translate(-24 -6.5)">
                                        <path fill="#b1b1b1" d="M324.078,214.427a10.083,10.083,0,0,0,10.072-10.072v-5.188a1.11,1.11,0,1,0-2.221,0v5.188a7.852,7.852,0,1,1-15.7,0v-5.188a1.11,1.11,0,1,0-2.221,0v5.188A10.084,10.084,0,0,0,324.078,214.427Z" transform="translate(-236.342 -156.111)"/>
                                        <path fill="#b1b1b1" d="M30.927,89.328c.2,0,.4-.011.592-.027H46.793v2.082a7.45,7.45,0,0,0,7.442,7.442H75.982q.163.012.329.012a1.116,1.116,0,1,0,0-2.232h-.235a2.346,2.346,0,0,1-2.107-2.332V81.733h29.358A6.541,6.541,0,0,0,109.86,75.2a1.117,1.117,0,0,0-.011-.153l-5.063-36.327a.1.1,0,0,0,0-.019,3.8,3.8,0,0,0-3.775-3.229H84.956l-1.35-9.682,0-.019a4.322,4.322,0,0,0-4.291-3.67H75.284V18.3a11.8,11.8,0,0,0-23.591,0v3.8H47.664a4.322,4.322,0,0,0-4.29,3.67l0,.019L41.166,41.61a4.3,4.3,0,0,0-1.02-.116,4.05,4.05,0,0,0-2.5.823,2.006,2.006,0,0,1-2.518,0,4.21,4.21,0,0,0-5,0,2,2,0,0,1-2.517,0,4.048,4.048,0,0,0-2.5-.822A1.11,1.11,0,0,0,24,42.6V82.4a6.935,6.935,0,0,0,6.927,6.927Zm5.1-2.248A6.9,6.9,0,0,0,37.854,82.4v-2.85a4.469,4.469,0,1,1,8.939,0V87.08Zm18.2,9.524a5.227,5.227,0,0,1-5.221-5.221V79.552A6.664,6.664,0,0,0,47.3,75.083H66.527A5.227,5.227,0,0,1,71.748,80.3V94.274a4.535,4.535,0,0,0,.641,2.332Zm48.354-57.568,5.052,36.236a4.318,4.318,0,0,1-4.312,4.24h-29.4a7.457,7.457,0,0,0-5.783-6.471l4.74-34a1.594,1.594,0,0,1,1.581-1.345h26.544a1.593,1.593,0,0,1,1.58,1.345ZM53.914,18.3a9.575,9.575,0,1,1,19.15,0v3.8H53.914Zm-8.345,7.81a2.112,2.112,0,0,1,2.1-1.785h4.029v5.942a1.11,1.11,0,1,0,2.221,0V24.321h19.15v5.942a1.11,1.11,0,1,0,2.221,0V24.321h4.029a2.112,2.112,0,0,1,2.1,1.785l1.305,9.365h-8.25A3.8,3.8,0,0,0,70.689,38.7l0,.019-4.76,34.143H56.294V42.6a1.11,1.11,0,0,0-1.11-1.11,4.05,4.05,0,0,0-2.5.823,2.009,2.009,0,0,1-2.519,0,4.211,4.211,0,0,0-5,0,1.885,1.885,0,0,1-1.258.444,1.843,1.843,0,0,1-.644-.1ZM26.221,44.059l.148.1a4.21,4.21,0,0,0,5,0,2.006,2.006,0,0,1,2.518,0,4.21,4.21,0,0,0,5,0,2.007,2.007,0,0,1,2.518,0,4.21,4.21,0,0,0,5,0,2.008,2.008,0,0,1,2.519,0,4.212,4.212,0,0,0,5,0l.149-.1v28.8H42.323a6.7,6.7,0,0,0-6.69,6.69V82.4a4.706,4.706,0,0,1-9.413,0Z" transform="translate(0 0)"/>
                                        <path fill="#b1b1b1" d="M81.291,266.374a1.11,1.11,0,0,0,1.11,1.11H96.614a1.11,1.11,0,0,0,0-2.221H82.4A1.11,1.11,0,0,0,81.291,266.374Z" transform="translate(-46.69 -210.882)"/>
                                        <path fill="#b1b1b1" d="M53.529,267.485h2.3a1.11,1.11,0,0,0,0-2.221h-2.3a1.11,1.11,0,0,0,0,2.221Z" transform="translate(-23.16 -210.882)"/>
                                        <path fill="#b1b1b1" d="M96.614,298H82.4a1.11,1.11,0,0,0,0,2.221H96.614a1.11,1.11,0,1,0,0-2.221Z" transform="translate(-46.69 -237.56)"/>
                                        <path fill="#b1b1b1" d="M53.529,300.221h2.3a1.11,1.11,0,0,0,0-2.221h-2.3a1.11,1.11,0,0,0,0,2.221Z" transform="translate(-23.16 -237.56)"/>
                                        <path fill="#b1b1b1" d="M96.614,330.733H82.4a1.11,1.11,0,0,0,0,2.221H96.614a1.11,1.11,0,1,0,0-2.22Z" transform="translate(-46.69 -264.236)"/>
                                        <path fill="#b1b1b1" d="M53.529,332.954h2.3a1.11,1.11,0,1,0,0-2.22h-2.3a1.11,1.11,0,0,0,0,2.221Z" transform="translate(-23.16 -264.236)"/>
                                        <path fill="#b1b1b1" d="M53.529,234.751H63.7a1.11,1.11,0,1,0,0-2.221H53.529a1.11,1.11,0,1,0,0,2.221Z" transform="translate(-23.16 -184.205)"/>
                                        <path fill="#b1b1b1" d="M179.133,396.835a1.338,1.338,0,0,1,1.336,1.336,1.11,1.11,0,1,0,2.221,0,3.562,3.562,0,0,0-2.446-3.377v-.414a1.11,1.11,0,1,0-2.221,0v.414a3.555,3.555,0,0,0,1.11,6.934,1.336,1.336,0,1,1,.019,2.672h-.037a1.337,1.337,0,0,1-1.318-1.335,1.11,1.11,0,1,0-2.221,0,3.561,3.561,0,0,0,2.447,3.377v.525a1.11,1.11,0,1,0,2.221,0v-.525a3.555,3.555,0,0,0-1.11-6.933,1.336,1.336,0,1,1,0-2.672Z" transform="translate(-123.528 -315.201)"/>
                                        <path fill="#b1b1b1" d="M234.011,453.726H229.96a1.11,1.11,0,0,0,0,2.221h4.051a1.11,1.11,0,1,0,0-2.221Z" transform="translate(-166.944 -364.47)"/>
                                        <path fill="#b1b1b1" d="M234.011,427.276H229.96a1.11,1.11,0,0,0,0,2.221h4.051a1.11,1.11,0,1,0,0-2.221Z" transform="translate(-166.944 -342.914)"/>
                                        <path fill="#b1b1b1" d="M234.011,400.827H229.96a1.11,1.11,0,0,0,0,2.221h4.051a1.11,1.11,0,0,0,0-2.221Z" transform="translate(-166.944 -321.36)"/>
                                    </g>
                                </svg>
                                <h6 className="mb-3">No Lab Order History</h6>
                                <button className="btn btn-brand-gradient rounded-pill ml-2 px-4 custom-btn-lg" onClick={() =>window.location.href=`/${DIAGNOSTICS_HOME}`}>Start Ordering</button>
                            </div>
                        }
                        {!orderheaderLoading && showLoadMore && !nextLabOrdersLoader &&
                            <div class="text-center">
                                <button class="brand-secondary rounded-pill btn px-5 custom-btn-lg" onClick={()=>loadMoreOrder(pageNo)}>Load more orders</button>
                            </div>
                        }
                        {!orderheaderLoading && showLoadMore && nextLabOrdersLoader &&
                            <div class="text-center">
                                <button type="submit" className="brand-secondary rounded-pill btn px-5 spinner-loader">
                                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                    <span className="sr-only"></span>
                                </button>
                            </div>
                        }
                        {orderheaderLoading && 
                            <React.Fragment>
                                <div class="card">
                                    <div class="card-header">
                                        <div class="ph-item m-0 p-0 w-100">
                                            <div class="ph-col-12 p-0">
                                                <div class="ph-row p-0 my-3">
                                                    <div class="ph-col-6 mb-0"></div>
                                                    <div class="ph-col-4 empty mb-0"></div>
                                                    <div class="ph-col-2 mb-0"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="ph-item mb-0 pt-3 px-0">
                                            <div class="ph-col-1 p-0">
                                                <div class="ph-picture ml-32" style={{'height':'36px', 'width': '36px'}}></div>
                                            </div>
                                            <div>
                                                <div class="ph-row">
                                                    <div class="ph-col-4"></div>
                                                    <div class="ph-col-6 empty"></div>
                                                    <div class="ph-col-2"></div>
                                                    <div class="ph-col-4"></div>
                                                    <div class="ph-col-6 empty"></div>
                                                    <div class="ph-col-2"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header">
                                        <div class="ph-item m-0 p-0 w-100">
                                            <div class="ph-col-12 p-0">
                                                <div class="ph-row p-0 my-3">
                                                    <div class="ph-col-6 mb-0"></div>
                                                    <div class="ph-col-4 empty mb-0"></div>
                                                    <div class="ph-col-2 mb-0"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="ph-item mb-0 pt-3 px-0">
                                            <div class="ph-col-1 p-0">
                                                <div class="ph-picture ml-32" style={{'height':'36px', 'width': '36px'}}></div>
                                            </div>
                                            <div>
                                                <div class="ph-row">
                                                    <div class="ph-col-4"></div>
                                                    <div class="ph-col-6 empty"></div>
                                                    <div class="ph-col-2"></div>
                                                    <div class="ph-col-4"></div>
                                                    <div class="ph-col-6 empty"></div>
                                                    <div class="ph-col-2"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default LabOrders
