import React from "react";
import SubCategoryCard from "./SubCategoryCard";
import ShopBySubCategoryGhostImage from "./ShopBySubCategoryGhostImage";
import { getCategoryIdFromParam, getCategoryNameForUrl, getCategoryNameFromParam, textCapitalize } from "../../../../../helpers/CommonUtil";
import Validate from "../../../../../helpers/Validate";
import { useSelector } from "react-redux";
import { getSecondLevelCategorySvgs } from "../../../Common/CatalogUrls";

const ShopBySubCategory=(props)=>{
   const validate = Validate();
   const categoryNameId = props.categoryNameId;
   const categoryName = validate.isNotEmpty(props.categoryName) ? textCapitalize(props.categoryName) : getCategoryNameFromParam(categoryNameId);
   const categoryId = getCategoryIdFromParam(categoryNameId);;
   const secondLevelCategoryData = validate.isNotEmpty(props.secondLevelCategoryData) ? props.secondLevelCategoryData : {};


   const redirectToCategory = (catName, catId) => {
      return "/categories/" + getCategoryNameForUrl(categoryName, categoryId)+ "/" + getCategoryNameForUrl(catName, catId);
   }
return(

   <React.Fragment>
   {validate.isNotEmpty(secondLevelCategoryData) && 
         <React.Fragment>
            <div className="d-flex align-items-center justify-content-between mb-2">
               <h5 className="m-0">Shop by {categoryName}</h5>
            </div>
            <section className={`bgImg-${Object.keys(secondLevelCategoryData).length < 4 ? categoryId : ``} categories section-seperator d-flex align-items-center`} style={{minHeight:'7.1rem'}}>
               <div className="container-fluid">
                  <ul className={`category-pills mb-0 ${Object.keys(secondLevelCategoryData).length < 4 ? 'w-75' : ''}`} style={{gap:'1rem'}}>
                     {Object.entries(secondLevelCategoryData).map(([key, value]) => {
                        return (
                           <SubCategoryCard className={'d-flex pointer test-card m-0'} history={props.history} title={value["categoryName"]} redirectTo={redirectToCategory(value['categoryName'], value['categoryId'])} svg={getSecondLevelCategorySvgs(value["categoryId"])} />
                        )
                     })}
                  </ul>
               </div>
            </section>
         </React.Fragment>}
     {validate.isEmpty(secondLevelCategoryData) && (props.isLoading) && 
     <ShopBySubCategoryGhostImage/>}
</React.Fragment>
);
}

export default ShopBySubCategory;