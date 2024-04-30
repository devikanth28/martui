import React from 'react';
import { Link } from 'react-router-dom';
import SliderNextArrow from '../../../../../client/components/MedplusLabs/components/Common/SliderNextArrow';
import SliderPrevArrow from '../../../../../client/components/MedplusLabs/components/Common/SliderPrevArrow';
import ProductThumbNail from '../../../../components/Common/ProductThumbNail';
import { MEDPLUS_ADVANTAGE_URL_PREFIX, getPlanUrlStringParam } from '../../../../components/Subscription/constants/SubscriptionConstants';
import { getProductRedirectUrl } from '../../../../helpers/CommonUtil';
import Validate from "../../../../helpers/Validate";
import AddToCart from "../../Common/AddToCart";
const SuggestedAlternativeProduct = (props) => {
    const suggesteAlternativeProduct = props.suggestedAlternativeProduct;
    const suggestedAlternativeProductDiscountInfo = props.suggestedAlternativeProductDiscountInfo;
    const validate = Validate();
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        swipeToSlide: true,
        variableWidth: false,
        prevArrow: <SliderPrevArrow />,
        nextArrow: <SliderNextArrow />,
        slidesToShow: 1,
      }
      
   const becomeMemberContent = window.screen.width >= 1600
  ? "Become a member for"
  : (
    <>
      Become a <br /> member for
    </>
  );
      
      const redirectToPlanDetail = (planName,planId) => {
        props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscriptionPlan/` + getPlanUrlStringParam(planName, planId));
    }

  return (
    <div className="Alternative-product-card mb-3">
                        <div className="header bg-white">
                                <button className="border-0 mb-3 title-name font-weight-bolder">Suggested Alternative</button>
                                </div>
                        {/* <Slider className="custom-slide-arrows" {...settings}> */}
                            {suggesteAlternativeProduct?.map((item) => {
                                return (
                                    <React.Fragment>
                                        <div>
                                            <div className="media">
         
                                                <div className="bg-white p-2 mr-3">
                                                    <Link to={getProductRedirectUrl(item.productId, item.productName)} className='no-underline' title={item.productName} role="link">
                                                        <ProductThumbNail imageUrl={validate.isNotEmpty(item.imageUrl) ? item.imageUrl : ""} productId={item.productId} imagesCount={item.imageUploadCount}
                                                            productName={item.productName} width="64" auditForm={item.auditFormSubName}
                                                            isGeneral={item.isGeneral}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="media-body">
                                                    {validate.isNotEmpty(item.manufacturer) && <small className="text-secondary">{item.manufacturer}</small>}
                                                    {validate.isNotEmpty(item.productName) && <p className='mb-0'><Link to={getProductRedirectUrl(item.productId, item.productName)} title={item.productName} className="font-14 text-primary font-weight-bold" role="link">{item.productName}</Link></p>}
                                                    <div>
                                                        {validate.isNotEmpty(item.attribute?.packSize) && <p className="mb-0 font-12">{item.attribute?.packSize} Units/pack</p>}
                                                        {validate.isNotEmpty(item.mrpPrice) && <span className="font-12">  &#x20B9;{item.mrpPrice.toFixed(2)}</span>}
                                                    </div>
                                                    {!props.pharmaSubscribed && validate.isNotEmpty(props.bestPharmaPlanInfo) && <div>
                                                    {
                                                           suggestedAlternativeProductDiscountInfo && suggestedAlternativeProductDiscountInfo.map((discount)=>{
                                                               return(
                                                                   <>
                                                                    {validate.isNotEmpty(discount.membershipPrice) && <div className='align-items-center d-flex'>
                                                                        <h5 className="font-weight-bolder mb-0"> <span className="font-12 font-weight-normal mr-2">Member Price</span><small className="rupee">&#x20B9;</small>{discount.membershipPrice}</h5>
                                                                        {validate.isNotEmpty(discount.membershipPricePerUnit) && item.attribute?.packSize > 1 && <small class="d-block font-12 ml-2">(<small className="rupee">&#x20B9;</small>{discount.membershipPricePerUnit} per unit)</small>}
                                                                        </div>}
                                                                   </>
                                                               )
                                                           }) 
                                                        }
                                                    </div>}
                                                    {!props.pharmaSubscribed && validate.isNotEmpty(props.bestPharmaPlanInfo) && <hr class="border-bottom-0 border-dashed"/>}
                                                    <div className="align-items-center d-flex justify-content-between mt-2 no-gutters" style={{"gap":"0.5rem"}}>
                                                        { !(!props.pharmaSubscribed && validate.isNotEmpty(props.bestPharmaPlanInfo)) &&
                                                           suggestedAlternativeProductDiscountInfo && suggestedAlternativeProductDiscountInfo.map((discount)=>{
                                                               return(
                                                                   <>
                                                                    {validate.isNotEmpty(discount.membershipPrice) && <div>
                                                                        <h5 className="align-items-center mb-0 font-weight-bolder"> <span className="font-12 font-weight-normal mr-2">Member Price</span><small className="rupee">&#x20B9;</small>{discount.membershipPrice} {validate.isNotEmpty(discount.membershipPricePerUnit) && item.attribute?.packSize > 1 && <small class="d-block font-12 text-right">(<small className="rupee">&#x20B9;</small>{discount.membershipPricePerUnit} per unit)</small>}</h5>
                                                                        </div>}
                                                                   </>
                                                               )
                                                           }) 
                                                        }
                                                        <div className='col'>
                                                           {!props.pharmaSubscribed && validate.isNotEmpty(props.bestPharmaPlanInfo) && <button title="MedPlus Advantage Member Price" className="brand-secondary btn font-12 py-2 rounded-pill btn-block" type="button" role="button" onClick={() => redirectToPlanDetail(props.bestPharmaPlanInfo.planName,props.bestPharmaPlanInfo.planId)} style={{"line-height":"initial"}}>
                                                           <span>{becomeMemberContent}
                                                                    <small className="ml-1 rupee">&#x20B9;</small>{parseFloat(props.bestPharmaPlanInfo.price).toFixed(2)}</span>
                                                           </button>}
                                                       </div>
                                                        <div className={`text-right col`}>
                                                            <AddToCart product={item} productId={item.productId} isAvailable={item.isInStock} isDropDownRequired classStyle={`btn btn-brand-gradient rounded-pill btn-block ${window.screen.width > 1368 ? 'custom-btn-lg' : 'custom-btn-xl'}`} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        {/* </Slider> */}
                    </div>
  )
}

export default SuggestedAlternativeProduct;