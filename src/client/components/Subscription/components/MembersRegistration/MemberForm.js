import React, {  useState, useEffect, useRef } from "react";
import Validate from '../../../../helpers/Validate';
import DateValidator from '../../../../helpers/DateValidator';
import ImageProcessService from '../../../../services/ImageProcessService';
import { photoIdInputMaxLength} from "../../constants/SubscriptionConstants";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import MaskedInput from 'react-maskedinput';
import UploadPhotoId from "../UploadPhotoId";
import { getDisplayableAge } from "../../../../helpers/CommonUtil";


const maxSize = 3000000;
const MemberForm = (props) => {
    const initialCustomer={'patientName':'','dob':'','gender':'','relationship':'','kycType':'','kycRefNo':'','kycDocPath':'','mobile':''};
    const validate=Validate();
    const dateValidator = DateValidator();
    const [errorMsg, setErrorMsg] = useState({});
    const [customer,setCustomer]=useState(props.member ? props.member : initialCustomer);
    const [openphotoProofType,setOpenPhotoProofType]=useState(false);
    const [selectedFile,setSelectedFile]=useState(props.selectedFile ? props.selectedFile : undefined);
    const [imagePath,setImagePath]=useState(props.imagePath ? props.imagePath : undefined);
    const [relationShipModel,setRelationShipModel]=useState(false);
    const [uploadPhotoModel,setUploadPhotoModel]=useState(false);
    const [isSaveDisabled,setIsSaveDisabled] = useState(true);
    const [isDisplayProgressLoader, setDisplayProgressLoader] = useState(false);
    const [percentCompleted, setPercentCompleted] = useState(0);
    const imageUploadRef = useRef({});
    const uploadPhotoIdForm = props.uploadPhotoIdForm ? props.uploadPhotoIdForm : false;

    
    useEffect(()=>{
        setCustomer(props.member);
        setSelectedFile(props.selectedFile);
        setImagePath(props.imagePath);
    },[props.member])

    useEffect(()=>{
        if(validateTheCustomer(customer)){
            setIsSaveDisabled(false);
        }else{
            setIsSaveDisabled(true);
        }

    },[customer,selectedFile]);
   
    const validateTheCustomer=(customer)=>{
        if(validate.name(customer.patientName)){
            return false;
        }
        if(dateValidator.validateDate(customer.dob)){
            return false;
        }
        if(validate.isEmpty(customer.gender)){
            return false;
        }
        if(validate.isEmpty(customer.relationship)){
            return false;
        }
        if(props.uploadPhotoIdForm && validate.isEmpty(customer.kycType)){
            return false;
        } 
        if(validate.isNotEmpty(customer.kycType)){
            if(!checkIfSelectedKyCTypeExistsInVerifiedList(customer.kycType) && validatePhotoIdNumber(customer.kycRefNo)){
                return false;
            }
        }
        return true;
    }

    const handleInputChange = (event) => {
        let feildName = event.target.id;
        let errMsg = validateInputs(event);
        if (errMsg)  {
            let errMessage={...errorMsg,[feildName]:errMsg}
           setErrorMsg(errMessage);
        } else {
            let errMessage={...errorMsg,[feildName]:''}
           setErrorMsg(errMessage);
        }
    }
    const validatePhotoIdNumber = (value) => {
        if(validate.isEmpty(customer.kycType)) {
            return "Select Photo ID" ;
        }
        switch(customer.kycType.kycType) {
            case "AADHAAR_CARD": return validate.aadhaarCardNo(value);
            case "PAN_CARD": return validate.panCardNo(value);
            case "DRIVING_LICENSE": return validate.drivingLicense(value);
            case "PASSPORT": return validate.passport(value);
            case "PENSION_PASSBOOK": return validate.pensionPassbook(value);
            case "NPR_SMART_CARD": return validate.nprSmartCard(value);
            case "VOTER_ID": return validate.voterId(value);
            default: return;
        }
       
    }
    const checkIfSelectedKyCTypeExistsInVerifiedList =(kycType)=>{
        let customer = {...props.member};
        let listOfVerifiedKycCustomers = customer.verifiedKycTypes;
        if(validate.isNotEmpty(listOfVerifiedKycCustomers) && listOfVerifiedKycCustomers.length > 0){
            return listOfVerifiedKycCustomers.indexOf(kycType.kycType) === -1? false:true
         }
        return false;

    }
    const validateInputs = (e) =>{
        if (e.target.id.indexOf('newMemberName') > -1) {
            return validate.name(e.target.value,"Name", 30);
        } else if (e.target.id.indexOf('dobNewMember') > -1) {
            return dateValidator.validateDate(e.target.value);
        }  else if (e.target.id.indexOf('photoIdNumberNewMember') > -1) {
            return validatePhotoIdNumber(e.target.value);
        } else if(e.target.id.indexOf('mobileNumberNewMember') > -1){
            return validate.mobileNumber(e.target.value);
        }
    }
    const handleOnChange = (event) => {
        handleInputChange(event);
        
        let maxLength = event.target.maxLength;
        if(maxLength && event.target.value.length > maxLength) {
            return;
        } else if (event.target.id == "newMemberName" && validate.isNotEmpty(event.target.value) && !validate.isAlphaWithSpace(event.target.value)) { 
            return;
        } else {
            let customerStateObject = {...customer};
            if(event.target.id === 'newMemberName'){
                customerStateObject.patientName=event.target.value;
            }
            if(event.target.id === 'dobNewMember'){
                customerStateObject.dob=event.target.value;
                
            }

            if(event.target.id ==='photoIdNumberNewMember'){
                if(validate.isEmpty(event.target.value)){
                    customerStateObject.kycRefNo='';
                }else if(customerStateObject.kycType.kycType === "AADHAAR_CARD" && validate.isNumeric(event.target.value)){  
                    customerStateObject.kycRefNo=event.target.value;
                } else if (customerStateObject.kycType.kycType !== "AADHAAR_CARD" && validate.isAlphaNumericWithSpace(event.target.value)){
                    customerStateObject.kycRefNo=event.target.value;
                }
            }
            if(event.target.id === 'mobileNumberNewMember'){
                customerStateObject.mobile=event.target.value;
            }
            checkIfFormIsPartiallyFilled(customerStateObject);
            setCustomer(customerStateObject);
        }
    }

    const checkIfFormIsPartiallyFilled=(customer)=>{
        let isPartiallyFilled = false;
        if(validate.isNotEmpty(customer.patientName)){
            isPartiallyFilled = true;
        }else if(validate.isNotEmpty(customer.dob)){
            isPartiallyFilled= true;
        }else if(validate.isNotEmpty(customer.gender)){
            isPartiallyFilled= true;
        }else if(validate.isNotEmpty(customer.relationship)){
            isPartiallyFilled= true;
        }else if(validate.isNotEmpty(customer.kycType)){
            isPartiallyFilled= true;
        }
        if(isPartiallyFilled){
            props.setIsFormEdit(true);
        }else{
            props.setIsFormEdit(false);
        }
    }
    
    const validateCustomer=()=>{
        let isValid = true;
        if(validate.name(customer.patientName)){
            let errMessage={...errorMsg,'newMemberName':`please enter valid name`}
            setErrorMsg(errMessage);
            isValid = false;
        }
        if(dateValidator.validateDate(customer.dob)){
        	  let errMessage={...errorMsg,'dobNewMember':dateValidator.validateDate(customer.dob)}
              setErrorMsg(errMessage);
              isValid = false;
        }
        if(validate.isEmpty(customer.gender)){
            props.setAlertData({message:"select your gender",type:'danger'});
            return false;
        }
        if(validate.isEmpty(customer.relationship)){
            props.setAlertData({message:"select relation type",type:'danger'});
            return false;
        } 
        if(validate.isNotEmpty(customer.kycType)){
            if(!checkIfSelectedKyCTypeExistsInVerifiedList(customer.kycType) && validatePhotoIdNumber(customer.kycRefNo)){
                let errMessage={...errorMsg,'photoIdNumberNewMember':`please enter valid ${customer.kycType.kycName}`}
                setErrorMsg(errMessage);            
                isValid = false;
            }
           /*  if(!checkIfSelectedKyCTypeExistsInVerifiedList(customer.kycType) && (!selectedFile)){
                props.setAlertData({message:`Please upload photo ID for ${customer.kycType.kycName}`,type:'danger'});
                return false;
            } */
        }
        
        return isValid;
    }

    const setGenderIntoCustomer=(value)=>{
        let customerObject = {...customer};
        customerObject.gender=value;
       setCustomer(customerObject);
     }
     const setRelation=(value)=>{
        let customerObject = {...customer};
        customerObject.relationship=value;
        setCustomer(customerObject);
     }
     
    
    const updateKycType=(kycType)=>{
        let customerObject = {...customer};
        if(validate.isEmpty(kycType) || (validate.isNotEmpty(customerObject.kycType) && customerObject.kycType.kycType !== kycType.kycType)){
            customerObject.kycRefNo= '';
            setSelectedFile(undefined);
            setImagePath(undefined);
            let errorMessage = {...errorMsg,['photoIdNumberNewMember']:''}
            setErrorMsg(errorMessage)
        }
        customerObject.kycType = kycType;
        setCustomer(customerObject);
    }
    const uploadFile=(e)=>{
        if(validate.isEmpty(customer.kycType) || validate.isEmpty(customer.kycRefNo)){
            props.setAlertData({message:"please select photoId and enter photoId number before uploading",type:'danger'});
            setSelectedFile(undefined);
            setImagePath(undefined);
            return;
        }
        let file = e.target.files[0];
        if(file){
            if(file.type != "image/png" && file.type !="image/jpg" && file.type !="image/jpeg"){
                 props.setAlertData({message : "Only JPG, JPEG and PNG types are accepted !", type : "danger" })
                 setSelectedFile(undefined);
                setImagePath(undefined);
                 return;
            }
            if(file.type != "application/pdf" && file.size > maxSize){
                props.setBackDropLoader(true)
                const quality = parseFloat(2200000 / file.size).toFixed(2) ;
                resize(file,quality);
                return;
            }else{
                setErrorMsg({...errorMsg,'new-file-select':''});
                uploadImageToServer(file);
            }  
        }
    
    }
    const resize =  (file, quality) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            var dataUrl = event.target.result;
            var image = new Image();
            image.src = dataUrl;
            image.onload = function () {
                var resizedDataUrl = resizeImage(image, quality);
                saveBlob(resizedDataUrl);
            };
        };
    }
    const saveBlob = (dataURI) => {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], {type: mimeString});
        let file =blob;
        if(!window.cordova){
            file = new File([blob], imagePath.name, {type: mimeString});
        }
        setErrorMsg({...errorMsg,'new-file-select':''});
        uploadImageToServer(file);
        props.setBackDropLoader(false);
       
    }

    const resizeImage = (image, quality) => {
        quality = parseFloat(quality);
        var canvas = document.createElement('canvas');
        var width = image.width;
        var height = image.height;
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);
        return canvas.toDataURL("image/jpeg", quality);
    }

    const saveCustomer=()=>{
        if(!validateCustomer()){
            return;
        }
        //calculate the age based on year entered and save in customer.age value
        let customerObject= {...customer};
        let age = calculateAgeForCustomer(customerObject.dob);
        customerObject.age=age;
        props.setIsFormEdit(false);
        props.saveCustomer(customerObject,props.index,selectedFile,imagePath);
        
    }

    const calculateAgeForCustomer= (dob)=>{
        let birthDate = new Date(`${dob.split("/")[2]}-${dob.split("/")[1]}-${dob.split("/")[0]}`);
        var today = new Date();
        let  age = today.getFullYear() - birthDate.getFullYear();
        let  m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const removeCustomer=()=>{
        props.setIsFormEdit(false);
        props.removeCustomer();
    }

    const handleValidation = (e) =>{
        let errorMessage = {...errorMsg,[e.target.id]:''}
        setErrorMsg(errorMessage)
    }

    const uploadImageToServer = (file) => {
        setPercentCompleted(0);
        const config = {
            onUploadProgress: (progressEvent) =>{
                let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                setPercentCompleted(percentCompleted);
            }
        }
        setDisplayProgressLoader(true);
        ImageProcessService().uploadFilesToImageServer([file], "K", config).then(data => {
            if ("SUCCESS" == data.statusCode && data.response) {
                let imageObject = data.response[0];
                setSelectedFile(file);
                setImagePath(imageObject);
                let customerObject={...customer}
                customerObject.imageFile= imageObject;
                setCustomer(customerObject);
                setDisplayProgressLoader(false);
            }  else {
                setDisplayProgressLoader(false);
                props.setAlertData({ message: data.message ? data.message : "unable to upload images", type: 'danger' });
            }
        }).catch(err=>{
            setDisplayProgressLoader(false);
            props.setAlertData({ message: "unable to upload images", type: 'danger' });
        })
    }

    const getPhotoUploadSection = (className) => {
        return (
            <>
                <div tabIndex={1} className={`${className} mb-3 subs-register-dropdown`} >
                    {validate.isNotEmpty(customer.kycType) && <label className="dropdown-label" style={{ zIndex: "1001" }}>Photo ID Proof</label>}
                    <Dropdown isOpen={openphotoProofType} toggle={() => { setOpenPhotoProofType(openphotoProofType => !openphotoProofType) }}>
                        <DropdownToggle caret color="white" className={validate.isEmpty(customer.kycType) ? "btn btn-block toggle-dropdown" : "btn btn-block toggle-dropdown"}>
                            {validate.isEmpty(customer.kycType) ? 'Photo ID Proof' : <React.Fragment>{customer.kycType.kycName}{checkIfSelectedKyCTypeExistsInVerifiedList(customer.kycType) ? <span>&nbsp;(<span className="text-success">verified</span>)</span> : <React.Fragment></React.Fragment>}</React.Fragment>}
                        </DropdownToggle>
                        <DropdownMenu className="w-100">
                            <DropdownItem key={"0"} className={validate.isNotEmpty(customer.kycType) ? "" : "active"} tag="a" href="javascript:void(0);" title={"Select Photo ID"} onClick={() => { updateKycType('') }}>Select Photo ID </DropdownItem>
                            {props.kycTypes && props.kycTypes.map((kycType) => {
                                return (
                                    <DropdownItem key={kycType.kycType} className={(customer.kycType && customer.kycType.kycType == kycType.kycType) ? "active" : ""} tag="a" href="javascript:void(0);" title={kycType.kycName} onClick={() => { updateKycType(kycType) }}>{kycType.kycName}{checkIfSelectedKyCTypeExistsInVerifiedList(kycType) ? <span>&nbsp;(<span className="text-success">verified</span>)</span> : ""}</DropdownItem>
                                )
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                {(validate.isNotEmpty(customer.kycType) && !checkIfSelectedKyCTypeExistsInVerifiedList(customer.kycType)) &&
                    <React.Fragment>
                        {/* <div className="form-group has-float-label mb-3">
                            <input name="photoIdNumberNewMember" id="photoIdNumberNewMember" value={customer.kycRefNo} onChange={(e) => { handleOnChange(e) }} onBlur={(e)=>{handleInputChange(e)}}  maxLength={validate.isNotEmpty(customer.kycType) && validate.isNotEmpty(photoIdInputMaxLength[customer.kycType.kycType])?photoIdInputMaxLength[customer.kycType.kycType]:"16"} placeholder=" " type="text" autoComplete="off" className={`form-control ${validate.isNotEmpty(errorMsg['photoIdNumberNewMember']) ? "is-invalid" : ''}`} />
                            <label htmlFor="photoIdNumberNewMember" className="select-label text-capitalize">Photo ID Number</label>
                            <div className="invalid-feedback">{errorMsg['photoIdNumberNewMember']}</div>
                        </div> */}
                        <UploadPhotoId labelName={"new-file-select"} selectedFile={selectedFile} imagePath={imagePath} kycType={customer.kycType} errorMessage={errorMsg['new-file-select']} uploadFile={uploadFile} isDisplayProgressLoader={isDisplayProgressLoader} percentCompleted={percentCompleted} errorMsg={errorMsg && errorMsg["photoIdNumberNewMember"] ? errorMsg["photoIdNumberNewMember"] : ""} kycRefNo={customer.kycRefNo} handleOnChange={handleOnChange} id="photoIdNumberNewMember"></UploadPhotoId>
                    </React.Fragment>
                }
                {/* <div class="form-group has-float-label mb-3">
                    <input name="mobileNumberNewMember" id="mobileNumberNewMember" value={customer.mobile} maxLength="10" placeholder=" " type="text" onChange={(e) => { handleOnChange(e) }} className={`form-control ${validate.isNotEmpty(errorMsg['mobileNumberNewMember']) ? "is-invalid" : ''}`} />
                    <label htmlFor="mobileNumberNewMember" class="select-label">Mobile Number</label>
                    <div class="invalid-feedback">{errorMsg['mobileNumberNewMember']}</div>
                </div> */}
            </>
        )
    }

    const getGenderString = (value) => {
        switch (value) {
            case "M": return "Male";
            case "F": return "Female";
            case "O": return "Others";
            default: return "";
        }
    }

    return  (
        <ul style={props.source == 'existingPatient' ? {'border-radius':'1rem'} : {}} className={props.source == 'existingPatient' ? `list-group mb-3 ${(validate.isNotEmpty(props.isAlertShown)) ? "border-danger border-active":"border-active"}  px-2 position-relative mr-2` : "list-group mb-3"}>
            {props.source == 'existingPatient' && <div className="checkmark-icn active" onClick={removeCustomer}></div>}
            <li className={props.source == 'existingPatient' ? "list-group-item no-chev pl-5 border-0 py-3" : "list-group-item  border-0 p-0"}>
                {uploadPhotoIdForm ? <>
                    {customer.patientName && <p className="mb-0"><small className="text-secondary">Name: </small><small className="ml-1 text-dark">{customer.patientName}</small></p>}
                    {(customer.dob || customer.gender) && <p className="mb-0">
                        <small className="text-secondary">
                            {customer.dob && "Age"}
                            {customer.dob && customer.gender && " / "}
                            {customer.gender && "Gender"}:
                        </small>
                        <small className="ml-2 text-dark"> {customer.dob && getDisplayableAge(customer.dob)}
                            {customer.dob && customer.gender && " / "}
                            {customer.gender && getGenderString(customer.gender)}
                        </small>
                    </p>}
                    {customer.relationship && customer.relationship.name && <p className="mb-0"><small className="text-secondary">Relationship: </small><small className="ml-1 text-dark">{customer.relationship.name}</small></p>}
                    {getPhotoUploadSection("mt-2 custom-dropdown-focus")}
                </> : <>
                    <div className="form-group has-float-label mb-3">
                        <input name="name" id="newMemberName" autoFocus={props.isAutoFocusRequired?true:false} placeholder=" " type="text" autoComplete="off" maxLength={30}  onChange={(e)=>handleOnChange(e)} onBlur={(e)=>{handleInputChange(e)}} value={customer.patientName}  className={`form-control ${validate.isNotEmpty(errorMsg['newMemberName']) ? "is-invalid" : ''}`} />
                        <label htmlFor="newMemberName" className="select-label">Enter Name<sup className="text-danger"> *</sup></label>
                        <div className="invalid-feedback">{errorMsg['newMemberName']}</div>
                    </div>
                    <div className="toggle-select mb-3">
                        <p className="label-text">Gender<sup className="text-danger"> *</sup></p>
                        <div className="d-flex">
                            <button className={customer.gender == "M" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => {props.setIsFormEdit(true);setGenderIntoCustomer("M")}}>Male</button>
                            <button className={customer.gender == "F" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => {props.setIsFormEdit(true);setGenderIntoCustomer("F")}}>Female</button>
                            <button className={customer.gender == "O" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => {props.setIsFormEdit(true);setGenderIntoCustomer("O")}}>Others</button>
                        </div>
                    </div>
                    {getPhotoUploadSection("custom-dropdown-focus")}
                    
                    <div className="form-group has-float-label mb-3">
                    <MaskedInput  autoComplete="off" maxLength={10} id="dobNewMember" placeholder=" "  className={`form-control ${validate.isNotEmpty(errorMsg["dobNewMember"]) ? "is-invalid" : ''}`} maskChar="" type="text" mask="11/11/1111" name="date of birth" onBlur={(e)=>{handleInputChange(e)}} onFocus={(e)=>{handleValidation(e)}}  onChange={(e) => handleOnChange(e)} value={customer.dob} />

    {/*                     <input name="dobNewMember" id="dobNewMember" value={customer.dob} maxLength="10" placeholder=" " type="text" onChange={(e) => { handleOnChange(e) }} onBlur={(e)=>{handleInputChange(e)}}  className={`form-control ${validate.isNotEmpty(errorMsg['dobNewMember']) ? "is-invalid" : ''}`} />
    */}                    <label htmlFor="dobNewMember" className="select-label">Date of Birth (DD/MM/YYYY)<sup className="text-danger"> *</sup></label>
                        <div class="invalid-feedback">{errorMsg['dobNewMember']}</div>
                    </div>
                    <div className="mb-3 subs-register-dropdown custom-dropdown-focus">
                        {validate.isNotEmpty(customer.relationship) && <label className="dropdown-label" style={{ zIndex: "1001" }}>Relationship<sup className="text-danger"> *</sup> </label>}
                        <Dropdown isOpen={relationShipModel} toggle={()=>{setRelationShipModel(relationShipModel=>!relationShipModel)}}>
                            <DropdownToggle caret color="white" className={validate.isEmpty(customer.relationship) ? "btn btn-block toggle-dropdown" : "btn btn-block toggle-dropdown"}>
                                {validate.isEmpty(customer.relationship) ? 'Relationship' : customer.relationship.name}
                                {validate.isEmpty(customer.relationship) && <sup className="text-danger"> *</sup>}
                            </DropdownToggle>
                            <DropdownMenu className="w-100">
                                {props.relations && props.relations.map((relation) => {
                                    if(relation.relationshipType !== "SELF"){
                                        return (
                                            <DropdownItem key={relation.relationshipType} className={(customer.relationship && customer.relationship.relationshipType == relation.relationshipType) ? "active" : ""} tag="a" href="javascript:void(0);" title={relation.name} onClick={() => { props.setIsFormEdit(true);setRelation(relation) }}>{relation.name}</DropdownItem>
                                        )
                                    }
                                })}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                
                </>}
                {<div className="row flex-row-reverse mx-0 mt-3">
                    <div className="col pr-0 pl-1"><button type="submit" disabled={isSaveDisabled} onClick={saveCustomer}  className="btn btn-outline-brand rounded-pill btn-block">{props.from =="myAccountSection" ? "Add" : "Save"}</button></div>
                    <div className="col pl-0 pr-1"><button type="button" onClick={removeCustomer} className="btn btn-light btn-block rounded-pill">{props.from == 'myAccountSection' ? "Reset" : "Cancel"}</button></div>
                </div>}
            </li>
        </ul>
    );
}

export default MemberForm;