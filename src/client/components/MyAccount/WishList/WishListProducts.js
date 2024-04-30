import React, { useState, useEffect } from 'react';
import CONFIG from '../../../constants/ServerConfig';
import ProductThumbNail from '../../Common/ProductThumbNail';
import Validate from '../../../helpers/Validate';
import ProductSearchDropDown from '../../Common/ProductSearchDropDown';
import { getSelectedLocality } from '../../../../redux/action/LocalityAction';
import {getProductRedirectUrl} from '../../../helpers/CommonUtil';
import AddToCart from '../../../MedplusMart/components/Common/AddToCart';
import { Link } from 'react-router-dom';

const ALL = 'all';
const RECENTLY_ORDERED = 'frequent';
const ADDED_TO_FREQUENT_LIST = 'wishlist';
const NEW_TO_OLD = 'newToOld';
const OLD_TO_NEW = 'oldToNew';
const AVAILABILITY = 'sortByStock';
const noProductsMessage = {all: 'Frequently Ordered', frequent: 'Recently Ordered', wishlist: 'Added To Frequent'};

export const GeneralProducts = (props) =>{
    const validate = Validate();
    let productList = validate.isEmpty(props.generalProductViewList) ? null : props.generalProductViewList;
    const completeProductIdsList = props.completeGeneralProductIdList;
    const recentlyOrderedProductIdsList = props.frequentlyOrderedGeneralProductIdList;
    const wishListProductIdsList = props.wishListAddedGeneralProductIdList;
    let viewsize = parseInt(props.viewSize);
    const [appliedFilters=props.generalProductFilter,setAppliedFilters] = useState();
    const [appliedSortBy=props.generalProductSort,setAppliedSortBy] = useState();
    const [finalProductList = productList, setFinalProductList] = useState();
    let startIndex = props.startIndex;
    let totalRecordsCount = parseInt(props.generalProductTotalRecordsCount[appliedFilters]);
    let productShowingTo =  totalRecordsCount < startIndex+viewsize ? totalRecordsCount : startIndex+viewsize;
    const currentPageNum = props.currentPageNum;
    const shoppingCartProductIds = validate.isNotEmpty(props.shoppingCartItem) ? props.shoppingCartItem.map(eachItem => eachItem.productId) : [];
    const selectedLocality = getSelectedLocality();
    const drugSchedules = props.drugSchedules;

    let pages = Math.ceil(totalRecordsCount/viewsize) ;
    let pageCount = [];
    for (let page = 1; page <= pages ; page++) {
        pageCount.push(page);
    }
    
    const goToHome = () => {
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    const handleFilter = (filterBy) => {
        setAppliedFilters(filterBy);
        props.setGeneralProductFilter(filterBy);
        switch(filterBy) {
            case ALL:
                if(validate.isEmpty(completeProductIdsList) || !completeProductIdsList.length>0) {
                    props.setGeneralProductList([]);
                    productList = [];
                    setFinalProductList([]);
                } else {
                    props.setGeneralProductList(completeProductIdsList);
                    props.getMyWishListInfoByProductIds('GENERAL',0,completeProductIdsList.slice(0,viewsize));
                }
                break;
            case RECENTLY_ORDERED:
                if(validate.isEmpty(recentlyOrderedProductIdsList) || !recentlyOrderedProductIdsList.length>0) {
                    props.setGeneralProductList([]);
                    productList = [];
                    setFinalProductList([]);
                } else {
                    props.setGeneralProductList(recentlyOrderedProductIdsList);
                    props.getMyWishListInfoByProductIds('GENERAL',0,recentlyOrderedProductIdsList.slice(0,viewsize));
                }
                break;
            case ADDED_TO_FREQUENT_LIST:
                if(validate.isEmpty(wishListProductIdsList) || !wishListProductIdsList.length>0) {
                    props.setGeneralProductList([]);
                    productList = [];
                    setFinalProductList([]);
                } else {
                    props.setGeneralProductList(wishListProductIdsList);
                    props.getMyWishListInfoByProductIds('GENERAL',0,wishListProductIdsList.slice(0,viewsize));
                }
        }
    }

    const handleSort = (sortBy) => {
        if(sortBy==appliedSortBy) {
            return;
        }
        setAppliedSortBy(sortBy);
        props.setGeneralProductSort(sortBy);
        props.getSortedWishListInfo('GENERAL', 0, sortBy, appliedFilters);        
    }

    return (
        <React.Fragment>
            <div className="tab-pane show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                <div className="body wishlist-content">
                    <div className="whishlist-product-list flex-column row m-0 px-2">
                        {validate.isNotEmpty(completeProductIdsList) && <div className="filter-by-container">
                            <div>
                                <div className="d-inline-block">
                                    <p className="label-text">Filter By</p>
                                    <button title="All" className={appliedFilters== ALL ? 'btn btn-badge active':'btn btn-badge'} role="button" onClick={() => handleFilter(ALL)}>All</button>
                                    <button title="Recently Ordered" className={appliedFilters==RECENTLY_ORDERED ? 'btn btn-badge active':'btn btn-badge'} role="button" onClick={() => handleFilter(RECENTLY_ORDERED)}>Recently Ordered</button>
                                    <button title="Added to Frequent List" className={appliedFilters==ADDED_TO_FREQUENT_LIST ? 'btn btn-badge active':'btn btn-badge'} role="button" onClick={() => handleFilter(ADDED_TO_FREQUENT_LIST)}>Added to Frequent List</button>
                                </div>
                                {validate.isNotEmpty(finalProductList) && (currentPageNum==1 ? finalProductList.length>1 : true) && <div className="d-inline-block ml-4">
                                    <p className="label-text">Sort By</p>
                                    <button title="New to Old" className={appliedSortBy==NEW_TO_OLD ? 'btn btn-badge active':'btn btn-badge'} role="button" onClick={() => handleSort(NEW_TO_OLD)}>New to Old</button>
                                    <button title="Old to New" className={appliedSortBy==OLD_TO_NEW ? 'btn btn-badge active':'btn btn-badge'} role="button" onClick={() => handleSort(OLD_TO_NEW)}>Old to New</button>
                                    <button title="Availability" className={appliedSortBy==AVAILABILITY ? 'btn btn-badge active':'btn btn-badge'} role="button" onClick={() => handleSort(AVAILABILITY)}>Availability</button>
                                </div>}
                            </div>
                            {/* {finalProductList && finalProductList.length > 0 && <p className="result-text"> Showing {startIndex+1} to {productShowingTo} of {totalRecordsCount} items </p>} */}
                        </div>}
                        {validate.isNotEmpty(finalProductList) && <div className='w-100 d-flex flex-wrap'>
                            {validate.isNotEmpty(finalProductList) && finalProductList.map((product, key )=>{
                            let shoppingCartProduct = {};
                            if(shoppingCartProductIds.includes(product.productId)) {
                                shoppingCartProduct = props.shoppingCartItem.filter(eachProduct => eachProduct.productId == product.productId)[0];
                            }
                                return(
                                    <div className="each-product">
                                        <div className="card  p-2">
                                            {product.isPrescriptionRequired && product.isPrescriptionRequired == 'Y' && <span className="badge">Rx</span>}
                                            {validate.isNotEmpty(wishListProductIdsList) && wishListProductIdsList.includes(product.productId) && <a className="btn-link remove rounded-pill" title="Delete" onClick={() =>props.modifyWishList(product.productId,'GENERAL') }>
                                                <svg width="16" height="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" xmlSpace="preserve">
                                                <g>
                                                    <g>
                                                        <path d="M13.2,1.9h-2.1V0.5c0-0.3-0.2-0.5-0.5-0.5c0,0,0,0-0.1,0c0,0,0,0,0,0h-5h0h0C5.1,0,4.9,0.2,4.9,0.5v1.4H2.8 C2.2,1.9,1.7,2.4,1.7,3v0.8v1h0.9v10.2c0,0.6,0.5,1.1,1.1,1.1h8.6c0.6,0,1.1-0.5,1.1-1.1V4.8h0.9v-1V3C14.3,2.4,13.8,1.9,13.2,1.9 z M5.9,1h4.2v0.9H5.9V1z M12.4,14.9C12.4,15,12.4,15,12.4,14.9L3.7,15c-0.1,0-0.1,0-0.1-0.1V4.8h8.8V14.9z M13.3,3.8H2.7V3 c0-0.1,0-0.1,0.1-0.1h10.5c0.1,0,0.1,0,0.1,0.1L13.3,3.8L13.3,3.8z"></path>
                                                        <rect x="9.8" y="5.9" width="1" height="8.2"></rect>
                                                        <rect x="7.5" y="5.9" width="1" height="8.2"></rect>
                                                        <rect x="5.2" y="5.9" width="1" height="8.2"></rect>
                                                    </g>
                                                </g>
                                                </svg>
                                            </a>}
                                            <div className="photo">
                                                <Link to={getProductRedirectUrl(product.productId,product.productName)} title={product.productName} >
                                                    <ProductThumbNail imageUrl={product.imageUrl} productId={product.productId} className="" svgClassName={"my-3"}
                                                        productName={product.productName} svgHeight={'96'} svgWidth={"75"} height="128" auditForm={product.attribute.auditFo} imagesCount={product.imageUploadCount} 
                                                        isGeneral={(product.isGeneral=="Y" || product.attribute.auditFo === "GEN") ? true : false}/>
                                                </Link>
                                                {product.discountStr && <span className="offer"> {product.discountStr}</span> }
                                            </div>
                                            <Link to={getProductRedirectUrl(product.productId,product.productName)} title={product.productName} role="link" className='no-underline'>
                                                <h6 className="card-title">{product.productName}</h6>
                                            </Link>
                                            {product.mrpPrice > 0 && 
                                                <p className="text-right mb-1 font-weight-bold">
                                                    <strong className="rupee"> &#x20b9;</strong> 
                                                    {Number(product.discountedPrice).toFixed(2) > 0 ? Number(product.discountedPrice).toFixed(2) : Number(product.mrpPrice).toFixed(2)}
                                                    {product.discountedPrice > 0 && 
                                                        <del className="text-secondary ml-2">
                                                            MRP <strong className="text-secondary"> &#x20b9; </strong> {Number(product.mrpPrice).toFixed(2)}
                                                        </del>
                                                    }
                                                </p>
                                            }
                                            {props.hubStatus == "TRUE" &&
                                                <AddToCart productId={product.productId} product={product} isAvailable={product.isInStock} classStyle="btn btn-block btn-brand-gradient rounded-pill custom-btn-lg" isDropDownRequired displayableName={"Move To Cart"} />
                                            }
                                    </div>
                                </div>
                            )
                            })}
                        </div> }

                         <div className={`no-products ${validate.isEmpty(finalProductList)  ? "" : "d-none"}`}>
                            <div className="div-center p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="90.614" fill="#cecece" height="88.345" viewBox="0 0 90.614 88.345"><g transform="translate(618.966 3920.471)">
                                    <path className="a" d="M-1091.052-4090.2c-6.2-2.664-13.305-9.732-14-16.012a8.632,8.632,0,0,1,1.938-6.831,6.9,6.9,0,0,1,5.212-2.326,9.4,9.4,0,0,1,7.154,3.858,8.444,8.444,0,0,1,6.876-3.858,7.491,7.491,0,0,1,5.579,2.5,8.419,8.419,0,0,1,1.962,6.656c-.7,6.281-7.8,13.348-14.007,16.012a.909.909,0,0,1-.355.072A.914.914,0,0,1-1091.052-4090.2Zm-10.718-21.638a6.855,6.855,0,0,0-1.488,5.429c.547,4.942,6.372,11.58,12.565,14.394,6.194-2.814,12.018-9.453,12.568-14.4a6.64,6.64,0,0,0-1.513-5.256,5.7,5.7,0,0,0-4.237-1.9c-2.389,0-4.586,1.491-6.034,4.089a.9.9,0,0,1-.752.465.953.953,0,0,1-.785-.4c-1.759-2.639-4.115-4.153-6.459-4.153h-.029A5.125,5.125,0,0,0-1101.77-4111.836Zm-11.009,11.005a10.116,10.116,0,0,1-4.392-1.013h-5.188a10.1,10.1,0,0,1-5.07-1.368v1.368h-39.439v-39.442h15.01a14.876,14.876,0,0,1-12.625-16.826,14.873,14.873,0,0,1,16.826-12.625,14.875,14.875,0,0,1,12.626,16.826,14.877,14.877,0,0,1-12.626,12.625h15.157v-13.747a10.177,10.177,0,0,1,8.339-9.971v-13.468h11.719V-4165a10.18,10.18,0,0,1,8.339,9.971v17.636h4.958A10.155,10.155,0,0,1-1089-4127.253v5.107a18.49,18.49,0,0,0-2.255-.348v-2.789h-19.495v-2.254h19.479a7.892,7.892,0,0,0-7.875-7.607h-13.633a7.894,7.894,0,0,0-7.873,7.607h7.085v2.254h-7.1v14.313a7.9,7.9,0,0,0,7.888,7.888h1.4a18.48,18.48,0,0,0,.255,2.252Zm-51.835-3.268h34.933v-4.959h-24.452V-4129h24.452v-3.491h-25.805v-2.253h25.805v-4.283h-34.933v4.283h7.436v2.253h-7.436Zm37.185-1.852a7.823,7.823,0,0,0,5.07,1.851h2.143a10.08,10.08,0,0,1-2.7-6.872v-2.307h-4.508Zm-24.452-5.36h22.2v-15.438h-22.2Zm29.974-51.655-1.043.078a7.909,7.909,0,0,0-7.3,7.855v13.747h2.817v25.752h4.508v-4.9h-3.382V-4148.5h19.947v-6.536a7.912,7.912,0,0,0-7.3-7.855l-1.042-.078v-2.763h-7.212Zm-2.142,40.276h1.129v-4.565a10.152,10.152,0,0,1,10.141-10.142h6.424v-8.845h-17.693Zm-38.328-33.306h0a12.62,12.62,0,0,0,12.622,12.621,12.62,12.62,0,0,0,12.621-12.621,12.622,12.622,0,0,0-12.621-12.622A12.633,12.633,0,0,0-1162.378-4155.994Zm40.471-11.988h7.212v-8.234h-7.212Zm6.536,56.673v-10.142h16.12a18.336,18.336,0,0,0-4.328,2.251h-9.539v5.635h4.319a18.183,18.183,0,0,0-1.168,2.255Zm-34.387-36.8a7.9,7.9,0,0,1-7.887-7.888,7.888,7.888,0,0,1,7.887-7.888,7.889,7.889,0,0,1,7.889,7.887,7.89,7.89,0,0,1-7.888,7.889Zm-5.634-7.888h0a5.634,5.634,0,0,0,5.635,5.634,5.634,5.634,0,0,0,5.633-5.636,5.634,5.634,0,0,0-5.633-5.633A5.642,5.642,0,0,0-1155.391-4155.994Z" transform="translate(547.902 258)"></path></g>
                                </svg>
                                <p className="title mt-3 font-weight-bold">No Health Store products in {noProductsMessage[appliedFilters]} List</p>
                                <button className="btn px-5 btn-brand-gradient rounded-pill custom-btn-lg" onClick={() => goToHome()}>Start Ordering</button>
                            </div>
                        </div>
                    </div>
                </div>
                {parseInt(totalRecordsCount) > parseInt(viewsize) &&
                <nav aria-label="pagination">
                    <ul className="pagination">
                        <li className="page-item">
                            <button className="page-link" aria-label="Next" onClick={() => props.showWishList("GENERAL", parseInt(startIndex)-parseInt(viewsize))}>
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </button>
                        </li>
                        
                        {pageCount.map(pageNo =>
                           <li className={`page-item ${currentPageNum == pageNo ? "active" : ""}`}><button className="page-link" onClick={() => props.showWishList("GENERAL", (pageNo-1)*parseInt(viewsize))} >{pageNo}</button></li>
                        )}
                        <li className="page-item">
                            <button className="page-link" aria-label="Next" onClick={() => props.showWishList("GENERAL", parseInt(startIndex)+parseInt(viewsize))}>
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </button>
                        </li>
                    </ul>
                </nav>   
                }     
            </div>
        </React.Fragment>
    )
}

export const PharmacyProducts = (props) =>{
    const validate = Validate();
    let productList =  validate.isEmpty(props.pharmacyProductViewList) ? null : props.pharmacyProductViewList;
    const completeProductIdsList = props.completePharmacyProductIdList;
    const recentlyOrderedProductIdsList = props.frequentlyOrderedPharmacyProductIdList;
    const wishListProductIdsList = props.wishListAddedPharmacyProductIdList;
    let viewsize = parseInt(props.viewSize);
    const [appliedFilters=props.pharmacyProductFilter,setAppliedFilters] = useState();
    const [appliedSortBy=props.pharmacyProductSort,setAppliedSortBy] = useState();
    const [finalProductList = productList, setFinalProductList] = useState();
    let startIndex = props.startIndex;
    let totalRecordsCount = parseInt(props.pharmacyProductTotalRecordsCount[appliedFilters]);
    let productShowingTo =  totalRecordsCount < startIndex+viewsize ? totalRecordsCount : startIndex+viewsize;
    const currentPageNum = props.currentPageNum;
    const shoppingCartProductIds = validate.isNotEmpty(props.shoppingCartItem) ? props.shoppingCartItem.map(eachItem => eachItem.productId) : [];

    const selectedLocality = getSelectedLocality();
    const drugSchedules = props.drugSchedules;

    let pages = Math.ceil(totalRecordsCount/viewsize) ;
    let pageCount = [];
    for (let page = 1; page <= pages ; page++) {
        pageCount.push(page);
    }

    const goToHome = () => {
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    const handleFilter = (filterBy) => {
        setAppliedFilters(filterBy);
        props.setPharmacyProductFilter(filterBy);

        switch(filterBy) {
            case ALL:
                if(validate.isEmpty(completeProductIdsList) || !completeProductIdsList.length>0) {
                    props.setPharmacyProductList([]);
                    productList = [];
                    setFinalProductList([]);
                } else {
                    props.setPharmacyProductList(completeProductIdsList);
                    props.getMyWishListInfoByProductIds('PHARMACY',0,completeProductIdsList.slice(0,viewsize));
                }
                break;
            case RECENTLY_ORDERED:
                if(validate.isEmpty(recentlyOrderedProductIdsList) || !recentlyOrderedProductIdsList.length>0) {
                    props.setPharmacyProductList([]);
                    productList = [];
                    setFinalProductList([]);
                } else {
                    props.setPharmacyProductList(recentlyOrderedProductIdsList);
                    props.getMyWishListInfoByProductIds('PHARMACY',0,recentlyOrderedProductIdsList.slice(0,viewsize));
                }
                break;
            case ADDED_TO_FREQUENT_LIST:
                if(validate.isEmpty(wishListProductIdsList) || !wishListProductIdsList.length>0) {
                    props.setPharmacyProductList([]);
                    productList = [];
                    setFinalProductList([]);
                } else {
                    props.setPharmacyProductList(wishListProductIdsList);
                    props.getMyWishListInfoByProductIds('PHARMACY',0,wishListProductIdsList.slice(0,viewsize));
                }
        }
    }

    const handleSort = (sortBy) => {
        if(sortBy==appliedSortBy) {
            return;
        }
        setAppliedSortBy(sortBy);
        props.setPharmacyProductSort(sortBy);
        props.getSortedWishListInfo('PHARMACY', 0, sortBy, appliedFilters);
    }

    return (
        <React.Fragment>
            <div className="tab-pane show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <div className="body wishlist-content">
                    <div className="whishlist-product-list flex-column row m-0 px-2">
                        {validate.isNotEmpty(completeProductIdsList) && <div className="filter-by-container">
                            <div>
                                <div className="d-inline-block">
                                    <p className="label-text">Filter By</p>
                                    <button title="All" className={appliedFilters== ALL ? 'btn btn-badge active':'btn btn-badge'} role="button" onClick={()=>handleFilter(ALL)}>All</button>
                                    <button title="Recently Ordered" className={appliedFilters==RECENTLY_ORDERED ? 'btn btn-badge active':'btn btn-badge'} role="button" onClick={()=>handleFilter(RECENTLY_ORDERED)}>Recently Ordered</button>
                                    <button title="Added to Frequent List" className={appliedFilters==ADDED_TO_FREQUENT_LIST ? 'btn btn-badge active':'btn btn-badge'} role="button" onClick={()=>handleFilter(ADDED_TO_FREQUENT_LIST)}>Added to Frequent List</button>
                                </div>
                                {validate.isNotEmpty(finalProductList) && (currentPageNum==1 ? finalProductList.length>1 : true) && <div className="d-inline-block ml-4">
                                    <p className="label-text">Sort By</p>
                                    <button title="New to Old" className={appliedSortBy==NEW_TO_OLD ? 'btn btn-badge active':'btn btn-badge'} role="button" onClick={()=>handleSort(NEW_TO_OLD)}>New to Old</button>
                                    <button title="Old to New" className={appliedSortBy==OLD_TO_NEW ? 'btn btn-badge active':'btn btn-badge'} role="button" onClick={()=>handleSort(OLD_TO_NEW)}>Old to New</button>
                                    <button title="Availability" className={appliedSortBy==AVAILABILITY ? 'btn btn-badge active':'btn btn-badge'} role="button" onClick={()=>handleSort(AVAILABILITY)}>Availability</button>
                                </div>}
                            </div>
                        </div>}
                        { validate.isNotEmpty(finalProductList) && <div className='w-100 d-flex flex-wrap'>
                            {validate.isNotEmpty(finalProductList) && finalProductList.map((product, key )=>{
                                let shoppingCartProduct = {};
                                if(shoppingCartProductIds.includes(product.productId)) {
                                    shoppingCartProduct = props.shoppingCartItem.filter(eachProduct => eachProduct.productId == product.productId)[0];
                                }
                                return(
                                <div className="each-product">
                                    <div className="card p-2">
                                        {product.isPrescriptionRequired && product.isPrescriptionRequired  == 'Y' && <span className="badge">Rx</span>}
                                        {validate.isNotEmpty(wishListProductIdsList) && wishListProductIdsList.includes(product.productId) && <button role="button" className="btn btn-link remove rounded-pill ga-remove-from-wishlist" title="Delete" onClick={() =>props.modifyWishList(product.productId,'PHARMACY') }>
                                            <svg width="16" height="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" xmlSpace="preserve">
                                                <g>
                                                <g>
                                                    <path d="M13.2,1.9h-2.1V0.5c0-0.3-0.2-0.5-0.5-0.5c0,0,0,0-0.1,0c0,0,0,0,0,0h-5h0h0C5.1,0,4.9,0.2,4.9,0.5v1.4H2.8 C2.2,1.9,1.7,2.4,1.7,3v0.8v1h0.9v10.2c0,0.6,0.5,1.1,1.1,1.1h8.6c0.6,0,1.1-0.5,1.1-1.1V4.8h0.9v-1V3C14.3,2.4,13.8,1.9,13.2,1.9 z M5.9,1h4.2v0.9H5.9V1z M12.4,14.9C12.4,15,12.4,15,12.4,14.9L3.7,15c-0.1,0-0.1,0-0.1-0.1V4.8h8.8V14.9z M13.3,3.8H2.7V3 c0-0.1,0-0.1,0.1-0.1h10.5c0.1,0,0.1,0,0.1,0.1L13.3,3.8L13.3,3.8z"></path>
                                                    <rect x="9.8" y="5.9" width="1" height="8.2"></rect>
                                                    <rect x="7.5" y="5.9" width="1" height="8.2"></rect>
                                                    <rect x="5.2" y="5.9" width="1" height="8.2"></rect>
                                                </g>
                                                </g>
                                            </svg>
                                        </button>}
                                        <div className="photo">
                                            <Link to={getProductRedirectUrl(product.productId,product.productName)} title={product.productName} >
                                                <ProductThumbNail imageUrl={product.imageUrl} productId={product.productId} className={"my-3"} svgClassName={"my-3"}
                                                    productName={product.productName} svgHeight={'96'} svgWidth={"75"} height={'96'} auditForm={product.attribute.auditFo} imagesCount={product.imageUploadCount} 
                                                    isGeneral={(product.isGeneral="Y" || product.attribute.auditFo === "GEN") ? true : false}/>
                                            </Link>
                                            {product.discountStr && <span className="offer">{product.discountStr}</span> }
                                        </div>
                                        <Link to={getProductRedirectUrl(product.productId,product.productName)} role="link" className='no-underline'>
                                            <h6 className="card-title " title={product.productName} >{product.productName}</h6>
                                        </Link>
                                        <p className="text-right mb-0 font-weight-bold">
                                            <span className="text-secondary ml-2 small">MRP</span>
                                            <strong className="rupee"> &#x20b9;</strong>{Number(product.mrpPrice).toFixed(2)}
                                        </p>

                                        { props.hubStatus == "TRUE" &&
                                            <React.Fragment>
                                                    {(product.attribute.auditFo == 'REF' && !product.attribute.isFridgeItemAllowed) ?
                                                        <small className="mt-auto"><strong className="color-red">Note:</strong> Fridge item, not available for sale in your locality</small>
                                                        :
                                                        <AddToCart productId={product.productId} product={product} isAvailable={product.isInStock} classStyle="btn btn-block btn-brand-gradient rounded-pill custom-btn-lg" isDropDownRequired  displayableName={"Move To Cart"} />
                                                }
                                            </React.Fragment>
                                      }
                                   </div>
                               </div>
                                )
                                })}
                            </div> }
                            <div className={`no-products ${validate.isEmpty(finalProductList)  ? "" : "d-none"}`}>
                                <div className="div-center p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="90.614" fill="#cecece" height="88.345" viewBox="0 0 90.614 88.345"><g transform="translate(618.966 3920.471)">
                                    <path className="a" d="M-1091.052-4090.2c-6.2-2.664-13.305-9.732-14-16.012a8.632,8.632,0,0,1,1.938-6.831,6.9,6.9,0,0,1,5.212-2.326,9.4,9.4,0,0,1,7.154,3.858,8.444,8.444,0,0,1,6.876-3.858,7.491,7.491,0,0,1,5.579,2.5,8.419,8.419,0,0,1,1.962,6.656c-.7,6.281-7.8,13.348-14.007,16.012a.909.909,0,0,1-.355.072A.914.914,0,0,1-1091.052-4090.2Zm-10.718-21.638a6.855,6.855,0,0,0-1.488,5.429c.547,4.942,6.372,11.58,12.565,14.394,6.194-2.814,12.018-9.453,12.568-14.4a6.64,6.64,0,0,0-1.513-5.256,5.7,5.7,0,0,0-4.237-1.9c-2.389,0-4.586,1.491-6.034,4.089a.9.9,0,0,1-.752.465.953.953,0,0,1-.785-.4c-1.759-2.639-4.115-4.153-6.459-4.153h-.029A5.125,5.125,0,0,0-1101.77-4111.836Zm-11.009,11.005a10.116,10.116,0,0,1-4.392-1.013h-5.188a10.1,10.1,0,0,1-5.07-1.368v1.368h-39.439v-39.442h15.01a14.876,14.876,0,0,1-12.625-16.826,14.873,14.873,0,0,1,16.826-12.625,14.875,14.875,0,0,1,12.626,16.826,14.877,14.877,0,0,1-12.626,12.625h15.157v-13.747a10.177,10.177,0,0,1,8.339-9.971v-13.468h11.719V-4165a10.18,10.18,0,0,1,8.339,9.971v17.636h4.958A10.155,10.155,0,0,1-1089-4127.253v5.107a18.49,18.49,0,0,0-2.255-.348v-2.789h-19.495v-2.254h19.479a7.892,7.892,0,0,0-7.875-7.607h-13.633a7.894,7.894,0,0,0-7.873,7.607h7.085v2.254h-7.1v14.313a7.9,7.9,0,0,0,7.888,7.888h1.4a18.48,18.48,0,0,0,.255,2.252Zm-51.835-3.268h34.933v-4.959h-24.452V-4129h24.452v-3.491h-25.805v-2.253h25.805v-4.283h-34.933v4.283h7.436v2.253h-7.436Zm37.185-1.852a7.823,7.823,0,0,0,5.07,1.851h2.143a10.08,10.08,0,0,1-2.7-6.872v-2.307h-4.508Zm-24.452-5.36h22.2v-15.438h-22.2Zm29.974-51.655-1.043.078a7.909,7.909,0,0,0-7.3,7.855v13.747h2.817v25.752h4.508v-4.9h-3.382V-4148.5h19.947v-6.536a7.912,7.912,0,0,0-7.3-7.855l-1.042-.078v-2.763h-7.212Zm-2.142,40.276h1.129v-4.565a10.152,10.152,0,0,1,10.141-10.142h6.424v-8.845h-17.693Zm-38.328-33.306h0a12.62,12.62,0,0,0,12.622,12.621,12.62,12.62,0,0,0,12.621-12.621,12.622,12.622,0,0,0-12.621-12.622A12.633,12.633,0,0,0-1162.378-4155.994Zm40.471-11.988h7.212v-8.234h-7.212Zm6.536,56.673v-10.142h16.12a18.336,18.336,0,0,0-4.328,2.251h-9.539v5.635h4.319a18.183,18.183,0,0,0-1.168,2.255Zm-34.387-36.8a7.9,7.9,0,0,1-7.887-7.888,7.888,7.888,0,0,1,7.887-7.888,7.889,7.889,0,0,1,7.889,7.887,7.89,7.89,0,0,1-7.888,7.889Zm-5.634-7.888h0a5.634,5.634,0,0,0,5.635,5.634,5.634,5.634,0,0,0,5.633-5.636,5.634,5.634,0,0,0-5.633-5.633A5.642,5.642,0,0,0-1155.391-4155.994Z" transform="translate(547.902 258)"></path></g>
                                </svg>
                                <p className="title mt-3 font-weight-bold">No Pharmacy products in {noProductsMessage[appliedFilters]} List</p>
                                {/* <p className="mb-3 small text-secondary">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</p> */}
                                <button className="btn px-5 btn-brand-gradient rounded-pill custom-btn-lg" onClick={() => goToHome()}>Start Ordering</button>
                            </div>
                        </div>
                    </div>
                </div>
                {parseInt(totalRecordsCount) > parseInt(viewsize) &&
                <nav aria-label="pagination">
                    <ul className="pagination">
                        <li className="page-item">
                            <button className="page-link" aria-label="Next" onClick={() => props.showWishList("PHARMACY", parseInt(startIndex)-parseInt(viewsize))}>
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </button>
                        </li>
                        {pageCount.map(pageNo =>
                           <li className={`page-item ${currentPageNum == pageNo ? "active" : ""}`}><button className="page-link" onClick={() => props.showWishList("PHARMACY", (parseInt(pageNo)-1)*parseInt(viewsize))} >{pageNo}</button></li>
                        )}
                        <li className="page-item">
                            <button className="page-link" aria-label="Next" onClick={() =>props.showWishList("PHARMACY", parseInt(startIndex)+parseInt(viewsize))}>
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </button>
                        </li>
                    </ul>
                </nav>   
                }         
            </div>
        </React.Fragment>
    )
}

export default GeneralProducts ;