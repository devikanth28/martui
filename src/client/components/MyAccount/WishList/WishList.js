import React, { useState, useEffect } from 'react';
import MyAccountService from '../../../services/MyAccountService';
import CheckoutService from '../../../services/CheckoutService';
import Alert from '../../Common/Alert';
import Validate from '../../../helpers/Validate';
import { GeneralProducts, PharmacyProducts } from '../WishList/WishListProducts';
import ProductNotify from '../WishList/ProductNotify';
import WishListGhostImage from '../WishList/WishListGhostImage';
import CartAction from '../../../../redux/action/CartAction';
import { connect } from 'react-redux';

let generalProductList = [];
let pharmacyProductList = [];
let hubStatus = "FALSE";
let drugSchedules = [];

const Wishlist = (props) => {

    const cartAction = CartAction();
    const GENERAL = "GENERAL";
    const PHARMACY = "PHARMACY";
    const [generalWishList, setGeneralWishList] = useState({});
    const [pharmaWishList, setPharmaWishList] = useState({});
    const [shoppingCartInfo, setShoppingCartInfo] = useState({});
    const [showWishListType, setShowWishListType] = useState(PHARMACY);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const validate = Validate();
    const checkoutService = CheckoutService();
    const myAccountService = MyAccountService();
    let viewSize = 20;
    const [modal, setModal] = useState(false);
    const [notifyProduct, setNotifyProduct] = useState({});
    const [isWishListLoading, setWishListLoading] = useState(true);
    const [isAddToCartLoading, setAddToCartLoading] = useState(undefined);
    const [generalProductViewList, setGeneralProductViewList] = useState(() => []);
    const [completeGeneralProductIdList, setCompleteGeneralProductIdList] = useState(() => []);
    const [frequentlyOrderedGeneralProductIdList, setFrequentlyOrderedGeneralProductIdList] = useState(() => []);
    const [wishListAddedGeneralProductIdList, setWishListAddedGeneralProductIdList] = useState(() => []);
    const [pharmacyProductViewList, setPharmacyProductViewList] = useState(() => []);
    const [completePharmacyProductIdList, setCompletePharmacyProductIdList] = useState(() => []);
    const [frequentlyOrderedPharmacyProductIdList, setFrequentlyOrderedPharmacyProductIdList] = useState(() => []);
    const [wishListAddedPharmacyProductIdList, setWishListAddedPharmacyProductIdList] = useState(() => []);
    let [startIndex=0, setStartIndex] = useState();
    let [currentPageNum=1, setCurrentPageNum] = useState();
    const [generalProductFilter='all', setGeneralProductFilter] = useState();
    const [pharmacyProductFilter='all', setPharmacyProductFilter] = useState();
    const [generalProductSort='newToOld', setGeneralProductSort] = useState();
    const [pharmacyProductSort='newToOld', setPharmacyProductSort] = useState();
    const [generalProductTotalRecordsCount, setGeneralProductTotalRecordsCount] = useState(() => ({all: 0, frequent:0, wishlist: 0}));
    const [pharmacyProductTotalRecordsCount, setPharmacyProductTotalRecordsCount] = useState(() => ({all: 0, frequent:0, wishlist: 0}));

    useEffect(() => {
        getMyWishListInfoByProductIds(showWishListType, 0, null);
        return (() => {
            generalProductList = [];
            pharmacyProductList = [];
            hubStatus = "FALSE";
            drugSchedules = [];
        });
    }, []);

    const setGeneralProductList = (list) => {
        generalProductList = list;
    }

    const setPharmacyProductList = (list) => {
        pharmacyProductList = list;
    }

    const showWishList = (wishListType, startIndex) => {
        if(startIndex<0) {
            return false;
        }
        if (wishListType == GENERAL && validate.isNotEmpty(generalProductList) && startIndex >= generalProductList.length) {
            return false;
        }
        if (wishListType == PHARMACY && validate.isNotEmpty(pharmacyProductList) && startIndex >= pharmacyProductList.length) {
            return false;
        }
        if (wishListType == GENERAL) {
            setShowWishListType(GENERAL);
            if (generalProductFilter!='all' && validate.isEmpty(generalProductList)) {
                setGeneralWishList({ ...generalWishList, productList: [] });
                setGeneralProductViewList([]);
                generalProductList = [];
                return false;
            }
            getMyWishListInfoByProductIds(GENERAL, startIndex, validate.isEmpty(generalProductList) ? null : generalProductList.slice(startIndex,startIndex+viewSize));
        } else if (wishListType == PHARMACY) {
            setShowWishListType(PHARMACY);
            if (pharmacyProductFilter!='all' && validate.isEmpty(pharmacyProductList)) {
                setPharmaWishList({ ...pharmaWishList, productList: [] });
                setPharmacyProductViewList([]);
                pharmacyProductList = [];
                return false;
            }
            getMyWishListInfoByProductIds(PHARMACY, startIndex, validate.isEmpty(pharmacyProductList) ? null : pharmacyProductList.slice(startIndex,startIndex+viewSize));
        }
    }

    const getMyWishListInfoByProductIds = (wishListType, startIndex, productIds) => {
        setWishListLoading(true);
        myAccountService.getMyWishListInfo(wishListType, JSON.stringify(productIds)).then(response => {
            processResponse(response, wishListType, startIndex, productIds, true);
        }).catch(function (error) {
            console.log(error);
        });
    }

    const getSortedWishListInfo = (wishListType, startIndex, sortBy, filterBy) => {
        setWishListLoading(true);
        myAccountService.getSortedWishListInfo(wishListType, sortBy, filterBy).then(response => {
            processResponse(response, wishListType, startIndex, null, false);
        }).catch(function (error) {
            console.log(error);
        });
    }

    const processResponse = (response, wishListType, startIndex, productIds, fullProductInfoRequired) => {
        setWishListLoading(false)
        if (validate.isNotEmpty(response) && response.statusCode == "SUCCESS") {
            setStartIndex(startIndex);
            setCurrentPageNum(startIndex/viewSize+1);
            if (wishListType == GENERAL) {
                setShowWishListType(GENERAL);
                setGeneralWishList(response.dataObject == null ? {} : response.dataObject);
                setGeneralProductViewList(response.dataObject.productList);
                if (validate.isEmpty(productIds) || !productIds.length>0) {
                    setCompleteGeneralProductIdList(response.dataObject.allProductIdList);
                    setFrequentlyOrderedGeneralProductIdList(response.dataObject.frequentOrderedProductIdList);
                    setWishListAddedGeneralProductIdList(response.dataObject.wishListProductIdList);
                    viewSize = response.dataObject.viewSize;
                    hubStatus = response.dataObject.hubStatus;
                    drugSchedules = response.dataObject.drugSchedules;
                    if(fullProductInfoRequired) {
                        setGeneralProductFilter('all');
                        setGeneralProductSort('newToOld');
                        generalProductList = getFilteredProductIdList('all', response);
                    } else {
                        generalProductList = getFilteredProductIdList(generalProductFilter, response);  
                    }
                    setGeneralProductTotalRecordsCount({...generalProductTotalRecordsCount, all: response.dataObject.allProductIdList.length, frequent: response.dataObject.frequentOrderedProductIdList.length, 
                        wishlist: response.dataObject.wishListProductIdList.length});
                        setCurrentPageNum(1);
                    }
            } else if (wishListType == PHARMACY) {
                setShowWishListType(PHARMACY);
                setPharmaWishList(response.dataObject == null ? {} : response.dataObject);
                setPharmacyProductViewList(response.dataObject.productList);
                if (validate.isEmpty(productIds) || !productIds.length>0) {
                    setCompletePharmacyProductIdList(response.dataObject.allProductIdList);
                    setFrequentlyOrderedPharmacyProductIdList(response.dataObject.frequentOrderedProductIdList);
                    setWishListAddedPharmacyProductIdList(response.dataObject.wishListProductIdList);
                    viewSize = response.dataObject.viewSize;
                    hubStatus = response.dataObject.hubStatus;
                    drugSchedules = response.dataObject.drugSchedules;
                    if(fullProductInfoRequired) {
                        setPharmacyProductFilter('all');
                        setPharmacyProductSort('newToOld');
                        pharmacyProductList = getFilteredProductIdList('all', response);
                    } else {
                        pharmacyProductList = getFilteredProductIdList(pharmacyProductFilter, response);
                    }
                    setPharmacyProductTotalRecordsCount({...pharmacyProductTotalRecordsCount, all: response.dataObject.allProductIdList.length, frequent: response.dataObject.frequentOrderedProductIdList.length, 
                        wishlist: response.dataObject.wishListProductIdList.length});
                        setCurrentPageNum(1);
                    }
            }
        }
    }

    const getFilteredProductIdList = (filterBy, response) => {
        switch(filterBy) {
            case 'all':
                return response.dataObject.allProductIdList ? response.dataObject.allProductIdList : [];
            case 'frequent':
                return response.dataObject.frequentOrderedProductIdList ? response.dataObject.frequentOrderedProductIdList : [];
            case 'wishlist':
                return response.dataObject.wishListProductIdList ? response.dataObject.wishListProductIdList : [];
        }
    }

    const modifyShoppingCart = (productId, requestedQty) => {
        if (validate.isNotEmpty(requestedQty) && (requestedQty > 0 || requestedQty == 0)) {
            addProductToRedisCart(productId, requestedQty);
        } else {
            setAlertInfo({ message: "Invalid product quantity", type: "Error" });
        }
    }

    const addProductToRedisCart = (productId, requestedQty) => {
        setAddToCartLoading(productId);
        checkoutService.addProductToRedisCart(productId, requestedQty, false).then(response => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === "SUCCESS") {
                cartAction.updateShoppingCartInfo(setAddToCartLoading);
            } else if (response.statusCode === "FAILURE") {
                setAlertInfo({ message: response.message, type: "Error" });
                setAddToCartLoading(undefined);
            }
        }).catch(function (error) {
            setAddToCartLoading(undefined);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "Error" });
        });
    }

    /*  const removeProductFromCart = (productId, requestedQty) => {
         setAddToCartLoading(productId);
         checkoutService.modifyShoppingCartProductQuantity(productId, requestedQty).then(response => {
             if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === "SUCCESS") {
                 cartAction.updateShoppingCartInfo(setAddToCartLoading);
             } else if(response.statusCode === "FAILURE") {
                 setAddToCartLoading(undefined);
                 if("EMPTY SHOPPING CART"){
                     setAlertInfo({ message: "Product removed from Cart successfully", type: "Error" });
                 }else{
                     setAlertInfo({ message: response.message, type: "Error" });
                 }
             } 
         }).catch(function(error) {
             setAddToCartLoading(undefined);
             setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "Error" });
             console.log(error);
         });
     } */

    const setProductList = (category, productId) => {
        if(category === GENERAL) {
            let completeList = filterProductIds(completeGeneralProductIdList, productId);
            if(frequentlyOrderedGeneralProductIdList.includes(productId)) {
                setCompleteGeneralProductIdList(completeList);
                let frequentOrderedList = filterProductIds(frequentlyOrderedGeneralProductIdList, productId);
                setFrequentlyOrderedGeneralProductIdList(frequentOrderedList);
                setGeneralProductTotalRecordsCount({...generalProductTotalRecordsCount, all: completeList.length, frequent:frequentOrderedList.length});
            } else if(wishListAddedGeneralProductIdList.includes(productId)) {
                setCompleteGeneralProductIdList(completeList);
                let wishListAddedList = filterProductIds(wishListAddedGeneralProductIdList, productId);
                setWishListAddedGeneralProductIdList(wishListAddedList);
                setGeneralProductTotalRecordsCount({...generalProductTotalRecordsCount, all: completeList.length, wishlist:wishListAddedList.length});
            }
            return completeList;
        } else if(category === PHARMACY) {
            let completeList = filterProductIds(completePharmacyProductIdList, productId);
            if(frequentlyOrderedPharmacyProductIdList.includes(productId)) {
                setCompletePharmacyProductIdList(completeList);
                let frequentOrderedList = filterProductIds(frequentlyOrderedPharmacyProductIdList, productId);
                setFrequentlyOrderedPharmacyProductIdList(frequentOrderedList);
                setPharmacyProductTotalRecordsCount({...pharmacyProductTotalRecordsCount, all: completeList.length, frequent: frequentOrderedList.length});
            } else if(wishListAddedPharmacyProductIdList.includes(productId)) {
                setCompletePharmacyProductIdList(completeList);
                let wishListAddedList = filterProductIds(wishListAddedPharmacyProductIdList, productId);
                setWishListAddedPharmacyProductIdList(wishListAddedList);
                setPharmacyProductTotalRecordsCount({...pharmacyProductTotalRecordsCount, all: completeList.length, wishlist: wishListAddedList.length});
            }
            return completeList;
        }
    }

    const filterProductIds = (list, productId) => {
        return list.filter(id => id!=productId);
    }

    const modifyWishList = (productId, wishListType) => {
        setWishListLoading(true);
        myAccountService.modifyWishList(productId, wishListType, "REMOVE").then(response => {
            setWishListLoading(false);
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === "SUCCESS") {
                if (wishListType == GENERAL) {
                    generalProductList = filterProductIds(generalProductList, productId);
                    let completeList = setProductList(GENERAL, productId);
                    if(validate.isEmpty(generalProductList)){
                        if(validate.isEmpty(completeList)) {
                            setGeneralProductFilter('all');
                            setGeneralProductSort('newToOld');
                        }
                        setGeneralProductViewList([]);
                        return false;
                    }
                    if (((generalProductList.length) % viewSize) == 0 && generalProductList.length == (currentPageNum-1)*viewSize) {
                        let index = startIndex-viewSize;
                        getMyWishListInfoByProductIds(GENERAL, index, generalProductList.slice(index,index+viewSize));
                    } else {
                        getMyWishListInfoByProductIds(GENERAL, startIndex, generalProductList.slice(startIndex,startIndex+viewSize));
                    }
                } else if (wishListType == PHARMACY) {
                    pharmacyProductList = filterProductIds(pharmacyProductList, productId);
                    let completeList = setProductList(PHARMACY, productId);
                    if(validate.isEmpty(pharmacyProductList)){
                        if(validate.isEmpty(completeList)) {
                            setPharmacyProductFilter('all');
                            setPharmacyProductSort('newToOld');
                        }
                        setPharmacyProductViewList([]);
                        return false;
                    }
                    if (((pharmacyProductList.length) % viewSize) == 0 && pharmacyProductList.length == (currentPageNum-1)*viewSize) {
                        let index = startIndex-viewSize;
                        getMyWishListInfoByProductIds(PHARMACY, index, pharmacyProductList.slice(index,index+viewSize));
                    } else {
                        getMyWishListInfoByProductIds(PHARMACY, startIndex, pharmacyProductList.slice(startIndex,startIndex+viewSize));
                    }
                }

                // setAlertInfo({ message: "Product removed from wishList successfully", type: "Success" });
            } else if (response.statusCode === "FAILURE") {
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "Error" });
            }
        }).catch(function (error) {
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "Error" });
            console.log(error);
        });
    }

    const getProductNotifiedInfo = (modal, product) => {
        setNotifyProduct(product);
        myAccountService.getProductNotifiedInfo(product.productId).then(response => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode == "SUCCESS") {
                if (response.message == "Product already notified") {
                    setAlertInfo({ message: "You have already requested to notify for this product", type: "Info" });
                } else {
                    toggleModel(modal, product);
                }
            } else {
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "Error" });
            }
        }).catch(function (error) {
            console.log(error);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "Error" });
        });
    }

    const toggleModel = (modal, product) => {
        setModal(modal);
        setNotifyProduct(product);
    }

    const showNotifysuccessMsg = (msg) => {
        setAlertInfo({ message: msg, type: "Success" });
    }
    return (
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo} />
            <main role="main" className="container-fluid">
                <section className="body-height">
                    <div className="header p-0">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item border-0" onClick={() => showWishList(PHARMACY, 0)}>
                                <a className={`nav-link py-3 ${showWishListType == PHARMACY ? "active" : ""}`} id="pills-profile-tab" data-toggle="pill" href="javascript:void(0)" role="tab" aria-controls="pills-profile" aria-selected={`${showWishListType == PHARMACY ? "true" : "false"}`}>Pharmacy</a>
                            </li>
                            <li className="nav-item border-0" onClick={() => showWishList(GENERAL, 0)} >
                                <a className={`nav-link py-3 ${showWishListType == GENERAL ? "active" : ""}`} id="pills-home-tab" data-toggle="pill" href="javascript:void(0)" role="tab" aria-controls="pills-home" aria-selected={`${showWishListType == GENERAL ? "true" : "false"}`}>Health Store</a>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        {isWishListLoading && <WishListGhostImage></WishListGhostImage>}
                        {!isWishListLoading && pharmaWishList && showWishListType == PHARMACY &&
                            <PharmacyProducts isAddToCartLoading={isAddToCartLoading} modifyShoppingCart={modifyShoppingCart} shoppingCartItem={props.cartItems}
                                setPharmacyProductFilter={setPharmacyProductFilter} setPharmacyProductList={setPharmacyProductList} getMyWishListInfoByProductIds={getMyWishListInfoByProductIds} modifyWishList={modifyWishList} showWishList={showWishList} toggleModel={getProductNotifiedInfo}
                                pharmacyProductViewList={pharmacyProductViewList} completePharmacyProductIdList={completePharmacyProductIdList} frequentlyOrderedPharmacyProductIdList={frequentlyOrderedPharmacyProductIdList} wishListAddedPharmacyProductIdList={wishListAddedPharmacyProductIdList}
                                hubStatus={hubStatus} drugSchedules={drugSchedules} viewSize={viewSize} startIndex={startIndex} setStartIndex={setStartIndex} pharmacyProductTotalRecordsCount={pharmacyProductTotalRecordsCount}
                                pharmacyProductFilter={pharmacyProductFilter} currentPageNum={currentPageNum} pharmacyProductSort={pharmacyProductSort} setPharmacyProductSort={setPharmacyProductSort} getSortedWishListInfo={getSortedWishListInfo}></PharmacyProducts>
                        }
                        {!isWishListLoading && generalWishList && showWishListType == GENERAL &&
                            <GeneralProducts isAddToCartLoading={isAddToCartLoading} modifyShoppingCart={modifyShoppingCart} shoppingCartItem={props.cartItems}
                                setGeneralProductFilter={setGeneralProductFilter} setGeneralProductList={setGeneralProductList} getMyWishListInfoByProductIds={getMyWishListInfoByProductIds} modifyWishList={modifyWishList} showWishList={showWishList} toggleModel={getProductNotifiedInfo}
                                generalProductViewList={generalProductViewList} completeGeneralProductIdList={completeGeneralProductIdList} frequentlyOrderedGeneralProductIdList={frequentlyOrderedGeneralProductIdList} wishListAddedGeneralProductIdList={wishListAddedGeneralProductIdList}
                                hubStatus={hubStatus} drugSchedules={drugSchedules} viewSize={viewSize} startIndex={startIndex} setStartIndex={setStartIndex} generalProductTotalRecordsCount={generalProductTotalRecordsCount}
                                generalProductFilter={generalProductFilter} currentPageNum={currentPageNum} generalProductSort={generalProductSort} setGeneralProductSort={setGeneralProductSort} getSortedWishListInfo={getSortedWishListInfo}></GeneralProducts>
                        }
                    </div>
                </section>
            </main>
            {modal &&
                <ProductNotify modal={modal} toggleModel={toggleModel} notifyProduct={notifyProduct}
                    showSuccessMsg={showNotifysuccessMsg}></ProductNotify>
            }

        </React.Fragment>
    )
}


function mapStateToProps(state) {
    return {
        cartItems: state.cart.shoppingCartItem,
    }
}

export default connect(mapStateToProps)(Wishlist);