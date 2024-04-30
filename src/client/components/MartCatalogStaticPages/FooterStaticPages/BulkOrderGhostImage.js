import React from 'react'

const BulkOrderGhostImage = () => {
  return (
    <React.Fragment>
      <section className='p-4'>
        <div className='container'>
          <div className='py-3 px-0 ph-row ph-item'>
            <div className='ph-col-10'></div>
          </div>
          <div className="row Available-products no-gutters">
            <div className="col-5">
              <div className="ph-row ph-item p-0">
                <div className="ph-col-10"></div>
              </div>
              <ul className="py-1">
                <div className="ph-row ph-item p-0">
                  <div className="ph-col-8"></div>
                </div>
                <div className="ph-row ph-item p-0">
                  <div className="ph-col-8"></div>
                </div>
                <div className="ph-row ph-item p-0">
                  <div className="ph-col-8"></div>
                </div>
                <div className="ph-row ph-item p-0">
                  <div className="ph-col-8"></div>
                </div>
              </ul>
            </div>
            <div className="col-5">
              <div className="ph-row ph-item p-0">
                <div className="ph-col-10"></div>
              </div>
              <ul className="py-1">
                <div className="ph-row ph-item p-0">
                  <div className="ph-col-8"></div>
                </div>
                <div className="ph-row ph-item p-0">
                  <div className="ph-col-8"></div>
                </div>
                <div className="ph-row ph-item p-0">
                  <div className="ph-col-8"></div>
                </div>
                <div className="ph-row ph-item p-0">
                  <div className="ph-col-8"></div>
                </div>
              </ul>
            </div>
          </div>
          <div className="ph-row ph-item p-0">
            <div className="ph-col-10"></div>
          </div>
        </div>
      </section>
      <section className='Product-Enquiry  mt-4'>
        <div className='Product-Enquiry-Detail container p-3'>
          <div className="p-0 ph-item ph-row">
            <div className="ph-col-6"></div>
          </div>
          <div className='row'>
            {[1, 2, 3, 4].map((each) => {
              return (
                <div className="col-3">
                  <div className="ph-row ph-item p-0">
                    <div className="ph-col-3" style={{ "height": "2rem" }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="products-container container">
          <div className="ph-row ph-item p-0">
            <div className="ph-col-4"></div>
          </div>
          <div className="ph-row ph-item p-0">
            <div className="ph-col-2"></div>
          </div>
          <ul>
            {[1, 2, 3].map(() => {
              return (
                <li>
                  <div className="ph-row ph-item p-0">
                    <div className="ph-picture" style={{ "height": "6rem", "width": "6rem" }}></div>
                  </div>
                  <div className="bulkProductList w-50">
                    <div className="ml-2 p-0 ph-item ph-row">
                      <div className="ph-col-3"></div>
                    </div>
                    <div className="ml-2 p-0 ph-item ph-row">
                      <div className="ph-col-3"></div>
                    </div>
                    <div className="ml-2 p-0 ph-item ph-row">
                      <div className="ph-col-10" style={{ "height": "2rem" }}></div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="ph-row ph-item p-0">
            <div className="ph-col-2"></div>
          </div>
          <ul>
            {[1, 2].map(() => {
              return (

                <li>
                  <div className="ph-row ph-item p-0">
                    <div className="ph-picture" style={{ "height": "6rem", "width": "6rem" }}></div>
                  </div>
                  <div className="bulkProductList w-50">
                    <div className="ml-2 p-0 ph-item ph-row">
                      <div className="ph-col-3"></div>
                    </div>
                    <div className="ml-2 p-0 ph-item ph-row">
                      <div className="ph-col-3"></div>
                    </div>
                    <div className="ml-2 p-0 ph-item ph-row">
                      <div className="ph-col-10" style={{ "height": "2rem" }}></div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="ph-row ph-item p-0">
            <div className="ph-col-2"></div>
          </div>
          <ul>
            <li>
              <div className="ph-row ph-item p-0">
                <div className="ph-picture" style={{ "height": "6rem", "width": "6rem" }}></div>
              </div>
              <div className="bulkProductList w-50">
                <div className="ml-2 p-0 ph-item ph-row">
                  <div className="ph-col-3"></div>
                </div>
                <div className="ml-2 p-0 ph-item ph-row">
                  <div className="ph-col-3"></div>
                </div>
                <div className="ml-2 p-0 ph-item ph-row">
                  <div className="ph-col-10" style={{ "height": "2rem" }}></div>
                </div>
              </div>
            </li>
          </ul>
          <div className="ph-row ph-item p-0">
            <div className="ph-col-2"></div>
          </div>
          <ul>
            <li>
              <div className="ph-row ph-item p-0">
                <div className="ph-picture" style={{ "height": "6rem", "width": "6rem" }}></div>
              </div>
              <div className="bulkProductList w-50">
                <div className="ml-2 p-0 ph-item ph-row">
                  <div className="ph-col-3"></div>
                </div>
                <div className="ml-2 p-0 ph-item ph-row">
                  <div className="ph-col-3"></div>
                </div>
                <div className="ml-2 p-0 ph-item ph-row">
                  <div className="ph-col-10" style={{ "height": "2rem" }}></div>
                </div>
              </div>
            </li>
          </ul>
          <div className="ml-2 p-0 ph-item ph-row">
            <div className="ph-col-1" style={{ "height": "2rem" }}></div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default BulkOrderGhostImage