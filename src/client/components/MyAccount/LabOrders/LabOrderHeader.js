import React, {useEffect, useState} from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Validate from '../../../helpers/Validate';
import moment from "moment";
import LabCancelOrder from '../LabOrders/LabCancelOrder';
import { getLabOrderDisplayStatus, isLabOrderStatusAllowedForCancel, isLabOrderStatusAllowedToDisplayAgent, getLabOrderVisitType, isNoteAllowedToDisplay,getLabOrderPaymentTypeFromEnum } from './../../../helpers/LabOrderHelper';
import LabOrderService from '../../../services/LabOrderService';
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '../../Common/Alert';
import CONFIG from '../../../constants/ServerConfig';
import { getChatHeaderData } from '../../Chat/Common/ChatHelper';
import { getDisplayableAge } from '../../../helpers/CommonUtil';
import LocalDB from '../../../DataBase/LocalDB';

const LabOrderHeader =(props) => {
    
    const validate = Validate();
    const labOrder = props.labOrder;
    const agentsInfo = props.agentsInfo;
    let agentId = null;
    const [isCancelOrderModalOpen,setCancelOrderModalOpen] =  useState(false);
    const [orderToBeCancel,setOrderToBeCancel] = useState("");
    const [isOrderHeaderLoading, setOrderHeaderLoading] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const labOrderService = LabOrderService();
    let profileTestItems = [];
    let profileTestIds = [];
    const cancelOrder = (cancelReason) => {
        if(validate.isEmpty(cancelReason)) {
            setAlertInfo({ message: "ReasonReason is required to cancel Lab Order", type: ALERT_TYPE_ERROR });
        }
        setOrderHeaderLoading(true);
        labOrderService.labCancelOrder(orderToBeCancel, cancelReason).then(response => {
            setOrderHeaderLoading(false);
            if(validate.isNotEmpty(response) && response.statusCode == "SUCCESS"){
                setAlertInfo({ message: response.dataObject, type: ALERT_TYPE_SUCCESS });
                props.getLabOrders(props.includeCanceled,1);
            }else{
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
                console.log(response.message);
            }
            setCancelOrderModalOpen(!isCancelOrderModalOpen);
            setOrderToBeCancel("");
        }).catch(function(error) {
            console.log(error);
            setOrderHeaderLoading(false);
            setCancelOrderModalOpen(!isCancelOrderModalOpen);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
        });  
    }

    const showCancelOrderConfirmation = (orderId) =>{
        setCancelOrderModalOpen(!isCancelOrderModalOpen);
        setOrderToBeCancel(orderId);
    }

    const goToOrderView = () => {
        window.location.href = CONFIG.REDIRECT_HOME_URL + "labOrderDetail/"+labOrder.orderId;
    }

    const printIndividualReport=(orderId,patientId,testId)=>{
        let token_from_LocalStorage = LocalDB.getValue("SESSIONID");
        window.open(`${CONFIG.REDIRECT_HOME_URL}labOrderHistory/printIndividualReport?orderId=${orderId}&patientId=${patientId}&testId=${testId}&tokenId=${token_from_LocalStorage}`);
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

    return(
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <div className="card">
                <div className="card-header pl-3 border-bottom">
                    <div>
                        {(labOrder.status == "C" || labOrder.gateWayStatus == "F" && labOrder.paymentType!='COSC') ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g transform="translate(0 -0.384)">
                                    <circle fill="#e71c37" cx="12" cy="12" r="12" transform="translate(0 0.384)"></circle>
                                    <path fill="#fff" d="M6.156,13.156V7.844H.843a.844.844,0,0,1,0-1.687H6.156V.843a.844.844,0,0,1,1.688,0V6.156h5.313a.844.844,0,0,1,0,1.688H7.844v5.313a.844.844,0,0,1-1.687,0Z" transform="translate(11.899 2.383) rotate(45)"></path>
                                </g>
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 23.999 24">
                                <g data-name="Group 14808" transform="translate(-1154 -448)">
                                <path id="Path_195" data-name="Path 195" d="M1786.571,36.242a12,12,0,1,1-12,12A12,12,0,0,1,1786.571,36.242Z" transform="translate(-620.571 411.758)" fill={labOrder.gateWayStatus == "I" ? "#FC8019" : "#08CE73"}></path>
                                <path id="Path_3698" data-name="Path 3698" d="M1787.169,58.46l-.158.028c-.171-.053-.421-.093-.528-.241l-3.974-3.971a.7.7,0,0,1,.073-1.013.659.659,0,0,1,.987.076l3.458,3.311,9.46-9.42a.745.745,0,0,1,1.053-.018.794.794,0,0,1,.019,1.08l-10.024,9.935A.611.611,0,0,1,1787.169,58.46Z" transform="translate(-623.748 406.747)" fill="#fff" stroke="rgba(0,0,0,0)" strokeMiterlimit="10" stroke-width="1"></path>
                                </g>
                            </svg>
                        }
                        <span className={"ml-2 font-weight-bold "+ ((labOrder.status == "C" || labOrder.gateWayStatus == "F" && labOrder.paymentType!='COSC')? "text-brand" : labOrder.gateWayStatus == "I" ? "text-orange" : "text-success")}>{getLabOrderDisplayStatus(labOrder.status, false, labOrder.paymentType == 'COSC' ? "" : labOrder.gateWayStatus)}</span>
                        <span className="dot-separator text-dark"></span>
                        <div>
                            <small className="text-muted mr-2">Order ID</small>
                            <strong>{labOrder.displayOrderId}</strong>
                        </div>
                    </div>
                    <div>
                        <div className="text-left" style={{ "line-height": "initial" }}>
                            <small className="text-muted">Booked On</small>
                            <strong className="text-dark d-flex"> {moment(new Date(labOrder.dateCreated)).format("MMM DD, YYYY")}</strong>
                        </div>
                        <span className="dot-separator text-dark"></span>
                        <div className="text-left" style={{ "line-height": "initial" }}>
                            <small className="text-muted">Total Amount</small>
                            <strong className="text-dark d-flex">
                            <span class="rupee">₹</span>
                                {Number.parseFloat(labOrder.totalAmount).toFixed(2)}
                            </strong>
                        </div>
                        {((labOrder.totalAmount-labOrder.mdxPointsWorth) !== labOrder.totalAmount) && 
                        <React.Fragment>
                        <span className="dot-separator text-dark"></span>
                        <div className="text-left" style={{ "line-height": "initial" }}>
                            <small className="text-muted">Net Payable</small>
                            <strong className="text-dark d-flex">
                            <span class="rupee">₹</span>
                                {Number.parseFloat(labOrder.totalAmount-labOrder.mdxPointsWorth).toFixed(2)}
                            </strong>
                        </div>
                        </React.Fragment>
                        }
                        {(labOrder.totalAmount-labOrder.mdxPointsWorth) !=0 &&
                        <React.Fragment>
                        <span className="dot-separator text-dark"></span>
                        <div className="text-left" style={{ "line-height": "initial" }}>
                            <small className="text-muted">Payment Type</small>&nbsp;
                            <strong className="text-dark d-flex">
                                {getLabOrderPaymentTypeFromEnum(labOrder.paymentType) == "O" &&
                                    <React.Fragment>
                                        {validate.isNotEmpty(labOrder.gateWayStatus) && labOrder.gateWayStatus == "I" && "Online Awaited"}
                                        {(validate.isEmpty(labOrder.gateWayStatus) || labOrder.gateWayStatus != "I") && "By Online"}
                                    </React.Fragment>
                                }
                                {getLabOrderPaymentTypeFromEnum(labOrder.paymentType) == "C" && "By Cash"}
                            </strong>
                        </div>
                        </React.Fragment>}
                    </div>
                </div>
                <div className="card-body pt-0">
                    {validate.isNotEmpty(labOrder.labOrderPatients) && labOrder.labOrderPatients.map(eachPatientDetail =>{
                        agentId = validate.isNotEmpty(eachPatientDetail.labOrderItems[0].labOrderItemSlot.agentId) ? eachPatientDetail.labOrderItems[0].labOrderItemSlot.agentId : null;
                        return (<React.Fragment key={eachPatientDetail.patientId}>
                            <div className="order-info lab-order-info mb-2">
                                <p>
                                    <span>{eachPatientDetail.customerPatient.patientName}</span>
                                    <span className="dot-separator text-dark"></span>
                                    <span>{eachPatientDetail.customerPatient.dateOfBirth ? getDisplayableAge(eachPatientDetail.customerPatient.dateOfBirth) : (eachPatientDetail.customerPatient.age < 1 ? "< 1 Yrs" : eachPatientDetail.customerPatient.age + " Yrs")} / {"M" == eachPatientDetail.customerPatient.gender ? "Male" : "F" == eachPatientDetail.customerPatient.gender ? "Female" : "Others"}</span>
                                    <span className="dot-separator text-dark"></span>
                                    <span>Dr {eachPatientDetail.labOrderItems[0].docName}</span>
                                </p>
                                <div>
                                    <p className="text-secondary font-weight-normal d-inline-block">
                                        Slot&nbsp;<strong className="text-dark">{moment(new Date(eachPatientDetail.labOrderItems[0].labOrderItemSlot.date)).format("MMM DD, YYYY")} ({ validate.isNotEmpty(eachPatientDetail.labOrderItems[0].labOrderItemSlot.labTimeSlot) ? (eachPatientDetail.labOrderItems[0].labOrderItemSlot.labTimeSlot.name) : "-" })</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="test-details">
                            {validate.isNotEmpty(eachPatientDetail.labOrderItems) && eachPatientDetail.labOrderItems.map(eachLabItem => {
                                    if((eachLabItem.profile)) {
                                        profileTestIds.push(eachLabItem.testId);
                                    }

                                })}
                                {validate.isNotEmpty(eachPatientDetail.labOrderItems) && eachPatientDetail.labOrderItems.map(eachLabItem => {
                                    let testName = null;
                                    if(eachLabItem.profile && validate.isNotEmpty(profileTestItems) && profileTestItems.includes((eachPatientDetail.patientId +"_"+eachLabItem.profileCode))) {
                                        testName = null;
                                    }
                                    if((validate.isEmpty(profileTestItems) && eachLabItem.profile) || (eachLabItem.profile && !profileTestItems.includes((eachPatientDetail.patientId +"_"+eachLabItem.profileCode)))) {
                                        testName = eachLabItem.profileName;
                                        profileTestItems.push(eachPatientDetail.patientId +"_"+eachLabItem.profileCode);
                                    }
                                    if(!eachLabItem.profile) {
                                        testName = eachLabItem.testName;
                                    }
                                    return(validate.isNotEmpty(testName) && <React.Fragment key={eachLabItem.orderItemId}>
                                        <p>
                                            <span>{testName}
                                            {/* {validate.isNotEmpty(eachLabItem.couponCode) && <React.Fragment><span className="text-success d-block mt-n2 small">Coupon Applied</span></React.Fragment>} */}
                                            </span>
                                            <span className="report-text">
                                                {eachLabItem.status == 'D' && <a className="btn text-primary btn-sm mr-n2" href="javascript:void(0)" title="Print Report" onClick={() =>{printIndividualReport(labOrder.orderId,eachPatientDetail.patientId,eachLabItem.profile?profileTestIds.join(","):eachLabItem.testId)}}>Print Report</a>}
                                                {eachLabItem.status != 'D' && getLabOrderDisplayStatus(eachLabItem.status, true)}
                                            </span>
                                        </p>
                                    </React.Fragment>)
                                })}
                                
                                
                            </div>
                        </React.Fragment>)
                    })
                    }
                    <hr className="mx-n3 solid mt-3 mb-0 border-bottom-0" />
                    <div className="mx-n3 test-options py-1">
                        {labOrder.visitType == "HOME" && 
                            <span className={isLabOrderStatusAllowedToDisplayAgent(labOrder.status) ? "text-muted ml-3" : "text-dark ml-3" }>
                                {validate.isNotEmpty(agentId) && isLabOrderStatusAllowedToDisplayAgent(labOrder.status) && validate.isNotEmpty(agentsInfo) && validate.isNotEmpty(agentsInfo[agentId]) && 
                                    <React.Fragment>
                                        <small className="font-12 d-flex">
                                            Phlebotomist Assigned for sample collection
                                        </small>
                                        <a href={"tel:"+agentsInfo[agentId].phone} value="call" title={"Click to call Phlebotomist ("+agentsInfo[agentId].name+")"} className="btn btn-link ml-n2 btn-sm">
                                            {agentsInfo[agentId].name} / Call
                                        </a>
                                    </React.Fragment>
                                }
                                {!isLabOrderStatusAllowedToDisplayAgent(labOrder.status) && <strong>{getLabOrderVisitType(labOrder.visitType)}</strong>}
                            </span>
                        }
                        {labOrder.visitType == "LAB" && validate.isNotEmpty(props.pathLabStores) && validate.isNotEmpty(props.pathLabStores[labOrder.collectionCenterStoreId]) &&
                            <span className="text-muted ml-3">
                                <small className="font-12 d-flex">Collection Centre</small>
                                <strong className="text-dark">
                                    {validate.isNotEmpty(props.pathLabStores) && validate.isNotEmpty(props.pathLabStores[labOrder.collectionCenterStoreId]) && props.pathLabStores[labOrder.collectionCenterStoreId].name}
                                </strong>
                            </span>
                        }
                        <div className="mr-1">
                            <button role="button" title="View Order" className="btn btn-link" onClick={()=>goToOrderView()}>View Order</button>
                            {isLabOrderStatusAllowedForCancel(labOrder.status) &&
                                <button role="button" title="Cancel Order" className="btn btn-link" onClick={()=>showCancelOrderConfirmation(labOrder.orderId)}>Cancel Order</button>
                            }
                            {(validate.isNotEmpty(labOrder.labOrderPatients) && labOrder.labOrderPatients.length == 1) && (labOrder.status == 'D') &&
                                <button role="button" title="Download All Reports" className="btn btn-link" onClick={() => downloadPatientLabReports(labOrder.orderId, labOrder.labOrderPatients[0].patientId,labOrder.collectionCenterStoreId)}>Download All Reports</button>
                            }
                            {(validate.isNotEmpty(labOrder.labOrderPatients) && labOrder.labOrderPatients.length > 1) && (labOrder.status == 'D') &&
                                <UncontrolledDropdown className="d-inline-block lab-download-dropdown">
                                    <DropdownToggle color="white" className='btn btn-link'>
                                        Download All Reports
                                    </DropdownToggle>
                                        <DropdownMenu className="w-100">
                                            <span className="caret"></span>
                                            {validate.isNotEmpty(labOrder.labOrderPatients) && labOrder.labOrderPatients.map(eachPatientDetail => {
                                                return (validate.isNotEmpty(eachPatientDetail) &&
                                                    <DropdownItem className="text-truncate" title={eachPatientDetail.customerPatient.patientName} onClick={() => downloadPatientLabReports(labOrder.orderId, eachPatientDetail.patientId,labOrder.collectionCenterStoreId)}>
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
                            {labOrder.isEligibleForHelp &&
                                <button role="button" title="Need Help" className="btn btn-link" onClick={()=>props.toggleChat(getChatHeaderData("LAB_ORDER", labOrder))}>Need Help?</button>
                            }
                        </div>
                    </div>
                    {isCancelOrderModalOpen && <LabCancelOrder modal={isCancelOrderModalOpen} toggle={setCancelOrderModalOpen} cancelOrder={cancelOrder}/>}
                    {/* { isNoteAllowedToDisplay(labOrder.status) && <div className="footer-alert alert alert-warning" role="alert">
                        Note: No special preparation required
                    </div>} */}
                </div>
            </div>
        </React.Fragment>
    )
}
export default LabOrderHeader;
