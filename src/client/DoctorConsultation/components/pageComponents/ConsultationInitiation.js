import React, { useEffect, useState } from 'react';
import db from '../../../DataBase/LocalDB';
import Validate from '../../../helpers/Validate';
import DoctorConsultationService from '../../services/DoctorConsultationService';;


export default (props)=>{
    const [loader,setLoader]= useState(true);
    useEffect(()=>{
        const orderId = props.match.params.orderId;
        DoctorConsultationService().getConsultationUrl({"orderId":orderId}).then(data=>{
            if(Validate().isNotEmpty(data) && data.statusCode === "SUCCESS"){
               handleRedirection(data.dataObject);
            }else{
               handleRedirection(`/consultationresponse?RESPONSE_STATUS=FAILURE&RESPONSE_MESSAGE=${data.message}`);
            }
        }).catch(err=>{
            setLoader(false);
            handleRedirection(`/consultationresponse?RESPONSE_STATUS=FAILURE&RESPONSE_MESSAGE=Something went wrong`);

        })
    },[]);

    const handleRedirection = (url) => {
        const windowHistoryLength = window.history.length;
        db.setValue("historyLength",windowHistoryLength);
        setTimeout(() => {
            window.location.replace(url);
        }, 500);
    }

    return <React.Fragment>
        {loader && <div className="backdrop">
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            </div>}
            
    </React.Fragment>

}