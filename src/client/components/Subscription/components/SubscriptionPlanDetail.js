import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Validate from '../../../helpers/Validate';
import Alert, { ALERT_TYPE_INFO } from '../../Common/Alert';
import { SET_PLAN, REMOVE_PLAN, SET_PLAN_TYPE, REMOVE_MEMBER_LIST, SAVE_PLAN_DETAILS, SAVE_SUBSCRIPTION_ID } from "../redux/SubscriptionReducer";
import { getPlanUrlStringParam, MEDPLUS_ADVANTAGE_URL_PREFIX } from '../constants/SubscriptionConstants';
import StrecturedDataSubscriptionDetail from './StrecturedDataSubscriptionDetail'
import { SubscriptionBuyNow } from '../../../Analytics/Analytics'
import SubscriptionService from '../services/SubscriptionService';
import LocalDB from "../../../DataBase/LocalDB";
import SignInPopUp from "../../Common/signInModelBox/SignInPopUp";
import { getMembershipConfig, getSelectedLocality } from "../../../../redux/action/LocalityAction";
import NoPlansFound from "./NoPlansFound";
import ChangeLocality from "../../Locality/ChangeLocality";
import { getPlanType } from "../../../helpers/CommonUtil";

const SubscriptionPlanDetail = (props) => {

    const [planDetails, setPlanDetails] = useState({});
    const [planDetailsLoaded, setPlanDetailsLoaded] = useState(false);
    const [isMemberSubscribed, setIsMemberSubscribed] = useState(false);
    const [isRenewalAllowed, setIsRenewalAllowed] = useState(false);
    const [alertData, setAlertData] = useState({});
    const [subscriptionStatus, setSubscriptionStatus] = useState(undefined);
    const [subscribedPlanId, setSubscribedPlanId] = useState([]);
    const [subscribedPlanName, setSubscribedPlanName] = useState([]);
    const [subscriptionDetails, setSubscriptionDetails] = useState(undefined);
    const [alternateRenewalPlanId,setAlternateRenewalPlanId] = useState(undefined);
    const [subscribedPlanStatus,setSubscribedPlanStatus] = useState(undefined);
    const [planNotFound, setPlanNotFound] = useState(false)
    const [noPlansFound, setNoPlansFound] = useState(false);
    const membershipConfig = getMembershipConfig();
    const [isLocalityModalOpen, setLocalityModalOpen] = useState(false);
    const selectedLocality = getSelectedLocality();

    const [price, setPrice] = useState();
    const [mrp, setMrp] = useState();
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const [openVerifyModal, setOpenVerifyModal] = useState(false);

    const validate = Validate();
    const dispatch = useDispatch();
    const subscriptionService = SubscriptionService();
    const planId = props.planId;

    const corporateEmailId = useSelector(state => {
        if (validate.isNotEmpty(state) && validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.corporateEmailId)) {
            return state.subscription.corporateEmailId;
        }
    })
    const userInfo = useSelector(state => state.userInfo ? state.userInfo.userInfo ? state.userInfo.userInfo : {} : {});

    useEffect(() => {
        if (validate.isNotEmpty(planId)) {
            getPlanDetails(planId);
        } else {
            props.history.goBack();
        }
    }, [planId])

    useEffect(()=>{
        if (!membershipConfig || !membershipConfig.configuredPlanIds) {
            setNoPlansFound(true);
            setPlanNotFound(false);
        }
        else if (membershipConfig && membershipConfig.configuredPlanIds && !membershipConfig.configuredPlanIds.includes(parseInt(planId))) {
            setPlanNotFound(true);
            setNoPlansFound(false);
        }
        else {
            setPlanNotFound(false);
            setNoPlansFound(false);
        }
    }, [])
    
    const getPlanDetails = (planId) => {
        dispatch({ type: REMOVE_PLAN });
        dispatch({ type: REMOVE_MEMBER_LIST });
        subscriptionService.getSubscriptionPlanDetails({ "planId": planId, verifyMembershipConfig: true , verifyStatus : true }).then(data => {
            if (data.statusCode === "SUCCESS" && validate.isNotEmpty(data['dataObject'])) {
                setIsMemberSubscribed(data.dataObject.isMemberSubscribed);
                setIsRenewalAllowed(data.dataObject.isRenewalAllowed);
                setSubscriptionStatus(data.dataObject.status);
                setSubscriptionDetails(data.dataObject.subscriptionData);
                if (data.dataObject.isMemberSubscribed) {
                    setSubscribedPlanId(data.dataObject.subscribedPlanId);
                    setSubscribedPlanName(data.dataObject.subscribedPlanName);
                    setAlternateRenewalPlanId(data.dataObject.alternateRenewalPlanId);

                    setSubscribedPlanStatus(data.dataObject.status);
                }
                const planInfo = data.dataObject.planDetails;
                if (validate.isNotEmpty(planInfo)) {
                    if (planInfo.type.type == "ORGANIZATION" && validate.isEmpty(corporateEmailId)) {
                        props.history.goBack();
                        return;
                    }
                    setPlanDetails(planInfo);
                }
                if (validate.isNotEmpty(planInfo.fees) && validate.isNotEmpty(planInfo.fees[0])) {
                    setPrice(planInfo.price);
                    setMrp(planInfo.amount);
                }
                if (validate.isNotEmpty(data.dataObject.message)) {
                    setAlertData({ message: data.dataObject.message, type: ALERT_TYPE_INFO });    
                }
            } else {
                setAlertData({ message: data.message, type: ALERT_TYPE_INFO });
                setNoPlansFound(true);
            }
            setPlanDetailsLoaded(true);
        }).catch(e => {
            setAlertData({ message: "Someting Went Wrong", type: ALERT_TYPE_INFO });
            setPlanDetailsLoaded(true);
        });
    }

    const getStatusCss = (status) => {
        return status === "A" ? "badge badge-success badge-pill font-16" : "badge badge-warning badge-pill font-16";
    }
    const getMessage = (status) => {
        return status === "A" ? "Active Plan" : " Pending ";
    }

    const redirectToMembersPage = async () => {
        dispatch({ type: SET_PLAN, data: planDetails.id });
        let planType = getPlanType(planDetails);
        dispatch({ type: SET_PLAN_TYPE, data: planType });
        SubscriptionBuyNow(planDetails)
        if (validate.isNotEmpty(userInfo) && validate.isNotEmpty(userInfo.medplusId)) {
            if (isRenewNowButtonToBeShown()) {
                props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionMembers?isFromRenewal=true`);
            } else {
                props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionMembers`);
            }
        } else {
            LocalDB.setValue("fromPage", `${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionMembers`);
            LocalDB.setValue("toPage", -1);
            setPopUpOpen(!isPopUpOpen);
        }
    }

    const redirectToSubscribedPlan = (eachSubscribedPlanName, eachSubscribedPlanId) => {
        props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionPlan/` + getPlanUrlStringParam(eachSubscribedPlanName, eachSubscribedPlanId));
    }

    const isEqualToAlternateRenewalPlanId = (planId) => {
        let alternativePlanIds = [];
        if(validate.isEmpty(subscriptionDetails)){
            return false;
        }
        subscriptionDetails.map((eachSubscription) => {
            alternativePlanIds.push(eachSubscription.plan.alternateRenewalPlanId);
        })
        return alternativePlanIds.indexOf(planId) != -1;
    }

    const isRenewNowButtonToBeShown = () => {
        if (isRenewalAllowed && subscribedPlanStatus == "A" && (subscribedPlanId.indexOf(planDetails.id) != -1 || isEqualToAlternateRenewalPlanId(planDetails.id))) {
       // if(isRenewalAllowed && subscribedPlanStatus=="A" && (subscribedPlanId.indexOf(planDetails.id) != -1 || isEqualToAlternateRenewalPlanId(planDetails.id)) && membershipConfig && membershipConfig.onlineServingPlanIds &&  Object.values(membershipConfig.onlineServingPlanIds).indexOf(planDetails.id) != -1){
            return true;
        }
        return false;
    }

    const getGhostImage = () => {
        return (<div className="my-4 py-2">
            <section className='subscription-Detail'>
                <div className="plan-details-container">
                    <div className="ph-row" style={{ "width": "80%" }}>
                        <div className="ph-col-4 ph-item mb-3"></div>
                    </div>
                    <div className="mb-4 ph-row">
                        <div className="ph-col-4 ph-item mb-3"></div>
                    </div>
                    <div className="ph-row">
                        <div className="ph-col-2 mb-4 pb-2"></div>
                    </div>
                    <div className="ph-row">
                        <div className="ph-col-2 mb-4 pb-2"></div>
                    </div>
                    <div className="py-3 row">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
                            return (
                                <div className="col-6">
                                    <div className="ph-row">
                                        <div className="ph-col-6 mb-4 pb-2"></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="ph-row" style={{ "width": "60%" }}>
                        <div className="ph-col-2 ph-item"></div>
                    </div>
                </div>
            </section>
        </div>);
    }
    const clearError = () => {
        setAlertData({});
        if(validate.isEmpty(planDetails)){
            props.history.replace({pathname:`${MEDPLUS_ADVANTAGE_URL_PREFIX}`});
        }
    }

    if (!planDetailsLoaded) {
        return getGhostImage();
    }
    const handleSubscriptionRedirection = () => {
        if (subscriptionStatus === "A")
            return;

            dispatch({ type: SAVE_SUBSCRIPTION_ID, data: subscriptionDetails[0].id });
        setTimeout(() => {
            props.history.push("/myBookings#subscriptionPayments");
        }, 1000);
    }

    return (
        <React.Fragment>
            {alertData && <Alert alertInfo={alertData} onDurationEnd={clearError} duration={5000} />}
            {validate.isNotEmpty(planDetails) && !noPlansFound && <div className="mb-4">
                { <section>
                    <div className={isMemberSubscribed ? (validate.isNotEmpty(subscribedPlanId) && subscribedPlanId.indexOf(planDetails.id) != -1 && !isRenewalAllowed) ? "subscription-Detail plan-details-container" : "subscription-Detail pb-0 plan-details-container" : "subscription-Detail plan-details-container"}>
                        {(validate.isNotEmpty(subscribedPlanId) && subscribedPlanId.indexOf(planDetails.id) != -1 && !isRenewalAllowed) ? <React.Fragment>{subscriptionStatus === "A" ? <span className={getStatusCss(subscriptionStatus)}> {getMessage(subscriptionStatus)}  </span> :
                            <a href="javascript:void(0)" onClick={handleSubscriptionRedirection} className="badge badge-primary badge-pill font-16" title="Proceed to Payment">
                                <span>{getMessage(subscriptionStatus)}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="8" viewBox="0 0 16 8" className="ml-2">
                                    <path d="M4.52,14.5A2.482,2.482,0,0,1,7,12.02h3.2V10.5H7a4,4,0,1,0,0,8h3.2V16.98H7A2.482,2.482,0,0,1,4.52,14.5Zm3.28.8h6.4V13.7H7.8ZM15,10.5H11.8v1.52H15a2.48,2.48,0,0,1,0,4.96H11.8V18.5H15a4,4,0,0,0,0-8Z" transform="translate(-3 -10.5)" fill="#fff"></path>
                                </svg>
                            </a>}
                        </React.Fragment> : <React.Fragment></React.Fragment>}
                        <h1 className="heading-text mb-3 h6">
                            {planDetails.displayName}</h1>
                        {/* <h5 className="text-secondary mb-4 pb-2">Tagline of benefits</h5> */}
                        <h6 className="price-text mb-3"><span className="h1 rupee small text-brand">&#x20B9;</span>{parseFloat(price).toFixed(2)}
                            {(parseFloat(price) < parseFloat(mrp)) &&
                                <span className="ml-3">
                                    <span className="text-secondary rupee h4">&#x20B9;</span>
                                    <del className="font-weight-normal h2 text-secondary">{parseFloat(mrp).toFixed(2)}</del>
                                </span>}
                            <span className="h4 font-weight-normal"> / {planDetails.tenureDisplay}</span>
                        </h6>
                        {validate.isNotEmpty(planDetails.shortDesc) && <h5 className="font-weight-bold mb-4">{planDetails.shortDesc}</h5>}
                        {props.planDesc && <div dangerouslySetInnerHTML={{ __html: props.planDesc }} />}
                        <div className="d-flex">
                        </div>
                        {("ACTIVE" === planDetails.status) && !planNotFound && !noPlansFound && (!isMemberSubscribed || isRenewalAllowed) && <button className="btn btn-brand-gradient rounded-pill shadow custom-btn-lg px-5 mt-4" onClick={(event) => redirectToMembersPage(event)}>{(isRenewNowButtonToBeShown()) ? 'Renew Now' : 'Buy Now' }</button>}
                        </div>
                        {(((isMemberSubscribed && !isRenewalAllowed) && (subscribedPlanId.indexOf(planDetails.id) == -1)) || (planNotFound)) && <div className="alert alert-warning rounded-0 text-dark">
                            <ul>
                                {planNotFound && <li className="mt-3">
                                    <p>Unfortunately, This plan is not available in your selected locality <a title={"change locality"} className="font-weight-bold text-primary" href="javascript:void(0)" onClick={() => { setLocalityModalOpen(prevState => !prevState) }}> Change Locality</a></p>
                                </li>}
                                {(isMemberSubscribed && !isRenewalAllowed) && (subscribedPlanId.indexOf(planDetails.id) == -1) && <li>
                                    <p className="mb-0">You are already subscribed to
                                    {subscribedPlanName.map((eachSubscriptionName, index)=>{
                                        index > 0 && ","
                                        return( <React.Fragment>
                                            <a title={eachSubscriptionName} className="font-weight-bold text-primary" href="javascript:void(0)" onClick={() => redirectToSubscribedPlan(eachSubscriptionName, subscribedPlanId[index])}>{` ${eachSubscriptionName}`}</a>
                                            {index != subscribedPlanName.length - 1 && <React.Fragment>, </React.Fragment>}
                                        </React.Fragment>
                                        )
                                    })}
                                    , If you choose to subscribe to this plan, cancel your current subscription by calling our customer care team at <a href="tel:04067006700" className="text-primary font-weight-bold" title="Call to 040 6700 6700">040 6700 6700</a> or by writing to us at <a href="mailto:wecare@medplusindia.com" className="text-primary font-weight-bold" title="mail to wecare@medplusindia.com">wecare@medplusindia.com</a></p>
                                </li>}
                            </ul>
                        </div>
                    }
                </section>}
                <StrecturedDataSubscriptionDetail name={planDetails.displayName} price={price} mrp={mrp} desc={props.desc} />
            </div>}
            {isPopUpOpen && <SignInPopUp {...props} setPopUpOpen={setPopUpOpen} openVerifyModal={openVerifyModal} displayLogo={true} />}
            {planNotFound &&<ChangeLocality modal = {isLocalityModalOpen} toggle = {()=>{setLocalityModalOpen(prevState => !prevState)}}  selectedLocality= {selectedLocality}/>}
            {noPlansFound && <NoPlansFound/>}
        </React.Fragment>
    )
}
export default SubscriptionPlanDetail