import React, {useEffect, useState} from "react";
import LabCheckOutService from "../../../Services/LabCheckoutService";
import DoctorCheckoutService from "../../../../../DoctorConsultation/services/DoctorCheckoutService";
import Validate from "../../../../../helpers/Validate";
import Promotion from "../../../../Checkout/OrderReview/Promotion";
import OrderReviewGhostImage from "../../../../Checkout/OrderReview/OrderReviewGhostImage";
import Alert from "../../../../Common/Alert";
const ApplyCoupon = (props) => {

    const validate = Validate();
    const labCheckOutService = LabCheckOutService();
    const doctorCheckoutService = DoctorCheckoutService();
    const [couponCode, setCouponCode] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [failureMsg, setFailureMsg] = useState("");
    const [initialLoader, setInitialLoader] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [toastInfo,setToastInfo] = useState({ message: "", type: "" });
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    useEffect(()=>{
        if(validate.isNotEmpty(props.couponCode)){
            applyCouponCode(props.couponCode);
        }
    },[props.couponCode])


    const applyCouponCode = (couponCode) =>{
        if(!validateCouponCode(couponCode)){
            return;
        }
        setButtonLoading(true);
        if(props.isDoctorConsultation){
            doctorCheckoutService.applyCoupon({"couponCode" : couponCode}).then(data => {
                if(data.statusCode === "SUCCESS"){
                    props.setParentState(data.dataObject);
                    setCouponCode(couponCode.toUpperCase());
                    setSuccessMsg("Coupon Applied Successfully");
                }else if(validate.isNotEmpty(data) && "FAILURE" == data.statusCode && validate.isNotEmpty(data.message) && validate.isNotEmpty(data.dataObject) && data.dataObject == "true"){
                    setToastInfo({message:"You have reached the maximum number of attempts, please try after some time.", type: ""});
                    setFailureMsg(data.message);
                }else{
                    setFailureMsg(data.message);
                }
                setButtonLoading(false);
            }).catch(err=>{
                setButtonLoading(false);
                setFailureMsg({message:"Something went wrong",type:'danger'});
                console.log("Error while adding coupon", err);
            });
        } else {
            labCheckOutService.applyCoupon(couponCode).then(response=>{
                if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode && validate.isNotEmpty(response.responseData)){
                    props.setParentState(response.responseData);
                    setCouponCode(response.responseData.labCartInfo.couponCode.toUpperCase());
                    setSuccessMsg("Coupon Applied Successfully");
                } else if(validate.isNotEmpty(response) && "FAILURE" == response.statusCode && validate.isNotEmpty(response.message) && validate.isEmpty(response.responseData)){
                    setFailureMsg(response.message);
                }
                else if(validate.isNotEmpty(response) && "FAILURE" == response.statusCode && validate.isNotEmpty(response.message) && validate.isNotEmpty(response.responseData) && response.responseData == "true"){
                    setToastInfo({message:"You have reached the maximum number of attempts, please try after some time.", type: ""});
                    setFailureMsg(response.message);
                }else {
                    setFailureMsg("Unable to apply Coupon");
                }
                setButtonLoading(false);
            }).catch((err)=>{
                setButtonLoading(false);
                setFailureMsg({message:"Something went wrong",type:'danger'});
                console.log("Error while adding coupon", err);
            })
        }
        
    }

    const validateCouponCode=(couponCode)=>{
        if(validate.isEmpty(couponCode)) {
            setFailureMsg('Please enter coupon code');
            return false;
        } 
        if( /[^a-zA-Z0-9\-\/]/.test(couponCode ) ) {
           setFailureMsg('Invalid Coupon Code');
            return false;
        }
        return true;     
    }

    const removeCouponCode = (couponCode) =>{
        setButtonLoading(true);
        if(props.isDoctorConsultation){
            doctorCheckoutService.removeCoupon({"couponCode" : couponCode}).then(data => {
                if(data.statusCode === "SUCCESS"){
                    props.setParentState(data.dataObject);
                    setSuccessMsg("");
                    setFailureMsg("");
                    setCouponCode("");
                }else{
                    setFailureMsg({message:response.message,type:'danger'});
                }
                setButtonLoading(false);
            }).catch((err)=>{
                setButtonLoading(false);
                setFailureMsg({message:"Something went wrong",type:'danger'});
                setCouponCode('');
                console.log("Error while removing coupon", err);
            });
        } else {
            labCheckOutService.removeCoupon(couponCode).then(response=>{
                if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode && validate.isNotEmpty(response.responseData)){
                    props.setParentState(response.responseData);
                    setSuccessMsg("");
                    setFailureMsg("");
                    setCouponCode("");
                } else {
                    setFailureMsg({message:response.message,type:'danger'});
                }
                setButtonLoading(false);
            }).catch((err)=>{
                setButtonLoading(false);
                setFailureMsg({message:"Something went wrong",type:'danger'});
                setCouponCode('');
                console.log("Error while removing coupon", err);
            })
        }
        
    }

    return(
        <React.Fragment>
            {initialLoader && !buttonLoading && <OrderReviewGhostImage isOrderDetailsLoading={true}/>}
            {!initialLoader && <Promotion promotionBanners={{}} isLoading= {buttonLoading}
                                applyCouponCode={applyCouponCode} removeCouponCode={removeCouponCode} 
                                applyCouponSuccessMsg={successMsg} applyCouponFailureMsg={failureMsg}
                                couponCode = {couponCode} header="Apply Coupon" disableApplyCoupon={props.disableApplyCoupon}
            />}
            {validate.isNotEmpty(toastInfo) &&
            <Alert className="toast-container b-m" alertInfo={toastInfo} onDurationEnd={setToastInfo} duration='3500'/>}
        </React.Fragment>
    )
}

export default ApplyCoupon;