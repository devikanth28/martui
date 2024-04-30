import React, {useState } from "react";
import { useDispatch} from "react-redux";
import Validate from "../../../helpers/Validate";
import CompanySearchIcon from "../../../images/common/Call center-amico.svg";
import { SAVE_COMPANY } from "../redux/SubscriptionReducer";
import ReachOutToUsModal from "./ReachOutToUsModal";
import {SET_CORPORATE_EMAIL_ID} from "../redux/SubscriptionReducer";
import SubscriptionService from "../services/SubscriptionService";
import { MEDPLUS_ADVANTAGE_URL_PREFIX } from "../constants/SubscriptionConstants";


const CompanySelect = (props) =>{
    const allCompanies = props.companies;
    const frequentlySearchedCompanies = allCompanies.slice(0,4);
    const searchCompanies = allCompanies.slice(4);
    const [filteredCompanies,setFilterCompanies] = useState(searchCompanies);
    const [showReachOutModal, setShowReachOutModal] = useState(false);
    const [showReachOutMOdalThankYou, setShowReachOutModalThankYou] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [modalHeight, setModalHeight] = useState("unset");
    const[searchVal, setSearchVal] = useState('');
    const [loading, setLoading]= useState(false);

    const validate = Validate();
    const dispatch = useDispatch();
    const subscriptionService  = SubscriptionService();

    const proceedToCorporatePlans = () => {
        setLoading(true);
        dispatch({type : SAVE_COMPANY,data : selectedCompany});
        subscriptionService.isCorporateEmailVerified({organizationId : selectedCompany.orgId}).then(data=>{
            if(validate.isNotEmpty(data) && data.statusCode === "SUCCESS" && validate.isNotEmpty(data.dataObject)){
                dispatch({type:SET_CORPORATE_EMAIL_ID,data:data.dataObject});
                setLoading(false);
                redirectToMembers();
            }else{
                setLoading(false);
                redirectToCorporateLogin();
            }
        }).catch(e =>{
            setLoading(false);
            redirectToCorporateLogin();
        })
    }

    const redirectToMembers = () =>{
        props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/corporateMemberPlans`);
    }

    const redirectToCorporateLogin = () =>{
        props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/emailOtpLogin`);
    }

    const toggleReachOutModel = (action, formHeight) => {
        if (action == 'cancel') {
            setShowReachOutModal(!showReachOutModal);
        }
        else {
            setModalHeight(formHeight)
            setShowReachOutModalThankYou(!showReachOutMOdalThankYou)
            setTimeout(() => {
                setShowReachOutModal(!showReachOutModal);
            }, 5000)

        }
    }

    const filterCompanies = (searchText) => {
        if(validate.isNotEmpty(searchText) && (!validate.isAlphaNumericWithSpace(searchText) || searchText.length > 50)){
            return;
        } 
        let filteredCompanies = searchCompanies;
        if (validate.isNotEmpty(searchText)) {
            setSelectedCompany({});
            filteredCompanies = allCompanies.filter(each => each.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
        }
        setFilterCompanies(filteredCompanies);
        setSearchVal(searchText)
    }


    const handleCompanySelection = (companyDetails) =>{
        setSelectedCompany(companyDetails);
    }

    return(
        <React.Fragment>
            <div className="my-4 py-2">
                <div className="row">
                    <div className="px-3 company-list-select">  
                         <section className="p-48 py-32">
                            <h6 className="h2 mb-4">Select your Company</h6>                          
                            <div>
                            {validate.isNotEmpty(searchCompanies) && searchCompanies.length > 0 && <h6 className="text-secondary mb-3">Frequently Searched Companies</h6>}
                                <div className="company-result-container row">
                                    { frequentlySearchedCompanies && frequentlySearchedCompanies.map(details => <div  className="col-6 mb-3" key={details.orgId}>
                                        <div className="custom-control custom-radio font-weight-normal" onClick={() => handleCompanySelection(details)}>
                                            <input type="radio" className="custom-control-input" name="company-list" checked={details.orgId === selectedCompany.orgId} id={details.orgId} value={details.name}/>
                                            <label for={details.name} className="custom-control-label pointer">
                                                {details.name}
                                            </label>
                                        </div>
                                    </div>)}
                                    <React.Fragment>
                                        { validate.isNotEmpty(searchCompanies) && searchCompanies.length > 0 && 
                                            <React.Fragment>
                                                <hr className="w-100 solid mt-2 mb-4 mx-3"/>
                                                <div className="company-search-container my-0 mx-3 w-100">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control search-company-feild" name="company search" placeholder="Enter company name to select from list" onChange={event => { filterCompanies(event.target.value);}} maxLength={50} value={searchVal}/>
                                                        <a class="icons search-icn pointer" title=""></a>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        }
                                        <div className="scroll-content">
                                            { validate.isNotEmpty(filteredCompanies) && filteredCompanies.map(details => <div className="col-6 mb-3"  key = {details.orgId}>
                                                    <div className="custom-control custom-radio font-weight-normal" onClick={() => handleCompanySelection(details)}>
                                                        <input type="radio" className="custom-control-input" name="company-list" checked={details.orgId === selectedCompany.orgId} id={details.orgId} value={details.name}/>
                                                        <label for={details.name} className="custom-control-label pointer">
                                                            {details.name}
                                                        </label>
                                                    </div>
                                                </div>)}
                                        </div>
                                        {validate.isNotEmpty(searchCompanies) && validate.isEmpty(filteredCompanies) && <p className="mt-n4 ml-4">No result found</p>}
                                    </React.Fragment>
                                </div>
                                <div className="col-6 col-md-12 pl-0 mt-2">
                                    <button disabled={validate.isEmpty(selectedCompany) || loading} onClick= {() => proceedToCorporatePlans()} className="btn px-5 btn-lg btn-brand shadow" style={{width:"20rem"}} >
                                    {loading ? 
                                        <React.Fragment>
                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                            <span className="sr-only"></span>
                                        </React.Fragment>
                                    : <React.Fragment>Proceed to Select Plan</React.Fragment>}
                                    </button>
                                </div> 
                            </div>
                        </section>
                    </div>
                    <div className="px-3 reach-out-to-container">
                        <section className="p-48 py-32">
                            <img src={CompanySearchIcon} alt="company Search icon" title="company Search icon" className="img-fluid mb-4"/>
                            <div className="pt-2">
                                <h6 className="h2 mb-4">Didn’t Find your company</h6>
                                <p className="mb-4">
                                    Sorry we do not have a customized plan for your company. Please select from any of the existing Membership plans.
                                    <br/>
                                    <br/>
                                    You can provide your company details. We will see if something exciting can be customized for your company as well.
                                </p>
                                <button className="btn px-5 btn-lg btn-dark shadow" onClick={()=>setShowReachOutModal(!showReachOutModal)}>Reach out to us</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <ReachOutToUsModal isModalOpen={showReachOutModal} modalHeight={modalHeight} showReachOutMOdalThankYou={showReachOutMOdalThankYou} toggleModal={toggleReachOutModel} />
        </React.Fragment>
    )
}
export default CompanySelect;