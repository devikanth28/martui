import React from "react";

const ProductStockInfo = () => {
    return(
        <React.Fragment>
            <div className="container">
                <div>
                    <h1 className="h5">Find Product Stock Information</h1>
                        <form className="d-flex justify-content-center align-items-baseline">
                            <div>
                                <sup className="text-danger">*</sup>Product ID
                            </div>
                            <div className="mx-2">
                                <div className="each-group has-float-label form-group-error">
                                <input className="form-control w-100" id="customerId" name="customerId" placeholder=" " type="text"/>
                                <label htmlFor="customerId">
                                    Customer Id
                                </label>
                                <p className="d-none">plz Enter valid customer Id</p>
                                </div>
                            </div>
                            <div>
                                <button type="button" className="btn btn-brand-gradient rounded-pill px-5 custom-btn-lg">
                                    Submit
                                </button>
                            </div>
                        </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProductStockInfo;