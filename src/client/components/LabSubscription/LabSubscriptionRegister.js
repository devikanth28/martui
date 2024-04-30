import React, { useState } from 'react';
import { TabContent, TabPane,  Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Validate from "../../helpers/Validate";
import MyBookings from '../LabSubscription/MyBookings'
import SubsLoginIcon from "../../images/common/Subscriptions-amico.svg"
import {truncate} from '../LabSubscription/corporateRegister'

const LabSubscriptionRegister = (props) => {
    const validate=Validate();
    const [gender, setGender] = useState(null);
    const [photoProofType, setPhotoProofType] = useState(false);
    const [photoIdType, setphotoIdType] = useState("");
    const [selectedFile, setselectedFile] = useState(null);
    const [addmore, setaddmore] = useState(false);
    const [errorMsg, setErrorMsg] = useState({});
    const [subscriptionMemberDetails , setSubscriptionMemberDetails] = useState({})

    const openphotoProofType =() =>{
        setPhotoProofType(!photoProofType);
    }

    const handleInputChange = event => {
        let feildName = event.target.id;
        let errMsg = validateInputs(event);
        if (errMsg)  {
            setErrorMsg(errorMsg => ({...errorMsg, [feildName]:errMsg}));
        } else {
            setErrorMsg({...errorMsg,[feildName]: ''});
        }
    }

    const validateInputs = (e) =>{
        if (e.target.id.indexOf('photoIdNumber') > -1) {
            return validatePhotoIdNumber();
        } else if (e.target.id.indexOf('name') > -1) {
            return validate.name(e.target.value,"Name");
        } else if (e.target.id.indexOf('dob') > -1) {
            let Year_month = e.target.value.split("/")
            if (Year_month == '') {
                return 'Please provide month in format of (MM/YYYY)'
            }
            let month = Year_month[0]
            let year = Year_month[1]
            if (parseInt(month) > 12 || parseInt(month) < 0) {
                return 'Please provide a valid month'
            }
            return validate.year(year);
        } else if (e.target.id.indexOf('mailId') > -1) {
            return validate.email(e.target.value);
        }
    }

    const validatePhotoIdNumber = () => {
        if(validate.isEmpty(photoIdType)) {
            return "Select Photo ID Type" ;
        }
        switch(photoIdType) {
            case "Aadhaar Card" : return validate.aadhaarCardNo(subscriptionMemberDetails['photoIdNumber']);
            case "PAN Card" :  return validate.panCardNo(subscriptionMemberDetails['photoIdNumber']);
            case "Driving License" : return validate.drivingLicense(subscriptionMemberDetails['photoIdNumber']);
            case "Passport" : return validate.passport(subscriptionMemberDetails['photoIdNumber'])
            case "Pension Passbook" : return validate.pensionPassbook(subscriptionMemberDetails['photoIdNumber'])
            case "NPR Smart Card" : return validate.nprSmartCard(subscriptionMemberDetails['photoIdNumber'])
            case "Voter ID":return validate.voterId(subscriptionMemberDetails['photoIdNumber'])
            default : return;
        }
    }

    const handleChange=(e) => {        
        let fieldName = e.target.id;
        let fieldValue = e.target.value
        if (fieldName == 'addMore') {
            setaddmore(true)
        }
        else {
            setSubscriptionMemberDetails({...subscriptionMemberDetails,[fieldName]:fieldValue})
        }
    }

    const handleValidation = (e) =>{
        let formfield = e.target.id
        setErrorMsg(prevState=> ({
            ...prevState,
            [formfield]: ''
        }))
    }
    
    const onFileChange = (event) => {
        let selectedfile = (event.target.files[0]);
        if(selectedfile && (selectedfile.type == 'image/jpg' ||  selectedfile.type == 'image/jpeg' || selectedfile.type == 'image/png')) {
            setselectedFile(selectedfile)
            setErrorMsg(errorMsg => ({...errorMsg, ["fileerror"]:""}));
        } else {
            setselectedFile(null)
            setErrorMsg(errorMsg => ({...errorMsg, ["fileerror"]:"Please Upload a jpeg or png"}));
        }
      };


    return (
        <React.Fragment>
            <div className="subs-login-container">
                <section className="subs-login">
                    <div className="content">
                        <h4 className="mb-3">Register</h4>
                        <div class="form-group has-float-label mb-4">
                            <input name="name" id="name" placeholder=" " type="text" onChange= {(e)=>{handleChange(e)}} onBlur={handleInputChange} onFocus={handleValidation} autoComplete="off"   className={`form-control ${validate.isNotEmpty(errorMsg['name']) ? "is-invalid" : ''}`} />
                            <label htmlFor="name" class="select-label">Enter your Name</label>
                            <div class="invalid-feedback">{errorMsg['name']}</div>
                        </div>
                        <div className="toggle-select mb-4">
                            <p className="label-text">Gender</p>
                            <div className="d-flex">
                                <button className={gender == "M" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => setGender("M")}>Male</button>
                                <button className={gender == "F" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => setGender("F")}>Female</button>
                                <button className={gender == "O" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => setGender("O")}>Others</button>
                            </div>
                        </div>
                        <div className="mb-3 subs-register-dropdown">
                        { validate.isNotEmpty(photoIdType) && <label className="dropdown-label" style={{zIndex : "1001"}}>Photo ID Proof</label>}
                            <Dropdown isOpen={photoProofType} toggle={openphotoProofType}>
                                    <DropdownToggle caret color="white" className={ validate.isEmpty(photoIdType) ? "btn btn-block toggle-dropdown unchanged" : "btn btn-block toggle-dropdown"}>
                                      {photoIdType == "" ?  'Photo ID Proof' : photoIdType }
                                    </DropdownToggle>
                                    <DropdownMenu className="w-100">                                            
                                         <DropdownItem className={(photoIdType == 'Aadhaar Card') ? "active":"" } title="Aadhaar Card" onClick={() =>{setphotoIdType("Aadhaar Card")}}>Aadhaar Card</DropdownItem>
                                         <DropdownItem className={(photoIdType == 'Driving License') ? "active":"" } title="Driving License" onClick={() =>{setphotoIdType("Driving License")}}>Driving License</DropdownItem>
                                         <DropdownItem className={(photoIdType == 'PAN Card') ? "active":"" } title="PAN Card" onClick={() =>{setphotoIdType("PAN Card")}}>PAN Card</DropdownItem>
                                         <DropdownItem className={(photoIdType == 'Passport') ? "active":"" } title="Passport" onClick={() =>{setphotoIdType("Passport")}}>Passport</DropdownItem>
                                         <DropdownItem className={(photoIdType == 'Pension Passbook') ? "active":"" } title="Pension Passbook" onClick={() =>{setphotoIdType("Pension Passbook")}}>Pension Passbook</DropdownItem>
                                         <DropdownItem className={(photoIdType == 'NPR Smart Card') ? "active":"" } title="NPR Smart Card" onClick={() =>{setphotoIdType("NPR Smart Card")}}>NPR Smart Card</DropdownItem>
                                         <DropdownItem className={(photoIdType == 'Voter ID') ? "active":"" } title="Voter ID" onClick={() =>{setphotoIdType("Voter ID")}}>Voter ID</DropdownItem>
                                         <DropdownItem className={(photoIdType == 'Birth Certificate') ? "active":"" } title="Birth Certificate / Transfer Certificate" onClick={() =>{setphotoIdType("Birth Certificate")}}>Birth Certificate / Transfer Certificate</DropdownItem>
                                    </DropdownMenu>
                            </Dropdown>
                        </div>


                        <div className="form-group has-float-label mb-3">
                            <input name="photoIdNumber" id="photoIdNumber" onChange= {(e)=>{handleChange(e)}} onBlur={handleInputChange} onFocus={handleValidation} maxLength="16" placeholder=" " type="text" autoComplete="off"  className={`form-control ${validate.isNotEmpty(errorMsg['photoIdNumber']) ? "is-invalid" : ''}`} />
                            <label htmlFor="photoIdNumber" className="select-label text-capitalize">Photo Id Number</label>
                            <div className="invalid-feedback">{errorMsg['photoIdNumber']}</div>
                        </div>
                        <label for="file-select" className="mb-0 w-100">
                        <div className="border text-center font-14 mb-3 rounded pointer" style={{"padding" : "6px 8px"}}>{selectedFile != null ? truncate(selectedFile.name,30) : "Upload Photo ID" }</div>
                            <input type="file" id="file-select" accept="image/*" onChange={onFileChange} onFocus={()=> {setselectedFile(null)}} className={`d-none ${validate.isNotEmpty(errorMsg['fileerror']) ? "is-invalid" : ''}`}/>
                        </label>
                        <div className="form-group has-float-label mb-3">
                            <input name="mailId" id="mailId" maxLength="255" placeholder=" " type="text"  onChange= {(e)=>{handleChange(e)}} onBlur={handleInputChange} onFocus={handleValidation} autoComplete="off" className={`form-control ${validate.isNotEmpty(errorMsg['mailId']) ? "is-invalid" : ''}`}/>
                            <label htmlFor="mailId" className="select-label text-capitalize">Email ID</label>
                            <div className="invalid-feedback">{errorMsg['mailId']}</div>
                        </div>
                        <div className="form-group has-float-label mb-3">
                            <input name="dob" id="dob" maxLength="16" placeholder=" " type="text"  onChange= {(e)=>{handleChange(e)}} onBlur={handleInputChange} onFocus={handleValidation} autoComplete="off" className={`form-control ${validate.isNotEmpty(errorMsg['dob']) ? "is-invalid" : ''}`} />
                            <label htmlFor="dob" className="select-label text-capitalize">Month &amp; Year of Birth (MM/YYYY)</label>
                            <div className="invalid-feedback">{errorMsg['dob']}</div>
                        </div>
                        {/* <label className="form-group form-check m-0 pointer" for="addMore">
                            <input type="checkbox" name="addMore" id="addMore"  checked = {addmore} onChange= {() =>  setaddmore(!addmore)} />
                            <span className="checkmark" ></span>
                            <span className="v-align-sub ml-3 text-secondary">Add Member @ Rs xxx</span>
                        </label> */}
                        <MyBookings source = {'Register'} dispayImage = {false} showfooter = {false} />
                        <div className="row w-100 mt-4 mx-0 flex-row-reverse">
                        <div className="col-6 pr-1 pl-0"><button class="btn  btn-brand btn-block"> Register</button></div>
                            <div className="col pl-1 pr-0"><button class="btn  btn-light  btn-block"> Cancel</button></div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4">
                        <img src={SubsLoginIcon} title="Add a Member" alt="Add a Member" />
                    </div>
                </section>
            </div>
            
        </React.Fragment>
    )
}
export default LabSubscriptionRegister;