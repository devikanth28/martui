import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import Validate from "../../../helpers/Validate"
import HomePageSeperator from "../../../images/common/lab-home-seperator.png";
import { BannerPageValues } from "../constants/SubscriptionConstants";
import SubscriptionService from "../services/SubscriptionService";
import { BannerPlanDetail } from "../constants/SubscriptionConstants";
const SubscriptionBanner =(props) =>{

    const [initialLoader, setInitialLoader] = useState(true);
    const [bannerSrc, setBannerSrc] = useState("");
    const [alternateValue,setAlternateValue]= useState("");
    const validate = Validate();
    const  locality = useSelector((state)=>{
        if(validate.isNotEmpty(state.locality) && validate.isNotEmpty(state.locality.selectedLocality))
            return state.locality.selectedLocality
    });
    useEffect(() => {
        let catalogId = 'CATALOG_DFT1';
        if (locality && validate.isNotEmpty(locality.catalogId)) {
            catalogId = locality.catalogId;
        }
        const obj = { REQUEST_OBJ: JSON.stringify({ 'catalogId': catalogId, 'requestFor': 'WEB', 'pageName': props.pageName === BannerPlanDetail ? `${BannerPageValues[props.pageName]}_${props.planId}`: BannerPageValues[props.pageName], 'screenLocation': null }) };
        SubscriptionService().getSubscriptionBanner(obj).then(data => {
            if (data.statusCode === "SUCCESS" && validate.isNotEmpty(data['dataObject']) && validate.isNotEmpty(data['dataObject']['bannerPromotion'] && validate.isNotEmpty(data['dataObject']['bannerPromotion']['bannerPromoDetails']))) {
                setBannerSrc(data['dataObject']['bannerPromotion']['bannerPromoDetails'].TOP[0].imagePath);
                setAlternateValue(data['dataObject']['bannerPromotion']['bannerPromoDetails'].TOP[0].alternativeValue);
            }
            setInitialLoader(false);
        }).catch(e =>{
            console.log(e);
            setInitialLoader(false);
        });
    }, []);

    useEffect(()=>{
        let catalogId = 'CATALOG_DFT1';
        if (locality && validate.isNotEmpty(locality.catalogId)) {
            catalogId = locality.catalogId;
        }
        const obj = { REQUEST_OBJ: JSON.stringify({ 'catalogId': catalogId, 'requestFor': 'WEB', 'pageName': props.pageName === BannerPlanDetail ? `${BannerPageValues[props.pageName]}_${props.planId}` : BannerPageValues[props.pageName], 'screenLocation': null }) };
        SubscriptionService().getSubscriptionBanner(obj).then(data => {
            if (data.statusCode === "SUCCESS" && validate.isNotEmpty(data['dataObject']) && validate.isNotEmpty(data['dataObject']['bannerPromotion'] && validate.isNotEmpty(data['dataObject']['bannerPromotion']['bannerPromoDetails']))) {
                setBannerSrc(data['dataObject']['bannerPromotion']['bannerPromoDetails'].TOP[0].imagePath);
                setAlternateValue(data['dataObject']['bannerPromotion']['bannerPromoDetails'].TOP[0].alternativeValue);
            }else{
                setBannerSrc("");
                setAlternateValue("");
            }
            setInitialLoader(false);
        }).catch(e =>{
            console.log(e);
            setInitialLoader(false);
            setBannerSrc("");
            setAlternateValue("");
        });

    },[locality])


    const getGhostImage = () => {
        return  <section className={validate.isNotEmpty(props.sectionClass) ? props.sectionClass : ""}>
                <div className={ validate.isNotEmpty(props.className) ? props.className : "mb-4 d-block pb-2 bg-white" }>
                    <div className="border-0 m-0 p-0 ph-item">
                        <div className="ph-col-12 p-0">
                            <div className="ph-row p-0 mb-0">
                                <div className="ph-picture mb-0" style={{"height": "200px"}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
    }

    if(initialLoader){
        return getGhostImage();
    }

    return(
        <React.Fragment>
            {validate.isNotEmpty(bannerSrc) && <section className={validate.isNotEmpty(props.sectionClass) ? props.sectionClass : ""}>
{/*                 <a href="javascript:void(0)" onClick={(e)=> e.preventDefault()} title="click to know more" className={props.className ? props.className :" mb-4 d-block pb-2 bg-white"}>
 */}                    <img src={bannerSrc} alt={alternateValue} className={props.className ? `${props.className} w-100` :" mb-4 d-block pb-2 rounded w-100"} />
                {/* </a> */}
            </section>}
        </React.Fragment>
    )
}
export default SubscriptionBanner