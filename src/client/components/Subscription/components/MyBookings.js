import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Fade} from 'reactstrap';
import SubsLoginIcon from "../../../images/common/Subscriptions-amico.svg"
import { useDispatch } from "react-redux";
import dateFormat from 'dateformat';
import SubscriptionMemberDetail from './MembersRegistration/SubscriptionMemberDetail';
import Alert,{ALERT_TYPE_SUCCESS} from '../../Common/Alert';
import { SAVE_SUBSCRIPTION_ID, SET_MEMBER_LIST, SET_PLAN } from '../redux/SubscriptionReducer';
import ImageProcessService from '../../../services/ImageProcessService';
import AddNewMemberDetail from './MembersRegistration/AddNewMemberDetail';
import SubscriptionService from '../services/SubscriptionService';
import Validate from '../../../helpers/Validate';
import DateValidator from '../../../helpers/DateValidator';
import UserInfoAction from '../../../../redux/action/UserInfoAction';
import { MEDPLUS_ADVANTAGE_URL_PREFIX } from '../constants/SubscriptionConstants';



const MyBookings = (props) => {
    const validate = Validate();
    const dateValidator = DateValidator();
    const userInfoAction = UserInfoAction();
    const source = props.source ? props.source : null;
    const dispatch = useDispatch();

    let showimage = validate.isNotEmpty(props.dispayImage) ? props.dispayImage : true;
    let showfooter = props.showfooter ? props.showfooter : true;
    const [activeTab, setActiveTab] = useState('1');
    const [ showMemberList, setShowMemberList] = useState(props.showMemberList ? props.showMemberList : false)
    const [newMembers,setNewMembers] =useState(undefined);
    const [kycTypes,setKycTypes] =useState(undefined);
    const [showButtons, toggleShowButtons] = useState(true);
    const subscription = props.subscription;
    const [selectedMemberIds,setSelectedMemberIds]=useState(undefined);
    const [selectedMembers,setSelectedMembers]=useState(undefined);
    const subscriptionService  = SubscriptionService();
    const [initialLoader,setInititalLoader] =useState(true);
    const [alertData, setAlertData] = useState({});
    const [maxMembers,setMaxMembers] = useState(-1);
    const [members,setMembers]=useState(undefined);
    const [relations,setRelations]=useState(undefined);
    const [addMemberFee,setAddMemberFee]= useState(0.00);
    const [addMemberMrp,setAddMemberMrp]= useState(0.00);
    const [tenureDisplay, setTenureDisplay]= useState(undefined);
    const [newMembersImagePathList,setNewMembersImagePathList]=useState([]);
    const [newMembersFileList,setNewMembersFileList]=useState([]);
    const [backDropLoader,setBackDropLoader]=useState(false);
    const [existingMembersFileList,setExistingMembersFileList]=useState({});
    const [existingMembersImagePath,setExistingMembersImagePath]=useState({});
    const [currentEditMember,setCurrentEditMember]= useState(undefined);
    const [newMembersErrorList,setNewMembersErrorList]=useState({});
    const [existingMembersErrorMap,setExistingMembersErrorMap]=useState({});
    const [currentMembers,setCurrentMembers] = useState(props.existingMembersCount);
    const [isFormEdit, setIsFormEdit] = useState(false); //maintains form completion state 
    const [subcribedMemberIds, setSubcribedMemberIds] = useState([])
    const [showUploadPhotoIdButton, setShowUploadPhotoIdButton] = useState([]);

    if (showimage == undefined) {
        showimage = true
    }
    if (showfooter == undefined) {
        showfooter = true
    }
   

    useEffect(()=>{
        let totalMembers =props.existingMembersCount;
        if(selectedMemberIds && selectedMemberIds.length > 0){
            totalMembers = totalMembers+selectedMemberIds.length;
        }
        if(newMembers && newMembers.length > 0){
            totalMembers= totalMembers+newMembers.length;
        }
        setCurrentMembers(totalMembers);

    },[selectedMemberIds,newMembers]);

    const changeDateOfBirthOfMembers = (members, kycTypes, subcribedMemberIds)=>{
        members.map((member)=>{
            if(validate.isNotEmpty(member) && validate.isNotEmpty(member.dob))
                member.dob = dateValidator.getDateFormat(member.dob);
            else
                member.dob = "";
            if(validate.isNotEmpty(member) && validate.isNotEmpty(member.verifiedKycTypes) && member.verifiedKycTypes.length > 0){
                let listOfVerifiedKycCustomers = member.verifiedKycTypes;
                kycTypes.every(kycType=>{
                    if(listOfVerifiedKycCustomers[0]===kycType.kycType){
                        member.kycType =kycType;
                        return false;
                    }
                    return true;
                })
                
            }
        });
        
    }

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
        toggleShowButtons(true);
    }

  

    useEffect( ()=>{
        if( (validate.isEmpty(subscription) || validate.isEmpty(subscription.id))){
          props.history.goBack();
        } 
        
        setInititalLoader(true);
        subscriptionService.getSubscriptionPlanDetails({ planId: subscription.plan.id, verifyMembershipConfig : false}).then(data=>{
            if("SUCCESS" === data.statusCode && validate.isNotEmpty(data.dataObject)){
                setMaxMembers(data.dataObject.maxMembers);
                let planDetails= data.dataObject.planDetails;
                if(validate.isNotEmpty(planDetails.fees) && validate.isNotEmpty(planDetails.fees[1])) {
                    setAddMemberFee(parseInt(planDetails.fees[1].price));
                    setAddMemberMrp(parseInt(planDetails.fees[1].mrp));
                    setTenureDisplay(planDetails.tenureDisplay);
                }
            }else{
                setAlertData({message:"please select plan before adding members",type:'danger'});
                setTimeout(()=>props.history.goBack(),2000);
            }
        });
        
        subscriptionService.getMembersForCustomer({subcriptionId:subscription.id,subscribedMembers:true}).then(data=>{
            if(data && "SUCCESS" == data.statusCode && data.dataObject){
                if(validate.isNotEmpty(data.dataObject.members)){
                    let members = [...data.dataObject.members]
                    changeDateOfBirthOfMembers(members, data.dataObject.kycTypes, data.dataObject.suscribedMemberIds ? data.dataObject.suscribedMemberIds : []);
                    setMembers(members);
                    let suscribedMemberIds = data.dataObject.suscribedMemberIds ? data.dataObject.suscribedMemberIds : [];
                    setShowUploadPhotoIdButton(data.dataObject.members.filter((each) => suscribedMemberIds.includes(each.patientId) && validate.isEmpty(each.verifiedKycTypes)).map(each => each.patientId))
                    setActiveTab('1');
                }
                if (validate.isNotEmpty(data.dataObject.suscribedMemberIds))
                    setSubcribedMemberIds(data.dataObject.suscribedMemberIds)
                if(validate.isNotEmpty(data.dataObject.kycTypes))
                    setKycTypes(data.dataObject.kycTypes);
                if(validate.isNotEmpty(data.dataObject.relations))
                    setRelations(data.dataObject.relations);
                
            } else if("NO_MEMBERS_FOUND" == data.message){
                if (validate.isNotEmpty(data.dataObject.kycTypes))
                    setKycTypes(data.dataObject.kycTypes);
                if (validate.isNotEmpty(data.dataObject.relations))
                    setRelations(data.dataObject.relations);
                
            }else{
                setShowRetry(true);
            }
            setInititalLoader(false);
            window.scrollTo({top : 0, left : 0, behavior : "smooth"});
        });
    },[]);

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

    const checkIfSelectedKyCTypeExistsInVerifiedList =(customer,kycType)=>{
        let listOfVerifiedKycCustomers = customer.verifiedKycTypes;
        let isExist = false;
        if(validate.isNotEmpty(listOfVerifiedKycCustomers) && listOfVerifiedKycCustomers.length > 0){
            listOfVerifiedKycCustomers.every((type)=>{
                if(type === kycType.kycType){
                    isExist= true;
                    return false;
                }
                return true;

            });
            return isExist;
        }

    }

    
    const register=async ()=>{
        if(currentMembers <= props.existingMembersCount){
            setAlertData({message:"please add or select members",type:"danger"});
            return;
        }
        if(isFormEdit){
            setAlertData({message:`Please save or cancel pending member details`,type:'danger'});
            return;
        }
        if(validate.isNotEmpty(existingMembersErrorMap) || validate.isNotEmpty(newMembersErrorList)){
            return;
        }
        setBackDropLoader(true);
        
        let selectedMembersList =[]
        if(selectedMembers && selectedMembers.length > 0  ){
            selectedMembersList=JSON.parse(JSON.stringify(selectedMembers));//used for deep copy the state member list to change the format of date
           
        }
         let newMembersList =[]
         if(newMembers && newMembers.length > 0){
            newMembersList = JSON.parse(JSON.stringify(newMembers));
         }
       
       
        let allCustomers =[];
        
            if(selectedMembersList){
                selectedMembersList.map(selectedMember => {
                    delete selectedMember.kycs;
                })
                allCustomers=[...allCustomers,...selectedMembersList];
            }
            if(newMembersList){
                allCustomers=[...allCustomers,...newMembersList];
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
        object['planId']=subscription.plan.id;
        object['membersList']=JSON.stringify(allCustomers);
        object['subscriptionId']=subscription.id;
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
        subscriptionService.saveMembersForPlan(object).then(data=>{
            if("SUCCESS" == data.statusCode){
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
                dispatch({ type: SAVE_SUBSCRIPTION_ID, data: subscription.id });
                dispatch({type:SET_PLAN,data:subscription.plan.id});
                dispatch({type:SET_MEMBER_LIST,data:memberIdsForRedux});
                props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/payment`);
            }else{
                if(validate.isNotEmpty(data.dataObject)){
                    if("MEMBERS_ERROR" === data.message){
                        const keys = Object.keys(data.dataObject);
                        let selectedMembersErrorMap = {};
                        let newMembersErrorList={};
                        keys.map(index =>{
                            if(selectedMemberIds && index < selectedMemberIds.length){
                                selectedMembersErrorMap[index]= data.dataObject[index][0];
                            }
                            if((selectedMemberIds && index >= selectedMemberIds.length) || (!selectedMemberIds && index >= 0)){
                                let length = (selectedMemberIds)?selectedMemberIds.length:0;
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
                  setBackDropLoader(false);
                }else{
                    setAlertData({message: 'Unable to save details' , type : "danger"});
                    setBackDropLoader(false);
                }
            }
        })

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


    const removeSelectedCustomer=(customer)=>{
        let indexToRemove =selectedMemberIds.indexOf(customer.patientId);
        if(indexToRemove >= 0){
            let selectMemberIdsFromState = [...selectedMemberIds];
            let selectMembersFromState=[...selectedMembers];
            selectMembersFromState.splice(indexToRemove,1);
            selectMemberIdsFromState.splice(indexToRemove,1);
            setSelectedMembers(selectMembersFromState);
            setSelectedMemberIds(selectMemberIdsFromState);
        }
    }

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


    const clearError = () => {
        setAlertData({});
    }
    const handleAddNewDetails =()=>{
        if( maxMembers <= 0 || (currentMembers < maxMembers) || (validate.isNotEmpty(newMembers) && newMembers.length > 0)){
            setActiveTab('2');
        }else{
            setAlertData({message:"Maximum members selected",type:'danger'});
        }
    }
    
    const deleteMember = (mId) =>{
        if(validate.isNotEmpty(mId)){
            subscriptionService.deleteMember({memberId:mId,subscriptionId:subscription.id}).then(data=>{
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
                    setActiveTab('1');
                    setAlertData({ message: "Member deleted successfully", type: ALERT_TYPE_SUCCESS });
                }else{
                    setAlertData({ message: "Unable to delete member", type: 'danger' });
                }
            })
        }
    }

    return (
        <React.Fragment>
            {alertData && <Alert alertInfo={alertData} onDurationEnd={clearError} duration={5000} />}
            { source != "myAccountSection" &&  <React.Fragment>
                {(maxMembers <=0 || props.existingMembersCount < maxMembers) && <label className="form-group form-check m-0 pointer" for="addMore">
                    <input type="checkbox" name="addMore" id="addMore"  checked = {showMemberList} onChange= {() =>  {setShowMemberList(!showMemberList);}} />
                    <span className="checkmark" ></span>
                </label>}
                </React.Fragment>
            }
           

            { showMemberList && <div className={source == 'Register' ? "subs-login-container py-0" : source == "myAccountSection" ? "subs-login-container py-0 w-100" : "subs-login-container"}>
                <section className={source == 'Register' ? "subs-login w-100 px-0 pt-3 pb-0 shadow-none" : source == "myAccountSection" ? "subs-login px-3 shadow-none w-100" : "subs-login"}>
                    <div className={source == 'Register' ? "content mr-0 w-100 mb-n3" : source == 'myAccountSection' ? "content mr-0" : "content"}>
                        
                         {((source !== 'Register') && (source !== 'myAccountSection')) && <React.Fragment>
                            <h4 className="mb-3">Add a Member</h4>
                            </React.Fragment>} 
                        {validate.isNotEmpty(members) && members.length > 0 && <div className="toggle-select mb-3">
                            <div className="d-flex">
                                <button type="button" className={activeTab == "1" ? "btn btn-badge active" : "btn btn-badge"}
                                    onClick={() => { toggle('1'); }}
                                >Existing Patients</button>

                                <button type="button"
                                    className={activeTab == "2" ? "btn btn-badge active" : "btn btn-badge"}
                                    onClick={() => { handleAddNewDetails() }}
                                >Add New Details</button>
                            </div>
                        </div>}
                        {validate.isNotEmpty(members) && members.length > 0 && <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <div className={props.source == 'myAccountSection' ? 'addmember-popover':" "}>
                                    {showMemberList && (activeTab === '1') && validate.isNotEmpty(members) && members.length > 0 && members.map((member, index) => {
                                        if ((validate.isEmpty(member.relationship) || member.relationship.name != "Self") && !subscription.members.includes(member)) {
                                            return <SubscriptionMemberDetail showUploadPhotoIdButton={showUploadPhotoIdButton} subcribedMemberIds={subcribedMemberIds} source={props.source == 'myAccountSection'} setIsFormEdit={setIsFormEdit} currentEditMember={currentEditMember} setCurrentEditMember={setCurrentEditMember} removeErrorFromSelectedMembers={removeErrorFromSelectedMembers} errorIndex={selectedMemberIds ? selectedMemberIds.indexOf(member.patientId) : undefined} errorInfo={(selectedMemberIds && selectedMemberIds.indexOf(member.patientId) > -1) && existingMembersErrorMap ? existingMembersErrorMap[selectedMemberIds.indexOf(member.patientId)] : undefined} maxMembers={maxMembers} currentMembers={currentMembers} setBackDropLoader={setBackDropLoader} existingMembersFileList={existingMembersFileList} existingMembersImagePath={existingMembersImagePath} relations={relations} member={member} isSelected={(selectedMemberIds && selectedMemberIds.indexOf(member.patientId) > -1)} removeSelectedCustomer={removeSelectedCustomer} setSelectedMembersIntoState={setSelectedMembersIntoState} index={index} kycTypes={kycTypes} deleteMember={deleteMember}/>
                                        }
                                    })}
                                </div>
                                {showfooter && showButtons && <div class="row w-100 mt-4 mx-0">
                                    <div class="col-6 pl-1"><button class="btn  btn-light  btn-block" onClick={() => { props.handleCancel() }}> Cancel</button></div>
                                    <div class="col pr-1"><button class="btn  btn-brand btn-block" onClick={register}> 
                                    
                                    {backDropLoader ? "" : "Submit"}
                                    {backDropLoader &&
                                        <React.Fragment>
                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                            <span className="sr-only"></span>
                                        </React.Fragment>
                                    }
                                    
                                    </button></div>
                                </div>}
                            </TabPane>
                            <TabPane tabId="2">
                                {(activeTab === '2') &&  <AddNewMemberDetail showUploadPhotoIdButton ={showUploadPhotoIdButton} subcribedMemberIds={subcribedMemberIds} setIsFormEdit={setIsFormEdit} maxMembers={maxMembers} currentMembers={currentMembers} removeErrorFromNewMemberList={removeErrorFromNewMemberList} errorMap={newMembersErrorList} setShowRegisterBtn={toggleShowButtons} newMembersFileList={newMembersFileList} newMembersImagePathList={newMembersImagePathList} relations={relations} kycTypes={kycTypes} newMembers={newMembers} addNewCustomer={addNewMember} removeCustomer={removeNewCustomer} />}
                                <hr className="solid"/>
                                {showButtons && <div class="row w-100 mt-4 mx-0">
                                    <div class="col-6 pl-1"><button class="btn  btn-light  btn-block rounded-pill" onClick={() => { props.handleCancel() }}> Cancel</button></div>
                                    <div class="col pr-1"><button class="btn  btn-brand btn-block rounded-pill" onClick={register}> 
                                    {backDropLoader ? "" : "Submit"}
                                    {backDropLoader &&
                                        <React.Fragment>
                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                            <span className="sr-only"></span>
                                        </React.Fragment>
                                    }</button></div>
                                </div>}
                            </TabPane>
                        </TabContent>}
                        {(validate.isEmpty(members) || members.length <= 0) &&<React.Fragment> 
                                <AddNewMemberDetail subcribedMemberIds={subcribedMemberIds} setIsFormEdit={setIsFormEdit} maxMembers={maxMembers} currentMembers={currentMembers} removeErrorFromNewMemberList={removeErrorFromNewMemberList} errorMap={newMembersErrorList} setShowRegisterBtn={toggleShowButtons} newMembersFileList={newMembersFileList} newMembersImagePathList={newMembersImagePathList} relations={relations} kycTypes={kycTypes} newMembers={newMembers} addNewCustomer={addNewMember} removeCustomer={removeNewCustomer} source = {props.source}/> 
                                <hr className="solid"/>
                                { <div class="row w-100 mt-4 mx-0">
                                    <div class="col-6 pl-1"><button class="btn  btn-light  btn-block rounded-pill" onClick={() => { props.handleCancel() }}> Cancel</button></div>
                                    <div class="col pr-1"><button class="btn  btn-brand btn-block rounded-pill" onClick={register}> {backDropLoader ? "" : "Submit"}
                                    {backDropLoader &&
                                        <React.Fragment>
                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                            <span className="sr-only"></span>
                                        </React.Fragment>
                                    }</button></div>
                                </div>}
                        </React.Fragment>}
                    </div>
                    {showimage && <div className="mt-4 pt-4">
                        <img src={SubsLoginIcon} title="Add a Member" alt="Add a Member" />
                    </div>}
                </section>
            </div>}

        </React.Fragment>
    )
}
export default MyBookings;