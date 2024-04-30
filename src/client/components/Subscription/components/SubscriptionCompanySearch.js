import React, { useEffect, useState } from "react"
import SubscriptionBanner from "./SubscriptionBanner"
import CompanySelect from "./CompanySelect"
import Validate from "../../../helpers/Validate";
import SubscriptionService from "../services/SubscriptionService";
import { BannerSearchCorporate } from "../constants/SubscriptionConstants";
import Alert, {ALERT_TYPE_INFO, ALERT_TYPE_ERROR} from '../../Common/Alert';

const SubscriptionCompanySearch=(props) =>{

    const[companyList, setCompanyList] = useState([]);
    const[initialLoader, setInitialLoader] = useState(true);
    const [alertData, setAlertData] = useState({});

    const subscriptionService  = SubscriptionService();
    const validate  = Validate();

    useEffect(() => { 
        subscriptionService.getOrganizations().then(data => {
            if (data.statusCode === "SUCCESS" && validate.isNotEmpty(data['dataObject'])) {
                setCompanyList(data.dataObject);
            }else {
                setAlertData({message:'Organizations info not found',type:ALERT_TYPE_INFO});
            }
            setInitialLoader(false);
        }).catch(e =>{
            console.log(e);
            setAlertData({message:'Something went wrong',type:ALERT_TYPE_ERROR});
            setInitialLoader(false);
        });
    },[])

    const clearError = () => {
        setAlertData({});
    }

    const getGhostImage = () => {
        return  <div className="my-4 py-2">
                    <div className="row">
                        <div className="px-3 company-list-select">
                            <section className="p-48 py-32">
                                <div className="p-0 ph-item m-0">
                                    <div className="ph-col-12 p-0" style={{ 'height': '38px' }}>
                                        <div className ="ph-row mb-2">
                                            <div className ="ph-col-4" style={{ 'height': '38px' }}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="company-search-container p-0">
                                                <div className="ph-row mb-0 ph-item p-0">
                                                    <div className="ph-col-12 mb-0" style={{ 'height': '35px' }}>
                                                    </div>
                                                </div>
                                    </div>
                                </div>
                                {/* <div className="p-0 ph-item m-0"> */}
                                    <div className ="ph-col-12 p-0">
                                        <div className="ph-row mb-3">
                                            <div className = "ph-col-4 mb-1" style ={{'height':'19px'}}>
                                            </div>
                                        </div>
                                    </div> 
                                    <div className="company-result-container row">
                                        <div className="col-6 mb-3">
                                            <div className="ph-col-12 mb-0 p-0">
                                                <div className ="ph-row mb-0">
                                                    <div className="ph-col-12 mb-0" style={{ 'height': '50px' }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="ph-col-12 mb-0 p-0">
                                                <div className ="ph-row mb-0">
                                                    <div className="ph-col-12 mb-0" style={{ 'height': '50px' }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="ph-col-12 mb-0 p-0">
                                                <div className ="ph-row mb-0">
                                                    <div className="ph-col-12 mb-0" style={{ 'height': '50px' }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="ph-col-12 mb-0 p-0">
                                                <div className ="ph-row mb-0">
                                                    <div className="ph-col-12 mb-0" style={{ 'height': '50px' }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="w-100 solid mt-0 mb-3 mx-3" />
                                        <div className="scroll-content ph-item p-0 m-0">
                                            <div className="col-6 mb-3">
                                                <div className="ph-col-12 mb-0 p-0">
                                                    <div className ="ph-row mb-0">
                                                        <div className="ph-col-12 mb-0" style={{ 'height': '50px' }}>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6 mb-3">
                                            <div className="ph-col-12 mb-0 p-0">
                                                <div className ="ph-row mb-0">
                                                    <div className="ph-col-12 mb-0" style={{ 'height': '50px' }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="ph-col-12 mb-0 p-0">
                                                <div className ="ph-row mb-0">
                                                    <div className="ph-col-12 mb-0" style={{ 'height': '50px' }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="ph-col-12 mb-0 p-0">
                                                <div className ="ph-row mb-0">
                                                    <div className="ph-col-12 mb-0" style={{ 'height': '50px' }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="ph-col-12 mb-0 p-0">
                                                <div className ="ph-row mb-0">
                                                    <div className="ph-col-12 mb-0" style={{ 'height': '50px' }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="ph-col-12 mb-0 p-0">
                                                <div className ="ph-row mb-0">
                                                    <div className="ph-col-12 mb-0" style={{ 'height': '50px' }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="ph-col-12 mb-0 p-0">
                                                <div className ="ph-row mb-0">
                                                    <div className="ph-col-12 mb-0" style={{ 'height': '50px' }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="ph-col-12 mb-0 p-0">
                                                <div className ="ph-row mb-0">
                                                    <div className="ph-col-12 mb-0" style={{ 'height': '50px' }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-12 pl-0 mt-2">
                                            <div className="ph-row ph-item p-0">
                                                <div className="ph-col-4 mb-0" style={{'height':'48px'}}>
                                                </div>
                                            </div>
                                    </div>
                            </section>
                        </div>
                        <div className="px-3 reach-out-to-container">
                            <section className="p-48 py-32">
                                <div className="ph-row ph-item p-0" style = {{'width':"360px"}}>
                                <div className="ph-col-12 p-0 m-0"  style={{"height":"314px"}}>
                                        <div className="ph-picture"></div>
                                </div>
                                </div>
                                <div className="pt-2">
            
                                    <div className="ph-row mb-4 ph-item p-0" style={{ 'height': '38px' }}>
                                                <div className="ph-col-12" style={{ 'height': '38px' }}>
                                                </div>
                                    </div>
            
                                    <div className="ph-row mb-4 ph-item p-0" style={{ 'height': '168px' }}>
                                            <div className="ph-col-12" style={{ 'height': '168px' }}>
                                            </div>
                                    </div>
                                    
            
                                
                                    {/* <p className="mb-4">
                                        Sorry we do not have a customized plan for your company. Please select from any of the existing Membership plans.
                                        <br />
                                        <br />
                                        You can provide your company details. We will see if something exciting can be customized for your company as well.
                                    </p> */}
                                    <div className="col-6 col-md-12 pl-0 mt-2">
                                                <div className="ph-row ph-item p-0">
                                                    <div className="ph-col-8 mb-0 pb-5">
                                                    </div>
                                                </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            }

    return(
        <React.Fragment>
            <SubscriptionBanner history={props.history} pageName={BannerSearchCorporate} className="d-block mb-4"/>
            {alertData && <Alert alertInfo={alertData} onDurationEnd={clearError} duration={5000} />}
            {initialLoader && getGhostImage()}
            {validate.isNotEmpty(companyList) && <CompanySelect companies={companyList} {...props}/>}
         </React.Fragment>
    )
}
export default SubscriptionCompanySearch;