import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSelectedLocality } from "../../../../../redux/action/LocalityAction";
import { checkIfCurrentDateIsBetweenGivenDates, getPlanType } from "../../../../helpers/CommonUtil";
import Validate from "../../../../helpers/Validate";
import Alert from "../../../Common/Alert";
import { MEDPLUS_ADVANTAGE_HOME, SubscriptionBenefitType, getPlanUrlStringParam } from "../../constants/SubscriptionConstants";
import { REMOVE_MEMBER_LIST, SAVE_SUBSCRIPTION_ID } from "../../redux/SubscriptionReducer";
import SubscriptionService from "../../services/SubscriptionService";
import SubscriptionBookingCard from "./SubscriptionBookingCard";
import { isUpcomingSubscription } from "../../../../helpers/SubscriptionHelper";

const UserSubscriptionCard = (props) =>  {
    
    
    const [loader, setLoader] = useState(true);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const subscriptions = props.subscriptions;
    const [noSubscriptions, setNoSubscriptions] = useState(false);
    const validate  = Validate();
    const subscriptionService  = SubscriptionService();
    const dispatch = useDispatch();
    let currentSubscriptionsList = [];
    const [upcomingSubscriptionsList, setUpcomingSubscriptionsList] = useState([]);
    
    
    useEffect(() => {
        dispatch({ type: REMOVE_MEMBER_LIST });
        getSubscriptions();
    }, []);

    const isRenuwalAllowed = (subscriptions) => {
        let renewalAllowed = [];
        if (validate.isNotEmpty(subscriptions) && subscriptions.length > 0) {
            subscriptions.map((each) => {
                if (each.renewalAllowed) {
                    renewalAllowed.push(each);                 
                }
            })
        }
        return renewalAllowed;
    }

    const getSubscriptions = () => {
        
        subscriptionService.getSubscriptionsWithComboPlan({}).then(data => {
            setLoader(false);
            if (data.statusCode === "SUCCESS" && validate.isNotEmpty(data['dataObject']) && validate.isNotEmpty(data.dataObject.subscriptionsList)) {
                let subscriptions = [];
                let upcomingSubscriptionsList = [];

                if (data.dataObject.subscribedComboPlan) {
                    props.setSubscribedComboPlan(data.dataObject.subscribedComboPlan);
                }
                
                if (data.dataObject.subscriptionsList.length > 1) {

                    data.dataObject.subscriptionsList.map((eachSubscription) => {
                        if (isUpcomingSubscription(eachSubscription)) {
                            upcomingSubscriptionsList.push(eachSubscription);
                        } else {
                            currentSubscriptionsList.push(eachSubscription);
                        }
                    });
                    
                } else {
                    currentSubscriptionsList = [...data.dataObject.subscriptionsList];
                }
                setUpcomingSubscriptionsList(upcomingSubscriptionsList);
                subscriptions = [...currentSubscriptionsList, ...upcomingSubscriptionsList];
                props.setSubscriptionList(subscriptions)

                let subscriptionsIdToRedux = () => {
                    let subscriptionId = null;
                    if (subscriptions.length == 0) {
                        return null;
                    }
                    subscriptions.map((each) => {
                        if (each.benefitType == SubscriptionBenefitType.HEALTHCARE) {
                            subscriptionId = each.id;
                        }
                    });
                    if (!subscriptionId) {
                        subscriptionId = subscriptions[0].id;
                    }
                    return subscriptionId;
                }

                dispatch({ type: SAVE_SUBSCRIPTION_ID, data: subscriptionsIdToRedux() });
                props.setSubscriptionList(subscriptions);
                if (subscriptions.length > 0 ){
                    props.handleRenewalOption(isRenuwalAllowed(subscriptions));
                    props.hidePayments(true);
                    props.setShowCancelSubsButton(true);
                } else {
                    setAlertInfo({ message:"No Data available" , type: 'danger' });
                    setNoSubscriptions(true);
                    props.hidePayments(false);
                    props.setShowCancelSubsButton(false);
                }
            }else if (data.statusCode === "FAILURE" && data.message=== "NO_SUBSCRIPTIONS_AVAILABLE" ) {
                setNoSubscriptions(true);
                props.hidePayments(false);
                dispatch({ type: SAVE_SUBSCRIPTION_ID, data: null });
                props.setShowCancelSubsButton(false);
            }else {
                setAlertInfo({ message:validate.isEmpty(data.message) ? "Something went wrong, Plese Try again.": data.message , type: 'danger' })
            }
        }).catch((error)=>{
            setLoader(false);
            setAlertInfo({ message:"Something went wrong, Plese Try again.", type: 'danger' });
        })
    }

    const getSubscription = (subscriptionList,type) => {
        try{
            const subscriptionOne = subscriptionList[0];
            const subscriptionSecond = subscriptionList[1];
            const endDateOne = new Date(subscriptionOne.endDate);
            const endDateTwo = new Date(subscriptionSecond.endDate);
            if(type == "UPCOMING"){
                return (endDateOne.getTime()-endDateTwo.getTime() > 0) ? subscriptionOne : subscriptionSecond;
            }
            return (endDateOne.getTime()-endDateTwo.getTime() < 0) ? subscriptionOne : subscriptionSecond;;

        } catch(Err){
            if(type == "UPCOMING")
                return subscriptionList[1];
            return subscriptionList[0];
        }
    }


    
    const checkIfAllMembersAreActive=(members)=>{
        let isActive = true;
        members.every(member=>{
            if(validate.isEmpty(member.subscriptionStatus) || member.subscriptionStatus !== "ACTIVE"){
                isActive= false;
                return false;
            }
            return true;
        })
        return isActive;
    }

    const closeAlertMessage = () => {
        setAlertInfo({message:"", type:""});
    }

    const getGhostImage = () => {
        return (<React.Fragment>
            <div className="d-flex d-none justify-content-between w-100 ml-3">
                <div className="mr-3">
                    <div className=" my-subscription-container">
                        <div className="p-0 m-0 ph-item" style={{ 'background-color': 'unset' }}>
                            <div className="ph-col-12 m-0 p-0">
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-col-6 p-0 mb-1" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-4 empty p-0 mb-1" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-4 p-0 m-0" style={{ 'height': '12.5px' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="p-0 m-0 ph-item" style={{ 'background-color': 'unset' }}>
                            <div className="ph-col-12 m-0 p-0">
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-col-8 p-0 mb-1 m-0" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-4 empty p-0 m-0" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-2 p-0 m-0" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-2 empty p-0 m-0" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-2 p-0 m-0" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-2 empty p-0 m-0" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-4 p-0 m-0" style={{ 'height': '12.5px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="list-card-box bg-transparent shadow-none mb-n3 pb-0">
                        <div className="card each-subscription-member mb-3">
                            <div className="card-body px-3 py-2 d-flex align-items-center">
                                <div className="member-count" style={{ 'background': 'unset' }}>
                                    <div className="ph-item w-100 p-0 m-0">
                                        <div className="ph-col-12 p-0 m-0">
                                            <div className="ph-row p-0 m-0">
                                                <div className="ph-picture rounded-circle p-0 m-0" style={{ 'width': '32px', 'height': '32px' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100">
                                    <div className="ph-item p-0 m-0">
                                        <div className="ph-col-12 p-0 m-0">
                                            <div className="ph-row  p-0 m-0">
                                                <div className="ph-col-8 p-0 m-0" style={{ 'height': '16px' }}></div>
                                                <div className="ph-col-4 empty p-0 m-0"></div>
                                                <div className="ph-col-8  mt-1 p-0" style={{ 'height': '12.5px' }}></div>
                                                <div className="ph-col-4 empty p-0 m-0"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card each-subscription-member mb-3">
                            <div className="card-body px-3 py-2 d-flex align-items-center">
                                <div className="member-count" style={{ 'background': 'unset' }}>
                                    <div className="ph-item w-100 p-0 m-0">
                                        <div className="ph-col-12 p-0 m-0">
                                            <div className="ph-row p-0 m-0">
                                                <div className="ph-picture rounded-circle p-0 m-0" style={{ 'width': '32px', 'height': '32px' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100">
                                    <div className="ph-item p-0 m-0">
                                        <div className="ph-col-12 p-0 m-0">
                                            <div className="ph-row  p-0 m-0">
                                                <div className="ph-col-8 p-0 m-0" style={{ 'height': '16px' }}></div>
                                                <div className="ph-col-4 empty p-0 m-0"></div>
                                                <div className="ph-col-8  mt-1 p-0" style={{ 'height': '12.5px' }}></div>
                                                <div className="ph-col-4 empty p-0 m-0"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </React.Fragment>
        );
    }

    if(loader){
        return getGhostImage();
    }

    if(noSubscriptions){
        return <React.Fragment>
            <div className="no-purchase-history body-height w-100">
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
                                <h6 className="mb-3">Still haven't subscribed! Subscribing gets you up to 75% off.</h6>
                                <button role="button" className="flex-center btn btn-brand-gradient rounded-pill px-5 custom-btn-lg" onClick={()=> props.history.push(`${MEDPLUS_ADVANTAGE_HOME}`)}>
                                    Get Subscribed
                                </button>
             </div>
        </React.Fragment>
    }

    return (
        <React.Fragment>
            {validate.isNotEmpty(subscriptions) && 
                <div className="d-flex flex-wrap" style={{gap:'1rem'}}>
                {validate.isNotEmpty(subscriptions) && subscriptions.map((subscription,index) => {
                    return (
                        <SubscriptionBookingCard history={props.history} showAddMoreMembers={(subscription.benefitType == SubscriptionBenefitType.HEALTHCARE) && (subscription.status === "ACTIVE") && checkIfAllMembersAreActive(subscription.members) && (subscription.members.length < subscription.plan.totalMaxAllowed) && checkIfCurrentDateIsBetweenGivenDates(subscription.startDate, subscription.endDate)} subscriptionCardDefaultOpen={subscriptions.length == 1} subscription={subscription} view={upcomingSubscriptionsList.find((eachSubscription) => { return eachSubscription.id == subscription.id }) ? "UPCOMING" : "CURRENT"} index={index} showUserContent={props.showUserContent} handleRenewalClick={props.handleRenewalRedirection} />
                    )
                })}
                </div>
                }
        { alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration = {5000} />}
      </React.Fragment>
    )
}

export default UserSubscriptionCard;