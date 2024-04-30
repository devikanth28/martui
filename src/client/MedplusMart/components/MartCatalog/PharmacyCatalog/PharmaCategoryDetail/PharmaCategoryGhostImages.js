import React from 'react'

const PharmaCategoryGhostImages = (props) => {
    return (
        <React.Fragment>
            {props.onlyCatagoryProducts ? <CatalogProductsGhostImages /> : <React.Fragment>
                <div class="bg-light p-0 ph-item ph-row">
                    <div class="ph-col-1 rounded-pill" style={{ "height": "1.75rem" }}></div>
                </div>
                <section class="px-2 py-3">
                    <div class="p-0 ph-item ph-row w-100 pl-1">
                        <div class="ph-col-6 mb-0" style={{"height":"2rem"}}></div>
                        <div class="ph-col-12 empty"></div>
                        <div class="ph-col-12"></div>
                        <div class="ph-col-12"></div>
                    </div>
                    <div className='w-100'>
                        <CatalogProductsGhostImages />
                    </div>
                </section>
            </React.Fragment>
            }
        </React.Fragment>
    )
}

export default PharmaCategoryGhostImages


const CatalogProductsGhostImages = () => {
    return (
        <div className="home-page-products-slider w-100">
        <div className="d-flex flex-wrap">
        {[1, 2, 3, 4, 5, 6].map((each) => {
                return (
                    <div className="category-card-ghostImage">
                        <div className="card mx-2 product-card">
                            <div className="card-body p-2 pointer">
                                <div>
                                    <div className="text-center position-relative mb-2">
                                        <div className="mt-4 ph-row ph-item py-0 mx-auto" style={{ "width": "9rem" }}>
                                            <div className="mb-4 mx-auto ph-picture" style={{ "height": "7.125rem" }}></div>
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
                            <div className="card-footer p-2 bg-white border-0">
                                <div className="ph-row ph-item p-0 mb-0 rounded-pill">
                                    <div className="ph-col-12 m-0" style={{ "height": "2.5rem" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        </div>
    )
}