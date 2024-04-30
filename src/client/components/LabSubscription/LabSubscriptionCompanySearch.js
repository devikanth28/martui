import React from "react"
import SubscriptionBanner from "./SubscriptionBanner"
import CompanySelect from "./CompanySelect"
const LabSubscriptionCompanySearch=(props) =>{
    return(
        <React.Fragment>
            <SubscriptionBanner className="d-block bg-white mb-4"/>
            {/* <div className="my-4 py-2">
                <section>
                    <div className="p-48 py-32">
                        <h6 className="h2 mb-3 pb-2">Heading</h6>
                        {/* <h5 className="text-secondary mb-4 pb-2">Tag Line</h5> 
                        <p className="mb-0">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is…</p>
                    </div>
                </section>
            </div> */}
            <CompanySelect history={props.history}/>
        </React.Fragment>
    )
}
export default LabSubscriptionCompanySearch