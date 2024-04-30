import React from "react";
import Validate from "../../../../../helpers/Validate";
import Image from '../../../../../components/Common/Image';
import { Link } from "react-router-dom";
import { popularBrands } from "../../../../../Analytics/Analytics";

const Brand = (props) => {
    const brand = props.brand;
    const validate = Validate();
    return (
        <React.Fragment>
            {validate.isNotEmpty(brand) && <div className="item">
                <Link to={brand.redirectValue}>
                    <div className="card border-0" onClick={()=> popularBrands(brand.brandName)}>
                        <div className="card-body p-2 text-center">
                            <div className="img-container border">
                                <Image alt={brand.brandName} className={'img-fluid rounded-circle'} src={brand.imageUrl} title={brand.brandName} height={96}/>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>}
        </React.Fragment>
    );
};

export default Brand;
