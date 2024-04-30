import React from 'react'
const AlphabetwiseProductsPlaceholders = (props) => {
  return (
    <React.Fragment>
      <section className='p-4'>
        {props.browseAllbrands ?
          <React.Fragment>
            <div className="mb-0 p-0 ph-item ph-row">
              <div className="ph-col-4" style={{ "height": "2rem" }}></div>
            </div>
            <div className="mb-4 p-0 ph-item ph-row">
              <div className="ph-col-12" style={{ "height": "1.25rem" }}></div>
            </div>
            <div className="mb-3 p-0 ph-item ph-row">
              <div className="ph-col-2" style={{ "height": "2rem" }}></div>
              <div className="ph-col-1 empty" style={{ "height": "2rem" }}></div>
              <div className="ph-col-2" style={{ "height": "2rem" }}></div>
            </div>
            <div className="mb-4 p-0 ph-item ph-row">
              <div className="ph-col-2" style={{ "height": "1.25rem" }}></div>
            </div>
            <div className="mb-4 p-0 ph-item ph-row">
              <div className="ph-col-12" style={{ "height": "3.5rem" }}></div>
            </div>
          </React.Fragment>
          : (!props.onlyLinksLoader &&
            <React.Fragment><div className="ph-row ph-item p-0 mb-4">
              <div className="ph-col-4" style={{ "height": "2rem" }}></div>
            </div>
              <div className="ph-row ph-item p-0 mb-4">
                <div className="ph-col-12" style={{ "height": "3.5rem" }}></div>
              </div>
            </React.Fragment>)}
        <ul className='search-product-list row pl-3'>
          {Array.from(Array(50).keys()).map(() => {
            return (
              <div className="p-0 ph-item ph-row w-25 mb-4">
                <div className="ph-col-6"></div>
              </div>
            )
          })}
        </ul>
      </section>
    </React.Fragment>
  )
}
export default AlphabetwiseProductsPlaceholders