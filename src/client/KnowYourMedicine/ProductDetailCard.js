import React, { useState } from "react";
import DisplayImg from '../../client/images/common/householdneeds-cat-icn.png'

const ProductDetailsCard = () => {
    const [isGenericMedicine, setIsGenericMedicine] = useState(false);

    return (
        <React.Fragment>
            <div className={`product-details-card pb-3 ${isGenericMedicine ? "generic-medicine" : "branded-medicine"}`}>
                <div>
                    <span className="custom-badge-medicine my-3">{isGenericMedicine ? "Generic Medicine" : "Branded Medicine"} <sup>*</sup></span>
                </div>
                <div className="d-flex">
                    <div className="col-3 d-flex justify-content-center align-items-center">
                        <img src={DisplayImg} className="img-fluid" alt="Product Image" aria-label="Product Image" />
                    </div>
                    <div className="col-9">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2 className="mb-0">Razo D Cap</h2>
                            <div>
                                <span class="badge bg-green-100 text-dark p-2 font-weight-bold">Upto 20% Off <sup>*</sup></span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <span className="text-secondary font-12">Mfg / Mkt</span>
                            <h6 className="mb-0">Dr Reddy Laboratories Ltd</h6>
                        </div>
                        <div className="mb-3">
                            <span className="text-secondary font-12">Composition</span>
                            <h6 className="mb-0">Domperidone 30 MG+Rabeprazole 20 MG</h6>
                        </div>
                        <div className="d-flex justify-content-between">                            
                            <div className="mb-3">
                                <span className="text-secondary font-12">Audit Form</span>
                                <h6 className="mb-0">Capsule</h6>
                            </div>
                            <div>
                                <button type="button" className="btn btn-dark btn-sm">
                                    <span className="mr-2">Know More</span>
                                    <svg className="align-middle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <g id="leftchevron_black_icon_18px" transform="translate(0 16) rotate(-90)">
                                            <rect id="Rectangle_4722" data-name="Rectangle 4722" width="16" height="16" fill="none" />
                                            <path id="Path_23401" data-name="Path 23401" d="M3.938,5.132.243,1.437A.837.837,0,0,1,1.427.253l3.1,3.093,3.1-3.1A.84.84,0,0,1,9.065.835a.832.832,0,0,1-.248.592l-3.7,3.7A.84.84,0,0,1,3.938,5.132Z" transform="translate(3.627 5.503)" fill="#f8f9fa" />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <p className="font-10 text-muted mb-0">*Product classification & discount slabs are for information only. May vary from the market definitions.</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProductDetailsCard;