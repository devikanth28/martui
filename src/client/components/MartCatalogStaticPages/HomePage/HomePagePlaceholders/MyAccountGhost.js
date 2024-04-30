import React from 'react'
const MyAccountGhost = () => {
  return (
<React.Fragment>
        <div style={{"background":"rgb(255, 255, 255)"}} className="p-1">
   <div className="mb-1 pb-0 ph-item ph-row pt-2">
      <div className="ph-col-2 my-3" style={{"height":"1.5rem"}}></div>
   </div>
   <div className="row mx-1 pb-3">
   {[1,2,3,4].map((each)=>{
      return(
   <div className="col-3">
      <div className="card">
         <div className="card-body p-3">
            <div className="d-flex justify-content-between">
               <div className="align align-items-center d-flex" role="button">
                  <span className="mr-3">
                     <div className="p-0 ph-item ph-row">
                        <div className="ph-picture m-0" style={{"height":"3rem","width":"3rem"}}></div>
                     </div>
                  </span>
                  <div>
                     <div className="ph-row ph-item p-0">
                        <div className="ph-col-12"></div>
                     </div>
                     <div className="mb-0 p-0 ph-row ph-item">
                        <div className="ph-col-12" style={{"width":"12.063rem"}}></div>
                     </div>
                  </div>
               </div>
               <div className="my-3 p-0 ph-item ph-row">
                  <div className="ph-picture m-0" style={{"height":"1.5rem","width":"1.5rem"}}></div>
               </div>
            </div>
         </div>
      </div>
   </div>
      )
   })}
</div>
</div>
    </React.Fragment>
  )
}
export default MyAccountGhost