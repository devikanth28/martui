import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Fade} from 'reactstrap';
import Validate from '../../helpers/Validate';
import PatientForm from './Patientform';
import SubsLoginIcon from "../../images/common/Subscriptions-amico.svg"
import SubscriptionService from '../Subscription/services/SubscriptionService';
import { useSelector } from "react-redux";
import AddNewMemberDetail from '../Subscription/components/MembersRegistration/AddNewMemberDetail';
import { SubscriptionBenefitType } from '../Subscription/constants/SubscriptionConstants';


const MyBookings = (props) => {
    const validate = Validate();
    let source = props.source

    let showimage = props.dispayImage ? props.dispayImage : true;
    let showfooter = props.showfooter ? props.showfooter : true;
    const [activeTab, setActiveTab] = useState('1');
    const [openpatientform, setPatientForm] = useState({})
    const [checkActive, setCheckActive] = useState({})
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [ showMemberList, setShowMemberList] = useState(false)
    const [newMembers,setNewMembers] =useState(undefined);
    const [kycTypes,setKycTypes] =useState(undefined);
    const [subcribedMemberIds, setSubcribedMemberIds] = useState([])
    const subscription = props.subscription
    const [selectedMemberIds,setSelectedMemberIds]=useState(undefined);
    const [selectedMembers,setSelectedMembers]=useState(undefined);
    const subscriptionService  = SubscriptionService();
    const [initialLoader,setInititalLoader] =useState(true);
    const [alertData, setAlertData] = useState({});
    const [maxMembers,setMaxMembers] = useState(-1);
    const [members,setMembers]=useState(undefined);
    const [relations,setRelations]=useState(undefined);
    const [addMemberFee,setAddMemberFee]= useState(0.00);
    const [newMembersImagePathList,setNewMembersImagePathList]=useState([]);
    const [newMembersFileList,setNewMembersFileList]=useState([]);

    if (showimage == undefined) {
        showimage = true
    }
    if (showfooter == undefined) {
        showfooter = true
    }

    const changeDateOfBirthOfMembers=(members)=>{
        members.map((member)=>{
            if(validate.isNotEmpty(member) && validate.isNotEmpty(member.dob)){
                member.dob = getDateFormat(member.dob);
            }
        })
    }

    const getDateFormat=(dateObject)=>{
        try{
            let date= new Date(dateObject);
            let month = date.getMonth()+1
            if(month <= 9){
                month= `0${month}`
            }
            return month + "/" + date.getFullYear();
        }catch(err){
            console.log(err);
        }
    }
    
    const checkAndSetMembersInState=(members,selectedMembers)=>{
        let selectedMembersList = [];
        selectedMembers.forEach(memberId=>{
            members.forEach(member=>{
                if(memberId.patientId == member.patientId){
                    selectedMembersList.push(member);
                    return false;
                }
                return true;
            });
        });
        setSelectedMembers(selectedMembersList);
        setPatientForms(members);
    }

	const setPatientForms=(members) => {
		members.map((patient,index) =>{
            setPatientForm(prevState=> ({
                ...prevState,
                ['Patient' + index]: false
            }))
            setCheckActive(prevState=> ({
                ...prevState,
                ['Patient' + index]: false
            }))
            
        })
    }

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const selecteddetails = (index)=>{
        setPatientForm(prevState=> ({
            ...prevState,
            ['Patient' + index]: true
        }))
        setCheckActive(prevState=> ({
            ...prevState,
            ['Patient' + index]: false
        }))
        setSelectedIndex(index)

	}

    const handleCancel = (childData, index) =>{
        if(childData == 'cancel') {
            setPatientForm(prevState=> ({
                ...prevState,
                ['Patient' + index]: false
            }))
            setSelectedIndex(-1)
        }
        if(childData == 'save') {
            setCheckActive(prevState=> ({
                ...prevState,
                ['Patient' + index]: true
            })
            )
        }
    }

    const selectedMembersFromRedux =useSelector(state=>{
        if (validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.subscription) && validate.isNotEmpty(state.subscription.subscription[SubscriptionBenefitType.HEALTHCARE]) && validate.isNotEmpty(state.subscription.subscription[SubscriptionBenefitType.HEALTHCARE].members)){
            return state.subscription.subscription[SubscriptionBenefitType.HEALTHCARE].members;
        }
    });

    useEffect( ()=>{
        if(validate.isEmpty(subscription) || validate.isEmpty(subscription.id)){
          props.history.goBack();
        } 
        if(validate.isNotEmpty(selectedMembersFromRedux)){
            setSelectedMemberIds(selectedMembersFromRedux);
        }
        setInititalLoader(true);
        subscriptionService.getSubscriptionPlanDetails({planId:subscription.plan.id}).then(data=>{
            if("SUCCESS" === data.statusCode && validate.isNotEmpty(data.dataObject)){
                setMaxMembers(data.dataObject.maxMembers);
                let planDetails= data.dataObject.planDetails;
                if(validate.isNotEmpty(planDetails.fees) && validate.isNotEmpty(planDetails.fees[1])) {
                    setAddMemberFee(parseInt(planDetails.fees[1].price));
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
                    changeDateOfBirthOfMembers(members);
                    setFormatMembers(members);
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

    const setFormatMembers=(members) => {
        const membersList = [];
        members.map(member => {
            membersList.push({
                'patientId': member.patientId,
                'Name': member.patientName,
                'age': member.age,
                'Gender': member.gender,
                'Proof': member.kycs ? member.kycs[0].kycType.replace("_"," ") : null ,
                'proof_Number': member.kycs ? member.kycs[0].attributes[0].attributeValue: null,
                'email': member.email,
                'dob': member.dob ,
                'mobilenumber': member.mobile ,
                'relationship': member.relationship ? member.relationship.name : null
            })
        })
        setMembers(membersList);
    }

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




    return (
        <React.Fragment>
            <label className="form-group form-check m-0 pointer" for="addMore">
                <input type="checkbox" name="addMore" id="addMore"  checked = {showMemberList} onChange= {() =>  {setShowMemberList(!showMemberList); console.log(selectedMembersFromRedux);console.log(members);console.log(selectedMembers);}} />
                <span className="checkmark" ></span>
                <span className="v-align-sub ml-3 text-secondary">Add Member {parseInt(addMemberFee) > 0 && `@ Rs ${parseInt(addMemberFee)}`}</span>
            </label>

            { showMemberList && <div className={source == 'Register' ? "subs-login-container py-0" : source == "myAccountSection" ? "subs-login-container pt-4 w-100" : "subs-login-container"}>
                <section className={source == 'Register' ? "subs-login w-100 px-0 pt-3 pb-0 shadow-none" : source == "myAccountSection" ? "subs-login p-0 shadow-none w-100" : "subs-login"}>
                    <div className={source == 'Register' ? "content mr-0 w-100 mb-n3" : source == 'myAccountSection' ? "content mr-0" : "content"}>
                        
                         {((source !== 'Register') && (source !== 'myAccountSection')) && <React.Fragment>
                            <h4 className="mb-3">Add a Member</h4>
                            </React.Fragment>} 
                        <div className="toggle-select mb-3">
                            <div className="d-flex">
                                <button type="button" className={activeTab == "1" ? "btn btn-badge active" : "btn btn-badge"}
                                    onClick={() => { toggle('1'); }}
                                >Existing Patients</button>

                                <button type="button"
                                    className={activeTab == "2" ? "btn btn-badge active" : "btn btn-badge"}
                                    onClick={() => { toggle('2'); }}
                                >Add New Details</button>
                            </div>
                        </div>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1" >
                                {members.map((patient, index) => {
                                    return (
                                        <React.Fragment>
                                            <div className={ openpatientform['Patient'+ index] ? (checkActive['Patient'+ index] ? "card bg-light border-active p-3 mb-3" : "card bg-light d-none p-3 mb-3" ) : "card bg-light border-none p-3 mb-3"}>
                                                <label className="form-group form-check mb-0 pl-5" htmlFor={'Patient' + index}>
                                                    <p className="title mb-1">{patient.Name}</p>
                                                    <p className="mb-0"><small className="text-secondary">Age / Gender: </small><small className="ml-1 text-dark"> { patient.age } / {patient.Gender}</small></p>
                                                    <p className="mb-0"><small className="text-secondary">Photo ID Proof: </small><small className="ml-1 text-dark">{patient.Proof}</small></p>
                                                    <p className="mb-0"><small className="text-secondary">Photo ID Number: </small><small className="ml-1 text-dark">{patient.proof_Number}</small></p>
                                                    <p className="mb-0"><small className="text-secondary">Mobile Number: </small><small className="ml-1 text-dark">{patient.mobilenumber}</small></p>
                                                    <p className="mb-0"><small className="text-secondary">Relationship: </small><small class="ml-1 text-dark"> {patient.relationship}</small></p>
                                                    <input type="checkbox" id={'Patient' + index} checked ={ openpatientform['Patient'+ index] ? (checkActive['Patient'+ index] ? true : false ) : false}  name={'Patient' + index} value={'Patient' + index} onChange={()=>selecteddetails(index)} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <Fade in ={ openpatientform['Patient'+ index] ? (checkActive['Patient'+ index] ? false : true ) : false}>
                                                { (openpatientform['Patient'+ index] ? (checkActive['Patient'+ index] ? false : true ) : false) && <PatientForm index={index} source={'existingPatient'} patientdetails={members[selectedIndex]} cancelAction = {handleCancel} />}
                                            </Fade>
                                        </React.Fragment>
                                    )
                                })
                                }
                                {showfooter && <div class="row w-100 mt-4 mx-0">
                                    <div class="col-6 pl-1"><button class="btn  btn-light  btn-block"> Cancel</button></div>
                                    <div class="col pr-1"><button class="btn  btn-brand btn-block"> Register</button></div>
                                </div>}
                            </TabPane>
                            <TabPane tabId="2">
                            {(activeTab === '2') && <AddNewMemberDetail subcribedMemberIds={subcribedMemberIds} newMembersFileList={newMembersFileList} newMembersImagePathList={newMembersImagePathList} relations={relations} kycTypes={kycTypes} newMembers={newMembers} addNewCustomer={addNewMember} removeCustomer={removeNewCustomer} />}
                            </TabPane>
                        </TabContent>
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