import React, { useState } from "react"
const ProductDetailFeedback=()=>{
    const [isfeedbackGiven, setIsFeedbackGiven] = useState(false)
    function getFeedback(feedback){
        setIsFeedbackGiven(true)
    }
    return(
        <React.Fragment>
            <div className="d-flex justify-content-between align-items-center py-3 border-top mx-3">
                { !isfeedbackGiven && <div>
                    <strong className="font-14 mr-4">Was this information helpful?</strong>
                    <button className="btn btn-outline-primary border px-5 mr-2 border-dark" onClick={()=>getFeedback("yes")}>Yes</button>
                    <button className="btn btn-outline-primary border px-5 border-dark" onClick={()=>getFeedback("no")}>No</button>
                </div>}
                {isfeedbackGiven && <strong className="font-14 pr-5">Thanks for your feedback!</strong>}
            </div>
        </React.Fragment>
    )
}
export default ProductDetailFeedback;