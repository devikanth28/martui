import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import { SET_PLAN, SET_PLAN_TYPE, SAVE_PLAN_DETAILS } from "../redux/SubscriptionReducer";
import { useDispatch } from "react-redux";
import Validate from "../../../helpers/Validate";
import CorporateMemberPlan from "./CorporateMemberPlan";
import { getBenefitTypeKey, getPlanUrlStringParam, MEDPLUS_ADVANTAGE_URL_PREFIX } from "../constants/SubscriptionConstants";
import StrecturedDataMemberShip from './StrecturedDataMemberShip'
import { SubscriptionPlan, SubscriptionBuyNow } from '../../../Analytics/Analytics'
import NoPlansFound from "./NoPlansFound";
import { getPlanType } from "../../../helpers/CommonUtil";
import SubscriptionService from "../services/SubscriptionService";
import MemberShipPlanCardGhostImages from "./MemberShipPlanCardGhostImages";

const MembershipPlans=(props)=>{
    const validate = Validate();
    const dispatch = useDispatch();
    const subscribedPlanId = props.subscribedPlanId;
    const [homePagePlans, setHomePagePlans] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        SubscriptionService().getHomePagePlans().then(data => {
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.dataObject) && "SUCCESS" == data.statusCode) {
                setHomePagePlans(data.dataObject);
            }
            setLoader(false);
        }).catch(error => {
            console.log("Error while fetching home page plans", error);
            setLoader(false);
        })
    }, []);

    const redirectToPlanDetail = (planDetails) => {
        dispatch({ type: SAVE_PLAN_DETAILS, data: planDetails });
        props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionPlan/` + getPlanUrlStringParam(planDetails.name, planDetails.planId));
    }

    return (
        <React.Fragment>
            <div className="my-4 py-2">
                <section>
                    <div className={(validate.isNotEmpty(props.isCorporatePlan) && props.isCorporatePlan )? "select-membership-container corporate-plan" : "select-membership-container p-0 pt-4"}>
                        {validate.isEmpty(props.isCorporatePlan) && !props.isCorporatePlan && <IndividualMemberPlan redirectToPlanDetail={redirectToPlanDetail} subscriptionPlans={Object.values(homePagePlans)} subscribedPlanId={subscribedPlanId} onlineServingPlanIds={props.onlineServingPlanIds} bestPlanId={props.bestPlanId} history={props.history} subscriptions={props.subscriptions} customerAllowedPlanPurchase={props.customerAllowedPlanPurchase} loader = {loader}></IndividualMemberPlan>}
                        {validate.isNotEmpty(props.isCorporatePlan) && props.isCorporatePlan && <CorporateMemberPlan redirectToPlanDetail={redirectToPlanDetail} history={props.history}/>}
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}
export default MembershipPlans

export const IndividualMemberPlan = (props) => {

    const validate = Validate();

    const subscriptions = props.subscriptions;

    const subscriptionPlans = props.subscriptionPlans;
    const onlineServingPlanIds = props.onlineServingPlanIds

    const subscribedPlanId = props.subscribedPlanId ? props.subscribedPlanId : [];

    const bestPlanId = props.bestPlanId;

    const customerAllowedPlanPurchase = props.customerAllowedPlanPurchase;
    const subscribedPlan = subscriptionPlans && subscriptionPlans.filter((plan) => (subscribedPlanId.includes(plan.planId) && onlineServingPlanIds.includes(plan.planId)));
    const remainingPlans = subscriptionPlans && subscriptionPlans.filter((plan) => (!subscribedPlanId.includes(plan.planId) && onlineServingPlanIds.includes(plan.planId)));

    const pendingSubscription = subscriptions && subscriptions.filter((each) => each.status === "PENDING");

    const mergedSubscriptionPlans = useMemo(() => {   
        return validate.isNotEmpty(subscribedPlan) ? [...subscribedPlan, ...remainingPlans] : [...remainingPlans];
    },[props.subscriptionPlans , props.onlineServingPlanIds])
    
    const [hasComboPlan , setHasComboPlan]  = useState(0)

    const redirectToAnalysis = (planDetails,planStyle) => {
        SubscriptionPlan(planDetails,planStyle)
    }
    const dispatch = useDispatch();

    useEffect(()=>{
        checkforCombo()
    },[mergedSubscriptionPlans])

    const settings = {
        dots: false,
        infinite: (mergedSubscriptionPlans.length ==1 && hasComboPlan == 1) ? false : true,
        speed: 500,
        slidesToShow: (hasComboPlan > 1 && hasComboPlan ==  mergedSubscriptionPlans.length ) ? 1 : (hasComboPlan == 0) ? 3 : 2,
        slidesToScroll: 1,
        variableWidth:true,
        responsive: [
            
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
          ],
        prevArrow: <SliderPrevArrow/>,
        nextArrow: <SliderNextArrow/>
      };

    const redirectToMembersPage = async (plan, isFromRenewal)=>{
        dispatch({type : SET_PLAN,data:plan.planId});
        let planType = getPlanType(plan);
        dispatch({type: SET_PLAN_TYPE,data:planType});
        SubscriptionBuyNow(plan);

        if (isFromRenewal) {
            props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionMembers?isFromRenewal=true`);
        } else {
            props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionMembers`);
        }
    }
    
      function SliderPrevArrow(props) {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g transform="translate(-868.478 786) rotate(-90)">
                        <rect fill="none" width="24" height="24" transform="translate(762 868.477)"/>
                        <path fill="#fff" d="M61.848,465.874l-5.541,5.541a1.256,1.256,0,1,0,1.776,1.776l4.653-4.64,4.655,4.655a1.261,1.261,0,0,0,2.149-.888,1.248,1.248,0,0,0-.373-.888l-5.543-5.556A1.26,1.26,0,0,0,61.848,465.874Z" transform="translate(711.498 410.651)"/>
                    </g>
                </svg>
            </div>
        );
    }
    function SliderNextArrow(props) {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g transform="translate(-906.838 786) rotate(-90)">
                        <rect fill="none" width="24" height="24" transform="translate(762 906.838)"/>
                        <path fill="#fff" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)"/>
                    </g>
                </svg>
            </div>
        );
    }

    const getIsSubscribed = (plan) => {
        let subscriptionList = subscriptions && subscriptions.filter((each) => each.status === "ACTIVE");
        if (Validate().isNotEmpty(subscriptionList) && (subscriptionList.length == 2 || !plan.benefitType)) {
            return true
        } else {
            let isSubscribed = false;
            if (Validate().isNotEmpty(subscriptionList) && subscriptionList.length > 0) {
                subscriptionList.map((each) => {
                    if (each.benefitType == plan.benefitType) {
                        isSubscribed = true;
                    }
                });
            }
            return isSubscribed
        }
    }

    const checkforCombo = ()=>{
        let comboplans = 0;
        for (let subscription of mergedSubscriptionPlans) {
                if(subscription.pharmaPlan && subscription.healthPlan){
                    comboplans = comboplans + 1
                }
        }
        setHasComboPlan(comboplans)
    }

    const handleRedirection = (plan, isFromRenewal) => {
        if (customerAllowedPlanPurchase[getBenefitTypeKey(plan.benefitType)] && getIsSubscribed(plan)) {
            redirectToMembersPage(plan, isFromRenewal);
        } else {
            props.redirectToPlanDetail(plan);
            redirectToAnalysis(plan, 'Individual Member')
        }
    }

    const getComboPlanCard = (plan) => {
        return (
            <div className="comboplanecard text-center overflow-hidden">
                <h2 className="text-center font-weight-bold comboplan-title">{plan.name}</h2>
                {/* <p className="font-weight-bold p-2 combo-plan-badge custom-badge-Best pr-4">Best Plan</p> */}
                {((bestPlanId == plan.planId) || (subscribedPlanId).includes(plan.planId)) ? <p className={` font-weight-bold p-2 combo-plan-badge pr-4 ${(((subscribedPlanId).includes(plan.planId) && bestPlanId == plan.planId) || ((subscribedPlanId).includes(plan.planId))) ? 'custom-badge-active' : 'custom-badge-Best'}`}>{(((subscribedPlanId).includes(plan.planId) && bestPlanId == plan.planId) || ((subscribedPlanId).includes(plan.planId))) ? 'Active Plan' : 'Best Plan'}</p> : <p className="font-weight-bold p-2 combo-plan-badge custom-badge-combo pr-4"> Multi plan</p>}
                <div className="d-flex">
                    {[plan.pharmaPlan, plan.healthPlan].map((item, index) => {
                        return (
                            <React.Fragment>
                                <div className="each-membership-plan">
                                    <h4 className="mb-3 truncate-line-2 display-name">{item.name}</h4>
                                    <h6 className="price-text mb-4">
                                        <span className="rupee">&#x20B9;</span>{item.price}
                                        &nbsp;
                                        <span className="rupee h5" style={{ "color": "#6c757d" }}>&#x20B9;</span>
                                        <del className="h4 striked-text" style={{ "color": "unset" }}>{item.amount}</del>
                                    </h6>
                                    <ul>
                                        {item.bulletPoints.map((each, index) => {
                                            return (
                                                <li className={index == item.bulletPoints.length - 1 ? "mb-0" : "mb-3"}><p className="mb-0" style={{ "maxHeight": "3.1875rem",'word-break': 'break-word' }} dangerouslySetInnerHTML={{ __html: each }}></p></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                {index == 0 && <div className="vertical-dashed-seperator">
                                    <span class="shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                                        <g id="add-icn-16" transform="translate(-170 -84)">
                                            <rect id="Rectangle_10432" data-name="Rectangle 10432" width="40" height="40" rx="20" transform="translate(170 84)" fill="#f8f9fa" />
                                            <g id="add-icn-16-2" data-name="add-icn-16" transform="translate(172.5 86.5)">
                                                <path id="Path_47170" data-name="Path 47170" d="M17.5,0A17.5,17.5,0,1,0,35,17.5,17.516,17.516,0,0,0,17.5,0Zm0,32.605A15.105,15.105,0,1,1,32.605,17.5,15.126,15.126,0,0,1,17.5,32.605Z" fill="#11b094" />
                                                <path id="Path_47171" data-name="Path 47171" d="M13.07.359a1.179,1.179,0,0,0-1.695,0L6.733,5,2.054.359a1.179,1.179,0,0,0-1.695,0,1.179,1.179,0,0,0,0,1.695L5.038,6.7.4,11.375a1.179,1.179,0,0,0,0,1.695,1.23,1.23,0,0,0,.847.332,1.23,1.23,0,0,0,.847-.332L6.733,8.391l4.679,4.679a1.249,1.249,0,0,0,1.695,0,1.179,1.179,0,0,0,0-1.695L8.428,6.7l4.679-4.679A1.168,1.168,0,0,0,13.07.359Z" transform="translate(17.477 8.005) rotate(45)" fill="#11b094" />
                                            </g>
                                        </g>
                                    </svg></span>
                                </div>}
                            </React.Fragment>
                        )
                    })}
                </div>

                <div className={customerAllowedPlanPurchase[getBenefitTypeKey(plan.benefitType)] ? "d-flex align-items-center px-3 button-footer justify-content-center button-footer" : "d-flex align-items-center justify-content-center button-footer"}>
                    {getIsSubscribed(plan) && <button className={"btn rounded-pill custom-btn-lg px-4 mx-2 learnmore-btn btn-outline-dark"} onClick={() => { props.redirectToPlanDetail(plan); redirectToAnalysis(plan, 'Individual Member') }}>
                        Explore More
                    </button>}
                    {(customerAllowedPlanPurchase[getBenefitTypeKey(plan.benefitType)] || pendingSubscription.length == subscriptions.length) && <>
                        <button className={`btn rounded-pill custom-btn-lg px-4 mx-2 btn-outline-brand renewPlan`} onClick={() => { handleRedirection(plan, validate.isNotEmpty(subscribedPlanId) && (subscribedPlanId).includes(plan.planId)) }}>
                            {(validate.isNotEmpty(subscribedPlanId) && (subscribedPlanId).includes(plan.planId)) ? "Renew Now" : validate.isEmpty(plan.benefitType) ? <>Buy Now @ &#x20B9;{plan.price}/-</> : "Buy Now"}
                        </button>
                    </>}
                </div>
            </div>);
    }

    const getcardActionButtons = (plan) => {
        return (
            <div className={customerAllowedPlanPurchase[getBenefitTypeKey(plan.benefitType)] ? "d-flex align-items-center px-3 button-footer" : "d-flex align-items-center justify-content-center button-footer"}>
                {getIsSubscribed(plan) && <button className={`btn btn-outline-dark rounded-pill learnmore-btn custom-btn-lg px-4 ${(subscribedPlanId).includes(plan.planId) && !customerAllowedPlanPurchase[getBenefitTypeKey(plan.benefitType)] ? "active-best-btn" : ""}`} onClick={() => { props.redirectToPlanDetail(plan); redirectToAnalysis(plan, 'Individual Member') }}>
                    Explore More
                </button>}
                {(customerAllowedPlanPurchase[getBenefitTypeKey(plan.benefitType)] || pendingSubscription.find((each) => each.benefitType == plan.benefitType)) && <>
                    <button className={`btn rounded-pill custom-btn-lg px-4  ${(subscribedPlanId).includes(plan.planId) ? "active-best-btn" : "btn-outline-brand renewPlan"}    `} onClick={() => { handleRedirection(plan, validate.isNotEmpty(subscribedPlanId) && (subscribedPlanId).includes(plan.planId)) }}>
                        {(validate.isNotEmpty(subscribedPlanId) && (subscribedPlanId).includes(plan.planId)) ? "Renew Now" : validate.isEmpty(plan.benefitType) ? <>Buy Now @ &#x20B9;{plan.price}/-</> : "Buy Now"}
                    </button>
                </>}

            </div>
        )
    }

    return (
        <React.Fragment>
            {props.loader ? <React.Fragment> <MemberShipPlanCardGhostImages /> </React.Fragment> :
            <React.Fragment>
            {mergedSubscriptionPlans.length > 0 && <h6 className="title text-center mb-0 display-3 h2 font-weight-bold">Select a MedPlus Advantage Plan</h6>}
            {(mergedSubscriptionPlans.length > 3 || hasComboPlan > 0) && <div className="justify-content-center">
                {validate.isNotEmpty(mergedSubscriptionPlans) &&
                    <div className="container">
                        <Slider className={`subscription-plans-slider ${(mergedSubscriptionPlans.length == 1 && hasComboPlan == 1) ? "custom-slick-centered":"" } ${hasComboPlan > 0 ? "subscription-plans-slider-combo-plan" : ""}`} {...settings}>
                            {mergedSubscriptionPlans.map(plan =>
                                plan.pharmaPlan && plan.healthPlan ? getComboPlanCard(plan) :
                                    <div>
                                        <div className={((((subscribedPlanId).indexOf(plan.planId) !== -1) && bestPlanId == plan.planId) || ((subscribedPlanId).includes(plan.planId))) ? "each-membership-plan active-plan-card " : (bestPlanId == plan.planId && validate.isNotEmpty(subscribedPlanId)) ? "each-membership-plan custom-border-success  border " : (bestPlanId == plan.planId) ? "each-membership-plan best-plan-card" : "each-membership-plan"} style={{ "width": "22.5rem" }}>
                                            {((bestPlanId == plan.planId) || (subscribedPlanId).includes(plan.planId)) && <p className={`heading text-center mb-4 py-2 ${((bestPlanId == plan.planId && (subscribedPlanId).includes(plan.planId)) || ((subscribedPlanId).includes(plan.planId))) ? 'custom-badge-active' : (bestPlanId == plan.planId && validate.isNotEmpty(subscribedPlanId)) ? "custom-badge-success" : 'custom-badge-light'}`}>{(((subscribedPlanId).includes(plan.planId) && bestPlanId == plan.planId) || ((subscribedPlanId).includes(plan.planId))) ? 'Active Plan' : 'Best Plan'}</p>}
                                            <h3 className="mb-3 truncate-line-2 display-name" style={{ "maxHeight": "4.75rem" }}>{plan.name}</h3>
                                            <h6 className="price-text mb-4">
                                                <span className="rupee">&#x20B9;</span>{plan.price}&nbsp;
                                                <span className="striked-text">
                                                    <span className="rupee h5" style={{ "color": "unset" }}>&#x20B9;</span>
                                                    <del className="h4" style={{ "color": "unset" }}>{plan.amount}</del>
                                                </span>
                                            </h6>
                                            <ul className="mb-4">
                                                {validate.isNotEmpty(plan) && plan.bulletPoints.map((each, index) => {
                                                    return (
                                                        <li className={index == plan.bulletPoints.length - 1 ? "mb-0" : "mb-3"}><p className="mb-0" style={{ "maxHeight": "3.1875rem",'word-break': 'break-word' }} dangerouslySetInnerHTML={{ __html: each }}></p></li>
                                                    )
                                                })}
                                            </ul>
                                            {getcardActionButtons(plan)}
                                        </div>
                                    </div>)
                            }
                        </Slider>
                    </div>
                }
            </div>}
            {(mergedSubscriptionPlans.length <= 3 && hasComboPlan == 0) && <div className={hasComboPlan ? "d-flex justify-content-center py-4 subscription-plans-slider-combo-plan" : "d-flex justify-content-center py-4"}>
                {validate.isNotEmpty(mergedSubscriptionPlans) && mergedSubscriptionPlans.map((plan) =>
                    plan.pharmaPlan && plan.healthPlan ? <div className="mx-3">{getComboPlanCard(plan)}</div> :
                        <React.Fragment>
                            <div className={(((subscribedPlanId).includes(plan.planId) && bestPlanId == plan.planId) || ((subscribedPlanId).includes(plan.planId))) ? "each-membership-plan active-plan-card mx-3" : (bestPlanId == plan.planId && validate.isNotEmpty(subscribedPlanId)) ? "each-membership-plan custom-border-success  border mx-3" : (bestPlanId == plan.planId) ? "each-membership-plan best-plan-card mx-3" : "each-membership-plan mx-3"} style={{ "width": "22.5rem" }}>
                                {((bestPlanId == plan.planId) || (subscribedPlanId).includes(plan.planId)) && <p className={`heading text-center mb-4 py-2 ${((bestPlanId == plan.planId && (subscribedPlanId).includes(plan.planId)) || ((subscribedPlanId).includes(plan.planId))) ? 'custom-badge-active' : (bestPlanId == plan.planId && validate.isNotEmpty(subscribedPlanId)) ? "custom-badge-success" : 'custom-badge-light'}`}>{(((subscribedPlanId).includes(plan.planId) && bestPlanId == plan.planId) || ((subscribedPlanId).includes(plan.planId))) ? 'Active Plan' : 'Best Plan'}</p>}
                                <h3 className="mb-5 truncate-line-2 display-name" style={{ "maxHeight": "4.75rem" }}>{plan.name}</h3>
                                <h6 className="price-text mb-4">
                                    <span className="rupee mr-1">&#x20B9;</span>{plan.price}&nbsp;
                                    <span className="striked-text">
                                        <span className="rupee h5" style={{ "color": "unset" }}>&#x20B9;</span>
                                        <del className="h4" style={{ "color": "unset" }}>{plan.amount}</del>
                                    </span>
                                </h6>
                                <ul className="mb-4">
                                    {plan.bulletPoints.map((each, index) => {
                                        return (
                                            <li className={index == plan.bulletPoints.length - 1 ? "mb-0" : "mb-3"}><p className="mb-0 truncate-line-2" style={{ "maxHeight": "3.1875rem",'word-break': 'break-word' }} dangerouslySetInnerHTML={{ __html: each }}></p></li>
                                        )
                                    })}
                                </ul>
                                {getcardActionButtons(plan)}
                            </div>

                            <StrecturedDataMemberShip name={plan.name} price={plan.price} mrp={plan.amount} description={plan.benefits} />
                        </React.Fragment>)
                }
            </div>}
            </React.Fragment>}
            {!props.loader && mergedSubscriptionPlans.length == 0 && <NoPlansFound />}
        </React.Fragment>
    )
}