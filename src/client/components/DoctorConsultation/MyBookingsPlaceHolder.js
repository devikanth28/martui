import React from 'react'

const MyBookingsPlaceHolder=(props)=>{
    return(
        <React.Fragment>


            {/* ghost image */}
       
            <div className="each-consulted-doc-card">
          <div className="card">
             <div className="card-body p-3">
                <div className="d-flex">
                   <div className="consultaion-appointment">
                   <div className="img-container ">
   <div className="ph-row">
      <div className="rounded-circle m-0" style={{"height": "66px","width":" 68px"}}></div>
   </div>
</div>
                   </div>
                   <div style={{"width": "calc(100% - 5rem)"}} className="mt-1 mx-2">
                      <div className="m-0 mb-1 mb-2 p-0 ph-item ph-row">
                         <div className="ph-col-6 m-0"></div>
                      </div>
                      <div className="m-0 mb-1 mb-2 p-0 ph-item ph-row">
                         <div className="ph-col-6 m-0"></div>
                      </div>
                      <div className="m-0 mb-1 mb-2 p-0 ph-item ph-row">
                         <div className="ph-col-6 m-0"></div>
                      </div>
                      <div className="m-0 mb-3 p-0 ph-item ph-row">
                         <div className="ph-col-6 m-0"></div>
                      </div>
                   </div>
                </div>
                <hr className="dashed"/>
                <div className="small">
                   <div className="m-0 my-2 p-0 ph-item ph-row">
                      <div className="ph-col-4 m-0"></div>
                   </div>
                   <div className="m-0 mb-1 mb-2 p-0 ph-item ph-row">
                      <div className="ph-col-2 m-0"></div>
                   </div>
                   <div className="m-0 mb-2 p-0 ph-item ph-row">
                      <div className="ph-col-6 m-0"></div>
                   </div>
                </div>
                <hr className="dashed"/>
                <div className="align-items-center d-flex justify-content-between mb-3 mt-3">
                   <div className="m-0 mb-1 p-0 ph-item ph-row" style={{"width": "100px"}}>
                      <div className="m-0 ph-col-10"></div>
                   </div>
                   <div className="m-0 mb-1  p-0 ph-item ph-row" >
                      <div className="m-0 ph-col-12" style={{"width": "80px"}}></div>
                   </div>
                </div>
                <div className="d-flex justify-content-between mt-4" >
                   <span className="small font-weight-bold" >
                      <div className="m-0 mb-2 p-0 ph-item ph-row" >
                         <div className="m-0 ph-col-12" style={{"width": "80px"}}></div>
                      </div>
                      <div className="m-0 mb-1  p-0 ph-item ph-row" >
                         <div className="m-0 ph-col-12" style={{"width": "80px"}}></div>
                      </div>
                   </span>
                   <span className="small font-weight-bold" >
                      <div className="m-0 mb-2 p-0 ph-item ph-row" >
                         <div className="m-0 ph-col-12" style={{"width": "80px"}}></div>
                      </div>
                      <div className="m-0 mb-1  p-0 ph-item ph-row">
                         <div className="m-0 ph-col-12" style={{"width": "80px"}}></div>
                      </div>
                   </span>
                </div>
             </div>
             
             <div className="card-footer bg-white p-0">
                <div className="row mx-0">
                   <div className="col ml-2 pt-2 px-0">
                      <div>
                         <div className="p-0 ph-item ph-row pt-1" style={{"width":"90px"}}>
                            <div className="mb-0 ph-col-12" style={{"height": "2rem"}}></div>
                         </div>
                      </div>
                   </div>
                   <div className="col ml-2 pt-2 px-0">
                      <div>
                         <div className="p-0 ph-item ph-row pt-1" style={{"width": "90px"}}>
                            <div className="mb-0 ph-col-12" style={{"height": "2rem"}}></div>
                         </div>
                      </div>
                   </div>
                   <div className="col ml-2 pt-2 px-0" >
                      <div>
                         <div className="p-0 ph-item ph-row pt-1" style={{"width": "90px"}}>
                            <div className="mb-0 ph-col-12" style={{"height": "2rem"}}></div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
       
               
        </React.Fragment>
    )
}


export default MyBookingsPlaceHolder
