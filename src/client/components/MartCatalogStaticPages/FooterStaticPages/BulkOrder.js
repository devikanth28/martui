import React, { useState } from 'react'
import BulkOrderGhostImage from './BulkOrderGhostImage'
const imageUrl = "https://static1.medplusmart.com/medplusmart/assets"
const BulkOrder = () => {
  const [checker, setChecker] = useState(true);
  const checked = () => {
    setChecker(!checker)
  }
  return (
    <React.Fragment>
      <section>
        <div className='container'>
          <h6 className="title-text mb-0 py-3">MedPlus Health Solutions (MHS) is a licensed manufacturer of products which are essential in fighting Covid-19 effectively.</h6>
          <div className='row Available-products no-gutters'>
            <div className='col-5'>
              <h6 className="secondary-title-text my-1">We manufacture the following in our own factories</h6>
              <ul className="py-1">
                <li>Alcohol based Hand Sanitizer (100 ml, 1ltr, 5ltr),</li>
                <li>Liquid Hand Wash (300 ml, 1ltr),</li>
                <li>Disinfectant Surface Sanitizer (1ltr, 5 ltr)</li>
                <li>Two layered Cloth Masks made in 100% cotton.</li>
              </ul>
            </div>
            <div className='col-5'>
              <h6 className="secondary-title-text my-1">We are also bulk suppliers for the below</h6>
              <ul className="py-1">
                <li>N 95 Masks, KN 95 Masks, 3 layered surgical masks</li>
                <li>Rubber gloves</li>
                <li>Pulse Oximeters</li>
                <li>Thermometers, both contact and contactless</li>
              </ul>
            </div>
            <p className="secondary-title-text">We can supply above products in bulk, either on our own brand names or if the order size is sufficiently large on your brands.</p>
          </div>
        </div>
      </section>
      <div className='Product-Enquiry  mt-4'>
        <div className='Product-Enquiry-Detail container p-3'>
          <h6 className='form-title m-0 mb-4'>For Product Enquiry Please fill the form</h6>
          <div className='each-row row'>
            <div className='col-3'>
              <div className="form-group each-group has-float-label">
                <input type="text" className="form-control type-address" id="Name" name="Name" maxlength="20" autocomplete="off" required="" placeholder=" " />
                <label htmlFor="Name">Name <sup className="text-brand">*</sup></label>
              </div>
            </div>
            <div className='col-3'>
              <div className="form-group has-float-label each-group form-group-error">
                <input type="text" className="form-control type-address" id="Contact Number" name="Contact Number" maxlength="10" autocomplete="off" required="" placeholder=" " />
                <label htmlFor="Contact Number">Contact Number<sup className="text-brand">*</sup></label></div>
            </div>
            <div className='col-3'>
              <div className="form-group has-float-label each-group form-group-error">
                <input type="text" className="form-control type-address" id="city" name="city" maxlength="20" autocomplete="off" required="" placeholder=" " />
                <label htmlFor="city">City<sup className="text-brand">*</sup></label></div>
            </div>
            <div className='col-3'>
              <div className="form-group has-float-label each-group form-group-error">
                <input type="text" className="form-control type-address" id="State" name="state" maxlength="20" autocomplete="off" required="" placeholder=" " />
                <label htmlFor="State">state<sup className="text-brand">*</sup></label></div>
            </div>
          </div>

        </div>
        <div className='products-container container'>
          <h6 className='title-text mb-3'>Select required products along with quantity:</h6>
          <h6 className='text-brand'>Sanitizer</h6>
          <ul>
            <li>
              <img src={`${imageUrl}/_5f1c0fda8bede21c20f4c2231dd8d5cf_/new_theme/web/images/Hand-Sanitizer-100ml.png`} />
              <div className='bulkProductList'>
                <label className="form-group form-check m-0 pointer select-product" htmlFor="check">
                  <input type="checkbox" name="check" id="check" onChange={() => checked()} />
                  <span className="checkmark" ></span>
                  <span className="v-align-sub d-block ml-3">
                    <p>AVELIA HAND SANITIZER ETHANOL BASED BLUE 100ML</p>
                  </span>
                </label>

                <div className="form-group Quantity has-float-label each-group form-group-error">
                  <input type="text" className="form-control type-address" id="oneMl" name="oneMl" maxlength="20" autocomplete="off" required="" disabled={checker} placeholder=" " />
                  <label htmlFor="check">Enter Quantity<sup className="text-brand">*</sup></label></div>
              </div>
            </li>
            <li>
              <img src={`${imageUrl}/_62abbce8038844ce49da068797927857_/new_theme/web/images/Hand-Sanitizer-1ltr.png`} />
              <div className='bulkProductList'>
                <label className="form-group form-check m-0 pointer select-product" htmlFor="Quantity">
                  <input type="checkbox" name="Quantity" id="Quantity" />
                  <span className="checkmark" ></span>
                  <span className="v-align-sub d-block ml-3">
                    <p>AVELIA HAND SANITIZER ETHANOL BASED BLUE 1LITRE</p>
                  </span>
                </label>
                <div className="form-group Quantity has-float-label each-group form-group-error">
                  <input type="text" className="form-control type-address" id="oneLtr" name="oneltr" maxlength="20" autocomplete="off" required="" placeholder=" " disabled />
                  <label htmlFor="Quantity">Enter Quantity<sup className="text-brand">*</sup></label></div>
              </div>
            </li>
            <li>
              <img src={`${imageUrl}/_6c884defb9d756cc16b5a3dda229cf49_/new_theme/web/images/Hand-Sanitizer-5ltr.png`} />
              <div className='bulkProductList'>
                <label className="form-group form-check m-0 pointer select-product" htmlFor="fiveLtrQuantity">
                  <input type="checkbox" name="fiveLtrQuantity" id="fiveLtrQuantity" />
                  <span className="checkmark" ></span>
                  <span className="v-align-sub d-block ml-3">
                    <p>AVELIA HAND SANITIZER ETHANOL BASED BLUE 5LITRE</p>
                  </span>
                </label>
                <div className="form-group Quantity has-float-label each-group form-group-error">
                  <input type="text" className="form-control type-address" id="fiveLtr" name="fiveLtr" maxlength="20" autocomplete="off" required="" placeholder=" " disabled />
                  <label htmlFor="fiveLtrQuantity">EnterQuantity<sup className="text-brand">*</sup></label></div>
              </div>
            </li>
          </ul>
          <h6 className='text-brand'>Hand Wash</h6>
          <ul>
            <li>
              <img src={`${imageUrl}/_cb4a4178888f59ce130733f61fa49fff_/new_theme/web/images/Hand-Wash-300ml.png`} />
              <div className='bulkProductList'>
                <label className="form-group form-check m-0 pointer select-product" htmlFor="ThreeMlQuantity">
                  <input type="checkbox" name="ThreeMlQuantity" id="ThreeMlQuantity" />
                  <span className="checkmark" ></span>
                  <span className="v-align-sub d-block ml-3">
                    <p>AVELIA SKIN SOFT HAND WASH 300ML</p>
                  </span>
                </label>
                <div className="form-group Quantity has-float-label each-group form-group-error">
                  <input type="text" className="form-control type-address" id="ThreeMl" name="ThreeMl" maxlength="20" autocomplete="off" required="" placeholder=" " disabled />
                  <label htmlFor="ThreeMlQuantity">Enter Quantity<sup className="text-brand">*</sup></label></div>
              </div>
            </li>
            <li>
              <img src={`${imageUrl}/_adf20655f24bf67244b50ddaebf81908_/new_theme/web/images/Hand-Wash-1-ltr.png`} />
              <div className='bulkProductList'>
                <label className="form-group form-check m-0 pointer select-product" htmlFor="AvelaoneLtrQuantity">
                  <input type="checkbox" name="AvelaoneLtrQuantity" id="AvelaoneLtrQuantity" />
                  <span className="checkmark" ></span>
                  <span className="v-align-sub d-block ml-3">
                    <p>AVELIA SKIN SOFT HAND WASH 1LITRE</p>
                  </span>
                </label>
                <div className="form-group Quantity has-float-label each-group form-group-error">
                  <input type="text" className="form-control type-address" id="WashoneLtr" name="WashoneLtr" maxlength="20" autocomplete="off" required="" placeholder=" " disabled />
                  <label htmlFor="AvelaoneLtrQuantity">Enter Quantity<sup className="text-brand">*</sup></label></div>
              </div>
            </li>
          </ul>
          <h6 className='text-brand'>Surface Disinfectant Sanitizer:</h6>
          <ul>
            <li>
              <img src={`${imageUrl}/_62abbce8038844ce49da068797927857_/new_theme/web/images/Hand-Sanitizer-1ltr.png`} />
              <div className='bulkProductList'>
                <label className="form-group form-check m-0 pointer select-product" htmlFor="oneLtrSanitizer">
                  <input type="checkbox" name="oneLtrSanitizer" id="oneLtrSanitizer" />
                  <span className="checkmark" ></span>
                  <span className="v-align-sub d-block ml-3">
                    <p>AVELIA HAND SANITIZER ETHANOL BASED 1LITRE</p>
                  </span>
                </label>
                <div className="form-group Quantity has-float-label each-group form-group-error">
                  <input type="text" className="form-control type-address" id="EthanolOneLtr" name="EthanolOneLtr" maxlength="20" autocomplete="off" required="" placeholder=" " disabled />
                  <label htmlFor="oneLtrSanitizer">Enter Quantity<sup className="text-brand">*</sup></label></div>
              </div>
            </li>
          </ul>
          <h6 className='text-brand'>Masks: </h6>
          <ul>
            <li>
              <img src={`${imageUrl}/_7d308cb602a03dff03fc075d841ffb18_/new_theme/web/images/Cloth-Masks.png`} />
              <div className='bulkProductList'>
                <label className="form-group form-check m-0 pointer select-product" htmlFor="Masks">
                  <input type="checkbox" name="Masks" id="Masks" />
                  <span className="checkmark" ></span>
                  <span className="v-align-sub d-block ml-3">
                    <p>CLOTH MASK MODEL-1</p>
                  </span>
                </label>
                <div className="form-group Quantity has-float-label each-group form-group-error">
                  <input type="text" className="form-control type-address" id="MaskQunatity" name="MaskQunatity" maxlength="20" autocomplete="off" required="" placeholder=" " disabled />
                  <label htmlFor="Masks">Enter Quantity<sup className="text-brand">*</sup></label></div>
              </div>
            </li>
          </ul>
          <button type="button" className='px-3 py-1 btnRed btn btn-brand my-3'>Submit</button>
        </div>
      </div>
      <BulkOrderGhostImage />
    </React.Fragment>
  )
}
export default BulkOrder