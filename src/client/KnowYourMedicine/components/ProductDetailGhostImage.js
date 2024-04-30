import React from 'react'
import SimilarProductsGhostImage from '../../MedplusMart/components/MartCatalog/ProductDetail/SimilarProductsGhostImage'
import OtherProductGhostImage from './OtherProductGhostImage'

const ProductDetailGhostImage = () => {
  return (
    <div className="container-fluid ">
        <div className='row p-3'>
            <div className='col-8 card p-0'>
                <div className='d-flex'>
                      <div className='col-3'>
                          <div className="mb-0  ph-item" style={{ "background-color": "unset" }}>
                              <div className="ph-col-12 p-0">
                                  <div className="ph-row mb-0">
                                      <div className="ph-picture m-0" style={{ "height": "18.875rem", "width": "15.875rem" }}></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                    <div className='col-9'>
                    <div>
                    <div className="ph-item mb-0">
                    <div className="p-0">
                        <div className="ph-row p-0 mb-0">
                            <div className="m-0 ph-col-2 mb-5" style={{ "height": "2rem"}}></div>
                            <div className="mt-2 ph-col-8 empty"></div>
                            <div className="m-0 ph-col-2 mb-5" style={{ "height": "2rem"}}></div>
                            <div className="m-0 ph-col-2 mb-2" style={{ "height": "1rem"}}></div>
                            <div className="m-0 ph-col-10 empty"></div>
                            <div className="m-0 ph-col-2 mb-2" style={{ "height": "1rem"}}></div>
                            <div className="m-0 ph-col-10 empty mb-5"></div>
                            <div className="m-0 ph-col-2 mb-2" style={{ "height": "1rem"}}></div>
                            <div className="m-0 ph-col-10 empty"></div>
                            <div className="m-0 ph-col-2 mb-2" style={{ "height": "1rem"}}></div>
                            <div className="m-0 ph-col-10 empty mb-5"></div>
                            <div className="m-0 ph-col-2 mb-2" style={{ "height": "1rem"}}></div>
                            <div className="m-0 ph-col-10 empty"></div>
                            <div className="m-0 ph-col-2 mb-2" style={{ "height": "1rem"}}></div>
                            <div className="m-0 ph-col-8 empty"></div>
                            <div className="m-0 ph-col-2" style={{ "height": "2rem"}}></div>

                            {/* </div> */}
                        </div>
                    </div>
                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-4'>
                <OtherProductGhostImage/>
            </div>
        </div>
    </div>
  )
}

export default ProductDetailGhostImage