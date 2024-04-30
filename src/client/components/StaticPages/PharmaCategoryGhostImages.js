import React from 'react'

const PharmaCategoryGhostImages = () => {
    return (
        <React.Fragment>
            <div class="bg-light p-0 ph-item ph-row">
                <div class="ph-col-1" style={{ "height": "2rem" }}></div>
            </div>
            <section class="brandProduct px-3">
                <div class="p-0 ph-item ph-row w-100">
                    <div class="ph-col-12"></div>
                    <div class="ph-col-12"></div>
                    <div class="ph-col-12"></div>
                </div>
                <div className='d-flex flex-wrap'>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
                    return (
                        <React.Fragment>
                            <div class="each-product-card mb-3">
                                <div class="item">
                                    <div class="card mx-2">
                                        <div class="card-body p-4">
                                            <div class="row no-gutters">
                                                <div class="col">
                                                    <p class="text-left">
                                                        <div class="ph-row ph-item p-0">
                                                            <div class="mb-3 ph-col-6"></div>
                                                            <div class="empty ph-col-6"></div>
                                                            <div class="ph-col-6"></div>
                                                            <div class="empty mb-3 ph-col-6"></div>
                                                            <div class="ph-col-6"></div>
                                                        </div>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="">
                                                <div class="p-0 ph-item ph-row w-100">
                                                    <div class="ph-col-4">
                                                    </div>
                                                    <div class="empty ph-col-4">
                                                    </div>
                                                    <div class="ph-col-4">
                                                    </div>
                                                </div>
                                                <div class="p-0 ph-item ph-row w-100">
                                                    <div class="ph-col-4">
                                                    </div>
                                                    <div class="empty ph-col-4">
                                                    </div>
                                                    <div class="ph-col-4">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="bg-none card-footer mb-0 p-2 ph-item ph-row">
                                            <div class="mb-0 ph-col-12" style={{ "height": "2rem" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })}
            </div>
            </section>
        </React.Fragment>
    )
}

export default PharmaCategoryGhostImages