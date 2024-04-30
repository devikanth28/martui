import React, { useState,useRef,useEffect} from 'react';
import { Modal, ModalHeader, ModalBody ,ModalFooter,Progress} from 'reactstrap';
import {DropdownMenu, DropdownItem, DropdownToggle,Dropdown } from 'reactstrap';
import healthRecordIcon from '../../../images/common/refil-interval-icn-cssbg.svg'
import Validate from '../../../helpers/Validate';
import ImageProcessService, { IMAGE_TYPE_PRESCRIPTION } from '../../../services/ImageProcessService';
import Alert ,{ALERT_TYPE_ERROR} from '../../Common/Alert';
import ServerConfig from '../../../constants/ServerConfig';
import DefaultBanner from "../../../images/image-load.gif";


const CreateOrEditHealthRecord = (props)=> {
    const [isUploadInProgress,setUploadInProgress] = useState(false);
    const isProceedLoading = props.isProceedLoading;
    const closeBtn = <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>{props.toggle(false)}} disabled={(isProceedLoading || isUploadInProgress)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect fill="none" width="24" height="24"/>
                            <path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z"/>
                        </svg>
                    </button>;


    const healthRecordTypes  = props.healthRecordTypes;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [noOfFilesUploaded, setNoOfFilesUploaded] = useState(0);
    const [filesUploadProgress, setFilesUploadProgress] = useState({});
    const [uploadedFilesInfo, setUploadedFilesInfo] = useState([]);
    const validate = Validate();
    const imageProcessService = ImageProcessService();
    const [errorMsg, setErrorMsg] = useState({});
    const [imageThumbnailPaths, setImageThumbnailPaths] = useState({});
    const [tempImageThumbnailPaths, setTempImageThumbnailPaths] = useState({});

    useEffect(() => {
        if(validate.isNotEmpty(props.customerHealthRecord) && validate.isNotEmpty(props.customerHealthRecord.recordImageDetailList)) {
            let imageThumbnailURLs = {};
            props.customerHealthRecord.recordImageDetailList.forEach((eachFileInfo, index) => {
                if(validate.isNotEmpty(eachFileInfo.imageId)) {
                    imageThumbnailURLs[index] = eachFileInfo.thumbnailPath;
                } else {
                    imageThumbnailURLs[index] = (props.imageServerDetail.imageServerUrl+"/"+eachFileInfo.thumbnailPath);
                }
            });
            setImageThumbnailPaths(imageThumbnailURLs);
            setTempImageThumbnailPaths(imageThumbnailURLs);
        }
    }, [props.customerHealthRecord]);

    const healthRecordValidation = e => {
        if (e.target.name.indexOf('recordName') > -1) {
            return validate.recordName(e.target.value, e.target.id, 30);
        }
        if (e.target.name.indexOf('patientName') > -1) {
            return validate.name(e.target.value, "Patient Name", 30);
        }
        if (e.target.name.indexOf('doctorName') > -1 && validate.isNotEmpty(e.target.value)) {
            return validate.name(e.target.value, "Doctor Name", 30);
        }
    }

    const handleOnChange = event => {
        props.updateCustomerHealthRecord(event.target.name, event.target.value);
    }
    
    const handleInputChange = event => {
        let feildName = event.target.name;
        let feildValue = event.target.value;

        let errMsg = healthRecordValidation(event);
        if (errMsg)  {
            setErrorMsg(errorMsg => ({...errorMsg, [feildName]:errMsg}));
        } else {
            setErrorMsg({...errorMsg,[feildName]: ''});
        }
        props.updateCustomerHealthRecord(feildName,feildValue);
    }
    const goToHome = () => {
        window.location.href = ServerConfig.REDIRECT_HOME_URL;
    }
    
    const addMoreFiles = useRef({});
    const uploadMorePrescriptions = (event) => {
        if(isUploadInProgress) {
            setAlertInfo({ message: "Please wait, a file upload is already in the process", type: "" });
            return false;
        }
        event.preventDefault();
        addMoreFiles.current.click();
    }
    const uploadFiles = (event) => {
        if(validate.isNotEmpty(event.target.files) && event.target.files.length > 0) {
            let files = event.target.files;
            let noOfFiles = files.length;
            let maxSizeOfFile = 0;
            let totalFilesSize = 0;
            for(let index = 0; index < noOfFiles; index++) {
                totalFilesSize += files[index].size;
                if(maxSizeOfFile < files[index].size) {
                    maxSizeOfFile = files[index].size;
                }
            }
            const isFilesUploadValid = validateFilesUpload(noOfFiles, maxSizeOfFile);
            if(!isFilesUploadValid) {
                return false;
            }
            setUploadInProgress(true);
            setNoOfFilesUploaded((noOfFilesUploaded+noOfFiles));
            setFilesUploadProgress({totalFilesSize: totalFilesSize, noOfFiles: noOfFiles, percentCompleted : 0});
            const config = {
                onUploadProgress: (progressEvent) => {
                    let index = 0;
                    let totalFiles = noOfFiles;
                    let eachTotalPercent =  100/totalFiles;
                    let eachComlpetedPercent = 0 ;
                    let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                    index = Math.floor(percentCompleted/eachTotalPercent);
                    eachComlpetedPercent = Math.round((percentCompleted - (eachTotalPercent * index)) * (totalFiles));
                    setFilesUploadProgress({totalFilesSize: totalFilesSize, noOfFiles: noOfFiles, percentCompleted : percentCompleted});
                }
            }
            imageProcessService.uploadFilesToImageServer(files, IMAGE_TYPE_PRESCRIPTION, config).then((response) => {
                const responseData = response.data ? response.data : response;
                setUploadInProgress(false);
                if(validate.isNotEmpty(responseData) && responseData.statusCode == "SUCCESS" && validate.isNotEmpty(responseData.response)) {
                    setUploadedFilesInfo([...uploadedFilesInfo, ...responseData.response]);
                    props.updateCustomerHealthRecord("recordImageDetailList",responseData.response);// this will orverride
                } else if(responseData.statusCode === "FAILURE" || responseData.statusCode === "404") {
                    setAlertInfo({ message: responseData.message, type: ALERT_TYPE_ERROR});
                }
            }).catch(function(error) {
                setUploadInProgress(false);
                setFilesUploadProgress({});
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
            });
        }
    }
    const validateFilesUpload = (noOfNewFiles, maxSizeOfNewFile) => {
        if(noOfNewFiles > 4) {
            setAlertInfo({ message: "Maximum 4 prescriptions can be selected at a time", type: "" });
            return false;
        }
        if(maxSizeOfNewFile > 4000000) {
            setAlertInfo({ message: "Size of a prescription file should be up to 4 MB", type: "" });
            return false;
        }
        const totalNoOfFiles = (noOfFilesUploaded + noOfNewFiles);
        if(totalNoOfFiles > 10) {
            setAlertInfo({ message: "You have exceeded maximum limit of prescription upload", type: "" });
            return false;
        }
        let noOfFiles = 0;
        if(validate.isNotEmpty(props.customerHealthRecord.recordImageDetailList)){
            noOfFiles = props.customerHealthRecord.recordImageDetailList.length;
        }
        const noOfUploadedFiles = (noOfFiles + noOfNewFiles);
        if(noOfUploadedFiles > 4) {
            const remainNoOfFiles = (4 - noOfFiles);
            const errorMsg = (remainNoOfFiles < 1) ? "No" : remainNoOfFiles.toString();
            setAlertInfo({ message: (errorMsg +" more prescription(s) allowed to add"), type: "" });
            return false;
        }
        return true;
    }
    const createOrUpdateHealthRecord = () => {
        let customerHealthRecord = props.customerHealthRecord;
        if(validate.isNotEmpty(validate.name(customerHealthRecord.recordName, "Record Name", 30))) {
            setErrorMsg(errorMsg => ({...errorMsg, ["recordName"]:validate.name(customerHealthRecord.recordName, "Record Name", 30)}));
            return;
        } else if(validate.isNotEmpty(validate.name(customerHealthRecord.patientName, "Patient Name", 30))) {
            setErrorMsg(errorMsg => ({...errorMsg, ["patientName"]:validate.name(customerHealthRecord.patientName, "Patient Name", 30)}));
            return;
        } else if(validate.isEmpty(customerHealthRecord.recordImageDetailList)) {
            setAlertInfo({ message: ("Upload prescription to"+ (props.isCreateHealthRecord ? " submit" : " update")), type: "" });
            return;
        }
        props.createOrUpdateHealthRecord();
    }

    /* const updateMyHealthRecord = () => {
        let customerHealthRecord = props.customerHealthRecord;
        if(validate.isEmpty(customerHealthRecord.recordName)) {
            setErrorMsg(errorMsg => ({...errorMsg, ["recordName"]:validate.name(customerHealthRecord.recordName, "Record Name", 30)}));
            return;
        } else if(validate.isEmpty(customerHealthRecord.patientName)) {
            setErrorMsg(errorMsg => ({...errorMsg, ["patientName"]:validate.name(customerHealthRecord.patientName, "Patient Name", 30)}));
            return;
        } else if(validate.isEmpty(customerHealthRecord.recordImageDetailList)) {
            setAlertInfo({ message: "Upload prescription to update", type: "" });
            return;
        }
        props.createOrUpdateHealthRecord();
    } */

    const removeUploadedFileInfo =(index,originalImageName,imageId)=>{
        if(isUploadInProgress) {
            setAlertInfo({ message: "Please wait as file uploading is in process", type: "" });
            return false;
        }
        props.removeUploadedFileInfo(index,originalImageName,imageId);
    }

    const handleImageLoadError = (index) => {
        setImageThumbnailPaths({...imageThumbnailPaths, [index]: DefaultBanner});
        setTimeout(() => {
            setImageThumbnailPaths(tempImageThumbnailPaths);
        }, 5000);
    }

    return (
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <Modal autoFocus={false} backdrop="static" keyboard={false} isOpen={props.modal} toggle={props.toggle} id="edit-health-record" className="modal-lg modal-dialog-centered my-account-modal edit-prescription-popup" tabIndex="-1" role="dialog"  aria-hidden="true">
                <ModalHeader close={closeBtn}>{props.isCreateHealthRecord ?"Create Health Record":"Edit Health Record"}</ModalHeader>
                <ModalBody>
                    {(!props.isHealthRecordCreatedSuccess &&  !props.isHealthRecordUpdatedSuccess) && <React.Fragment>
                    <div className="row mx-0">
                        <div className="col-6 pl-0">
                            <div className="form-group filled-form">
                                <input type="text" className="form-control" autoFocus id="Record Name"  name="recordName"  maxLength="30" required autoComplete="off" value={props.customerHealthRecord.recordName} onChange={handleOnChange} onBlur={handleInputChange}/>
                                <label  className="select-label">Record Name <sup className="text-brand">*</sup></label>
                                <div className="invalid-feedback d-block">
                                    {errorMsg['recordName']}
                                </div>
                            </div>
                            <div className="form-group filled-form">
                                <input type="text" className="form-control"  id="Doctor Name"  name="doctorName"  maxLength="30" required  autoComplete="off" value={props.customerHealthRecord.doctorName} onChange={handleOnChange} onBlur={handleInputChange} />
                                <label  className="select-label">Enter Doctor Name</label>
                                <div className="invalid-feedback d-block">
                                    {errorMsg['doctorName']}
                                </div>
                            </div>
                        </div>
                        <div className="col-6 pr-0">
                            <div className="form-group filled-form">
                                <input type="text" className="form-control"  id="Patient Name" name="patientName"   maxLength="30" required autoComplete="off" 
                                value={validate.isNumeric(props.customerHealthRecord.patientName) ? "" : props.customerHealthRecord.patientName} onChange={handleOnChange} onBlur={handleInputChange}
                                />
                                <label  className="select-label">Enter Patient Name <sup className="text-brand">*</sup></label>
                                <div className="invalid-feedback d-block">
                                    {errorMsg['patientName']}
                                </div>
                            </div>
                           {validate.isNotEmpty(healthRecordTypes) && <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                <DropdownToggle caret color="white" className="btn btn-block">
                                    {healthRecordTypes[props.customerHealthRecord.recordType]}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <span className="caret"></span>
                                    {Object.entries(healthRecordTypes).map(([key,value]) => {
                                        return (
                                            <DropdownItem className={props.customerHealthRecord.recordType == key ? 'active':''} key={key} title={value} onClick={()=>{props.updateCustomerHealthRecord("recordType",key)}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
                                                    <g transform="translate(-12 -13)">
                                                        <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                                                        <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                                                    </g>
                                                </svg>
                                                {value}
                                            </DropdownItem>)
                                    })}
                                </DropdownMenu>
                                </Dropdown>}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                        </div>
                    </div>
                    <input type="file" id="fileUpload" name="fileUpload" accept="image/*,application/pdf" ref={addMoreFiles} multiple onChange={event => uploadFiles(event)} hidden/>
                    {props.customerHealthRecord.status!='D' && <div className="add-more-div mt-0" onClick={event => uploadMorePrescriptions(event)}>
                        <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 44 44">
                            <rect fill="none" width="44" height="44"></rect>
                            <g transform="translate(0.5 4.659)">
                                <path fill="#08ce73" d="M1407.005,661.592a3.914,3.914,0,1,0-3.915-3.914A3.913,3.913,0,0,0,1407.005,661.592Zm0-5.965a2.051,2.051,0,1,1-2.051,2.051A2.049,2.049,0,0,1,1407.005,655.627Z" transform="translate(-1382.43 -641.987)"></path>
                                <path fill="#404040" d="M1433.671,651.231l-25.311-2.871a3.472,3.472,0,0,0-2.734.787,3.517,3.517,0,0,0-1.346,2.408l-.462,3.8h-1.437a3.722,3.722,0,0,0-3.569,3.843V670.5a7.091,7.091,0,1,0,7.41,11.246h21.61a3.8,3.8,0,0,0,3.893-3.611V677.4a4.643,4.643,0,0,0,1.763-.742,3.841,3.841,0,0,0,1.344-2.5l2.132-18.8A3.752,3.752,0,0,0,1433.671,651.231ZM1402.38,657.2h25.451a2.132,2.132,0,0,1,2.039,1.991v7.782h0l-10.106,5.88a2.37,2.37,0,0,1-2.736-.23l-5.1-4.494a4.135,4.135,0,0,0-5.148-.184l-3.743,2.72a7.06,7.06,0,0,0-2.375-.412V659.2A1.87,1.87,0,0,1,1402.38,657.2Zm-1.717,25.64a5.5,5.5,0,1,1,5.5-5.5A5.5,5.5,0,0,1,1400.663,682.845Zm29.207-4.707h0a1.952,1.952,0,0,1-2.039,1.759h-20.546a7.077,7.077,0,0,0-2.429-8.266l2.993-2.2a2.229,2.229,0,0,1,2.875.139l5.054,4.446a4.354,4.354,0,0,0,2.735,1.019,4.243,4.243,0,0,0,2.226-.6l9.131-5.279Zm5.241-23.035,0,.017-2.179,18.8a1.571,1.571,0,0,1-.6,1.249c-.187.185-.6.278-.6.371V659.2a3.984,3.984,0,0,0-3.893-3.843h-22.159l.417-3.611a1.842,1.842,0,0,1,2.087-1.575l25.264,2.917A1.853,1.853,0,0,1,1435.111,655.1Z" transform="translate(-1393.564 -648.325)"></path>
                                <path fill="#e71c37" d="M1403.071,661.348a.715.715,0,0,0-.967-.292l-4.73,2.522-1-1.793a.713.713,0,0,0-1.248.692l1.339,2.409a.718.718,0,0,0,.96.284l5.348-2.854A.714.714,0,0,0,1403.071,661.348Z" transform="translate(-1391.819 -633.594)"></path>
                            </g>
                        </svg>
                       {validate.isEmpty(props.customerHealthRecord.recordImageDetailList) ?'Add Records':'Add More Records'}
                    </div>}
                    <br/>
                    <p className="small">Select file to upload <sup className="text-brand">*</sup><span className="text-muted ml-2">Supported Files: jpeg/jpg/png/gif/pdf, Size upto 4MB</span></p>
                    {validate.isNotEmpty(filesUploadProgress) && validate.isNotEmpty(filesUploadProgress.percentCompleted) && (parseInt(filesUploadProgress.percentCompleted) >= 0) && (parseInt(filesUploadProgress.percentCompleted) < 100) &&
                    <div className="file-upload-progress-container">
                        <div className="file-upload-details">
                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="56" viewBox="0 0 44 56">
                                <g transform="translate(-6695.067 -3018.351)">
                                    <path fill="#777777" d="M1839.055,593.167H1809.98v56h44V608.018Zm.6,3.475,9.209,9.164,1.623,1.615h-10.832Zm12.279,50.488h-39.907V595.2h25.582v14.255h14.325Z" transform="translate(4885.087 2425.184)"></path>
                                    <path fill="#777777" d="M1.076-3.143V-7.285L.588-7.354a.434.434,0,0,1-.2-.088.222.222,0,0,1-.076-.181v-.429h.761v-.21a2.359,2.359,0,0,1,.146-.844,1.785,1.785,0,0,1,.444-.668,2.066,2.066,0,0,1,.744-.442,3.127,3.127,0,0,1,1.047-.159,3.446,3.446,0,0,1,.4.024,1.794,1.794,0,0,1,.354.073l-.034.546a.12.12,0,0,1-.122.115,2.881,2.881,0,0,1-.3.012,3,3,0,0,0-.771.085,1.289,1.289,0,0,0-.517.259,1,1,0,0,0-.29.429,1.8,1.8,0,0,0-.09.6v.181h3.05v4.909H4.092V-7.3H2.125v4.152Zm6.46-7.221v7.221H6.487v-7.221ZM12.1-6.192a1.542,1.542,0,0,0-.076-.49,1.148,1.148,0,0,0-.222-.4,1.012,1.012,0,0,0-.364-.263,1.236,1.236,0,0,0-.5-.1,1.213,1.213,0,0,0-.9.327,1.586,1.586,0,0,0-.415.917Zm-2.5.644a2.5,2.5,0,0,0,.132.734,1.514,1.514,0,0,0,.3.515,1.167,1.167,0,0,0,.449.3,1.618,1.618,0,0,0,.583.1,1.777,1.777,0,0,0,.532-.071,2.5,2.5,0,0,0,.39-.156q.166-.085.283-.156a.423.423,0,0,1,.215-.071.224.224,0,0,1,.2.1l.3.385a1.888,1.888,0,0,1-.42.371,2.445,2.445,0,0,1-.5.246,2.812,2.812,0,0,1-.542.137,3.671,3.671,0,0,1-.542.041,2.6,2.6,0,0,1-.959-.173,2.132,2.132,0,0,1-.766-.51,2.354,2.354,0,0,1-.507-.834,3.313,3.313,0,0,1-.183-1.147A2.8,2.8,0,0,1,8.72-6.7a2.3,2.3,0,0,1,.468-.781,2.2,2.2,0,0,1,.742-.525,2.423,2.423,0,0,1,.988-.193,2.364,2.364,0,0,1,.849.149,1.861,1.861,0,0,1,.673.437,2.008,2.008,0,0,1,.442.705,2.657,2.657,0,0,1,.159.949.669.669,0,0,1-.054.327.215.215,0,0,1-.2.083Z" transform="translate(6699.139 3072.134)"></path>
                                </g>
                            </svg>
                            <div className="file-upload-progress">
                                <small>{filesUploadProgress.noOfFiles + " file(s) uploading..."}</small>
                                <Progress barClassName="bar" color="success" value={filesUploadProgress.percentCompleted}><span className="sr-only percent">0% Complete</span></Progress>
                                <small className="file-uploading-text">Uploading.. 
                                    <span className="text-dark ml-1 percent">{filesUploadProgress.percentCompleted + "%"}</span>
                                </small>
                            </div>
                        </div>
                    </div>}
                    <div className="upload-container">
                    {validate.isNotEmpty(props.customerHealthRecord.recordImageDetailList) && props.customerHealthRecord.recordImageDetailList.map((eachFileInfo, index) => {
                        return (
                            <div className="each-upload"  key={index}>
                                <div className="content">
                                    <img id={"prescriptionImage_"+index} src={validate.isNotEmpty(imageThumbnailPaths) ? imageThumbnailPaths[index] : DefaultBanner} alt={"No preview"}  title={eachFileInfo.originalImageName} height="100" onError={() => handleImageLoadError(index)}/>
                                    <span className="delete-prescription" title="Delete prescription" onClick={() => removeUploadedFileInfo(index, eachFileInfo.originalImageName,eachFileInfo.imageId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16">
                                            <rect fill="none" width="16" height="16"></rect>
                                            <g transform="translate(0.66 0.001)">
                                                <path fill="#fff" d="M4.153,15.839A2.273,2.273,0,0,1,1.9,13.56V3.169H.542a.543.543,0,0,1,0-1.086H4.477V1.931A1.921,1.921,0,0,1,6.389,0H8.8a1.925,1.925,0,0,1,1.913,1.932v.152H14.3a.543.543,0,0,1,0,1.086H13.287V13.56a2.274,2.274,0,0,1-2.255,2.279ZM2.97,13.559a1.19,1.19,0,0,0,1.182,1.193h6.88a1.191,1.191,0,0,0,1.183-1.192V3.169H2.97ZM5.553,1.932l0,.151H9.634V1.932a.843.843,0,0,0-.84-.846H6.387A.846.846,0,0,0,5.553,1.932ZM9.967,13.506a.569.569,0,0,1-.545-.594V6.459a.568.568,0,0,1,.545-.543h.02a.567.567,0,0,1,.567.54v6.5a.569.569,0,0,1-.568.546Zm-2.4,0a.57.57,0,0,1-.545-.594V6.455a.566.566,0,1,1,1.132,0v6.5a.569.569,0,0,1-.567.546Zm-2.4,0a.57.57,0,0,1-.545-.594V6.455a.566.566,0,1,1,1.132,0v6.5a.569.569,0,0,1-.568.546Z" transform="translate(0 0)"></path>
                                            </g>
                                        </svg>
                                    </span>
                                    <p className="text-truncate" title={eachFileInfo.originalImageName}>{eachFileInfo.originalImageName}</p>
                                </div>
                            </div>
                        )
                    })}
                    </div> 
                    </React.Fragment>}
                    
                    <div className="text-center mt-4">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" data-dismiss="modal" onClick={()=>{props.toggle(false)}} disabled={(isProceedLoading || isUploadInProgress)}>Cancel</button>
                        <button type="button" className={"btn btn-brand-gradient rounded-pill ml-3 px-5 custom-btn-lg" + (props.isCreateHealthRecord ? " ga-create-health-record" : "")} disabled={(isProceedLoading || isUploadInProgress)} onClick={() => {createOrUpdateHealthRecord()}}>
                            {isProceedLoading ? "" : props.isCreateHealthRecord ? "Submit" : "Update"}
                            {isProceedLoading &&
                                <React.Fragment>
                                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                    <span className="sr-only"></span>
                                </React.Fragment>
                            }
                        </button>
                    </div>
                </ModalBody> 
            </Modal>
        </React.Fragment>
    )
}

export default CreateOrEditHealthRecord