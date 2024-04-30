import React, { useState, useEffect } from 'react';
import moment from "moment";
import LabOrderService from '../../../services/LabOrderService';
import LabOrderAction from "../../../../redux/action/LabOrderAction";
import Validate from './../../../helpers/Validate';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getLabOrderDisplayStatus, getLabOrderPaymentType, getPaymentDisplayMode, getPaymentDisplayStatus, isLabOrderStatusAllowedForCancel , isLabOrderStatusAllowedToDisplayAgent, getLabOrderVisitType,getLabOrderPaymentTypeFromEnum} from './../../../helpers/LabOrderHelper';
import LabOrderDetailGhostImage from './LabOrderDetailGhostImage';
import LabCancelOrder from '../LabOrders/LabCancelOrder';
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from './../../Common/Alert';
import LocalDB from '../../../DataBase/LocalDB';
import ShowPickUpStore from '../../Common/ShowPickUpStore';
import CONFIG from '../../../constants/ServerConfig';
import { DIAGNOSTICS_URL_PREFIX } from '../../MedplusLabs/constants/LabConstants';
import ChatModal from '../../Chat/Common/ChatModal';
import { useChatModal } from '../../Chat/Common/useChatModal';
import { getChatHeaderData } from '../../Chat/Common/ChatHelper';
import { getDisplayableAge } from '../../../helpers/CommonUtil';


const LabOrderDetail = (props) => {

    const labOrderService = LabOrderService();
    const labOrderAction = LabOrderAction();
    const validate = Validate();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [labOrderDetail, setLabOrderDetail] = useState({});
    const [pathLabStore, setPathLabStore] = useState({});
    const [agentInfo, setAgentInfo] = useState({});
    const [labOrderTimeSlot, setLabOrderTimeSlot] = useState({});
    const [labOrderPaymentDetails, setLabOrderPaymentDetails] = useState([]);
    const [enabledDownloadReportForPatient, setEnabledDownloadReportForPatient] = useState({});
    const [isLabOrderDetailLoading, setLabOrderDetailLoading] = useState(false);
    const [currentLabOrderId, setCurrentLabOrderId] = useState("");
    const [previousLabOrderId, setPreviousLabOrderId] = useState("");
    const [nextLabOrderId, setNextLabOrderId] = useState("");
    const [isCancelOrderModalOpen, setCancelOrderModalOpen] =  useState(false);
    const [totalRefundAmount, setTotalRefundAmount] =  useState(0);
    const [collapseProfiles, setCollapseProfiles] =  useState({});
    let refundTransactionNo = "";
    let refundCollectionCharges="";
    let refundReportCharges="";
    //chatbot related
    const [isEligibleForHelp,setIsEligibleForHelp] = useState(false);
    const [startChat,chatHeaderDetails,toggleChat] = useChatModal();

    //tabs related declarations
    const [activeTabName, setActiveTabName] = useState("");

    useEffect(() => {
        window.scrollTo(0,0);
        if(validate.isNotEmpty(props.match.params.orderId)){
            getLabOrderDetail(props.match.params.orderId);
            getPreviousAndNextLabOrderIds(props.match.params.orderId);
        }
    }, []);

    const getLabOrderDetail =  (labOrderId) => {
        if(validate.isEmpty(labOrderId)) {
            setAlertInfo({ message: "Invalid orderId", type: ALERT_TYPE_ERROR});
            return false;
        }
        setLabOrderDetailLoading(true);
         labOrderService.getLabOrderDetail(labOrderId).then(response => {
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === "SUCCESS") {
                setLabOrderDetail(response.dataObject.labOrder);
                setIsEligibleForHelp(response.dataObject.isEligibleForHelp);
                setPathLabStore(response.dataObject.pathLabStore);
                setLabOrderTimeSlot(response.dataObject.labOrderTimeSlot);
                setLabOrderPaymentDetails(response.dataObject.labOrderPaymentDetails);
                if(validate.isNotEmpty(response.dataObject.labOrderPaymentDetails)){
                    setActiveTabName("PaymentDetails");
                }
                setEnabledDownloadReportForPatient(response.dataObject.enabledDownloadReportForPatient);
                getTotalRefundAmountFromLabOrder(response.dataObject.labOrder);
                prepareCollapseProfilesFromLabOrder(response.dataObject.labOrder);
                if(validate.isNotEmpty(response.dataObject.labOrder) && validate.isNotEmpty(response.dataObject.labOrder.orderId)) {
                    setCurrentLabOrderId(response.dataObject.labOrder.orderId);
                } else {
                    setCurrentLabOrderId("");
                }
                if(validate.isNotEmpty(response.dataObject.agentInfo)) {
                    setAgentInfo(response.dataObject.agentInfo);
                } else {
                    setAgentInfo({});
                }
            } else if(response.statusCode === "FAILURE") {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
            }
            setLabOrderDetailLoading(false);
        }).catch(function(error) {
            setLabOrderDetailLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
        });
    }

    const getTotalRefundAmountFromLabOrder = (labOrder) => {
        if(validate.isEmpty(labOrder) || validate.isEmpty(labOrder.labOrderRefunds)) {
            setTotalRefundAmount(0);
            return;
        }
        let totalRefundAmt = labOrder.labOrderRefunds.reduce((totalAmount, eachLabOrderRefund) => totalAmount + parseFloat(eachLabOrderRefund.totalRefund), 0);
        setTotalRefundAmount(totalRefundAmt);
    }

    const prepareCollapseProfilesFromLabOrder = (labOrder) => {
        if(validate.isEmpty(labOrder) || validate.isEmpty(labOrder.labOrderPatients)) {
            setCollapseProfiles({});
            return;
        }
        let collapseProfileInfo = {};
        labOrder.labOrderPatients.map((eachLabOrderPatient) => {
            eachLabOrderPatient.labOrderItems.map((eachLabOrderItem) => {
                if(eachLabOrderItem.profile && eachLabOrderItem.profileTestSno == 1) {
                    let patientProfile = eachLabOrderPatient.patientId +"_"+ eachLabOrderItem.profileCode;
                    collapseProfileInfo[patientProfile] = true;
                }
            });
        });
        setCollapseProfiles(collapseProfileInfo);
    }

    const changeCollapseInfoForProfile = (patientProfileInfo, isCollapse) => {
        setCollapseProfiles({...collapseProfiles, [patientProfileInfo] : isCollapse});
    }

    const getPreviousAndNextLabOrderIds = (labOrderId) => {
        if(!validate.isNumeric(labOrderId)) {
            return false;
        }
        let isCancelledOrderIncluded = false;
        const labOrderInfoFromRedux = labOrderAction.getLabOrders();
        if(validate.isNotEmpty(labOrderInfoFromRedux) && validate.isNotEmpty(labOrderInfoFromRedux.includeCanceled) && String(labOrderInfoFromRedux.includeCanceled) == "true") {
            isCancelledOrderIncluded = true;
        }
        labOrderService.getPreviousAndNextLabOrderIds(labOrderId, isCancelledOrderIncluded).then(response => {
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === "SUCCESS") {
                setPreviousLabOrderId(response.dataObject.previousLabOrderId);
                setNextLabOrderId(response.dataObject.nextLabOrderId);
            } else if(response.statusCode === "FAILURE") {
                setPreviousLabOrderId("");
                setNextLabOrderId("");
            }
        }).catch(function(error) {
            setPreviousLabOrderId("");
            setNextLabOrderId("");
        });
    }

    const getPreviousOrNextLabOrderDetail = (labOrderId) => {
        if(!validate.isNumeric(labOrderId)) {
            return false;
        }
        props.history.push(`/labOrderDetail/${labOrderId}`);
        getLabOrderDetail(labOrderId);
        getPreviousAndNextLabOrderIds(labOrderId);
    }
    const printIndividualReport=(orderId,patientId,testId)=>{
        let token_from_LocalStorage = LocalDB.getValue("SESSIONID");
        window.open(`${CONFIG.REDIRECT_HOME_URL}labOrderHistory/printIndividualReport?orderId=${orderId}&patientId=${patientId}&testId=${testId}&tokenId=${token_from_LocalStorage}`);
    }
    const printLabInvoice=(orderId,patientId)=>{
        let token_from_LocalStorage = LocalDB.getValue("SESSIONID");
        window.open(`${CONFIG.REDIRECT_HOME_URL}labOrderHistory/printLabOrderInvoice?orderId=${orderId}&patientId=${patientId}&tokenId=${token_from_LocalStorage}`);
    }
    const cancelOrder = (cancelReason) => {
        if(validate.isEmpty(cancelReason)) {
            setAlertInfo({ message: "ReasonReason is required to cancel Lab Order", type: ALERT_TYPE_ERROR });
        }
        setLabOrderDetailLoading(true);
      
        labOrderService.labCancelOrder(currentLabOrderId, cancelReason).then( response => {
            setLabOrderDetailLoading(false);
            if(validate.isNotEmpty(response) && response.statusCode == "SUCCESS"){
                setAlertInfo({ message: response.dataObject, type: ALERT_TYPE_SUCCESS});
                getLabOrderDetail(currentLabOrderId); 
                updateOrderDetailsInRedux(currentLabOrderId);
                
            }else{
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR});
            }
            setCancelOrderModalOpen(!isCancelOrderModalOpen);
        }).catch(function(error) {
            setLabOrderDetailLoading(false);
            setCancelOrderModalOpen(!isCancelOrderModalOpen);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR});
        });
    }
    const updateOrderDetailsInRedux=(orderId)=>{
        let labOrderInfoFromRedux=labOrderAction.getLabOrders();
        let labOrders = validate.isNotEmpty(labOrderInfoFromRedux.nonPersistLabOrders) ? labOrderInfoFromRedux.nonPersistLabOrders : labOrderInfoFromRedux.labOrders;
        let orderIndex;
        if(validate.isNotEmpty(labOrders)){
            labOrders.map((eachOrder,index)=>{
                if(eachOrder.orderId == orderId){
                    orderIndex= index;
                }
            })
        }
        let labOrderFound= labOrders[orderIndex];
        if(labOrderFound){
            labOrderFound.totalAmount = 0;
            labOrderFound.status = "C";
            labOrderFound.labOrderPatients.map(each => {
                each.labOrderItems.map(each => {
                    each.status = "C";
                })
            });
            labOrders.splice(orderIndex, 1, labOrderFound);
        }
        if(validate.isNotEmpty(labOrderInfoFromRedux.nonPersistLabOrders)){
            labOrderInfoFromRedux["nonPersistLabOrders"]=labOrders;
        }else{
            labOrderInfoFromRedux["labOrders"]=labOrders;
        }
        labOrderAction.saveLabOrders(labOrderInfoFromRedux);
        
    }
    

    const showCancelOrderConfirmation = () => {
        setCancelOrderModalOpen(!isCancelOrderModalOpen);
    }

    const downloadPatientLabReports = (orderId, patientId,collectionCenterId) => {
        if(!validate.isNumeric(orderId)) {
            setAlertInfo({ message: "Invalid Order", type: ALERT_TYPE_ERROR});
            return false;
        }
        if(!validate.isNumeric(patientId)) {
            setAlertInfo({ message: "Invalid Patient", type: ALERT_TYPE_ERROR});
            return false;
        }
        labOrderService.downloadPatientLabReports(orderId, patientId,collectionCenterId).then(response => {
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
                window.open(response.dataObject);
            } else {
                if(response.message=="REPORT_NOT_AVAILABLE"){
                    setAlertInfo({ message: "Reports not available for download,please try again late", type: ALERT_TYPE_ERROR });
                }else {
                    setAlertInfo({message:"unable to download report",type: ALERT_TYPE_ERROR});
                }
            }
        }).catch(function(error) {
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR});
        });
    }

    
    const getTextForAmount=()=>{
        if(labOrderDetail.status == "D" || (labOrderDetail.paymentType == "PAY_ONLINE" && labOrderDetail.gateWayStatus == "S")){
            return "Net Paid"
        }
        return "Net Payable";
    }

    return(
        <React.Fragment>
            { alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>}
            <React.Fragment>
                <section>
                    <div className="lab-orders">
                        <div className="header">
                            <p>
                                <button className='btn p-0' role="button" title="Back to My Lab Orders" onClick={()=>{props.history.push("/labOrders");LocalDB.setValue("fromLabOrderDetail", labOrderDetail.orderId);}}>
                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                        <g transform="translate(-48.941 -316.765)">
                                        <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"></rect>
                                        <path fill="#000000" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"></path>
                                        </g>
                                    </svg>
                                    Back to Lab Orders
                                </button>
                            </p>
                            {!isLabOrderDetailLoading && validate.isNotEmpty(labOrderDetail) && (validate.isNotEmpty(previousLabOrderId) || validate.isNotEmpty(nextLabOrderId)) &&
                                <div className="order-controls">
                                    <button role="button" title="Previous Order" className={"mr-2 btn p-0 my-0 btn-sm"+ (validate.isEmpty(previousLabOrderId) ? " disabled" : "")} onClick={() => getPreviousOrNextLabOrderDetail(previousLabOrderId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <g transform="translate(-868.477 786) rotate(-90)">
                                            <rect fill="none" width="24" height="24" transform="translate(762 868.477)"></rect>
                                            <path fill="#080808" d="M61.848,465.874l-5.541,5.541a1.256,1.256,0,1,0,1.776,1.776l4.653-4.64,4.655,4.655a1.261,1.261,0,0,0,2.149-.888,1.248,1.248,0,0,0-.373-.888l-5.543-5.556A1.26,1.26,0,0,0,61.848,465.874Z" transform="translate(711.498 410.651)"></path>
                                            </g>
                                        </svg>
                                        <span className="ml-2">Previous Order</span>
                                    </button>
                                    <button role="button" title="Next Order" className={"btn p-0 my-0 ml-2 btn-sm" + (validate.isEmpty(nextLabOrderId) ? " disabled" : "")} onClick={() => getPreviousOrNextLabOrderDetail(nextLabOrderId)}>
                                        <span className="mr-2">Next Order</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <g transform="translate(-906.838 786) rotate(-90)">
                                            <rect fill="none" width="24" height="24" transform="translate(762 906.838)"></rect>
                                            <path fill="#080808" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)"></path>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="test-order-detail">
                            {isLabOrderDetailLoading && <LabOrderDetailGhostImage/>}
                            {!isLabOrderDetailLoading && validate.isNotEmpty(labOrderDetail) &&
                                <React.Fragment>
                                    <div className="order-heading">
                                        <div>
                                            <h6 className={(labOrderDetail.status == "C" || (labOrderDetail.gateWayStatus== "F" && labOrderDetail.paymentType!='COSC')) ? "text-brand" : labOrderDetail.gateWayStatus == "I" ? "text-orange" : "text-success"}>
                                                {(labOrderDetail.status == "C" || labOrderDetail.gateWayStatus == "F" && labOrderDetail.paymentType!='COSC') ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g transform="translate(0 -0.384)">
                                                            <circle fill="#e71c37" cx="12" cy="12" r="12" transform="translate(0 0.384)"></circle>
                                                            <path fill="#fff" d="M6.156,13.156V7.844H.843a.844.844,0,0,1,0-1.687H6.156V.843a.844.844,0,0,1,1.688,0V6.156h5.313a.844.844,0,0,1,0,1.688H7.844v5.313a.844.844,0,0,1-1.687,0Z" transform="translate(11.899 2.383) rotate(45)"></path>
                                                        </g>
                                                    </svg> :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 23.999 24">
                                                        <g data-name="Group 14808" transform="translate(-1154 -448)">
                                                        <path id="Path_195" data-name="Path 195" d="M1786.571,36.242a12,12,0,1,1-12,12A12,12,0,0,1,1786.571,36.242Z" transform="translate(-620.571 411.758)" fill={labOrderDetail.gateWayStatus == "I" ? "#FC8019" : "#08CE73"}></path>
                                                        <path id="Path_3698" data-name="Path 3698" d="M1787.169,58.46l-.158.028c-.171-.053-.421-.093-.528-.241l-3.974-3.971a.7.7,0,0,1,.073-1.013.659.659,0,0,1,.987.076l3.458,3.311,9.46-9.42a.745.745,0,0,1,1.053-.018.794.794,0,0,1,.019,1.08l-10.024,9.935A.611.611,0,0,1,1787.169,58.46Z" transform="translate(-623.748 406.747)" fill="#fff" stroke="rgba(0,0,0,0)" strokeMiterlimit="10" stroke-width="1"></path>
                                                        </g>
                                                    </svg>
                                                }
                                                {getLabOrderDisplayStatus(labOrderDetail.status, false,labOrderDetail.paymentType == "COSC" ?  "" : labOrderDetail.gateWayStatus)}
                                            </h6>
                                        </div>
                                        <div>
                                            <small className="text-muted">Booked On <strong className="text-dark">{moment(new Date(labOrderDetail.dateCreated)).format("MMM DD, YYYY")}</strong></small>
                                            <span className="dot-separator text-dark"></span>
                                            <small className="text-muted">Total Amount <strong className="amount-text">&nbsp;<strong className="rupee text-dark">&#x20B9;</strong>{parseFloat(labOrderDetail.totalAmount).toFixed(2)}</strong></small>
                                            <span className="dot-separator text-dark"></span>
                                            <small><span className="text-secondary">Payment Type</span>&nbsp;
                                                <strong className="font-weight-bold text-dark">
                                                    {labOrderDetail.paymentType == "PAY_ONLINE" &&
                                                        <React.Fragment>
                                                            {validate.isNotEmpty(labOrderDetail.gateWayStatus) && labOrderDetail.gateWayStatus == "I" && "Online Awaited"}
                                                            {(validate.isEmpty(labOrderDetail.gateWayStatus) || labOrderDetail.gateWayStatus != "I") && "By Online"}
                                                        </React.Fragment>
                                                    }
                                                    {labOrderDetail.paymentType == "COSC" && "By Cash"}
                                                </strong>
                                            </small>
                                        </div>
                                    </div>
                                    <div className="order-id">
                                        <p>Order ID  <strong>{labOrderDetail.displayOrderId}</strong> </p>
                                        <div>
                                            {labOrderDetail.status === "I" && labOrderDetail.gateWayStatus === "F" && labOrderDetail.paymentType != "COSC" &&
                                                <a className="btn btn-link btn-sm" href="javascript:void(0);" title="Retry Payment" onClick={() => props.history.push(`${DIAGNOSTICS_URL_PREFIX}/labOrderRetryPayment/${labOrderDetail.orderId}`)}>Retry Payment</a>
                                            }
                                            {isLabOrderStatusAllowedForCancel(labOrderDetail.status) && 
                                                <a className="btn btn-link btn-sm" href="javascript:void(0)" onClick={() => showCancelOrderConfirmation()}>Cancel Order</a>
                                            }
                                            {labOrderDetail.status == 'D' && validate.isNotEmpty(labOrderDetail.labOrderPatients) && (labOrderDetail.labOrderPatients.length == 1) && 
                                                <a className="btn btn-link btn-sm" href="javascript:void(0)" onClick={() =>{printLabInvoice(labOrderDetail.orderId,labOrderDetail.labOrderPatients[0].patientId)}}>Print Invoice</a>
                                            }
                                            {labOrderDetail.status == 'D' && validate.isNotEmpty(labOrderDetail.labOrderPatients) && (labOrderDetail.labOrderPatients.length > 1) &&
                                                <UncontrolledDropdown className="d-inline-block lab-download-dropdown mr-n2">
                                                    <DropdownToggle color="white" className='btn btn-link'>
                                                        Print Invoice
                                                    </DropdownToggle>
                                                    <DropdownMenu className="w-100">
                                                        <span className="caret"></span>
                                                        {validate.isNotEmpty(labOrderDetail.labOrderPatients) && labOrderDetail.labOrderPatients.map(eachPatientDetail => {
                                                            return (
                                                                <DropdownItem disabled={!(validate.isNotEmpty(enabledDownloadReportForPatient) && enabledDownloadReportForPatient[eachPatientDetail.patientId])} className="text-truncate" title={eachPatientDetail.customerPatient.patientName} onClick={() =>{printLabInvoice(labOrderDetail.orderId,eachPatientDetail.patientId)}}>
                                                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18">
                                                                        <g transform="translate(-180.092 -387.452)">
                                                                            <rect fill="none" width="18" height="18" transform="translate(180.092 387.452)"/>
                                                                            <g transform="translate(181.25 387.452)">
                                                                                <path fill="#080808" d="M.559,17.834a.559.559,0,0,1,0-1.118H15.292a.559.559,0,0,1,0,1.118Zm7.329-3.311-.177-.036a.536.536,0,0,1-.179-.12L3.909,10.746A.558.558,0,0,1,4.7,9.956l2.668,2.668V.558a.558.558,0,0,1,1.117,0V12.624l2.669-2.668a.558.558,0,0,1,.79.789L8.32,14.366a.54.54,0,0,1-.18.12l-.175.036-.04.007Z"/>
                                                                            </g>
                                                                        </g>
                                                                    </svg>
                                                                    {eachPatientDetail.customerPatient.patientName}
                                                                </DropdownItem>
                                                            );
                                                        })}
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            }
                                            {labOrderDetail.status == 'D' && validate.isNotEmpty(labOrderDetail.labOrderPatients) && (labOrderDetail.labOrderPatients.length == 1) && 
                                                <React.Fragment>
                                                    {validate.isNotEmpty(enabledDownloadReportForPatient) && enabledDownloadReportForPatient[labOrderDetail.labOrderPatients[0].patientId] &&
                                                        <a className="btn btn-link btn-sm mr-n2 ml-2" href="javascript:void(0)" title="Download All Reports" onClick={() => downloadPatientLabReports(labOrderDetail.orderId, labOrderDetail.labOrderPatients[0].patientId, labOrderDetail.collectionCenterStoreId)}>Download All Reports</a>
                                                    }
                                                </React.Fragment>
                                            }
                                            {labOrderDetail.status == 'D' && validate.isNotEmpty(labOrderDetail.labOrderPatients) && (labOrderDetail.labOrderPatients.length > 1) &&
                                                <UncontrolledDropdown className="d-inline-block lab-download-dropdown mr-n2">
                                                    <DropdownToggle color="white" className='btn btn-link'>
                                                        Download All Reports
                                                    </DropdownToggle>
                                                    <DropdownMenu className="w-100">
                                                        <span className="caret"></span>
                                                        {validate.isNotEmpty(labOrderDetail.labOrderPatients) && labOrderDetail.labOrderPatients.map(eachPatientDetail => {
                                                            return (
                                                                <DropdownItem disabled={!(validate.isNotEmpty(enabledDownloadReportForPatient) && enabledDownloadReportForPatient[eachPatientDetail.patientId])} className="text-truncate" title={eachPatientDetail.customerPatient.patientName} onClick={() => downloadPatientLabReports(labOrderDetail.orderId, eachPatientDetail.patientId,labOrderDetail.collectionCenterStoreId)}>
                                                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18">
                                                                        <g transform="translate(-180.092 -387.452)">
                                                                            <rect fill="none" width="18" height="18" transform="translate(180.092 387.452)"/>
                                                                            <g transform="translate(181.25 387.452)">
                                                                                <path fill="#080808" d="M.559,17.834a.559.559,0,0,1,0-1.118H15.292a.559.559,0,0,1,0,1.118Zm7.329-3.311-.177-.036a.536.536,0,0,1-.179-.12L3.909,10.746A.558.558,0,0,1,4.7,9.956l2.668,2.668V.558a.558.558,0,0,1,1.117,0V12.624l2.669-2.668a.558.558,0,0,1,.79.789L8.32,14.366a.54.54,0,0,1-.18.12l-.175.036-.04.007Z"/>
                                                                            </g>
                                                                        </g>
                                                                    </svg>
                                                                    {eachPatientDetail.customerPatient.patientName}
                                                                </DropdownItem>
                                                            );
                                                        })}
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            }
                                            {isEligibleForHelp && <button role="button" className="btn btn-link btn-sm" onClick={() =>{toggleChat(getChatHeaderData("LAB_ORDER",labOrderDetail))}}>Need Help?</button>}
                                            {/* <a className="btn btn-link btn-sm" href="javascript:void(0)">Re-Order</a> */}
                                        </div>
                                    </div>
                                    {validate.isNotEmpty(labOrderDetail.labOrderPatients) && labOrderDetail.labOrderPatients.map((eachLabOrderPatient, patientIndex) => {
                                        return(eachLabOrderPatient && eachLabOrderPatient.customerPatient && eachLabOrderPatient.labOrderItems &&
                                            <React.Fragment key={eachLabOrderPatient.patientId}>
                                                <div className="lab-order-info">
                                                    <p>
                                                        <span>{eachLabOrderPatient.customerPatient.patientName}</span>
                                                        <span className="dot-separator text-dark"></span>
                                                        <span>{eachLabOrderPatient.customerPatient.dateOfBirth ? getDisplayableAge(eachLabOrderPatient.customerPatient.dateOfBirth) : (eachLabOrderPatient.customerPatient.age < 1 ? "< 1 Yrs" : eachLabOrderPatient.customerPatient.age + " Yrs")}
                                                            {(eachLabOrderPatient.customerPatient.gender === "M" ? " Male" : eachLabOrderPatient.customerPatient.gender === "F" ? " Female" : " Others")}</span>
                                                        <span className="dot-separator text-dark"></span>
                                                        <span>Dr {eachLabOrderPatient.customerPatient.doctorName}</span>
                                                    </p>
                                                    {validate.isNotEmpty(labOrderTimeSlot) &&
                                                        <div>
                                                            <p className="text-secondary font-weight-normal d-inline-block">
                                                                Slot&nbsp;<strong className="text-dark">{moment(new Date(labOrderTimeSlot.date)).format("MMM DD, YYYY")} ({validate.isNotEmpty(labOrderTimeSlot.labTimeSlot) ? (labOrderTimeSlot.labTimeSlot.name) : "-"})</strong>
                                                            </p>
                                                            {/* {validate.isNotEmpty(enabledDownloadReportForPatient) && enabledDownloadReportForPatient[eachLabOrderPatient.patientId] &&
                                                                <a className="btn btn-link btn-sm mr-n2 ml-2" href="javascript:void(0)" title="Download All Reports" onClick={() => downloadPatientLabReports(labOrderDetail.orderId, eachLabOrderPatient.patientId,labOrderDetail.collectionCenterStoreId)}>Download All Reports</a>
                                                            } */}
                                                            {/* <a href="javascript:void(0)" className="btn btn-link ml-3 pr-3" title="Share Report">Share Report</a> */}
                                                        </div>
                                                    }
                                                </div>
                                                {validate.isNotEmpty(eachLabOrderPatient.labOrderItems) &&
                                                    <table className="table lab-order-table border-bottom-0">
                                                        <thead>
                                                            <tr>
                                                                <th className="test-title-width">Tests</th>
                                                                <th className="status-width">Status</th>
                                                                <th className="text-right price-width pr-3">Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {eachLabOrderPatient.labOrderItems.map((eachLabOrderItem, orderItemIndex) => {
                                                                return(eachLabOrderItem &&
                                                                    <React.Fragment key={eachLabOrderItem.orderItemId}>
                                                                        {eachLabOrderItem.profile &&
                                                                            <React.Fragment>
                                                                                {eachLabOrderItem.profileTestSno == 1 &&
                                                                                    <tr>
                                                                                        <td className="test-title-width package-row">
                                                                                            {!collapseProfiles[(eachLabOrderPatient.patientId +"_"+ eachLabOrderItem.profileCode)] &&
                                                                                                <button role="button" title="" className="btn btn-outline-secondary btn-sm collapse-toggle" onClick={() => changeCollapseInfoForProfile((eachLabOrderPatient.patientId +"_"+ eachLabOrderItem.profileCode), true)}>
                                                                                                    <svg className="minus-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18">
                                                                                                        <rect fill="none" width="18" height="18" transform="translate(0 0)"/>
                                                                                                        <rect fill="#080808" width="18" height="1.431" rx="0.636" transform="translate(0 8.285)"/>
                                                                                                    </svg>
                                                                                                </button>
                                                                                            }
                                                                                            {collapseProfiles[(eachLabOrderPatient.patientId +"_"+ eachLabOrderItem.profileCode)] &&
                                                                                                <button role="button" title="" className="btn btn-outline-secondary btn-sm collapse-toggle" onClick={() => changeCollapseInfoForProfile((eachLabOrderPatient.patientId +"_"+ eachLabOrderItem.profileCode), false)}>
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18">
                                                                                                        <rect fill="none" width="18" height="18"/>
                                                                                                        <path fill="#080808" d="M69.226,601.175H61.657v-7.569a.716.716,0,1,0-1.431,0v7.569H52.657a.716.716,0,1,0,0,1.431h7.569v7.569a.716.716,0,0,0,1.431,0v-7.569h7.569a.716.716,0,0,0,0-1.431Z" transform="translate(-51.941 -592.89)"/>
                                                                                                    </svg>
                                                                                                </button>
                                                                                            }
                                                                                            {eachLabOrderItem.profileName}
                                                                                            {validate.isNotEmpty(eachLabOrderItem.couponCode) && <p className="text-success font-weight-normal coupon-text small mb-0 pl-5 ml-n2">Coupon Applied</p>}
                                                                                        </td>
                                                                                        <td className="text-left status-width" nowrap="true"></td>
                                                                                        <td className="text-right price-width pr-3">
                                                                                            {(parseFloat(eachLabOrderItem.mrp) > parseFloat(eachLabOrderItem.price)) &&
                                                                                                <React.Fragment>
                                                                                                    <strong className="rupee text-dark">&#x20B9;</strong><del className="mr-2">{parseFloat(eachLabOrderItem.mrp).toFixed(2)}</del>&nbsp;
                                                                                                </React.Fragment>
                                                                                            }
                                                                                            <strong className="rupee text-dark">&#x20B9;</strong><strong>{parseFloat(eachLabOrderItem.price).toFixed(2)}</strong>
                                                                                        </td>
                                                                                    </tr>
                                                                                }
                                                                                <tr className={collapseProfiles[(eachLabOrderPatient.patientId +"_"+ eachLabOrderItem.profileCode)] ? "d-none" : ""}>
                                                                                    <td className="test-title-width package-item-row">{eachLabOrderItem.testName}</td>
                                                                                    <td className="text-left status-width text-secondary">
                                                                                        {eachLabOrderItem.status == 'D' && <a className="btn text-primary btn-sm ml-n2" href="javascript:void(0)" title="Print Report" onClick={() =>{printIndividualReport(labOrderDetail.orderId,eachLabOrderPatient.patientId,eachLabOrderItem.testId)}}>Print Report</a>}
                                                                                        {eachLabOrderItem.status != 'D' && getLabOrderDisplayStatus(eachLabOrderItem.status, true)}
                                                                                    </td>
                                                                                    <td className="price-width"></td>
                                                                                </tr>
                                                                            </React.Fragment>
                                                                        }
                                                                        {!eachLabOrderItem.profile &&
                                                                            <tr>
                                                                                <td className="test-title-width">
                                                                                    {eachLabOrderItem.testName}
                                                                                    {validate.isNotEmpty(eachLabOrderItem.couponCode) && <p className="text-success font-weight-normal coupon-text small mb-0">Coupon Applied</p>}
                                                                                </td>
                                                                                <td className="text-left status-width text-secondary">
                                                                                    {eachLabOrderItem.status == 'D' && <a className="btn text-primary btn-sm ml-n2" href="javascript:void(0)" title="Print Report" onClick={() => {printIndividualReport(labOrderDetail.orderId,eachLabOrderPatient.patientId,eachLabOrderItem.testId)}}>Print Report</a>}
                                                                                    {eachLabOrderItem.status != 'D' && getLabOrderDisplayStatus(eachLabOrderItem.status, true)}
                                                                                </td>
                                                                                <td className="text-right price-width">
                                                                                    {(parseFloat(eachLabOrderItem.mrp) > parseFloat(eachLabOrderItem.price)) &&
                                                                                        <React.Fragment>
                                                                                            <strong className="rupee text-dark">&#x20B9;</strong><del className="mr-2">{parseFloat(eachLabOrderItem.mrp).toFixed(2)}</del>
                                                                                        </React.Fragment>
                                                                                    }
                                                                                    <strong className="rupee text-dark">&#x20B9;</strong><strong>{parseFloat(eachLabOrderItem.price).toFixed(2)}</strong>
                                                                                </td>
                                                                            </tr>
                                                                        }
                                                                        {(parseInt(patientIndex) == (parseInt(labOrderDetail.labOrderPatients.length)-1)) && (parseInt(orderItemIndex) == (parseInt(eachLabOrderPatient.labOrderItems.length)-1)) &&
                                                                            <React.Fragment>
                                                                                <tr className="border-top">
                                                                                    <td className="test-title-width pt-2"></td>
                                                                                    <td className="text-left status-width pt-2"><strong>Sub Amount:</strong></td>
                                                                                    <td nowrap="true" className="price-width pt-2">
                                                                                        <strong className="rupee text-dark">&#x20B9;</strong><strong>{parseFloat(labOrderDetail.totalPrice).toFixed(2)}</strong>
                                                                                    </td>
                                                                                </tr>
                                                                                {/* <tr>
                                                                                    <td className="test-title-width"></td>
                                                                                    <td className="text-left status-width"><strong>Coupon Applied (<span className="text-success">TEST20</span>)</strong></td>
                                                                                    <td nowrap="true" className="price-width text-success">
                                                                                        - <strong className="rupee text-success">&#x20B9;</strong><strong>00.00</strong>
                                                                                    </td>
                                                                                </tr> */}
                                                                                {validate.isNotEmpty(labOrderDetail.totalDiscount) && (parseFloat(labOrderDetail.totalDiscount) > 0) &&
                                                                                    <tr>
                                                                                        <td className="test-title-width"></td>
                                                                                        <td className="text-left status-width"><strong>Discount Amount:</strong></td>
                                                                                        <td nowrap="true" className="price-width">
                                                                                            - <strong className="rupee text-dark">&#x20B9;</strong><strong>{parseFloat(labOrderDetail.totalDiscount).toFixed(2)}</strong>
                                                                                        </td>
                                                                                    </tr>
                                                                                }
                                                                                {validate.isNotEmpty(labOrderDetail.mdxPointsWorth) && parseFloat(labOrderDetail.mdxPointsWorth) > 0 &&
                                                                                    <tr>
                                                                                        <td className="test-title-width"></td>
                                                                                        <td className="text-left status-width"><strong>MDx Wallet Discount:</strong></td>
                                                                                        <td nowrap="true" className="price-width">
                                                                                            - <strong className="rupee text-dark">&#x20B9;</strong><strong>{parseFloat(labOrderDetail.mdxPointsWorth).toFixed(2)}</strong>
                                                                                        </td>
                                                                                    </tr>
                                                                                }
                                                                                {parseFloat(labOrderDetail.sampleCollectionChargesTotal)!= 0 && <tr>
                                                                                    <td className="test-title-width"></td>
                                                                                    <td className="text-left status-width"><strong>Collection Charges:</strong></td>
                                                                                    <td nowrap="true" className="price-width">
                                                                                        {validate.isNotEmpty(labOrderDetail.sampleCollectionChargesDiscountCouponCode) ? labOrderDetail.sampleCollectionChargesDiscountPercentage != 100 ? <><del className="rupee text-dark">&#x20B9;{parseFloat(labOrderDetail.sampleCollectionChargesTotal).toFixed(2)}</del>  <strong className="rupee text-dark">&#x20B9;</strong><strong>{parseFloat(labOrderDetail.sampleCollectionChargesTotal - labOrderDetail.sampleCollectionChargesDiscountAmount).toFixed(2)}</strong></> : <><del className="rupee text-dark">&#x20B9;{parseFloat(labOrderDetail.sampleCollectionChargesTotal).toFixed(2)}</del> <strong>Free</strong> </> : <> <strong className="rupee text-dark">&#x20B9;</strong><strong>{parseFloat(labOrderDetail.sampleCollectionChargesTotal).toFixed(2)}</strong></>}
                                                                                    </td>
                                                                                </tr>}
                                                                                {parseFloat(labOrderDetail.reportDeliveryChargesTotal)!= 0 && <tr>
                                                                                    <td className="test-title-width pb-2"></td>
                                                                                    <td className="text-left status-width pb-2"><strong>Report Charges:</strong></td>
                                                                                    <td nowrap="true" className="price-width pb-2">
                                                                                        {validate.isNotEmpty(labOrderDetail.reportDeliveryChargesDiscountCouponCode) ? labOrderDetail.reportDeliveryChargesDiscountPercentage !=100? <><del className="rupee text-dark">&#x20B9;{labOrderDetail.reportDeliveryChargesTotal}</del> <strong className="rupee text-dark">&#x20B9;</strong><strong>{parseFloat(labOrderDetail.reportDeliveryChargesTotal - labOrderDetail.reportDeliveryChargesDiscountAmount).toFixed(2)}</strong></>  :<><del className="rupee text-dark">&#x20B9;{labOrderDetail.reportDeliveryChargesTotal}</del><strong> Free</strong></>: <><strong className="rupee text-dark">&#x20B9;</strong><strong>{parseFloat(labOrderDetail.reportDeliveryChargesTotal).toFixed(2)}</strong></>}
                                                                                    </td>
                                                                                </tr>}
                                                                                <tr className="border-top">
                                                                                    <td className="test-title-width"></td>
                                                                                    <td className="text-left status-width"><strong>{`${getTextForAmount()}:`}</strong></td>
                                                                                    <td nowrap="true" className="price-width">
                                                                                        <strong className="rupee text-dark">&#x20B9;</strong><strong>{parseFloat(labOrderDetail.netCashToBeCollected).toFixed(2)}</strong>
                                                                                    </td>
                                                                                </tr>
                                                                            </React.Fragment>
                                                                        }
                                                                    </React.Fragment>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                }
                                            </React.Fragment>
                                        );
                                    })}
                                    <div className="row mx-0 mb-3 order-delivery-details">
                                        {validate.isNotEmpty(pathLabStore) &&
                                            <div className="col-lg-4 col-md-4">
                                                <strong className="d-block mb-2">Give Sample at Collection Center:</strong>
                                                <ShowPickUpStore pickStoreName={pathLabStore.name}
                                                    pickUpAddress={pathLabStore.address +", "+ pathLabStore.city +", "+ pathLabStore.state}
                                                    locationLatLong={pathLabStore.locationLatLong}
                                                    phoneNumber={pathLabStore.phoneNumber}
                                                    isSmallAddressRequired={false}
                                                />
                                            </div>
                                        }
                                        {validate.isEmpty(pathLabStore) && validate.isNotEmpty(agentInfo) && validate.isNotEmpty(agentInfo[labOrderTimeSlot.agentId]) && isLabOrderStatusAllowedToDisplayAgent(labOrderDetail.status) &&
                                            <div className="col-lg-4 col-md-4">
                                                <strong className="d-block mb-2">Home Sample Pickup:</strong>
                                                <p>Name: <strong>{agentInfo[labOrderTimeSlot.agentId].name}</strong></p>
                                                <p>Agent ID: {agentInfo[labOrderTimeSlot.agentId].empId}</p>
                                                <p>Mobile: <a className="text-primary" title="Click to call" href={"tel:"+ agentInfo[labOrderTimeSlot.agentId].phone}>{agentInfo[labOrderTimeSlot.agentId].phone}</a></p>
                                            </div>
                                        }
                                        <div className="col-lg-4 col-md-4">
                                            <strong className="d-block mb-2">Order Information:</strong>
                                            <p>Status: <strong>{getLabOrderDisplayStatus(labOrderDetail.status, false,labOrderDetail.paymentType == 'COSC' ? "" :  labOrderDetail.gateWayStatus)}</strong></p>
                                            <p>Collection Type: <strong>{getLabOrderVisitType(labOrderDetail.visitType)}</strong></p>
                                            <p>Payment Type: <strong>{getLabOrderPaymentType(labOrderDetail.paymentType)}</strong></p>
                                            <p>Date: {moment(new Date(labOrderDetail.dateCreated)).format("MMM DD, YYYY")}</p>
                                            {/* { isNoteAllowedToDisplay(labOrderDetail.status) && <div className="footer-alert alert alert-warning" role="alert">
                                                Note: No special preparation required
                                            </div>} */}
                                        </div>
                                        {validate.isNotEmpty(labOrderDetail.labOrderAddress) &&
                                            <div className="col-lg-4 col-md-4">
                                                <strong className="d-block mb-2">Customer Information:</strong>
                                                {validate.isNotEmpty(labOrderDetail.labOrderAddress.firstName) && <p>Name: <strong>{labOrderDetail.labOrderAddress.firstName + (validate.isNotEmpty(labOrderDetail.labOrderAddress.lastName) ? (" "+ labOrderDetail.labOrderAddress.lastName) : "")}</strong></p>}
                                                {<address className="no-select">
                                                    Address: {labOrderDetail.labOrderAddress.addressLine1?`${labOrderDetail.labOrderAddress.addressLine1},`:""}{labOrderDetail.labOrderAddress.addressLine2?`${labOrderDetail.labOrderAddress.addressLine2},`:""}{labOrderDetail.labOrderAddress.city?`${labOrderDetail.labOrderAddress.city},`:""}{labOrderDetail.labOrderAddress.state?`${labOrderDetail.labOrderAddress.state},`:""}{labOrderDetail.labOrderAddress.pincode?`${labOrderDetail.labOrderAddress.pincode}`:""}
                                                </address>}
                                                {validate.isNotEmpty(labOrderDetail.email) && <p>Email: {labOrderDetail.email}</p>}
                                                {(validate.isNotEmpty(labOrderDetail.labOrderAddress.mobileNo) || validate.isNotEmpty(labOrderDetail.mobile)) && <p>Mobile: {validate.isNotEmpty(labOrderDetail.labOrderAddress.mobileNo) ? labOrderDetail.labOrderAddress.mobileNo : labOrderDetail.mobile}</p>}
                                            </div>
                                        }
                                    </div>

                                    {(validate.isNotEmpty(labOrderPaymentDetails)) &&
                                        <React.Fragment>
                                            <div className="tab-section">
                                                <ul className="nav nav-pills nav-justified" id="pills-tab" role="tablist">
                                                    {validate.isNotEmpty(labOrderPaymentDetails) &&
                                                        <li className="nav-item">
                                                            <a className={"nav-link py-3 "+ (activeTabName == "PaymentDetails" ? "active":"")} href="javascript:void(0)" id="pills-payment-details-tab" data-toggle="pill"  role="tab" aria-controls="pills-payment-details" onClick={() => {setActiveTabName("PaymentDetails");}} aria-selected="PaymentDetails">Payment Details</a>
                                                        </li>
                                                    }
                                                </ul>
                                                <div className="tab-content">
                                                    {activeTabName == "PaymentDetails" &&
                                                        <React.Fragment>
                                                            <div className="tab-pane pills-payment-details fade show active" id="pills-payment-details" role="tabpanel" aria-labelledby="pills-payment-details-tab">
                                                                <div className="border rounded mb-3">
                                                                    <table className="table mb-0 border-0">
                                                                    <thead className="thead-light">
                                                                        <tr>
                                                                            <th scope="col" nowrap="true">Transaction No.</th>
                                                                            <th scope="col" nowrap="true">Date & Time</th>
                                                                            <th scope="col" nowrap="true">Amount</th>
                                                                            <th scope="col" nowrap="true">Mode</th>
                                                                            <th scope="col" nowrap="true">Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {labOrderPaymentDetails.map(eachPaymentDetail => {
                                                                            return(eachPaymentDetail &&
                                                                                <React.Fragment key={eachPaymentDetail.txnNumber}>
                                                                                    <tr >
                                                                                        <td nowrap="true">{validate.isNotEmpty(eachPaymentDetail.txnNumber) ? eachPaymentDetail.txnNumber : "N/A"}</td>
                                                                                        <td nowrap="true">{moment(new Date(eachPaymentDetail.date)).format("MMM DD, YYYY HH:mm:ss")}</td>
                                                                                        <td nowrap="true"><strong className="rupee">&#x20B9;</strong>{parseFloat(eachPaymentDetail.amount).toFixed(2)}</td>
                                                                                        <td nowrap="true">{getPaymentDisplayMode(eachPaymentDetail.mode)}</td>
                                                                                        <td nowrap="true">{getPaymentDisplayStatus(eachPaymentDetail.status)}</td>
                                                                                    </tr>
                                                                                </React.Fragment>
                                                                            );
                                                                        })}
                                                                        {validate.isNotEmpty(labOrderDetail.labOrderRefunds) && labOrderDetail.labOrderRefunds.map(eachLabOrderRefund => {
                                                                        refundCollectionCharges = eachLabOrderRefund.collectionCharges;
                                                                        refundReportCharges = eachLabOrderRefund.deliveryTypeAmount;
                                                                        return(eachLabOrderRefund &&
                                                                                <React.Fragment key={eachLabOrderRefund.refundId}>
                                                                                    {eachLabOrderRefund.labOrderPaymentDetail.map(eachPaymentDetail => {
                                                                                        if(eachPaymentDetail && (validate.isEmpty(eachPaymentDetail.txnNumber) || refundTransactionNo != eachPaymentDetail.txnNumber)) {
                                                                                            refundTransactionNo = eachPaymentDetail.txnNumber;
                                                                                            return(
                                                                                                <React.Fragment key={eachPaymentDetail.refundId}>
                                                                                                    <tr >
                                                                                                        <td nowrap="true">{validate.isNotEmpty(eachPaymentDetail.txnNumber) ? eachPaymentDetail.txnNumber : "N/A"}</td>
                                                                                                        <td nowrap="true">{moment(new Date(eachPaymentDetail.date)).format("MMM DD, YYYY HH:mm:ss")}</td>
                                                                                                        <td nowrap="true"><strong className="rupee">&#x20B9;</strong>{parseFloat(eachPaymentDetail.amount).toFixed(2)}</td>
                                                                                                        <td nowrap="true">{getPaymentDisplayMode(eachPaymentDetail.mode)}</td>
                                                                                                        <td nowrap="true">{getPaymentDisplayStatus(eachPaymentDetail.status)}</td>
                                                                                                    </tr>
                                                                                                </React.Fragment>
                                                                                            );
                                                                                        } 
                                                                                    })}
                                                                                </React.Fragment>
                                                                            );
                                                                        })}
                                                                    </tbody>
                                                                    </table>
                                                                </div>
                                                                {/* refund table start */}
                                                                {validate.isNotEmpty(labOrderDetail.labOrderRefunds) &&
                                                                    <div className="border rounded mb-3">
                                                                        <table className="table mb-0 border-0">
                                                                            <thead className="thead-light">
                                                                                <tr>
                                                                                    <th scope="col" nowrap="true">Refund ID</th>
                                                                                    <th scope="col" nowrap="true">Test Name</th>
                                                                                    <th scope="col" nowrap="true">Amount</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {labOrderDetail.labOrderRefunds.map((eachLabOrderRefund) => {
                                                                                    return(
                                                                                        <React.Fragment key={eachLabOrderRefund.refundId}>
                                                                                            {eachLabOrderRefund.labOrderRefundItems.map((eachRefundItem) => {
                                                                                                return (
                                                                                                    <tr key={eachRefundItem.orderItemId}>
                                                                                                        <td nowrap="true">{eachRefundItem.refundId}</td>
                                                                                                        <td>{validate.isNotEmpty(eachRefundItem.profileName) ? eachRefundItem.profileName : eachRefundItem.testName}</td>
                                                                                                        <td nowrap="true"><strong className="rupee">&#x20B9;</strong> {parseFloat(eachRefundItem.amount).toFixed(2)} </td>
                                                                                                    </tr>
                                                                                                );
                                                                                            })}
                                                                                        </React.Fragment>
                                                                                    );
                                                                                })}
                                                                                {validate.isNotEmpty(refundCollectionCharges) && parseFloat(refundCollectionCharges)>0 &&
                                                                                    <tr class="border-top">
                                                                                        <td nowrap="true" className="text-right" colSpan="2">Collection Charges</td>
                                                                                        <td nowrap="true"><strong class="rupee">&#x20B9;</strong> <strong>{parseFloat(refundCollectionCharges).toFixed(2)}</strong></td>
                                                                                    </tr>
                                                                                }
                                                                                {validate.isNotEmpty(refundReportCharges) && parseFloat(refundReportCharges)>0 &&
                                                                                    <tr class="border-top">
                                                                                        <td nowrap="true" className="text-right" colSpan="2">Report Charges</td>
                                                                                        <td nowrap="true"><strong class="rupee">&#x20B9;</strong> <strong>{parseFloat(refundReportCharges).toFixed(2)}</strong></td>
                                                                                    </tr>
                                                                                }
                                                                            
                                                                                <tr class="border-top">
                                                                                    <td nowrap="true" className="text-right" colSpan="2">Total Refund</td>
                                                                                    <td nowrap="true"><strong class="rupee">&#x20B9;</strong> <strong>{parseFloat(totalRefundAmount).toFixed(2)}</strong></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </React.Fragment>
                                                    }
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    }
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </section>
                
                {isCancelOrderModalOpen && <LabCancelOrder modal={isCancelOrderModalOpen} toggle={setCancelOrderModalOpen} cancelOrder={cancelOrder}/>}
                {isEligibleForHelp && <ChatModal chatHeaderDetails={chatHeaderDetails} isModelOpen={startChat} toggleChat={toggleChat} eventType={"LAB_ORDER_CHAT"} ></ChatModal>}
            </React.Fragment>
        </React.Fragment>
    );
}
export default LabOrderDetail;
