import React, { useEffect, useRef, useState } from 'react';
import Validate from '../../helpers/Validate';
import UploadPrescriptionImg from '../../images/common/delete-prescription-cssbg.svg';
import ImageProcessService, { IMAGE_TYPE_PRESCRIPTION } from '../../services/ImageProcessService';
import PrescriptionService from '../../services/PrescriptionService';
import Alert, { ALERT_TYPE_ERROR } from '../Common/Alert';
import UploadPrescriptions from '../Checkout/Prescription/UploadPrescriptions';
import { getFileName, getFileNameByType } from '../../helpers/CommonUtil';
import PreviousPrescriptions from '../Checkout/Prescription/PreviousPrescriptions';
import HomepageUploadGhostImage from './HomepageUploadGhostImage';
import UserInfoAction from '../../../redux/action/UserInfoAction';
import ImageLightBox from '../Common/ImageLightBox/ImageLightBox';
import Thankyou from './ThankYou';
import SampleImage from '../../images/common/sample-prescription-image.png';
import { getSelectedLocality } from '../../../redux/action/LocalityAction';

const UploadPrescription = (props) => {

    const validate = Validate();
    const userInfoAction = UserInfoAction();
    const imageProcessService = ImageProcessService();
    const prescriptionService = PrescriptionService();
    const selectedLocality = getSelectedLocality();

    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [uploadedFilesInfo, setUploadedFilesInfo] = useState([]);
    const [selectedPrescriptionOption, setSelectedPrescriptionOption] = useState("");
    const [isUploadPrescriptionsOpen, setUploadPrescriptionsOpen] = useState(false);
    const [isFilesUploadInProgress, setFilesUploadInProgress] = useState(false);
    const [filesToUpload, setFilesToUpload] = useState([]);
    const [noOfFilesUploaded, setNoOfFilesUploaded] = useState(0);
    const [filesUploadProgress, setFilesUploadProgress] = useState({});
    const [isPreviousPrescriptionsOpen, setPreviousPrescriptionsOpen] = useState(false);
    const [prvsHealthRecordId, setPrvsHealthRecordId] = useState({});
    const [isProceedLoading, setProceedLoading] = useState(false);
    const [healthRecords, setHealthRecords] = useState([]);
    const [totalHealthRecords, setTotalHealthRecords] = useState(0);
    const [isPrescriptionLoading, setPrescriptionLoading] = useState(false);
    const [imageServerDetail, setImageServerDetail] = useState({});
    const [orderSuccessMessage, setOrderSuccessMessage] = useState("");
    const [isOrderAlreadyPlaced, setIsOrderAlreadyPlaced] = useState(false);
    const [isOpenThankYouPage, setOpenThankYouPage] = useState(false);
    const [mobileNumber, setMobileNumber] = useState("");
    const [isLightBoxOpen, setLightBoxOpen] = useState(false);

    const isPrescriptionUploadEnabled = validate.isNotEmpty(selectedLocality?.saleAllowed) && "G" != selectedLocality.saleAllowed && validate.isNotEmpty(selectedLocality.hubId);

    const selectFiles = useRef({});
    let imagesForZoom = [''];

    useEffect(() => {
        if(!isPrescriptionUploadEnabled) {
            props.history.replace("/");
            return;
        }
        let userInfo = props.location.userInfo;
        //comming from authentication page
        if (userInfo) {
            setMobileNumber(userInfo.mobileNumber);
            if (userInfo.userType == "anonymous") {
                userInfoAction.resetUserInfo();
                userInfoAction.resetUserContactDetails();
                getImageServerDetails();
            } else if (userInfo && userInfo.userType == "registered") {
                getMyHealthRecordsAndImageServerDetails();
            }
        }
        //incase of directly hitting the url or logged in user flow
        else {
            getMyHealthRecordsAndImageServerDetails();
        }
    }, []);

    const getMyHealthRecordsAndImageServerDetails = () => {
        setPrescriptionLoading(true);
        prescriptionService.getMyHealthRecords(0, "", ["PRE"], "DESC",10).then((response) => {
            if (validate.isNotEmpty(response) && response.statusCode == "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
                let resData = response.dataObject;
                setHealthRecords(resData.healthRecords);
                setTotalHealthRecords(resData.totalRecords);
                setImageServerDetail(resData.imageServerDetail);
            } else if (response.statusCode === "FAILURE") {
                setAlertInfo({ message: response.message, type: "" });
            }
            setPrescriptionLoading(false);
        }).catch(function (error) {
            setPrescriptionLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }

    const getImageServerDetails = () => {
        imageProcessService.getImageServerDetail().then(response => {
            if (validate.isNotEmpty(response) && response.statusCode == "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
                setImageServerDetail(response.dataObject.imageServerDetail);
            } else {
                setAlertInfo({ message: "Unable to get image server details", type: "" });
            }
        })
    }
    const toggleUploadPrescriptions = (isNeedToOpen) => {
        if (!isNeedToOpen) {
            setSelectedPrescriptionOption("");
        }
        setUploadPrescriptionsOpen(isNeedToOpen);
    }
    const validatePrescriptionDetails = () => {
        if (validate.isEmpty(selectedPrescriptionOption)) {
            setAlertInfo({ message: "Select one prescription option to proceed", type: "" });
            return false;
        }
        if (selectedPrescriptionOption == "PreviousPrescription") {
            if (validate.isEmpty(prvsHealthRecordId)) {
                setAlertInfo({ message: "Select one Health Record to proceed", type: "" });
                return false;
            }
        }
        return true;
    }

    const selectUploadPrescriptionOption = (event) => {
        if (validate.isEmpty(uploadedFilesInfo) || uploadedFilesInfo.length < 1) {
            event.preventDefault();
            setSelectedPrescriptionOption("");
            selectFiles.current.click();
        } else {
            setSelectedPrescriptionOption("UploadPrescription");
            toggleUploadPrescriptions(true);
        }
    }
    const validateFilesUpload = (noOfNewFiles, maxSizeOfNewFile) => {
        if (noOfNewFiles > 4) {
            setAlertInfo({ message: "Maximum 4 prescriptions can be selected at a time", type: "" });
            return false;
        }
        if (maxSizeOfNewFile > 4000000) {
            setAlertInfo({ message: "Size of a prescription file should be up to 4 MB", type: "" });
            return false;
        }

        const totalNoOfFiles = (noOfFilesUploaded + noOfNewFiles);
        if (totalNoOfFiles > 10) {
            setAlertInfo({ message: "You have exceeded maximum limit of prescription upload", type: "" });
            return false;
        }

        const noOfUploadedFiles = (filesToUpload.length + noOfNewFiles);
        if (noOfUploadedFiles > 4) {
            const remainNoOfFiles = (4 - filesToUpload.length);
            const errorMsg = (remainNoOfFiles < 1) ? "No" : remainNoOfFiles.toString();
            setAlertInfo({ message: (errorMsg + " more prescription(s) allowed to add"), type: "" });
            return false;
        }
        return true;
    }

    const selectPreviousPrescriptionOption = () => {
        setSelectedPrescriptionOption("PreviousPrescription");
        togglePreviousPrescriptions(true);
    }
    const togglePreviousPrescriptions = (isNeedToOpen) => {
        if (!isNeedToOpen) {
            setSelectedPrescriptionOption("");
        }
        setPreviousPrescriptionsOpen(isNeedToOpen);
    }
    const setSelectedPreviousPrescription = (healthRecordId) => {
        setPrvsHealthRecordId(healthRecordId);
    }
    const uploadFiles = (event) => {
        if (validate.isNotEmpty(event.target.files) && event.target.files.length > 0) {
            let files = event.target.files;
            let noOfFiles = files.length;
            let maxSizeOfFile = 0;
            let totalFilesSize = 0;
            for (let index = 0; index < noOfFiles; index++) {
                totalFilesSize += files[index].size;
                if (maxSizeOfFile < files[index].size) {
                    maxSizeOfFile = files[index].size;
                }
            }
            const isFilesUploadValid = validateFilesUpload(noOfFiles, maxSizeOfFile);
            if (!isFilesUploadValid) {
                return false;
            }
            setFilesUploadInProgress(true);
            toggleUploadPrescriptions(true);
            setNoOfFilesUploaded((noOfFilesUploaded + noOfFiles));
            setFilesUploadProgress({ totalFilesSize: totalFilesSize, noOfFiles: noOfFiles, percentCompleted: 0 });
            const config = {
                onUploadProgress: (progressEvent) => {
                    let index = 0;
                    let totalFiles = noOfFiles;
                    let eachTotalPercent = 100 / totalFiles;
                    let eachComlpetedPercent = 0;
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    index = Math.floor(percentCompleted / eachTotalPercent);
                    eachComlpetedPercent = Math.round((percentCompleted - (eachTotalPercent * index)) * (totalFiles));
                    setFilesUploadProgress({ totalFilesSize: totalFilesSize, noOfFiles: noOfFiles, percentCompleted: percentCompleted });
                }
            }

            imageProcessService.uploadFilesToImageServer(files, IMAGE_TYPE_PRESCRIPTION, config).then((response) => {
                let responseData = response.data ? response.data : response;
                setFilesUploadInProgress(false);
                if (validate.isNotEmpty(responseData) && responseData.statusCode == "SUCCESS" && validate.isNotEmpty(responseData.response)) {
                    setSelectedPrescriptionOption("UploadPrescription");
                    setFilesToUpload([...filesToUpload, ...files]);
                    setUploadedFilesInfo([...uploadedFilesInfo, ...responseData.response]);
                } else if (responseData.statusCode === "FAILURE" || responseData.statusCode === "404") {
                    setAlertInfo({ message: responseData.message, type: ALERT_TYPE_ERROR });
                }
            }).catch(function (error) {
                console.log('error',error)
                setFilesUploadInProgress(false);
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
            });
        }
    }
    const removeUploadedFileInfo = (fileIndex, fileName) => {
        if (uploadedFilesInfo[fileIndex].originalImageName == fileName) {
            let uploadedFiles = [...uploadedFilesInfo];
            uploadedFiles.splice(fileIndex, 1);

            let files = [...filesToUpload];
            const fileToUploadIndex = files.findIndex((eachFile) => {
                let eachFileName = "";
                if (eachFile.name) {
                    eachFileName = getFileName(eachFile.name);
                } else {
                    eachFileName = getFileNameByType(eachFile.type);
                }
                return (eachFileName == fileName);
            });
            files.splice(fileToUploadIndex, 1);
            setUploadedFilesInfo(uploadedFiles);
            setFilesToUpload(files);
            if(validate.isEmpty(uploadedFiles)){
                toggleUploadPrescriptions(false);
            }
        }
    }
    const proceedPrescriptionDetails = async () => {
        if (validatePrescriptionDetails()) {
            if (selectedPrescriptionOption == "UploadPrescription") {
                prescriptionUpload();
            } else {
                prvsHealthRecordId && createPrescriptionOrder(prvsHealthRecordId)
            }
        }
    }
    const prescriptionUpload = () => {
        if (isFilesUploadInProgress) {
            setAlertInfo({ message: "Please wait as file uploading is in process", type: "" });
            return false;
        }
        if (validate.isEmpty(uploadedFilesInfo)) {
            setAlertInfo({ message: "Upload prescription to proceed", type: "" });
            return false;
        }
        setProceedLoading(true);
        let imageDetails = { "healthRecordImages": JSON.stringify(uploadedFilesInfo) };
        prescriptionService.uploadPrescription(imageDetails).then((response) => {
            if (validate.isNotEmpty(response) && response.statusCode == "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
                setProceedLoading(false);
                setOrderSuccessMessage(response.dataObject.presOrderId);
                setOpenThankYouPage(true);
            } else if (response.statusCode === "FAILURE") {
                setProceedLoading(false);
                setAlertInfo({ message: response.message, type: "" });
            }
        }).catch(function (error) {
            setProceedLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }
    const createPrescriptionOrder = (recordId) => {
        prescriptionService.createOrderFromHealthRecord(recordId).then(response => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                setProceedLoading(false);
                if (response.message == "ALREADY_PLACED") {
                    setOrderSuccessMessage(response.dataObject.prescriptionOrderId);
                    setIsOrderAlreadyPlaced(true);
                } else {
                    setOrderSuccessMessage(response.dataObject.prescriptionOrderId);
                }
                setOpenThankYouPage(true);
            } else if ("FAILURE" == response.statusCode) {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    if (isOpenThankYouPage) {
        return (
            <Thankyou message={orderSuccessMessage} isAlreadyPlaced={isOrderAlreadyPlaced} history={props.history} />
        )
    }
    return (
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo} />
            <section>
                {!isUploadPrescriptionsOpen && !isPreviousPrescriptionsOpen && <React.Fragment>
                    {validate.isNotEmpty(mobileNumber) && <div className="header">
                        <p>Verified Mobile Number <h5 className="mb-0 d-inline-block ml-1">{mobileNumber}</h5></p>
                    </div>}
                    <div className="prescription-details homepage mt-0">
                        <div className="home-delivery">
                            <h6 className="title">To upload prescription choose your option</h6>
                            {isPrescriptionLoading &&<HomepageUploadGhostImage />}
                            {imageServerDetail.accessToken && <div className="nav-card w-75">
                                <svg className="nav-card-img" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 18 18">
                                    <g transform="translate(0 -0.085)">
                                        <rect fill="none" width="18" height="18" transform="translate(0 0.085)" />
                                        <g transform="translate(0.75 0.085)">
                                            <path fill="#404040" d="M1408.97,746.283v-3.406a.393.393,0,0,0-.109-.258l-3.819-4.01a.382.382,0,0,0-.274-.116h-6.055a2.017,2.017,0,0,0-2.011,2.029v11.45a2,2,0,0,0,2.011,2.014h4.779a5.16,5.16,0,1,0,5.477-7.7Zm-3.827-6.475,2.562,2.7h-1.661a.907.907,0,0,1-.9-.9Zm-2,9.566h-3.406a.375.375,0,0,0,0,.751h3.162a5.055,5.055,0,0,0-.142,1.208,5,5,0,0,0,.368,1.906h-4.408v0a1.257,1.257,0,0,1-1.261-1.264v-11.45a1.268,1.268,0,0,1,1.261-1.28h5.68v2.36a1.654,1.654,0,0,0,1.65,1.655h2.175v2.93c-.112,0-.2-.015-.3-.015a5.238,5.238,0,0,0-3.422,1.291h-4.764a.375.375,0,0,0,0,.751h4.066A6,6,0,0,0,1403.14,749.375Zm4.776,6.37a4.408,4.408,0,1,1,4.408-4.408A4.413,4.413,0,0,1,1407.916,755.745Z" transform="translate(-1396.703 -738.492)" />
                                            <path fill="#404040" d="M1400.024,747.11h3.744a.37.37,0,1,0,0-.74h-3.744a.37.37,0,0,0,0,.74Z" transform="translate(-1396.983 -739.275)" />
                                            <path fill="#e71c37" d="M1409.1,749.673a.368.368,0,0,0-.54,0L1406.393,752a.37.37,0,0,0,.019.521.378.378,0,0,0,.529-.019l1.531-1.638V754.9a.37.37,0,0,0,.74,0v-4.037l1.519,1.638a.371.371,0,0,0,.269.118.377.377,0,0,0,.252-.1.369.369,0,0,0,.019-.521Z" transform="translate(-1397.604 -739.48)" />
                                            <path fill="#08ce73" d="M1400.375,740.755h-.5v.558h.153v2.135h-.153v.558h.709V742.79h.589l.523.657-.614.646h-.359v.558h.6l.726-.763.609.763h.667v-.558h-.4l-.49-.616.53-.558h.36v-.558h-.6l-.641.675-.329-.411a.941.941,0,0,0,.464-.861c0-.62-.439-1.007-1.147-1.007Zm1.289,1.007a.419.419,0,0,1-.379.455l-.034,0a1.775,1.775,0,0,1-.18.011h-.487v-.918h.487C1401.664,741.31,1401.664,741.65,1401.664,741.761Z" transform="translate(-1397.009 -738.748)" />
                                        </g>
                                    </g>
                                </svg>
                                <h6>Upload <br />Prescription</h6>
                                <input type="file" id="fileUpload" name="fileUpload" accept="image/*,application/pdf" ref={selectFiles} multiple onChange={event => uploadFiles(event)} hidden />
                                <button type="button" className="btn btn-brand-gradient rounded-pill px-4" onClick={event => selectUploadPrescriptionOption(event)}>Upload</button>
                            </div>}
                            {validate.isNotEmpty(healthRecords) && <div className="nav-card w-75">
                                <svg className="nav-card-img" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48">
                                    <g transform="translate(-1396.499 -530.045)">
                                        <rect fill="none" width="48" height="48" transform="translate(1396.499 530.045)" />
                                        <g transform="translate(1400.232 530.205)">
                                            <path fill="#08ce73" d="M1412.585,536.061a.2.2,0,0,1-.2-.2v-3.31a.2.2,0,0,0-.2-.2h-2.509a.2.2,0,0,0-.2.2v3.31a.2.2,0,0,1-.2.2h-3.51a.2.2,0,0,0-.2.2v2.407a.2.2,0,0,0,.2.2h3.51a.2.2,0,0,1,.2.2v3.612a.2.2,0,0,0,.2.2h2.509a.2.2,0,0,0,.2-.2v-3.612a.2.2,0,0,1,.2-.2h3.31a.2.2,0,0,0,.2-.2v-2.407a.2.2,0,0,0-.2-.2Z" transform="translate(-1387.814 -526.933)" />
                                            <g transform="translate(7.052 16.689)">
                                                <path fill="#e71c37" d="M1401.736,538.55h7.021a.7.7,0,0,0,0-1.406h-7.021a.7.7,0,0,0,0,1.406Z" transform="translate(-1401.033 -537.144)" />
                                                <path fill="#e71c37" d="M1401.735,540.158h10.635a.7.7,0,1,0,0-1.4h-10.635a.7.7,0,1,0,0,1.4Z" transform="translate(-1401.034 -534.858)" />
                                                <path fill="#e71c37" d="M1412.371,540.365h-10.635a.7.7,0,0,0,0,1.4h10.633a.7.7,0,1,0,0-1.4Z" transform="translate(-1401.033 -532.573)" />
                                            </g>
                                            <path fill="#404040" d="M1400.491,556.662v-18.4h4.3a2.674,2.674,0,0,0,2.619-2.722l0-.029v-3.972h17.929a3.276,3.276,0,0,1,3.211,3.334l0,.027v16.482l.069-.07h1.315V536.222a3.262,3.262,0,0,1,3.261,3.266v11.82h1.384V539.587a4.838,4.838,0,0,0-1.332-3.38,4.549,4.549,0,0,0-3.263-1.413,4.716,4.716,0,0,0-4.642-4.684h-18.617a.684.684,0,0,0-.464.184l-6.9,6.454a.747.747,0,0,0-.251.527v19.385Zm5.531-24.265v3.111a1.266,1.266,0,0,1-1.2,1.323h-3.469Z" transform="translate(-1396.53 -530.111)" />
                                            <path fill="#404040" d="M1431.278,565.141l-27.3-.031c-.122,0-2.392-.082-3.3-1.164s-1.081-3.607-1.086-3.713l-1.544-14.74a.852.852,0,0,1,.207-.656.822.822,0,0,1,.62-.281l26.425-.007,4.815-5.073a.834.834,0,0,1,.6-.259h6.565a.827.827,0,0,1,.608.271.848.848,0,0,1,.218.639l-1.368,19.141a7.162,7.162,0,0,1-1.594,4.045A5.559,5.559,0,0,1,1431.278,565.141ZM1399.8,546.25l1.449,13.84a6.494,6.494,0,0,0,.686,2.748,3.926,3.926,0,0,0,2.071.578l27.238.031a3.87,3.87,0,0,0,2.655-1.258,5.45,5.45,0,0,0,1.183-3.046l1.3-18.233h-5.321l-4.815,5.073a.828.828,0,0,1-.6.259Z" transform="translate(-1398.042 -517.928)" />
                                        </g>
                                    </g>
                                </svg>
                                <h6>Select from <br />Previous prescriptions</h6>
                                <button type="button" className="btn btn-brand-gradient px-4 rounded-pill" data-toggle="modal" data-target="#select-previous-prescription" onClick={() => selectPreviousPrescriptionOption()}>Select</button>
                            </div>}
                        </div>
                        <div className="store-pickup">
                            <div className="terms-div">
                                <img src={UploadPrescriptionImg} alt="Upload Prescription Image" title="" />
                                <div className="additional-notes">
                                    <h6>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                            <path d="M9.563.563a9,9,0,1,0,9,9A9,9,0,0,0,9.563.563Zm0,3.992A1.524,1.524,0,1,1,8.038,6.079,1.524,1.524,0,0,1,9.563,4.554Zm2.032,9.218a.436.436,0,0,1-.435.435H7.966a.436.436,0,0,1-.435-.435V12.9a.436.436,0,0,1,.435-.435H8.4V10.143H7.966a.436.436,0,0,1-.435-.435V8.837A.436.436,0,0,1,7.966,8.4h2.323a.436.436,0,0,1,.435.435v3.629h.435a.436.436,0,0,1,.435.435Z" transform="translate(-0.563 -0.563)"></path>
                                        </svg>
                                        Note: Prescription should contain -
                                    </h6>
                                    <ol>
                                        <li>Doctor Name and Signature</li>
                                        <li>Patient Name</li>
                                        <li>Date of Prescription</li>
                                        <li>Don't crop out any part of the image</li>
                                        <li>Avoid blurred image</li>
                                        <li>Include Details of doctor and patient + clinic visit date</li>
                                        <li>Medicines will be dispensed as per prescription</li>
                                    </ol>
                                    <React.Fragment>
                                        <button onClick={() => setLightBoxOpen(true)} title="View sample prescription" class="btn shadow-none sample-prescription">View sample prescription</button>
                                        {isLightBoxOpen &&
                                            <ImageLightBox style={{ "z-index": 1060 }}
                                                prescImages={imagesForZoom}
                                                imageIndex={0}
                                                mainSrc={SampleImage}
                                                hideDownload={true}
                                                onCloseRequest={() => setLightBoxOpen(false)}
                                            />}
                                    </React.Fragment>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>}
                {isUploadPrescriptionsOpen && <UploadPrescriptions imageServerUrl={imageServerDetail.imageServerUrl} uploadedFilesInfo={uploadedFilesInfo} filesToUpload={filesToUpload} filesUploadProgress={filesUploadProgress} isFilesUploadInProgress={isFilesUploadInProgress} toggleUploadPrescriptions={toggleUploadPrescriptions} removeUploadedFileInfo={removeUploadedFileInfo} uploadFiles={uploadFiles} />}
                {isPreviousPrescriptionsOpen && <PreviousPrescriptions togglePreviousPrescriptions={togglePreviousPrescriptions} healthRecords={healthRecords} totalHealthRecords={totalHealthRecords} setSelectedPreviousPrescription={setSelectedPreviousPrescription} />}
                {(isUploadPrescriptionsOpen || isPreviousPrescriptionsOpen) && 
                    <div className="container-fluid py-2 border-top">
                        <div className="row align-items-center no-gutters">
                            <div className="col-12 text-right">
                                <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" disabled={isProceedLoading} onClick={() => isUploadPrescriptionsOpen ? toggleUploadPrescriptions(false) : togglePreviousPrescriptions(false)}>Back</button>
                                <button type="button" className="btn btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg" disabled={isProceedLoading || isFilesUploadInProgress} onClick={() => proceedPrescriptionDetails()}>
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
                    </div>}
             </section>
        </React.Fragment>
    )
}
export default UploadPrescription;