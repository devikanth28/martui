import React, { useEffect, useState } from 'react'
import Validate from '../../../../../helpers/Validate'
import MartAdminService from '../../../../services/MartAdminService'
import Alert from '../../../../../components/Common/Alert'
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction'

const GetTokenDetails = (props) => {
  const [tokenDetails, setTokenDetails] = useState({})
  const [tokenId, setTokenId] = useState("")
  const [alertInfo , setAlertInfo] = useState({ message: "", type: "" });
  const [refreshLoading, setRefreshLoading] = useState(false)
  const validate = Validate()
  const martAdminService = MartAdminService()
  const breadCrumbAction = BreadCrumbAction();
  
  useEffect(()=>{
    breadCrumbAction.pushBreadCrumbs({ name: 'Token Details', url: props.location.pathname });
  },[])

  const getTokenDetails = () => {
    setRefreshLoading(true)
    if(validate.isNotEmpty(tokenId) && tokenId.length === 32){
      martAdminService.getTokenDetails({ "searchTokenID": tokenId }).then(response => {
        if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
          setTokenDetails(response.dataObject.tokenMap)
          setRefreshLoading(false)
        }
        else{
          setAlertInfo({message: response.message, type : "ERROR"})
          setTokenDetails({})
          setRefreshLoading(false)
        }
      }).catch(function (error) {
        console.log(error);
        setTokenDetails({})
        setRefreshLoading(false)
      })
    }
    else{
      setAlertInfo({message: "Invalid Token ID", type : "ERROR"})
      setTokenDetails({})
      setRefreshLoading(false)
    }
  }


  return (
    <section>
      <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
      <h1 className='h5 mb-0 header p-3'>Token Details</h1>
      <div className='p-3'>
      <div className='d-flex'>
        <div className="form-group has-float-label px-0 form-group-error mb-0 col-2">
          <input type="text" className="form-control mb-0" placeholder=" " id="tokenDetails" value={tokenId} name="tokenDetails" onChange={(e) => setTokenId(e.target.value)} />
          <label htmlFor="tokenDetails">Enter Token Id</label>
        </div>
        <button type="submit" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" title="get Token Details" onClick={getTokenDetails}>
        {refreshLoading ? <span class="spinner-border spinner-border-sm align-text-top mx-5" role="status" aria-hidden="true"></span> : <>Get Token Details</>}
        </button>
      </div>
      {validate.isNotEmpty(tokenDetails) && 
          <React.Fragment>
            <div className='text-break'>
            <div className="mb-3">Token Details</div>
                {validate.isNotEmpty(tokenDetails) && Object.keys(tokenDetails).map((key, i) => (
                  <p key={i}>
                    <span>{key} : </span>
                    <span>{tokenDetails[key]}</span>
                  </p>
                ))
                }
            </div>
          </React.Fragment>}
          </div>
    </section>
  )
}

export default GetTokenDetails