import React from "react"
const LabsBanner =(props)=>{
    return(
        <React.Fragment>
        <a href="javascript:void(0)" title="click to know more" className="mb-4 pb-2 d-block">
            <img src={props.bannerSrc} alt="Click to know more" className="w-100"/>
        </a>


        {/*  ghost image */}

        <div className="ph-row ph-item p-0 m-0 d-none">
            <div className="ph-picture" style={{ "height": "20rem" }}></div>
        </div>
        </React.Fragment>
    )
}
export default LabsBanner;