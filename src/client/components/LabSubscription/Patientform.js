import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Validate from '../../helpers/Validate';
import {truncate} from '../LabSubscription/corporateRegister'

const PatientForm = (props) => {

    const validate = Validate();
    const source = props.source
    let showimage = props.dispayImage
    let showfooter = props.showfooter
    let formDetails = props.patientdetails

    if (showimage == undefined) {
        showimage = true
    }
    if (showfooter == undefined) {
        showfooter = true
    }


    const [activeTab, setActiveTab] = useState('1');
    const [gender, setGender] = useState(null);
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const [PhotoIDDropDown_new, setphotoIdDropDown_new] = useState(false);
    const [RelationshipDropDown_new, setrelationshipDropDown_new] = useState(false);
    const [errorMsg, setErrorMsg] = useState({});
    const [subscriptionMemberpatientDetails, setSubscriptionMemberPatientDetails] = useState({})
    const [photoIdType, setphotoIdType] = useState("");
    const [selectedFile, setselectedFile] = useState(null);
    const [relationship_new_address, setrelationshipAddress] = useState("");

    const togglePhotoID_new = () => setphotoIdDropDown_new(PhotoIDDropDown_new => !PhotoIDDropDown_new);
    const togglerelationship_new = () => setrelationshipDropDown_new(RelationshipDropDown_new => !RelationshipDropDown_new);

    const handleInputChange = event => {
        let feildName = event.target.id;
        let errMsg = validateInputs(event);
        if (errMsg) {
            setErrorMsg(errorMsg => ({ ...errorMsg, [feildName]: errMsg }));
        } else {
            setErrorMsg({ ...errorMsg, [feildName]: '' });
        }
    }

    const handleSelection = (event,action, index) => {     
        props.cancelAction(action , index)
        event.preventDefault()
    }

    const validateInputs = (e) => {
        if (e.target.id.indexOf('photoIdNumber') > -1) {
            return validatePhotoIdNumber();
        } else if (e.target.id.indexOf('name') > -1) {
            return validate.name(e.target.value, "Name");
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
        } else if (e.target.id.indexOf('mobileNumber') > -1) {
            return validate.mobileNumber(e.target.value)
        }
    }


    useEffect(() => {
        if (formDetails !== undefined) {
            setSubscriptionMemberPatientDetails({ ...subscriptionMemberpatientDetails,
                ['nameNewMember']: formDetails.Name,
                ['photoIdNumberNewMember']: formDetails.proof_Number,
                ['mobileNumberNewMember']:formDetails.mobilenumber,
                ['dobNewMember']:formDetails.dob })
            setrelationshipAddress(formDetails.relationship)
            setphotoIdType(formDetails.Proof)
            setGender(formDetails.Gender)
        }
    }, []);

    const validatePhotoIdNumber = () => {
        if (validate.isEmpty(photoIdType)) {
            return "select Photo ID Type";
        }
        switch (photoIdType) {
            case "Aadhaar Card": return validate.aadhaarCardNo(subscriptionMemberpatientDetails['photoIdNumberNewMember']);
            case "PAN Card": return validate.panCardNo(subscriptionMemberpatientDetails['photoIdNumberNewMember']);
            case "Driving License": return validate.drivingLicense(subscriptionMemberpatientDetails['photoIdNumberNewMember']);
            case "Passport": return validate.passport(subscriptionMemberpatientDetails['photoIdNumberNewMember'])
            case "Pension Passbook": return validate.pensionPassbook(subscriptionMemberpatientDetails['photoIdNumberNewMember'])
            case "NPR Smart Card": return validate.nprSmartCard(subscriptionMemberpatientDetails['photoIdNumberNewMember'])
            case "Voter ID": return validate.voterId(subscriptionMemberpatientDetails['photoIdNumberNewMember'])
            default: return;
        }
    }

    const handleChange = (e) => {
        let fieldName = e.target.id;
        let fieldValue = e.target.value
        setSubscriptionMemberPatientDetails({ ...subscriptionMemberpatientDetails, [fieldName]: fieldValue })

    }

    const handleValidation = (e) => {
        let formfield = e.target.id
        setErrorMsg(prevState => ({
            ...prevState,
            [formfield]: ''
        }))
    }

    const onFileChange = (event) => {
        let selectedfile = (event.target.files[0]);
        if (selectedfile && (selectedfile.type == 'image/jpg' || selectedfile.type == 'image/jpeg' || selectedfile.type == 'image/png')) {
            setselectedFile(selectedfile)
            setErrorMsg(errorMsg => ({ ...errorMsg, ["fileerror"]: "" }));
        } else {
            setselectedFile(null)
            setErrorMsg(errorMsg => ({ ...errorMsg, ["fileerror"]: "Please Upload a jpeg or png" }));
        }
    };



    return (
        <ul className={source == 'existingPatient' ? "list-group mb-3 checkmark-icn active  border-active pl-2 position-relative" : "list-group mb-3"}>
            <li className={source == 'existingPatient' ? "list-group-item no-chev pl-5 border-0 py-3" : "list-group-item  border-0 p-0"}>
                <div className="form-group has-float-label mb-3">
                    <input name="nameNewMember" id="nameNewMember" value={subscriptionMemberpatientDetails['nameNewMember']} placeholder=" " type="text" onChange={(e) => { handleChange(e) }} onBlur={handleInputChange} onFocus={handleValidation} className={`form-control ${validate.isNotEmpty(errorMsg['nameNewMember']) ? "is-invalid" : ''}`} />
                    <label for="nameNewMember" className="select-label">Enter your Name</label>
                    <div className="invalid-feedback">{errorMsg['nameNewMember']}</div>
                </div>
                <div className="toggle-select mb-3">
                    <p className="label-text">Gender</p>
                    <div className="d-flex">
                        <button className={gender == "M" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => setGender("M")}>Male</button>
                        <button className={gender == "F" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => setGender("F")}>Female</button>
                        <button className={gender == "O" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => setGender("O")}>Others</button>
                    </div>
                </div>

                <div className="mb-3 subs-register-dropdown">
                    {validate.isNotEmpty(photoIdType) && <label className="dropdown-label" style={{ zIndex: "1001" }}>Photo ID Proof</label>}
                    <Dropdown isOpen={PhotoIDDropDown_new} toggle={togglePhotoID_new}>
                        <DropdownToggle caret color="white" className={validate.isEmpty(photoIdType) ? "btn btn-block toggle-dropdown unchanged" : "btn btn-block toggle-dropdown"}>
                            {photoIdType == "" ? 'Photo ID Proof' : photoIdType}
                        </DropdownToggle>
                        <DropdownMenu className="w-100">
                            <DropdownItem className={(photoIdType == 'Aadhaar Card') ? "active" : ""} title="Aadhaar Card" onClick={() => { setphotoIdType("Aadhaar Card") }}>Aadhaar Card</DropdownItem>
                            <DropdownItem className={(photoIdType == 'Driving License') ? "active" : ""} title="Driving License" onClick={() => { setphotoIdType("Driving License") }}>Driving License</DropdownItem>
                            <DropdownItem className={(photoIdType == 'PAN Card') ? "active" : ""} title="PAN Card" onClick={() => { setphotoIdType("PAN Card") }}>PAN Card</DropdownItem>
                            <DropdownItem className={(photoIdType == 'Passport') ? "active" : ""} title="Passport" onClick={() => { setphotoIdType("Passport") }}>Passport</DropdownItem>
                            <DropdownItem className={(photoIdType == 'Pension Passbook') ? "active" : ""} title="Pension Passbook" onClick={() => { setphotoIdType("Pension Passbook") }}>Pension Passbook</DropdownItem>
                            <DropdownItem className={(photoIdType == 'NPR Smart Card') ? "active" : ""} title="NPR Smart Card" onClick={() => { setphotoIdType("NPR Smart Card") }}>NPR Smart Card</DropdownItem>
                            <DropdownItem className={(photoIdType == 'Voter ID') ? "active" : ""} title="Voter ID" onClick={() => { setphotoIdType("Voter ID") }}>Voter ID</DropdownItem>
                            <DropdownItem className={(photoIdType == 'Birth Certificate') ? "active" : ""} title="Birth Certificate / Transfer Certificate" onClick={() => { setphotoIdType("Birth Certificate") }}>Birth Certificate / Transfer Certificate</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="form-group has-float-label mb-3">
                    <input name="photoIdNumberNewMember" id="photoIdNumberNewMember" value={subscriptionMemberpatientDetails['photoIdNumberNewMember']} onChange={(e) => { handleChange(e) }} onBlur={handleInputChange} onFocus={handleValidation} maxLength="16" placeholder=" " type="text" autoComplete="off" className={`form-control ${validate.isNotEmpty(errorMsg['photoIdNumberNewMember']) ? "is-invalid" : ''}`} />
                    <label htmlFor="photoIdNumberNewMember" className="select-label text-capitalize">Photo ID Number</label>
                    <div className="invalid-feedback">{errorMsg['photoIdNumberNewMember']}</div>
                </div>
                <label for="file-select" className="mb-0 w-100">
                    <div className="border text-center font-14 mb-3 rounded pointer" style={{"padding" : "6px 8px"}}>{selectedFile != null ? truncate(selectedFile.name,30) : "Upload Photo ID" }</div>
                    <input type="file" id="file-select" accept="image/*" onChange={onFileChange} onFocus={() => { setselectedFile(null) }} className={`d-none ${validate.isNotEmpty(errorMsg['fileerror']) ? "is-invalid" : ''}`} />
                    <div className="invalid-feedback">{errorMsg['fileerror']}</div>
                </label>
                <div class="form-group has-float-label mb-3">
                    <input name="mobileNumberNewMember" id="mobileNumberNewMember" value={subscriptionMemberpatientDetails['mobileNumberNewMember']} maxLength="10" placeholder=" " type="text" onChange={(e) => { handleChange(e) }} onBlur={handleInputChange} onFocus={handleValidation} className={`form-control ${validate.isNotEmpty(errorMsg['mobileNumberNewMember']) ? "is-invalid" : ''}`} />
                    <label htmlFor="mobileNumberNewMember" class="select-label">Mobile Number</label>
                    <div class="invalid-feedback">{errorMsg['mobileNumberNewMember']}</div>
                </div>
                <div className="form-group has-float-label mb-3">
                    <input name="dobNewMember" id="dobNewMember" value={subscriptionMemberpatientDetails['dobNewMember']} maxLength="8" placeholder=" " type="text" onChange={(e) => { handleChange(e) }} onBlur={handleInputChange} onFocus={handleValidation} className={`form-control ${validate.isNotEmpty(errorMsg['dobNewMember']) ? "is-invalid" : ''}`} />
                    <label for="dobNewMember" className="select-label">Month &amp; Year of Birth (MM/YYYY)</label>
                    <div class="invalid-feedback">{errorMsg['dobNewMember']}</div>
                </div>




                <div className="mb-3 subs-register-dropdown">
                    {validate.isNotEmpty(photoIdType) && <label className="dropdown-label" style={{ zIndex: "1001" }}>Relationship</label>}
                    <Dropdown isOpen={RelationshipDropDown_new} toggle={togglerelationship_new}>
                        <DropdownToggle caret color="white" className={validate.isEmpty(photoIdType) ? "btn btn-block toggle-dropdown unchanged" : "btn btn-block toggle-dropdown"}>
                            {relationship_new_address == "" ? 'Relationship' : relationship_new_address}
                        </DropdownToggle>
                        <DropdownMenu className="w-100">
                            <DropdownItem className={(relationship_new_address == 'Spouse') ? "active" : ""} title="Spouse" onClick={() => { setrelationshipAddress("Spouse") }}>Spouse</DropdownItem>
                            <DropdownItem className={(relationship_new_address == 'Children') ? "active" : ""} title="Children" onClick={() => { setrelationshipAddress("Children") }}>Children</DropdownItem>
                            <DropdownItem className={(relationship_new_address == 'Parents') ? "active" : ""} title="Parents" onClick={() => { setrelationshipAddress("Parents") }}>Parents</DropdownItem>
                            <DropdownItem className={(relationship_new_address == 'Sibilings') ? "active" : ""} title="Sibilings" onClick={() => { setrelationshipAddress("Sibilings") }}>Sibilings</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                {(source == 'existingPatient' || source == 'newPatient') && <div className="row flex-row-reverse mx-0 mt-3">
                    <div className="col pr-0 pl-1"><button type="submit" onClick = {(event) => handleSelection(event,'save', props.index)} className="btn btn-outline-brand btn-block rounded-pill">Save</button></div>
                    <div className="col pl-0 pr-1"><button type="button" onClick = {(event) => handleSelection(event,'cancel', props.index)} className="btn btn-light btn-block rounded-pill">Cancel</button></div>
                </div>}
            </li>
        </ul>


    )


}
export default PatientForm