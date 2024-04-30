import React, { useEffect, useRef, useState } from "react";
import SimilarProducts from "./SimilarProducts";
import ProductDetailImage from './ProductDetailImage';
import ProductInfo from './ProductInfo';
import ApplicableOffers from './ApplicableOffers';
import ProductOffers from "./ProductOffers";
import MoreProducts from './MoreProducts';
import ProductDescription from './ProductDescription';
import ProductSummarySlider from "../../Common/ProductSummarySlider";
import SellerInfo from "./SellerInfo";
import ProductDeliveryInfo from "./ProductDeliveryInfo";
import Validate from "../../../../helpers/Validate";
import MartCatalogService from "../../../services/MartCatalogService";
import { fixUrl, getCategoryIdFromParam, getCategoryNameForUrl, getProductIdFromParam } from "../../../../helpers/CommonUtil";
import SellerInfoGhostImage from "./SellerInfoGhostImage";
import ProductInfoGhostImage from "./ProductInfoGhostImage";
import ApplicableOffersGhostImage from "./ApplicableOffersGhostImage";
import MoreProductsGhostImage from "./MoreProductsGhostImage";
import AlternateProducts from "./AlternateProducts";
import RecommendedProducts from "./RecommendedProducts";
import RelatedArticlesGhostImage from "./RelatedArticlesGhostImage";
import SimilarProductCardGhostImage from "./SimilarProductsGhostImage";
import LocalDB from "../../../../DataBase/LocalDB";
import ProductStructuredData from "../../../../components/MartCatalogStaticPages/ProductStructuredData";
import NoDataFound from '../../../../images/common/No-data-pana.svg'
import BreadCrumbAction from "../../../../../redux/action/BreadCrumbAction";
import MartCategoryHelper from "../../../../helpers/MartCategoryHelper";
import MetaTitle from "../../../../commonComponents/MetaTitle";
import { useSelector } from "react-redux";
import RelatedArticlesInProductDetail from "./RelatedArticles";
import SuggestedAlternativeProduct from "./SuggestedAlternativeProduct";

const ProductDetail = (props) => {

    const validate = Validate();
    const martCatalogService = MartCatalogService();

    const SellerInfoRef = useRef(null);

    const [pageTitle, setPageTitle] = useState('');
    const [isProductLoading, setIsProductLoading] = useState(false);
    const [productAvailableStoresModalData, setProductAvailableStoresModalData] = useState({});
    const [productDetails, setProductDetails] = useState({});
    const [productId, setProductId] = useState("");
    const [productImageUrls, setProductImageUrls] = useState([]);
    const [isPrescriptionRequired, setIsPrescriptionRequired] = useState(false);
    const [standardExpectedArrival, setStandardExpectedArrival] = useState("");
    const [discountString, setDiscountString] = useState("");
    const [hubStatus, setHubStatus] = useState("");
    const [productPromotion, setProductPromotion] = useState({});
    const [moleculesInfo, setMoleculesInfo] = useState([]);
    const [variationProductsInfo, setVariationProductsInfo] = useState([]);
    const [categoryNames, setCategoryNames] = useState({});
    const [replacementProduct, setReplacementProduct] = useState({});
    const [isDiscontinued, setIsDiscontinued] = useState("");
    const [productMessages, setProductMessages] = useState([]);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isShortSupply, setIsShortSupply] = useState(false);
    const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
    const [isRecentlyViewedProductsLoading, setIsRecentlyViewedProductsLoading] = useState(false);
    const [productImg, setProductImg] = useState([]);
    const [productDesc, setProductDesc] = useState("");
    const [structuredHtmlData, setStructuredHtmData] = useState([]);
    const [discountedPrice, setDiscountedPrice] = useState("");
    const [discountPercent, setDiscountPercent] = useState("");
    const [categoryInfo, setCategoryInfo] = useState({});
    const [availQty, setAvailQty] = useState(0);
    const [isFridgeItemAllowed, setIsFridgeItemAllowed] = useState(false);
    const [isAlternativeProductsAvailable, setIsAlternativeProductsAvailable] = useState(false);
    const [membershipPrice, setMembershipPrice] = useState(undefined);
    const [membershipPricePerUnit, setMembershipPricePerUnit] = useState(undefined)
      const [suggestedAlternativeProduct, setSuggestedAlternattiveProduct]=useState(undefined);
  const [suggestedAlternativeProductDiscountInfo, setSuggestedAlternattiveProductDiscountInfo] = useState(undefined);
  const [isPharmaSubscribed, setPharmaSubscribed] = useState(undefined)
  const [bestPharmaPlanInfo, setBestPharmaPlanInfo]=useState(undefined);
    const productNameId = props.match.params.productNameId;
    let isGeneralProduct = false;
    const userInfo  = useSelector(state=>state.userInfo.userInfo);

    const breadCrumbAction = BreadCrumbAction();
    const martCatalogHelper =  MartCategoryHelper();

    useEffect(() => {
        const productId = getProductIdFromParam(productNameId)
        getProductDetails(productId);
        getRecentlyViewedProducts(productId);
        setSuggestedAlternattiveProduct(null);
        setSuggestedAlternattiveProductDiscountInfo(null);
    }, [productNameId]);

    useEffect(() => {
        if (validate.isNotEmpty(productDesc)) {
            const parser = new DOMParser();
            let desc = parser.parseFromString(productDesc, 'text/html');
            let html = desc.getElementsByTagName('div');
            setStructuredHtmData([...html]);
        }

    }, [productDesc])
   
    const ScrollToSellerInfo = () => {
        SellerInfoRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    const prepareBreadCrumb = (response, isGeneral) => {
        const breadCrumbs = [];
        let productUrl = "/product";
        let categoryNames = isGeneral ? response.dataObject.categoryNames : response.dataObject.categoryInfo;
        const productName = response.dataObject.product.productName;
        const productId = response.dataObject.product.productId;
        let url="/categories";
        let isFromSearchAll = false;
        if (isGeneral) {
            const categoryId = Object.keys(categoryNames)[0].split('MART_')[1];
            const topCategoryName_Id = getCategoryIdFromParam(props?.match?.params?.topCategoryName_Id);
            const parentCategoryName_Id = getCategoryIdFromParam(props?.match?.params?.parentCategoryName_Id);
            const currentCategoryName_Id = getCategoryIdFromParam(props?.match?.params?.currentCategoryName_Id);
            let categoryIds = [];
            if (topCategoryName_Id) {
                categoryIds.push(topCategoryName_Id)
            }
            if (parentCategoryName_Id) {
                categoryIds.push(parentCategoryName_Id)
            }
            if (currentCategoryName_Id) {
                categoryIds.push(currentCategoryName_Id)
            }

            let categoryDetails = {};
            if (validate.isEmpty(categoryIds)) {
                isFromSearchAll=true;
                let ParentAndTopLevelCategoryDetails = martCatalogHelper.getParentCategoriesForGivenCategoryId(categoryId);
                Object.keys(ParentAndTopLevelCategoryDetails).map((catId) => {
                    categoryIds.push(catId);
                })
            }
            categoryDetails = martCatalogHelper.getCategoryDetailsFromCategoryIds(categoryIds);
            categoryIds?.map((catId,index) => {
                if (categoryDetails[catId]) {
                    let categoryUrl = "/" + getCategoryNameForUrl(categoryDetails[catId].categoryName, catId);
                    url +=categoryUrl;
                    productUrl+=isFromSearchAll ? "" : categoryUrl;
                    breadCrumbs.push({ name: categoryDetails[catId].categoryName, url: url })
                }
            });
        } else {
            breadCrumbs.push({ name: 'Pharmacy', url: '/PharmaHome', });
            if(validate.isNotEmpty(categoryNames)){
                Object.entries(categoryNames).map(([, value], index) => {
                    if (index == 0) {
                        breadCrumbs.push({ name: value.name, url: value.therapeuticClassRedirectUrl });
                    }
                });
            }
        }
        productUrl+=`/${getCategoryNameForUrl(productName,productId)}`;

        breadCrumbs.push({ name: response.dataObject.product.productName, url: props.location.pathname })
        breadCrumbAction.pushBreadCrumbs(breadCrumbs);
        fixUrl(props.location.pathname,productUrl);
    }

    const updateProductDetails = (response, productIdFromURL) => {
        if (validate.isNotEmpty(response.dataObject.product) && validate.isNotEmpty(response.dataObject.product.productId)) {
            setProductDetails(response.dataObject.product);
            isGeneralProduct = response.dataObject.product.isGeneral === 'Y';
            setProductId(response.dataObject.product.productId);
            setMembershipPrice(response.dataObject.membershipPrice)
            setMembershipPricePerUnit(response.dataObject.membershipPricePerUnit)
            setPharmaSubscribed(response.dataObject.pharmaSubscribed)
            const bestPharmaPlanInfo = {};
            bestPharmaPlanInfo.price = response.dataObject.bestPharmaPlanPrice;
            bestPharmaPlanInfo.planName=response.dataObject.bestPharmaPlanName;
            bestPharmaPlanInfo.planId=response.dataObject.bestPharmaPlanId;
            setBestPharmaPlanInfo(bestPharmaPlanInfo);
            setProductImg(response.dataObject.imageUrls[0]);
        }
        setDiscountString(validate.isNotEmpty(response.dataObject.discountStrMap) && validate.isNotEmpty(response.dataObject.discountStrMap[productIdFromURL]) ? response.dataObject.discountStrMap[productIdFromURL] : "");
        setMoleculesInfo(validate.isNotEmpty(response.dataObject.moleculesInfo) ? response.dataObject.moleculesInfo : []);
        setStandardExpectedArrival(validate.isNotEmpty(response.dataObject.standardExpectedArrival) ? response.dataObject.standardExpectedArrival : "");
        setProductImageUrls(validate.isNotEmpty(response.dataObject.productImageUrls) ? response.dataObject.productImageUrls : validate.isNotEmpty(response.dataObject.imageUrls) ? response.dataObject.imageUrls : []);
        setIsPrescriptionRequired(validate.isNotEmpty(response.dataObject.isPrescriptionRequired) ? response.dataObject.isPrescriptionRequired : false);
        setProductPromotion(validate.isNotEmpty(response.dataObject.productPromotion) ? response.dataObject.productPromotion : "");
        setVariationProductsInfo(validate.isNotEmpty(response.dataObject.variationProductsInfo) ? response.dataObject.variationProductsInfo : []);
        setCategoryNames(validate.isNotEmpty(response.dataObject.categoryNames) ? response.dataObject.categoryNames : {});
        setHubStatus(validate.isNotEmpty(response.dataObject.hubStatus) ? response.dataObject.hubStatus : "");
        setReplacementProduct(validate.isNotEmpty(response.dataObject.replacementProduct) ? response.dataObject.replacementProduct : {});
        setIsDiscontinued(validate.isNotEmpty(response.dataObject.isDiscontinued) ? response.dataObject.isDiscontinued : "");
        setProductMessages(validate.isNotEmpty(response.dataObject.productMessages) ? response.dataObject.productMessages : []);
        setIsWishlisted(validate.isNotEmpty(response.dataObject.isWishListed) ? response.dataObject.isWishListed : false);
        setProductAvailableStoresModalData(validate.isNotEmpty(response.dataObject.prodAvailStore) ? JSON.parse(response.dataObject.prodAvailStore).results : {})
        setIsShortSupply(validate.isNotEmpty(response.dataObject.isShortSupply) ? response.dataObject.isShortSupply === "Y" : false);
        setDiscountedPrice(validate.isNotEmpty(response.dataObject.discountedPrice) ? response.dataObject.discountedPrice : "" );
        setDiscountPercent(validate.isNotEmpty(response.dataObject.discountPercent) ? response.dataObject.discountPercent : "" );
        setCategoryInfo(validate.isNotEmpty(response.dataObject.categoryInfo) ? response.dataObject.categoryInfo : {} );
        setAvailQty(validate.isNotEmpty(response.dataObject.availQty) ? response.dataObject.availQty : 0);
        setIsFridgeItemAllowed(validate.isNotEmpty(response.dataObject.isFridgeItemAllowed) ? response.dataObject.isFridgeItemAllowed : false);
        setPageTitle(validate.isNotEmpty(response.dataObject.PageTitle) ? response.dataObject.PageTitle : '');
        if (validate.isNotEmpty(response?.dataObject?.categoryNames) && isGeneralProduct) {
            prepareBreadCrumb(response, isGeneralProduct);
        } else {
            prepareBreadCrumb(response, isGeneralProduct);
        }
    }

    const getProductDetails = (productIdFromURL) => {
        setIsProductLoading(true);
        martCatalogService.getProductDetails(productIdFromURL).then((response) => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
                updateProductDetails(response, productIdFromURL);
                if(validate.isEmpty(userInfo?.userLoginId)){
                    setProductIdInLocalDB(productIdFromURL);
                }
            } else {
                setProductDetails({});
                }     
            setIsProductLoading(false);
        }).catch((err) => {
            setIsProductLoading(false);
            console.log(err);
        });
    }

    const getRecentlyViewedProducts = (productId) => {
        let recentlyViewedProductsStr = LocalDB.getValue("recentlyViewedProductIds");
        recentlyViewedProductsStr = recentlyViewedProductsStr?.split(",");
        if(validate.isEmpty(userInfo?.userLoginId) && validate.isEmpty(recentlyViewedProductsStr)) {
            return;
        }
        setIsRecentlyViewedProductsLoading(true);
        const obj = {
            ...(productId && {currentProductID: productId}),
            ...(recentlyViewedProductsStr && {productIds: JSON.stringify(recentlyViewedProductsStr) })
        }
        martCatalogService.getRecentlyViewedProducts(obj).then((response) => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
                if (validate.isNotEmpty(response.dataObject.recentlyViewedProducts)) {
                    setRecentlyViewedProducts(response.dataObject.recentlyViewedProducts);
                }
                if(validate.isNotEmpty(userInfo?.userLoginId) && validate.isNotEmpty(recentlyViewedProductsStr)) {
                    LocalDB.removeValue("recentlyViewedProductIds");
                }
            }
            setIsRecentlyViewedProductsLoading(false);
        }).catch((err) => {
            setIsRecentlyViewedProductsLoading(false);
            console.log(err);
        });
    }

    const setProductIdInLocalDB = (productId) => {
        if (!isGeneralProduct) {
            return;
        }
        let recentlyViewedProductIds = LocalDB.getValue("recentlyViewedProductIds");
        recentlyViewedProductIds = validate.isNotEmpty(recentlyViewedProductIds) ? recentlyViewedProductIds.split(",") : "";
        if (validate.isNotEmpty(recentlyViewedProductIds)) {
            recentlyViewedProductIds = recentlyViewedProductIds.filter(eachProductId => eachProductId !== productId);
        }
        recentlyViewedProductIds = validate.isNotEmpty(recentlyViewedProductIds) ? recentlyViewedProductIds : []
        recentlyViewedProductIds.unshift(productId);
        LocalDB.setValue("recentlyViewedProductIds", recentlyViewedProductIds.join(","));
    }

    if( !isProductLoading && validate.isEmpty(productDetails)) {
        return(
            <React.Fragment>
                <section className="align-items-center body-height d-flex flex-column justify-content-center">
                    <img src={NoDataFound} alt="Product Info not available" title="Product Info not available" className="mb-2" height="150" />
                    <p class="mb-0"> Product Info not available! </p>
                </section>
            </React.Fragment>
        );
    }
    const suggestedAlternativeProductData = (product,discountInfo) =>{
        if(validate.isNotEmpty(product)){
            setSuggestedAlternattiveProduct([product]);
        }
        if(discountInfo){
            setSuggestedAlternattiveProductDiscountInfo([discountInfo])
        }
    }
    return (
        <React.Fragment>
            <MetaTitle defaultValue={validate.isNotEmpty(pageTitle) ? pageTitle : `Online Pharmacy Store in India. Best value on medicines-MedPlus`}/>
            <div className="row">
                <div className="col-12 col-lg-8">
                    <section className='p-3 Product-Section mb-4'>
                        <div>
                            <div className="Product-Detail">
                                {isProductLoading &&
                                    <div class="p-0 ph-item ph-row" style={{ "width": "20rem" }}>
                                        <div class="mb-0 ph-picture" style={{ "height": "20rem" }}></div>
                                    </div>
                                }
                                {!isProductLoading && <ProductDetailImage product={productDetails} productImageUrls={productImageUrls} isWishlisted={isWishlisted} />}
                                {isProductLoading && <ProductInfoGhostImage />}
                                {!isProductLoading && <ProductInfo product={productDetails} isPrescriptionRequired={isPrescriptionRequired} moleculesInfo={moleculesInfo} discountString={discountString} productPromotion={productPromotion} variationProductsInfo={variationProductsInfo} hubStatus={hubStatus} replacementProduct={replacementProduct} isDiscontinued={isDiscontinued} productMessages={productMessages} isShortSupply={isShortSupply} history={props.history} ScrollToSellerInfo={ScrollToSellerInfo} discountedPrice={discountedPrice} discountPercent={discountPercent} isWishlisted={isWishlisted} setIsWishlisted={setIsWishlisted} categoryInfo={categoryInfo} availQty={availQty} isFridgeItemAllowed={isFridgeItemAllowed} memberShipPrice={membershipPrice} pharmaSubscribed={isPharmaSubscribed} membershipPricePerUnit={membershipPricePerUnit} bestPharmaPlanInfo={bestPharmaPlanInfo}/>}
                            </div>
                        </div>
                        {!isProductLoading && <ProductDeliveryInfo standardExpectedArrival={standardExpectedArrival} product={productDetails} hubStatus={hubStatus} isPrescriptionRequired={isPrescriptionRequired} productMessages={productMessages} replacementProduct={replacementProduct} productAvailableStoresModalData={productAvailableStoresModalData} isShortSupply={isShortSupply} isDiscontinued={isDiscontinued} isAlternativeProductsAvailable={isAlternativeProductsAvailable}/>}
                     </section>
                    <div className="d-lg-none">
                        {isProductLoading && <ApplicableOffersGhostImage />}
                        {!isProductLoading && validate.isEmpty(isDiscontinued) && window.screen.width <= 1024 ? <div className="d-flex justify-content-between" style={{"gap":"0rem 1rem"}}>
                            <ApplicableOffers isProductLoading={isProductLoading} productPromotion={productPromotion} product={productDetails} class={"Resolution"}/>
                            <ProductOffers/>
                        </div> : <ApplicableOffers isProductLoading={isProductLoading} productPromotion={productPromotion} product={productDetails} />}
                    </div>
                    
                    {!isProductLoading && <ProductDescription productId={productId} product={productDetails} moleculesInfo={moleculesInfo} productDesc={setProductDesc} />}
                    {isProductLoading && <SellerInfoGhostImage />}
                    {!isProductLoading && <SellerInfo SellerInfoRef={SellerInfoRef} isProductLoading={isProductLoading} product={productDetails} />}
                    {validate.isNotEmpty(productDetails) && (validate.isNotEmpty(productDetails.recommendedProducts) || validate.isNotEmpty(productDetails.relatedProducts)) && <RecommendedProducts recommendedProductIds={productDetails.recommendedProducts} relatedProductIds={productDetails.relatedProducts} history={props.history} isProductDetail={true}/>}
                    {!isProductLoading && validate.isNotEmpty(productDetails) && validate.isNotEmpty(recentlyViewedProducts) && productDetails.isGeneral === 'Y' && <ProductSummarySlider slidesToShow="4" title="Recently Viewed Products" productList={recentlyViewedProducts} isLoading={isRecentlyViewedProductsLoading} history={props.history} isProductDetail={true} />}
                    {isProductLoading && RelatedArticlesGhostImage}
                    {validate.isNotEmpty(productDetails) && validate.isNotEmpty(productDetails.articleLink) && <RelatedArticlesInProductDetail articleLinks={productDetails.articleLink} history={props.history} productNameId={productNameId} />}
                </div>
                <div className='col-12 col-lg-4 mt-3 mt-lg-0'>
                                   
                    <div className="d-none d-lg-block">
                       {validate.isNotEmpty(suggestedAlternativeProduct) && <SuggestedAlternativeProduct suggestedAlternativeProduct={suggestedAlternativeProduct} suggestedAlternativeProductDiscountInfo={suggestedAlternativeProductDiscountInfo} pharmaSubscribed={isPharmaSubscribed} bestPharmaPlanInfo={bestPharmaPlanInfo} history={props.history}/>}
                   
                       {isProductLoading && <ApplicableOffersGhostImage />}
                       {!isProductLoading && validate.isEmpty(isDiscontinued) && <ApplicableOffers isProductLoading={isProductLoading} productPromotion={productPromotion} product={productDetails} />}
                    </div>
                    <div className={`sticky-alternative-products`}>
                        {isProductLoading && <SimilarProductCardGhostImage />}
                        {!isProductLoading && validate.isNotEmpty(productId) && validate.isNotEmpty(productDetails) && validate.isNotEmpty(categoryNames) &&
                        productDetails.isGeneral === 'Y' && <SimilarProducts productId={productId} brand={productDetails.brand} categoryNames={categoryNames} history={props.history} />}
                        {!isProductLoading && validate.isNotEmpty(productId) && validate.isNotEmpty(productDetails) &&
                        productDetails.isGeneral === 'N' && productDetails.compositionName.toUpperCase() !== "SURGICAL" && <AlternateProducts productId={productDetails.productId} productName={productDetails.productName} history={props.history} setIsAlternativeProductsAvailable={setIsAlternativeProductsAvailable} membershipPrice={membershipPrice} handleAlternativeProduct={suggestedAlternativeProductData}/>}
                        {isProductLoading && <MoreProductsGhostImage />}
                        {!isProductLoading && <MoreProducts isProductLoading={isProductLoading} product={productDetails} categoryNames={categoryNames} history={props.history} />}
                        {window.screen.width > 1024 ? <div className="d-none d-lg-block">
                        <ProductOffers/>
                        </div> :""}  
                    </div>
                </div>
                {validate.isNotEmpty(structuredHtmlData) && structuredHtmlData.map((value) => {
                    return (

                        <ProductStructuredData pname={productDetails.productName} psku={productDetails.productId} pbrand={productDetails.brand} pId={productDetails.productId} pLowerPrice={productDetails.mrp} pHighPrice={productDetails.productMrp} pavailability={productDetails.avalablityAtStore} pdescription={value.innerText} pimage={productImg} />
                    )
                })}
            </div>
        </React.Fragment>
    )
}

export default ProductDetail;
