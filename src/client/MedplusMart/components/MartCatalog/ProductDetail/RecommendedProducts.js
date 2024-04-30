import React, { useEffect,useState } from "react";
import MartCatalogService from "../../../services/MartCatalogService";
import Validate from "../../../../helpers/Validate";
import ProductSummarySlider from "../../Common/ProductSummarySlider";

const RecommendedProducts=(props)=>{
    const validate=Validate();
    const martCatalogService=MartCatalogService();
    const [recommendedProducts,setRecommendedProducts]=useState([]);
    const [relatedProducts,setRelatedProducts]=useState([]);
    const [isRecommendedProductsLoading,setRecommendedProductsLoading]=useState(false);

    useEffect(()=>{
        if(validate.isEmpty(recommendedProducts)){
            getRecommendedProducts();
        }
        }, [])

    const getRecommendedProducts=()=>{
        let recommendedProductIds=[];
        let relatedProductIds=[];
        if(validate.isNotEmpty(props.recommendedProductIds)){
            recommendedProductIds=props.recommendedProductIds;
            recommendedProductIds=recommendedProductIds.filter(productId=>productId!==props.productId);
            recommendedProductIds=recommendedProductIds.slice(0,10);
        }
        if(validate.isNotEmpty(props.relatedProductIds)){
            relatedProductIds=props.relatedProductIds;
            relatedProductIds=relatedProductIds.filter(productId=>productId!==props.productId);
            relatedProductIds=relatedProductIds.slice(0,10);
        }
        if(validate.isNotEmpty(recommendedProductIds) || validate.isNotEmpty(relatedProductIds)){
        let formData ={recommendedProductIds : JSON.stringify(recommendedProductIds),relatedProductIds:JSON.stringify(relatedProductIds)};
        setRecommendedProductsLoading(true);
        martCatalogService.getRecommendedProducts(formData).then((response)=>{
           if(validate.isNotEmpty(response) && response.statusCode==='SUCCESS' && validate.isNotEmpty(response.dataObject)){
            if(validate.isNotEmpty(response.dataObject.recommendedProductDetail)){
                setRecommendedProducts(response.dataObject.recommendedProductDetail);
            } 
            if(validate.isNotEmpty(response.dataObject.relatedFinalProductsInfo)){
                setRelatedProducts(response.dataObject.relatedFinalProductsInfo);
            }
        }
        setRecommendedProductsLoading(false);
       }).catch(function(error){
        setRecommendedProductsLoading(false);
        console.log(error);
       })
    }
}

return(
    <React.Fragment>
    {validate.isNotEmpty(recommendedProducts) && <ProductSummarySlider slidesToShow="4" title="Recommended Products" productList={recommendedProducts} isLoading={isRecommendedProductsLoading} history = {props.history}  isProductDetail={props.isProductDetail}/>}
    {validate.isNotEmpty(relatedProducts) && <ProductSummarySlider slidesToShow="4" title="Related Products" productList={relatedProducts} isLoading={isRecommendedProductsLoading} history = {props.history} isProductDetail={props.isProductDetail}/>}
   </React.Fragment>
);
}

export default RecommendedProducts;