import React, { useEffect, useState } from "react";
import MaskedInput from "react-maskedinput";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import UserInfoAction from "../../../redux/action/UserInfoAction";
import DoctorCheckoutService from "../../DoctorConsultation/services/DoctorCheckoutService";
import { getDisplayableAge } from "../../helpers/CommonUtil";
import DateValidator from "../../helpers/DateValidator";
import Validate from "../../helpers/Validate";
import MyAccountService from "../../services/MyAccountService";
import { Gender } from "../MedplusLabs/constants/LabConstants";
import { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "./Alert";
import moment from "moment";

const PatientModel = (props) => {

    const validate = Validate();
    const doctorCheckoutService = DoctorCheckoutService();
    const [selectedPatient, setSelectedPatient] = useState({});
    const [errorMsg, setErrorMsg] = useState({});
    const [members, setMembers] = useState([]);
    const [newPatient, setNewPatient] = useState(validate.isNotEmpty(props.seletedPatientForEdit) ? props.seletedPatientForEdit : {});
    const [forceUserDetails, setForceUserDetails] = useState(false);
    const [deletePatientLoader, setDeletePatientLoader] = useState(false);
    const [patientIdToDelete, setPatientIdToDelete] = useState("");
    const userInfoAction = UserInfoAction(); 
    var userInfo = userInfoAction.getUserInfo();
    const [ageGroup, setAgeGroup] = useState("years");
    const [subcribedMemberIds, setSubcribedMemberIds] = useState([]);

    useEffect(() => {
        if(validate.isNotEmpty(userInfo) && (validate.isNotEmpty(userInfo.firstName) && validate.isNumeric(userInfo.firstName)) && (validate.isNotEmpty(userInfo.lastName) && validate.isNumeric(userInfo.lastName))){
            props.setAddOrEditPatientOpen(true);
            props.setSelectPatientOpen(false);
            setForceUserDetails(true);
        } else {
            getCustomerPatients();
            if (validate.isEmpty(newPatient) && validate.isNotEmpty(props.seletedPatientForEdit)) {
                setNewPatient(props.seletedPatientForEdit);
            }
            if (validate.isEmpty(props.seletedPatientForEdit) || validate.isEmpty(props.seletedPatientForEdit.gender)) {
                setPatientGender("M");
            }
        }
    }, []);

    useEffect(() => {
        if (validate.isEmpty(props.seletedPatient) || validate.isEmpty(props.seletedPatient.patientId) ) {
            setSelectedPatient(members[0]);
            props.setSelectedPatient(members[0]);
        } else {
            setSelectedPatient({ ...props.seletedPatient });
        }
    }, [props.seletedPatient, members]);

    const getCustomerPatients = () => {
        doctorCheckoutService.getPatients().then((data) => {
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode && validate.isNotEmpty(data.dataObject) && validate.isNotEmpty(data.dataObject.members)) {
                const members = data.dataObject.members;;
                members.map(eachMember=>{
                    eachMember.dateOfBirth = validate.isNotEmpty(eachMember.dateOfBirth) ?  moment(eachMember.dateOfBirth).format('DD/MM/YYYY') : eachMember.dateOfBirth;
                })
                setMembers(data.dataObject.members);
                setSubcribedMemberIds(data.dataObject.subscribedMemberIds ? data.dataObject.subscribedMemberIds : []);
            } else if (validate.isNotEmpty(data) && "FAILURE" == data.statusCode && validate.isNotEmpty(data.message)) {
                props.setAlertErrorMsg({ message: data.message, type: ALERT_TYPE_ERROR });
                setTimeout(() => redirectToDoctorConsultationPage("/doctorconsultation"), 2000);
            }
        }).catch(error => {
            console.log("error : " + JSON.stringify(error));
            props.setAlertErrorMsg({ message: "something went wrong,please try again", type: ALERT_TYPE_ERROR });
        });
    }

    const saveCustomerDetails = (userDetails) => {
        if(validate.isEmpty(userDetails)) {
            setErrorMsg({["patientName"]:validate.name(userDetails.patientName, "Patient Name", 20)});
            return;
        } else if(validate.isEmpty(userDetails.patientName) || validate.isNotEmpty(validate.name(userDetails.patientName, "Patient Name", 20))){
            setErrorMsg({["patientName"]:validate.name(userDetails.firstName, "First Name", 20)});
            return;
        }
        let customer = {};
        customer['firstName'] = userDetails.patientName;
        customer['gender'] = userDetails.gender;
        customer['age'] = userDetails.age;
        MyAccountService().saveUserDetails({customer : JSON.stringify(customer)}).then(response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                Promise.resolve(userInfoAction.setUserInfo(response.dataObject.userInfo));
            }
        })
    }

    const addOrEditCustomerPatient = () => {
        if (validate.isNotEmpty(errorMsg.patientName) || validate.isNotEmpty(ageGroup == "dateOfBirth" ? errorMsg.dateOfBirth : errorMsg.age ) || validate.isNotEmpty(errorMsg.gender)) {
            return;
        }
        if(validate.isNotEmpty(userInfo) && (validate.isNotEmpty(userInfo.firstName) && validate.isNumeric(userInfo.firstName)) && (validate.isNotEmpty(userInfo.lastName) && validate.isNumeric(userInfo.lastName))){        
            saveCustomerDetails(newPatient);
        }
        if (ageGroup == "years") {
            newPatient["dateOfBirth"] = null;
            newPatient["dob"] = null;
        } else if (ageGroup == "dateOfBirth") {
            newPatient["age"] = null;
        }
        if (validateCustomerPatientInputs("patientName", newPatient.patientName) && validateCustomerPatientInputs("gender", newPatient.gender) && ((ageGroup != "dateOfBirth" && validateCustomerPatientInputs("age", newPatient.age)) || (ageGroup == "dateOfBirth" && validateCustomerPatientInputs("dateOfBirth", DateValidator().getDisplayableFormat(newPatient.dateOfBirth))))) {
            let tempNewPatient = {}
            if (ageGroup == "dateOfBirth") {
                tempNewPatient = { ...newPatient, ["dateOfBirth"]: DateValidator().flipYearsAndDays(newPatient.dateOfBirth.split("/").join("-")) }
                //tempNewPatient = { ...newPatient, ["dateOfBirth"]: DateValidator().getDateObject(newPatient.dateOfBirth) }
                setNewPatient(tempNewPatient);
            } else {
                tempNewPatient = { ...newPatient }
            }
            doctorCheckoutService.addOrEditPatientForCustomer({ patient: JSON.stringify(tempNewPatient) }).then((data) => {
                if (validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode) {
                    props.setAddOrEditPatientOpen(false);
                    setMembers(data.dataObject.members);
                    props.addPatientToShoppingCart(data.dataObject.patientId,null,null,data.dataObject.members[0].doctorName);
                } else if (validate.isNotEmpty(data) && "FAILURE" == data.statusCode && validate.isNotEmpty(data.message)) {
                    props.setAlertErrorMsg({ message: data.message, type: ALERT_TYPE_ERROR });
                }
            }).catch(e => {
                console.log("error : " + JSON.stringify(e));
                props.setAlertErrorMsg({ message: "something went wrong,please try again", type: ALERT_TYPE_ERROR });
            });
        }
    }

    const handleOnCancel = () => {
        if(props.isConfirmationOpen) {
            props.setConfirmationOpen(false);
            props.setSelectPatientOpen(true);
            return;
        }
        if(props.isFromMart){
            props.handlePatientModelCancel();
            return;
        } else if (validate.isNotEmpty(props.seletedPatient)) {
            props.setSelectPatientOpen(false);
        } else {
            props.history.goBack();
        }
    }

    const setPatientGender = (gender) => {
        setNewPatient({ ...newPatient, gender: gender });
    }

    const handleInputChange = event => {
        let fieldName = event.target.id;
        let errMsg = validateInputs(event);
        if (errMsg && fieldName !== "age") {
            setErrorMsg(errorMsg => ({ ...errorMsg, [fieldName]: errMsg }));
        } else {
            setErrorMsg({ ...errorMsg, [fieldName]: '' });
        }
        if (errMsg == false && fieldName == "age") {
            let msg = "Numeric only allowed";
            if (validate.isEmpty(event.target.value)) {
                msg = "Age is required";
            }
            setErrorMsg(errorMsg => ({ ...errorMsg, [fieldName]: msg }));
        }
    }

    const validateInputs = (e) => {
        if (e.target.id.indexOf('patientName') > -1) {
            return validate.name(e.target.value, "Patient Name");
        } else if (e.target.id.indexOf('age') > -1) {
            return validate.isNumeric(e.target.value)
        } else if (e.target.id.indexOf('dateOfBirth') > -1) {
            let dateErr = DateValidator().validateDate(e.target.value);
            if (dateErr == "Invalid date") {
                setNewPatient({ ...newPatient, "age": "" });
            }
            return dateErr;
        } else if (feildName == 'gender' && validate.isEmpty(feildValue)) {
            return "Gender is Required";
        }
    }
    const validateCustomerPatientInputs = (feildName, feildValue) => {
        let errMsg = "";
        if (feildName == 'patientName') {
            errMsg = validate.name(feildValue, "Patient Name");
        } else if (feildName == 'dateOfBirth') {
            errMsg = DateValidator().validateDate(feildValue);
            if (errMsg == "Invalid date") {
                setNewPatient({ ...newPatient, "age": "" });
            }
            if (validate.isEmpty(errMsg) && DateValidator().getDateDifference(feildValue).years < 1) {
                if (validate.isNotEmpty(newPatient["relationship"]) && newPatient["relationship"].relationshipType == 'SELF') {
                    errMsg = "Customer age should be greater than 1 yrs";
                    setNewPatient({ ...newPatient, "age": "" });
                }
            }
        } else if (feildName == 'gender' && validate.isEmpty(feildValue)) {
            errMsg = "Gender is Required";
        }
        else if (feildName == 'age') {
            errMsg = validate.age(feildValue);
            if (feildValue < 1) {
                if (validate.isNotEmpty(newPatient["relationship"]) && newPatient["relationship"].relationshipType == 'SELF') {
                    errMsg = "Customer age should be greater than 1 yrs";
                }
            }
            if (ageGroup == "years" && feildValue < 2) {
                errMsg = "Please enter a valid age (>1) or select your date of birth";
                //setAgeGroup("dateOfBirth");
                //feildName = "dateOfBirth";
                setNewPatient({ ...newPatient, ["dateOfBirth"]: null })
            }
        }
        setErrorMsg({ ...errorMsg, [feildName]: errMsg });

        return validate.isEmpty(errMsg);
    }

    const handleChange = (e) => {
        let fieldName = e.target.id;
        let fieldValue = e.target.value;
        if (["patientName"].indexOf(fieldName) !== -1 && validate.isNotEmpty(fieldValue) && !validate.isAlphaWithSpace(fieldValue)) {
            return;
        } else if ("age" === fieldName && validate.isNotEmpty(fieldValue) && validate.age(fieldValue)) {
            return;
        } else {
            let updatedNewPatient = {};
            if ("age" == fieldName) {
                updatedNewPatient = { ...newPatient, [fieldName]: fieldValue };
            } else {
                updatedNewPatient = { ...newPatient, [fieldName]: fieldValue, "age": ((ageGroup == "dateOfBirth" && fieldName == "dateOfBirth" && validate.isEmpty(DateValidator().validateDate(fieldValue))) ? parseInt(DateValidator().getDateDifference(fieldValue).years) : newPatient.age) };
            }
            setNewPatient(updatedNewPatient);
        }
    }

    const handleValidation = (e) => {
        let formfield = e.target.id
        setErrorMsg(prevState => ({
            ...prevState,
            [formfield]: ''
        }))
    }

    const toggleEdit = () => {
        props.setAddOrEditPatientOpen(false);
        props.setSelectPatientOpen(true);
        props.setSelectedPatientForEdit({});
        setNewPatient({});
    }

    const deletePatient = (patientId) => {
        setDeletePatientLoader(true);
        doctorCheckoutService.deletePatient({ patientId: patientId }).then((data) => {
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode) {
                setMembers(data.dataObject);
                props.setAlertErrorMsg({ message: "Patient deleted successfully", type: ALERT_TYPE_SUCCESS });
                if (validate.isNotEmpty(selectedPatient) && Number(selectedPatient.patientId) === Number(patientId)) {
                    setSelectedPatient(data.dataObject[0]);
                    props.setSelectedPatient({ ...data.dataObject[0] });
                    props.callBackFunc(patientId);
                }
            } else if (validate.isNotEmpty(data) && "FAILURE" == data.statusCode && validate.isNotEmpty(data.message)) {
                props.setAlertErrorMsg({ message: data.message, type: ALERT_TYPE_ERROR });
                setTimeout(() => redirectToDoctorConsultationPage("/doctorconsultation"), 2000);
            }
            setDeletePatientLoader(false);
            props.setConfirmationOpen(false);
            props.setSelectPatientOpen(true);
        }).catch(e => {
            console.log("error : " + JSON.stringify(e));
            props.setAlertErrorMsg({ message: "something went wrong,please try again", type: "danger" });
            setDeletePatientLoader(false);
            props.setConfirmationOpen(false);
            props.setSelectPatientOpen(true);
        });
    }
    
    const validatePatientDetails = (selectedPatient) => {
        let errorMsgObj = {};
        let errFlag = false;
        if(validate.isEmpty(selectedPatient.patientId)){
            props.errMsg({ message: "Complete info not available for Selected Patient. Please Edit to Proceed.", type: "danger" });
            errFlag = true;
        }
        let nameErrorMsg = validate.name(selectedPatient.patientName, "PatientName");
        if(validate.isNotEmpty(nameErrorMsg)){
            errorMsgObj = {...errorMsgObj, "patientName" : nameErrorMsg}
            errFlag = true;
        }
        let genderErrorMsg = validate.isEmpty(selectedPatient.gender) ? "Gender is Required" : "";
        if(validate.isNotEmpty(genderErrorMsg)){
            errorMsgObj = {...errorMsgObj, "gender" : genderErrorMsg}
            errFlag = true;
        }
        let ageErrorMsg = validate.isNotEmpty(selectedPatient.age) ? validate.age(selectedPatient.age) : validate.age(selectedPatient.patientAge);
        if (validate.isEmpty(ageErrorMsg) && validate.isNotEmpty(selectedPatient["relationship"]) && selectedPatient["relationship"].relationshipType == 'SELF' && selectedPatient.age < 1) {
            ageErrorMsg = "Customer age should be greater than 1 yrs";
            selectedPatient.dateOfBirth = null;
        }
        if(validate.isNotEmpty(ageErrorMsg)){
            errorMsgObj = {...errorMsgObj, "age" : ageErrorMsg}
            errFlag = true;
        }
        if(errFlag){
            setErrorMsg({ ...errorMsgObj });
        }
        return errFlag;
    }

    const handleClick = () => {
        if(validatePatientDetails(selectedPatient)){
            setNewPatient(selectedPatient);
            props.setSelectedPatient({ ...selectedPatient });
            props.setSelectedPatientForEdit(selectedPatient);
            props.setSelectPatientOpen(false);
            props.setAddOrEditPatientOpen(true);
            return;
        }
        props.addPatientToShoppingCart(selectedPatient.patientId);
    }
    const handleEditPatientClick = (member) => {
        props.setSelectedPatient({ ...member });
        props.setSelectedPatientForEdit(member);
        setNewPatient(member);
        props.setAddOrEditPatientOpen(true);
        props.setSelectPatientOpen(false);
        setErrorMsg({});
        setAgeGroup("dateOfBirth");
    }

    const handleAddNewPatientClick = () => {
        props.setAddOrEditPatientOpen(true);
        props.setSelectPatientOpen(false);
        props.setSelectedPatientForEdit({});
        setNewPatient({});
        setErrorMsg({});
        setAgeGroup("years");
    }

    return (
        <React.Fragment>
            {(props.isSelectPatientOpen || props.isAddOrEditPatientOpen || props.isConfirmationOpen) &&
                <Modal backdrop="static" keyboard={false} isOpen={(props.isSelectPatientOpen || props.isAddOrEditPatientOpen || props.isConfirmationOpen)} className="modal-dialog my-account-modal modal-dialog-centered hide-close" tabIndex="-1" autoFocus={false}>
                    <ModalHeader className="labs-patient-header">
                        {props.isSelectPatientOpen &&
                            <React.Fragment>
                                Select Patient
                                <button type="button" role="button" className="btn btn-outline-brand custom-btn-lg float-right rounded-pill" onClick={() => handleAddNewPatientClick()}>Add New Patient</button>
                            </React.Fragment>
                        }
                        {props.isAddOrEditPatientOpen &&
                            <React.Fragment>
                                {validate.isNotEmpty(props.seletedPatientForEdit) ? "Edit Patient" : "Add New Patient"}
                                {!forceUserDetails && <button type="button" role="button" className="btn btn-outline-brand custom-btn-lg float-right rounded-pill" onClick={toggleEdit}>Select Patient</button>}
                            </React.Fragment>
                        }
                        {props.isConfirmationOpen && "Confirmation"}
                    </ModalHeader>
                    <ModalBody className="p-3">
                        {props.isSelectPatientOpen &&
                            <React.Fragment>
                                <div className="scroll-content">
                                    {validate.isNotEmpty(members) && members.map(eachMember => {
                                        return <div className={((validate.isNotEmpty(selectedPatient) && ((Number(eachMember.patientId) === Number(selectedPatient.patientId)) || (eachMember.patientId === selectedPatient.patientId)) ) ? "border-active" : "border") + " rounded mb-3 p-2"} key={eachMember.patientId}>
                                            <div className="custom-control custom-radio font-weight-normal d-flex justify-content-between">
                                                <input type="radio" checked={validate.isNotEmpty(selectedPatient) && ((Number(eachMember.patientId) === Number(selectedPatient.patientId)) || (eachMember.patientId === selectedPatient.patientId))} className="custom-control-input" name="patients" id={eachMember.patientId} onChange={() => props.setSelectedPatient({...eachMember})} onClick={() => props.setSelectedPatient({...eachMember})} />
                                                <label htmlFor={eachMember.patientId} className="custom-control-label pointer w-100" style={eachMember.subscribedMember ? {} : { "maxWidth": "calc(100% - 100px)" }}>
                                                    <div>
                                                        {eachMember.subscribedMember && <h6 className="mb-0 text-capitalize"><p className="d-inline-block mb-0 text-truncate" style={{ "maxWidth": "calc(100% - 80px)" }}>{eachMember.patientName}</p> {props.from != "PHARMACY" && eachMember.benefits.indexOf("HEALTH_CARE") > -1 && eachMember.subscribedMember && <span className="badge badge-primary ml-1" style={{ verticalAlign: "super" }}>MA Participant</span>}</h6>}
                                                        {!eachMember.subscribedMember && <h6 className="mb-0 text-capitalize text-truncate">{eachMember.patientName}</h6>}
                                                        <small className="text-secondary">{getDisplayableAge(eachMember.dateOfBirth)} {validate.isNotEmpty(eachMember.dateOfBirth) && validate.isNotEmpty(eachMember.gender) && "/" } {validate.isNotEmpty(eachMember.gender) && Gender[eachMember.gender]}</small>
                                                    </div>
                                                </label>
                                                {(!subcribedMemberIds.includes(eachMember.patientId)) &&
                                                    <div className="edit-patient-container">
                                                        <button className="btn btn-link shadow-none" title="Edit Patient" role="button" aria-pressed="true" onClick={() => handleEditPatientClick(eachMember)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                                                <g id="edit_black_icon_18px" transform="translate(-180.257 -249.084)">
                                                                    <rect id="Rectangle_3295" data-name="Rectangle 3295" width="18" height="18" transform="translate(180.257 249.084)" fill="none"></rect>
                                                                    <g id="Group_14565" data-name="Group 14565" transform="translate(180.258 249.086)">
                                                                        <path id="Union_136" data-name="Union 136" d="M2.765,18A2.77,2.77,0,0,1,0,15.234V4.341A2.77,2.77,0,0,1,2.765,1.574H6.274a.6.6,0,0,1,0,1.208H2.763A1.566,1.566,0,0,0,1.208,4.346V15.234A1.568,1.568,0,0,0,2.759,16.8H13.648a1.567,1.567,0,0,0,1.564-1.563V11.725a.6.6,0,0,1,1.207,0v3.509A2.769,2.769,0,0,1,13.652,18ZM5.9,12.825a1.043,1.043,0,0,1-.727-1.281l.7-2.466a.605.605,0,0,1,.149-.269L14.177.649a2.265,2.265,0,0,1,3.172,0,2.261,2.261,0,0,1,0,3.174L9.215,11.98a.612.612,0,0,1-.278.152l-2.445.688-.313.042A1.067,1.067,0,0,1,5.9,12.825ZM7,9.528l-.6,2.041,2.022-.549.022-.007,6.9-6.922.063-.064L13.944,2.563Zm8.083-8.069-.269.242,1.452,1.454.215-.173.009-.008a1.035,1.035,0,0,0-1.407-1.514Z" transform="translate(-0.001 -0.001)" fill="#6c757d"></path>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </button>
                                                        {(eachMember.patientId && (validate.isEmpty(eachMember.relationship) || (validate.isNotEmpty(eachMember.relationship) && eachMember.relationship.relationshipType != 'SELF'))) &&
                                                            <button className="btn btn-link shadow-none" title="Delete Patient" role="button" aria-pressed="true" onClick={() => { props.setSelectPatientOpen(false); props.setConfirmationOpen(true); setPatientIdToDelete(eachMember.patientId) }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18.001" viewBox="0 0 18 18.001">
                                                                    <g id="delete_black_icon_18px" transform="translate(-180.258 -281.936)">
                                                                        <rect id="Rectangle_3296" data-name="Rectangle 3296" width="18" height="18" transform="translate(180.258 281.936)" fill="none"></rect>
                                                                        <g id="Group_14567" data-name="Group 14567" transform="translate(180.825 281.937)">
                                                                            <path id="Union_135" data-name="Union 135" d="M4.72,18a2.583,2.583,0,0,1-2.564-2.59V3.6H.616a.617.617,0,0,1,0-1.234H5.088V2.194A2.183,2.183,0,0,1,7.26,0H10A2.187,2.187,0,0,1,12.17,2.2v.172h4.08a.617.617,0,0,1,0,1.234H15.1V15.41A2.584,2.584,0,0,1,12.538,18ZM3.375,15.409a1.353,1.353,0,0,0,1.344,1.355h7.819a1.353,1.353,0,0,0,1.344-1.354V3.6H3.375ZM6.311,2.2l0,.172h4.635V2.2A.958.958,0,0,0,10,1.234H7.258A.962.962,0,0,0,6.311,2.2Zm5.016,13.154a.647.647,0,0,1-.619-.675V7.34a.645.645,0,0,1,.619-.617h.023a.644.644,0,0,1,.645.614v7.392a.647.647,0,0,1-.645.621Zm-2.725,0a.648.648,0,0,1-.619-.675V7.336a.643.643,0,1,1,1.286,0v7.392a.647.647,0,0,1-.645.621Zm-2.723,0a.648.648,0,0,1-.62-.675V7.336a.643.643,0,1,1,1.287,0v7.392a.647.647,0,0,1-.645.621Z" fill="#6c757d"></path>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    })
                                    }
                                </div>
                                <div className="text-center mt-3">
                                    {validate.isNotEmpty(selectedPatient) && props.change && <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" disabled={props.addPatienLoader} onClick={() => handleOnCancel()}>Cancel</button>}
                                    <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" disabled={validate.isEmpty(selectedPatient) || props.addPatienLoader} onClick={() => handleClick()} style={{ width: "14rem" }}>
                                        {props.addPatienLoader ?
                                            <React.Fragment>
                                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                                <span className="sr-only"></span>
                                            </React.Fragment>
                                            : <React.Fragment>Save &amp; Continue</React.Fragment>
                                        }
                                    </button>
                                </div>
                            </React.Fragment>
                        }
                        {props.isAddOrEditPatientOpen &&
                            <React.Fragment>
                                <div className="form-group has-float-label mb-3">
                                    <input type="text" className={`form-control ${validate.isNotEmpty(errorMsg['patientName']) ? "is-invalid" : ''}`} id="patientName" aria-describedby="full-name" name="patientName" maxLength="30" autoComplete="off" placeholder=" " required="" value={validate.isNotEmpty(newPatient.patientName) ? newPatient.patientName : ""} onChange={(e) => { handleChange(e) }} onBlur={handleInputChange} onFocus={handleValidation} />
                                    <label className="select-label" htmlFor="patientName">Full Name</label>
                                    <div className="invalid-feedback d-block" id="full-name">{errorMsg['patientName']}</div>
                                </div>
                                <div className="toggle-select mb-3">
                                    <div className="d-flex">
                                        <button name="gender" type="button" role="button" className={newPatient.gender == "M" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => {setErrorMsg({...errorMsg,['gender']:null});setPatientGender("M")}}>Male</button>
                                        <button name="gender" type="button" role="button" className={newPatient.gender == "F" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => {setErrorMsg({...errorMsg,['gender']:null});setPatientGender("F")}}>Female</button>
                                        <button name="gender" type="button" role="button" className={newPatient.gender == "O" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => {setErrorMsg({...errorMsg,['gender']:null});setPatientGender("O")}}>Others</button>
                                    </div>
                                    <div className="invalid-feedback d-block">{errorMsg['gender']}</div>
                                </div>
                                {/* <div className="d-flex ">
                                    <div className="w-100">
                                        <input type={"radio"} id="ageGroup-dateOfBirth" onClick={() => { setAgeGroup("dateOfBirth"); setErrorMsg({ ...errorMsg, ["dateOfBirth"] : ""}) }} checked={ ageGroup=="dateOfBirth"} />
                                        <label htmlFor="ageGroup-dateOfBirth">Date of Birth</label>
                                    </div>
                                    <div className="w-100">
                                        <input type={"radio"} id="ageGroup-years" onClick={() => { setAgeGroup("years"); setErrorMsg({ ...errorMsg, ["age"]: "" }) }} checked={ageGroup == "years"} />
                                        <label htmlFor="ageGroup-years">Years</label>
                                    </div>
                                </div> */}
                                <div className="d-flex justify-content-between mb-3 no-gutters">
                                    <div className="form-group has-float-label mb-0 col-6">
                                        <MaskedInput autoComplete="off" aria-describedby="dob" maxLength={10} size={20} id="dateOfBirth" placeholder=" " className={`form-control ${validate.isNotEmpty(errorMsg["dateOfBirth"]) ? "is-invalid" : ''}`} maskChar="" type="text" mask="11/11/1111" name="date of birth" onBlur={(e) => { handleInputChange(e) }} onFocus={(e) => { setAgeGroup("dateOfBirth"); setErrorMsg({ ...errorMsg, "age": null }); handleValidation(e) }} onChange={(e) => handleChange(e)} value={DateValidator().getDisplayableFormat(newPatient.dateOfBirth)} />
                                        <label htmlFor="dateOfBirth" className="select-label">Date of Birth (DD/MM/YYYY)</label>
                                        <div className="invalid-feedback d-block" id="dob">{errorMsg['dateOfBirth']}</div>
                                    </div>
                                    <div className="circle-with-text">
                                        <span>OR</span>
                                    </div>
                                    <div className="form-group has-float-label mb-0">
                                        <input type="text" className={`form-control ${validate.isNotEmpty(errorMsg['age']) ? "is-invalid" : ''}`} id="age" name="age" minLength="1" maxLength="2" autoComplete="off" placeholder=" " required="" aria-describedby="ageInYears" value={newPatient.age} onChange={(e) => { handleChange(e) }} onBlur={handleInputChange} onFocus={(e) => { setAgeGroup("years"); setErrorMsg({ ...errorMsg, "dateOfBirth": null }); handleValidation }} />
                                        <label className="select-label" htmlFor="age">Enter age in years</label>
                                        <div className="invalid-feedback d-block" id="ageInYears">{errorMsg['age']}</div>
                                    </div>
                                </div>

                                <div className="d-flex">
                                    <p className="text-warning mb-0 font-12">Note:</p>
                                    <ul className="list-unstyled m-0 p-0 reportdelivery ml-2">
                                        <li className="small py-0 pl-0">
                                            All Fields are Mandatory
                                        </li>
                                        <li className="small py-0 pl-0">
                                            You can enter either the <strong>Date Of Birth</strong> or the <strong>Age</strong> of the patient for their age
                                        </li>
                                        <li className="small py-0 pl-0">
                                            To enter the age of an infant, please use the <strong>Date of Birth</strong> field
                                        </li>
                                    </ul>
                                </div>
                                <div className="text-center mt-3">
                                    {!forceUserDetails && <button type="button" role="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={toggleEdit}>Back</button>}
                                    <button type="button" role="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" onClick={addOrEditCustomerPatient}>Save &amp; Continue</button>
                                </div>
                            </React.Fragment>
                        }
                        {props.isConfirmationOpen && 
                            <React.Fragment>
                                <p>Are you sure you want to delete patient?</p>
                                <div className="text-center mt-3">
                                    <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={handleOnCancel}>Cancel</button>
                                    <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" onClick={() => deletePatient(patientIdToDelete)}>
                                        {deletePatientLoader &&
                                            <React.Fragment>
                                                <div className="px-5">
                                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                                <span className="sr-only"></span>
                                                </div>
                                            </React.Fragment>
                                        }
                                        {!deletePatientLoader && "Yes, Delete The Patient"}
                                    </button>
                                </div>
                            </React.Fragment>
                        }
                    </ModalBody>
                </Modal>
            }
        </React.Fragment>
    )
}
export default PatientModel;