import React from 'react'

const StoreLocatorGhostImage = () => {
    return (
        <section className='p-4'>
            <div class="ph-item ph-row p-0 mb-3">
                <div class="col-3" style={{"height":"2.5rem"}}></div>
                <div class="col-6 empty"></div>
                <div class="col-3" style={{"height":"2.5rem"}}></div>
            </div>
                <div class="ph-row ph-item p-0">
                    <div class="col-2" style={{"height": "2rem"}}></div>
                    <div class="col-1 empty"></div>
                    <div class="mb-0 col-2" style={{"height":"2rem"}}></div>
                </div>
            <div className='mx-0 row near-by-store-info'>
                {[1, 2, 3, 4,5,6,7,8,9].map((each) => {
                    return (
                        <div class="balanagar col-3 m-0 p-2 store-container">
                        <div class="border p-3 rounded">
                           <div class="mt-2 p-0 ph-item ph-row">
                              <div class="ph-col-8" style={{"height":"1rem"}}></div>
                              <div class="ph-col-2 empty"></div>
                              <div class="ph-col-2" style={{"height": "1rem"}}></div>
                           </div>
                           <div class="mb-3 p-0 ph-item ph-row">
                              <div class="ph-col-12"></div>
                              <div class="ph-col-12"></div>
                              <div class="ph-col-12"></div>
                           </div>
                           <div class="d-flex pl-0 flex-wrap mb-0">
                              <div class="mb-0 mt-2 p-0 ph-item ph-row w-50">
                                 <div class="ph-col-8"></div>
                              </div>
                              <div class="mb-0 mt-2 p-0 ph-item ph-row w-50">
                                 <div class="ph-col-8"></div>
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
export default StoreLocatorGhostImage;