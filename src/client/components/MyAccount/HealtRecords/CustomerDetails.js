import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { getDisplayableAge } from "../../../helpers/CommonUtil";
import Validate from "../../../helpers/Validate";
import { Gender } from "../../Common/Constants/MartConstants";
import PatientModal from "./PatientModal"
const CustomerDetails = ({ onSubmitClick, loading, customerSelection, setCustomerOptions, reckonerPatientId, patientDetails, parameterData, tabIndex, showChangePatient,setShowChangePatient }) => {

    const validate = Validate();
    const [modalOpen,setModalOpen] =useState(false)
    const [healthConditionFilteredList, setHealthConditionFilteredList] = useState({})
    const [paramterFilteredList , setParameterFilteredList] = useState([]);
    const [filteredConditionValue ,  setFilteredConditionValue] = useState("")
    const healthConditionNameMap = useMemo(() =>{
        const healthConditionMap = {}
        if(!parameterData) {
            return undefined
        }
        Object.keys(parameterData).map((healthName) => {
            healthConditionMap[healthName] = healthName
        
        });
        return healthConditionMap;

    },[parameterData]);

    const patameterDataMap = useMemo(()=>{
        const parameterMap = {}
        if(parameterData && customerSelection.healthCondition) {
            parameterData[customerSelection.healthCondition].map((key) =>{
                parameterMap[key.parameterId] = key.parameterName;
            })
            return parameterMap;
        } else {
            return undefined;
        }
    },[parameterData,customerSelection]);
    

    const handlePatientSelection = (patientId, patientName) => {
        setCustomerOptions({patientId,patientName});
    }

    const handleHealthConditionSelection = (healthName) =>{
       setCustomerOptions({ healthCondition: healthName, parameterId: '' });
       setHealthConditionFilteredList(healthConditionNameMap)
    }


    const handleParameterSelection =(parameterId) => {
        setCustomerOptions({parameterId});
        setParameterFilteredList(patameterDataMap)
    }
    const getParameterFilteredList = (filteredParameter)=>{
        if(validate.isNotEmpty(filteredParameter)){
            let obj = {}
            let parameterList = parameterData[customerSelection.healthCondition].filter((eachParameterObj) => validate.isNotEmpty(eachParameterObj.parameterName) && (eachParameterObj.parameterName.toLowerCase().trim().indexOf(filteredParameter.toLowerCase().trim()))>-1);
            parameterList.map((each)=>{
                obj[each.parameterId] = each.parameterName
            })
            setParameterFilteredList(obj)
        }
        else{
            setParameterFilteredList(patameterDataMap)
        }
    }
    const getFilteredHealthConditionList = (filteredCondition) =>{
        if(validate.isNotEmpty(filteredCondition)){
            let obj ={}
         const conditionList =  Object.keys(healthConditionNameMap).filter((condition) => validate.isNotEmpty(condition) && condition.toLowerCase().indexOf(filteredCondition.toLowerCase())> -1);
         conditionList.forEach((item,index)=>{
            obj[item] = healthConditionNameMap[item]
         });
           setHealthConditionFilteredList(obj)
        }
        else{
            setHealthConditionFilteredList(healthConditionNameMap)
        }

    }

    const getPatientDisplayableName = (patientId) => {
        let name = "";
        {validate.isNotEmpty(patientDetails) && patientDetails.map((eachPatient) => {
            if(eachPatient.patientId == patientId){
                name = <span>{eachPatient.patientName}, {getDisplayableAge(eachPatient.dateOfBirth)} {validate.isNotEmpty(eachPatient.dateOfBirth) && validate.isNotEmpty(eachPatient.gender) && "/" } {validate.isNotEmpty(eachPatient.gender) && Gender[eachPatient.gender]} <strong>{`${eachPatient.subscribedMember ? "(Member)" : ""}`}</strong></span>
            }
        })}
        return name;
    }

    const getSelectedPatientDetails = (selectedPatientId) => {
        let patientData = {};
        {validate.isNotEmpty(patientDetails) && patientDetails.map((eachPatient) => {
            if(eachPatient.patientId == selectedPatientId){
                patientData = eachPatient
            }
        })}
        return patientData;
    }

    const isSubmitDisabled = useMemo(()=> {
        const { patientId, parameterId, healthCondition } = customerSelection;
        if (tabIndex == 1 && (validate.isNotEmpty(patientId) && validate.isNotEmpty(healthCondition) && validate.isNotEmpty(parameterId))) {
            return false;
        }

        if(tabIndex == 0 && validate.isNotEmpty(patientId) && (patientId != reckonerPatientId )){
            return false;
        }
        return true;
    },[customerSelection,tabIndex, reckonerPatientId])
    

    return (
        <React.Fragment>
            <div className="col-3 p-3">
                    {/* <h5 class="mt-1 mb-2">Customer Details</h5> */}
                    {patientDetails && <PatientDetails tabIndex={tabIndex} showChangePatient={showChangePatient} setShowChangePatient={setShowChangePatient} customerSelection={customerSelection} reckonerPatientId={reckonerPatientId} getSelectedPatientDetails={getSelectedPatientDetails}/>}
                {(tabIndex == 1 || (tabIndex == 0 && showChangePatient == false)) && <React.Fragment>
                <h5 class="mb-3">Select The Patient Details Below</h5>
                <p class="font-14 mb-1 text-secondary">Patient Name</p>
                <div onClick={()=>setModalOpen(!modalOpen)} className="mb-3 d-flex justify-content-between pb-1 px-2 border-bottom font-14 pointer">
                        <span>{validate.isNotEmpty(customerSelection.patientId) ? getPatientDisplayableName(customerSelection.patientId) : `Select Patient`}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18">
                    <g transform="translate(-762.18 -983.18)">
                      <rect fill="none" width="18" height="18" transform="translate(780.18 1001.18) rotate(180)"></rect>
                      <path fill="#080808" d="M61.248,563.964a.367.367,0,0,1-.538,0l-2.416-2.808L56.008,558.5c-.165-.192-.007-.465.269-.465h9.4c.277,0,.434.273.269.465l-2.284,2.655Z" transform="translate(710.133 431.054)"></path>
                    </g>
                  </svg>
                <PatientModal isModalOpen={modalOpen} patientDetails={patientDetails} handleSelection={handlePatientSelection} selectedValue={customerSelection.patientId} setModalOpen={setModalOpen}/>
                </div>
                <React.Fragment>
                    {tabIndex == 1 && healthConditionNameMap && <HealthTrendsDropDown unfilteredDropDownData={parameterData}handleSelection={handleHealthConditionSelection} onToggleDropDown={getFilteredHealthConditionList} dropDownData={validate.isNotEmpty(healthConditionFilteredList)?healthConditionFilteredList:{}} getFilteredList={getFilteredHealthConditionList} selectedValue={validate.isNotEmpty(customerSelection.healthCondition) ? customerSelection.healthCondition : `Select Health Condition`} dropDownHeading= "Health Condition"/>}
                    {tabIndex==1 && customerSelection.healthCondition && patameterDataMap && <HealthTrendsDropDown unfilteredDropDownData={parameterData} handleSelection={handleParameterSelection} onToggleDropDown={getParameterFilteredList} dropDownData={validate.isNotEmpty(paramterFilteredList)?paramterFilteredList:[]} getFilteredList={getParameterFilteredList} selectedValue={validate.isNotEmpty(customerSelection.parameterId) ? patameterDataMap[customerSelection.parameterId] : `Select Parameters`} dropDownHeading= "Parameters"/>}  
                </React.Fragment>
                <SubmitButton isSubmitDisabled={isSubmitDisabled} loading={loading}  onSubmitClick={onSubmitClick}/>
                </React.Fragment>
                }
            </div>
        </React.Fragment>
    )
}

const PatientDetails = ({tabIndex,showChangePatient,setShowChangePatient,getSelectedPatientDetails,customerSelection}) => {

    const validate = Validate();
    const customerDetails  = useSelector(state => validate.isNotEmpty(state.userInfo.userInfo) ?  state.userInfo.userInfo : null);
    const patientData = getSelectedPatientDetails(customerSelection.patientId);

    return (
        <React.Fragment>
            {/* {validate.isNotEmpty(customerDetails) && <React.Fragment>
                <p className="font-14 mb-1 text-secondary">Customer ID</p>
                <p className="mb-3">{customerDetails.medplusId}</p>
                <p className="font-14 mb-1 text-secondary">Customer Name</p>
                <p className="mb-3">{customerDetails.firstName} {customerDetails.lastName} </p>
            </React.Fragment>} */}
            {(tabIndex == 0 && showChangePatient) && (validate.isNotEmpty(patientData)) && <React.Fragment>
                <p className="font-14 mb-1 text-secondary">Patient Name</p>
                <p className="mb-3">{patientData.patientName} </p>
                <p className="font-14 mb-1 text-secondary">Age / Gender</p>
                <p className="mb-3">{getDisplayableAge(patientData.dateOfBirth)} / {Gender[patientData.gender]}</p>
            </React.Fragment>}
            {(tabIndex == 0 && showChangePatient) && <button className="ml-n3 btn btn-link" onClick={()=>setShowChangePatient(false)}> Change Patient </button>}
        </React.Fragment>
    );
}


 const HealthTrendsDropDown = ({dropDownData,dropDownHeading,selectedValue,handleSelection,patientDetails, getFilteredList, onToggleDropDown , unfilteredDropDownData}) =>{

    const [isDropDownOpen,setIsDropDownOpen] = useState(false);

    const toggleDropDown = () => {
        setIsDropDownOpen(isDropDownOpen => !isDropDownOpen);
    }
    return <React.Fragment>
            <div className="mb-4 subs-register-dropdown border-bottom">
                <p className="font-14 mb-1 text-secondary">{dropDownHeading}</p>
                <Dropdown isOpen={isDropDownOpen} toggle={() => {toggleDropDown(); onToggleDropDown()}}>
                    <DropdownToggle caret color="white" className="btn-block text-truncate border-0" >
                       {selectedValue}
                    </DropdownToggle>
                    {Validate().isNotEmpty(patientDetails) && <DropdownMenu className="w-100 pl-0 border-0 pb-0">
                        {patientDetails.map((eachPatient) => {
                            return (
                                <React.Fragment>
                                    <DropdownItem onClick={() => handleSelection(eachPatient.patientId, eachPatient.patientName)}>
                                        {eachPatient.subscribedMember && <span className="badge badge-dark font-weight-bold mt-2">Member</span>}<span className="d-flex my-1">{eachPatient.patientName}, {getDisplayableAge(eachPatient.dateOfBirth)} {Validate().isNotEmpty(eachPatient.dateOfBirth) && Validate().isNotEmpty(eachPatient.gender) && "/"} {Validate().isNotEmpty(eachPatient.gender) && Gender[eachPatient.gender]} </span>
                                    </DropdownItem>
                                    <div class="dropdown-divider m-0"></div>
                                </React.Fragment>
                            )

                        })}
                    </DropdownMenu>}
                    {Validate().isNotEmpty(unfilteredDropDownData) && <DropdownMenu className="w-100 pl-0 border-0" style={{"max-height":"15rem","overflow-y":"scroll"}}>
                        <div class="d-flex pl-2">
                            <input type="text" className="form-control text-truncate mr-n2" placeholder={dropDownHeading == "Health Condition" ? "Eg: Heart / Liver / Kidney" : " Eg: Cpk / Albumin-Serum / Urine-Random"} onChange={(e) => {getFilteredList(e.target.value) }} autocomplete="off" />
                            <svg viewBox="0 0 20 20" width="18" height="18" className="position-relative" style={{ "left": "-1.5rem", "top": "0.5rem" }}><path fill="#cccccc" d="M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896 c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519 c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461 s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z"></path></svg>
                        </div>
                        {Validate().isNotEmpty(dropDownData) && Object.keys(dropDownData).map((key,value) => {
                            return (
                            <DropdownItem  onClick={() =>handleSelection(key)}>
                                {dropDownData[key]}
                            </DropdownItem>
                            )

                        })}
                    </DropdownMenu>}
                </Dropdown>
            </div>
        </React.Fragment>
    
}

 const SubmitButton = (props) => {

    return (
        <button class="btn btn-brand-gradient px-5 rounded-pill custom-btn-lg float-right" role="button" type="button" disabled={props.isSubmitDisabled} onClick={props.onSubmitClick}>
            Submit {props.loading &&
                <React.Fragment>
                    <span class="btn btn-brand-gradient px-5 rounded-pill custom-btn-lg float-right" role="status" aria-hidden="true"></span>
                    <span className="btn btn-brand-gradient px-5 rounded-pill custom-btn-lg float-right"></span>
                </React.Fragment>}
        </button>
    );
}


export default CustomerDetails;