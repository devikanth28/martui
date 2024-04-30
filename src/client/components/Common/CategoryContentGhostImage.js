import React from 'react'

function CategoryContentGhostImage(props){
    return(
        <React.Fragment>
            <section className='p-3'>
                <div class="pb-1 ph-item ph-row py-0">
                    <div class="mb-2 ph-col-4" style={{ "height": "2rem" }}></div>
                </div>
                <div class="mb-0 mb-3 ph-item ph-row py-0">
                    <div class="ph-col-12 "></div>
                    <div class="ph-col-4"></div>
                </div>
                <div class="ph-item ph-row py-0 mb-3">
                    <div class="mb-2  ph-col-2"></div>
                </div>
                <div class="ml-4">
                    {[1, 2, 3, 4, 5, 6, 7].map(() => {
                        return (
                            <React.Fragment>
                                <div class="ph-item ph-row py-0">
                                    <div class="ph-col-2 "></div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
                <div class="ph-row ph-item p-0 mt-3">
                    <div class="ph-col-12"></div>
                </div>
                <div class="ph-row ph-item p-0 mt-4">
                    <div class="ph-col-2 mb-3" style={{ "height": "2rem" }}></div>
                </div>
                <div class="ph-row ph-item p-0">
                    <div class="mb-3 ph-col-12"></div>
                    <div class="ph-col-12"></div>
                </div>
            </section>

        </React.Fragment>
    )

}

export default CategoryContentGhostImage