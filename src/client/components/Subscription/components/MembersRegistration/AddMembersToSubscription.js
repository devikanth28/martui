import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { TabContent, TabPane } from 'reactstrap';
import dateFormat from 'dateformat';
import SubscriptionService from '../../services/SubscriptionService';
import ImageProcessService, { IMAGE_TYPE_PRESCRIPTION } from '../../../../services/ImageProcessService';
import {SET_MEMBER_LIST, SET_PLAN, SAVE_SUBSCRIPTION_ID} from '../../redux/SubscriptionReducer';
import Validate from '../../../../helpers/Validate';
import DateValidator from '../../../../helpers/DateValidator';
import Alert from '../../../Common/Alert';
import AddNewMemberDetail from "./AddNewMemberDetail";
import SubscriptionMemberDetail from './SubscriptionMemberDetail';
import { MEDPLUS_ADVANTAGE_URL_PREFIX } from "../../constants/SubscriptionConstants";

const AddMembersToSubscription = (props) => {
    const validate = Validate();
    const dateValidator= DateValidator();
    const dispatch = useDispatch();
    const subscriptionService = SubscriptionService();
    const [members,setMembers] = useState(undefined);
    const [kycTypes,setKycTypes] = useState(undefined);
    const [relations,setRelations] = useState(undefined);
    const [selectedMemberIds,setSelectedMemberIds] = useState(undefined);
    const [selectedMembers,setSelectedMembers] = useState(undefined);
    const [activeTab,setActiveTab]=useState('2');
    const [initialLoader,setInititalLoader] =useState(true);
    const [newMembers,setNewMembers] =useState(undefined);
    const [alertData, setAlertData] = useState({});
    const [showRetry,setShowRetry] =useState(false);
    const [backDropLoader,setBackDropLoader]=useState(false);
    const subscription = props.subscription;
    const [newMembersImagePathList,setNewMembersImagePathList]=useState(undefined);
    const [newMembersFileList,setNewMembersFileList]=useState(undefined);
    const [existingMembersFileList,setExistingMembersFileList]=useState(undefined);
    const [existingMembersImagePath,setExistingMembersImagePath]=useState(undefined);
    const [currentMembers,setCurrentMembers] = useState(props.existingMembersCount);
    const [maxMembers,setMaxMembers] = useState(-1);
    const [hideFooter,setHideFooter]=useState(false);
    const [newMembersErrorList,setNewMembersErrorList]=useState({});
    const [existingMembersErrorMap,setExistingMembersErrorMap]=useState({});
    const [currentEditMember,setCurrentEditMember]= useState(undefined);
    const [subcribedMemberIds , setSubcribedMemberIds] = useState([])

    const selectedMembersFromRedux = useSelector(state=>{
        if(validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.members)){
            return state.subscription.members;
        }
    });

    const changeDateOfBirthOfMembers=(members)=>{
        members.map((member)=>{
            if(validate.isNotEmpty(member) && validate.isNotEmpty(member.dob)){
                member.dob = dateValidator.getDateFormat(member.dob);
            }
        })
    }
    useEffect( ()=>{
          if(validate.isEmpty(subscription) || validate.isEmpty(subscription.id)){
            props.history.goBack();
        } 
        if(validate.isNotEmpty(selectedMembersFromRedux)){
            setSelectedMemberIds(selectedMembersFromRedux);
        }
        setInititalLoader(true);
        subscriptionService.getPlanDetails({planId:subscription.plan.id}).then(data=>{
            if("SUCCESS" === data.statusCode && validate.isNotEmpty(data.dataObject)){
                setMaxMembers(data.dataObject.maxMembers);
            }else{
                setAlertData({message:"please select plan before adding members",type:'danger'});
                setTimeout(()=>props.history.goBack(),2000);
            }
        });
       
        subscriptionService.getMembersForCustomer({subcriptionId:subscription.id,subscribedMembers:true}).then(data=>{
            if(data && "SUCCESS" == data.statusCode && data.dataObject){
               if(validate.isNotEmpty(data.dataObject.members)){
                   let members = [...data.dataObject.members]
                   changeDateOfBirthOfMembers(members);
                   setMembers(members);
                   if(validate.isNotEmpty(selectedMembersFromRedux)){
                    checkAndSetMembersInState(members,selectedMembersFromRedux);
                    } 
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
        });
    },[]);

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

   

    const addNewMember=(member,file,imagePath)=>{
        let membersList =[];
        let imagePathList=[];
        let imagefileList=[];
        if(newMembers){
            membersList=[...newMembers];
            imagePathList=[...newMembersImagePathList];
            imagefileList=[...newMembersFileList];
        }
        membersList.push(member);
        imagePathList.push(imagePath);
        imagefileList.push(file);
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
   
    const removeErrorFromSelectedMembers=(index)=>{
        if(validate.isNotEmpty(existingMembersErrorMap)){
            let errorMap = {...existingMembersErrorMap};
             delete errorMap[index];
             setExistingMembersErrorMap(errorMap);
        }
    }
    const removeErrorFromNewMemberList =(index)=>{
        if(validate.isNotEmpty(newMembersErrorList)){
            let errorMap = {...newMembersErrorList};
             delete errorMap[index];
             setNewMembersErrorList(errorMap);
        }

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
        if(validate.isNotEmpty(existingMembersErrorMap) || validate.isNotEmpty(newMembersErrorList)){
            return;
        }
        setBackDropLoader(true);
        let startPoint =0;
        let endPoint =0;
        let imageUploadFileList = [];
        
        let selectedMembersList =[]
        if(selectedMembers && selectedMembers.length > 0  ){
            selectedMembersList=JSON.parse(JSON.stringify(selectedMembers));//used for deep copy the state member list to change the format of date
            selectedMemberIds.map((eachId,index)=>{
                if(validate.isNotEmpty(existingMembersFileList) && existingMembersFileList[eachId] && !checkIfSelectedKyCTypeExistsInVerifiedList(selectedMembersList[index],selectedMembersList[index].kycType))
                    imageUploadFileList.push(existingMembersFileList[eachId]);
            })
        }
        endPoint = imageUploadFileList.length;
         let newMembersList =[]
         if(newMembers && newMembers.length > 0){
            newMembersList = JSON.parse(JSON.stringify(newMembers));
            imageUploadFileList=[...imageUploadFileList,...newMembersFileList];
         }
         let imageUploadStatus = true;
         if(imageUploadFileList && imageUploadFileList.length > 0){
            
            await ImageProcessService().uploadFilesToImageServer(imageUploadFileList, "K", {}).then(data => {
                if ("SUCCESS" == data.statusCode && data.response) {
                    
                    data.response.map((eachResponse,index)=>{
                        
                        if(index >= startPoint && index < endPoint){
                            if(validate.isNotEmpty(existingMembersFileList) && existingMembersFileList[selectedMemberIds[index-startPoint]] && !checkIfSelectedKyCTypeExistsInVerifiedList(selectedMembersList[index],selectedMembersList[index].kycType)){
                                selectedMembersList[index-startPoint].imageFile = eachResponse;
                            }
                        }
                        if(index >= endPoint){
                            newMembersList[index-endPoint].imageFile = eachResponse;
                        }
                    })
                   
                   
                } else {
                    imageUploadStatus= false;
                    setBackDropLoader(false);
                    setAlertData({ message: "unable to upload images", type: 'danger' });
                }
            })
        }
        
        
        if(!imageUploadStatus){
            return;
        }
        let allCustomers =[];
        
            if(selectedMembersList){
                allCustomers=[...allCustomers,...selectedMembersList];
            }
            if(newMembersList){
                allCustomers=[...allCustomers,...newMembersList];
            }
           
        
        allCustomers.map(customer=>{
            if(validate.isNotEmpty(customer.dob)){
                customer.dob=dateValidator.getDateObject(customer.dob);
            }
            if(!checkIfSelectedKyCTypeExistsInVerifiedList(customer,customer.kycType)){
                prepareKycObjectAndSaveIntoMember(customer);
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
                let subscriptionIdsForRedux = useSelector(state => {
                    if (validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.subscriptionId)) {
                        return state.subscription.subscriptionId;
                    } else {
                        return {}
                    }
                });
                dispatch({ type: SAVE_SUBSCRIPTION_ID, data: { ...subscriptionIdsForRedux, [subscription.benefitType]: subscription.id } });
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
                            if(selectedMemberIds && index <= selectedMemberIds.length){
                                selectedMembersErrorMap[index]= data.dataObject[index][0];
                            }
                            if((selectedMemberIds && index > selectedMemberIds.length) || (!selectedMemberIds && index > 0)){
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
        selectedMembersFromState.push(customer);
        selectedMemberIdsFromState.push(customer.patientId);
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
    const checkAndSetMembersInState=(members,selectedMembers)=>{
        let selectedMembersList = [];
        selectedMembers.forEach(memberId=>{
            members.every(member=>{
                if(memberId == member.patientId){
                    selectedMembersList.push(member);
                    return false;
                }
                return true;
            });
        });
        setSelectedMembers(selectedMembersList);
    }
    const clearError = () => {
        setAlertData({});
    }    

    const handleAddNewDetails =()=>{
        if(maxMembers < 0 || (currentMembers < maxMembers)){
            setActiveTab('2');
        }else{
            setAlertData({message:"maximum members selected",type:'danger'});
        }
    }

    /* if(showRetry) {
        return (
            <NoConnectionLodable history={props.history} location={props.location} />
        );
    } */

    return <React.Fragment>
        {alertData && <Alert alertInfo={alertData} onDurationEnd={clearError} duration={5000} />}
        <div className={"subs-login-container pt-4 w-100"}>
            <section className={"subs-login p-0 shadow-none w-100"}>
                <div className={"content mr-0"}>
                    {members && members.length > 0 && <div className="toggle-select mb-3">
                        <div className="d-flex">
                            <button type="button" className={activeTab == "1" ? "btn btn-badge active" : "btn btn-badge"}
                                onClick={() => { setActiveTab('1') }}
                            >Add Existing Patients</button>

                            <button type="button"
                                className={activeTab == "2" ? "btn btn-badge active" : "btn btn-badge"}
                                onClick={() => { setActiveTab('2') }}
                            >Add New Details</button>
                        </div>
                    </div>}
                    {validate.isNotEmpty(members) && members.length > 0 && <TabContent activeTab={activeTab}>
                        <TabPane tabId="1" >
                            {(activeTab === '1') && validate.isNotEmpty(members) && members.length > 0 && members.map((member, index) => {
                                return <SubscriptionMemberDetail subcribedMemberIds ={subcribedMemberIds} setBackDropLoader={setBackDropLoader} existingMembersFileList={existingMembersFileList} existingMembersImagePath={existingMembersImagePath} removeCurrentEditMember={removeCurrentEditMember} setCurrentEditMembersIntoState={setCurrentEditMembersIntoState} currentMember={currentEditMember} relations={relations} member={member} isSelected={(selectedMemberIds && selectedMemberIds.indexOf(member.patientId) > -1)} removeSelectedCustomer={removeSelectedCustomer} setSelectedMembersIntoState={setSelectedMembersIntoState} index={index} />

                            })}
                            {(activeTab === '1') && validate.isNotEmpty(members) && members.length > 0 && <div class="row w-100 mt-4 mx-0">
                                <div class="col-6 pl-1"><button class="btn  brand-secondary custom-btn-lg rounded-pill  btn-block" onClick={() => props.history.goBack()}> Cancel</button></div>
                                <div class="col pr-1"><button class="btn  btn-brand-gradient custom-btn-lg rounded-pill btn-block" onClick={register}> Register</button></div>
                            </div>}
                        </TabPane>
                        <TabPane tabId="2">
                            {(activeTab === '2') && <AddNewMemberDetail subcribedMemberIds={subcribedMemberIds} newMembersFileList={newMembersFileList} newMembersImagePathList={newMembersImagePathList} relations={relations} kycTypes={kycTypes} setHideFooter={setHideFooter} hideFooter={hideFooter} newMembers={newMembers} addNewCustomer={addNewMember} removeCustomer={removeNewCustomer} />}
                            {(activeTab === '2') && <div class="row w-100 mt-4 mx-0">
                                <div class="col-6 pl-1"><button class="btn btn-block brand-secondary rounded-pill custom-btn-lg" onClick={() => props.history.goBack()}> Cancel</button></div>
                                <div class="col pr-1"><button class="btn  btn-brand-gradient rounded-pill custom-btn-lg btn-block" onClick={register}> Register</button></div>
                            </div>}
                        </TabPane>
                    </TabContent>}
                    {(validate.isEmpty(members) || members.length <= 0) && <React.Fragment> <AddNewMemberDetail subcribedMemberIds={subcribedMemberIds} newMembersFileList={newMembersFileList} newMembersImagePathList={newMembersImagePathList} relations={relations} kycTypes={kycTypes} setHideFooter={setHideFooter} hideFooter={hideFooter} newMembers={newMembers} addNewCustomer={addNewMember} removeCustomer={removeNewCustomer} />
                        <div class="row w-100 mt-4 mx-0">
                            <div class="col-6 pl-1"><button class="btn  brand-secondary rounded-pill custom-btn-lg btn-block" onClick={() => props.history.goBack()}> Cancel</button></div>
                            <div class="col pr-1"><button class="btn  btn-brand-gradient rounded-pill custom-btn-lg btn-block" onClick={register}> Register</button></div>
                        </div>
                    </React.Fragment>}
                </div>

            </section>


        </div>

    </React.Fragment>
}

export default AddMembersToSubscription;