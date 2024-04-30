import React, { useState } from "react";
import Validate from "../../../../helpers/Validate";

const SellerInfo = (props) => {

	const validate = Validate();

	return (
		<React.Fragment>
			{ validate.isNotEmpty(props.product) && (validate.isNotEmpty(props.product.manufacturerAddresseeName) || validate.isNotEmpty(props.product.packerAddresseeName) || validate.isNotEmpty(props.product.importerAddresseeName) || validate.isNotEmpty(props.product.marketerAddresseeName)) &&
				<section className="p-3 mb-4" ref={props.SellerInfoRef}>
					<h6 className="mb-2">Seller Information</h6>
					<div className="row" style={{'gap':'1rem 0rem'}}>
						{ validate.isNotEmpty(props.product.manufacturerAddresseeName) && <div className='col-6'>
							<address className="address-no-style p-0">
								<label className="font-14 text-secondary">Manufactured By</label>
								<p className="font-weight-bold mb-0"> {props.product.manufacturerAddresseeName} </p>
								<p className="text-capitalize mb-0 font-14 text-wrap-anywhere"> {props.product.manufacturerAddress} </p>
							</address>
						</div> }
                        { validate.isNotEmpty(props.product.packerAddresseeName) && <div className='col-6'>
							<address className="address-no-style p-0">
								<label className="font-14 text-secondary">Packed By</label>
								<p className="font-weight-bold mb-0"> {props.product.packerAddresseeName} </p>
								<p className="text-capitalize mb-0 font-14 text-wrap-anywhere"> {props.product.packerAddress} </p>
							</address>
						</div> }
                        { validate.isNotEmpty(props.product.importerAddresseeName) && <div className='col-6'>
							<address className="address-no-style p-0">
								<label className="font-14 text-secondary">Imported By</label>
								<p className="font-weight-bold mb-0"> {props.product.importerAddresseeName} </p>
								<p className="text-capitalize mb-0 font-14 text-wrap-anywhere"> {props.product.importerAddress} </p>
							</address>
						</div> }
                        { validate.isNotEmpty(props.product.marketerAddresseeName) && <div className='col-6'>
							<address className="address-no-style p-0">
								<label className="font-14 text-secondary">Marketed By</label>
								<p className="font-weight-bold mb-0"> {props.product.marketerAddresseeName} </p>
								<p className="text-capitalize mb-0 font-14 text-wrap-anywhere"> {props.product.marketerAddress} </p>
							</address>
						</div> }
					</div>
				</section>
			}
		</React.Fragment>
	);
};

export default SellerInfo;
