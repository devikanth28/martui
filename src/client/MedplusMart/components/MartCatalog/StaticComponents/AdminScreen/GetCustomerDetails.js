import React, { useEffect } from 'react'
import { useState } from 'react'
import Validate from '../../../../../helpers/Validate'
import MartAdminService from '../../../../services/MartAdminService'
import Alert from '../../../../../components/Common/Alert'
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction'

const GetCustomerDetails = (props) => {

  const validate = Validate()
  const martAdminService = MartAdminService()
  const [customerDetails, setCustomerDetails] = useState([])
  const [customerId, setCustomerid] = useState("")
  const [alertInfo , setAlertInfo] = useState({ message: "", type: "" });
  const breadCrumbAction = BreadCrumbAction();
  const [refreshLoading, setRefreshLoading] = useState(false)
  
  useEffect(()=>{
    breadCrumbAction.pushBreadCrumbs({ name: 'Customer Details', url: props.location.pathname });
  },[])

  const getCustomerDetails = () => {
    setRefreshLoading(true)
    if(validateCustomerId(customerId)){
      martAdminService.getCustomerDetails({ "searchCustomerID": customerId }).then(response => {
        if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
          setCustomerDetails(response.dataObject.tokenDetails)
          setRefreshLoading(false)
        }
        else{
          setAlertInfo({message: response.message, type : "ERROR"})
          setCustomerDetails({})
          setRefreshLoading(false)
        }
      }).catch(function (error) {
        console.log(error);
        setCustomerDetails({})
        setRefreshLoading(false)
      })
    }
    else{
      setAlertInfo({message: "Invalid CustomerId", type : "ERROR"})
      setCustomerDetails({})
      setRefreshLoading(false)
    }
  }

  const validateCustomerId = (customerId) =>{
    const pattern = new RegExp(/^[1-9][0-9]{0,10}$/);
    if(validate.isNotEmpty(customerId) &&  pattern.test(customerId)){
      return true
    }
     return false 
  }

  return (
    <section>
      <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
      <h1 className='h5 mb-0 header p-3'>Customer Details</h1>
      <div className='p-3'>
      <div className='d-flex'>
        <div className="form-group has-float-label px-0 form-group-error mb-0 col-2">
          <input type="text" pattern="[1-9][0-9]{0,10}" className="form-control mb-0" placeholder=" " id="customerDetails" name="customerDetails" value= {customerId} onChange={(e) => {setCustomerid((v)=>(e.target.validity.valid)? e.target.value:v)}} />
          <label htmlFor="customerDetails">Enter Customer Id</label>
        </div>
        <button type="submit" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" title="get Customer Details" onClick={getCustomerDetails}>
        {refreshLoading ? <span class="spinner-border spinner-border-sm align-text-top mx-5" role="status" aria-hidden="true"></span> : <>Get Customer Details</>}
        </button>
      </div>
      {validate.isNotEmpty(customerDetails) && 
          <React.Fragment>
            <div className='text-break'>
            <div className="mb-3">Customer Details</div>
                {validate.isNotEmpty(customerDetails) && Object.keys(customerDetails).map((key, i) => (
                  <p key={i}>
                    <span>{key} : </span>
                    <span>{customerDetails[key]}</span>
                  </p>
                ))
                }
            </div>
          </React.Fragment>}
          </div>
    </section>
  )
}

export default GetCustomerDetails