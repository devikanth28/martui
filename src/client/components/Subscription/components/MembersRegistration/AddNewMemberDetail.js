import React, {  useState } from "react";
import { getDisplayableAge } from "../../../../helpers/CommonUtil";
import Alert from '../../../Common/Alert';
import MemberForm from './MemberForm';


const AddNewMemberDetail = (props) => {
    const initialCustomer={'patientName':'','dob':'','gender':'','relationship':'','kycType':'','kycRefNo':'','kycDocPath':'','mobile':''};
    let newMembers= props.newMembers;
    const [customer,setCustomer]=useState({...initialCustomer});
    const [selectedFile,setselectedFile]=useState(undefined);
    const [imagePath,setImagePath]=useState(undefined);
    const [alertData, setAlertData] = useState({});
    const [backDropLoader,setBackDropLoader]=useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(-1);
    const subcribedMemberIds = props.subcribedMemberIds ? props.subcribedMemberIds : [];
    const showUploadPhotoIdButton = props.showUploadPhotoIdButton ? props.showUploadPhotoIdButton : [];

    const addCustomer=(customer,index,file,imagePath)=>{
        props.addNewCustomer(customer,index,file,imagePath);
        setCustomer({...initialCustomer});
        setselectedFile(undefined);
        setImagePath(undefined);
        setCurrentEditIndex(-1);
        if(props.errorMap && props.errorMap[index]){
            props.removeErrorFromNewMemberList(index,false);
        }
    }

    const removeCustomer=(index)=>{
        props.removeCustomer(index);
        if(props.errorMap && props.errorMap[index]){
            props.removeErrorFromNewMemberList(index,true);
        }
    }

    const editCustomer = (member, index)=>{
        setselectedFile(props.newMembersFileList[index]);
        setImagePath(props.newMembersImagePathList[index]);
        setCustomer(member);
        setCurrentEditIndex(index);
    }
   
     const resetCustomer=()=>{
         setCustomer({...initialCustomer});
         setselectedFile(undefined);
         setImagePath(undefined);
         setCurrentEditIndex(-1);
     }
    
     const getGenderString=(value)=>{
        switch (value) {
           case "M":return "Male";
           case "F": return "Female";
           case "O": return "Others";
           default :return "";
        }
    }
    
    const clearError = () => {
        setAlertData({});
    }

    const subscriptValue=(n) => {
        const values = ["st","nd","rd"]
        const index = (((n+90)%100-10)%10-1)
        if(index > 2) {
            return "th"
        } else{
            return values[index]
        }
    }
  
    
    return (
        <React.Fragment>
            {alertData && <Alert alertInfo={alertData} onDurationEnd={clearError} duration={5000}/>}
            <div className="row no-gutters">
                <div className="col">
                    <div className="scroll-bookings">
                    {newMembers && newMembers.length > 0 && newMembers.map((member,index)=>{
                        if(currentEditIndex === index){
                            return <MemberForm uploadPhotoIdForm={subcribedMemberIds.includes(customer.patientId) && showUploadPhotoIdButton.includes(customer.patientId)} setIsFormEdit={props.setIsFormEdit} kycTypes={props.kycTypes} relations={props.relations} selectedFile={selectedFile} imagePath={imagePath} setBackDropLoader={setBackDropLoader} setAlertData={setAlertData} index={currentEditIndex} source={'newMember'} member={customer} saveCustomer={addCustomer} removeCustomer={resetCustomer} />
                        }
                        return <div className="mb-3"><div key={index} className={(props.errorMap && props.errorMap[index])?"card bg-light border-danger p-3 mb-3 pointer mr-2":"card bg-light border-none  p-3 mb-3 pointer mr-2"}>
                            <label className="form-group form-check mb-0 pointer" htmlFor={index}>
                                <p className="title my-1">{member.patientName}</p>
                                {member.dob ? <p className='mb-0'><small className="text-secondary">Age/Gender: </small> <small className="ml-1 text-dark">{getDisplayableAge(member.dob)} / {getGenderString(member.gender)}</small></p>:<React.Fragment></React.Fragment>}
                                {/* {!member.age? <p className='mb-0'><small className="text-secondary">Age/Gender: </small> <small className="ml-1 text-dark">{'< 1 Yr'}  / {getGenderString(member.gender)}</small></p>:<React.Fragment></React.Fragment>} */}
                                {member.kycType && <p className="mb-0"><small className="text-secondary"> Photo ID Proof: </small><small className="ml-1 text-dark">{member.kycType.kycName}</small></p>}
                                {member.kycRefNo && <p className="mb-0"><small className="text-secondary"> Photo ID Number: </small><small className="ml-1 text-dark">{member.kycRefNo}</small></p>}
                                {member.mobile && <p className="mb-0"><small className="text-secondary">Mobile Number: </small><small className="ml-1 text-dark">{member.mobile}</small></p>}
                                {member.relationship && <p className="mb-0"><small className="text-secondary">Relationship: </small><small class="ml-1 text-dark">{member.relationship.name}</small></p>}
                                <input type="checkbox" id={index} checked  name="PatientSelect" value={index} />
                                <span className="checkmark"></span>
                            </label>
                            {(props.errorMap && props.errorMap[index]) && <div className="ml-2 text-danger" >{props.errorMap[index]}</div>}
                            
                            <div className="text-right">
                                {!subcribedMemberIds.includes(member.patientId) && <>
                                    <a href="javascript:void(0)" className="btn no-underline text-primary" title="Remove" onClick={() => removeCustomer(index)}>Remove</a>
                                    <a href="javascript:void(0)" className="btn mr-n3 no-underline text-primary" title="Edit" onClick={() => editCustomer(member, index)}>Edit</a>
                                </>}
                                {subcribedMemberIds.includes(member.patientId) && showUploadPhotoIdButton.includes(member.patientId) && <a href="javascript:void(0)" className="btn btn-sm mr-m2 text-primary" onClick={() => editCustomer(member, index)} title="Upload Photo ID">Upload Photo ID</a>}
                            </div> 
                        </div></div>
                    })}
                    </div>
                    {currentEditIndex === -1 && (newMembers && newMembers.length > 0) &&  ((props.maxMembers < 0) || (props.maxMembers > props.currentMembers)) && <h5 className="my-3"> Adding <strong>{(newMembers && newMembers.length > 0 ) ? (newMembers.length+1) : 1}<sup>{(newMembers && newMembers.length > 0 ) ? subscriptValue(newMembers.length+1) : subscriptValue(1)}</sup></strong> Member Details</h5>}
                    {currentEditIndex === -1 && ((props.maxMembers < 0) || (props.maxMembers > props.currentMembers)) && <MemberForm uploadPhotoIdForm={subcribedMemberIds.includes(customer.patientId) && showUploadPhotoIdButton.includes(customer.patientId)} setIsFormEdit={props.setIsFormEdit} kycTypes={props.kycTypes} isAutoFocusRequired={(!props.newMembers || props.newMembers.length == 0)?true:false} relations={props.relations} selectedFile={selectedFile} imagePath={imagePath} setBackDropLoader={setBackDropLoader} setAlertData={setAlertData} index={-1} source={'newMember'} from={props.source} member={customer} saveCustomer={addCustomer} removeCustomer={resetCustomer} />}
                </div>
            </div>
        </React.Fragment>
    );
}

export default AddNewMemberDetail;