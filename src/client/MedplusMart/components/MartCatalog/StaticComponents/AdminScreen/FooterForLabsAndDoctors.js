import React from 'react'

const FooterForLabsAndDoctors = () => {
  return (
    <section className='container p-3'>
    <div className=''>
    <h1 className='h3'>Configure Footer Data for Labs</h1>
              <div className='d-flex justify-content-between'>
                    <button type="submit" class="btn btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg">Push Lab Data Into Redis</button>
                    <button type="submit" class="btn btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg">Generate Lab Categories</button>
              </div>
              <hr className="my-3 border-bottom-0" />
              <h1 className='h3'>Configure Footer Data for Doctors</h1>
              <div className='d-flex justify-content-between'>
                    <button type="submit" class="btn btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg">Push Doctors Data Into Redis</button>
                    <button type="submit" class="btn btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg">Generate Doctors Categories</button>
              </div>
    </div>
</section>
  )
}

export default FooterForLabsAndDoctors