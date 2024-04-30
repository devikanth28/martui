import React from 'react'
import {getPopolarTestsSlider} from '../Filters/FilterMain'
import {TopSellers} from '../HomePage/staticData'
const GeneralProductPage = () => {
  return (
    <React.Fragment>
      <section className='container-fluid pb-3'>
      <div className="mt-0 page-header pt-3">
          <h1 className="mt-2 showing-result">Showing results for &quot;<span className="text-brand">boost</span>&quot;<h4 className="pt-1 float-right">Product found 16</h4></h1>
      </div>
        {getPopolarTestsSlider(TopSellers)}
        <div className="alert alert-warning mt-4 mx-3 text-center" role="alert"><strong>No More Products</strong></div>
        </section>
    </React.Fragment>
  )
}
export default GeneralProductPage