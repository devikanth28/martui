import React from "react";
import ProductDetailsCard from "./ProductDetailCard";
import ProductThumbNail from "../components/Common/ProductThumbNail";
import ProductDetailGhostImage from "../components/knowyourmedicine/ProductDetailGhostImage";

const KnowYourMedicineProductDetail = (props) => {

    return (
        <React.Fragment>
            <div className="container-fluid know-your-medicine">
                <div className="row">
                    <div className="col-8">
                        <ProductDetailsCard />
                    </div>
                    <div className="col-4">
                        <section>
                            <p className='p-3 mb-0'>Other Generic Alternative</p>
                            <div className="card border-0">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div className='d-flex'>
                                                <div className='mr-2'>
                                                    <ProductThumbNail auditForm={"TAB"} />
                                                </div>
                                                <div>
                                                    <h6 className='mb-1'>Pantosec 40MG Tab</h6>
                                                    <p className='font-12 mb-0 text-secondary'>MedPlus</p>
                                                </div>
                                            </div>
                                            <div className='medplus-product-manufacturing rounded p-1'>
                                                <p className='font-14 mb-0 text-dark font-weight-bold'>50 to 80% Off</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div className='d-flex'>
                                                <div className='mr-2'>
                                                    <ProductThumbNail auditForm={"TAB"} />
                                                </div>
                                                <div>
                                                    <h6 className='mb-1'>Pantosec 40MG Tab</h6>
                                                    <p className='font-12 mb-0 text-secondary'>MedPlus</p>
                                                </div>
                                            </div>
                                            <div className='other-product-manufacturing rounded p-1'>
                                                <p className='font-14 mb-0 text-dark font-weight-bold'>50 to 80% Off</p>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <ProductDetailGhostImage/>
        </React.Fragment>
    )
}

export default KnowYourMedicineProductDetail;

