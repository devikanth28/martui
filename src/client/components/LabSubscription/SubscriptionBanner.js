import React from "react"
import Validate from "../../helpers/Validate"
import HomePageSeperator from "../../images/common/lab-home-seperator.png";
const SubscriptionBanner =(props) =>{
    const validate = Validate();
    return(
        <React.Fragment>
            {/* commented code for Ghost Image */}
            {/* <section className={validate.isNotEmpty(props.sectionClass) ? props.sectionClass : ""}>
                <div className={ validate.isNotEmpty(props.className) ? props.className : "mb-4 d-block pb-2 bg-white" }>
                    <div className="border-0 m-0 p-0 ph-item">
                        <div className="ph-col-12 p-0">
                            <div className="ph-row p-0 mb-0">
                                <div className="ph-picture mb-0" style={{"height": "200px"}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <section className={validate.isNotEmpty(props.sectionClass) ? props.sectionClass : ""}>
                <a href="javascript:void(0)" title="click to know more" className={ validate.isNotEmpty(props.className) ? props.className : "mb-4 d-block pb-2 bg-white" }>
                    <img src={HomePageSeperator} alt="Click to know more" className="w-100"/>
                </a>
            </section>
        </React.Fragment>
    )
}
export default SubscriptionBanner