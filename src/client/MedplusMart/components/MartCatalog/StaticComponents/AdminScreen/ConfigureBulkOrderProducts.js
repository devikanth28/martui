import React from 'react'

const ConfigureBulkOrderProducts = () => {
  return (
    <section className='container p-3'>
    <h1 className='h5 mb-3'>Configure Configure BulkOrder Products</h1>
    <div className='d-flex justify-content-center'>
              <div class="form-group has-float-label px-0 form-group-error mb-0 d-flex w-50">
                  <input type="text" className="form-control" placeholder=" " name="productIds"/>
                  <label htmlFor="productIds">Enter Product Id</label>
                  <p className="d-none">Enter Valid Product ID</p>
                    <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg">ADD</button>
              </div>
    </div>
</section>
  )
}

export default ConfigureBulkOrderProducts