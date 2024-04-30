import React from 'react'

const OtherProductGhostImage = () => {
    const arr=[1,2,3,4,5,6];
  return (
    <React.Fragment>
        <div className='card'>

    <div class=" mb-0 ph-item ph-row">
            <div class="ph-col-4" style={{"height":"1rem"}}></div>
                        </div>
                {arr.map((each, index)=>{
                    return(
                        <div className={`${index !== arr.length - 1 ? "border-bottom" :""}`}>
                        <div className="row mx-0 align-items-center p-2">
                            <div className="col-2">
                                <div className=" p-0 ph-item ph-row">
                                    <div className="mb-0 ml-3 ph-picture" style={{"height":"3rem"}}></div>
                                </div>
                            </div>
                        <div className="col-10 mt-2">
                            <div className=" ph-item ph-row py-0">
                                <div className="mb-3 ph-col-4"></div>
                                <div className="ph-col-8 empty"></div>
                                <div className="ph-col-4"></div>
                                <div className="empty ph-col-8"></div>
                                {/* <div className="ph-col-2"></div> */}
                            </div>
                        </div></div></div>
                    )
                })}
        </div>
</React.Fragment>
  )
}

export default OtherProductGhostImage