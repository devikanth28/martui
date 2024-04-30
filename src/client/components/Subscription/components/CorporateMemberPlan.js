import React,{useEffect, useState} from "react";
import Slider from "react-slick";
import Validate from "../../../helpers/Validate";
import {useSelector, useDispatch } from "react-redux";
import SubscriptionService from "../services/SubscriptionService";
import Alert, {ALERT_TYPE_INFO} from '../../Common/Alert';
import {SAVE_PLAN_DETAILS} from '../redux/SubscriptionReducer';
import {getPlanUrlStringParam, MEDPLUS_ADVANTAGE_URL_PREFIX} from "../constants/SubscriptionConstants";
import {SubscriptionPlan} from '../../../Analytics/Analytics'

const CorporateMemberPlan = (props) =>{

    const validate = Validate();
    const dispatch = useDispatch();
    const[corporatePlanDataLoaded, setCorporatePlanDataLoaded] = useState(false);
    const[plans, setPlans] = useState([]);
    const [alertData, setAlertData] = useState({});
    const subscriptionService  = SubscriptionService();
    const [bestPlanIndex, setBestPlanIndex] = useState(1);
    const [settings, setSettings] = useState({
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <SliderPrevArrow/>,
        nextArrow: <SliderNextArrow/>
      });
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
    const companyDetails = useSelector(state=>{
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.companyDetails)){
            return state.subscription.companyDetails;
        }
    });
    
    const corporateEmailId = useSelector(state=>{
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.corporateEmailId)){
            return state.subscription.corporateEmailId;
        }
    });

   useEffect(() => {
        let corporateEmailDomain ;
        if(validate.isNotEmpty(corporateEmailId))
            corporateEmailDomain  = corporateEmailId.split("@")[1];
        if(validate.isEmpty(companyDetails) || validate.isEmpty(companyDetails.emailDomains) || companyDetails.emailDomains.indexOf(corporateEmailDomain) === -1){
            props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/companyList`);
        } else{
           subscriptionService.getPlansForOrganization({"organizationId":companyDetails.orgId}).then(data => {
                if (data.statusCode === "SUCCESS" && validate.isNotEmpty(data['dataObject'])) {
                    if(validate.isNotEmpty(data.dataObject) && data.dataObject.length == 1 && validate.isNotEmpty(data.dataObject[0])){
                        dispatch({type : SAVE_PLAN_DETAILS, data:data.dataObject[0]});
                        props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionPlan/`+getPlanUrlStringParam(data.dataObject[0].name,data.dataObject[0].id));
                    }else{
                        const dataLength = data.dataObject.length ;
                        if(dataLength > 3){
                            setBestPlanIndex(parseInt(dataLength/2));
                        }else{
                            setSettings({...settings, slidesToShow:dataLength})
                        }
                        setPlans(data.dataObject);
                    }
                } else{
                    setAlertData({message:'Plan details not found',type:ALERT_TYPE_INFO});
                }
                setCorporatePlanDataLoaded(true);
            }).catch(e =>{
                console.log(e);
                setCorporatePlanDataLoaded(true);
                setAlertData({message:'Something went wrong',type:ALERT_TYPE_INFO});
            });
        }
    },[])

    const clearError = () => {
        setAlertData({});
        props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/companyList`);
    }

    const redirectToAnalysis = (planDetails,planStyle) => {
        SubscriptionPlan(planDetails,planStyle)
    }

    const getGhostImageForMembershipPlans = () => {
        return <div className="my-4 py-2">
        <section>
          <div className="select-membership-container corporate-plan">
              <div style={{'background-color': 'unset'}} className="ph-item p-0 m-0">
                 <div className="ph-col-12 p-0 mb-5">
                    <div className="ph-row mb-5 pb-3" style={{'height':'73px'}}>
                       <div className="ph-col-12 p-0 m-0" style={{'height':'73px'}}></div>
                    </div>
                    <div className="d-flex justify-content-center">
                       <div className="each-membership-plan">
                          <div className="ph-row m-0 p-0">
                             <div className="ph-col-12 p-0 mb-3" style={{'height':'38px'}}></div>
                          </div>
                          <div className="ph-row m-0 p-0">
                             <div className="ph-col-12 p-0 mb-5" style={{'height':'100px'}}></div>
                          </div>
                          <div className="ph-row m-0 p-0">
                             <div className="ph-col-12 p-0 mb-5 pb-3" style={{'height':'192px'}}></div>
                          </div>
                          <div className="ph-row m-0 p-0">
                             <div className="ph-col-8 rounded ml-auto mr-auto mb-0 rounded-pill p-0" style={{'height':'48px'}}></div>
                          </div>
                       </div>
                       <div className="each-membership-plan active-card pt-0">
                          {/* <div className="ph-row p-0 m-0">
                             <div className="ph-col-12 p-0 mb-4 py-2" style={{'height':'40px'}}></div>
                          </div> */}
                          <div className="ph-row p-0 m-0">
                             <div className="ph-col-12 p-0 mb-3" style={{'height':'38px'}}></div>
                          </div>
                          <div className="ph-row p-0 m-0">
                             <div className="ph-col-12 p-0 mb-5" style={{'height':'100px'}}></div>
                          </div>
                          <div className="ph-row p-0 m-0">
                             <div className="ph-col-12 p-0 mb-5 pb-3" style={{'height':'256px'}}></div>
                          </div>
                          <div className="ph-row p-0 m-0">
                             <div className="ph-col-8 rounded ml-auto mr-auto mb-0 rounded-pill p-0"  style={{'height':'48px'}}></div> 
                          </div>
                       </div>
                       <div className="each-membership-plan">
                          <div className="ph-row">
                             <div className="ph-col-12 p-0 mb-3" style={{'height':'38px'}}></div> 
                          </div>
                          <div className="ph-row">
                             <div className="ph-col-12 p-0 mb-5" style={{'height':'100px'}}></div> 
                          </div>
                          <div className="ph-row">
                             <div className="ph-col-12 p-0 mb-5 pb-3" style={{'height':'192px'}}></div> 
                          </div>
                          <div className="ph-row">
                             <div className="ph-col-8 rounded m-auto rounded-pill p-0" style={{'height':'48px'}}></div> 
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
     </div>
    }

    if(!corporatePlanDataLoaded){
        return getGhostImageForMembershipPlans();
    }

    return (
        <React.Fragment>
            {alertData && <Alert alertInfo={alertData} onDurationEnd={clearError} duration={5000} />}
            <h6 className="title text-center mb-4 pb-3">Select {validate.isNotEmpty(companyDetails.name) ? companyDetails.name: ''} Member Plan</h6>
            <div className="container">
                <Slider className="subscription-plans-slider"  {...settings}>
                    { plans &&  plans.map((planDetails) => {
                        let fees = planDetails.fees && planDetails.fees[0];
                        return <React.Fragment>{!planDetails.popular ?
                                    <div className="each-membership-plan mx-auto" key={planDetails.id}>
                                        <h6 className="h2 mb-3 truncate-line-2 display-name" style={{"minHeight" : "4.75rem"}}>{planDetails.displayName}</h6>
                                        <h6 className="price-text mb-4">
                                            <span className="rupee mr-1">&#x20B9;</span>{fees.price}
                                            {fees.mrp > fees.price &&
                                            <span className="striked-text">
                                                <span className="rupee h5 mr-1" style={{"color" : "unset"}}>&#x20B9;</span>
                                                <del className="h4" style={{"color" : "unset"}}>{fees.mrp}</del>
                                            </span>}
                                        </h6>
                                        <ul className="mb-4">                             
                                            <li className="mb-0"><p className="truncate-line-2">{planDetails.shortDesc}</p></li>
                                        </ul>
                                        <button  className="btn details-btn rounded rounded-pill px-5" onClick={()=> {props.redirectToPlanDetail(planDetails);redirectToAnalysis(planDetails,"Corporate Member")}}>Learn More</button>
                                    </div> :
                                    <div className="each-membership-plan active-card pt-0 mx-auto" key={planDetails.id}>
                                        <p className="heading text-white text-center mb-4 py-2">Best Plan</p>
                                        <h6 className="h2 mb-3 truncate-line-2 display-name" style={{"minHeight" : "4.75rem"}}>{planDetails.displayName}</h6>
                                        <h6 className="price-text mb-4">
                                            <span className="rupee mr-1">&#x20B9;</span>{fees.price}
                                            {fees.mrp > fees.price &&
                                            <span className="striked-text">
                                                <span className="rupee h5 mr-1" style={{"color" : "unset"}}>&#x20B9;</span>
                                                <del className="h4" style={{"color" : "unset"}}>{fees.mrp}</del>
                                            </span>}
                                        </h6> 
                                        <ul className="mb-4">                               
                                            <li className="mb-0"><p className="truncate-line-2">  {planDetails.shortDesc}</p></li>
                                        </ul>
                                        <button className="btn details-btn rounded rounded-pill px-5"  onClick={() => {props.redirectToPlanDetail(planDetails);redirectToAnalysis(planDetails,"Corporate Member")}} >Learn More</button>
                                    </div>}
                                </React.Fragment>
                        })}
                    </Slider>
                </div>
        </React.Fragment>
    )
}

export default CorporateMemberPlan;