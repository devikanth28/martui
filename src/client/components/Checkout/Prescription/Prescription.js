import React, { useState, useEffect, useRef } from 'react';
import CheckoutInfoNote from '../../Common/CheckoutInfoNote';
import Alert,{ALERT_TYPE_ERROR} from '../../Common/Alert';
import PrescriptionService from '../../../services/PrescriptionService';
import ImageProcessService, { IMAGE_TYPE_PRESCRIPTION } from '../../../services/ImageProcessService';
import Validate from '../../../helpers/Validate';
import {getFileName, getFileNameByType} from '../../../helpers/CommonUtil';
import CheckoutAction from '../../../../redux/action/CheckoutAction';
import PrescriptionGhostImage from './PrescriptionGhostImage';
import UploadPrescriptions from './UploadPrescriptions';
import PreviousPrescriptions from './PreviousPrescriptions';
import PatientDetail from './PatientDetail';

const Prescription = (props) => {

    const imageProcessService = ImageProcessService();
    const prescriptionService = PrescriptionService();
    const validate = Validate();
    const checkoutAction = CheckoutAction();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [isPrescriptionLoading, setPrescriptionLoading] = useState(false);
    const [isProceedLoading, setProceedLoading] = useState(false);
    const [imageServerDetail, setImageServerDetail] = useState({});
    const [filesToUpload, setFilesToUpload] = useState([]);
    const [filesUploadProgress, setFilesUploadProgress] = useState({});
    const [isFilesUploadInProgress, setFilesUploadInProgress] = useState(false);
    const [noOfFilesUploaded, setNoOfFilesUploaded] = useState(0);
    const [uploadedFilesInfo, setUploadedFilesInfo] = useState([]);
    const [prescriptionOptions, setPrescriptionOptions] = useState({});
    const [healthRecords, setHealthRecords] = useState([]);
    const [totalHealthRecords, setTotalHealthRecords] = useState(0);
    const [prescriptionDetails, setPrescriptionDetails] = useState({});
    const [selectedPrescriptionOption, setSelectedPrescriptionOption] = useState("");
    const [homeDeliveryTitle, setHomeDeliveryTitle] = useState("");
    const [isUploadPrescriptionsOpen, setUploadPrescriptionsOpen] = useState(false);
    const [isPreviousPrescriptionsOpen, setPreviousPrescriptionsOpen] = useState(false);
    const [isPrescriptionDetailsUpdatedFromRedux, setPrescriptionDetailsUpdatedFromRedux] = useState(false);
    const [patientDetail, setPatientDetail] = useState({});
    const [patientDetailError, setPatientDetailError] = useState({isError: false, errorMessage:""});
    const selectFiles = useRef({});

    useEffect(() => {
        if( validate.isEmpty(prescriptionOptions)) {
            getCheckoutPrescriptionOptions();
        }
        if(selectedPrescriptionOption == "UploadPrescription" && validate.isNotEmpty(prescriptionDetails.healthRecordId) && !isPrescriptionDetailsUpdatedFromRedux) {
            savePrescriptionDetails();
        }
    }, [prescriptionDetails]);

    const getCheckoutPrescriptionOptions = () => {
        setPrescriptionLoading(true);
        prescriptionService.getCheckoutPrescriptionOptions().then((response) => {
            if (validate.isNotEmpty(response) && response.statusCode == "SUCCESS" && validate.isNotEmpty(response.dataObject)){
                let homeDeliveryPrescTitle = "Home Delivery Available";
                if (response.dataObject.isHomeDeliveryAllowed && response.dataObject.isStorePickupAvailable) {
                    homeDeliveryPrescTitle = "For Home Delivery & Store Pickup";
                } else if (!response.dataObject.isHomeDeliveryAllowed && response.dataObject.isStorePickupAvailable) {
                    homeDeliveryPrescTitle = "For Store Pickup Only";
                } else if (response.dataObject.isCommunityDelivery) {
                    homeDeliveryPrescTitle = "Community Delivery";
                }
                setPatientDetail(response.dataObject.patientDetails);
                setHomeDeliveryTitle(homeDeliveryPrescTitle);
                setPrescriptionOptions({ isStorePickupAvailable: response.dataObject.isStorePickupAvailable, isHomeDeliveryAllowed: response.dataObject.isHomeDeliveryAllowed, isPrescriptionUploadRequired: response.dataObject.isPrescriptionUploadRequired, isHealthRecordsAvailable: response.dataObject.isHealthRecordsAvailable, isCommunityDelivery: response.dataObject.isCommunityDelivery});
                setHealthRecords(response.dataObject.healthRecords);
                setTotalHealthRecords(response.dataObject.totalHealthRecords);
                getPrescriptionOptionDetailsFromRedux();
            } else if(response.statusCode === "FAILURE") {
                setAlertInfo({ message: response.message, type: "" });
            }
            setPrescriptionLoading(false);
        }).catch(function(error) {
            setPrescriptionLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }

    const getPrescriptionOptionDetailsFromRedux = () => {
        const uploadedPrescriptionDetails = checkoutAction.getPrescriptionOptionDetails();
        if(validate.isNotEmpty(uploadedPrescriptionDetails) && validate.isNotEmpty(uploadedPrescriptionDetails.filesToUpload) && validate.isNotEmpty(uploadedPrescriptionDetails.uploadedFilesInfo)) {
            setPrescriptionDetailsUpdatedFromRedux(true);
            toggleUploadPrescriptions(true);
            setFilesToUpload(uploadedPrescriptionDetails.filesToUpload);
            setUploadedFilesInfo(uploadedPrescriptionDetails.uploadedFilesInfo);
            setNoOfFilesUploaded(uploadedPrescriptionDetails.uploadedFilesInfo.length);
            setSelectedPrescriptionOption("UploadPrescription");
            setPrescriptionDetails({healthRecordId: uploadedPrescriptionDetails.healthRecordId, isePrescriptionRequired: false, isShowPrescriptionAtStore: false});
        }
    }

    const resetPrescriptionOptionDetailsInRedux = () => {
        setPrescriptionDetailsUpdatedFromRedux(false);
        checkoutAction.resetPrescriptionOptionDetails();
    }

    const selectUploadPrescriptionOption = (event) => {
        if(validate.isEmpty(uploadedFilesInfo) || uploadedFilesInfo.length < 1) {
            event.preventDefault();
            setSelectedPrescriptionOption("");
            selectFiles.current.click();
        } else {
            setSelectedPrescriptionOption("UploadPrescription");
            toggleUploadPrescriptions(true);
        }
    }

    const toggleUploadPrescriptions = (isNeedToOpen) => {
        if(!isNeedToOpen) {
            setSelectedPrescriptionOption("");
        }
        setUploadPrescriptionsOpen(isNeedToOpen);
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
            setFilesUploadInProgress(true);
            toggleUploadPrescriptions(true);
            setFilesToUpload([...filesToUpload, ...files]);
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
                setFilesUploadInProgress(false);
                if (validate.isNotEmpty(response) && response.statusCode == "SUCCESS" && validate.isNotEmpty(response.response) && validate.isNotEmpty(response.imageServerDetails)) {
                    setSelectedPrescriptionOption("UploadPrescription");
                    setImageServerDetail(response.imageServerDetails);
                    setUploadedFilesInfo([...uploadedFilesInfo, ...response.response]);
                    resetPrescriptionOptionDetailsInRedux();
                } else if(response.statusCode === "FAILURE" || response.statusCode === "404") {
                    setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
                }
            }).catch(function(error) {
                setFilesUploadInProgress(false);
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
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

        const noOfUploadedFiles = (filesToUpload.length + noOfNewFiles);
        if(noOfUploadedFiles > 4) {
            const remainNoOfFiles = (4 - filesToUpload.length);
            const errorMsg = (remainNoOfFiles < 1) ? "No" : remainNoOfFiles.toString();
            setAlertInfo({ message: (errorMsg +" more prescription(s) allowed to add"), type: "" });
            return false;
        }
        return true;
    }

    const removeUploadedFileInfo = (fileIndex, fileName) => {
        if(uploadedFilesInfo[fileIndex].originalImageName == fileName) {
            let uploadedFiles = [...uploadedFilesInfo];
            uploadedFiles.splice(fileIndex, 1);

            let files = [...filesToUpload];
            const fileToUploadIndex = files.findIndex((eachFile) => {
                let eachFileName = "";
                if(eachFile.name){
                    eachFileName = getFileName(eachFile.name);
                } else {
                    eachFileName = getFileNameByType(eachFile.type);
                }
                return (eachFileName == fileName);
            });
            files.splice(fileToUploadIndex, 1);
            
            setUploadedFilesInfo(uploadedFiles);
            setFilesToUpload(files);
            resetPrescriptionOptionDetailsInRedux();
            if(validate.isEmpty(uploadedFiles)){
                toggleUploadPrescriptions(false);
            }
        }
    }

    const createHealthRecord = async () => {
        if(isFilesUploadInProgress) {
            setAlertInfo({ message: "Please wait as file uploading is in process", type: "" });
            return false;
        }
        if(validate.isEmpty(uploadedFilesInfo)) {
            setAlertInfo({ message: "Upload prescription to proceed", type: "" });
            return false;
        }
        if(!isPrescriptionDetailsUpdatedFromRedux) {
            setProceedLoading(true);
            let patientName = null,patientAge =  null,doctorName = null;
            if(validate.isNotEmpty(patientDetail)) {
                patientName = validate.isNotEmpty(patientDetail.patientName) ? patientDetail.patientName : null;
                patientAge = validate.isNotEmpty(patientDetail.patientAge) ? patientDetail.patientAge : null;
                doctorName = validate.isNotEmpty(patientDetail.doctorName) ? patientDetail.doctorName : null;
            }
            prescriptionService.createHealthRecord({ imageList : JSON.stringify(uploadedFilesInfo),patientName : patientName, patientAge : patientAge, doctorName : doctorName}).then((response) => {
                setProceedLoading(false);
                if(validate.isNotEmpty(response) && response.statusCode == "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
                    setPrescriptionDetails({ healthRecordId: response.dataObject.healthRecordId, isePrescriptionRequired: false, isShowPrescriptionAtStore: false});
                } else if(response.statusCode === "FAILURE") {
                    setAlertInfo({ message: response.message, type: "" });
                }
            }).catch(function(error) {
                setProceedLoading(false);
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
            });
        } else {
            savePrescriptionDetails();
        }
    }

    const selectPreviousPrescriptionOption = () => {
        setSelectedPrescriptionOption("PreviousPrescription");
        resetPrescriptionOptionDetailsInRedux();
        togglePreviousPrescriptions(true);
    }

    const togglePreviousPrescriptions = (isNeedToOpen) => {
        if(!isNeedToOpen) {
            setSelectedPrescriptionOption("");
        }
        setPreviousPrescriptionsOpen(isNeedToOpen);
    }

    const setSelectedPreviousPrescription = (healthRecordId) => {
        setPrescriptionDetails({healthRecordId: healthRecordId, isePrescriptionRequired: false, isShowPrescriptionAtStore: false});
    }

    const selectEPrescriptionOption = () => {
        setSelectedPrescriptionOption("EPrescription");
        setPrescriptionDetails({healthRecordId: null, isePrescriptionRequired: true, isShowPrescriptionAtStore: false});
        resetPrescriptionOptionDetailsInRedux();
    }

    const selectShowPrescriptionAtStoreOption = () => {
        setSelectedPrescriptionOption("ShowPrescriptionAtStore");
        setPrescriptionDetails({healthRecordId: null, isePrescriptionRequired: false, isShowPrescriptionAtStore: true});
        resetPrescriptionOptionDetailsInRedux();
    }

    const goBackAction = () => {
        props.history.push('/shoppingCart');
    }

    const proceedPrescriptionDetails = async () => {
        if(selectedPrescriptionOption == "UploadPrescription") {
            createHealthRecord();
        } else {
            savePrescriptionDetails();
        }
    }

    const savePrescriptionDetails = () => {
        if(validate.isNotEmpty(patientDetailError) && patientDetailError.isError) {
            setAlertInfo({ message: patientDetailError.errorMessage, type: "" });
            return false;
        }
        if(validate.isNotEmpty(patientDetail) && validate.isNotEmpty(patientDetail.patientAge) && validate.isEmpty(patientDetail.patientName)) {
            setAlertInfo({ message: "Patient Name is required with Patient Age", type: "" });
            return false;
        }
        let patientName = null;
        let patientAge = null;
        let doctorName = null;
        if(validate.isNotEmpty(patientDetail)) {
            patientName = validate.isNotEmpty(patientDetail.patientName) ? patientDetail.patientName : null;
            patientAge = validate.isNotEmpty(patientDetail.patientAge) ? patientDetail.patientAge : null;
            doctorName = validate.isNotEmpty(patientDetail.doctorName) ? patientDetail.doctorName : null;
        }
        if(validatePrescriptionDetails() ) {
            setProceedLoading(true);
            prescriptionService.savePrescriptionDetails(prescriptionDetails.healthRecordId, prescriptionDetails.isePrescriptionRequired, prescriptionDetails.isShowPrescriptionAtStore, patientName, patientAge, doctorName).then((response) => {
                setProceedLoading(false);
                if(response && response.statusCode == "SUCCESS"){
                    if(selectedPrescriptionOption == "UploadPrescription") {
                        checkoutAction.setPrescriptionOptionDetails(selectedPrescriptionOption, filesToUpload, uploadedFilesInfo, prescriptionDetails.healthRecordId);
                    } else if(selectedPrescriptionOption == "ShowPrescriptionAtStore") {
                        checkoutAction.setPrescriptionOptionDetails(selectedPrescriptionOption, [], [], "");
                    }
                    setAlertInfo({ message: response.message, type: "" });
                    props.history.push('/delivery');
                } else if(response.statusCode === "FAILURE") {
                    setAlertInfo({ message: response.message, type: "" });
                }
            }).catch(function(error) {
                setProceedLoading(false);
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
            });
        }
    }

    const validatePrescriptionDetails = () => {
        if(validate.isEmpty(selectedPrescriptionOption)) {
            setAlertInfo({ message: "Select one prescription option to proceed", type: "" });
            return false;
        }
        if(selectedPrescriptionOption == "PreviousPrescription") {
            if(validate.isEmpty(prescriptionDetails.healthRecordId)) {
                setAlertInfo({ message: "Select one Health Record to proceed", type: "" });
                return false;
            }
            if(prescriptionDetails.isePrescriptionRequired || prescriptionDetails.isShowPrescriptionAtStore) {
                setAlertInfo({ message: "Invalid prescription option", type: "" });
                return false;
            }
        }
        if(selectedPrescriptionOption == "EPrescription" || selectedPrescriptionOption == "ShowPrescriptionAtStore") {
            if(validate.isNotEmpty(prescriptionDetails.healthRecordId) || (selectedPrescriptionOption == "EPrescription" ? !prescriptionDetails.isePrescriptionRequired : prescriptionDetails.isePrescriptionRequired) || (selectedPrescriptionOption == "ShowPrescriptionAtStore" ? !prescriptionDetails.isShowPrescriptionAtStore : prescriptionDetails.isShowPrescriptionAtStore)) {
                setAlertInfo({ message: "Invalid prescription option", type: "" });
                return false;
            }
        }
        return true;
    }

    const setPatientInfo = (patientField, patientValue) => {
        setPatientDetail({...patientDetail, [patientField]: patientValue});
    }

    return (
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <main role="main" className="container-fluid container-lg">
                <div className="row">
                    {isPrescriptionLoading && <section className="body-height d-flex col-12 px-0"><PrescriptionGhostImage/></section>}
                    {!isPrescriptionLoading &&  
                        <div className="col p-0">
                            <section className="body-height">
                                {!isUploadPrescriptionsOpen && !isPreviousPrescriptionsOpen &&
                                    <React.Fragment>
                                        <div className="header">
                                            <p>Prescription Details</p>
                                        </div>
                                        {homeDeliveryTitle =="Store Pickup Available" ? <h6 className="title p-3 my-n2">Store Pickup Available</h6> : ""}
                                        <div className="prescription-details">
                                            <div className="home-delivery">
                                                {homeDeliveryTitle !="Store Pickup Available" ? <h6 className="title">{homeDeliveryTitle}</h6> : ""}
                                                {prescriptionOptions.isPrescriptionUploadRequired &&
                                                    <React.Fragment>
                                                        <div className="nav-card">
                                                            <svg className="nav-card-img" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 18 18">
                                                                <g transform="translate(0 -0.085)">
                                                                    <rect fill="none" width="18" height="18" transform="translate(0 0.085)"/>
                                                                    <g transform="translate(0.75 0.085)">
                                                                        <path fill="#404040" d="M1408.97,746.283v-3.406a.393.393,0,0,0-.109-.258l-3.819-4.01a.382.382,0,0,0-.274-.116h-6.055a2.017,2.017,0,0,0-2.011,2.029v11.45a2,2,0,0,0,2.011,2.014h4.779a5.16,5.16,0,1,0,5.477-7.7Zm-3.827-6.475,2.562,2.7h-1.661a.907.907,0,0,1-.9-.9Zm-2,9.566h-3.406a.375.375,0,0,0,0,.751h3.162a5.055,5.055,0,0,0-.142,1.208,5,5,0,0,0,.368,1.906h-4.408v0a1.257,1.257,0,0,1-1.261-1.264v-11.45a1.268,1.268,0,0,1,1.261-1.28h5.68v2.36a1.654,1.654,0,0,0,1.65,1.655h2.175v2.93c-.112,0-.2-.015-.3-.015a5.238,5.238,0,0,0-3.422,1.291h-4.764a.375.375,0,0,0,0,.751h4.066A6,6,0,0,0,1403.14,749.375Zm4.776,6.37a4.408,4.408,0,1,1,4.408-4.408A4.413,4.413,0,0,1,1407.916,755.745Z" transform="translate(-1396.703 -738.492)"/>
                                                                        <path fill="#404040" d="M1400.024,747.11h3.744a.37.37,0,1,0,0-.74h-3.744a.37.37,0,0,0,0,.74Z" transform="translate(-1396.983 -739.275)"/>
                                                                        <path fill="#e71c37" d="M1409.1,749.673a.368.368,0,0,0-.54,0L1406.393,752a.37.37,0,0,0,.019.521.378.378,0,0,0,.529-.019l1.531-1.638V754.9a.37.37,0,0,0,.74,0v-4.037l1.519,1.638a.371.371,0,0,0,.269.118.377.377,0,0,0,.252-.1.369.369,0,0,0,.019-.521Z" transform="translate(-1397.604 -739.48)"/>
                                                                        <path fill="#08ce73" d="M1400.375,740.755h-.5v.558h.153v2.135h-.153v.558h.709V742.79h.589l.523.657-.614.646h-.359v.558h.6l.726-.763.609.763h.667v-.558h-.4l-.49-.616.53-.558h.36v-.558h-.6l-.641.675-.329-.411a.941.941,0,0,0,.464-.861c0-.62-.439-1.007-1.147-1.007Zm1.289,1.007a.419.419,0,0,1-.379.455l-.034,0a1.775,1.775,0,0,1-.18.011h-.487v-.918h.487C1401.664,741.31,1401.664,741.65,1401.664,741.761Z" transform="translate(-1397.009 -738.748)"/>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <h6>Upload <br/>Prescription</h6>
                                                            <input type="file" id="fileUpload" name="fileUpload" accept="image/*,application/pdf" ref={selectFiles} multiple onChange={event => uploadFiles(event)} hidden />
                                                            <button type="button" className="btn btn-brand-gradient rounded-pill px-4" onClick={event => selectUploadPrescriptionOption(event)}>Upload</button>
                                                        </div>
                                                    </React.Fragment>
                                                }
                                                {prescriptionOptions.isHealthRecordsAvailable &&
                                                    <React.Fragment>
                                                        <div className="nav-card">
                                                            <svg className="nav-card-img" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48">
                                                                <g transform="translate(-1396.499 -530.045)">
                                                                    <rect fill="none" width="48" height="48" transform="translate(1396.499 530.045)"/>
                                                                    <g transform="translate(1400.232 530.205)">
                                                                        <path fill="#08ce73" d="M1412.585,536.061a.2.2,0,0,1-.2-.2v-3.31a.2.2,0,0,0-.2-.2h-2.509a.2.2,0,0,0-.2.2v3.31a.2.2,0,0,1-.2.2h-3.51a.2.2,0,0,0-.2.2v2.407a.2.2,0,0,0,.2.2h3.51a.2.2,0,0,1,.2.2v3.612a.2.2,0,0,0,.2.2h2.509a.2.2,0,0,0,.2-.2v-3.612a.2.2,0,0,1,.2-.2h3.31a.2.2,0,0,0,.2-.2v-2.407a.2.2,0,0,0-.2-.2Z" transform="translate(-1387.814 -526.933)"/>
                                                                        <g transform="translate(7.052 16.689)">
                                                                            <path fill="#e71c37" d="M1401.736,538.55h7.021a.7.7,0,0,0,0-1.406h-7.021a.7.7,0,0,0,0,1.406Z" transform="translate(-1401.033 -537.144)"/>
                                                                            <path fill="#e71c37" d="M1401.735,540.158h10.635a.7.7,0,1,0,0-1.4h-10.635a.7.7,0,1,0,0,1.4Z" transform="translate(-1401.034 -534.858)"/>
                                                                            <path fill="#e71c37" d="M1412.371,540.365h-10.635a.7.7,0,0,0,0,1.4h10.633a.7.7,0,1,0,0-1.4Z" transform="translate(-1401.033 -532.573)"/>
                                                                        </g>
                                                                        <path fill="#404040" d="M1400.491,556.662v-18.4h4.3a2.674,2.674,0,0,0,2.619-2.722l0-.029v-3.972h17.929a3.276,3.276,0,0,1,3.211,3.334l0,.027v16.482l.069-.07h1.315V536.222a3.262,3.262,0,0,1,3.261,3.266v11.82h1.384V539.587a4.838,4.838,0,0,0-1.332-3.38,4.549,4.549,0,0,0-3.263-1.413,4.716,4.716,0,0,0-4.642-4.684h-18.617a.684.684,0,0,0-.464.184l-6.9,6.454a.747.747,0,0,0-.251.527v19.385Zm5.531-24.265v3.111a1.266,1.266,0,0,1-1.2,1.323h-3.469Z" transform="translate(-1396.53 -530.111)"/>
                                                                        <path fill="#404040" d="M1431.278,565.141l-27.3-.031c-.122,0-2.392-.082-3.3-1.164s-1.081-3.607-1.086-3.713l-1.544-14.74a.852.852,0,0,1,.207-.656.822.822,0,0,1,.62-.281l26.425-.007,4.815-5.073a.834.834,0,0,1,.6-.259h6.565a.827.827,0,0,1,.608.271.848.848,0,0,1,.218.639l-1.368,19.141a7.162,7.162,0,0,1-1.594,4.045A5.559,5.559,0,0,1,1431.278,565.141ZM1399.8,546.25l1.449,13.84a6.494,6.494,0,0,0,.686,2.748,3.926,3.926,0,0,0,2.071.578l27.238.031a3.87,3.87,0,0,0,2.655-1.258,5.45,5.45,0,0,0,1.183-3.046l1.3-18.233h-5.321l-4.815,5.073a.828.828,0,0,1-.6.259Z" transform="translate(-1398.042 -517.928)"/>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <h6>Select from <br/>Previous prescriptions</h6>
                                                            <button type="button" className="btn btn-brand-gradient px-4 rounded-pill" data-toggle="modal" data-target="#select-previous-prescription" onClick={() => selectPreviousPrescriptionOption()}>Select</button>
                                                        </div>
                                                    </React.Fragment>
                                                }
                                                {
                                                    <React.Fragment>
                                                        <div className="nav-card">
                                                            <svg className="nav-card-img mt-4" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 36 36">
                                                                <g id="newprescription_color_icon_36px" transform="translate(0 0.171)">
                                                                    <rect id="Rectangle_2212" data-name="Rectangle 2212" width="36" height="36" transform="translate(0 -0.172)" fill="none" />
                                                                    <g id="Group_5696" data-name="Group 5696" transform="translate(0 -0.171)">
                                                                        <path id="Path_1091" data-name="Path 1091" d="M1415.234,596.154h-1.185v1.325h.365v5.068h-.365v1.325h1.684v-2.884h1.4l1.244,1.559-1.459,1.535h-.851v1.325h1.416l1.724-1.814,1.449,1.814h1.582v-1.325h-.95l-1.164-1.46,1.26-1.325h.854v-1.325h-1.42l-1.524,1.6-.78-.978a2.237,2.237,0,0,0,1.1-2.045c0-1.472-1.044-2.391-2.725-2.391Zm3.061,2.391a.994.994,0,0,1-.9,1.081.788.788,0,0,1-.081,0,4.213,4.213,0,0,1-.427.025h-1.156v-2.18h1.156C1418.295,597.473,1418.295,598.28,1418.295,598.545Z" transform="translate(-1390.376 -576.723)" fill="#e71c37" />
                                                                        <path id="Path_1092" data-name="Path 1092" d="M1401.5,592.067h1.8v1.806a.579.579,0,0,0,.579.579h0a.579.579,0,0,0,.578-.579v-1.806h1.8a.579.579,0,0,0,0-1.157h-1.8v-1.8a.579.579,0,0,0-.578-.579h0a.58.58,0,0,0-.58.577h0v1.8h-1.8a.579.579,0,1,0,0,1.157Z" transform="translate(-1397.241 -580.633)" fill="#08ce73" />
                                                                        <g id="Group_5695" data-name="Group 5695">
                                                                            <path id="Path_3773" data-name="Path 3773" d="M1434.061,600.761l-6.84-2.953V585.084a1.8,1.8,0,0,0-1.8-1.8h-22.8a1.8,1.8,0,0,0-1.8,1.8v.6h-.6a1.8,1.8,0,0,0-1.8,1.8v30a1.8,1.8,0,0,0,1.8,1.8h22.8a1.8,1.8,0,0,0,1.287-.548l.492.349a1.068,1.068,0,0,0,1.242,0l5.8-4.132a6.108,6.108,0,0,0,2.574-4.965v-8.671A.6.6,0,0,0,1434.061,600.761Zm-31.439-16.278h22.8a.6.6,0,0,1,.6.6v12.205l-.36-.15a.609.609,0,0,0-.475,0l-.36.15v-3.805l-.009-.039a.474.474,0,0,0-.029-.15l-.009-.042-.012-.02a.629.629,0,0,0-.118-.177l-7.2-7.2a.634.634,0,0,0-.177-.12l-.02-.012-.041-.009a.633.633,0,0,0-.15-.029.16.16,0,0,1-.039,0h-15v-.6A.6.6,0,0,1,1402.622,584.484Zm20.152,8.4h-4.548a.6.6,0,0,1-.6-.6v-4.552Zm.252,25.2,0,0h-22.8a.6.6,0,0,1-.6-.6h0v-30a.6.6,0,0,1,.6-.6h16.2v5.4a1.8,1.8,0,0,0,1.8,1.8h5.4v3.724l-7.1,3.151a.166.166,0,0,0-.1.153l.077,9.453a5.2,5.2,0,0,0,1.92,3.918l4.875,3.528A.582.582,0,0,1,1423.026,618.086Zm10.2-8.1a4.909,4.909,0,0,1-2.07,3.987l-5.731,4.078-5.728-4.078a4.307,4.307,0,0,1-2.07-3.642V601.7l1.086-.468h.012l6.7-2.9,7.8,3.369Z" transform="translate(-1398.422 -583.284)" fill="#404040" />
                                                                            <path id="Path_3774" data-name="Path 3774" d="M1401.4,596.778h4.842a.62.62,0,0,0,0-1.24H1401.4a.62.62,0,1,0,0,1.24Z" transform="translate(-1397.31 -577.145)" fill="#404040" />
                                                                            <path id="Path_3775" data-name="Path 3775" d="M1412,600.626H1401.4a.62.62,0,1,0,0,1.24H1412a.62.62,0,0,0,0-1.24Z" transform="translate(-1397.31 -574.596)" fill="#404040" />
                                                                            <path id="Path_3776" data-name="Path 3776" d="M1412,598.082H1401.4a.62.62,0,1,0,0,1.24H1412a.62.62,0,0,0,0-1.24Z" transform="translate(-1397.31 -575.871)" fill="#404040" />
                                                                            <path id="Path_3777" data-name="Path 3777" d="M1412,603.17H1401.4a.62.62,0,1,0,0,1.24H1412a.62.62,0,0,0,0-1.24Z" transform="translate(-1397.31 -573.227)" fill="#404040" />
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <h6 className="mb-3">I need a new prescription <br/>Arrange a call back</h6>
                                                            <p className="mb-1 small">A doctor will contact you during 8 AM - 11 PM to provide consultation.</p>
                                                            <p className="mb-0">Fee <strike>Rs 299</strike> <strong className="text-brand ml-1">FREE...!</strong></p>
                                                            <button type="button" className="btn btn-brand-gradient rounded-pill mt-4 px-4" onClick={() => selectEPrescriptionOption()}>
                                                                {selectedPrescriptionOption == "EPrescription" ? "" : "Select"}
                                                                <svg className={selectedPrescriptionOption == "EPrescription" ? "" : "d-none"} xmlns="http://www.w3.org/2000/svg" width="24.999" height="25" viewBox="0 0 24.999 25">
                                                                    <g data-name="Group 5804" transform="translate(-1774.496 -36.167)">
                                                                        <path id="Subtraction_22" data-name="Subtraction 22" d="M12,24A12,12,0,0,1,3.515,3.515a12,12,0,0,1,16.97,16.971A11.921,11.921,0,0,1,12,24ZM5.281,11.821a.6.6,0,0,0-.446.188.693.693,0,0,0-.256.51.633.633,0,0,0,.183.5l3.974,3.97a.751.751,0,0,0,.422.211l.105.03.158-.028a.615.615,0,0,0,.368-.232L19.813,7.04a.791.791,0,0,0-.019-1.081.746.746,0,0,0-.523-.209.723.723,0,0,0-.531.227L9.281,15.4,5.822,12.086A.669.669,0,0,0,5.281,11.821Z" transform="translate(1774.996 36.667)" fill="#fff" stroke="rgba(0,0,0,0)" strokeMiterlimit="10" strokeWidth="1"/>
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </React.Fragment>
                                                }
                                            </div>
                                            {prescriptionOptions.isStorePickupAvailable &&
                                                <React.Fragment>
                                                    <div className="store-pickup">
                                                        {homeDeliveryTitle !="Store Pickup Available" ? <h6 className="title">For Store Pickup Only</h6> : ""}
                                                        <div className="nav-card">
                                                            <svg className="nav-card-img" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 18.389 18.425">
                                                                <g transform="translate(0.394 0.303)">
                                                                    <rect fill="none" width="18" height="18" transform="translate(-0.394 -0.196)"/>
                                                                    <g transform="translate(0.734 0.197)">
                                                                        <path fill="#e71c37" d="M1397.213,772.474h-.341v.382h.105v1.46h-.105v.381h.485v-.83h.4l.358.449-.42.442h-.245v.381h.408l.5-.522.418.522h.456v-.381h-.274l-.335-.421.363-.381h.246v-.382h-.409l-.439.462-.225-.282a.645.645,0,0,0,.317-.589c0-.424-.3-.688-.785-.688Zm.881.688a.286.286,0,0,1-.258.312h-.023a1.189,1.189,0,0,1-.123.008h-.333v-.628h.333C1398.094,772.854,1398.094,773.086,1398.094,773.162Z" transform="translate(-1394.979 -770.93)"/>
                                                                        <path fill="#08ce73" d="M1408.108,774.752h1.073v1.074a.344.344,0,0,0,.344.344h0a.344.344,0,0,0,.345-.344v-1.074h1.073a.344.344,0,1,0,0-.689h-1.073v-1.074a.345.345,0,0,0-.345-.344h0a.345.345,0,0,0-.345.343h0v1.072h-1.073a.345.345,0,1,0,0,.689Z" transform="translate(-1396.312 -770.951)"/>
                                                                        <path stroke="rgba(0,0,0,0)" strokeMiterlimit="10" d="M10.4,17.425a.272.272,0,0,1-.294-.286q-.008-.371,0-.741a.265.265,0,0,1,.294-.282c.652,0,1.3,0,1.955,0h1.9c.229,0,.328.1.328.33s0,.454,0,.683a.274.274,0,0,1-.295.3H10.4ZM14,15.747A.2.2,0,0,1,14,15.574c.163-.333.33-.664.506-.991a3.607,3.607,0,0,0,.434-1.683c.008-.615,0-1.231-.01-1.846,0-.119-.02-.236-.033-.354-.019-.172-.072-.218-.245-.218-.15,0-.3,0-.451,0-.082,0-.117.025-.113.115.019.416.033.833.047,1.249a1.566,1.566,0,0,1,0,.217.289.289,0,0,1-.238.249.22.22,0,0,1-.26-.234c-.015-.439-.023-.879-.045-1.319-.036-.732-.082-1.464-.121-2.2-.019-.359-.028-.717-.048-1.077a1.977,1.977,0,0,0-.057-.374.481.481,0,0,0-.4-.394.531.531,0,0,0-.589.269,1.042,1.042,0,0,0-.13.386c-.032.292-.042.587-.054.88-.026.681-.044,1.361-.073,2.041a.647.647,0,0,1-.254.47c-.37.317-.749.627-1.095.968a1.782,1.782,0,0,0-.528,1.167,3.835,3.835,0,0,0,.164,1.36c.128.427.28.847.427,1.268.071.2.037.256-.18.256-.286,0-.291,0-.383-.279-.149-.453-.306-.9-.434-1.362a3.216,3.216,0,0,1-.106-1.464,4.113,4.113,0,0,1,.265-.752c.036-.09.042-.131-.064-.167a.5.5,0,0,1-.312-.273c-.124-.283-.249-.566-.355-.856a.191.191,0,0,0-.214-.151q-4.017,0-8.032,0a.917.917,0,0,1-.9-.512A1.12,1.12,0,0,1,0,9.486q-.01-4.235,0-8.47a.947.947,0,0,1,.8-1A.886.886,0,0,1,.964,0h7.43q3.7,0,7.395,0a.964.964,0,0,1,.973.967q-.006,4.28,0,8.561a.941.941,0,0,1-.946.953c-.1,0-.208,0-.312,0s-.125.031-.121.128c.025.562.059,1.123.059,1.685a5.788,5.788,0,0,1-.162,1.6,5.557,5.557,0,0,1-.331.827c-.152.321-.328.63-.5.942a.379.379,0,0,1-.3.125A.193.193,0,0,1,14,15.747ZM9.824,10.6c.048.156.091.315.148.468a.4.4,0,0,0,.459.242.393.393,0,0,0,.292-.39,1.782,1.782,0,0,0-.073-.345.1.1,0,0,0-.12-.093c-.1,0-.208,0-.311,0s-.2,0-.3,0H9.9C9.822,10.48,9.8,10.521,9.824,10.6ZM.608,1.023q0,4.2,0,8.4c0,.046,0,.093,0,.138a.339.339,0,0,0,.308.317c.123.01.247.013.371.012,1.176,0,2.352-.009,3.528-.01.979,0,1.959.007,2.939.007,1.192,0,2.384,0,3.575-.006.2,0,.259-.058.27-.256.014-.29.025-.58.043-.87.033-.515.057-1.03.109-1.543a1.116,1.116,0,0,1,.971-1,1,1,0,0,1,1.025.513,2.1,2.1,0,0,1,.188.831c.021.385.035.771.057,1.154s.049.769.075,1.165a.3.3,0,0,0,.059.011c.575,0,1.15,0,1.724,0a.263.263,0,0,0,.25-.172.624.624,0,0,0,.047-.254q0-4.212,0-8.425c0-.042,0-.083,0-.125a.346.346,0,0,0-.326-.3c-.072,0-.147,0-.22,0H1.032C.744.606.608.739.608,1.023ZM2.179,9.045a.316.316,0,1,1,0-.632H8.452a.316.316,0,1,1,0,.632Zm0-1.521a.316.316,0,1,1,0-.632H4.615a.316.316,0,0,1,0,.632Zm0-1.52a.317.317,0,1,1,0-.633H6.412a.317.317,0,0,1,0,.633Z" transform="translate(0)"/>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <h6>I'll show <br/>Prescription at store</h6>
                                                            <button type="button" className="btn btn-brand-gradient px-4 rounded-pill" onClick={() => selectShowPrescriptionAtStoreOption()}>
                                                                {selectedPrescriptionOption == "ShowPrescriptionAtStore" ? "" : "Select"}
                                                                <svg className={selectedPrescriptionOption == "ShowPrescriptionAtStore" ? "" : "d-none"} xmlns="http://www.w3.org/2000/svg" width="24.999" height="25" viewBox="0 0 24.999 25">
                                                                    <g data-name="Group 5804" transform="translate(-1774.496 -36.167)">
                                                                        <path id="Subtraction_22" data-name="Subtraction 22" d="M12,24A12,12,0,0,1,3.515,3.515a12,12,0,0,1,16.97,16.971A11.921,11.921,0,0,1,12,24ZM5.281,11.821a.6.6,0,0,0-.446.188.693.693,0,0,0-.256.51.633.633,0,0,0,.183.5l3.974,3.97a.751.751,0,0,0,.422.211l.105.03.158-.028a.615.615,0,0,0,.368-.232L19.813,7.04a.791.791,0,0,0-.019-1.081.746.746,0,0,0-.523-.209.723.723,0,0,0-.531.227L9.281,15.4,5.822,12.086A.669.669,0,0,0,5.281,11.821Z" transform="translate(1774.996 36.667)" fill="#fff" stroke="rgba(0,0,0,0)" strokeMiterlimit="10" strokeWidth="1"/>
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            }
                                        </div>
                                    </React.Fragment>
                                }
                                {isUploadPrescriptionsOpen && <UploadPrescriptions imageServerUrl={imageServerDetail.imageServerUrl} uploadedFilesInfo={uploadedFilesInfo} filesToUpload={filesToUpload} filesUploadProgress={filesUploadProgress} isFilesUploadInProgress={isFilesUploadInProgress} toggleUploadPrescriptions={toggleUploadPrescriptions} removeUploadedFileInfo={removeUploadedFileInfo} uploadFiles={uploadFiles}/>}
                                {isPreviousPrescriptionsOpen && <PreviousPrescriptions togglePreviousPrescriptions={togglePreviousPrescriptions} healthRecords={healthRecords} totalHealthRecords={totalHealthRecords} setSelectedPreviousPrescription={setSelectedPreviousPrescription}/>}
                            </section>
                            <CheckoutInfoNote precriptionPageFlag="true"/>
                        </div>
                    }
                </div>
            </main>
            {!isPrescriptionLoading &&
                <footer className="footer fixed-bottom mt-auto py-2">
                    <div className="container-lg container-fluid px-sm-3 px-0">
                        <div className="row align-items-center no-gutters">
                            <div className="col-12 text-right">
                                {!isUploadPrescriptionsOpen && !isPreviousPrescriptionsOpen && 
                                    <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" disabled={isProceedLoading} onClick={() => goBackAction()}>Back</button>}
                                    <button type="button" className="btn btn-brand-gradient px-5 ml-3 rounded-pill custom-btn-lg" disabled={isProceedLoading} onClick={() => proceedPrescriptionDetails()}>
                                        {isProceedLoading ? "" : "Proceed"}
                                        {isProceedLoading &&
                                            <React.Fragment>
                                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                                <span className="sr-only"></span>
                                            </React.Fragment>
                                        }
                                    </button>
                            </div>
                        </div>
                    </div>
                </footer>
            }
        </React.Fragment>
    );
}

export default Prescription;
