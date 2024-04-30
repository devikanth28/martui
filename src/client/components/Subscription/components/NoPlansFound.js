import React, { useState } from "react";
import NoImageFound from '../../../images/common/Current-location.svg'
import {getSelectedLocality } from "../../../../redux/action/LocalityAction";
import ChangeLocality from "../../Locality/ChangeLocality";

const NoPlansFound = (props) => {

    const [isLocalityModalOpen, setLocalityModalOpen] = useState(false);
    const selectedLocality = getSelectedLocality();

    return (
        <React.Fragment>
             <div className={`no-purchase-history body-height`}>
                    <img src={NoImageFound} alt="No Data Found" className="mb-3" />
                    {<h6 className="mb-3 h4">Unfortunately, MedPlus Advantage 
                    <span className="d-block">plans are not available in your selected locality</span></h6>}
                    {/* <p>To view plans, listed few of the localities where our services available are 
                        <div>
                            <button type="button" role="button" className="btn btn-link btn-sm px-0 text-info">Hyderabad, </button>
                            <button type="button" role="button" className="btn btn-link btn-sm px-0 text-info">Bangalore,</button>
                            <button type="button" role="button" className="btn btn-link btn-sm px-0 text-info">Chennai, </button>
                            <button type="button" role="button" className="btn btn-link btn-sm px-0 text-info">Vijayawada</button>
                            <span>(or)</span> */}
                            <button onClick={()=>{setLocalityModalOpen(prevState => !prevState)}} type="button" role="button" className="btn btn-brand-gradient rounded-pill">Change Locality</button>
                        {/* </div>
                    </p> */}
                    <ChangeLocality modal = {isLocalityModalOpen} toggle = {()=>{setLocalityModalOpen(prevState => !prevState)}}  selectedLocality= {selectedLocality}/>
            </div>
        </React.Fragment>
    )
}
export default NoPlansFound