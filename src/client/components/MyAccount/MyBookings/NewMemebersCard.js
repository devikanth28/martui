import React, { useState } from 'react'
import MyBookings from "../../LabSubscription/MyBookings"
import SubsLoginIcon from "../../../images/common/Subscriptions-amico.svg"

const NewMemebersCard = (props) => {

    return (
        <React.Fragment>
            <div className="add-member-container d-none">
                <div className="card">
                    <div className="card-body p-3 d-flex align-items-start">
                        <div className="mr-3" style={{'width':'calc(100% - 250px)'}}>
                            <div className="ph-item p-0 m-0">
                                <div className="ph-col-12 p-0 m-0">
                                    <div className="ph-row p-0 m-0">
                                        <div className="ph-col-6 p-0 mb-2" style ={{'height':'18px'}}></div> 
                                        <div className="ph-col-6 empty p-0 mb-2" style ={{'height':'18px'}}></div> 
                                        <div className="ph-col-12 p-0"></div> 
                                        <div className="ph-col-8 p-0 mb-4"></div> 
                                        <div className="ph-col-8 p-0 mb-0" ></div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style ={{'width':'250px'}}>
                            <div className="ph-item p-0 m-0">
                                <div className="ph-col-12 p-0 m-0">
                                    <div className="ph-row p-0 m-0">
                                        <div className="ph-picture p-0 m-0"  style ={{'height':'246px'}}></div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add-member-container">
                <div className="card">
                    <div className="card-body p-3 d-flex align-items-start">
                        <div className="mr-3">
                            <h6 className="mb-2">Adding new member</h6>
                            <p className="small mb-4">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete.</p>
                            <MyBookings source="myAccountSection" dispayImage={false} />
                        </div>
                        <img src={SubsLoginIcon} title="Add a Member" alt="Add a Member" />
                    </div>
                </div>
            </div>

        </React.Fragment>

    )
}

export default NewMemebersCard;
