import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MEDPLUS_ADVANTAGE_HOME, MEDPLUS_ADVANTAGE_URL_PREFIX, SubscriptionBenefitType, getPlanUrlStringParam } from '../../constants/SubscriptionConstants';
import { DELETE_SUBSCRIPTION, REMOVE_MEMBER_LIST, SAVE_SUBSCRIPTION_ID, SET_MEMBER_LIST, SET_PLAN, SET_PLAN_TYPE} from '../../redux/SubscriptionReducer';
import SubscriptionTransactionHistory from './SubscriptionTransactionHistory';
import UserSubscriptionCard from './UserSubscriptionCard';
import Validate from '../../../../helpers/Validate';
import { getPlanType } from '../../../../helpers/CommonUtil';
import { getSelectedLocality } from '../../../../../redux/action/LocalityAction';
import { isSubscriptionsHaveSameEndDate } from '../../../../helpers/SubscriptionHelper';


const SubscriptionsTab = (props) => {
    
    const dispatch = useDispatch();
    const [subscriptions, setSubscriptionList] = useState([]);
    const [subscribedComboPlan, setSubscribedComboPlan] = useState(undefined);
    const selectedLocality = getSelectedLocality();
    const[showPayments, toggleShowPayments] = useState(false);
    const [renewalAllowedSubscriptions,setRenewalAllowedSubscriptions] = useState([]);
    const validate = Validate()


    useEffect(()=>{
            return ()=>{
                dispatch({type:DELETE_SUBSCRIPTION})
            }
    }, [])


    function getIdForRenewal(subscription) {
        let onlineServingPlanIds = [];
        let subscribedPlan = (subscription.comboPlanId && subscribedComboPlan) ? subscribedComboPlan : subscription.plan;

        if (Validate().isNotEmpty(selectedLocality)) {
            onlineServingPlanIds = Validate().isNotEmpty(selectedLocality.membershipConfig) && validate.isNotEmpty(selectedLocality.membershipConfig.onlineServingPlanIds) ? selectedLocality.membershipConfig.onlineServingPlanIds : onlineServingPlanIds;
        }
        
        if (subscribedPlan.id && subscribedPlan.onlineVisibility == "YES" && subscribedPlan.status == "ACTIVE" && onlineServingPlanIds.includes(subscribedPlan.id)) {
            return subscribedPlan.id;
        }

        if (subscribedPlan.alternateRenewalPlanId && subscribedPlan.alternateRenewalPlanOnlineVisibility == "YES" && subscribedPlan.alternateRenewalPlanStatus == "ACTIVE") {
            if (onlineServingPlanIds.includes(subscribedPlan.alternateRenewalPlanId)) {
                return subscribedPlan.alternateRenewalPlanId;
            } else {
                props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionPlan/` + getPlanUrlStringParam(subscription.plan.name, subscription.plan.alternateRenewalPlanId));
                return;
            }
        }

        
        props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}`);
    }

    const handleRenewalRedirection = (subscription) => {
        let renewalPlanId = getIdForRenewal(subscription);
        if (renewalPlanId) {
            sessionStorage.setItem("subscribedPlanId", renewalPlanId);
            dispatch({ type: SET_PLAN, data: renewalPlanId });
            let planType = getPlanType(subscription.plan);
            dispatch({ type: SET_PLAN_TYPE, data: planType});
            let members = [];
            if (subscription.comboPlanId) {
                subscriptions.map((each) => {
                    if (each.benefitType == SubscriptionBenefitType.HEALTHCARE) {
                        members = each.members;
                        return;
                    }
                })
            } else {
                members = subscription.member;
            }
            let memberIdsForRedux = [];
            if (members) {
                members.map(each => {
                    if ("SUCCESS" == each.status) {
                        memberIdsForRedux.push(each.member.patientId);
                    }
                })
            }
            dispatch({ type: SET_MEMBER_LIST, data: memberIdsForRedux });
            props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionMembers?isFromRenewal=true`);
        }
    }
    
    const setSubscribedPlanId = (subscriptions) => {
        if (Validate().isEmpty(subscriptions)) {
            return null;
        }
        let subcriptionId = {};
        subscriptions.map((each) => {
            subcriptionId[each.benefitType] = each.plan.id;
        });
        return subcriptionId;
    }
    

    const handleRenewalClick = () =>{
        if (renewalAllowedSubscriptions.length == 1 || (renewalAllowedSubscriptions[0].comboPlanId && isSubscriptionsHaveSameEndDate(renewalAllowedSubscriptions))){
          handleRenewalRedirection(renewalAllowedSubscriptions[0])
        } else {
            props.toggleUserTab("Renewal")
        } 
    }
    
    
    const showRenewalAllowedButton = (renewalAllowedSubscriptions) => {
        if (validate.isNotEmpty(renewalAllowedSubscriptions)) {
            if (renewalAllowedSubscriptions[0].comboPlanId) {
                return renewalAllowedSubscriptions.length == 2;
            } else {
                return renewalAllowedSubscriptions.length != 0;
            }
        }
        return false
    }

    
    return (
        <React.Fragment>
            <div>
                <div className="d-flex p-3">
                    { showPayments && <div className="my-bookings-tabs mr-3">
                        <div className="list-group" style={{width: '180px'}}>
                            <button role="button" className="btn list-group-item list-group-item-action" title="Payments" onClick={()=>{props.toggleUserTab("Payments")}}>
                                <div className={props.showUserContent == "Payments" ?  "active-tab d-flex " :  "d-flex" }>
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
                            </button>
                            {showRenewalAllowedButton(renewalAllowedSubscriptions) && <button role="button" className="btn list-group-item list-group-item-action" title="Renewal"  onClick={() => handleRenewalClick()}>
                                <div className={props.showUserContent == "Renewal" ?  "active-tab d-flex " :  "d-flex" }>
                                    <span className="mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="Group_22125" data-name="Group 22125" transform="translate(-303 -148)">
    <circle id="Ellipse_272" data-name="Ellipse 272" cx="12" cy="12" r="12" transform="translate(303 148)" fill="#d6d8d9" opacity="0.5"/>
    <g id="Group_22428" data-name="Group 22428" transform="translate(306.037 151.516)">
      <path id="Path_29889" data-name="Path 29889" d="M32.65,4.824a3.253,3.253,0,0,0-3.25-3.25h-.787V.783A.3.3,0,0,0,28.12.555l-2.343,2a.3.3,0,0,0,0,.456L28.12,5a.3.3,0,0,0,.493-.228V3.984H29.4a.84.84,0,0,1,0,1.681H27a.3.3,0,0,0-.3.3V7.775a.3.3,0,0,0,.3.3h2.4A3.254,3.254,0,0,0,32.65,4.824Z" transform="translate(-20.271)" fill="#343a40"/>
      <path id="Path_29890" data-name="Path 29890" d="M54.148,28.678l2.01-1.154a.374.374,0,0,0-.022-.661l-3.377-1.652a.374.374,0,1,0-.329.673l2.744,1.342-1.857,1.066-1.179-.59a.374.374,0,1,0-.335.67l1.359.68a.166.166,0,0,0,.019.007l-4.038,2.018a.083.083,0,0,0-.045.071.081.081,0,0,0,.041.074l2.321,1.332a.081.081,0,0,0,.041.011.082.082,0,0,0,.037-.009l4.868-2.434a.083.083,0,0,0,.045-.071.082.082,0,0,0-.041-.074Z" transform="translate(-39.489 -20.255)" fill="#343a40"/>
      <path id="Path_29891" data-name="Path 29891" d="M20.7,61.192l-2.522,1.448a.263.263,0,0,1-.248.007l-2.071-1.036a.083.083,0,0,0-.119.074v2.263a.082.082,0,0,0,.046.074l4.919,2.459a.084.084,0,0,0,.037.009.081.081,0,0,0,.043-.012.083.083,0,0,0,.039-.07V61.263a.083.083,0,0,0-.124-.072Z" transform="translate(-12.125 -49.795)" fill="#343a40"/>
      <path id="Path_29892" data-name="Path 29892" d="M5.914,30.776a.081.081,0,0,0,.041-.011l2.321-1.332a.082.082,0,0,0,0-.145L4.233,27.269l.019-.007L5.7,26.539a.374.374,0,0,0-.335-.67L4.1,26.5,2.239,25.436,5.767,23.7a.374.374,0,0,0-.33-.672L1.278,25.075a.374.374,0,0,0-.021.66L3.268,26.89,1,28.189a.083.083,0,0,0-.041.074.084.084,0,0,0,.046.072l4.868,2.434A.086.086,0,0,0,5.914,30.776Z" transform="translate(0 -18.466)" fill="#343a40"/>
      <path id="Path_29893" data-name="Path 29893" d="M51.924,61.611l-2.072,1.036a.263.263,0,0,1-.248-.007l-2.523-1.447a.083.083,0,0,0-.124.071v5.145a.082.082,0,0,0,.039.07.079.079,0,0,0,.043.012.084.084,0,0,0,.037-.009L52,64.022a.082.082,0,0,0,.045-.074V61.684a.082.082,0,0,0-.119-.074Z" transform="translate(-37.733 -49.795)" fill="#343a40"/>
    </g>
  </g>
</svg>
                                    </span>
                                    <p className="mb-0">Renewal</p>
                                </div>
                            </button> }
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
                    </div> }
                    {(props.showUserContent == "" || props.showUserContent == 'Renewal') && <UserSubscriptionCard setShowCancelSubsButton={props.setShowCancelSubsButton} hidePayments={toggleShowPayments} history={props.history} handleRenewalOption={setRenewalAllowedSubscriptions} showUserContent={props.showUserContent} handleRenewalClick={handleRenewalClick} subscriptions={subscriptions} setSubscriptionList={setSubscriptionList} handleRenewalRedirection={handleRenewalRedirection} setSubscribedComboPlan={setSubscribedComboPlan} />}
                    {props.showUserContent == "Payments" && <SubscriptionTransactionHistory toggleUserTab={props.toggleUserTab} history={props.history}/>}
                    {/* {props.showUserContent == 'Renewal' && <UserSubscriptionCard setShowCancelSubsButton={props.setShowCancelSubsButton} isRenewalAllowed ={showRenewal} hidePayments={toggleShowPayments} history={props.history} handleRenewalOption={setShowRenewal} showUserContent={props.showUserContent}/>} */}
                   {/*  {props.showUserContent == "Renewal" && <RenewPlan history={props.history}/>} */}
                </div>
            </div>
        </React.Fragment>
    )
}

export default SubscriptionsTab;