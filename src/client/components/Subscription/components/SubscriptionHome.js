import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Validate from '../../../helpers/Validate';
import { BannerHomePage } from '../constants/SubscriptionConstants';
import SubscriptionService from '../services/SubscriptionService';
import CorporateSearch from './CorporateSearch';
import LabsFrequentlyAskedQuestions from './LabsFrequentlyAskedQuestions';
import MembershipPlans from './MembershipPlans';
import SubscriptionBanner from './SubscriptionBanner';
import SubscriptionBenefits from './SubscriptionBenefits';
import {CLEAR_DATA} from "../redux/SubscriptionReducer";
import SubscriptionFaqGhostImae from "./SubscriptionFaqGhostImage";
import SubscriptionTermsAndConditions from './SubscriptionTermsAndConditions';
import qs from 'qs';
import MetaTitle from '../../../commonComponents/MetaTitle';
import {getSelectedLocality} from "../../../../redux/action/LocalityAction"
import useStaticContent from '../../Common/CustomHooks/useStaticContent';
import SubscriptionTNCGhostImage from './SubscriptionTNCGhostImage';
import { isUpcomingSubscription } from '../../../helpers/SubscriptionHelper';


const SubscriptionHome = (props) =>{

    const validate  = Validate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo ? state.userInfo.userInfo ? state.userInfo.userInfo : {} : {} );
    const [subscribedPlanId,setSubscribedPlanId] = useState();
    const [selectedPlaceId, setSelectedPlaceId] = useState("");
    const [onlineServingPlanIds, setOnlineServingPlandIds] = useState([]);
    const [bestPlanId, setBestPlanId] = useState();
    const selectedLocality = getSelectedLocality();
    const [subscriptions, setSubscriptions] = useState([]);
    const [customerAllowedPlanPurchase, setCustomerAllowedPlanPurchase] = useState({ "P": true, "H": true, "C": true });
    const [isStaticContentLoading, staticContent] = useStaticContent({itemId: 'SUBSCRIPTION_HOME',contentType:'ALL'});
    

    useEffect(() => {
        dispatch({type:CLEAR_DATA});
        let onlineServingPlanIds=null;
        if(validate.isNotEmpty(selectedLocality)){
            onlineServingPlanIds = validate.isNotEmpty(selectedLocality.membershipConfig) && validate.isNotEmpty(selectedLocality.membershipConfig.onlineServingPlanIds) ? selectedLocality.membershipConfig.onlineServingPlanIds : onlineServingPlanIds;
            onlineServingPlanIds && setOnlineServingPlandIds(onlineServingPlanIds);
            setBestPlanId(validate.isNotEmpty(selectedLocality.membershipConfig) && selectedLocality.membershipConfig.bestPlanId ? selectedLocality.membershipConfig.bestPlanId : undefined)
            setSelectedPlaceId(selectedLocality.placeId);
        }
        if(validate.isNotEmpty(userInfo) && validate.isNotEmpty(userInfo.medplusId)){
            getCustomerPlanPurchaseEligibility();
            getSubscriptions();
        }
    },[]);

   
    const checkIsActiveSubscription = (subscriptions) => {
        let isActive = false;
        if (subscriptions && subscriptions.length > 0) {
            if (subscriptions[0].comboPlanId) {
                return subscriptions[0].status === "ACTIVE";
            } else {
                subscriptions.map((each) => {
                    if (each.status === "ACTIVE") {
                        isActive = true;
                    }
                })
            }
        }
        return isActive
    }

    const getSubscriptions=()=>{
        SubscriptionService().getSubscriptions({}).then(data => {
            if (data && data.statusCode === "SUCCESS" && Validate().isNotEmpty(data.dataObject)) {
                let subscriptions = data.dataObject;
                subscriptions = subscriptions.filter((each) => !isUpcomingSubscription(each));
                setSubscriptions(subscriptions);
                if (validate.isNotEmpty(subscriptions)) {
                    //setting subscribed plans in an array
                    if (subscriptions[0].comboPlanId) {
                        if ("ACTIVE" === subscriptions[0].status) {
                            setSubscribedPlanId((subscriptions[0].renewalAllowed && subscriptions[0].plan.alternateRenewalPlanId) ? [subscriptions[0].plan.alternateRenewalPlanId] : [subscriptions[0].comboPlanId])
                        }
                    } else {
                        let subscriptionPlanIds = [];
                        subscriptions.map(eachSubscribedPlan => {
                            if ("ACTIVE" === eachSubscribedPlan.status ) {
                                subscriptionPlanIds.push((eachSubscribedPlan.renewalAllowed && eachSubscribedPlan.plan.alternateRenewalPlanId) ? eachSubscribedPlan.plan.alternateRenewalPlanId : eachSubscribedPlan.plan.id)
                            }
                        });
                        setSubscribedPlanId(subscriptionPlanIds)
                    }
                }
            }
        });
    }

    const getCustomerPlanPurchaseEligibility = () => {
        SubscriptionService().getCustomerPlanPurchaseEligibility({}).then(data => {
            if (data && data.statusCode === "SUCCESS" && Validate().isNotEmpty(data.dataObject)) {
                setCustomerAllowedPlanPurchase(data.dataObject);
            } else {
                setCustomerAllowedPlanPurchase({});
            }
        });
    }


    return(
        <React.Fragment>
            <MetaTitle metaKey = {"MEDPLUS_ADVANTAGE"} defaultValue={"MedPlus Advantage – Best Health Check up Packages for full family"}/>
            {  <div className="mb-4 pb-2">
                <SubscriptionBanner pageName={BannerHomePage} sectionClass="" className="d-block rounded"/>
                <SubscriptionBenefits className="mt-4 p-64 py-5 bg-white"/>
            </div> }
            {<MembershipPlans subscriptions={subscriptions} subscribedPlanId={subscribedPlanId} onlineServingPlanIds={onlineServingPlanIds} bestPlanId={bestPlanId} selectedPlaceId={selectedPlaceId} userInfo={userInfo} {...props} customerAllowedPlanPurchase={customerAllowedPlanPurchase} />}
            {/*<CorporateSearch {...props}/>*/}
            { isStaticContentLoading && <SubscriptionFaqGhostImae/>}
            { isStaticContentLoading && <SubscriptionTNCGhostImage/>}
            { !isStaticContentLoading && validate.isNotEmpty(staticContent?.FAQ) && <LabsFrequentlyAskedQuestions faqContent={staticContent.FAQ}/>}
            { !isStaticContentLoading && validate.isNotEmpty(staticContent?.TNC) && <SubscriptionTermsAndConditions termsAndConditions={staticContent.TNC}/>}
        </React.Fragment>
    )

}

export default SubscriptionHome