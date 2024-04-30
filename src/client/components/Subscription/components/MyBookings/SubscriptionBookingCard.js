import React, { useState } from "react";
import { Collapse, Modal, ModalBody, ModalHeader, Tooltip, UncontrolledCollapse } from 'reactstrap';
import { getDisplayableAge } from "../../../../helpers/CommonUtil";
import Validate from "../../../../helpers/Validate";
import MyBookings from "../MyBookings";


const SubscriptionBookingCard =(props)=>{
    
    
    
    const subscription = props.subscription;
    const index = props.index
    const validate = Validate();
    const [showAddMoreMembersModal, setShowAddMoreMembersModal] = useState(false);
    const [showmembers ,setShowMember] = useState( props.subscriptionCardDefaultOpen ? false : true)
    const [openMemberDetails,setOpenMemberDetails] = useState("");
    const [ showToolTipForSubscriptionCard, setShowToolTipForSubscriptionCard] = useState(false);
    const toggleShowAddMoreMembersModal = () =>{
        setShowAddMoreMembersModal(!showAddMoreMembersModal);
    }
    const CloseButton = <button type="button" onClick={()=>setShowAddMoreMembersModal(false)} className="close" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect fill="none" width="24" height="24"/>
                            <path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z"/>
                            </svg>
                        </button>
    


    
    
    const displayMember = (member,index,) => {
        
    const id = "membership-card" + index + props.index;
    const displayStatus = (status) => {
        return status.substr(0, 1).toUpperCase() + status.substr(1).toLowerCase();
    }

    const displayDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString('default', { month: 'short' }) + " " + date.getDate() + ", " + date.getFullYear();
    }

    const displayGender = (gender) => {
        switch (gender.toLowerCase()){
            case 'm':
            case "male": return "Male";
            case 'f':
            case "female": return "Female";
            case 'o':
            case "others": return "Others"; 
            default : return "";
        }
    }
        
    return (
        <React.Fragment>
            <div className="w-100 card border-0 subscribed-members">
                {/* {subscription.renewalAllowed &&<button className="btn btn-link" onClick={() => handleRenewalClick()}>Renew</button>} */}
                <div id={id} onClick={()=>setOpenMemberDetails(id == openMemberDetails ? "" : id)} className="card-header bg-white border-0 d-flex justify-content-between align-items-center p-0 pointer">
                    <p className="mb-0">{member.patientName}</p>
                    {(openMemberDetails != id) && <a href="javascript:void(0)" title="click to view member details" >
                        <svg className= "align-text-top" xmlns="http://www.w3.org/2000/svg" id="add_black_icon_18px" width="18" height="18" viewBox="0 0 18 18">
                            <g id="Group_15964" data-name="Group 15964">
                                <rect id="Rectangle_3305" data-name="Rectangle 3305" width="18" height="18" fill="none"></rect>
                                <path id="Path_22960" data-name="Path 22960" d="M69.226,601.175H61.657v-7.569a.716.716,0,1,0-1.431,0v7.569H52.657a.716.716,0,1,0,0,1.431h7.569v7.569a.716.716,0,0,0,1.431,0v-7.569h7.569a.716.716,0,0,0,0-1.431Z" transform="translate(-51.941 -592.89)" fill="#080808"></path>
                            </g>
                        </svg>
                    </a> }
                    {(openMemberDetails == id) && <a href="javascript:void(0)" title="click to close member details">
                        <svg className= "align-text-top" xmlns="http://www.w3.org/2000/svg" id="remove_black_icon_18px" width="18" height="18" viewBox="0 0 18 18">
                            <g id="Group_15963" data-name="Group 15963">
                                <rect id="Rectangle_3306" data-name="Rectangle 3306" width="18" height="18" transform="translate(0 0)" fill="none" />
                                <rect id="Rectangle_3307" data-name="Rectangle 3307" width="18" height="1.431" rx="0.636" transform="translate(0 8.285)" fill="#080808" />
                            </g>
                        </svg>
                    </a>}
                    
                </div>

                <Collapse isOpen={openMemberDetails == id} toggler={id}>
                    <div className="card-body align-items-center p-0">
                        <div className="row">
                            {validate.isNotEmpty(member.email) && <div className="col-4">
                                <label className="mb-0 text-secondary">Email</label>
                                <p className="mb-0"> {member.email}</p>
                            </div>}
                            {validate.isNotEmpty(member.subscriptionStatus) && member.subscriptionStatus !== "ACTIVE" && <div className="col-4">
                                <label className="mb-0 text-secondary">Status</label>
                                <p className="mb-0">{displayStatus(member.subscriptionStatus)}</p>
                            </div>}
                            {/* {validate.isNotEmpty(member.patientId)  && <div className="col-4">
                                <label className="mb-0 text-secondary">Member Id</label>
                                <p className="mb-0">{member.patientId}</p>
                            </div>} */}
                            {(validate.isNotEmpty(member.dateOfBirth) && validate.isNotEmpty(member.gender)) && <div className="col-4">
                                <label className="mb-0 text-secondary">Age / Gender</label>
                                <p className="mb-0">{getDisplayableAge(member.dateOfBirth)}/ { displayGender(member.gender)}</p>
                            </div>}
                            {(validate.isNotEmpty(member.relationship) && validate.isNotEmpty(member.relationship)) &&<div className="col-4">
                                <label className="mb-0 text-secondary">Relationship</label>
                                <p className="mb-0">{member.relationship.name}</p>
                            </div>}
                            {validate.isNotEmpty(member.dateOfBirth) && <div className="col-4">
                                <label className="mb-0 text-secondary">Date of birth</label>
                                <p className="mb-0">{displayDate(member.dateOfBirth)}</p>
                            </div>}
                            {validate.isNotEmpty(member.kycs) && validate.isNotEmpty(member.kycs[0]) && validate.isNotEmpty(member.kycs[0].kycType) &&
                            <div className="col-4">
                                <label className="mb-0 text-secondary">Photo ID Proof</label>
                                <p className="mb-0">{PhotoIdTypeName[member.kycs[0].kycType]}</p>
                            </div>}
                            {validate.isNotEmpty(member.kycs) && validate.isNotEmpty(member.kycs[0]) && validate.isNotEmpty(member.kycs[0].attributes) && validate.isNotEmpty(member.kycs[0].attributes[0]) && validate.isNotEmpty(member.kycs[0].attributes[0].attributeValue) && <div className="col-4">
                                <label className="mb-0 text-secondary">Photo ID Number</label>
                                <p className="mb-0">{member.kycs[0].attributes[0].attributeValue}</p>
                            </div>}
                        </div>
                    </div>
                </Collapse>
            </div>
        </React.Fragment>)
    }

    const handleClose =() => {
        setShowMember(!showmembers)       
    }
 
    const handleOpen = () => {
         if (showmembers) {
             setShowMember(false)
         }
    }

    

    


    const displayDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString('default', { month: 'short' }) + " " + date.getDate() + ", " + date.getFullYear();
    }
    const displayStatus = (status) => {
        return status.substr(0, 1).toUpperCase() + status.substr(1).toLowerCase();
    }

    const toggleToolTip=()=>{
        setShowToolTipForSubscriptionCard(!showToolTipForSubscriptionCard);

    }

    const displayGender = (gender) => {
        switch (gender.toLowerCase()){
            case 'm':
            case "male": return "Male";
            case 'f':
            case "female": return "Female";
            case 'o':
            case "others": return "Others"; 
            default : return "";
        }
    }

    return <React.Fragment>
        <div className="position-relative">
            <span id={"membership-card" + index} className="pointer">
                <div className={"my-subscription-container mb-0"}>
                    <h4 class="text-white m-0 text-truncate">
                        {subscription.status !== 'ACTIVE' && <span class="align-middle badge badge-dark font-12 font-weight-normal mb-1 p-1">{displayStatus(subscription.status)} </span>}
                        <span class="d-block text-truncate">{subscription.plan ? subscription.plan.displayName : ''}</span>
                    </h4>
                    <div class="d-flex justify-content-between">
                        <div>
                            <h6 class="font-weight-bold text-white text-capitalize mb-0">{subscription.members[0].patientName}</h6>
                            {validate.isNotEmpty(subscription.subscriptionCode) &&
                                <p className="mb-0">{subscription.subscriptionCode}</p>
                                }
                        </div>
                        {props.view === "CURRENT" && (props.showUserContent == "Renewal" ? !subscription.renewalAllowed : true)  && validate.isNotEmpty(subscription.endDate) && <div>
                            <h6 class="font-weight-bold text-white mb-0">Expiry</h6>
                            <p class="mb-0">{displayDate(subscription.endDate)}</p>
                        </div>}
                        {subscription.renewalAllowed  && props.showUserContent=="Renewal" && <button className="btn btn-light rounded-pill px-3 " onClick={() => props.handleRenewalClick(subscription)}>Renew Plan</button>}
                        {props.view === "UPCOMING" && validate.isNotEmpty(subscription.startDate) && <div>
                            <h6 class="font-weight-bold text-white mb-0">Valid From</h6>
                            <p class="mb-0">{displayDate(subscription.startDate)}</p>
                        </div>}
                    </div>
                </div>
            </span>
            <Tooltip placement={"bottom"} isOpen={showToolTipForSubscriptionCard} target={"membership-card" + index} toggle={toggleToolTip}>
                {showmembers ? "Click to view member details" : "Click to hide member details"}
            </Tooltip>
            <UncontrolledCollapse  defaultOpen={props.subscriptionCardDefaultOpen} toggler={"#membership-card" + props.index} style={{width:'380px'}}  onEntering = {() => {handleOpen()}} onExiting={() => {handleClose()}}>
                <div className={"card-slide-down shadow-sm"}>
                    <div className="py-2 subscription-card-content">
                        <React.Fragment>
                        { props.showAddMoreMembers && 
                            <a href="javascript:void(0)" onClick={()=>{setShowAddMoreMembersModal(true)}} className="btn btn-sm float-right mx-n2 text-primary">Add Members</a> }
                            {(validate.isNotEmpty(subscription.members[0].dateOfBirth) && validate.isNotEmpty(subscription.members[0].gender)) &&
                                <p className="mb-0"><small className="text-secondary">Age / Gender: </small><small className="ml-1 text-dark"> {getDisplayableAge(subscription.members[0].dateOfBirth)} / {displayGender(subscription.members[0].gender)}</small></p>}
                            {validate.isNotEmpty(subscription.members[0].kycs) && validate.isNotEmpty(subscription.members[0].kycs[0]) && validate.isNotEmpty(subscription.members[0].kycs[0].kycType) &&
                                <p className="mb-0"><small className="text-secondary">Photo ID Proof: </small><small className="ml-1 text-dark">{subscription.members[0].kycs[0].kycType.replace("_", " ")}</small></p>}
                            {validate.isNotEmpty(subscription.members[0].kycs) && validate.isNotEmpty(subscription.members[0].kycs[0]) && validate.isNotEmpty(subscription.members[0].kycs[0].attributes) && validate.isNotEmpty(subscription.members[0].kycs[0].attributes[0]) && validate.isNotEmpty(subscription.members[0].kycs[0].attributes[0].attributeValue) &&
                                <p className="mb-0"><small className="text-secondary">Photo ID Number: </small><small className="ml-1 text-dark"> {subscription.members[0].kycs[0].attributes[0].attributeValue}</small></p>}
                            {validate.isNotEmpty(subscription.members[0].email) &&
                                <p className="mb-0"><small className="text-secondary">Email ID: </small><small className="ml-1 text-dark"> {subscription.members[0].email}</small></p>}
                            {validate.isNotEmpty(subscription.members[0].dateOfBirth) &&
                                <p className="mb-0"><small className="text-secondary">Year of Birth: </small><small className="ml-1 text-dark">{displayDate(subscription.members[0].dateOfBirth)}</small></p>}
                            {validate.isNotEmpty(subscription.members[0].mobile) &&
                                <p className="mb-0"><small className="text-secondary">Mobile Number: </small><small className="ml-1 text-dark">{subscription.members[0].mobile}</small></p>}
                            {subscription.members.length > 1 && <hr className="dashed-border my-3" />}
                        </React.Fragment>
                    
                    {subscription.members.map((member, index) => {
                        if (index == 0)
                            return <React.Fragment></React.Fragment>

                        return (
                            <React.Fragment>
                                {displayMember(member,index)}
                                {index != subscription.members.length - 1 && <hr className="dashed-border my-3"/>}
                            </React.Fragment>
                        )
                    })}
                    </div>
                </div>
            </UncontrolledCollapse>
            <div className="card-shadow-down" style={{"visibility": !showmembers ? "hidden":""}}></div>
            
            {showAddMoreMembersModal && <Modal autoFocus={false} className="modal-dialog-centered" backdrop="static" isOpen={showAddMoreMembersModal} toggle={toggleShowAddMoreMembersModal}>
                <ModalHeader toggle={() => toggleShowAddMoreMembersModal()} close={CloseButton}>
                    Add Members
                </ModalHeader>
                <ModalBody className="p-0">
                    <div className="add-member-container w-100 scroll-bookings">
                        <MyBookings dispayImage={false} showMemberList={true} existingMembersCount={subscription.members.length} history={props.history} subscription={subscription} handleCancel={()=>setShowAddMoreMembersModal(false)} source="myAccountSection" />
                    </div>
                </ModalBody>
            </Modal>
            }
        </div>
    </React.Fragment>
}


export default SubscriptionBookingCard;