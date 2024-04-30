import React, { useEffect, useState } from 'react';
import Validate from "../../../helpers/Validate";
import { useTimer } from '../../Common/CustomHooks/useTimer';
import qs from 'qs'

const UaPaymentFailed = (props) => {
    const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    let redirectUrl = params?.sendTo;
    let type = params?.orderType;
    const validate = Validate()
    const [redirection,setRedirection] = useState(undefined);
    const [displayTimer,setDisplayTimer] = useState('');
    const [timerDiff,setTimerDiff,setTimer,clearTimer] = useTimer();

    useEffect(()=>{
        const redirectionObject = getRedirectionPageName()
        if(validate.isNotEmpty(redirectUrl)){
            redirectionObject['redirectUrl'] = redirectUrl;
        }
        setRedirection(redirectionObject);
        let currentDate  = new Date();
        currentDate.setSeconds(currentDate.getSeconds()+10);
        setTimer(currentDate.getTime());
    },[])

    useEffect(()=>{
        if(timerDiff <= 0){
            setDisplayTimer('');
            handleRedirect();
        } else {
            let diff = timerDiff/1000;
            let diffInMinutes =parseInt(diff / 60);
            let diffInSeconds = parseInt(Math.floor(diff) % 60);
            if(diffInMinutes < 10){
                diffInMinutes =`0${diffInMinutes}`;
            }
            if(diffInSeconds < 10){
                diffInSeconds =`0${diffInSeconds}`;
            }
            setDisplayTimer(`${diffInMinutes}:${diffInSeconds}`);
        }

    },[timerDiff])

    const handleRedirect=()=>{
        clearTimer();
        if (validate.isEmpty(redirection) || validate.isEmpty(redirection.redirectUrl)) {
            return;
        } else {
            window.location.replace(redirection.redirectUrl);
        }
    }

    const getRedirectionPageName=()=>{
        const orderType = validate.isEmpty(params) ? props?.orderType : type;
        switch(orderType){
            case "M":
                return {pageName: 'Purchase History', redirectUrl: '/ordersHistory'}
            case "L":
                return {pageName: 'My Lab orders', redirectUrl: '/labOrders'}
            case "MA":
                return {pageName: 'My Bookings', redirectUrl: '/myBookings'}
            case "D":
                return {pageName: 'My Bookings', redirectUrl: '/myBookings'}
            default:
                return {pageName: 'Home', redirectUrl: '/'}
        }
    }

    return (
        <section className={"body-height d-flex align-items-center justify-content-center"}>
            <div className="text-center m-3">
                <p className="mb-0 font-14 text-secondary">{props.message?props.message:"You can retry payment from the link received on SMS earlier. Alternately click below and login to your account to retry payment against your order"}</p>
                {validate.isNotEmpty(displayTimer) && validate.isNotEmpty(redirection) && <p title={`Redirecting to ${redirection?.pageName} in ` + displayTimer} className="mb-0 text-secondary pl-2">{`Redirecting to ${redirection?.pageName} in `}<span style={{color:"blue"}}>{`${displayTimer}`}</span></p>}
                {validate.isNotEmpty(redirection) && <button onClick={()=>{handleRedirect()}} className="btn brand-secondary my-3" >
                    {`Go ${redirection?.pageName}`}
                </button>}
            </div>
        </section>
    )
}
export default UaPaymentFailed;