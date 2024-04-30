import React, { useEffect, useState } from "react";
import SimilarProductsGhostImage from "./SimilarProductsGhostImage";
import SimilarProductCard from "../../Common/SimilarProductCard";
import MartCatalogService from "../../../services/MartCatalogService";
import Validate from "../../../../helpers/Validate";
const SimilarProducts = (props) =>{
    const martCatalogService=MartCatalogService();
    const validate=Validate();
    const [isSimilarProductsLoading,setSimilarProductsLoading]=useState(false);
    const [similarProducts,setSimilarProducts]=useState([]);

    useEffect(()=>{
     if(validate.isEmpty(similarProducts)){
         getSimilarProducts();
     }
    },[])

const getSimilarProducts=()=>{
    const searchCriteria={productId:props.productId,brand:props.brand,categoryId:Object.keys(props.categoryNames)[0]};
    setSimilarProductsLoading(true);
    martCatalogService.getSimilarProducts(JSON.stringify(searchCriteria)).then((response)=>{
    if(validate.isNotEmpty(response) && response.statusCode=='SUCCESS' && validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.productList)){
    setSimilarProducts(response.dataObject.productList);
    }
    setSimilarProductsLoading(false);
    }).catch(function(error){
        setSimilarProductsLoading(false);
           console.log(error);
    })


}
    return (
        <React.Fragment>
            {!isSimilarProductsLoading && validate.isNotEmpty(similarProducts) &&
                <div className={`mb-4 other-products-container similar-products`}>
                    <h6 className='mb-2'>Other Products</h6>
                    <div className={`other-products similar-products-scroll`}>
                        <React.Fragment>
                            {similarProducts && similarProducts.map(similarProduct=>{
                                return(
                                    <SimilarProductCard similarProduct={similarProduct} history = {props.history}/>
                                )
                            })}
                        </React.Fragment>
                    </div>
                </div>
            }
            {isSimilarProductsLoading && <SimilarProductsGhostImage/>}
            
        </React.Fragment>
    )
}
export default SimilarProducts;