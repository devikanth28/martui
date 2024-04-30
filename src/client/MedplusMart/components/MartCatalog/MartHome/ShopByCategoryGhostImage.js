import React from 'react'
const ShopByCategoryGhostImage = () => {
    return (
        <React.Fragment>
                <div className="bg-none m-0 mb-3 p-0 ph-item ph-row w-50"><div className="m-0 mt-2 ph-col-2" style={{"height":"1.5rem"}}></div></div>
            <section className="mb-4 col-12">
                <div className="square-card-slider py-4 px-2 d-flex mb-0 flex-wrap" style={{"gap":"1rem"}}>
                    {[1, 2, 3, 4, 5, 6,7,8,9,10,11,12].map((each) => {
                        return (
                            <div className="category-card card">
                                  <div className="p-0">
                                     <div className="d-flex align-items-center my-2">
                                        <div className="mx-5 my-0 p-0 ph-item ph-picture" style={{"height":"5.5rem"}}></div>
                                     </div>
                                  </div>
                                  <div className="card-footer bg-transparent p-2">
                                     <div className="mb-0 p-0 ph-item ph-row pt-2">
                                        <div className="ph-col-12" style={{"height":"1rem"}}></div>
                                     </div>
                                  </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </React.Fragment>
    )
}
export default ShopByCategoryGhostImage