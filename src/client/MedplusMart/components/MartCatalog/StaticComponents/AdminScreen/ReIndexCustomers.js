import React, { useEffect, useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem }  from 'reactstrap';
import Validate from "../../../../../helpers/Validate";
import MartAdminService from "../../../../services/MartAdminService";
import Alert from "../../../../../components/Common/Alert";
import DatePicker from "react-date-picker";
import dateFormat from "dateformat";
import BreadCrumbAction from "../../../../../../redux/action/BreadCrumbAction";

const ReIndexCustomers = (props) => {
    const validate = Validate()
    const martAdminService = MartAdminService()
    const [dropdownOpen,setDropdownOpen]=useState(false);
    const [reindexedDate , setReIndexedDate] = useState()
    const [customerId , setCustomerId] = useState()
    const [selectedDate , setSelectedDate] = useState()
    const [refreshLoading, setRefreshLoading] = useState(false)
    const [alertInfo , setAlertInfo] = useState({ message: "", type: "" });
    const [selectReIndexType, setSelectReInedxType]=useState("reIndexWithDate")

    const breadCrumbAction = BreadCrumbAction();


    const toggle=()=>{
        setDropdownOpen(!dropdownOpen)
    }
    const data = ["MORT", "MOB", "CRM"]

    useEffect(()=>{
        breadCrumbAction.pushBreadCrumbs({ name: 'Re-index Customers', url: props.location.pathname });
      },[])

    const reIndexCustomerWithDate = () =>{
        setRefreshLoading(true)
        if(validate.isNotEmpty(reindexedDate)){
            martAdminService.moveCustomersInfoToSolrFromGivenDate({ "fromDate": reindexedDate }).then(response => {
              if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                setAlertInfo({message: response.message, type : "SUCCESS"})
                setRefreshLoading(false)
              }
              else{
                if(validate.isEmpty(response)){
                    setAlertInfo({message: "Something went wrong...!", type : "ERROR"})
                    setRefreshLoading(false)
                }else{
                    setAlertInfo({message: response.message, type : "ERROR"})
                    setRefreshLoading(false)
                }
              }
            }).catch(function (error) {
              console.log(error);
              setRefreshLoading(false)
            })
          }
          else{
            setAlertInfo({message: "Invalid from date", type : "ERROR"})
            setRefreshLoading(false)
          }
    }
    
    const reIndexCustomerWithCustomerId = () =>{
        setRefreshLoading(true)
        if(validate.isNotEmpty(customerId)){
            martAdminService.moveCustomerInfoToSolrByCustomerId({ "customerID": customerId }).then(response => {
              if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                setAlertInfo({message: response.message, type : "SUCCESS"})
                setRefreshLoading(false)
              }
              else{
                if(validate.isEmpty(response)){
                    setAlertInfo({message: "Something went wrong...!", type : "ERROR"})
                    setRefreshLoading(false)
                }else{
                    setAlertInfo({message: response.message, type : "ERROR"})
                    setRefreshLoading(false)
                }
              }
            }).catch(function (error) {
              console.log(error);
              setRefreshLoading(false)
            })
          }
          else{
            setAlertInfo({message: "Invalid customer ID", type : "ERROR"})
            setRefreshLoading(false)
          }
    }

    const addMonths = (months) => {
        const date = new Date().setDate(new Date().getDate()+ +months)
        return new Date(date);
    }

    return(
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <section className="admin-screen">
                    <h1 className="h5 mb-0 p-3 border-bottom">Re-index Custmers Info in Solr</h1>
                <div className="p-3">
                <form className="form-inline"  style={{"gap":"1rem"}}>
                    <div className="input-group">
                        <div className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input" checked={selectReIndexType === "reIndexWithDate"} id="reIndexWithDate" value = "reIndexWithDate" name="Re-Index" defaultChecked onChange={()=>setSelectReInedxType("reIndexWithDate")}/>
                        <label className="custom-control-label pointer" for="reIndexWithDate">Date</label>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input" checked={selectReIndexType === "reIndexWithId"} id="reIndexWithId" value = "reIndexWithId" name="Re-Index" onChange={()=>setSelectReInedxType("reIndexWithId")}/>
                        <label className="custom-control-label pointer" for="reIndexWithId">Customer ID</label>
                        </div>
                    </div>
                </form>
                    <form className="my-3">
                        {selectReIndexType === "reIndexWithDate" ?  <div className="d-flex justify-content-start align-items-baseline">
                            <div className="w-25">
                                <div className="each-group has-float-label">
                                <DatePicker className={"form-control w-100"} id="date" value={selectedDate} format="dd/MM/yyyy" maxDate={new Date()} minDate={addMonths(-29)} onChange={(date) => {setSelectedDate(date); setReIndexedDate(dateFormat(new Date(date),"yyyy-mm-dd")); }}  dayPlaceholder='DD' monthPlaceholder='MM' yearPlaceholder='YYYY' showLeadingZeros={true}></DatePicker>
                                {/* <input className="form-control w-100" id="date" name="date"  placeholder=" " type="date" onChange={(e) => setReIndexedDate(e.target.value) }/> */}
                                {/* <Label for="date">
                                    dd/mm/yyyy
                                </Label> */}
                                </div>
                            </div>
                            <div  className="mx-2">
                                <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" title="reIndex Customer" onClick={reIndexCustomerWithDate}>
                                {refreshLoading ? <span class="spinner-border spinner-border-sm align-text-top mx-5" role="status" aria-hidden="true"></span> : <>Re-Index</>}
                                </button>
                            </div>
                        </div> :
                         <div className="d-flex justify-content-start align-items-baseline mt-2">
                         <div className="w-25">
                             <div className="each-group has-float-label form-group-error">
                                 <input className="form-control w-100" pattern="[1-9][0-9]{0,10}" id="customerId" name="customerId" placeholder=" " type="text" onChange={(e) => setCustomerId((v)=>(e.target.validity.valid)? e.target.value:v) }/>
                                 <label htmlFor="customerId">
                                     Enter Customer Id
                                 </label>
                                 <p className="d-none">Enter Valid customerId</p>
                             </div>
                         </div>
                         <div className="mx-2">
                             <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" title="reIndex Customer" onClick={reIndexCustomerWithCustomerId}>
                             {refreshLoading ? <span class="spinner-border spinner-border-sm align-text-top mx-5" role="status" aria-hidden="true"></span> : <>Re-Index</>}
                             </button>
                         </div>
                     </div>
                        }
                       
                       
                    </form>
                </div>
            </section>
        </React.Fragment>
    );
};

export default ReIndexCustomers;