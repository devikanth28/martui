import React, { useEffect, useState } from "react";
import AlternateProducts from "../../MedplusMart/components/MartCatalog/ProductDetail/AlternateProducts";
import MartCatalogService from "../../MedplusMart/services/MartCatalogService";
import ProductDetailGhostImage from "./ProductDetailGhostImage";
import { getCompositionNameAndIdFromUrl, getCompositionNameForUrl, getProductIdFromParam } from "../../helpers/CommonUtil";
import Validate from "../../helpers/Validate";
import NoDataFound from '../../images/common/No-data-pana.svg'
import KymProductDetailsCard from "./KymProductDetailCard";
import BreadCrumbAction from "../../../redux/action/BreadCrumbAction";
import FAQIcon from '../../images/common/FAQs-amico.svg'
import LabsFrequentlyAskedQuestions from "../../components/MedplusLabs/components/Home/LabsFrequentlyAskedQuestions";
import MetaTitle from "../../commonComponents/MetaTitle";

const KymProductDetail = (props) => {
    const productNameId = props?.match?.params?.productNameId;
    const [productInfo, setProductInfo] = useState(undefined)
    const [productImageUrls, setProductImageUrls] = useState(undefined)
    const [isLoading,setIsLoading] = useState(true);
    const martCatalogService = MartCatalogService();
    const validate = Validate();
    const breadCrumbAction = BreadCrumbAction();
    const isKym = props.isKym;
    const compositionNameAndId = validate.isNotEmpty(props?.match?.params?.compositionNameId) ? getCompositionNameAndIdFromUrl(props?.match?.params?.compositionNameId) : undefined;

    const getBreadCrumb=(productInfo)=>{
        let breadCrumbs = [];
        if(compositionNameAndId) { 
            breadCrumbs.push({ name: compositionNameAndId[0], url: `${getCompositionNameForUrl(compositionNameAndId[1], compositionNameAndId[0], isKym)}` });
        }
        breadCrumbs.push({ name: productInfo.productName, url: props.location.pathname });
        breadCrumbAction.pushBreadCrumbs(breadCrumbs);
    }

    useEffect(()=>{
        if (validate.isNotEmpty(productNameId)) {
            const productId = getProductIdFromParam(productNameId)
            getProductInfo(productId);
        }
    },[productNameId])

    const getProductInfo = (productId) => {
        setIsLoading(true)
        martCatalogService.getProductInfo({isKym: isKym,productId:productId}).then(data => {
            if (data && data.statusCode == "SUCCESS") {
                if(data.dataObject && validate.isNotEmpty(data.dataObject.productInfo)) {
                    setProductInfo(data.dataObject.productInfo);
                    getBreadCrumb(data.dataObject.productInfo);
                }else{
                    setProductInfo({})
                }
                if(data.dataObject && validate.isNotEmpty(data.dataObject.productImageUrls)){
                    setProductImageUrls(data.dataObject.productImageUrls);
                }
                setIsLoading(false)
            }else{
                setProductInfo({})
                setIsLoading(false)
            }
        });
    }

    if( !isLoading && validate.isEmpty(productInfo)) {
        return(
            <React.Fragment>
                <section className="align-items-center body-height d-flex flex-column justify-content-center">
                    <img src={NoDataFound} alt="Product Info not available" title="Product Info not available" className="mb-2" height="150" />
                    <p class="mb-0"> Product Info not available! </p>
                </section>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <MetaTitle defaultValue={validate.isNotEmpty(productInfo?.productName) ? productInfo.productName : `Know Your Medicine`} />
            {isLoading && 
                <React.Fragment>
                    <ProductDetailGhostImage />
                    <div className="container-fluid">
                        <div className="row px-3">
                            <LabsFrequentlyAskedQuestions sectionMarginClass="mt-4 mb-n3 col-8" hideIcon={true}  page={"KYM"} icon={FAQIcon} />
                        </div>
                    </div>
                </React.Fragment>
            }
            {!isLoading && <div className="container-fluid know-your-medicine">
                <div className="row mb-3">
                    {validate.isNotEmpty(productInfo) && 
                    <div className="col-8">
                        <KymProductDetailsCard productNameId={productNameId} productInfo={productInfo} productImageUrls={productImageUrls} {...props}/>
                        <LabsFrequentlyAskedQuestions sectionMarginClass="mt-4 mb-n3" hideIcon={true}  page={"KYM"} icon={FAQIcon} />
                    </div>}
                    <div className="col-4">
                        <div className="sticky-alternative-products">
                             <AlternateProducts isKym {...props} productId={productInfo.productId}/>
                        </div>
                    </div>
                </div>
            </div>}
        </React.Fragment>
    )
}

export default KymProductDetail;

