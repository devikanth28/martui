import React, { useState, useEffect, useRef } from 'react';
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import Validate from '../../../../helpers/Validate';
import DateValidator from '../../../../helpers/DateValidator';
import SubscriptionService from '../../services/SubscriptionService';
import ImageProcessService from '../../../../services/ImageProcessService';
import { TabContent, TabPane, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Alert, {ALERT_TYPE_SUCCESS} from '../../../Common/Alert';
import {SET_MEMBER_LIST} from '../../redux/SubscriptionReducer';
import AddNewMemberDetail from './AddNewMemberDetail';
import SubscriptionMemberDetail from './SubscriptionMemberDetail';
import SubsLoginIcon from "../../../../images/common/Subscriptions-amico.svg";
import { MEDPLUS_ADVANTAGE_HOME, MEDPLUS_ADVANTAGE_URL_PREFIX, SubscriptionBenefitType, photoIdInputMaxLength, validateDate } from "../../constants/SubscriptionConstants";
import MaskedInput from 'react-maskedinput';
import UserInfoAction from '../../../../../redux/action/UserInfoAction';
import UploadPhotoId from '../UploadPhotoId';
import { getSelectedLocality } from '../../../../../redux/action/LocalityAction';
import { isUpcomingSubscription } from '../../../../helpers/SubscriptionHelper';
import qs from 'qs';
import { Link } from 'react-router-dom';
import { DIAGNOSTICS_URL_PREFIX } from '../../../MedplusLabs/constants/LabConstants';
const maxSize = 3000000;
const SubscriptionMembers=(props)=>{
    
    
    const validate = Validate();
    const dateValidator = DateValidator();
    const dispatch = useDispatch();
    const userInfoAction = UserInfoAction();
    const subscriptionService = SubscriptionService();
    const [members,setMembers]=useState(undefined);
    const [kycTypes,setKycTypes] =useState(undefined);
    const [relations,setRelations]=useState(undefined);
    const [memberRegions,setMemberRegions]=useState(undefined);
    const [selectedMemberIds,setSelectedMemberIds]=useState(undefined);//maintains the list of selected members ids from existing patients
    const [selectedMembers,setSelectedMembers]=useState(undefined); //maintains the list of selected members from existing patients
    const [isAddMembers,setIsAddMembers] =useState(false);
    const [isConditions,setIsConditions] =useState(false);
    const [activeTab,setActiveTab]=useState('2');
    const [initialLoader,setInititalLoader] =useState(true);
    const [newMembers,setNewMembers] =useState(undefined);// maintains the list of newDetails added by customer
    const [alertData, setAlertData] = useState({});
    const [errorMsg, setErrorMsg] = useState({});
    const [topCustomer, setTopCustomer] = useState(undefined);//maintains the details of primary customer
    const [topCustomerMail, setTopCustomerMail] = useState(null);
    const [photoProofType, setPhotoProofType] = useState(false);
    const [openMemberRegion, setOpenMemberRegion] = useState(false);
    const [file, setFile]=useState(undefined);//maintains the imageFile data of primary customer
    const [imagePath,setImagePath]=useState(undefined);//maintains the imagePath object of primary customer
    const [showRetry,setShowRetry] =useState(false);
    const [backDropLoader,setBackDropLoader]=useState(false);
    const [uploadPhotoModel,setUploadPhotoModel]= useState(false); // this is for  imageUpload for app
    const [newMembersImagePathList,setNewMembersImagePathList]=useState([]); // imageupload list of newMembers maintained in same order as newMemberslist
    const [newMembersFileList,setNewMembersFileList]=useState([]);// // imageupload list of newMembers maintained in same order as newMemberslist
   
    const [existingMembersFileList,setExistingMembersFileList]=useState({});//map of patiedId and imagaupload file for existing members
    const [existingMembersImagePath,setExistingMembersImagePath]=useState({});//map of patiedId and imagaupload file for existing members
    const [newMembersErrorList,setNewMembersErrorList]=useState({});//api response error for respective member list is stored here map of index---errormessage
    const [existingMembersErrorMap,setExistingMembersErrorMap]=useState({});//same purpose as above for existing members
    
    const [maxMembers,setMaxMembers]= useState(-1);//max members allowed for a plan
    const [currentMembers,setCurrentMembers] = useState(1);//total count of members
    const [minMembers,setMinMembers] = useState(1);

    const [currentEditMember,setCurrentEditMember]= useState(undefined);

    const [isRegisterLoading, setRegisterLoading] = useState(false);

    const [planInfo,setPlanInfo]= useState(undefined);
    const [disableRegister, setDisableRegister] = useState(false);

    const [isDisplayProgressLoader, setDisplayProgressLoader] = useState(false);
    const [percentCompleted, setPercentCompleted] = useState(0);

    const [localityState, setLocalityState] = useState({});

    const [isFormEdit, setIsFormEdit] = useState(false); //maintains form completion state 

    const isFromRenewal = qs.parse(props.location.search, { ignoreQueryPrefix: true }).isFromRenewal;

    const [subcribedMemberIds, setSubcribedMemberIds] = useState([])
    
    const [showUploadPhotoIdButton, setShowUploadPhotoIdButton] = useState([]);

    const displayableGender = {
        "M": "Male",
        "F": "Female",
        "O": "Others"
    }

    const emailPattern = /^[A-Za-z0-9-_.@]+$/;

    const refs = useRef({});
    const uploadImageRef = useRef({});

    const locality = getSelectedLocality();
    const selectedMembersFromRedux = useSelector(state=>{
        if(validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.members)){
            return state.subscription.members;
        }
    });

    const selectedPlanId = useSelector(state=>{
        if(validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.selectedPlan)){
            return state.subscription.selectedPlan;
        }
    });

    const planType = useSelector(state=>{
        if(validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.planType)){
            return state.subscription.planType;
        }
    });

    const customer = useSelector(state=>{
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.userInfo) && validate.isNotEmpty(state.userInfo.userInfo) && validate.isNotEmpty(state.userInfo.userContactDetails)){
            const userInfo = state.userInfo.userInfo;
            const userContactDetails = state.userInfo.userContactDetails;
            return {...userInfo, ...userContactDetails};
        }
    });

    const corporateEmailId = useSelector(state=>{
        if(validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.corporateEmailId)){
            return state.subscription.corporateEmailId;
        }
    });


    //on component mount get plan details,getExisting members and if existing members doesnt contain primary member prepare primary member and add to top of members list
    //set top customers, selected members in state if present in redux
    useEffect(()=>{
        if(validate.isEmpty(selectedPlanId)){
            setAlertData({message:"please select plan before adding members",type:'danger'});
            setTimeout(()=>props.history.push(`${MEDPLUS_ADVANTAGE_HOME}`),2000);
        }
        getPlanInfo();
    }, []);

    // this useEffect is used to update total selected members whenever member is added or removed
    useEffect(()=>{
        let totalMembers =1;
        if(selectedMemberIds && selectedMemberIds.length > 0){
            totalMembers = totalMembers+selectedMemberIds.length;
        }
        if(newMembers && newMembers.length > 0){
            totalMembers= totalMembers+newMembers.length;
        }
        setCurrentMembers(totalMembers);

    },[selectedMemberIds,newMembers]);

    useEffect(()=>{
        if((validate.isNotEmpty(topCustomer) && !validateCustomer())|| !isErrorsEmpty()){
            setDisableRegister(true);
        }else{
            setDisableRegister(false);
        }
    },[topCustomer, file, errorMsg]);

    const isErrorsEmpty =()=>{
        if(validate.isNotEmpty(errorMsg["name"])){
            return false;
        }
        if(topCustomer !== undefined && topCustomer.kycType !== undefined && validate.isNotEmpty(topCustomer.kycType) && validate.isNotEmpty(errorMsg["photoIdNumber"])){
            return false;
        }
        if(validate.isNotEmpty(errorMsg["emailId"])){
            return false;
        }
        if(validate.isNotEmpty(errorMsg["yearOfBirth"])){
            return false;
        }
        return true;
    }


    const getPlanInfo =() => {
        subscriptionService.getPlanDetails({ planId: selectedPlanId }).then(data => {
                let planDetails = null
                if("SUCCESS" === data.statusCode && validate.isNotEmpty(data.dataObject)){
                    if(data.dataObject.isMemberSubscribed && !data.dataObject.isRenewalAllowed){
                        setAlertData({message:"Already subscription exists ",type:'danger'});
                        setTimeout(()=>props.history.push(`${MEDPLUS_ADVANTAGE_HOME}`),2000);
                    }
                    planDetails= data.dataObject.planDetails;
                    setPlanInfo(planDetails);
                    setMaxMembers(data.dataObject.maxMembers);
                    setMinMembers(data.dataObject.minMembers);
                }else{
                    setAlertData({message:"please select plan before adding members",type:'danger'});
                    setTimeout(()=>props.history.push(`${MEDPLUS_ADVANTAGE_HOME}`),2000);
                }
            checkForRenewalMembersAndGetMembers(planDetails);
            })
    }

    const checkForRenewalMembersAndGetMembers = async (planDetails) => {
        if(validate.isNotEmpty(selectedMembersFromRedux)){
            getMembers(selectedMembersFromRedux);
        } else {
            const subscriptionObject = await getSubscriptionDetails(planDetails);
            let subscribedMembers= [];
            if (validate.isNotEmpty(subscriptionObject) && subscriptionObject.renewalAllowed && (subscriptionObject.plan.id == selectedPlanId || isFromRenewal == "true") ) {
                    subscribedMembers= [...subscriptionObject.members];
            }
            let memberIds =[];
            subscribedMembers.map(member=>{
                    memberIds.push(member.patientId);
            }); 
            getMembers(memberIds,subscriptionObject);
        }
       
    }

    const getSubscriptionDetails = async (planDetails) => {
        
       const subscriptionObject = await subscriptionService.getSubscriptions({}).then(data => {

           if (data && data.statusCode === "SUCCESS" && validate.isNotEmpty(data.dataObject)) {
               let subscriptionObject = {};
               data.dataObject = data.dataObject.filter((each) => !isUpcomingSubscription(each));
               subscriptionObject = { ...data.dataObject.find((each) => each.benefitType == SubscriptionBenefitType.HEALTHCARE && planDetails && planDetails.benefitType != SubscriptionBenefitType.PHARMA) }
               if (validate.isEmpty(subscriptionObject)) {
                   subscriptionObject = { ...data.dataObject.find((each) => each.benefitType == SubscriptionBenefitType.PHARMA) }
               }
                return subscriptionObject;
            }
            return;
        });

        return subscriptionObject;
    }

    const getMembers = (selectedMemberIds,subscriptionObject) => {
        subscriptionService.getMembersForCustomer({}).then(data=>{
            if(data && "SUCCESS" == data.statusCode && validate.isNotEmpty(data.dataObject)){
                let membersObject= [];
                if(validate.isNotEmpty(data.dataObject.members)){
                    let member = data.dataObject.members[0];
                    if( validate.isEmpty(member.relationship) || member.relationship.relationshipType !== "SELF"){
                        let topMember = {};
                        topMember["patientName"] = `${customer.displaybleName}`;
                        topMember["email"] = `${validate.isNotEmpty(customer.emailAddress)?customer.emailAddress:''}`;
                        topMember["gender"] = `${customer.gender}`;
                        topMember["dob"] = `${member.dob}`;
                        membersObject.push(topMember);
                    }else{
                        member.patientName= `${customer.displaybleName}`;
                        member.email=`${validate.isNotEmpty(customer.emailAddress) ? customer.emailAddress : (validate.isNotEmpty(member.email)?member.email:'')}`;
                    }
                    data.dataObject.members[0] =member;
                    membersObject=[...membersObject,...data.dataObject.members];
                }
                if (validate.isNotEmpty(data.dataObject.suscribedMemberIds))
                    setSubcribedMemberIds(data.dataObject.suscribedMemberIds)
                
                let suscribedMemberIds = data.dataObject.suscribedMemberIds ? data.dataObject.suscribedMemberIds : [];
                setShowUploadPhotoIdButton(data.dataObject.members.filter((each) => suscribedMemberIds.includes(each.patientId) && validate.isEmpty(each.verifiedKycTypes)).map(each => each.patientId))
                
                if (validate.isNotEmpty(membersObject) && membersObject.length > 0) {
                    changeDateOfBirthOfMembers(membersObject,data.dataObject.kycTypes,data.dataObject.suscribedMemberIds ? data.dataObject.suscribedMemberIds : [], selectedMemberIds);
                    setMembers(membersObject);
                    setActiveTab('1');
                    if (validate.isNotEmpty(selectedMemberIds)) {
                        if(selectedMemberIds.length > 1)
                            setIsAddMembers(true);
                        checkAndSetMembersInState(membersObject, selectedMemberIds);
                    } else {
                        let topCustomerObject = { ...membersObject[0] };
                        if (validate.isEmpty(topCustomerObject.email) && validate.isNotEmpty(customer.emailAddress)) {
                            topCustomerObject.email = customer.emailAddress;
                        }
                        if (validate.isEmpty(topCustomerObject.gender) && validate.isNotEmpty(customer.gender)) {
                            topCustomerObject.gender = customer.gender;
                        }
                        setTopCustomerMail(topCustomerObject.email);
                        setTopCustomer(topCustomerObject);

                    }
                }
                if(validate.isNotEmpty(data.dataObject.kycTypes))
                    setKycTypes(data.dataObject.kycTypes);
                if(validate.isNotEmpty(data.dataObject.relations))
                    setRelations(data.dataObject.relations);
                if(validate.isNotEmpty(data.dataObject.memberRegions)){
                    setMemberRegions(data.dataObject.memberRegions);
                    let selectedState = {};
                    Object.entries(data.dataObject.memberRegions).map((value, index) => {
                        if (locality.state.toLowerCase() == value[1].toLowerCase()) {
                            selectedState.stateSubName = value[0];
                            selectedState.stateName = value[1];
                            return
                        }
                    })
                    setLocalityState(selectedState);
                }
               
            } else if("NO_MEMBERS_FOUND" == data.message){
                if (validate.isNotEmpty(data.dataObject.kycTypes))
                    setKycTypes(data.dataObject.kycTypes);
                if (validate.isNotEmpty(data.dataObject.relations))
                    setRelations(data.dataObject.relations);
                setCustomerIntoMember();
            }else{
                setShowRetry(true);
            }
            setInititalLoader(false);
            window.scrollTo({top : 0,left : 0,behavior : "smooth"});
          })
        

    }

    const checkIfMemberSubscribed = (member, subscribedMembers) => {
        return subscribedMembers.some(subscribedMember => subscribedMember.patientId === member.patientId)
    }

    // to change the dob to "MM/YYYY" format for display purpose
    const changeDateOfBirthOfMembers=(members,kycTypes,subcribedMemberIds, selectedMemberIds)=>{
        members.map((member)=>{
            if(validate.isNotEmpty(member) && validate.isNotEmpty(member.dob))
                member.dob = dateValidator.getDateFormat(member.dob);
            else
                member.dob = "";
            if(validate.isNotEmpty(member) && validate.isNotEmpty(member.verifiedKycTypes) && member.verifiedKycTypes.length > 0){
                let listOfVerifiedKycCustomers = member.verifiedKycTypes;
                kycTypes.every(kycType=>{
                    if(listOfVerifiedKycCustomers[0] === kycType.kycType){
                        member.kycType =kycType;
                        return false;
                    }
                    return true;
                })
                
            }
        });
        
    }
    
    //prepare top customer from available details and update into state
    const setCustomerIntoMember=()=>{
        let topMember = {};
        topMember["patientName"] = `${customer.displaybleName}`;
        topMember["email"] = `${validate.isNotEmpty(customer.emailAddress) ? customer.emailAddress : ''}`;
        topMember["gender"] = `${customer.gender}`;
        setTopCustomerMail(topMember.email);
        setTopCustomer(topMember);
        return topMember;
    }

    //upload file for mobileView
    const uploadFile=(e)=>{
        if(validate.isEmpty(topCustomer.kycType) || validate.isEmpty(topCustomer.kycRefNo)){
            setAlertData({message:"please select photoId and enter photoId number before uploading",type:'danger'});
            setFile(undefined);
            setImagePath(undefined);
            return;
        }
        let file = e.target.files[0];
        if(file){
            if(file.type != "image/png" && file.type !="image/jpg" && file.type !="image/jpeg"){
                setAlertData({message : "Only JPG, JPEG and PNG types are accepted !", type : "danger" })
                setFile(undefined);
                setImagePath(undefined);
                return;
            }
            if(file.type != "application/pdf" && file.size > maxSize){
                setBackDropLoader(true)
                const quality = parseFloat(2200000 / file.size).toFixed(2) ;
                resize(file,quality);
                return;
            }else{
                uploadImageToServer(file);
            }
        }
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
                setFile(file);
                setImagePath(imageObject);
                setDisplayProgressLoader(false);
            }  else {
                setDisplayProgressLoader(false);
                setAlertData({ message: "unable to upload images", type: 'danger' });
            }
        }).catch(err=>{
            setDisplayProgressLoader(false);
            setAlertData({ message: "unable to upload images", type: 'danger' });

        })
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
        setBackDropLoader(false);
        uploadImageToServer(file);
       
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

    //handling changes for primary customer
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

    //validating inputs for primary customer
    const validateInputs = (e) =>{
        if (e.target.id.indexOf('photoIdNumber') > -1) {
            return validatePhotoIdNumber(e.target.value);
        } else if (e.target.id.indexOf('name') > -1) {
            return validate.name(e.target.value,"Name", 30);
        } else if (e.target.id.indexOf('yearOfBirth') > -1) {
           return dateValidator.validateDate(e.target.value, topCustomer);
        } else if(e.target.id.indexOf('emailId') > -1){
            return validate.email(e.target.value);
        }
    }

    //validate photoId for primary customer
    const validatePhotoIdNumber = (value) => {
        if(validate.isEmpty(topCustomer.kycType)) {
            return "Select Photo ID" ;
        }
        switch(topCustomer.kycType.kycType) {
            case "AADHAAR_CARD" : return validate.aadhaarCardNo(value);
            case "PAN_CARD" :  return validate.panCardNo(value);
            case "DRIVING_LICENSE" : return validate.drivingLicense(value);
            case "PASSPORT" : return validate.passport(value);
            case "PENSION_PASSBOOK" : return validate.pensionPassbook(value);
            case "NPR_SMART_CARD" : return validate.nprSmartCard(value);
            case "VOTER_ID" : return validate.voterId(value);
            default : return;
        }
      
    }

    const handleValidation = (e) =>{
            let errorMessage = {...errorMsg,[e.target.id]:''}
            setErrorMsg(errorMessage)
    }

    //save the changes into primary customer state 
    const handleOnChange = (event) => {
        let maxLength = event.target.maxLength;
        handleInputChange(event);
        if(maxLength && event.target.value.length > maxLength) {
            return;
        } else if (event.target.id == "name" && validate.isNotEmpty(event.target.value) && !validate.isAlphaWithSpace(event.target.value)) { 
            return;
        }  else {
            let customer = {...topCustomer};
            if(event.target.id === 'name'){
                customer.patientName=event.target.value;
            }
            if(event.target.id === 'yearOfBirth'){
                customer.dob=event.target.value;
            }
            if(event.target.id === 'photoIdNumber'){
                if(validate.isEmpty(event.target.value)){
                    customer.kycRefNo='';
                }else if(customer.kycType.kycType === "AADHAAR_CARD" && validate.isNumeric(event.target.value)){  
                   customer.kycRefNo=event.target.value;
                } else if (customer.kycType.kycType !== "AADHAAR_CARD" && validate.isAlphaNumericWithSpace(event.target.value)){
                    customer.kycRefNo=event.target.value;
                }
            }
            if(event.target.id === 'emailId'){
                if(validate.isEmpty(event.target.value)){
                    customer.email='';
                } else if(event.target.value.match(emailPattern)){  
                   customer.email=event.target.value;
                }
            }
            setTopCustomer(customer);
        }
    }

    //function to add newMember into list,its image also
    const addNewMember=(member,index,file,imagePath)=>{
        let membersList =[];
        let imagePathList=[];
        let imagefileList=[];
        if(newMembers){
            membersList=[...newMembers];
            imagePathList=[...newMembersImagePathList];
            imagefileList=[...newMembersFileList];
        }
        if(index < 0){
            membersList.push(member);
            imagePathList.push(imagePath);
            imagefileList.push(file);
        }else{
            membersList[index] =member;
            imagePathList[index]=imagePath;
            imagefileList[index]=file;
        }
       
        setNewMembersFileList(imagefileList);
        setNewMembersImagePathList(imagePathList);
        setNewMembers(membersList);
    }

    //function to remove newCustomer from list also removing image
    const removeNewCustomer=(index)=>{
        let memberList=[...newMembers];
        let imagePathList=[...newMembersImagePathList];
        let imagefileList=[...newMembersFileList];
        memberList.splice(index,1);
        imagePathList.splice(index,1);
        imagefileList.splice(index,1);
        setNewMembers(memberList);
        setNewMembersFileList(imagefileList);
        setNewMembersImagePathList(imagePathList);
    }

    // validate top customer,upload images and save members
    const register = async () => {
        if(!validateTopCustomer()){
            return;
        }
        if(isFormEdit){
            setAlertData({message:`Please save or cancel pending member details`,type:'danger'});
            return;
        }
        if(!isConditions) {
            setAlertData({message: `Please accept Term and Conditions`,type:'danger'})
            return;
        }
        if(isAddMembers){
            if(minMembers > currentMembers){
                setAlertData({message:`Minimum members for plan is ${minMembers}`,type:'danger'});
                return;
            }
        }else{
            if(minMembers > 1){
                setAlertData({message:`Minimum members for plan is ${minMembers}`,type:'danger'});
                return;
            }
        }
        if(validate.isNotEmpty(existingMembersErrorMap) || validate.isNotEmpty(newMembersErrorList)){
            return;
        }
        
        setBackDropLoader(true);
        let mainCustomer = {...topCustomer}
        if(planType === "O" || planType === "OC"){
            mainCustomer.corporateEmail=corporateEmailId;
            if(validate.isEmpty(mainCustomer.email)){
                mainCustomer.email = corporateEmailId;
            }
        }
        mainCustomer.mobile= customer.shippingContactNumber;
        relations.map(relation=>{
            if(relation.relationshipType === "SELF"){
                mainCustomer.relationship = relation;
            }
        })  
        if(validate.isNotEmpty(imagePath) && validate.isNotEmpty(mainCustomer.kycType) && !checkIfSelectedKyCTypeExistsInVerifiedList(mainCustomer,mainCustomer.kycType)){
            mainCustomer.imageFile= imagePath;
        }
        let selectedMembersList =[]
        if(selectedMembers && selectedMembers.length > 0  ){
            selectedMembersList=JSON.parse(JSON.stringify(selectedMembers));//used for deep copy the state member list to change the format of date
            
        }
        let newMembersList =[]
        if(newMembers && newMembers.length > 0){
            newMembersList = JSON.parse(JSON.stringify(newMembers));
        }
        setRegisterLoading(true);
       
       /*  if(validate.isNotEmpty(mainCustomer.kycType) && !checkIfSelectedKyCTypeExistsInVerifiedList(mainCustomer,mainCustomer.kycType) && validate.isEmpty(mainCustomer.imageFile)){
            setBackDropLoader(false);
            return;
        } */
        mainCustomer = { ...mainCustomer, "stateSubName": localityState.stateSubName }
        let allCustomers =[];
        allCustomers.push(mainCustomer);
        if(isAddMembers){
            if(selectedMembersList){
                allCustomers=[...allCustomers,...selectedMembersList];
            }
            if(newMembersList){
                allCustomers=[...allCustomers,...newMembersList];
            }
        }
        allCustomers.map(customer=>{
            if(validate.isNotEmpty(customer.dob)){
                customer.dob=dateValidator.getDateObject(customer.dob);
            }
            if(validate.isNotEmpty(customer.kycType) && !checkIfSelectedKyCTypeExistsInVerifiedList(customer,customer.kycType)){
                prepareKycObjectAndSaveIntoMember(customer);
            }else{
                customer.kycs = null;
            }
        })
        let object={};
        object['planId']=selectedPlanId;
        object['membersList']=JSON.stringify(allCustomers);
        object['acceptedTnc']=isConditions;
        saveMembers(object);
    }

    const prepareKycObjectAndSaveIntoMember=(customer)=>{
        if (validate.isNotEmpty(customer.kycType)) {
            let imageInfoList = {};
            let imageFile = {};
            let kycs = {};
            let attributes = {};
            attributes['attributeName'] = customer.kycType.attributes[0].attributeName;
            attributes['attributeValue'] = customer.kycRefNo;
            kycs['kycType'] = customer.kycType.kycType;
            kycs['attributes'] = [attributes];
            if(validate.isNotEmpty(customer.imageFile)){
                imageInfoList['imagePath'] = customer.imageFile.imagePath;
                imageInfoList['thumbnailPath'] = customer.imageFile.thumbnailPath;
                imageInfoList['originalImageName'] = customer.imageFile.originalImageName;
                imageInfoList['imageServerName'] = customer.imageFile.imageServerName;
                imageFile['imageInfoList'] = [imageInfoList];
                imageFile['imageServerName'] = customer.imageFile.imageServerName;
                kycs['imageFile'] = imageFile;
            }
            customer.kycs = [kycs];
        }
        delete customer.kycType;
        delete customer.kycRefNo;
        delete customer.imageFile;
    }


    const saveMembers=(object)=>{
        setRegisterLoading(true);
        subscriptionService.saveMembersForPlan(object).then(data=>{
            setRegisterLoading(false);
            if("SUCCESS" == data.statusCode && validate.isNotEmpty(data.dataObject)){
                let members = data.dataObject;
                let memberIdsForRedux = [];
                if(members){
                    members.map(each=>{
                        if("SUCCESS" == each.status){
                            memberIdsForRedux.push(each.member.patientId);
                        }
                    })
                }
                userInfoAction.reloadUserInfo();
                dispatch({type:SET_MEMBER_LIST,data:memberIdsForRedux});
                props.history.push({pathname:`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/payment`});            
                }else{
                if(validate.isNotEmpty(data.dataObject)){
                    if("MEMBERS_ERROR" === data.message){
                        const keys = Object.keys(data.dataObject);
                        let selectedMembersErrorMap = {};
                        let newMembersErrorList={};
                        keys.map(index =>{
                            if(index == 0){
                                let showMessage = data.dataObject[0][0];
                                if(validate.isNotEmpty(showMessage) && showMessage=== "Id proof already in use, please enter unique id"){
                                    let errMessage = {...errorMsg,["photoIdNumber"]:showMessage};
                                    setErrorMsg(errMessage);
                                }
                            }
                            if(index > 0 && selectedMemberIds && index <= selectedMemberIds.length){
                                selectedMembersErrorMap[index-1]= data.dataObject[index][0];
                            }
                            if((selectedMemberIds && index > selectedMemberIds.length) || (!selectedMemberIds && index > 0)){
                                let length = (selectedMemberIds)?selectedMemberIds.length+1:1;
                                newMembersErrorList[index-length]=data.dataObject[index][0];
                            }
                        })
                        setNewMembersErrorList(newMembersErrorList);
                        setExistingMembersErrorMap(selectedMembersErrorMap)
                    }
                    if("PLAN_SUBSCRIPTION_ERROR" == data.message){
                        setAlertData({message: data.dataObject[0] , type : "danger"});
                    }
                   if("MEMBER_EXCEPTION" == data.message){
                       setAlertData({message:data.dataObject,type:"danger"})
                   }
                   
                }else{
                    setAlertData({message: 'Unable to save members' , type : "danger"});
                }
                setBackDropLoader(false);
            }
        })
    }

    const validateCustomer=()=>{
        let isValid = true;
        if(validate.name(topCustomer.patientName)){        	
             return false;
        }
        if(validate.isEmpty(topCustomer.gender)){
           return false;
        }
        if(validate.isNotEmpty(topCustomer.kycType)){
            if(!checkIfSelectedKyCTypeExistsInVerifiedList(topCustomer,topCustomer.kycType) && validatePhotoIdNumber(topCustomer.kycRefNo)){
                return false;
             }
            /*  if(!checkIfSelectedKyCTypeExistsInVerifiedList(topCustomer,topCustomer.kycType) && (!file)){
               return false;
             } */
        }
        if((planType === "I" || planType === "IC") && validate.email(topCustomer.email)){
          return false;
        }
         if(dateValidator.validateDate(topCustomer.dob)){
            return false;
        } 
        return isValid;
    }

    const validateTopCustomer=()=>{
        let isValid = true;
        if(validate.name(topCustomer.patientName)){
        	 let errMessage={...errorMsg,'name':"Please provide valid name"}
             setErrorMsg(errMessage);
             isValid= false;
        
        }
        if(validate.isEmpty(topCustomer.gender)){
            setAlertData({message:"Please select your gender",type:'danger'});
            isValid= false;
            return isValid;
        }
        if(validate.isNotEmpty(topCustomer.kycType)){
            if(!checkIfSelectedKyCTypeExistsInVerifiedList(topCustomer,topCustomer.kycType) && validatePhotoIdNumber(topCustomer.kycRefNo)){
                let errMessage={...errorMsg,'photoIdNumber':`Please enter validate ${topCustomer.kycType.kycName}`}
                setErrorMsg(errMessage);
                isValid= false;
            }
            /* if(!checkIfSelectedKyCTypeExistsInVerifiedList(topCustomer,topCustomer.kycType) && (!file)){
                setAlertData({message:`Please upload photo proof for ${topCustomer.kycType.kycName}`,type:'danger'});
                isValid= false;
                return isValid;
            } */
        } 
        /* if(validate.isEmpty(topCustomer.stateSubName)){
            setAlertData({message:'Please select your state ',type:'danger'});
            isValid= false;
            return isValid;
        } */
        if((planType === "I" || planType === "IC") && validate.email(topCustomer.email)){
            let errMessage={...errorMsg,'emailId':`please enter valid emailId`}
            setErrorMsg(errMessage);
            isValid= false;
        }
         if(dateValidator.validateDate(topCustomer.dob)){
            let errMessage={...errorMsg,'yearOfBirth':dateValidator.validateDate(customer.dob)}
            setErrorMsg(errMessage);
            isValid= false;
        } 
        return isValid;
    }

    const deleteMember = (mId) =>{
        if(validate.isNotEmpty(mId)){
            subscriptionService.deleteMember({memberId:mId}).then(data=>{
                if("SUCCESS" === data.statusCode){
                    let membersMaps = new Map();
                    members.map(each=>{
                        membersMaps.set(each.patientId,each);
                    });
                    if(validate.isNotEmpty(selectedMemberIds))
                        removeSelectedCustomer({"patientId":mId});
                    data.dataObject.map(each => {
                        if(validate.isNotEmpty(each) && validate.isNotEmpty(each.age)){
                            if ((validate.isEmpty(selectedMemberIds) || (validate.isNotEmpty(selectedMemberIds) && selectedMemberIds.indexOf(each.patientId) == -1)) && (!subcribedMemberIds.includes(each.patientId))){
                                each.age = '';
                                each.dob = '';
                            }else{
                                each.age = membersMaps.get(each.patientId).age;
                                each.dob = membersMaps.get(each.patientId).dob;   
                            }
                        }
                    }); 
                    setMembers(data.dataObject);
                    removeSelectedCustomer({"patientId":mId});
                    setActiveTab('1');
                    setAlertData({ message: "Member deleted successfully", type: ALERT_TYPE_SUCCESS });
                }else{
                    setAlertData({ message: "Unable to delete member", type: 'danger' });
                }
            })
        }
    }
    
    //remove existing customer from selected members list
    const removeSelectedCustomer=(customer)=>{
        let indexToRemove = selectedMemberIds?.indexOf(customer.patientId);
        if(indexToRemove >= 0){
            let selectMemberIdsFromState = [...selectedMemberIds];
            let selectMembersFromState=[...selectedMembers];
            selectMembersFromState.splice(indexToRemove,1);
            selectMemberIdsFromState.splice(indexToRemove,1);
            setSelectedMembers(selectMembersFromState);
            setSelectedMemberIds(selectMemberIdsFromState);
        }
    }
   
    const updateKycType=(kycType)=>{
        let customer = {...topCustomer};
        if(validate.isEmpty(kycType) || (validate.isNotEmpty(customer.kycType) && customer.kycType.kycType !== kycType.kycType)){
            customer.kycRefNo= '';
            setFile(undefined);
            setImagePath(undefined);
            let errorMessage = {...errorMsg,['photoIdNumber']:''};
            setErrorMsg(errorMessage);
        }
        customer.kycType = kycType;
        setTopCustomer(customer);
    }

    const updateRegion=(stateCode, stateName)=>{
        let customer = {...topCustomer};       
        customer.stateSubName = stateCode;
        customer.stateName = stateName;
        setTopCustomer(customer);
    }

    const checkIfSelectedKyCTypeExistsInVerifiedList =(customer,kycType)=>{
        let listOfVerifiedKycCustomers = customer.verifiedKycTypes;
        if(validate.isNotEmpty(listOfVerifiedKycCustomers) && listOfVerifiedKycCustomers.length > 0){
            return listOfVerifiedKycCustomers.indexOf(kycType.kycType) === -1? false:true
         }
        return false;
    }
    
    //add existing members into selected Members list
    const setSelectedMembersIntoState =(customer,index,file,imagePath)=>{
        let selectedMembersFromState = [];
        if(selectedMembers){
            selectedMembersFromState=[...selectedMembers]
        }
        let selectedMemberIdsFromState =[];
        if(selectedMemberIds)
            selectedMemberIdsFromState =[...selectedMemberIds];
        let indexOfCustomer = selectedMemberIdsFromState.indexOf(customer.patientId);
        if(indexOfCustomer === -1){
            selectedMembersFromState.push(customer);
            selectedMemberIdsFromState.push(customer.patientId);
        }else{
            selectedMembersFromState[indexOfCustomer]=customer;
        }
        let membersFromState=[...members];
        membersFromState[index]=customer;
        if(file && imagePath){
            let imagefileListMap = {...existingMembersFileList};
            let existingImagePathList={...existingMembersImagePath};
            imagefileListMap[customer.patientId]=file;
            existingImagePathList[customer.patientId]=imagePath;
            setExistingMembersFileList(imagefileListMap);
            setExistingMembersImagePath(existingMembersImagePath);
        }
        setMembers(membersFromState);
        setSelectedMembers(selectedMembersFromState);
        setSelectedMemberIds(selectedMemberIdsFromState);
    }

    const openphotoProofType =() =>{
        setPhotoProofType(!photoProofType);
    }

    const openMemberRegionType =() =>{
        setOpenMemberRegion(!openMemberRegion);
    }

    // function to updated selected members into list from redux
    const checkAndSetMembersInState=(members,selectedMemberIds)=>{
        let selectedMembersList = [];
        let selectedMemberIdsList =[];
        selectedMemberIds.forEach(memberId=>{
            members.every(member=>{
                if(memberId == member.patientId){
                    if(validate.isEmpty(member.relationship) || member.relationship.relationshipType !== "SELF"){
                        selectedMembersList.push(member);
                        selectedMemberIdsList.push(memberId);
                    } else {
                        setTopCustomerMail(member.email);
                        setTopCustomer(member);
                    }
                    return false;
                }
                return true;
            });
        });
        setSelectedMembers(selectedMembersList);
       setSelectedMemberIds(selectedMemberIdsList);
    }

    const removeErrorFromSelectedMembers=(index,isRemove)=>{
        if(validate.isNotEmpty(existingMembersErrorMap)){
            let errorMap = {...existingMembersErrorMap};
             delete errorMap[index];
             let tempMap ={};
           if(isRemove && validate.isNotEmpty(errorMap) && Object.keys(errorMap).length > 0){
               Object.keys(errorMap).forEach(item=>{
                   if(item < index){
                       tempMap[item]=errorMap[item];
                   }else if(item > index){
                    tempMap[item-1]=errorMap[item];
                   }
               })
           }
           if(isRemove){
            setExistingMembersErrorMap(tempMap);
           }else{
            setExistingMembersErrorMap(errorMap);
           }
             
        }
    }
    const removeErrorFromNewMemberList =(index,isRemove)=>{
        if(validate.isNotEmpty(newMembersErrorList)){
            let errorMap = {...newMembersErrorList};
             delete errorMap[index];
             let tempMap ={};
           if(isRemove && validate.isNotEmpty(errorMap) && Object.keys(errorMap).length > 0){
               Object.keys(errorMap).forEach(item=>{
                   if(item < index){
                       tempMap[item]=errorMap[item];
                   }else if(item > index){
                    tempMap[item-1]=errorMap[item];
                   }
               })
           }
           if(isRemove)
                setNewMembersErrorList(tempMap);
            else
                setNewMembersErrorList(errorMap);
        }
    }

    const clearError = () => {
        setAlertData({});
    }

    const setGenderToCustomer=(value)=>{
        let customer = {...topCustomer};
        customer.gender = value;
        setTopCustomer(customer);
    }

    const handleAddNewDetails =()=>{
        if( maxMembers <= 0 || (currentMembers < maxMembers) || (validate.isNotEmpty(newMembers) && newMembers.length > 0)){
            setActiveTab('2');
        }else{
            setAlertData({message:"Maximum members selected",type:'danger'});
        }
    }

    if(initialLoader){
        return (
            <div className="text-center w-100 mb-2">
            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
        </div>
        );
    }

    const getStateName = (stateSubName) =>{
        if(validate.isNotEmpty(memberRegions)){
            return memberRegions[stateSubName];
        }else{
            return stateSubName;
        }
    }

    const getEmailInputContent = (className) => {
        return (
            (planType === "I" || planType === "IC") && <div className={`form-group has-float-label ${className ? className : 'mb-4'}`}>
                <input ref={element => { refs.current['emailId'] = element }} name="emailId" id="emailId" maxLength="50" placeholder=" " type="text" autoComplete="off" className={validate.isEmpty(errorMsg['emailId']) ? "form-control" : `form-control is-invalid`} onFocus={handleValidation} onBlur={handleInputChange} onChange={(e) => handleOnChange(e)} value={validate.isNotEmpty(topCustomer.email) ? topCustomer.email : ""} />
                <label htmlFor="emailId" className="select-label text-capitalize">Email ID<sup className="text-danger"> *</sup></label>
                <div className="invalid-feedback">{errorMsg['emailId']}</div>
            </div>
        )
    }

    const getKYCUploadContent = () => {
        return (
            <>  
                <div className={`${subcribedMemberIds.includes(topCustomer.patientId)? "mt-3" : "my-4"} subs-register-dropdown`}>
                    {validate.isNotEmpty(topCustomer.kycType) && <label className="dropdown-label" style={{ zIndex: "1001" }}>Photo ID Proof</label>}
                    <Dropdown isOpen={photoProofType} toggle={openphotoProofType}>
                        <DropdownToggle caret color="white" className="btn-block border">
                            {topCustomer.kycType ? <React.Fragment>{topCustomer.kycType.kycName}{checkIfSelectedKyCTypeExistsInVerifiedList(topCustomer, topCustomer.kycType) ? <span>(<span className="text-success">verified</span>)</span> : <React.Fragment></React.Fragment>}</React.Fragment> : <span> Photo ID Proof</span>}
                        </DropdownToggle>
                        <DropdownMenu className="w-100">
                            <DropdownItem key={"0"} className={validate.isNotEmpty(topCustomer.kycType) ? "" : "active"} tag="a" href="javascript:void(0);" title={"Select Photo ID"} onClick={() => { updateKycType('') }}>Select Photo ID </DropdownItem>
                            {kycTypes && kycTypes.map((kycType) => {
                                return (
                                    <DropdownItem key={kycType.kycType} className={(topCustomer.kycType && topCustomer.kycType.kycType == kycType.kycType) ? "active" : ""} tag="a" href="javascript:void(0);" title={kycType.kycName} onClick={() => { updateKycType(kycType) }}>{kycType.kycName} {checkIfSelectedKyCTypeExistsInVerifiedList(topCustomer, kycType) ? <span>(<span className="text-success">verified</span>)</span> : ""}</DropdownItem>
                                )
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                {(validate.isNotEmpty(topCustomer.kycType) && !checkIfSelectedKyCTypeExistsInVerifiedList(topCustomer, topCustomer.kycType)) &&
                    <React.Fragment>
                        {/* <div className="form-group has-float-label mb-4">
                                        <input ref={element => { refs.current['photoIdNumber'] = element }}  name="photoIdNumber" id="photoIdNumber" maxLength={validate.isNotEmpty(topCustomer.kycType) && validate.isNotEmpty(photoIdInputMaxLength[topCustomer.kycType.kycType])?photoIdInputMaxLength[topCustomer.kycType.kycType] : "16"} placeholder=" " type="text" autoComplete="off" className={validate.isEmpty(errorMsg['photoIdNumber']) ? "form-control" : `form-control is-invalid`} onBlur={handleInputChange} onFocus={handleValidation} onChange={(e) => handleOnChange(e)}  value={topCustomer.kycRefNo} />
                                        <label htmlFor="photoIdNumber" className="select-label text-capitalize">Photo ID Number</label>
                                        <div className="invalid-feedback">{errorMsg['photoIdNumber']}</div>
                                    </div> */}
                        {/* <label htmlFor="file-select" className="mb-4 w-100">
                                        <button  className="btn btn-block" style={{"border-color" : "#ced4de"}} onClick={e=>{refs.current['file-select'].click()}} >{file ? topCustomer.kycType.kycName + " uploaded" : <span style={{'opacity':'0.5'}}>Upload Photo ID</span>}</button>
                                        <input ref={element=>{refs.current['file-select'] = element}}  type="file" id="file-select" name="file-select" accept="image/*" onChange={e => uploadFile(e)} onClick={(event) => { event.target.value = null }}  className={validate.isEmpty(errorMsg['file-select']) ? "d-none" : "d-none is-invalid"}/>
                                        <div className="invalid-feedback">{errorMsg['file-select']}</div>
                                    </label> */}
                        <UploadPhotoId selectedFile={file} imagePath={imagePath} kycType={topCustomer.kycType} errorMessage={errorMsg['file-select']} uploadFile={uploadFile} isDisplayProgressLoader={isDisplayProgressLoader} percentCompleted={percentCompleted} errorMsg={errorMsg && errorMsg["photoIdNumber"] ? errorMsg["photoIdNumber"] : ""} kycRefNo={topCustomer.kycRefNo} handleOnChange={handleOnChange} id="photoIdNumber"></UploadPhotoId>
                    </React.Fragment>
                }
            </>
        )
    }

    return (
        <React.Fragment>
            {alertData && <Alert alertInfo={alertData} onDurationEnd={clearError} duration={5000}/>}
            {validate.isNotEmpty(topCustomer) && <div className="subs-login-container">
                <section className="subs-login extended-subs-login">
                    <div className="content">
                        <h4 className="mb-4">
                            <span className='small d-block'>{selectedPlanId === 'I' ? "Register" : "Plan Registration for"} </span>
                            {validate.isNotEmpty(planInfo) && validate.isNotEmpty(planInfo.displayName) &&
                                            <React.Fragment>
                                                {planInfo.displayName}
                                            </React.Fragment>
                             }
                        </h4>
                        {subcribedMemberIds.includes(topCustomer.patientId) && <div className='card p-3 mb-3'> 
                            <p className="text-secondary">Primary Member Details</p>
                            {validate.isNotEmpty(topCustomer.patientName) && <h5>{topCustomer.patientName}</h5>}
                            {validate.isNotEmpty(topCustomer.gender) && <p className="mb-1"><span className="text-secondary">Gender - </span><span>{displayableGender[topCustomer.gender]}</span></p>}
                            {validate.isNotEmpty(topCustomer.dob) && <p className="mb-1"><span className="text-secondary">Date Of Birth - </span><span>{moment(new Date(topCustomer.dob.split("/")[2], topCustomer.dob.split("/")[1] - 1, topCustomer.dob.split("/")[0])).format("DD MMM, YYYY")}</span></p>}
                            {validate.isNotEmpty(topCustomerMail) ?
                                <p className="mb-1"><span className="text-secondary">Email - </span><span>{topCustomer.email}</span></p>
                                :
                                getEmailInputContent("my-2")
                            }
                            {validate.isNotEmpty(localityState.stateName) && <p className="mb-1"><span className="text-secondary">State - </span><span>{localityState.stateName}</span></p>}
                            {validate.isNotEmpty(topCustomer.kycType) && checkIfSelectedKyCTypeExistsInVerifiedList(topCustomer, topCustomer.kycType) ?
                                <>
                                    <p className="mb-0"><span className="text-secondary">Photo ID Proof - </span><span>{topCustomer.kycType.kycName}</span> (<span className="text-success small">verified</span>)</p>
                                </>
                                :
                                <>
                                    <hr className="border-bottom-0" />
                                    {getKYCUploadContent()}
                                </>
                            }
                        </div> }
                        {(!subcribedMemberIds.includes(topCustomer.patientId)) && <>
                            <div className="form-group has-float-label mb-3">
                            <input ref={element => { refs.current['name'] = element }} name="name" id="name" placeholder=" " type="text" onChange={(e) => handleOnChange(e)} onFocus={handleValidation} onBlur={handleInputChange}  maxLength={30} autoComplete="off"  className={validate.isEmpty(errorMsg['name']) ? "form-control" : "form-control is-invalid"} value={topCustomer.patientName ? validate.isNumeric(topCustomer.patientName) ? '' : topCustomer.patientName : ''} />
                                <label htmlFor="name" className="select-label">Enter your Name<sup className="text-danger"> *</sup></label>
                                <div className="invalid-feedback">{errorMsg['name']}</div>
                            </div>
                            <div className="toggle-select mb-0">
                                <p className="label-text">Gender<sup className="text-danger"> *</sup></p>
                                <div className="d-flex">
                                    <button className={topCustomer.gender == "M" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => setGenderToCustomer("M")}>Male</button>
                                    <button className={topCustomer.gender == "F" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => setGenderToCustomer("F")}>Female</button>
                                    <button className={topCustomer.gender == "O" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => setGenderToCustomer("O")}>Others</button>
                                </div>
                            </div>
                            {getKYCUploadContent()}
                            {getEmailInputContent()}
                            {/* {(planType === "I" || planType === "IC") && <div className="form-group has-float-label mb-4">
                            <input ref={element => { refs.current['emailId'] = element }} name="emailId" id="emailId" maxLength="50" placeholder=" " type="text" autoComplete="off" className={validate.isEmpty(errorMsg['emailId']) ? "form-control" : `form-control is-invalid`} onFocus={handleValidation} onBlur={handleInputChange}  onChange={(e) => handleOnChange(e)} value={validate.isNotEmpty(topCustomer.email) ? topCustomer.email : ""} />
                                <label htmlFor="emailId" className="select-label text-capitalize">Email ID<sup className="text-danger"> *</sup></label>
                                <div className="invalid-feedback">{errorMsg['emailId']}</div>
                            </div>} */}
                            <div className="form-group has-float-label mb-4">
                            <MaskedInput ref={element => { refs.current['yearOfBirth'] = element }}  autoComplete="off" maxLength={10} id="yearOfBirth"  className={`form-control ${validate.isNotEmpty(errorMsg["yearOfBirth"]) ? "is-invalid" : ''}`} type="text" mask="11/11/1111" name="yearOfBirth" placeholder=" "  onBlur={handleInputChange} onFocus={handleValidation} onChange={(e) => handleOnChange(e)} value={topCustomer.dob} />
    {/*                             <input name="yearOfBirth" id="yearOfBirth" maxLength={10} placeholder=" " type="text" autoComplete="off" className={`form-control ${validate.isNotEmpty(errorMsg["yearOfBirth"]) ? "is-invalid" : ''}`} onFocus={handleValidation} onChange={(e) => handleOnChange(e)} value={topCustomer.dob} />
    */}                            <label htmlFor="yearOfBirth" className="select-label text-capitalize">Date of Birth (DD/MM/YYYY)<sup className="text-danger"> *</sup></label>
                                <div className="invalid-feedback">{errorMsg["yearOfBirth"]}</div>
                            </div>
                            <div className="form-group has-float-label mb-3">
                                {validate.isNotEmpty(localityState.stateName) && validate.isNotEmpty(localityState.stateName) && <input name="name" id="name" placeholder=" " type="text" autoComplete="off" className={"form-control"} disabled value={localityState.stateName} />}
                                <label htmlFor="name" className="select-label">State</label>
                            </div>
                        </>}
                    

                        {(maxMembers < 0 || maxMembers > 1) && 
                            <label className="form-group form-check m-0 pointer" htmlFor="addMore">
                                <input type="checkbox" name="addMore" id="addMore" defaultChecked={isAddMembers} onClick={() => {isAddMembers && setIsFormEdit(false); setIsAddMembers(isAddMembers => !isAddMembers);}} />
                                <span className="checkmark top-0" ></span>
                                <span className="v-align-sub d-block ml-3">
                                    <strong>Add Member</strong>
                                </span>
                            </label>
                        }

                        {isAddMembers && <div className={"subs-login-container py-0"}>
                            <section className={"subs-login w-100 px-0 pt-3 pb-0 shadow-none"}>
                                <div className={"content mr-0 w-100"}>
                                    {validate.isNotEmpty(members) && members.length > 1 && 
                                        <div className="toggle-select mb-3">
                                            <div className="d-flex">
                                                <button type="button" className={activeTab == "1" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => { setActiveTab('1'); }} >Add Existing Patients</button>
                                                <button type="button" className={activeTab == "2" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => { handleAddNewDetails() }} >Add New Details</button>
                                            </div>
                                        </div>
                                    }
                                    {validate.isNotEmpty(members) && members.length > 1 && 
                                        <TabContent activeTab={activeTab}>
                                            <TabPane tabId="1" >
                                            <div className ="scroll-bookings">
                                                {isAddMembers && (activeTab === '1') && validate.isNotEmpty(members) && members.length > 0 && members.map((member, index) => {
                                                    if (index == 0) {
                                                        return <React.Fragment key={index}></React.Fragment>
                                                    } else {
                                                        return <SubscriptionMemberDetail showUploadPhotoIdButton={showUploadPhotoIdButton} isAlertShown={alertData} subcribedMemberIds = {subcribedMemberIds} setIsFormEdit={setIsFormEdit} removeErrorFromSelectedMembers={removeErrorFromSelectedMembers} errorIndex={selectedMemberIds ? selectedMemberIds.indexOf(member.patientId) : undefined} errorInfo={(selectedMemberIds && selectedMemberIds.indexOf(member.patientId) > -1) && existingMembersErrorMap ? existingMembersErrorMap[selectedMemberIds.indexOf(member.patientId)] : undefined} key={index} kycTypes={kycTypes} maxMembers={maxMembers} setBackDropLoader={setBackDropLoader} existingMembersFileList={existingMembersFileList} existingMembersImagePath={existingMembersImagePath} removeSelectedCustomer={removeSelectedCustomer} setSelectedMembersIntoState={setSelectedMembersIntoState} currentEditMember={currentEditMember} relations={relations} member={member} isSelected={(selectedMemberIds && selectedMemberIds.indexOf(member.patientId) > -1)} index={index} setCurrentEditMember={setCurrentEditMember} currentMembers={currentMembers} deleteMember={deleteMember} />
                                                    }
                                                })}
                                                </div>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                {isAddMembers && (activeTab === '2') && 
                                                <React.Fragment>
                                                <AddNewMemberDetail subcribedMemberIds={subcribedMemberIds} setIsFormEdit={setIsFormEdit} maxMembers={maxMembers} currentMembers={currentMembers} removeErrorFromNewMemberList={removeErrorFromNewMemberList} errorMap={newMembersErrorList} newMembersFileList={newMembersFileList} newMembersImagePathList={newMembersImagePathList} relations={relations} kycTypes={kycTypes} newMembers={newMembers} addNewCustomer={addNewMember} removeCustomer={removeNewCustomer} />
                                                </React.Fragment>}
                                            </TabPane>
                                        </TabContent>
                                    }
                                    {isAddMembers && (validate.isEmpty(members) || members.length <= 1) && <AddNewMemberDetail subcribedMemberIds={subcribedMemberIds} setIsFormEdit={setIsFormEdit} maxMembers={maxMembers} currentMembers={currentMembers} removeErrorFromNewMemberList={removeErrorFromNewMemberList} errorMap={newMembersErrorList}  newMembersFileList={newMembersFileList} newMembersImagePathList={newMembersImagePathList} relations={relations} kycTypes={kycTypes} newMembers={newMembers} addNewCustomer={addNewMember} removeCustomer={removeNewCustomer} />}
                                </div>
                            </section>
                        </div>}
                        {<hr className="solid my-3"/>}                 
                        <div className="w-100">
                            <div className='mb-3'>
                                <label className="form-group form-check m-0 pointer" htmlFor="termsandConditions">
                                    <input type="checkbox" name="termsandConditions" id="termsandConditions" defaultChecked={isConditions} onClick={() => {  setIsConditions(!isConditions); }} />
                                    <span className="checkmark top-0" ></span>
                                    <span className="v-align-sub d-block ml-3">
                                       I have read and agree to the <Link to={`${DIAGNOSTICS_URL_PREFIX}/tnc`} title='Terms and Conditions' target="_blank"  role="link">Terms and Conditions</Link>
                                    </span>
                                </label>
                            </div>
                            <div className='row w-100 mx-0 flex-row-reverse'>
                                <div className="col pl-1 pr-0">
                                    <button className="btn btn-brand-gradient btn-block rounded-pill custom-btn-lg" disabled={isRegisterLoading || disableRegister} onClick={register}>
                                        {isRegisterLoading ? "" : "Register"}
                                        {isRegisterLoading &&
                                            <React.Fragment>
                                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                                <span className="sr-only"></span>
                                            </React.Fragment>
                                        }
                                    </button>
                                </div>
                                <div className="col-6 pr-1 pl-0"><button className="btn brand-secondary btn-block rounded-pill custom-btn-lg" disabled={isRegisterLoading} onClick={() => props.history.goBack()}>Cancel</button></div>
                            </div>
                           
                        </div>
                    </div>
                    <div className="mt-4 pt-4">
                        <img src={SubsLoginIcon} title="Add a Member" alt="Add a Member" />
                        <p className='mb-0'>Note :</p>
                        <span className='font-12'>All Fields Are Mandatory Except Photo ID Proof</span>
                    </div>
                </section>
            </div>}
        </React.Fragment>
    );
}

export default SubscriptionMembers;