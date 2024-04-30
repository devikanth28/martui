import React, { useEffect, useState } from 'react';
import MartCatalogService from '../../../../services/MartCatalogService';
import Validate from '../../../../../helpers/Validate';
import Alert from '../../../../../components/Common/Alert';
import PharmacyCategoryDetailFilter from "./PharmacyCategoryDetailFilter";
import PharmaCategoryGhostImages from "./PharmaCategoryGhostImages";
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction';
import { fixUrl } from '../../../../../helpers/CommonUtil';
import ProductSummaryCard from '../../../Common/ProductSummaryCard';
import NoProductsFound from '../../../Common/NoProductsFound';
import { loadMoreProductsCount } from '../../../../../components/Common/Constants/MartConstants'; 

export const popOverPlacement = (cardIndexplace)=>{
   if(window.screen.width>1280 &&  window.screen.width<=1680){
      return cardIndexplace % 5  ? "right" : "left";
   }
   else if(window.screen.width<=1280){
       return cardIndexplace % 4  ? "right" : "left";
   }
   else if(window.screen.width>1680){
       return cardIndexplace % 6  ? "right" : "left";
   }
}

function PharmacyCategoryDetail(props) {
	
   const validate = Validate();
   const martCatalogService = MartCatalogService();
   const [filterModalOpen, setFilterModalOpen] = useState(false);
   const [showLoader, setShowLoader] = useState(true);
   const [loadMoreLoader, setLoadMoreLoader] = useState(false);
   const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
   const [showLoadMore, setShowLoadMore] = useState(false);
   const [productIds, setProductIds] = useState([]);
   const [pharmacyCategoryDetail, setPharmacyCategoryDetail] = useState({});
   const [pharmacyCategories, setPharmacyCategories] = useState({});
   const [selectedFilterData, setSelectedFilterData] = useState({});
   const [totalProductsCount, setTotalProductsCount] = useState();
   const breadCrumbAction = BreadCrumbAction();
   const toggleFilterModal = () => {
      setFilterModalOpen(!filterModalOpen);
   }
   useEffect(() => {
      getPharmacyCategoryDetail(props.match.params.pCat, props.match.params.pCatName, props.match.params.catName);
      getPharmacyCategories();
   }, [props.match.params.pCat, props.match.params.pCatName, props.match.params.catName]);

   const getPharmacyCategoryDetail = (pCat, pCatName, catName) => {
      setShowLoader(true);
      martCatalogService.getPharmacyCategoryDetail(pCat, pCatName, catName).then(response => {
         if (response && response.statusCode && response.statusCode === "SUCCESS") {
            if(response?.dataObject?.canonicalName){
               fixUrl(props.location.pathname,response?.dataObject?.canonicalName);
            }
            if (response.dataObject.productInfoList) {
               let tempDataObject = {
                  "currentCategory": response.dataObject.categoryName,
                  "categoryDescription": response.dataObject.catContent,
                  "currentCategoryId": response.dataObject.categoryId,
                  "pCat": response.dataObject.pCat,
                  "subCatId": response.dataObject.subCatId
               };
               if(validate.isNotEmpty(tempDataObject?.currentCategory)){
                  breadCrumbAction.pushBreadCrumbs({name : tempDataObject.currentCategory,url : props.location.pathname});
               }
               tempDataObject = { ...tempDataObject, "productInfoList": response.dataObject.productInfoList };
               setPharmacyCategoryDetail({ ...pharmacyCategoryDetail, ...tempDataObject });
               setTotalProductsCount(response.dataObject.totalProductFound);
               if (response.dataObject.totalProductFound > response.dataObject.productInfoList.length) {
                  setShowLoadMore(true);
               } else {
                  setShowLoadMore(false);
               }
            }
            if (response.dataObject.productIdString) {
               setProductIds(JSON.parse(response.dataObject.productIdString));
            }
         }
         setShowLoader(false);
      }).catch(err => {
         setShowLoader(false);
         console.log(err);
         setAlertInfo({ message: "Something Went Wrong!", type: "" });
      })
   }

   const popOverPlacement = (cardIndexplace)=>{
      if(window.screen.width>1280 &&  window.screen.width<=1680){
         return cardIndexplace % 5  ? "right" : "left";
      }
      else if(window.screen.width<=1280){
          return cardIndexplace % 4  ? "right" : "left";
      }
      else if(window.screen.width>1680){
          return cardIndexplace % 6  ? "right" : "left";
      }
  }

   const getMorePharmacyProducts = () => {
      setLoadMoreLoader(true);
      var loadMoreCriteria = {
         productCategoryId: pharmacyCategoryDetail.currentCategoryId,
         productIdString: JSON.stringify(productIds),
         startIndex: pharmacyCategoryDetail.productInfoList.length,
         pCat: pharmacyCategoryDetail.pCat,
         subCatId: pharmacyCategoryDetail.subCatId
      }
      martCatalogService.getPharmacyProducts(loadMoreCriteria).then(response => {
         if (response && response.statusCode && response.statusCode === "SUCCESS") {
            if (response.dataObject.productInfoList) {
               let tempDataObject = {
                  "currentCategory": response.dataObject.categoryName,
                  "categoryDescription": response.dataObject.catContent
               };
               tempDataObject = { ...tempDataObject, "productInfoList": [...pharmacyCategoryDetail.productInfoList, ...response.dataObject.productInfoList] };
               setPharmacyCategoryDetail({ ...pharmacyCategoryDetail, ...tempDataObject });
               if (response.dataObject.totalProductFound > (pharmacyCategoryDetail.productInfoList.length + response.dataObject.productInfoList.length)) {
                  setShowLoadMore(true);
               } else {
                  setShowLoadMore(false);
               }
            }
         }
         setLoadMoreLoader(false);
      }).catch(err => {
         setLoadMoreLoader(false);
         console.log(err);
         setAlertInfo({ message: "Something Went Wrong!", type: "" });
      })
   }

   const getPharmacyCategories = () => {
      martCatalogService.getPharmacyCategories().then(response => {
         if (response && response.statusCode && response.statusCode === "SUCCESS") {
            setPharmacyCategories(response.dataObject);

         }
      }).catch(err => {
         console.log(err);
         setAlertInfo({ message: "Error getting categories", type: "" });
      })
   }

   const closeAlertMessage = () => {
      setAlertInfo({ message: "", type: "" });
   }

   const applyCategoryFilter = () => {
      props.history.replace("/drugsInfo/" + formatSpclCharectersFromString(selectedFilterData.parentCategoryName) + "/" + formatSpclCharectersFromString(selectedFilterData.categoryName) + "_" + formatSpclCharectersFromString(selectedFilterData.categoryId) + "/" + formatSpclCharectersFromString(selectedFilterData.subCatName) + "_" + formatSpclCharectersFromString(selectedFilterData.subCatId));
   }

   const formatSpclCharectersFromString = (str)=>{
      return str.replace(/[^A-Z0-9]+/ig, "-").toLowerCase();
   }
   return (
      <React.Fragment>
         <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000' />
         <React.Fragment>
            {!showLoader &&
               <React.Fragment>
                  {filterModalOpen &&
                     <PharmacyCategoryDetailFilter
                        applyCategoryFilter={applyCategoryFilter}
                        selectedFilterData={selectedFilterData}
                        setSelectedFilterData={setSelectedFilterData}
                        pharmacyCategories={pharmacyCategories}
                        filterModalOpen={filterModalOpen}
                        toggleFilterModal={toggleFilterModal}
                        history={props.history}
                        currentCategoryDetails={
                           {
                              "selectedParentCategoryName": pharmacyCategoryDetail.pCat,
                              "selectedsubCatId": pharmacyCategoryDetail.subCatId,
                              "selectedCategoryId": pharmacyCategoryDetail.currentCategoryId
                           }
                        }
                     />
                  }
                  <div className="align-items-center d-flex justify-content-between">
                     {validate.isNotEmpty(pharmacyCategories) && <React.Fragment><button className="btn border-sort-btn filter mr-2 ml-0 mb-3" onClick={() => toggleFilterModal()}>
                        <svg className="mr-2 align-middle" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                           <g id="Group_22672" data-name="Group 22672" transform="translate(-1727 -423)">
                              <rect id="Rectangle_6527" data-name="Rectangle 6527" width="18" height="18" rx="3" transform="translate(1727 423)" fill="#fff"></rect>
                              <path id="Icon_awesome-filter" data-name="Icon awesome-filter" d="M15.249,0H.751a.751.751,0,0,0-.53,1.28L6,7.061V13.5a.75.75,0,0,0,.32.614l2.5,1.749A.75.75,0,0,0,10,15.249V7.061l5.78-5.78A.751.751,0,0,0,15.249,0Z" transform="translate(1728 424)"></path>
                           </g>
                        </svg>
                        All Filters
                     </button>
                     <p className="mb-0 font-14 text-secondary"> {pharmacyCategoryDetail?.productInfoList?.length} / {Validate().isNotEmpty(totalProductsCount) ? totalProductsCount : 0} </p></React.Fragment>}
                  </div>
                  {validate.isEmpty(pharmacyCategories) && <div class="bg-light p-0 ph-item ph-row">
                     <div class="ph-col-1" style={{ "height": "2rem" }}></div>
                  </div>}
                  <section className='w-100 d-flex flex-wrap home-page-products-slider p-2'>
                     <h2 className="px-2 w-100 d-block mb-2" title={`Products for ${pharmacyCategoryDetail.currentCategory}`}>
                        {pharmacyCategoryDetail.currentCategory}
                     </h2>
                     {pharmacyCategoryDetail.categoryDescription && <p className="px-2 mb-0 pb-3">{pharmacyCategoryDetail.categoryDescription}</p>}
                     {validate.isNotEmpty(pharmacyCategoryDetail.productInfoList) &&
                        <React.Fragment>
                           <div className='d-flex flex-wrap w-100' style={{'gap':'0.5rem 0rem'}}>
                              {
                                 pharmacyCategoryDetail.productInfoList.map((eachProduct,index) =>
                                    <div className='drugInfo-all-products'>
                                    <ProductSummaryCard product={eachProduct} showinformation={true} isDropDownRequired={true} cardIndex={`${popOverPlacement(index+1)}`}  height={170} width={142}/>
                                    </div>
                                 )
                              }
                              {loadMoreLoader && <PharmaCategoryGhostImages onlyCatagoryProducts={true}/>}
                           </div>
                           {showLoadMore ? <div className='w-100 px-2 pt-2'>
                              <button role="button" aria-label="LoadMore" className="btn brand-secondary btn-block rounded-pill custom-btn-lg" disabled={loadMoreLoader} onClick={() => getMorePharmacyProducts()}>
                                 {loadMoreLoader ?
                                    <React.Fragment>
                                       <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                       <span className="sr-only"></span>
                                    </React.Fragment>
                                    : <React.Fragment>{`Load ${validate.isNotEmpty(totalProductsCount) && totalProductsCount - pharmacyCategoryDetail?.productInfoList?.length > loadMoreProductsCount ? loadMoreProductsCount : totalProductsCount - pharmacyCategoryDetail?.productInfoList?.length} More Products From ${pharmacyCategoryDetail.currentCategory}`}</React.Fragment>
                                 }</button>
                           </div> :
                              <React.Fragment>
                                 <div className="alert alert-warning w-100 text-center mb-0 pt-2 rounded-pill" role="alert"><strong>Huh..! We don't have any more products.</strong></div>
                              </React.Fragment>}
                        </React.Fragment> 
                     }
                     {validate.isEmpty(pharmacyCategoryDetail.productInfoList) && <NoProductsFound message={"Huh..! We don't have any more products."} className={"body-height d-flex align-items-center justify-content-center w-100 shadow-none"} showrequest={false}/>}
                  </section>
               </React.Fragment>}
            {showLoader && <PharmaCategoryGhostImages onlyCatagoryProducts={false}/>}
         </React.Fragment>
      </React.Fragment>
   );
}

export default PharmacyCategoryDetail;