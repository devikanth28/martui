import React from 'react';
import { Link } from 'react-router-dom';
import { getProductRedirectUrl } from '../../../helpers/CommonUtil';
import Validate from '../../../helpers/Validate';

const AlternateProductCard=(props)=>{

    const {productId,manufacturer,productName,packSize,packSizeMrp,price,inStock,productMessage}=props.product;
    const validate=Validate();
    return(
        <React.Fragment>
            <div className="border-top p-2">
                {validate.isNotEmpty(manufacturer) && <p className="font-12 mb-0 text-secondary"><span>{manufacturer}</span></p>}
                  <Link to={getProductRedirectUrl(productId, productName)} title={productName} className="font-14 productname no-underline" role="link">{productName}</Link>
                {validate.isNotEmpty(packSize) && <p className="font-12 mb-0">{`${packSize} Units / pack `}</p>}
                <div className="d-flex justify-content-between">
                    <div>
                        <p className="m-0">
                           { validate.isNotEmpty(packSizeMrp) && <small className="rupee">₹<span className="font-weight-bold">{`${validate.isNotEmpty(packSizeMrp) ? `${packSizeMrp.toFixed(2)}` : 'NA'}`}</span>
                                {validate.isNotEmpty(price) && price != 0 && <small class={price<0 ? "pricedrop ml-1" : "pricehike ml-1"}>{`${Math.abs(price).toFixed(1)}%`}</small>}</small>}
                            {validate.isNotEmpty(price) && price != 0 && 
                            <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" className={price<0 ? "":"pricehike-rotation"}>
                                    <g id="bottomcaret_black_icon_18px" transform="translate(-762.18 -983.18)">
                                        <rect id="Rectangle_4719" data-name="Rectangle 4719" width="18" height="18" transform="translate(780.18 1001.18) rotate(180)" fill="none"></rect>
                                        <path id="Path_23398" data-name="Path 23398" d="M61.248,563.964a.367.367,0,0,1-.538,0l-2.416-2.808L56.008,558.5c-.165-.192-.007-.465.269-.465h9.4c.277,0,.434.273.269.465l-2.284,2.655Z" transform="translate(710.133 431.054)" fill={price >0 ?`#08CE73`: `#E71C37`}></path>
                                    </g>
                                </svg> 
                            </span> }
                        </p>
                    </div>
                    <div>
                       {(validate.isNotEmpty(inStock) || validate.isNotEmpty(productMessage)) &&
                       <p className="m-0">
                            <span className="small instock">{`${validate.isNotEmpty(productMessage) ? productMessage : validate.isNotEmpty(inStock) && inStock ? 'In Stock' : 'Out of Stock'}`}</span>
                        </p>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
  }
  export default AlternateProductCard;