import React, { useEffect, useState } from "react";
import CODMode from "../../../../components/Checkout/Payments/CODMode";
import OnlinePaymentMode from "../../../../components/Checkout/Payments/OnlinePaymentMode";
import Validate from "../../../../helpers/Validate";
import LabCheckOutService from "../../../../components/MedplusLabs/Services/LabCheckoutService";
import PaymentGhostImage from "../../../../components/Checkout/Payments/PaymentGhostImage";


const PaymentOptions = (props)=>{
    const validate = Validate();
    
    const [captchaData, setCaptchaData] = useState(null);
    const [captchaCode, setCaptchaCode] = useState(null);
    const [selectedDiscount, setSelectedDiscount] = useState({});
    const labCheckOutService = LabCheckOutService();

    useEffect(() => {
        if(props.isCodAllowed){
            getCaptchaImage();
        }
    }, [props.isCodAllowed]);

    const getCaptchaImage = () => {
        labCheckOutService.getCaptch().then((response)=>{
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
                setCaptchaCode("");
                setCaptchaData(response.responseData);
            }
        },(err)=>{
            console.log('error getting captcha', err);
        })
    }

    const handlePaymentModeClick = (selectedPaymentMode, paymentType)=>{
        props.handleBooking(paymentType,selectedPaymentMode);
    }

    const handleCODModeClick = (paymentType)=>{
        props.handleBooking(paymentType,"COD",captchaCode);
    }

    if(props.paymentOptionsLoader){
        return(
            <PaymentGhostImage isDoctorReviewPage = {true}/>
        )
    }

   return (
        <React.Fragment>
            <main role="main" className="container-fluid container-lg">
                <div className="row px-sm-3">
                    <div className="col-12 px-0">
                        <section>
                            <div className="header">
                                <p>Payment Options</p>
                            </div>
                            {props.isRetryPayment &&
                                <p class="px-3 text-orange mb-1">The recent payment you attempted failed. Please try the below options to complete your payment.</p>
                            }
                            <div className="payment-options pt-2">
                                <ul>
                                    {validate.isNotEmpty(props.paymentOptions) && props.paymentOptions.map(eachMode => {
                                        return(
                                        <OnlinePaymentMode key={eachMode.modeId} onPaymentSelect={handlePaymentModeClick}
                                            createOrderLoader={props.selectedOnlineMode} mode={eachMode} />
                                        )
                                    })}
                                    {props.isCodAllowed && captchaData &&
                                        <CODMode onPaymentSelect={handleCODModeClick} captchaData={captchaData} 
                                        refreshCaptcha={()=>getCaptchaImage()} handleOnChangeCaptcha={(captchaTxt)=>setCaptchaCode(captchaTxt)}
                                        captchaText={captchaCode} createOrderLoader={props.isCODOrderBtnLoading} selectedDiscount={selectedDiscount} 
                                        mode={{'displayName':'Now you can pay with cash when at clinic. No UPI or online payment will be accepted at clinic.'}}
                                        vertical={"doctor"}/>
                                    } 
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </React.Fragment>        
    )
}
export default PaymentOptions;