import React from 'react'
const SimilarproductsPlaceholders = () => {
  return (
    <React.Fragment>
        <div class="bg-transparent mb-0 ph-item ph-row pl-0 py-0">
                <div class="ph-col-2" style={{"height":"1rem"}}></div>
                            </div>
                    {[1,2,3,4,5,6].map((each)=>{
                        return(
                            <div className="shadow-none py-2 OtherProductDetails">
                            <div className="row mx-0" style={{"background": "#fff"}}>
                                <div className="col-2">
                                    <div className="mt-4 p-0 ph-item ph-row">
                                        <div className="mb-0 ml-3 ph-picture" style={{"height":"3rem"}}></div>
                                    </div>
                                </div>
                            <div className="col-10">
                                <div className="mt-3 ph-item ph-row py-0">
                                    <div className="mb-3 ph-col-10"></div>
                                    <div className="ph-col-2 empty"></div>
                                    <div className="ph-col-2"></div>
                                    <div className="empty ph-col-10"></div>
                                    <div className="ph-col-2"></div>
                                </div>
                            </div></div></div>
                        )
                    })}
    </React.Fragment>
  )
}
export default SimilarproductsPlaceholders