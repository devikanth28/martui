import React from 'react'
const BlogPostListGhostImage = () => {
  return (
    <React.Fragment>
            <div>
                    <div className='pr-3'>
                        {[1,2,3,4,5,6,7,8,9].map(()=>{
                            return(
                                <React.Fragment>
                                <div class="d-flex mb-4">
                                    <div class="p-0 ph-item ph-row w-25">
                                        <div class="ph-picture" style={{"height":"5.625rem"}}></div>
                                    </div>
                                    <div class="card-summary px-3 position-relative w-100">
                                        <div class="mb-0 p-0 ph-item ph-row">
                                            <div class="ph-col-6" style={{"height":"2rem"}}></div>
                                            <div class="ph-col-6 empty"></div>
                                            <div class="ph-col-4"></div>
                                        </div>
                                        <div class="mt-3 p-0 ph-item ph-row">
                                            <div class="ph-col-12"></div>
                                            <div class="ph-col-6"></div>
                                        </div>
                                    </div>
                                </div>
                                <hr className='my-3 border-bottom-0'/>
                                </React.Fragment>
                            )
                        })}
                    </div>
            </div>
    </React.Fragment>
  )
}

export default BlogPostListGhostImage