import React, { useState } from "react"
import CompanySearchIcon from "../../images/common/Call center-amico.svg"
import ReachOutToUsModal from "./ReachOutToUsModal"
const CompanySelect = (props) => {
    const [showReachOutModal, setShowReachOutModal] = useState(false)
    const [showReachOutMOdalThankYou, setShowReachOutModalThankYou] = useState(false)
    const [modalHeight, setModalHeight] = useState("unset")
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


    return (
        <React.Fragment>
            <div className="my-4 d-none py-2">
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

            <div className="my-4 py-2">
                <div className="row">
                    <div className="px-3 company-list-select">
                        <section className="p-48 py-32">
                            <h6 className="h2 mb-2">Select your Company</h6>
                            {/* <h5 className="text-secondary">Tag line of benefits</h5> */}
                            <div className="company-search-container">
                                <div className="form-group">
                                    <input type="text" className="form-control search-company-feild" name="company search" placeholder="Enter company name to select from list" />
                                    <a class="icons search-icn pointer" title=""></a>
                                </div>
                            </div>
                            <div>
                                <h6 className="text-secondary mb-3">Frequently Searched Companies</h6>
                                <div className="company-result-container row">
                                    <div className="col-6 mb-3">
                                        <div className="custom-control custom-radio font-weight-normal">
                                            <input type="radio" className="custom-control-input" name="company-list" id="company-wipro" value="Wipro" />
                                            <label for="company-wipro" className="custom-control-label pointer">
                                                <p>Wipro</p>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <div className="custom-control custom-radio font-weight-normal">
                                            <input type="radio" className="custom-control-input" name="company-list" id="company-Tata-Consultancy" value="Tata Consultancy" />
                                            <label for="company-Tata-Consultancy" className="custom-control-label pointer">
                                                <p>Tata Consultancy</p>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <div className="custom-control custom-radio font-weight-normal">
                                            <input type="radio" className="custom-control-input" name="company-list" id="company-wipro" value="Wipro" />
                                            <label for="company-wipro" className="custom-control-label pointer">
                                                <p>Wipro</p>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <div className="custom-control custom-radio font-weight-normal">
                                            <input type="radio" className="custom-control-input" name="company-list" id="company-Tata-Consultancy" value="Tata Consultancy" />
                                            <label for="company-Tata-Consultancy" className="custom-control-label pointer">
                                                <p>Tata Consultancy</p>
                                            </label>
                                        </div>
                                    </div>
                                    <hr className="w-100 solid mt-0 mb-3 mx-3" />
                                    <div className="scroll-content">
                                        <div className="col-6 mb-3">
                                            <div className="custom-control custom-radio font-weight-normal">
                                                <input type="radio" className="custom-control-input" name="company-list" id="company-Infosys" value="Infosys" />
                                                <label for="company-Infosys" className="custom-control-label pointer">
                                                    <p>Infosys</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="custom-control custom-radio font-weight-normal">
                                                <input type="radio" className="custom-control-input" name="company-list" id="company-ADP" value="ADP" />
                                                <label for="company-ADP" className="custom-control-label pointer">
                                                    <p>ADP</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="custom-control custom-radio font-weight-normal">
                                                <input type="radio" className="custom-control-input" name="company-list" id="company-Infosys" value="Infosys" />
                                                <label for="company-Infosys" className="custom-control-label pointer">
                                                    <p>Infosys</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="custom-control custom-radio font-weight-normal">
                                                <input type="radio" className="custom-control-input" name="company-list" id="company-ADP" value="ADP" />
                                                <label for="company-ADP" className="custom-control-label pointer">
                                                    <p>ADP</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="custom-control custom-radio font-weight-normal">
                                                <input type="radio" className="custom-control-input" name="company-list" id="company-Infosys" value="Infosys" />
                                                <label for="company-Infosys" className="custom-control-label pointer">
                                                    <p>Infosys</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="custom-control custom-radio font-weight-normal">
                                                <input type="radio" className="custom-control-input" name="company-list" id="company-ADP" value="ADP" />
                                                <label for="company-ADP" className="custom-control-label pointer">
                                                    <p>ADP</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="custom-control custom-radio font-weight-normal">
                                                <input type="radio" className="custom-control-input" name="company-list" id="company-Infosys" value="Infosys" />
                                                <label for="company-Infosys" className="custom-control-label pointer">
                                                    <p>Infosys</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="custom-control custom-radio font-weight-normal">
                                                <input type="radio" className="custom-control-input" name="company-list" id="company-ADP" value="ADP" />
                                                <label for="company-ADP" className="custom-control-label pointer">
                                                    <p>ADP</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="custom-control custom-radio font-weight-normal">
                                                <input type="radio" className="custom-control-input" name="company-list" id="company-Infosys" value="Infosys" />
                                                <label for="company-Infosys" className="custom-control-label pointer">
                                                    <p>Infosys</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="custom-control custom-radio font-weight-normal">
                                                <input type="radio" className="custom-control-input" name="company-list" id="company-ADP" value="ADP" />
                                                <label for="company-ADP" className="custom-control-label pointer">
                                                    <p>ADP</p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-md-12 pl-0 mt-2">
                                    <button className="btn px-5 btn-lg btn-brand shadow" onClick={() => props.history.push("/labcorporatelogin")}>Proceed to Select Plan</button>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="px-3 reach-out-to-container">
                        <section className="p-48 py-32">
                            <img src={CompanySearchIcon} alt="company Search icon" title="company Search icon" className="img-fluid mb-4" />
                            <div className="pt-2">
                                <h6 className="h2 mb-4">Didn’t Find your company</h6>
                                <p className="mb-4">
                                    Sorry we do not have a customized plan for your company. Please select from any of the existing Membership plans.
                                    <br />
                                    <br />
                                    You can provide your company details. We will see if something exciting can be customized for your company as well.
                                </p>
                                <button className="btn px-5 btn-lg btn-dark shadow" onClick={() => setShowReachOutModal(!showReachOutModal)}>Reach out to us</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <ReachOutToUsModal isModalOpen={showReachOutModal} modalHeight={modalHeight} showReachOutMOdalThankYou={showReachOutMOdalThankYou} toggleModal={toggleReachOutModel} />
        </React.Fragment>
    )
}
export default CompanySelect