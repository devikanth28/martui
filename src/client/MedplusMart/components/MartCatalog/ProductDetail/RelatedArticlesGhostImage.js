import React from 'react'
const RelatedArticlesGhostImage = () => {
  return (
    <React.Fragment>
    <section className='row mx-0'>
        {[1, 2, 3].map(() => {
            return (
                <div className="col-4">
                    <div className="related-card my-3 p-0">
                        <div className="p-0 ph-item ph-row w-100">
                            <div className="ph-picture" style={{ "height": "10rem" }}></div>
                        </div>
                        <div className="card-content p-2 w-100">
                            <div className="ph-row ph-item p-0">
                                <div className="ph-col-8" style={{ "height": "1rem" }}></div>
                            </div>
                            <div className="ph-row ph-item p-0">
                                <div className="ph-col-8" style={{ "height": "1rem" }}></div>
                            </div>
                            <div className="p-0 ph-item ph-row">
                                <div className="ph-col-12" style={{ "height": "1rem" }}>
                                </div>
                                <div className="mb-4 ph-col-12" style={{ "height": "1rem" }}>
                                </div>
                                <div className="ph-col-8 empty"></div>
                                <div className="ph-col-4" style={{ "height": "1rem" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
    </section>
</React.Fragment>
  )
}
export default RelatedArticlesGhostImage