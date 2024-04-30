import React, {useEffect, useState} from 'react';
import Validate from '../../../helpers/Validate';
import MyAccountService  from  '../../../services/MyAccountService';
import {TrackOrderGhostImage} from './PurchaseHistoryGhostImage';
import moment from "moment";


const TrackReturn =(props) =>{
	const [trackInfo,setTrackInfo] = useState(props.martCustomerReturnRequestStatusTrack);
	const validate = Validate();
    const [showGhostImages, setShowGhostImages] = useState(false);
    const myAccountService =   MyAccountService();
    const [showStatus, setShowStatus] = useState({});
	const [finalStatus,setFinalStatus] = useState("");
	
    useEffect(()=>{
        if(validate.isNotEmpty(props.requestId) && validate.isEmpty(trackInfo)){
            showGhostImages(true);
            getTrackInfo(props.requestId);
        } 
        if (validate.isNotEmpty(props.martCustomerReturnRequestStatusTrack)) {
            prepareShowStatus(props.martCustomerReturnRequestStatusTrack);
        }
    },[props.requestId, props.martCustomerReturnRequestStatusTrack]);


    const changeOrderStatus = (status) => {
		if(validate.isNotEmpty(trackInfo[status])){
			let temp= {};
			Object.keys(showStatus).map((key) => {
				if(status == key){
					temp[key] = true;
				}
				else{
					temp[key] = false;				
				}
			})
			setShowStatus(temp);
		}
	}

    const prepareShowStatus = (trackInfo)=>{
		let tempShowStatus ={"Return" : false,"Pickup": false, "Refund" : false};
		let tempStatus = "";
		let tempFinalStatus = "";
		Object.entries(trackInfo).map(([status,martCustomerReturnRequestStatusTrack])=>{
			if(validate.isNotEmpty(martCustomerReturnRequestStatusTrack)){
				tempStatus = status;
				tempFinalStatus  = status;
			}
		});
		tempShowStatus [tempStatus] = true;
		setShowStatus(tempShowStatus); 
		setFinalStatus(tempFinalStatus);
	}

    const getTrackInfo = (requestId)=>{
        if(validate.isNotEmpty(props.martCustomerReturnRequestStatusTrack)) {
            showGhostImages(false);
            setTrackInfo(props.martCustomerReturnRequestStatusTrack);
            prepareShowStatus(props.martCustomerReturnRequestStatusTrack);
        } else {
            myAccountService.getReturnTrackInfo(requestId).then(response => {
                setShowGhostImages(false);
                if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode && validate.isNotEmpty(response.responseData)) {
                    setTrackInfo(response.responseData);
                    prepareShowStatus(response.responseData);
                }
            }).catch(function(error) {
                setShowGhostImages(false);
                console.log(error);
            });
        }
    }
    if(showGhostImages){
        return <TrackOrderGhostImage/>
    } else {
        return (
            <React.Fragment>
            {trackInfo &&
                <div className="row trackorder trackreturn">
                    <div className="col pl-0">
                        <p className="order-title">Track Order<br/>
                            {props.returnId &&
                                <small className="text-secondary">Return Id: {props.returnId}</small>
                            }
                            {!props.returnId &&
                                <small className="text-secondary">Return Request Id: {props.requestId}</small>
                            }
                        </p>
                    </div>
                    <div className="col-9 pr-0">
                        <div className="status-text">
                        {Object.keys(trackInfo).map((status,index)=>{
                        return (
                            <span key={index} className="order-title text-capitalize">{status.toLowerCase()}</span>
                        )})}
                        </div>
                        <div>
                            <div className="status-dot mb-4">
                            {Object.entries(trackInfo).map(([status,martCustomerReturnRequestStatusTrack])=>{
                                if(status == "Return"){
                                    return (
                                        <React.Fragment key={status}>
                                        {status == finalStatus && 
                                            <span className={showStatus[status]?'hovered-dot current-state':'hovered-dot'}>
                                                <span key={status} className={validate.isNotEmpty(martCustomerReturnRequestStatusTrack) ? "dot" : "dot-grey"} onMouseEnter= {() => changeOrderStatus(status)}></span>
                                            </span>	
                                        }
                                        {status != finalStatus && 
                                                <span className={showStatus[status]?'hovered-dot active':'hovered-dot'}>
                                                <span key={status} className={validate.isNotEmpty(martCustomerReturnRequestStatusTrack) ? "dot" : "dot-grey"} onMouseEnter= {() => changeOrderStatus(status)}></span>
                                            </span>	
                                        }
                                        </React.Fragment>
                                                )
                                } else {
                                    return(	
                                        <React.Fragment key={status}>
                                            <hr className={"flex-fill "+(validate.isNotEmpty(martCustomerReturnRequestStatusTrack) ? "track-line" : "track-line-gray")} />
                                            { status == finalStatus && 
                                                <span className="hovered-dot current-state">
                                                    <span className={validate.isNotEmpty(martCustomerReturnRequestStatusTrack) ? "dot" : "dot-grey"}  onMouseEnter={()=>changeOrderStatus(status)}></span>
                                                </span>
                                            }
                                            { status != finalStatus &&
                                            <span className={showStatus[status]?'hovered-dot active':'hovered-dot'}>
                                                <span className={validate.isNotEmpty(martCustomerReturnRequestStatusTrack) ? "dot" : "dot-grey"}  onMouseEnter={()=>changeOrderStatus(status)}></span>
                                            </span>
                                            }
                                        </React.Fragment>
                                    )
                                }
                            })}
                            </div>
                            <div className="sub-status-container ">
                            {Object.keys(trackInfo).map((status,index)=>{
                            return ( showStatus[status] && 
                                <div className="sub-status-dot" key={"subText-"+index}>
                                    <ul>
                                        {validate.isNotEmpty(trackInfo) && trackInfo[status] && trackInfo[status].map((martCustomerReturnRequestStatusTrack,index)=>{
                                        return (
                                        <li key={"state-"+index}>
                                            <p className="order-title text-capitalize">{martCustomerReturnRequestStatusTrack.statusValue.toLowerCase()}<br />
                                                <small className="text-secondary">{moment(new Date(martCustomerReturnRequestStatusTrack.dateCreated)).format("MMM DD, YYYY HH:mm")}</small>
                                            </p>
                                        </li>)})}
                                    </ul>
                                </div>)})}
                            </div>
                        </div>
                    </div>
                </div>
            }
            </React.Fragment>
            
        )
    }
}
export default TrackReturn;
