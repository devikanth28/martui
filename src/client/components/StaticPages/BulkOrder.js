import React, { Component } from 'react';
import BulkOrderImg from '../../images/common/blukorder-bnr.jpg';
import BulkOrderImg2x from '../../images/common/blukorder-bnr2x.jpg';


class BulkOrder extends Component {
    render() {
        return (
            <div class="bulk-order-section">
                <div className="img-container">
                    <img srcSet={`${BulkOrderImg} 1x, ${BulkOrderImg2x} 2x`} class="img-fluid" alt="Bulk Order Image" title="Bulk Order" />
                </div>
                <div className="bulk-order-section m-0">
                    <div className="container products-available">
                        <h6 className="title">Medplus Health Solutions (MHS) is a licensed manufacturer of products which are essential in fighting Covid-19 effectively.</h6>
                        <div className="row m-0">
                            <div className="col-md-5 col-sm-12 col-xs-12 p-0">
                                <h6 className="secondary-title-text">We manufacture the following in our own factories</h6>
                                <ul className="product-list">
                                    <li>Alcohol based Hand Sanitizer (100 ml, 1ltr, 5ltr),</li>
                                    <li>Liquid Hand Wash (300 ml, 1ltr),</li>
                                    <li>Disinfectant Surface Sanitizer (1ltr, 5 ltr)</li>
                                    <li>Two layered Cloth Masks made in 100% cotton.</li>
                                </ul>
                            </div>
                            <div className="col-md-5 col-sm-12 col-xs-12 p-0">
                                <h6 className="secondary-title-text">We are also bulk suppliers for the below</h6>
                                <ul className="product-list">
                                    <li>N 95 Masks, KN 95 Masks, 3 layered surgical masks</li>
                                    <li>Rubber gloves</li>
                                    <li>Pulse Oximeters</li>
                                    <li>Thermometers, both contact and contactless</li>
                                </ul>
                            </div>
                        </div>
                        <p className="secondary-title-text color-vdgry mb-0">We can supply above products in bulk, either on our own brand names or if the order size is sufficiently large on your brands.</p>
                    </div>
                </div>
                <div className="bulk-order-section mt-3">
                    <div className="form-section container">
                        <h6 class="form-title">For Product Enquiry Please fill the form</h6>
                        <div class="form-row no-gutters">
                            <div class="form-group filled-form col mr-3">
                                <input type="text" class="form-control" name="Name" maxlength="30" autocomplete="off" required />
                                <label class="select-label"> Name:</label>
                            </div>
                            <div class="form-group filled-form col mr-3">
                                <input type="text" class="form-control" id="patientAge" name="Mobile No" maxlength="10" autocomplete="off" required />
                                <label class="select-label">Mobile No:</label>
                            </div>
                            <div class="form-group filled-form col mr-3">
                                <input type="text" class="form-control" id="City" name="City" maxlength="30" autocomplete="off" required />
                                <label class="select-label">City:</label>
                            </div>
                            <div class="form-group filled-form col ">
                                <input type="text" class="form-control" id="State" name="State" maxlength="30" autocomplete="off" required />
                                <label class="select-label">State:</label>
                            </div>
                        </div>
                        <h6 class="title">Select required products along with quantity:</h6>
                        <div class="products-container">
                            <h6>Sanitizer:</h6>
                            <ul className="p-0">
                                <li>
                                    <img src="https://static1.medplusmart.com/medplusmart/assets/new_theme/web/images/Hand-Sanitizer-100ml.png?v=5f1c0fda8bede21c20f4c2231dd8d5cf" width="96" alt="AVELIA HAND SANITIZER ETHANOL BASED BLUE 100ML" title="AVELIA HAND SANITIZER ETHANOL BASED BLUE 100ML" />
                                    <div class="bulkProductList">
                                        <div class="custom-control custom-checkbox font-weight-bold py-3">
                                            <input type="checkbox" class="custom-control-input" id="include-cancel-order" />
                                            <label class="custom-control-label pointer select-product" for="include-cancel-order" title="AVELIA HAND SANITIZER ETHANOL BASED 1 LITRE">
                                                <p>AVELIA HAND SANITIZER ETHANOL BASED 1 LITRE</p>
                                            </label>
                                        </div>
                                        <div class="filled-form form-group mx-4 ">
                                            <input type="text" class="form-control" id="name" required />
                                            <label class="select-label">Enter Quantity:</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <img src="https://static1.medplusmart.com/medplusmart/assets/new_theme/web/images/Hand-Sanitizer-1ltr.png?v=62abbce8038844ce49da068797927857" width="96" alt="AVELIA HAND SANITIZER ETHANOL BASED 1 LITRE" title="AVELIA HAND SANITIZER ETHANOL BASED 1 LITRE" />
                                    <div class="bulkProductList">
                                        <div class="custom-control custom-checkbox font-weight-bold py-3">
                                            <input type="checkbox" class="custom-control-input" id="include-cancel-order" />
                                            <label class="custom-control-label pointer select-product" for="include-cancel-order" title="AVELIA HAND SANITIZER ETHANOL BASED 1 LITRE">
                                                <p>AVELIA HAND SANITIZER ETHANOL BASED 1 LITRE</p>
                                            </label>
                                        </div>
                                        <div class="filled-form form-group mx-4 ">
                                            <input type="text" class="form-control" id="name" required />
                                            <label class="select-label">Enter Quantity:</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <img src="https://static1.medplusmart.com/medplusmart/assets/new_theme/web/images/Hand-Sanitizer-5ltr.png?v=6c884defb9d756cc16b5a3dda229cf49" width="96" alt="AVELIA HAND SANITIZER ETHANOL BASED 5 LITRES" title="AVELIA HAND SANITIZER ETHANOL BASED 5 LITRES" />
                                    <div class="bulkProductList">
                                        <div class="custom-control custom-checkbox font-weight-bold py-3">
                                            <input type="checkbox" class="custom-control-input" id="include-cancel-order" />
                                            <label class="custom-control-label pointer select-product" for="include-cancel-order" title="AVELIA HAND SANITIZER ETHANOL BASED 1 LITRE">
                                                <p>AVELIA HAND SANITIZER ETHANOL BASED 1 LITRE</p>
                                            </label>
                                        </div>
                                        <div class="filled-form form-group mx-4 ">
                                            <input type="text" class="form-control" id="name" required />
                                            <label class="select-label">Enter Quantity:</label>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <button className="btn btn-brand px-4" value="submit">Submit</button>
                        </div>
                    </div>
                </div>
                <div class="footer-note p-3">
                    <strong>For all requirements please contact:
                       <span >849 990 4848</span>
                    </strong>
                </div>
            </div>

        );
    }
}

export default BulkOrder;