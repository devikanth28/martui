import React from 'react'
import SellerinfoPlaceholder from './ProductDetailPagePlaceholders/SellerinfoPlaceholder'
const Sellersinfo = () => {
  return (
    <React.Fragment>
            <section className='shadow-none p-3 pt-4'>
                <h6 className='mb-2'>Seller Information</h6>
                <div className='row'>
                    <div className='col-6'>
                        <div>
                            <span>Manufactured By</span>
                            <p className="font-weight-bold mb-0">ZYDUS WELLNESS PRODUCTS LTD</p>
                            <p className="text-capitalize">house no 6 &amp; 7, sigma commerce zone, near iskcon temple, sarkhej gandhinagar highway, ahmedabad 3870015 gujarat india</p>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div>
                            <span>Manufactured By</span>
                            <p className="font-weight-bold mb-0">ZYDUS WELLNESS PRODUCTS LTD</p>
                            <p className="text-capitalize">house no 6 &amp; 7, sigma commerce zone, near iskcon temple, sarkhej gandhinagar highway, ahmedabad 3870015 gujarat india</p>
                        </div>
                    </div>
                </div>
            </section>
            <SellerinfoPlaceholder/>
        </React.Fragment>
  )
}
export default Sellersinfo