import React, { useState } from "react"
import NewMemebersCard from './NewMemebersCard';
import { UncontrolledCollapse } from 'reactstrap';
const UserSubscriptionCard = (props) => {
    const [showCard, setShowCard] = useState(false)
    const [showCardList, setShowCardList] = useState({ "card1": false, "card2": false })
    return (
        <React.Fragment>
            <div className ="d-none">
            <div className="d-flex d-none justify-content-between w-100 ml-3">
                <div className="mr-3">
                    <div className=" my-subscription-container">
                        <div className="p-0 m-0 ph-item" style={{ 'background-color': 'unset' }}>
                            <div className="ph-col-12 m-0 p-0">
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-col-6 p-0 mb-1" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-4 empty p-0 mb-1" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-4 p-0 m-0" style={{ 'height': '12.5px' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="p-0 m-0 ph-item" style={{ 'background-color': 'unset' }}>
                            <div className="ph-col-12 m-0 p-0">
                                <div className="ph-row p-0 m-0">
                                    <div className="ph-col-8 p-0 mb-1 m-0" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-4 empty p-0 m-0" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-2 p-0 m-0" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-2 empty p-0 m-0" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-2 p-0 m-0" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-2 empty p-0 m-0" style={{ 'height': '12.5px' }}></div>
                                    <div className="ph-col-4 p-0 m-0" style={{ 'height': '12.5px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="list-card-box bg-transparent shadow-none mb-n3 pb-0">
                        <div className="card each-subscription-member mb-3">
                            <div className="card-body px-3 py-2 d-flex align-items-center">
                            <div className="member-count" style= {{'background':'unset'}}>
                                <div className="ph-item w-100 p-0 m-0">
                                    <div className="ph-col-12 p-0 m-0">
                                        <div className="ph-row p-0 m-0">
                                            <div className="ph-picture rounded-circle p-0 m-0" style={{'width':'32px','height':'32px'}}></div>
                                         </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-100">
                                <div className="ph-item p-0 m-0">
                                    <div className="ph-col-12 p-0 m-0">
                                      <div className="ph-row  p-0 m-0">
                                                <div className="ph-col-8 p-0 m-0"  style={{ 'height': '16px' }}></div>
                                                <div className="ph-col-4 empty p-0 m-0"></div>
                                                <div className="ph-col-8  mt-1 p-0"  style={{ 'height': '12.5px' }}></div>
                                                <div className="ph-col-4 empty p-0 m-0"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card each-subscription-member mb-3">
                            <div className="card-body px-3 py-2 d-flex align-items-center">
                            <div className="member-count" style= {{'background':'unset'}}>
                                <div className="ph-item w-100 p-0 m-0">
                                    <div className="ph-col-12 p-0 m-0">
                                        <div className="ph-row p-0 m-0">
                                            <div className="ph-picture rounded-circle p-0 m-0" style={{'width':'32px','height':'32px'}}></div>
                                         </div>
                                    </div>
                                </div>
                            </div>
                                <div className="w-100">
                                    <div className="ph-item p-0 m-0">
                                        <div className="ph-col-12 p-0 m-0">
                                            <div className="ph-row  p-0 m-0">
                                                <div className="ph-col-8 p-0 m-0"  style={{ 'height': '16px' }}></div>
                                                <div className="ph-col-4 empty p-0 m-0"></div>
                                                <div className="ph-col-8  mt-1 p-0"  style={{ 'height': '12.5px' }}></div>
                                                <div className="ph-col-4 empty p-0 m-0"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            </div>
            <div className="d-flex justify-content-between w-100 ml-3">
                <div className="mr-3">
                    <a id="membership-card" href="javascript:void(0)" title="Click to expand">
                        <div className={showCard ? "my-subscription-container active-card" : "my-subscription-container"}>
                            <small>Gold Membership<br />234567</small>
                            <div>
                                <h6 className="font-weight-bold text-white">Sampath Kumar Ch</h6>
                                <div className="d-flex justify-content-between font-14">
                                    <p className="mb-0 d-inline-block">MID 234568</p>
                                    <p className="mb-0 d-inline-block">06/2022</p>
                                    <p className="mb-0 d-inline-block">+91 9999999999</p>
                                </div>
                            </div>
                        </div>
                    </a>
                    <UncontrolledCollapse toggler="#membership-card">
                        <div className="card-slide-down" style={{ "marginTop": "-1.5rem", "marginBottom": "1rem" }}>
                            <p className="mb-0"><small className="text-secondary">Age / Gender: </small><small className="ml-1 text-dark"> 38Yrs / Male</small></p>
                            <p className="mb-0"><small className="text-secondary">Photo ID Proof: </small><small className="ml-1 text-dark">Adhaar Card</small></p>
                            <p className="mb-0"><small className="text-secondary">Photo ID Number: </small><small className="ml-1 text-dark"> 123456789098</small></p>
                            <p className="mb-0"><small className="text-secondary">Email ID: </small><small className="ml-1 text-dark"> manishp@medplusindia.com</small></p>
                            <p className="mb-0"><small className="text-secondary">Relationship: </small> <small className="ml-1 text-dark"> Parent</small></p>
                            <p className="mb-0"><small className="text-secondary">Year of Birth (MM/YYYY): </small><small className="ml-1 text-dark">09/ 1997</small></p>

                        </div>
                    </UncontrolledCollapse>
                    <section className="list-card-box bg-transparent shadow-none mb-n3 pb-0">
                        <div className="each-subscription-member-container">
                            <a href="javascript:void(0)" title="click to expand" id="each-member-1">
                                <div className="card each-subscription-member mb-3">
                                    <div className="card-body px-3 py-2 d-flex align-items-center">
                                        <span className="member-count">1</span>
                                        <div>
                                            <h6 className="mb-0">Member Name</h6>
                                            <small className="text-secondary">Member ID: 234568</small>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <UncontrolledCollapse toggler="#each-member-1" className="mb-3">
                                <div className="card-slide-down">
                                    <p className="mb-0"><small className="text-secondary">Age / Gender: </small><small className="ml-1 text-dark"> 38Yrs / Male</small></p>
                                    <p className="mb-0"><small className="text-secondary">Photo ID Proof: </small><small className="ml-1 text-dark">Adhaar Card</small></p>
                                    <p className="mb-0"><small className="text-secondary">Photo ID Number: </small><small className="ml-1 text-dark"> 123456789098</small></p>
                                    <p className="mb-0"><small className="text-secondary">Email ID: </small><small className="ml-1 text-dark"> manishp@medplusindia.com</small></p>
                                    <p className="mb-0"><small className="text-secondary">Relationship: </small> <small className="ml-1 text-dark"> Parent</small></p>
                                    <p className="mb-0"><small className="text-secondary">Year of Birth (MM/YYYY): </small><small className="ml-1 text-dark">09/ 1997</small></p>
                                </div>
                            </UncontrolledCollapse>
                        </div>
                        <div className="each-subscription-member-container">
                            <a href="javascript:void(0)" title="click to expand" id="each-member-2">
                                <div className="card each-subscription-member mb-3">
                                    <div className="card-body px-3 py-2 d-flex align-items-center">
                                        <span className="member-count">2</span>
                                        <div>
                                            <h6 className="mb-0">Member Name</h6>
                                            <small className="text-secondary">Member ID: 234568</small>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <UncontrolledCollapse toggler="#each-member-2" className="mb-3">
                                <div className="card-slide-down">
                                    <p className="mb-0"><small className="text-secondary">Age / Gender: </small><small className="ml-1 text-dark"> 38Yrs / Male</small></p>
                                    <p className="mb-0"><small className="text-secondary">Photo ID Proof: </small><small className="ml-1 text-dark">Adhaar Card</small></p>
                                    <p className="mb-0"><small className="text-secondary">Photo ID Number: </small><small className="ml-1 text-dark"> 123456789098</small></p>
                                    <p className="mb-0"><small className="text-secondary">Email ID: </small><small className="ml-1 text-dark"> manishp@medplusindia.com</small></p>
                                    <p className="mb-0"><small className="text-secondary">Relationship: </small> <small className="ml-1 text-dark"> Parent</small></p>
                                    <p className="mb-0"><small className="text-secondary">Year of Birth (MM/YYYY): </small><small className="ml-1 text-dark">09/ 1997</small></p>
                                </div>
                            </UncontrolledCollapse>
                        </div>
                    </section>
                </div>
                <NewMemebersCard history={props.history}></NewMemebersCard>
            </div>
        </React.Fragment>
    )
}

export default UserSubscriptionCard;