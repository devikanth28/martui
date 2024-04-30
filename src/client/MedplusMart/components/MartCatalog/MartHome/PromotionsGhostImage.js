import React from 'react'

const PromotionsGhostImage = () => {
  return (
      <React.Fragment>
       {/* first banner */}
            <div className="ph-row ph-item p-0 m-0">
            <div className="ph-picture mb-0" style={{ "height": "20rem" }}></div>
        </div>

        {/* filters */}
          <div className="container d-flex filter-container justify-content-center pt-5" style={{"gap":"1rem"}}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
                  return (
                      <React.Fragment>
                          <div className="bg-none p-0 ph-item ph-row w-25">
                              <div className="mb-0 ph-col-8 rounded-pill" style={{ "height": "2rem" }}></div>
                          </div>
                      </React.Fragment>
                  )
              })}
          </div>


          {/* sub banners */}
          <div className="row my-3">
              {[1,2,3,4].map(()=>{
                  return(

              <div className="col-6 my-2">
                  <div className="ph-row ph-item p-0 m-0">
                      <div className="mb-0 ph-picture" style={{"height":"18rem"}}></div>
                  </div>
              </div>
                  )
              })}
          </div>
        </React.Fragment>

  )
}

export default PromotionsGhostImage;