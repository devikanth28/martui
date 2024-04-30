import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ProductOffersGhostImage from './ProductOffersGhostImage';
const ProductOffers = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <React.Fragment>
            {!isLoading && <div>
                <div className="row ml-0 mr-0 mb-2">
                    <div className="col-2">
                        <img width="40" src="data:image/png;base64,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" alt="No Preview Available" />
                    </div>
                    <div className="col-10 text-center">
                        <p className="font-weight-bold mb-0">100% Protection</p>
                        <div className="col-12 p-0 text-center">
                            <Link to={"/safeAndSecure"} className={"no-underline font-14 strong"} title="Genuine Products , Secure Payments" role="link">Genuine Products<span class="mx-1">|</span>Secure Payments</Link>
                        </div>
                    </div>
                </div>
            </div>
            }
            {isLoading && <ProductOffersGhostImage />}
        </React.Fragment>
    )
}
export default ProductOffers