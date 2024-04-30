import React, { useState } from 'react'
import { isDrugSchduleX } from '../../../../helpers/CommonUtil';
import Validate from '../../../../helpers/Validate';
import AddToCart from '../../Common/AddToCart';
import { getSelectedLocality } from '../../../../../redux/action/LocalityAction';
import ChangeLocality from '../../../../components/Locality/ChangeLocality';
const ProductDiscountInfo = (props) => {
    const validate = Validate();

    const isDrugScheduleX = isDrugSchduleX(props.product);

    const [isLocalityModalOpen, setLocalityModalOpen] = useState(false);
    const selectedLocality = getSelectedLocality();

    const localityModalToggle = () => setLocalityModalOpen(!isLocalityModalOpen);

    const GetCurrentMaxDiscount = () => {
        let offerAmount = 0;
        let offerAmountRounded = 0;
        if(validate.isNotEmpty(props.productPromotion) && validate.isNotEmpty(props.productPromotion.slabs)){
            let currentMaxDiscount = 0;
            Object.keys(props.productPromotion.slabs).map((key) => {
                if(props.productPromotion.slabs[key].fromValue > 0 && currentMaxDiscount < props.productPromotion.slabs[key].discountPercentage){
                    offerAmount = props.productPromotion.slabs[key].fromValue;
                    offerAmountRounded =  offerAmount.toString().includes('.') ? offerAmount.toFixed(2) : offerAmount;
                    currentMaxDiscount = props.productPromotion.slabs[key].discountPercentage;
                }
            })
            return offerAmountRounded > 0 ? <small className="d-block">On bills above <span className="rupee">₹</span>{offerAmountRounded} </small> : <React.Fragment></React.Fragment>;
        }
        return <React.Fragment></React.Fragment>;
    }

    let discountType = "slab";
    if(props?.productPromotion?.specialPromotionRanges){
        props.productPromotion.specialPromotionRanges.map((eachSpecialPromotionRange) => {
            if(eachSpecialPromotionRange && !(eachSpecialPromotionRange.fromQuantity >1)) {
                discountType = "specialPromotion";
            }
        });
    }
    
  return (
    <>
        <div className="text-right my-3">
                            { props.product.isGeneral === 'N' && validate.isNotEmpty(props.product.packSize) && props.product.packSize > 0 && validate.isNotEmpty(props.product.displayPrice) && props.product.displayPrice > 0 && <p className="mb-0 text-secondary font-14">{props.product.packSize} Unit{props.product.packSize > 1 && "s"}/pack</p> }
                            { discountType === "specialPromotion" && props.discountedPrice && props.discountPercent && props.discountPercent > 0 ? 
                                <React.Fragment>
                                    <h4 className="mb-0">
                                        <small className="rupee">&#x20B9;</small>{parseFloat(props.discountedPrice).toFixed(2)}
                                    </h4>
                                    {validate.isNotEmpty(props.product.packSize) && props.product.packSize > 1 && props.product.isGeneral === "N" && <span class="font-12">(<small className="rupee">&#x20B9;</small>{parseFloat(props.discountedPrice/props.product.packSize).toFixed(2)} per unit)</span>}
                                    <p className="font-14 mb-0">MRP
                                        <small className="rupee ml-1">&#x20B9;</small>
                                        <strike className="text-secondary">{parseFloat(props.product.packSizeMrp).toFixed(2)}</strike>
                                    </p>
                                    <div>
                                        <span className="inclusive text-secondary text-right d-block mb-1">Inclusive of all Taxes</span>
                                    </div>
                                </React.Fragment> 
                                :
                                <React.Fragment>
                                    { validate.isNotEmpty(props.product.displayPrice) && props.product.displayPrice > 0 && <React.Fragment>
                                        <h4 className="mb-0">MRP
                                            <small className="rupee ml-1">&#x20B9;</small>{parseFloat(props.product.displayPrice).toFixed(2)}
                                        </h4>
                                        {validate.isNotEmpty(props.product.mrp) && props.product.packSize > 1 && props.product.isGeneral === "N" && <span class="font-12">(<small className="rupee">&#x20B9;</small>{parseFloat(props.product.mrp).toFixed(2)} per unit)</span>}
                                        <div>
                                            <span className="inclusive text-secondary text-right d-block">Inclusive of all Taxes</span>
                                        </div>
                                    </React.Fragment> }
                                </React.Fragment>
                            }
                        </div>
                        { validate.isNotEmpty(props.discountString) && <div className="disc-offer-badge d-inline-block">
                            <p className="mb-0 font-weight-bolder">{props.discountString}
                                <GetCurrentMaxDiscount />
                            </p>
                        </div> }
                        { (validate.isNotEmpty(props.hubStatus) && props.hubStatus != "TRUE" && validate.isNotEmpty(props.product.packSizeMrp) && props.product.packSizeMrp !== 0)
                        ?
                            <React.Fragment>
                                <div className='position-relative'>
                                    <svg id="note_black_icon_18px" xmlns="http://www.w3.org/2000/svg" className='position-absolute' style={{"top":"0.25rem"}} width="18" height="18" viewBox="0 0 18 18"><path id="Icon_awesome-info-circle" data-name="Icon awesome-info-circle" d="M9.563.563a9,9,0,1,0,9,9A9,9,0,0,0,9.563.563Zm0,3.992A1.524,1.524,0,1,1,8.038,6.079,1.524,1.524,0,0,1,9.563,4.554Zm2.032,9.218a.436.436,0,0,1-.435.435H7.966a.436.436,0,0,1-.435-.435V12.9a.436.436,0,0,1,.435-.435H8.4V10.143H7.966a.436.436,0,0,1-.435-.435V8.837A.436.436,0,0,1,7.966,8.4h2.323a.436.436,0,0,1,.435.435v3.629h.435a.436.436,0,0,1,.435.435Z" transform="translate(-0.563 -0.563)"></path></svg>
                                    <p className='pl-4'>Our services are not currently available in this location.<button className='btn btn-link text-info p-0' onClick={localityModalToggle} title="Change Locality">Change Locality</button></p>
                                </div>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                {!isDrugScheduleX && (props.product.isGeneral === "Y" || props.isFridgeItemAllowed) && (validate.isEmpty(props?.replacementProduct?.name) || (validate.isNotEmpty(props?.replacementProduct?.name) && props.availQty > 0)) && <React.Fragment>
                                    {validate.isNotEmpty(props.product.productId) && <div className='w-100 mt-3'>
                                            <AddToCart productId={props.product.productId} product={props.product} isProductDetailsPage={true} isDropDownRequired={true} isAvailable={(props.product.isInStock) && (props.availQty > 0) && (validate.isNotEmpty(props.product.isSellable) && props.product.isSellable === "Y") && (validate.isNotEmpty(props.product.packSizeMrp) && props.product.packSizeMrp > 0 )} classStyle="btn btn-block btn-brand-gradient rounded-pill custom-btn-xl shadow" />
                                        </div>
                                    }
                                </React.Fragment> }
                            </React.Fragment>
                        }
        {validate.isNotEmpty(selectedLocality) && <ChangeLocality modal={isLocalityModalOpen} toggle={localityModalToggle} selectedLocality={selectedLocality}/>}
    </>
  )
}

export default ProductDiscountInfo