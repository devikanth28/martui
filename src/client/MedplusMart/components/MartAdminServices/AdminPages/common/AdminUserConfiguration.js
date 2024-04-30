import React, { useState ,useEffect} from "react";
import BreadCrumbAction from "../../../../../../redux/action/BreadCrumbAction";
import { useInputField } from "../../../../../components/Common/CustomHooks/useInputField";
import MartAdminService from "../../../../services/MartAdminService";
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_INFO, ALERT_TYPE_SUCCESS } from '../../../../../components/Common/Alert';

const AdminUserConfiguration = (props) => {
    const [userInfo,setUserInfo] =useState(null);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const assignRights = ['MART Admin','Mart Marketing Admin Only','LENS Admin'];
    const breadCrumbAction = BreadCrumbAction();
    const [userCustomerId,,,,handleOnChange,,] = useInputField("NUMBER",10);
    const [adminValue,setAdminValue] = useState(0);
    const [hasRoles,setRoles]=useState([false,false,false]);
    const [submitLoader, setSubmitLoader] = useState(false);
    const [saveLoader, setSaveLoader] = useState(false);
    const closeAlertMessage = () => {
        setAlertInfo({ message: "", type: "" });
    }

    const assignRole = (roleIndex,value)=> {
        const roles = [...hasRoles];
        roles[roleIndex]=value;
        setRoles(roles);
    }

    const configureAdminValue=(e)=>{
        let id = e.target.id;
        const checked = e.target.checked;
        if(id==='MART Admin' && checked){
            setAdminValue(adminValue+4);
        }else if(id==='MART Admin' && !checked){
            setAdminValue(adminValue-4);
        }
        if(id==='LENS Admin' && checked){
            setAdminValue(adminValue+1);
        }else if(id==='LENS Admin' && !checked){
            setAdminValue(adminValue-1);
        }
        const finalIndex = assignRights.indexOf(id);
        assignRole(finalIndex,checked)
    }
    useEffect(()=>{
        insertData(userInfo);
        breadCrumbAction.pushBreadCrumbs({ name: 'Admin User Configuration', url: props.location.pathname });
    },[userInfo]);

    const insertData = (userInfo)=>{
        setUserInfo(userInfo)
    }
    const changeUserConfiguration=(e)=>{
        e.preventDefault();
        setSaveLoader(true);
        MartAdminService().updateCmsAdmin({adminCustomerId:userCustomerId,webLoginId:userInfo.webLoginID,adminValue,isMarketingAdmin:hasRoles[1] ? "YES" : "NO"}).then(response=>{
            if(response.statusCode=='SUCCESS'){
                if(response.message === "SUCCESS"){
                    setAlertInfo({ message: response.dataObject, type: ALERT_TYPE_SUCCESS });
                } else {
                    setAlertInfo({ message: response.dataObject, type: ALERT_TYPE_INFO });
                }
            }else{
                setAlertInfo({ message:  response.dataObject, type: ALERT_TYPE_ERROR });
            }
            setSaveLoader(false);
        }).catch((error) => {
            console.log(error);
            setSaveLoader(false);
        })
    }
    const searchCustomer=async(e)=>{
        e.preventDefault();
        setSubmitLoader(true);
        MartAdminService().getCustomerInfo({userCustomerId}).then(response=>{
            if(response.statusCode=='SUCCESS'){
                insertData(response.dataObject.customerData);
                const roles = [...hasRoles];
                if(response.dataObject.customerData.isCMSAdmin=='Y'){
                    roles[0]=true;
                    setAdminValue(adminValue+4);
                }
                if(response.dataObject.isMartMarketingAdmin=='yes'){
                    roles[1]=true;
                } 
                setRoles(roles);
            }else{
                insertData(response.message);
                setAlertInfo({ message: response.message, type: '' });
            }
            setSubmitLoader(false);
        }).catch((error) => {
            console.log(error);
            setSubmitLoader(false);
        })
    }
    
    return (
        <React.Fragment>
            <section className="admin-screen">
                    <h1 className="h5 p-3 border-bottom mb-0">Admin User Configuration</h1>
                <div className="p-3">
                        <form className="d-flex align-items-baseline" onSubmit={(e)=>{e.preventDefault()}}>
                            <div>
                                <div className="each-group has-float-label form-group-error">
                                <input className="form-control w-100" id="customerId" name="customerId" value={userCustomerId} placeholder=" " type="text" maxLength={10} onChange={(event)=>{handleOnChange(event)}}/>
                                <label htmlFor="customerId">
                                    Customer Id
                                </label>
                                <p className="d-none">Enter Valid Customer ID</p>
                                </div>
                            </div>
                            <div>
                                <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" disabled={!userCustomerId} onClick={searchCustomer}>
                                {submitLoader ? <span class="spinner-border spinner-border-sm align-text-top mx-5" role="status" aria-hidden="true"></span> : <>Search</>}
                                </button>
                            </div>
                        </form> 
                        {(userInfo=='CustomerId cannot be Empty' || userInfo=='Invalid customerId') || userInfo===null?<></>:<div className="row px-3">
                            <div className="col-6 ">
                            <div className="card px-3">
                                <h6 className="pt-3">User Details</h6>
                            <div>
                                <p>Name : {userInfo ? userInfo.firstName + ' '+ userInfo.lastName : ''}</p>
                                <p>Customer Id : {userInfo ? userInfo.customerID : ''}</p>
                                <p>Mobile Number :{userInfo ? userInfo.mobileNumber : ''}</p>
                            </div>
                            </div>
                            </div>
                            <div className="col-6 pl-0">
                            <div className="card px-3">
                            <div className="pt-3">
                                {assignRights.map((obj,index)=>{
                                    return(
                                    <>
                                    <input type="checkbox" id={obj} name={obj} value={obj} checked={hasRoles[index]} onChange={event=>{configureAdminValue(event)}}/>
                                    <label for={obj} className="ml-2"> {obj}</label><br />
                                    </>
                                    )
                                })}
                                <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 my-2 custom-btn-lg" onClick={changeUserConfiguration}>
                                {saveLoader ? <span class="spinner-border spinner-border-sm align-text-top mx-5" role="status" aria-hidden="true"></span> : <>Save</>}
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>}
                </div>
                <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000' />
            </section>
        </React.Fragment>
    );
};

export default AdminUserConfiguration;