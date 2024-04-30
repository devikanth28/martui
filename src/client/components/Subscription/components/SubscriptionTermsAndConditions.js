import React from "react"
const SubscriptionTermsAndConditions=(props)=>{

        return (
          <React.Fragment>
         <section>
               <div className ="subscription-terms">
                    <div>
                        <h5>MedPlus Advantage &ndash; Terms & Conditions</h5>
                        <div dangerouslySetInnerHTML={{ __html: props.termsAndConditions }} />
                     </div>   
                </div>
            </section>
          </React.Fragment>
        );
}
export default SubscriptionTermsAndConditions