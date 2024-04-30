import React, { useState , useRef} from "react";
import { Fade } from 'reactstrap';
import Validate from '../../../../helpers/Validate';
import MemberForm from './MemberForm';
import Alert from '../../../Common/Alert';
import { getDisplayableAge } from "../../../../helpers/CommonUtil";

const SubscriptionMemberDetail = (props) => {
    const validate=Validate();
    const [alertData, setAlertData] = useState({});
    const currentEditMember = props.currentEditMember;
    const subcribedMemberIds = props.subcribedMemberIds ? props.subcribedMemberIds : [];
    const showUploadPhotoIdButton = props.showUploadPhotoIdButton ? props.showUploadPhotoIdButton : [];
    
    const editSelectionOfCustomer=(e)=>{
        if(props.isSelected){
            if(props.errorInfo){
                props.removeErrorFromSelectedMembers(props.errorIndex,true);
            }
            props.removeSelectedCustomer(props.member);
        }else{
            if(props.maxMembers <=  0  || (props.maxMembers > props.currentMembers)){
                if(validateTheCustomer(props.member)){
                    props.setIsFormEdit(false);
                    saveCustomer(props.member,props.index);
                }else{
                    props.setIsFormEdit(true);
                    props.setCurrentEditMember(props.member.patientId);
                }
            }else{
                e.preventDefault();
                setAlertData({message:`maximum members allowed are ${props.maxMembers} please unselect one member to select this member`,type:'danger'})
            }
           
        }
    }

    const editCustomerSelection = ()=>{
        props.setIsFormEdit(true);
        props.setCurrentEditMember(props.member.patientId);
    }
    const deleteMember = ()=>{
        props.deleteMember(props.member.patientId);
    }
    const checkIfSelectedKyCTypeExistsInVerifiedList =(customer,kycType)=>{
        let listOfVerifiedKycCustomers = customer.verifiedKycTypes;
        if(validate.isNotEmpty(listOfVerifiedKycCustomers) && listOfVerifiedKycCustomers.length > 0){
            return listOfVerifiedKycCustomers.indexOf(kycType.kycType) === -1? false:true
        }
        return false;
    }
    const validatePhotoIdNumber = (customer,value) => {
        if(validate.isEmpty(customer.kycType)) {
            return "Select Photo ID" ;
        }
        switch(customer.kycType.kycType) {
            case "AADHAAR_CARD": return validateAadhaarCardNo(value);
            case "PAN_CARD": return validate.panCardNo(value);
            case "DRIVING_LICENSE": return validate.drivingLicense(value);
            case "PASSPORT": return validate.passport(value);
            case "PENSION_PASSBOOK": return validate.pensionPassbook(value);
            case "NPR_SMART_CARD": return validate.nprSmartCard(value);
            case "VOTER_ID": return validate.voterId(value);
            default: return validate.isEmpty(value);
        }
       
    }
    const validateTheCustomer=(customer)=>{
        if(validate.name(customer.patientName)){
            return false;
        }
        if(validate.isEmpty(customer.dob)){
            return false;
        }
        if(validate.isEmpty(customer.gender)){
            return false;
        }
        if(validate.isEmpty(customer.relationship)){
            return false;
        } 
       /*  if(validate.isEmpty(customer.kycType)){
            let listOfVerifiedKycCustomers = customer.verifiedKycTypes;
            if (validate.isEmpty(listOfVerifiedKycCustomers) || listOfVerifiedKycCustomers.length == 0) {
                return false;
            }
           
        } */
        /* if(validate.isNotEmpty(customer.kycType) && !checkIfSelectedKyCTypeExistsInVerifiedList(customer,customer.kycType) && validatePhotoIdNumber(customer,customer.kycRefNo)){
            return false;
        } */
        
        return true;
    }

    const saveCustomer=(customer,index,file,imagePath)=>{
        props.setSelectedMembersIntoState(customer,index,file,imagePath);
        props.setCurrentEditMember(undefined);
        if(props.errorInfo){
            props.removeErrorFromSelectedMembers(props.errorIndex,false);

        }
    }

    const removeCurrentEditMember=()=>{
        props.setCurrentEditMember(undefined);
    }
    
    const getGenderString=(value)=>{
        switch (value) {
        case "M":return "Male";
        case "F": return "Female";
        case "O": return "Others";
        default :return "";
        }
    }

    const clearError=()=>{
        setAlertData({});
    }

    return (
        <React.Fragment>
            {alertData && <Alert alertInfo={alertData} onDurationEnd={clearError} duration={5000}/>}
            {currentEditMember && (currentEditMember === props.member.patientId) &&
                <div className="w-100">
                    <Fade in={(currentEditMember == props.member.patientId)}>
                        {currentEditMember && (currentEditMember === props.member.patientId) && <MemberForm isAlertShown={props.isAlertShown} setIsFormEdit={props.setIsFormEdit} setBackDropLoader={props.setBackDropLoader} selectedFile={(props.existingMembersFileList) ? props.existingMembersFileList[props.member.patientId] : undefined} imagePath={props.existingMembersImagePath ? props.existingMembersImagePath[props.member.patientId] : undefined} setAlertData={setAlertData} source={'existingPatient'} member={props.member} index={props.index} saveCustomer={saveCustomer} removeCustomer={removeCurrentEditMember} relations={props.relations} kycTypes={props.kycTypes} uploadPhotoIdForm={subcribedMemberIds.includes(props.member.patientId) && showUploadPhotoIdButton.includes(props.member.patientId)} />}
                    </Fade>
                </div>
            }
            {/*  {props.currentMember && (props.currentMember === props.member.patientId) && <MemberForm setBackDropLoader={props.setBackDropLoader} selectedFile={(props.existingMembersFileList)?props.existingMembersFileList[props.member.patientId]:undefined} imagePath={props.existingMembersImagePath?props.existingMembersImagePath[props.member.patientId]:undefined}  setAlertData={setAlertData}  source={'existingPatient'} member={props.member} index={props.index} saveCustomer={saveCustomer} removeCustomer={removeCurrentEditMember} relations={props.relations} kycTypes={props.kycTypes}/>} */}
            {(validate.isEmpty(currentEditMember) || (currentEditMember !== props.member.patientId)) && 
                
                    <div className={props.isSelected ? (props.errorInfo?`card bg-light border-danger  p-3 mb-3 pointer mr-2 ${props.source ? "w-100":""}`:`card bg-light border-success  p-3 mb-3 pointer mr-2 ${props.source ? "w-100":""}`):`card bg-light border-none p-3 mb-3 pointer mr-2 ${props.source ? "w-100":""}`}>
                        <label className="form-group form-check mb-0 pointer" htmlFor={props.member.patientId}>
                            <p className="title my-1">{props.member.patientName}</p>
                            {(props.member.dob || props.member.gender) && <p className="mb-0">
                                <small className="text-secondary">
                                    {props.member.dob && "Age"}
                                    {props.member.dob && props.member.gender && " / "}
                                    {props.member.gender && "Gender"}:
                                </small>
                                <small className="ml-2 text-dark"> {props.member.dob && getDisplayableAge(props.member.dob)}
                                    {props.member.dob && props.member.gender && " / "}
                                    {props.member.gender && getGenderString(props.member.gender)}
                                </small>
                            </p>}



                            {/* {(props.member.age && props.member.dob && props.member.gender) ? <p className='mb-2'><small className="text-secondary">Age / Gender: </small> <small className="ml-2 text-dark"> {getDisplayableAge(props.member.dob)} / {getGenderString(props.member.gender)}</small></p> : (!props.member.age && props.member.dob && props.member.gender) ? <p className='mb-2'><small className="text-secondary">Age / Gender: </small> <small className="ml-2 text-dark">{'< 1 Yr'} /{getGenderString(props.member.gender)}</small></p> : (props.member.gender)?<p className='mb-2'><small className="text-secondary"> Gender: </small> <small className="ml-2 text-dark"> {getGenderString(props.member.gender)}</small></p> : <React.Fragment></React.Fragment> } */}
                            {props.member.kycType && <p className="mb-0"><small className="text-secondary"> Photo ID Proof: </small><small className="ml-1 text-dark">{props.member.kycType.kycName}</small></p>}
                            {props.member.kycRefNo && <p className="mb-0"><small className="text-secondary"> Photo ID Number: </small><small className="ml-1 text-dark">{props.member.kycRefNo}</small></p>}
                            {props.member.mobile && <p className="mb-0"><small className="text-secondary">Mobile Number: </small><small className="ml-1 text-dark">{props.member.mobile}</small></p>}
                            {props.member.relationship && <p className="mb-0"><small className="text-secondary">Relationship: </small><small class="ml-1 text-dark"> {props.member.relationship.name}</small></p>}
                            <input type="checkbox" id={props.member.patientId} checked={props.isSelected} value="PatientDetails" name="PatientSelect" onChange={editSelectionOfCustomer}/>
                            <span className="checkmark"></span>
                        </label>
                        <div className="text-right">
                        {!subcribedMemberIds.includes(props.member.patientId) && <>
                                <a href="javascript:void(0)" className="btn btn-sm mr-m2 text-primary" onClick={() => { if (window.confirm('Are you sure, you want to delete member?')) { deleteMember() }; }} title="Delete">Delete</a>
                                <a href="javascript:void(0)" className="btn btn-sm mr-m2 text-primary" onClick={() => editCustomerSelection()} title="Edit">Edit</a>
                        </>}
                        {subcribedMemberIds.includes(props.member.patientId) && showUploadPhotoIdButton.includes(props.member.patientId) && <a href="javascript:void(0)" className="btn btn-sm mr-m2 text-primary" onClick={() => editCustomerSelection()} title="Upload Photo ID">Upload Photo ID</a>}
                        </div>
                       
                        {props.errorInfo && <div className="ml-2 text-danger" >{props.errorInfo}</div>} 
                    </div>
            }
        </React.Fragment>
    );
}

export default SubscriptionMemberDetail;