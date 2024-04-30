import React from "react";
import CompanySearcIcon from "../../../images/common/Search engines-pana.svg"
import { MEDPLUS_ADVANTAGE_URL_PREFIX } from "../constants/SubscriptionConstants";
const CorporateSearch=(props)=>{


    const redirectToCompanyList =() =>{
        //window.location.href = CONFIG.REDIRECT_HOME_URL+ "companyList";
        props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/companyList`);
    }

    return(
        <React.Fragment>
             <section className="rounded-0 d-none">
                <div className="search-company-container">
                    <div className="content">
                        <div className="m-0 p-0 ph-item" style={{"background-color": 'unset'}}>
                            <div className="ph-col-12 p-0">
                                <div className="ph-row p-0 mb-0">
                                    <div className="mb-2 ph-col-4" style={{"height": '24px'}}></div>
                                    <div className="mb-2 ph-col-8 empty" style={{"height": '24px'}}></div>
                                    <div className="mb-4 ph-col-6" style={{"height": '21px'}}></div>
                                    <div className="mb-4 ph-col-6 empty" style={{"height": '21px'}}></div>
                                </div>
                                <div className="ph-row p-0 mb-0">
                                    <div className="mb-2 ph-col-4" style={{"height": '19px'}}></div>
                                    <div className="mb-2 ph-col-8 empty" style={{"height": '19px'}}></div>
                                    <div className="mb-4 ph-col-8" style={{"height": '19px'}}></div>
                                    <div className="mb-4 ph-col-4 empty" style={{"height": '19px'}}></div>
                                </div>
                                <div className="ph-row p-0 mb-0">
                                    <div className="pr-4 mr-2 ph-col-2 mb-0" style={{"height": '48px'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-inline-block">
                        <div class="m-0 p-0 ph-item" style={{"background-color": 'unset'}}>
                            <div class="ph-col-12 p-0">
                                <div class="ph-row p-0 mb-0">
                                     <div class="ph-picture m-0" style={{"height": '210px',"width":"360px"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </section>
            <section className="rounded-0">
                <div className="search-company-container">
                    <div className="content">
                        <h5>Corporate Membership Plans</h5>
                        <p className="text-secondary font-14 mb-4">By selecting company, you can find your corporate membership plan</p>
                        <h6>Are you a corporate employee?</h6>
                        <p className="mb-4">We have customized plans and benefits for selected corporates. Check if there is one for your corporate as well.</p>
                        <button className="btn btn-dark px-5 btn-lg shadow" onClick={() => redirectToCompanyList()}>Search Company</button>
                    </div>
                    <div className="d-inline-block">
                        <img className="img-fluid" src={CompanySearcIcon} alt="Corporate Membership Plans" title="Corporate Membership Plans"/>
                    </div>
                </div>
            </section>
            
        </React.Fragment>
    )
}
export default CorporateSearch;