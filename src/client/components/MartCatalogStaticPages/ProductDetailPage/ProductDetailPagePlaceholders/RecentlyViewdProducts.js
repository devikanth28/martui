import React from 'react'
const RecentlyViewdProducts = () => {
  return (
    <React.Fragment>
                           <div className="bg-transparent m-0 mb-4 mt-3 p-0 ph-item ph-row shadow-none"><div className="ph-col-2 m-0" style={{"height":"1.5rem"}}></div></div>
<div className="home-page-slider-container d-flex p-4 pb-2 px-4 pt-2" style={{"background":"#fff"}}>
    {[1, 2, 3, 4].map((each) => {
        return (
            <div className="item h-100" style={{"width":"18.375rem"}}>
                <div className="h-100 card mx-2 product-card">
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
                            <div className="m-0 mb-3 p-0 ph-item ph-row">
                                <div className="m-0 ph-col-10"></div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer p-2 bg-white">
                        <div className="ph-row ph-item p-0 mb-0">
                            <div className="ph-col-12 m-0" style={{"height":"2rem" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })}
</div>
   </React.Fragment>
  )
}
export default RecentlyViewdProducts