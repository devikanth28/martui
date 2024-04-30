import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import SubscriptionService from "../../services/SubscriptionService";
import LocalDB from "../../../../DataBase/LocalDB";
import Validate from "../../../../helpers/Validate";
import { MEDPLUS_ADVANTAGE_URL_PREFIX } from "../../constants/SubscriptionConstants";

const SubscriptionLoginIntermediate = (props) => {

    const userInfo = useSelector(state=>state.userInfo.userInfo);
    const userContactDetails = useSelector(state=>state.userInfo.userContactDetails);
    const subscriptionService= SubscriptionService();
    const validate = Validate();

    useEffect(()=>{
        if(userInfo && userContactDetails && userContactDetails.shippingContactNumber) {
            sendOtp(userContactDetails.shippingContactNumber);
        } else {
            props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/login`)
        }
    },[]);

    const sendOtp = (mobileNumber) =>{
        let object={"MOBILE_NUMBER":mobileNumber}
        subscriptionService.customerGetOtp(object).then(data=>{
            if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode){
                let dbObject={"MOBILE_NUMBER":mobileNumber,"IsExistingCustomer":data.responseData};
                LocalDB.setValue("subscriptionCustomer",JSON.stringify(dbObject));
                props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/loginOtp`);
            } else{
                props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/login`);
            }
        }).catch(err=>{
            console.log('error:',err);
            props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/login`);
        })
    }

    return(

        <section className={validate.isNotEmpty(props.sectionClass) ? props.sectionClass : ""}>
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

    )
}

export default SubscriptionLoginIntermediate;