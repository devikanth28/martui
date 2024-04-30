import React from 'react'

const StoreLocatorGhostImage = () => {
    return (
        <section className='p-4'>
            <div className="ml-2 mb-4">
                <div className="ph-row ph-item p-0">
                    <div className="col-2" style={{ "height": "2.375rem" }}></div>
                </div>
            </div>
            <div className="ml-2 p-0 ph-row ph-item">
                <div className="ph-col-4" style={{ "height": "1rem" }}></div>
            </div>
            <div className='row ml-2'>
                <div className="col-4 mb-2 px-0 py-2">
                    <div className="ph-row ph-item p-0">
                        <div className="mb-0 ph-col-6" style={{ "height": "2rem" }}></div>
                    </div>
                </div>
                <div className="col">
                    <div className="near-by-StoreLocatar">
                        <div className="locality-badges p-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
                                return (

                                    <div className="mr-3 p-0 ph-item ph-row">
                                        <div className="mb-0 ph-col-12" style={{ "height": "1.5rem", "width": "5rem" }}></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-0 row near-by-store-info'>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((each) => {
                    return (
                        <div className="balanagar col-3 m-0 p-2 store-container">
                            <div className="border p-3 rounded">
                                <div className="mt-2 p-0 ph-item ph-row">
                                    <div className="ph-col-8"></div>
                                    <div className="ph-col-2 empty"></div>
                                    <div className="ph-col-2"></div>
                                </div>
                                <div className="my-2 ph-row ph-item p-0">
                                    <div className="mb-5 ph-col-4"></div>
                                </div>
                                <div className="d-flex pl-0 flex-wrap mb-0">
                                    <div className="mb-0 p-0 ph-item ph-row w-50">
                                        <div className="ph-col-8"></div>
                                    </div>
                                    <div className="mb-0 p-0 ph-item ph-row w-50">
                                        <div className="ph-col-8"></div>
                                    </div>
                                    <div className="mb-0 mt-2 p-0 ph-item ph-row w-50">
                                        <div className="ph-col-8"></div>
                                    </div>
                                    <div className="mb-0 mt-2 p-0 ph-item ph-row w-50">
                                        <div className="ph-col-8"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
export default StoreLocatorGhostImage