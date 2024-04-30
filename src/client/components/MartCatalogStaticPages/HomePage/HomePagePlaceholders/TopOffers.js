import React, { useEffect, useState } from 'react'
const TopOffers = (props) => {
   const [ghostimg ,setGhostimg]=useState([]);
   useEffect(()=>{
      if(window.screen.width>=1680 && window.screen.width <= 1920){
         setGhostimg([1,2,3,4,5,6])
      }
      if(window.screen.width>=1280 && window.screen.width<=1440){
         setGhostimg([1,2,3,4,5])
      }
      if(window.screen.width>=1024 && window.screen.width<=1280){
         setGhostimg([1,2,3])
      }
   },[])
    return (
        <React.Fragment>
         <div className="bg-transparent m-0 pt-2 mb-3  p-0 ph-item ph-row">
            <div className="ph-col-2 m-0" style={{"height":"1.5rem"}}></div>
         </div>
         <div style={{"background":"#fff"}}>
         {props.viewAll ? 
          <React.Fragment>
                <div className='d-flex flex-wrap'>
       {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((each)=>{
      return(
            <div className="item  my-2" style={{"width":"16.66%"}}>
       <div className=" card mx-2 product-card">
          <div className="card-body p-2 pointer">
             <div>
                <div className="text-center position-relative mb-2">
                   <div className="mt-4 ph-row ph-item py-0 mx-auto" style={{"width":"9rem"}}>
                      <div className="mb-4 mx-auto ph-picture" style={{"height":"7.125rem"}}></div>
                   </div>
                </div>
                <div className="m-0 mb-2 p-0 ph-item ph-row">
                   <div className="m-0 ml-auto mx-3 mx-5 ph-col-10"></div>
                </div>
                <div className="m-0 mb-3 p-0 ph-item ph-row">
                   <div className="m-0 ph-col-6"></div>
                </div>
                <div className="m-0 mb-2 p-0 ph-item ph-row">
                   <div className="m-0 ph-col-10"></div>
                </div>
             </div>
          </div>
          <div className="card-footer p-2 bg-white">
             <div className="ph-row ph-item p-0 mb-0">
                <div className="ph-col-12 m-0" style={{"height":"2rem"}}></div>
             </div>
          </div>
       </div>
    </div>
       )})}
      </div>
          </React.Fragment> : <React.Fragment>
          <div className='d-flex px-4'>
     {ghostimg.map(()=>{
        return(
         <div className=''>
         <div className="item  my-2" style={{"width":"18.375rem"}}>
            <div className="h-100 card mx-2 product-card">
               <div className="card-body p-2 pointer">
                  <div>
                     <div className="text-center position-relative mb-2">
                        <div className="mt-4 ph-row ph-item py-0 mx-auto" style={{"width":"9rem"}}>
                           <div className="mb-4 mx-auto ph-picture" style={{"height": "7.125rem"}}></div>
                        </div>
                     </div>
                     <div className="m-0 mb-2 p-0 ph-item ph-row">
                        <div className="m-0 ml-auto mx-3 mx-5 ph-col-10"></div>
                     </div>
                     <div className="m-0 mb-3 p-0 ph-item ph-row">
                        <div className="m-0 ph-col-6"></div>
                     </div>
                     <div className="m-0 mb-2 p-0 ph-item ph-row">
                        <div className="m-0 ph-col-10"></div>
                     </div>
                  </div>
               </div>
               <div className="card-footer p-2 bg-white">
                  <div className="ph-row ph-item p-0 mb-0">
                     <div className="ph-col-12 m-0" style={{"height":"2rem"}}></div>
                  </div>
               </div>
            </div>
           </div>
           </div>
        )
     })}
    </div>
             </React.Fragment>}
   </div>
        </React.Fragment>
      )
}
export default TopOffers