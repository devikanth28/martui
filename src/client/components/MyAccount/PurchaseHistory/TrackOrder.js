import React, {useEffect, useState} from 'react';
import Validate from '../../../helpers/Validate';



const TrackOrder =(props) =>{
	const trackInfo = props.trackInfo;
	const validate = Validate();
	const [showStatus, setShowStatus] = useState({});
	const [finalStatus,setFinalStatus] = useState("");
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
	const prepareShowStatus = ()=>{
		let tempShowStatus ={"APPROVAL": false, "PROCESSING" : false, "DISPATCH" : false, "DELIVERY" : false, "PICKUP":false};
		let tempStatus = "";
		let tempFinalStatus = "";
		Object.entries(trackInfo).map(([status,orderState])=>{
			if(validate.isNotEmpty(orderState)){
				tempStatus = status;
				tempFinalStatus  = status;
			}
		});
		tempShowStatus [tempStatus] = true;
		setShowStatus(tempShowStatus); 
		setFinalStatus(tempFinalStatus);
	}
	
	useEffect(() => {
		prepareShowStatus();
    }, []);
	
    return (
        <React.Fragment>
            <div className="row trackorder">
				<div className="col pl-0">
					<p className="order-title">Track Order<br/>
						<small className="text-secondary">Order Id: {props.displayOrderId}</small>
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
						{Object.entries(trackInfo).map(([status,orderState])=>{
							if(status == "APPROVAL"){
								return (
									<React.Fragment>
									{status == finalStatus && 
										<span className={showStatus[status]?'hovered-dot current-state':'hovered-dot'}>
											<span key={status} className={validate.isNotEmpty(orderState) ? "dot" : "dot-grey"} onMouseEnter= {() => changeOrderStatus(status)}></span>
										</span>	
									}
									{status != finalStatus && 
											<span className={showStatus[status]?'hovered-dot active':'hovered-dot'}>
											<span key={status} className={validate.isNotEmpty(orderState) ? "dot" : "dot-grey"} onMouseEnter= {() => changeOrderStatus(status)}></span>
										</span>	
									}
									</React.Fragment>
											)
							} else {
								return(	
									<React.Fragment key={status}>
										<hr className={"flex-fill "+(validate.isNotEmpty(orderState) ? "track-line" : "track-line-gray")} />
										{ status == finalStatus && 
											<span className="hovered-dot current-state">
												<span className={validate.isNotEmpty(orderState) ? "dot" : "dot-grey"}  onMouseEnter={()=>changeOrderStatus(status)}></span>
											</span>
										}
										{ status != finalStatus &&
										<span className={showStatus[status]?'hovered-dot active':'hovered-dot'}>
											<span className={validate.isNotEmpty(orderState) ? "dot" : "dot-grey"}  onMouseEnter={()=>changeOrderStatus(status)}></span>
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
									{validate.isNotEmpty(trackInfo) && trackInfo[status].map((orderState,index)=>{
									return (
									<li key={"state-"+index}>
										<p className="order-title">{orderState.status}<br />
											<small className="text-secondary">{orderState.date}</small>
										</p>
									</li>)})}
								</ul>
							</div>)})}
						</div>
					</div>
				</div>
			</div>
        </React.Fragment>
    )
}
export default TrackOrder;
