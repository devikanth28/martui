import React from 'react'

const ProductDiscountDetail = () => {
  return (
    <section className='container p-3'>
    <h1 className='h3 mb-3'>Product Discount Detail</h1>
    <div className='d-flex justify-content-center'>
              <div className="form-group has-float-label px-0 form-group-error">
                  <input type="text" className="form-control mb-2" placeholder=" " name="productDiscountDetail"/>
                  <label htmlFor='productDiscountDetail'>Enter Product Id</label>
                  <p className="d-none">plz Enter product Discount Detail</p>
              <div className="d-block">Discount Details</div>
            </div>
            <button type="submit" className="btn btn-brand-gradient ml-3 px-4 h-100 rounded-pill custom-btn-lg">Get Discount Details</button>

    </div>
</section>
  )
}

export default ProductDiscountDetail