import React from 'react'

const SearchAllGhostImage = () => {
  return (
    <React.Fragment>
        <div className='row'>
          <div className='col-8'>
            <section className='wishlist-content'>
              <div className='searchAll-product-list row m-0 px-2'>
                <div className='w-100 d-flex flex-wrap'>
                  {[1,2,3,4,5].map(()=>{
                    return(
                      <div className='each-product searchall-product'>
                        <div className='card p-2'>
                          <div className="mt-4 ph-row ph-item py-0 mx-auto" style={{ "width": "9rem" }}>
                            <div className="mb-4 mx-auto ph-picture" style={{ "height": "7.125rem" }}></div>
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
                          <div className="card-footer p-2 bg-white">
                            <div className="ph-row ph-item p-0 mb-0 rounded-pill">
                              <div className="ph-col-12 m-0" style={{ "height": "2rem" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          </div>
          <div className='col-4 pl-0'>
          <section>
            {[1, 2, 3, 4, 5, 6,7, 8, 9].map((each) => {
              return (
                <div className="page-header">
                  <div className={`p-0 ph-item ph-row pl-3 ${each == 1 ? "pt-3" : ""}`}>
                    <div class="ph-col-8" style={{ "height": "2rem" }}></div>
                  </div>
                </div>
              )
            })}
          </section>
          </div>
        </div>
    </React.Fragment>
  )
}

export default SearchAllGhostImage