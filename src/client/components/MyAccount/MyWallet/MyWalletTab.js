
import React, {useState, useEffect, useRef} from 'react';
import {Progress} from 'reactstrap';
import DiscountIcon from '../../../images/common/discount.svg';
import walletBG from '../../../images/common/wallet-bg-full.png';
import walletBG2x from '../../../images/common/wallet-bg-full2x.png';
import WalletIcon from '../../../images/common/medpluswallet-icn.png';
import Wallet2xIcon from '../../../images/common/medpluswallet-icn2x.png';
import WaletBannerLogo from '../../../images/common/separators/separator-wallet-logo.svg';

import {AddBalance} from '../../Wallet/ReloadWalletSection';
import MyAccountService from '../../../services/MyAccountService';
import WalletService from '../../../services/WalletService';
import HiddenForm from '../../Checkout/Payments/HiddenForm';
import Alert, {ALERT_TYPE_SUCCESS, ALERT_TYPE_ERROR} from '../../Common/Alert';
import WalletKYCForm from './WalletKYCForm';
import Validate from '../../../helpers/Validate';
import BasicValidation from '../../../helpers/BasicValidation';

import ImageProcessService from '../../../services/ImageProcessService';
import DefaultBanner from "../../../images/image-load.gif";
import UserInfoAction from '../../../../redux/action/UserInfoAction';

const  myAccountService = MyAccountService();
const imageProcessService = ImageProcessService();
const walletService = WalletService();
const validate = Validate();

export const NON_EMPTY = "nonEmpty";
export const EMAIL = "email";
const MyWalletTab = (props)=>{
    const [walletData, setWalletData] = useState(null);
    const [reloadAmt, setReloadAmt] = useState(0);
    const [baseReloadAmt, setBaseReloadAmt] = useState(0);
    const [paymentMode, setPaymentMode] = useState("CC");
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState(null);
    const [isProcessLoading, setProcessLoading] = useState(false);
    const [openPanModal, setOpenPanModal] = useState(false);

    const [panNo, setPanNo] = useState('');
    const [errorMsg, setErrorMsg] = useState({});
    const [uploadedFilesInfo, setUploadedFilesInfo] = useState({});
    const [filesUploadProgress, setFilesUploadProgress] = useState({});
    const [imageThumbnailPath, setImageThumbnailPath] = useState({});
    const [isProceedLoading, setProceedLoading] = useState(false);
    const [isUploadInProgress,setUploadInProgress] = useState(false);
    const addFiles = useRef({});
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    var userInfo = UserInfoAction().getUserInfo();
    var fullName = userInfo.firstName + (validate.isNotEmpty(userInfo.lastName) && (userInfo.firstName != userInfo.lastName) ? (" " + userInfo.lastName) : "");
    
    useEffect(()=>{
        getWalletInfo();
        if(props.location && props.location.errorData && props.location.errorData.errorMsg){
            setAlertInfo({ message: "We are processing your Request, Please wait..!", type: ""});
        }
    },[]);

    useEffect(()=>{
        if(Validate().isEmpty(Validate().name(fullName))){
            setShowUpdateProfile(false);
        } else {
            setShowUpdateProfile(true);
        }
    },[userInfo])

    const addAmount = (amt)=>{
        setReloadAmt(parseInt(reloadAmt+parseInt(amt)));
    }

    const resetAmount = () => {
        setReloadAmt(parseInt(baseReloadAmt));
    }

    const selectPaymentMode = (e) => {
        setPaymentMode(e.target.value);
    }

    const closeAlertMessage = () => {
        setAlertInfo({});
    }

    const rechargeWallet = () =>{
        setProcessLoading(true);
        if(paymentMode === undefined || paymentMode == null){
            var elm = document.getElementById("selectPayment");
            elm.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
            setAlertInfo({ message: "Please Select Payment Mode", type: ""});
            setProcessLoading(false);
            return;
        }
        if(reloadAmt === undefined || reloadAmt===null){
            setAlertInfo({ message: "Amount Can't be empty", type: ""});
            setProcessLoading(false);
            return;
        }
        const obj = {
            "walletAmount" : reloadAmt,
            "paymentMode" : paymentMode,
            "requestFrom" : "WALLET_DASHBOARD"
        }
        setLoader(true);
        WalletService().rechargeWallet(obj).then(response => {
            setProcessLoading(false);
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS"){
                handlePaymentRedirect(response.dataObject);
            }else{
                setAlertInfo({ message: response.message ? response.message:"System experiencing some problem, Please try after some time.", type: ""});
            }
            setLoader(false);
        },(err)=>{
            setLoader(false);
            setProcessLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time.", type: ""});
        })
    }

    const handlePaymentRedirect = (data) =>{
        const parameters = data.parameters;
        var formData = {};
        var inputArray = [];

        var formValues = {
            "formId" : "paymentForm",
            "formAction" : data.processTransactionURL+"?orderid="+parameters.ORDER_ID,
            "formMethod" : "post",
            "formStyle":{display:'none'}
        }

        var checkSumHash = {"name": "CHECKSUMHASH", "value":parameters.CHECKSUMHASH};
        inputArray.push(checkSumHash);

        var channelId = {"name": "CHANNEL_ID", "value":parameters.CHANNEL_ID};
        inputArray.push(channelId);

        var custId = {"name": "CUST_ID" , "value":parameters.CUST_ID};
        inputArray.push(custId);
        if(!BasicValidation().checkValidations([NON_EMPTY, EMAIL], parameters.EMAIL).error){
            var email = {"name": "EMAIL", "value":parameters.EMAIL};
            inputArray.push(email);
        }

        var industryTypeId = {"name": "INDUSTRY_TYPE_ID", "value":parameters.INDUSTRY_TYPE_ID};
        inputArray.push(industryTypeId);

        var mid= {"name": "MID", "value":parameters.MID};
        inputArray.push(mid);

        var mobileNo = {"name": "MOBILE_NO", "value":parameters.MOBILE_NO};
        inputArray.push(mobileNo);

        var orderId = {"name": "ORDER_ID","value":parameters.ORDER_ID};
        inputArray.push(orderId);

        var requestType = {"name": "REQUEST_TYPE", "value":parameters.REQUEST_TYPE};
        inputArray.push(requestType);

        var txnAmount = {"name": "TXN_AMOUNT", "value":parameters.TXN_AMOUNT};
        inputArray.push(txnAmount);

        var website = {"name": "WEBSITE", "value":parameters.WEBSITE};
        inputArray.push(website);

        var callbackUrl = {"name": "CALLBACK_URL", "value":parameters.CALLBACK_URL};
        inputArray.push(callbackUrl);

        var authMode = {"name": "AUTH_MODE", "value":parameters.AUTH_MODE};
        inputArray.push(authMode);

        var paymentModeOnly = {"name": "PAYMENT_MODE_ONLY" , "value":parameters.PAYMENT_MODE_ONLY};
        inputArray.push(paymentModeOnly);

        var paymentTypeId = {"name": "PAYMENT_TYPE_ID", "value":parameters.PAYMENT_TYPE_ID};
        inputArray.push(paymentTypeId);

        formData = {...formValues, inputArray : inputArray};
        setFormData(formData);
    }

    if(formData){
        return (
            <HiddenForm formData = {formData} />
        )
    }
    
    const getWalletInfo = () => {
        let flexiAmount;
        let mWalletAmount;
        let minimumAmountToReload;
        setLoader(true);
        myAccountService.getMyWalletInfo().then((response)=>{
            setLoader(false);
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
                setWalletData(response.dataObject);
                flexiAmount = response.dataObject.flexiAmount ? parseFloat(response.dataObject.flexiAmount).toFixed(2) : 0.00;
                mWalletAmount = response.dataObject.mWalletAmount ? parseFloat(response.dataObject.mWalletAmount).toFixed(2) : 0.00;
                if(mWalletAmount <= 0.00 && flexiAmount <= 0.00){
                    minimumAmountToReload = 3000;
                }else{
                    minimumAmountToReload = 1000;
                }
                setReloadAmt(minimumAmountToReload);
                setBaseReloadAmt(minimumAmountToReload);
                if(validate.isNotEmpty(response.dataObject.kycInfo) && response.dataObject.kycInfo.kycdone){
                    props.setShowWalletSummary(true);
                }
            }else if(response.statusCode == "FAILURE"){
                setAlertInfo({message:response.message, type: ALERT_TYPE_ERROR});
                setWalletData(response.dataObject);
            }
        },(err)=>{
            setLoader(false);
            console.log(err);
        })
    } 

    const togglePanModal = (flag) =>{
        setOpenPanModal(flag);
    }

    /* const handleModalSuccess = ()=>{
        setAlertInfo({ message: "Successfully Uploaded", type: ALERT_TYPE_SUCCESS });
        history.push('/myWallet');
    } */
    
        const handleOnChange = event => {
        let feildName = event.target.name;
        let feildValue = event.target.value;
        if(feildName=="pan_no"){
            setPanNo(feildValue);
            let validateMsg = validate.validatePAN(feildValue);
            if(validateMsg){
                setErrorMsg(errorMsg => ({...errorMsg, [feildName]:validateMsg}));
                return;
            }else{
                setErrorMsg({});
            }
        }
    }

    const selectFile = (event) => {
        event.preventDefault();
        addFiles.current.click();
    }

    const uploadFiles = (event) => {
        if(validate.isNotEmpty(event.target.files) && event.target.files.length > 0) {
            let files = event.target.files;
            let noOfFiles = files.length;
            if(noOfFiles==1){
                if (files[0].size > 4000000){
                    setAlertInfo({ message: "Size of file should be up to 4 MB", type: ALERT_TYPE_ERROR});
                    return false;
                }
            }else {
                return false;
            }
            setUploadInProgress(true);
            setFilesUploadProgress({totalFilesSize: files[0].size, noOfFiles: noOfFiles, percentCompleted : 0});
            const config = {
                onUploadProgress: (progressEvent) => {
                    let index = 0;
                    let totalFiles = noOfFiles;
                    let eachTotalPercent =  100/totalFiles;
                    let eachComlpetedPercent = 0 ;
                    let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                    index = Math.floor(percentCompleted/eachTotalPercent);
                    eachComlpetedPercent = Math.round((percentCompleted - (eachTotalPercent * index)) * (totalFiles));
                    setFilesUploadProgress({totalFilesSize: files[0].size, noOfFiles: noOfFiles, percentCompleted : percentCompleted});
                }
            }
            imageProcessService.uploadFilesToImageServer(files, "K", config).then((response) => {
                setUploadInProgress(false);
                if(validate.isNotEmpty(response) && response.statusCode == "SUCCESS" && validate.isNotEmpty(response.response)) {
                    console.log('response.response[0]:',response.response[0])
                    if(validate.isNotEmpty(response.response[0])){
                        setUploadedFilesInfo(response.response[0]);
                        setImageThumbnailPath(response.imageServerDetails.imageServerUrl+"/"+response.response[0].thumbnailPath);
                    }else{
                        setAlertInfo({ message: "Try Again!", type: ALERT_TYPE_ERROR});
                    }
                } else if(response.statusCode === "FAILURE" || response.statusCode === "404") {
                    setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR});
                }
            }).catch(function(error) {
                setUploadInProgress(false);
                setFilesUploadProgress({});
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
            });
        }
    }

    const uploadPan = () =>{
        if(validate.isEmpty(panNo)){
            setAlertInfo({ message: "Please Enter PAN Number", type: ALERT_TYPE_ERROR });
            return false;
        }
        if(validate.isNotEmpty(errorMsg)){
            return false;
        }
        if(validate.isEmpty(uploadedFilesInfo)){
            setAlertInfo({ message: "Please Upload PAN Card Image", type: ALERT_TYPE_ERROR });
            return false;
        }
        setProceedLoading(true)
        let filesInfoList = new Array();
        filesInfoList.push(uploadedFilesInfo);
        walletService.submitPanDetails(filesInfoList, panNo).then((response)=>{
            if(validate.isNotEmpty(response) && response.statusCode == "SUCCESS"){
                setProceedLoading(false);
                let temp_walletData = {...walletData};
                temp_walletData['kycInfo']['panNo'] = panNo;
                temp_walletData['kycInfo']['status'] = 'COMPLETED';
                setWalletData(temp_walletData);
                setAlertInfo({ message: validate.isNotEmpty(response.message)?response.message:"", type: ALERT_TYPE_SUCCESS });
            }else{
                setAlertInfo({ message: validate.isNotEmpty(response.message)?response.message : "System experiencing some problem, Please try after some time", type: ALERT_TYPE_SUCCESS });
            }
        },(err)=>{
            setProceedLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
        })
    }

    const removeUploadedFile = () =>{
        setImageThumbnailPath({});
        setUploadedFilesInfo({});
    }

    const handleImageLoadError = () => {
        setImageThumbnailPath(DefaultBanner);
        setTimeout(() => {
            setImageThumbnailPath(imageThumbnailPath);
        }, 5000);
    }

    if(showUpdateProfile){
        return(
            <React.Fragment>
                <section className="bg-info-50 d-flex p-3">
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g transform="translate(-762 -1106)">
                        <path d="M12.562.563a12,12,0,1,0,12,12A12,12,0,0,0,12.562.563Zm0,5.323A2.032,2.032,0,1,1,10.53,7.917,2.032,2.032,0,0,1,12.562,5.885Zm2.71,12.29a.581.581,0,0,1-.581.581H10.433a.581.581,0,0,1-.581-.581V17.014a.581.581,0,0,1,.581-.581h.581v-3.1h-.581a.581.581,0,0,1-.581-.581V11.595a.581.581,0,0,1,.581-.581h3.1a.581.581,0,0,1,.581.581v4.839h.581a.581.581,0,0,1,.581.581Z" transform="translate(761.437 1105.438)"></path></g></svg>
                <p className="mb-0"><a href="/myProfile" rel="noopener" title="My Profile" className="text-dark font-weight-bold"><u>Click here</u></a> to update your profile and continue to your wallet KYC</p>
                </section>
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
            <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration={5000}/>
            {!walletData && loader &&
            <GhostImage/>
            }
            {validate.isNotEmpty(walletData) && (validate.isEmpty(walletData.kycInfo) || !walletData.kycInfo.kycdone) &&
                <WalletKYCForm kycMessage={walletData.kycMessage} 
                kycStatus={validate.isEmpty(walletData.kycInfo)?undefined:walletData.kycInfo.status}/>
            }
            {validate.isNotEmpty(walletData) && validate.isNotEmpty(walletData.kycInfo) && walletData.kycInfo.kycdone && 
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                <div className="body mywallet rounded">
                {/* <img alt="wallet-bg" srcSet={`${walletBG} 1x, ${walletBG2x} 2x`} className="img-fluid border-bottom" /> */}
                    <section className="wallet-banner">
                        <div className="container-fluid">
                            <div className="row">
                            <div className="banner-img-padding pb-2 col">
                                <img className="mt-5" src={WaletBannerLogo} alt="MedPlus Wallet" height="32" />
                                <h6 className="strong my-3">MedPlus Wallet is a prepaid wallet where you can load money &amp; use it for shopping at any MedPlus Store</h6>
                                <p>With MedPlus Wallet you can SAVE UPTO 20% On Every Purchase</p>
                            </div> 
                            <p className="tnc">*Terms &amp; Conditions Apply</p>
                            </div>
                        </div>
                    </section>
                    <div className="container-fluid">
                        <div className="row py-3">
                            <div className="col">
                                <div className="card">
                                    <div className="wallet-container">
                                        <div className="wallet-details border-0">
                                            <img srcSet={`${WalletIcon} 1x, ${Wallet2xIcon} 2x`} alt="MedPlus Wallet" title="MedPlus Wallet" height="48"/>
                                            <div className="w-100">
                                                <p className="font-weight-bold d-block mb-0 text-right">
                                                    Total Wallet Balance
                                                </p>
                                                <p className="d-block mb-0 text-right text-success position-relative">
                                                    <strong className="wallet-text">&#x20B9;{parseFloat((walletData.mWalletAmount+walletData.flexiAmount)).toFixed(2)}</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="wallet-container">
                                        <div className="wallet-details border-bottom-0">
                                            <div className="w-100">
                                            <p>
                                                <span>
                                                RegularCash:
                                                </span>
                                                <span>
                                                <strong className="rupee">&#x20B9;</strong> {parseFloat(walletData.mWalletAmount).toFixed(2)}
                                                </span>
                                            </p>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                {/* <UploadPANModal modal={openPanModal} toggle={togglePanModal}/> */}
                                {/* validate.isEmpty(walletData.custKYCInfo.panNo) && walletData.custKYCInfo.status == 'COMPLETED' &&
                                <div className="card mt-3">
                                    <div className="wallet-container">
                                        <div className="wallet-details flex-column border-bottom-0">
                                            <button onClick={()=>setOpenPanModal(!openPanModal)} value="Upload PAN">Upload PAN</button>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className="card mt-3">
                                    <div className="wallet-container">
                                        <div className="wallet-details flex-column border-bottom-0">
                                            <h6 className="title">Offers on MedPlus Wallet</h6>
                                            <div className="w-100 position-relative">
                                            <img alt="discount" className="offer-img position-absolute" src={DiscountIcon} height="16px"/>
                                            <p className="text-secondary small ml-4 mb-3">
                                                20% off on prescription medicines (Min. order value Rs 1000)
                                            </p>
                                            <img alt="discount" className="offer-img position-absolute" src={DiscountIcon} height="16px"/>
                                            <p className="text-secondary small ml-4 mb-0">
                                                5% off on OTC &amp; general products (Min. order value Rs 200)
                                            </p>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            {((validate.isEmpty(walletData.kycInfo.panNo) && walletData.kycInfo.status == 'COMPLETED') || (walletData.walletReloadAllowed && walletData.walletReloadAllowed=='Y')) &&
                            <React.Fragment>
                                <div className="col-8">
                                    {walletData.walletReloadAllowed && walletData.walletReloadAllowed=='Y' &&
                                    <div className="add-money-to-wallet">
                                        <AddBalance amount={reloadAmt} addAmount={addAmount} 
                                        handleResetClick={resetAmount} minReloadAmt={baseReloadAmt}
                                        selectPaymentMode={selectPaymentMode}/>
                                        <button type="submit" className="btn btn-brand-gradient px-5 mt-3 rounded-pill custom-btn-lg"  value="Add Money" disabled={isProcessLoading} onClick={rechargeWallet}>	  		
                                            {isProcessLoading ? "" : "Add Money"}
                                            {isProcessLoading &&
                                                <React.Fragment>
                                                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                                    <span className="sr-only"></span>
                                                </React.Fragment>
                                            }
                                        </button>
                                        <p className="wallet-note-text-bottom mt-3 mb-0">
                                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18">
                                                <g transform="translate(-762 -1106)">
                                                <path d="M9.563.563a9,9,0,1,0,9,9A9,9,0,0,0,9.563.563Zm0,3.992A1.524,1.524,0,1,1,8.038,6.079,1.524,1.524,0,0,1,9.563,4.554Zm2.032,9.218a.436.436,0,0,1-.435.435H7.966a.436.436,0,0,1-.435-.435V12.9a.436.436,0,0,1,.435-.435H8.4V10.143H7.966a.436.436,0,0,1-.435-.435V8.837A.436.436,0,0,1,7.966,8.4h2.323a.436.436,0,0,1,.435.435v3.629h.435a.436.436,0,0,1,.435.435Z" transform="translate(761.437 1105.438)" fill="#6c757d"></path>
                                                </g>
                                            </svg>
                                            Minimum balance to load <strong className="rupee mx-1">&#x20B9;</strong> {baseReloadAmt}
                                        </p>
                                    </div>}
                                    {((validate.isEmpty(walletData.kycInfo.panNo) && walletData.kycInfo.status == 'COMPLETED') && (walletData.walletReloadAllowed && walletData.walletReloadAllowed=='Y')) && <hr className="my-3"/>}
                                    {validate.isEmpty(walletData.kycInfo.panNo) && walletData.kycInfo.status == 'COMPLETED' &&
                                    <React.Fragment>
                                        <div className="add-money-to-wallet">
                                            <div className="add-to-wallet-container upload-kyc-sontainer">
                                                <h6 className="title mb-4">Complete your KYC</h6>
                                                <div className="row mx-0">
                                                    <div className="col-6 pl-0">
                                                        <div className="form-group filled-form">
                                                            <input type="text" className={`form-control ${errorMsg['pan_no']?'is-invalid':''}`} autoFocus id="pan_no"  name="pan_no"  maxLength="10" required autoComplete="off" value={panNo} onChange={handleOnChange} />
                                                            <label  className="select-label">PAN Card No <sup className="text-brand">*</sup></label>
                                                            {<div className="invalid-feedback d-block">
                                                                {errorMsg['pan_no']}
                                                            </div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <input type="file" id="fileUpload" name="fileUpload" accept="image/*,application/pdf"  onChange={event => uploadFiles(event)} hidden ref={addFiles}/>
                                                <div className="add-more-div mt-0" onClick={selectFile}>
                                                    <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 44 44">
                                                        <rect fill="none" width="44" height="44"></rect>
                                                        <g transform="translate(0.5 4.659)">
                                                            <path fill="#08ce73" d="M1407.005,661.592a3.914,3.914,0,1,0-3.915-3.914A3.913,3.913,0,0,0,1407.005,661.592Zm0-5.965a2.051,2.051,0,1,1-2.051,2.051A2.049,2.049,0,0,1,1407.005,655.627Z" transform="translate(-1382.43 -641.987)"></path>
                                                            <path fill="#404040" d="M1433.671,651.231l-25.311-2.871a3.472,3.472,0,0,0-2.734.787,3.517,3.517,0,0,0-1.346,2.408l-.462,3.8h-1.437a3.722,3.722,0,0,0-3.569,3.843V670.5a7.091,7.091,0,1,0,7.41,11.246h21.61a3.8,3.8,0,0,0,3.893-3.611V677.4a4.643,4.643,0,0,0,1.763-.742,3.841,3.841,0,0,0,1.344-2.5l2.132-18.8A3.752,3.752,0,0,0,1433.671,651.231ZM1402.38,657.2h25.451a2.132,2.132,0,0,1,2.039,1.991v7.782h0l-10.106,5.88a2.37,2.37,0,0,1-2.736-.23l-5.1-4.494a4.135,4.135,0,0,0-5.148-.184l-3.743,2.72a7.06,7.06,0,0,0-2.375-.412V659.2A1.87,1.87,0,0,1,1402.38,657.2Zm-1.717,25.64a5.5,5.5,0,1,1,5.5-5.5A5.5,5.5,0,0,1,1400.663,682.845Zm29.207-4.707h0a1.952,1.952,0,0,1-2.039,1.759h-20.546a7.077,7.077,0,0,0-2.429-8.266l2.993-2.2a2.229,2.229,0,0,1,2.875.139l5.054,4.446a4.354,4.354,0,0,0,2.735,1.019,4.243,4.243,0,0,0,2.226-.6l9.131-5.279Zm5.241-23.035,0,.017-2.179,18.8a1.571,1.571,0,0,1-.6,1.249c-.187.185-.6.278-.6.371V659.2a3.984,3.984,0,0,0-3.893-3.843h-22.159l.417-3.611a1.842,1.842,0,0,1,2.087-1.575l25.264,2.917A1.853,1.853,0,0,1,1435.111,655.1Z" transform="translate(-1393.564 -648.325)"></path>
                                                            <path fill="#e71c37" d="M1403.071,661.348a.715.715,0,0,0-.967-.292l-4.73,2.522-1-1.793a.713.713,0,0,0-1.248.692l1.339,2.409a.718.718,0,0,0,.96.284l5.348-2.854A.714.714,0,0,0,1403.071,661.348Z" transform="translate(-1391.819 -633.594)"></path>
                                                        </g>
                                                    </svg>
                                                    Select PAN Card Image
                                                </div>
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
                                                            <small>{"1 file(s) uploading..."}</small>
                                                            <Progress barClassName="bar" color="success" value={filesUploadProgress.percentCompleted}><span className="sr-only percent">0% Complete</span></Progress>
                                                            <small className="file-uploading-text">Uploading.. 
                                                                <span className="text-dark ml-1 percent">{filesUploadProgress.percentCompleted + "%"}</span>
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>}
                                                {validate.isNotEmpty(uploadedFilesInfo) && validate.isNotEmpty(imageThumbnailPath) &&
                                                <div className="upload-container">
                                                    <div className="each-upload">
                                                        <div className="content">
                                                            <img id="pan_img" src={validate.isNotEmpty(imageThumbnailPath) ? imageThumbnailPath : DefaultBanner} alt={"No preview"} title={uploadedFilesInfo.originalImageName} height="100" onError={() => handleImageLoadError()}/>
                                                            <span className="delete-prescription" title="Upload PAN" onClick={() => removeUploadedFile()}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16">
                                                                    <rect fill="none" width="16" height="16"></rect>
                                                                    <g transform="translate(0.66 0.001)">
                                                                        <path fill="#fff" d="M4.153,15.839A2.273,2.273,0,0,1,1.9,13.56V3.169H.542a.543.543,0,0,1,0-1.086H4.477V1.931A1.921,1.921,0,0,1,6.389,0H8.8a1.925,1.925,0,0,1,1.913,1.932v.152H14.3a.543.543,0,0,1,0,1.086H13.287V13.56a2.274,2.274,0,0,1-2.255,2.279ZM2.97,13.559a1.19,1.19,0,0,0,1.182,1.193h6.88a1.191,1.191,0,0,0,1.183-1.192V3.169H2.97ZM5.553,1.932l0,.151H9.634V1.932a.843.843,0,0,0-.84-.846H6.387A.846.846,0,0,0,5.553,1.932ZM9.967,13.506a.569.569,0,0,1-.545-.594V6.459a.568.568,0,0,1,.545-.543h.02a.567.567,0,0,1,.567.54v6.5a.569.569,0,0,1-.568.546Zm-2.4,0a.57.57,0,0,1-.545-.594V6.455a.566.566,0,1,1,1.132,0v6.5a.569.569,0,0,1-.567.546Zm-2.4,0a.57.57,0,0,1-.545-.594V6.455a.566.566,0,1,1,1.132,0v6.5a.569.569,0,0,1-.568.546Z" transform="translate(0 0)"></path>
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                            <p className="text-truncate" title={uploadedFilesInfo.originalImageName}>{uploadedFilesInfo.originalImageName}</p>
                                                        </div>
                                                    </div>
                                                </div>}
                                                <div className="mt-4">
                                                    <button type="button" className="btn btn-brand-gradient px-5 rounded-pill" onClick={()=>uploadPan()}>{isProceedLoading?'':'Submit'}</button>
                                                    {isProceedLoading &&
                                                    <React.Fragment>
                                                        <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                                        <span className="sr-only"></span>
                                                    </React.Fragment>}
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                    }
                                </div>
                            </React.Fragment>}
                            
                        </div>
                    </div>
                </div>
            </div>}
        </React.Fragment>
    )
}

const GhostImage = (props) => {
    return (
        <React.Fragment>
            <section className="container-fluid">
                <div className="ph-row ph-item p-0">
                    <div className="ph-picture rounded-0" style={{ "height": "13.875rem" }}></div>
                </div>
                <div className="mx-0 row">
                    <div className="col-4 px-0">
                        <div className="border rounded">
                            <div className="ph-item mb-0 pt-3 border-bottom">
                                <div className="ph-col-1 p-0">
                                    <div className="ph-picture mb-0" style={{ "height": "2.75rem", "width": "2.75rem" }}>
                                    </div>
                                </div>
                                <div className="pr-0">
                                    <div className="ph-row pl-3 mb-0 pt-2">
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-6"></div>
                                        <div className="ph-col-8 empty"></div>
                                        <div className="ph-col-4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 mx-3">
                        <div className="ph-item mb-0 pt-0">
                            <div className="px-0">
                                <div className="ph-row mb-0">
                                    <div className="mb-3 ph-col-4" style={{ "height": "1.5rem" }}></div>
                                    <div className="ph-col-8 empty mb-3"></div>
                                    <div className="mb-2 mr-3 ph-col-2" style={{ "height": "1.5rem" }}></div>
                                    <div className="empty ph-col-10"></div>
                                    {[1, 2, 3].map(() => {
                                        return (
                                            <div className="mb-2 mr-3 ph-col-2" style={{ "height": "1.5rem" }}></div>
                                        )
                                    })}
                                    <div className="empty ph-col-4"></div>
                                    <div className="empty ph-col-1"></div>
                                    <div className="mb-3 ph-col-4" style={{ "height": "1rem" }}></div>
                                    <div className="ph-col-8 empty"></div>
                                    <div className="ph-col-1 mb-3 mr-3" style={{ "height": "1rem" }}></div>
                                    <div className="ph-col-1 mr-3" style={{ "height": "1rem" }}></div>
                                    <div className="ph-col-1 mr-3" style={{ "height": "1rem" }}></div>
                                    <div className="ph-col-4 empty"></div>
                                    <div className="ph-col-3 empty"></div>
                                    <div className="ph-col-2 my-3" style={{ "height": "2rem" }}></div>
                                    <div className="ph-col-12 empty"></div>
                                    <div className="mb-3 ph-col-4"></div>
                                    <div className="empty ph-col-8"></div>
                                    <div className="ph-col-4 mb-3"></div>
                                    <div className="ph-col-8 empty"></div>
                                    <div className="ph-col-3 mb-3" style={{ "height": "2rem" }}></div>
                                    <div className="ph-col-9 empty"></div>
                                    <div className="ph-col-6 mb-3"></div>
                                    <div className="ph-col-6 empty"></div>
                                    <div className="ph-col-2" style={{ "height": "2rem" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default MyWalletTab;