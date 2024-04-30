import React, { useEffect, useState } from "react";
import moment from "moment";
const RadioButton = (props) =>{

    const radioData = (props.message && props.message.blocks &&  props.message.blocks.viewData)? props.message.blocks.viewData : null ;
	const [selectedData, setSelectedData] = useState();
	const [limit, setLimit] = useState(4);
	const dataLength = radioData.length;
	const INCREMENT_LIMIT = 4;
	const blocks = props.message.blocks ? props.message.blocks : null;
	const orderView =  blocks.orderView ? true : false;
	const locationView =  blocks.locationView ? true : false;
	useEffect(()=>{
		props.scrollBottom();
	},[limit]);

	const getOrderDataInfo = (data) => {
		let orderDataString = data.value.displayOrderId + "<br/>";
		orderDataString = orderDataString + (data.value.isRedemptionOrder
			? `${parseInt(data.value.orderAmount)} Pts`
			: `₹${parseFloat(data.value.orderAmount).toFixed(2)}`);
		orderDataString = orderDataString + `<br/>${moment(new Date(data.value.orderDate)).format("MMM DD, YYYY")}`;
		return orderDataString;
	  };

	return(
		<React.Fragment>
			<div id="message_replies">
				<div id="message_replies_container">
					{!orderView && !locationView &&
						<section className="list-card-box p-0 mb-0">
							<ul className="list-group list-group-flush">
								{ radioData && radioData.map((data, index) => {
									if(index+1 > limit){
										return;
									}
									return (
										<React.Fragment key = {index}>
											<li className="list-group-item no-chev p-2 m-0" htmlFor={data.value} onClick={() =>{setSelectedData({key:data.key, value:data.value}); props.sendMessage({data: data.key, isValid: true, textToShow: data.value})}}>
												<label className="form-group form-check m-0 pointer">
													<div className="d-flex justify-content-between clearfix">
													<span className="vertical-inline-sub">{data.value}</span>
													</div>
													<input
														type="radio"
														readOnly
														checked={(selectedData && selectedData.key && (selectedData.key == data.key)) ? true : false }
													/>
													<span className="checkmark" ></span>
												</label>
											</li>
										</React.Fragment>
									)
								})
								}
							</ul>
						</section>
					}
					{ orderView &&
						<section className="list-card-box p-0 mb-0">
							<ul className="list-group list-group-flush">
								{radioData && radioData.map((data, index) => {
									if(index+1 > limit){
										return;
									}
									let statusClass = " text-success";
									if(data.value.orderStatus.trim() === "Cancelled"){
										statusClass = " text-danger";
									}else if(data.value.orderStatus.trim() === "Returned"){
										statusClass = " text-warning";
									}
									return (
										<React.Fragment key = {index}>
										<div className="card pointer mb-2" onClick={() =>{setSelectedData({key:data.key, value:data.value}); props.sendMessage({data: data.key, isValid: true, textToShow: getOrderDataInfo(data)})}}>
											<div className="card-body p-2">
												<div className="d-flex justify-content-between clearfix">
														{(data.value.orderAmount !== undefined && data.value.orderAmount > 0) && 
															<p className="flex-fill mb-0 font-weight-bold">
																{data.value.isRedemptionOrder ? 
																	<React.Fragment>
																		{parseInt(data.value.orderAmount)} Pts
																	</React.Fragment>
																 : 
																 	<React.Fragment>
																		 <span className="rupee">&#x20B9;</span>{parseFloat(data.value.orderAmount).toFixed(2)}
																	 </React.Fragment>
																}
															</p>
														}
													<p className="flex-fill text-right mb-0 text-secondary">{moment(new Date(data.value.orderDate)).format("MMM DD, YYYY")}</p>
												</div>
												<span className={statusClass}>{data.value.orderStatus}</span>
												<p className="mb-0 pt-2 text-dark">{data.value.isRedemptionOrder ? 'Redemption ID:' : 'Order ID:'} <strong>{data.value.displayOrderId}</strong></p>
												<p className="text-secondary mb-0">Delivery Type: <strong className="text-dark">{data.value.deliveryType === 'D' ? "Home Delivery" : "Store Pickup"}</strong></p>
												{!data.value.isCommunityDropOff && data.value.deliveryType === 'D' &&
													<p className="text-secondary mb-0 pt-2" style={{"word-break":"break-all"}}>{data.value.deliveryAddress.addressLine1}, {data.value.deliveryAddress.city}, {data.value.deliveryAddress.state}</p>
												}
												{data.value.deliveryType === 'S' &&
													<p className="text-secondary mb-0 pt-2" style={{"word-break":"break-all"}}>{data.value.pickStoreName}</p>
												}
												{data.value.isCommunityDropOff && 
													<p className="text-secondary mb-0 pt-2" style={{"word-break":"break-all"}}>{data.value.deliveryAddress.addressLine1}, {data.value.deliveryAddress.city}, {data.value.deliveryAddress.state}</p>
												}
												
											</div>
										</div>
									</React.Fragment>
								)
								})
								}
							</ul>
						</section>	
					}
					{locationView &&
						<section>
							<ul>
								{radioData && radioData.map((data, index) => {
									if(index+1 > limit){
										return;
									}
									return (
										<React.Fragment>
											<li class="list-group-item location-pin" onClick={() =>{setSelectedData({key:data.key, value:data.value}); props.sendMessage({data: data.key, isValid: true, textToShow: data.value})}}>
												<div className="align-self-start">
													<svg height="18" width="18" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
														xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style={{enableBackground:'new 0 0 24 24'}} xmlSpace="preserve">
														<g>
															<path fill="#2B2F52" d="M18.1,6.1C18.1,2.7,15.4,0,12,0S5.9,2.7,5.9,6.1c0,3.2,2.5,5.9,5.7,6.1v11.4c0,0.2,0.2,0.4,0.4,0.4
																s0.4-0.2,0.4-0.4V12.2C15.6,12,18.1,9.3,18.1,6.1z M10,6.1c-0.9,0-1.6-0.7-1.6-1.6S9.1,2.8,10,2.8s1.6,0.7,1.6,1.6S10.9,6.1,10,6.1
																z"/>
														</g>
													</svg>
												</div>
												<a class="d-block text-dark pr-3" href="javascript:void(0);" title={data.value}>
													<p className="vertical-inline-sub ">{data.value}</p>
													<p class="mb-1 text-secondary line-clamp-3">{data.key.address}</p> 
												</a>
											</li>
										</React.Fragment>
									)
								})
								}
							</ul>
						</section>
					}
					<div className="d-flex align-items-center justify-content-between mt-n3">
						<span>
							{ blocks && blocks.BACK_TO_PREVIOUS_MENU &&
								(<a
								href="/"
								onClick={(event) => {
									event.preventDefault();
									props.sendMessage({data: blocks.BACK_TO_PREVIOUS_MENU.payload, isValid: true, textToShow: blocks.BACK_TO_PREVIOUS_MENU.title});
								}}
								className="back-to-previous-option btn btn-sm text-left ml-n2"
								>
								{blocks.BACK_TO_PREVIOUS_MENU.title}
								</a>)
							}
						</span>
						<span style={{"font-size": "10px" }}>
							{ dataLength > limit &&
								<React.Fragment>
									{limit}/{dataLength} <a className="back-to-previous-option ml-2" onClick={() => { setLimit(limit+INCREMENT_LIMIT) }}> Next {limit+INCREMENT_LIMIT <= dataLength ? INCREMENT_LIMIT : dataLength-limit}</a>
								</React.Fragment>
							}
						</span>
						
					</div>							
					
					<span className="time-stamp">{props.time}</span>
				</div>
			</div>
		</React.Fragment>
	)
}

export default RadioButton;