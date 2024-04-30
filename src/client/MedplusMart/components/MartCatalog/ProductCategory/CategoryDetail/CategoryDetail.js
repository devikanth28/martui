import React, { useEffect, useState } from "react";
import Validate from "../../../../../helpers/Validate";
import MartCatalogService from '../../../../services/MartCatalogService';
import CategoryDetailGhostImage from './CategoryDetailGhostImage';
import ProductSummaryCard from '../../../../components/Common/ProductSummaryCard';
import CategoryDetailFilter from './CategoryDetailFilter';
import { fixUrl, getCategoryIdFromParam, getCategoryNameForUrl, getCategoryNameFromParam } from "../../../../../helpers/CommonUtil";
import LoadMoreButton from "../../../Common/LoadMoreButton";
import { checkIfFilterApplied, checkIfNoFilter, getInitialSortAndFilter, isEqual, usePrevious } from "./CategoryDetailHelper";
import FilterNames from "../../../Common/FilterNames";
import { sortValues } from "../../../../../components/Common/Constants/MartConstants";
import BreadCrumbAction from "../../../../../../redux/action/BreadCrumbAction";
import MartCategoryHelper from "../../../../../helpers/MartCategoryHelper";
import NoProductsFound from "../../../Common/NoProductsFound";
import Alert from "../../../../../components/Common/Alert";
import MetaTitle from "../../../../../commonComponents/MetaTitle";

const CategoryDetail = (props) => {

    const martCatalogService = MartCatalogService();
    const validate = Validate();
    const count = 30;
    const [loadMoreLoader, setLoadMoreLoader] = useState(false);

    let url = (typeof window !== "undefined" && window.location) ? window.location.href : undefined;
    let request = "";
    let categoryId = getCategoryIdFromParam(validate.isNotEmpty(props.match.params.categoryNameId) ? props.match.params.categoryNameId : props.match.params.currentCategoryName_Id);
    let categoryName = "";
    let selectedSubCategoryId = [];
    let urlFilterParams = {};
    let urlCategoryFilter;
    let urlBrandFilter;
    let urlSort;
    let urlPriceFilter;
    let urlExcludeOutOfStock;
    let urlStartAndEndPrice;

    if (url && (url.includes("/categories/") || url.includes("/promo/"))) {
        request = "CATEGORY";
    } else if (url && url.includes("/brand/")) {
        request = "BRAND";
    }

    if (url && url.includes("/promo/")) {
        categoryId = "CUSTOM_" + categoryId;
        categoryName = getCategoryNameFromParam(validate.isNotEmpty(props.match.params.currentCategoryName_Id) ? props.match.params.currentCategoryName_Id : "");
    }

    if (props.match.params.topCategoryName_Id) {
        selectedSubCategoryId.push(getCategoryIdFromParam(props.match.params.currentCategoryName_Id));
    }

    if (props.history && props.history.location && props.history.location.search && props.history.location.search !== "") {
        let searchStr = props.history.location.search;
        searchStr = searchStr.substring(1, searchStr.length);
        searchStr = decodeURIComponent(searchStr);
        searchStr = searchStr.replace(/-comma-/g, ",");
        let searchArr;
        if (searchStr !== "" && searchStr !== undefined) {
            searchArr = searchStr.split(",");
        }
        if (searchArr !== undefined && searchArr.length > 0) {
            searchArr.map(each => {
                let eachSearchArray = each.split("::");
                if (eachSearchArray && eachSearchArray.length === 2) {
                    switch (eachSearchArray[0]) {
                        case 'b':
                            urlBrandFilter = eachSearchArray[1];
                            let brandList = eachSearchArray[1].split(":");
                            urlFilterParams["brands"] = brandList.length > 0 ? brandList : undefined;
                            break;
                        case 'c':
                            urlCategoryFilter = eachSearchArray[1];
                            let categoryList = eachSearchArray[1].split(":");
                            urlFilterParams["subLevelCategories"] = categoryList.length > 0 ? categoryList : undefined;
                            break;
                        case 'x':
                            urlExcludeOutOfStock = eachSearchArray[1];
                            urlFilterParams["excludeOutOfStock"] = eachSearchArray[1] === "Y";
                            break;
                        case 'p':
                            urlPriceFilter = eachSearchArray[1];
                            let priceRangeArr = eachSearchArray[1].split(":");
                            urlFilterParams["priceRange"] = {};
                            urlFilterParams["priceRange"]["min"] = priceRangeArr[0];
                            urlFilterParams["priceRange"]["max"] = priceRangeArr[1];
                            break;
                        case 's':
                            urlSort = eachSearchArray[1];
                            urlFilterParams["sort"] = eachSearchArray[1];
                            break;
                        case 'm':
                            urlStartAndEndPrice = eachSearchArray[1];
                            let startAndEndPrice = eachSearchArray[1].split(":");
                            urlFilterParams["startAndEndPrice"] = {};
                            urlFilterParams["startAndEndPrice"]["min"] = startAndEndPrice[0];
                            urlFilterParams["startAndEndPrice"]["max"] = startAndEndPrice[1];
                        default: break;
                    }
                }
            })
        }
    }


    const currentCategoryName_Id = props.match.params.currentCategoryName_Id;
    const parentCategoryName_Id = props.match.params.parentCategoryName_Id;
    const topCategoryId = getCategoryIdFromParam(props?.match?.params?.topCategoryName_Id);
    
    let initialFiltersList = getInitialSortAndFilter(urlFilterParams);
    const [headerName, setHeaderName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [requestType, setRequestType] = useState(request);
    const [currentCategoryId, setCurrentCategoryId] = useState(categoryId);
    const [parentCategoryId, setParentCategoryId] = useState(getCategoryIdFromParam(props.match.params.parentCategoryName_Id));
    const [brandName, setBrandName] = useState(props.match.params.brandName);
    const [sortAndFilter, setSortAndFilter] = useState(initialFiltersList)
    const [startIndex, setStartIndex] = useState(0);
    const [productIdList, setProductIdList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [sortElements, setSortElements] = useState(sortValues);
    const [minAndMaxPrice, setMinAndMaxPrice] = useState({min: undefined, max: undefined});
    const [subLevelCategories, setSubLevelCategories] = useState([]);
    const [brandsList, setBrandsList] = useState([]);
    const [loadMore, setLoadMore] = useState(false);
    const [recordsCompleted, setRecordsCompleted] = useState(false);
    const [startAndEndPrice, setStartAndEndPrice] = useState(validate.isNotEmpty(sortAndFilter.startAndEndPrice) ? { min: sortAndFilter.startAndEndPrice.min, max: sortAndFilter.startAndEndPrice.max } : {});
    const [selectedSort, setSelectedSort] = useState(validate.isNotEmpty(urlSort) ? urlSort : 0);
    const [alertData, setAlertData] = useState({});
    const [showFilters, setShowFilters] = useState(false);
    const [onlyProductsLoader, setOnlyProductsLoader] = useState(false);
    const [filterRequest, setFilterRequest] = useState(false);

    let previousValue = usePrevious({ startIndex, filteredSubCategories: sortAndFilter.subLevelCategories, filteredBrands: sortAndFilter.brands, filteredOutOfStock: sortAndFilter.excludeOutOfStock, filteredRange: sortAndFilter.priceRange, filteredSort: sortAndFilter.sort, currentCategoryId: currentCategoryId })
    const breadCrumbAction = BreadCrumbAction();
    const martCatalogHelper =  MartCategoryHelper();

    const toggleFilterModal = () => {
        setFilterModalOpen(!filterModalOpen);
    }

    if (props.match.url.includes("/categories/") && getCategoryIdFromParam(validate.isNotEmpty(props.match.params.categoryNameId) ? props.match.params.categoryNameId : props.match.params.currentCategoryName_Id) !== currentCategoryId) {
        setIsLoading(true);
        setCurrentCategoryId(getCategoryIdFromParam(validate.isNotEmpty(props.match.params.categoryNameId) ? props.match.params.categoryNameId : props.match.params.currentCategoryName_Id));
        setParentCategoryId(getCategoryIdFromParam(props.match.params.parentCategoryName_Id));
        setRequestType("CATEGORY");
        setSelectedSort(validate.isNotEmpty(urlSort) ? urlSort : 0);
        setSortAndFilter(initialFiltersList);
    } else if (props.match.url.includes("/brand/") && currentCategoryId !== undefined) {
        setIsLoading(true);
        setCurrentCategoryId(undefined);
        setParentCategoryId(undefined);
        setBrandName(props.match.params.brandName);
        setRequestType("BRAND");
        setSelectedSort(validate.isNotEmpty(urlSort) ? urlSort : 0);
        setSortAndFilter(initialFiltersList);
    } else if (props.match.url.includes("/promo/") && "CUSTOM_" + getCategoryIdFromParam(validate.isNotEmpty(props.match.params.categoryNameId) ? props.match.params.categoryNameId : props.match.params.currentCategoryName_Id) !== currentCategoryId) {
        setIsLoading(true);
        setCurrentCategoryId("CUSTOM_" + getCategoryIdFromParam(validate.isNotEmpty(props.match.params.categoryNameId) ? props.match.params.categoryNameId : props.match.params.currentCategoryName_Id));
        setParentCategoryId(getCategoryIdFromParam(props.match.params.parentCategoryName_Id));
        setRequestType("CATEGORY");
        setSelectedSort(validate.isNotEmpty(urlSort) ? urlSort : 0);
        setSortAndFilter(initialFiltersList);
    }

    useEffect(() => {
        prepareCorrectUrl(currentCategoryId,parentCategoryId, topCategoryId);
    },[currentCategoryName_Id,parentCategoryName_Id, props.match.params.topCategoryName_Id]);

    const prepareCorrectUrl = (curCatId, pCatId,tCatId) => {
        let categoryIds = [];
        if(validate.isNotEmpty(tCatId)){
            categoryIds.push(tCatId);
        }
        if(validate.isNotEmpty(pCatId)){
            categoryIds.push(pCatId);
        }
        if(validate.isNotEmpty(curCatId)){
            categoryIds.push(curCatId);
        }
        const categoryDetails = martCatalogHelper.getCategoryDetailsFromCategoryIds(categoryIds);
        let url = "/categories";
        if(validate.isNotEmpty(categoryDetails)){
            categoryIds.map(catId => {
                if (categoryDetails[catId]) {
                    url += "/" + getCategoryNameForUrl(categoryDetails[catId].categoryName, catId);
                }
            });
            fixUrl(props.location.pathname,url);
        }
    }

    useEffect(() => {
        let requestFor = undefined;
        if (previousValue) {
            if (previousValue.startIndex !== startIndex) {
                if (startIndex < totalRecords && startIndex !== 0 && previousValue.startIndex < startIndex) {
                    requestFor = "loadMore";
                }
            } else if (checkIfNoFilter(sortAndFilter, minAndMaxPrice) && parseInt(sortAndFilter.sort) === 0) {
                requestFor = undefined;
            } else if (checkIfFilterApplied(sortAndFilter, previousValue)) {
                requestFor = "filter";
            }
        } else {
            if (((validate.isNotEmpty(urlFilterParams) && (validate.isNotEmpty(urlFilterParams.brands) && urlFilterParams.brands.length > 0) ||
                (validate.isNotEmpty(urlFilterParams.priceRange) && urlFilterParams.priceRange.min && urlFilterParams.priceRange.max) ||
                (validate.isNotEmpty(urlFilterParams.subLevelCategories) && urlFilterParams.subLevelCategories.length > 0) ||
                (validate.isNotEmpty(urlFilterParams.sort)) || urlFilterParams.excludeOutOfStock))) {
                requestFor = "urlFilter";
            }
        }

        if (requestFor == "loadMore") {
            setLoadMoreLoader(true);
        }
        if((requestFor == "filter" || requestFor == "urlFilter") && !filterRequest ){
            getAndSetValuesFromServerForFilters(prepareObjForServerRequest());
        }
        getAndSetValuesFromServer(prepareObjForServerRequest(requestFor), requestFor);

    }, [currentCategoryId, startIndex, sortAndFilter.subLevelCategories,
        sortAndFilter.brands, sortAndFilter.sort, sortAndFilter.excludeOutOfStock,
        sortAndFilter.priceRange]);

    const prepareObjForServerRequest = (requestFor) => {
        let productIdsList = productIdList;
        let start = 0;
        if (requestFor) {
            if (requestFor == "loadMore" && validate.isNotEmpty(productIdsList) && productIdsList.length > 0) {
                start = startIndex;
                productIdsList = productIdsList.slice(start, start + 30)
            } else {
                productIdsList = undefined;
            }
        } else {
            productIdsList = undefined;
        }
        let curCategoryId;
        if (requestType === "BRAND" && validate.isEmpty(currentCategoryId) && requestFor !== "filter") {
            curCategoryId = "*";
        } else {
            curCategoryId = currentCategoryId;
        }

        let startMrp = (requestFor == "filter" || requestFor == "urlFilter" || requestFor == "loadMore") ? (validate.isNotEmpty(sortAndFilter) && validate.isNotEmpty(sortAndFilter.priceRange)) ? sortAndFilter.priceRange.min : undefined : undefined;

        let endMrp = (requestFor == "filter" || requestFor == "urlFilter" || requestFor == "loadMore") ? (validate.isNotEmpty(sortAndFilter) && validate.isNotEmpty(sortAndFilter.priceRange)) ? sortAndFilter.priceRange.max : undefined : undefined;

        let subCategoryId = ((requestFor === "filter" || requestFor === "urlFilter" || requestFor === "loadMore") ? (validate.isNotEmpty(sortAndFilter) && validate.isNotEmpty(sortAndFilter.subLevelCategories) && sortAndFilter.subLevelCategories.length > 0) ? JSON.stringify(sortAndFilter.subLevelCategories) : undefined : undefined);

        let sort = (requestFor === "filter" || requestFor === "urlFilter" || requestFor === "loadMore") ? (validate.isNotEmpty(sortAndFilter) && validate.isNotEmpty(sortAndFilter.sort) ? sortAndFilter.sort : 0) : 0;

        let excludeOutOfStock = (requestFor === "filter" || requestFor === "urlFilter" || requestFor === "loadMore") ? (validate.isNotEmpty(sortAndFilter) && validate.isNotEmpty(sortAndFilter.excludeOutOfStock) ? sortAndFilter.excludeOutOfStock : false) : false;

        let brandsList = (requestFor === "filter" || requestFor === "urlFilter" || requestFor === "loadMore") ? (validate.isNotEmpty(sortAndFilter) && validate.isNotEmpty(sortAndFilter.brands) && sortAndFilter.brands.length > 0 ? JSON.stringify(sortAndFilter.brands) : undefined) : undefined;

        let startPrice = (requestFor == "filter" || requestFor == "urlFilter" || requestFor == "loadMore") ? (validate.isNotEmpty(startAndEndPrice) && validate.isNotEmpty(startAndEndPrice.min)) ? startAndEndPrice.min : undefined : undefined;

        let endPrice = (requestFor == "filter" || requestFor == "urlFilter" || requestFor == "loadMore") ? (validate.isNotEmpty(startAndEndPrice) && validate.isNotEmpty(startAndEndPrice.max)) ? startAndEndPrice.max : undefined : undefined;

        return {
            REQUEST_TYPE: requestType,
            PARENT_CATEGORY_ID: validate.isNotEmpty(parentCategoryId) ? parentCategoryId : undefined,
            CURRENT_CATEGORY_ID: curCategoryId,
            CATEGORY_NAME: validate.isNotEmpty(categoryName) ? categoryName : undefined,
            SUB_CATEGORY_ID: subCategoryId,
            PRODUCT_ID_LIST: productIdsList ? JSON.stringify(productIdsList) : productIdsList,
            START_INDEX: start,
            COUNT: count,
            START_MRP: startMrp,
            END_MRP: endMrp,
            START_PRICE: startPrice,
            END_PRICE: endPrice,
            SORT_INDEX: sort,
            EXCLUDE_OUT_OF_STOCK: excludeOutOfStock,
            OFFER_PRODUCT_REQUIRED: false,
            SELECTED_BRAND: brandsList ? brandsList.replace(/&/g, '-and-') : undefined,
            REQUEST_BRAND: brandName ? brandName.replace(/&/g, '-and-') : undefined,
            FILTER_TYPE: requestFor == "filter" && (validate.isNotEmpty(sortAndFilter) && validate.isNotEmpty(sortAndFilter.subLevelCategories) && sortAndFilter.subLevelCategories.length > 0) ? "SUB_CATEGORY" : undefined
        };

    }

    const getAndSetValuesFromServerForFilters = (obj) => {
        martCatalogService.getProductList(obj).then((response) => {
            if (response.statusCode == "SUCCESS") {
                let dataObject = validate.isNotEmpty(response.dataObject) ? response.dataObject : {};
                if (validate.isNotEmpty(dataObject.THIRD_LEVEL_CATEGORY)) {
                    setSubLevelCategories(dataObject.THIRD_LEVEL_CATEGORY);
                }
                if (validate.isNotEmpty(dataObject.MIN_PRICE) && validate.isNotEmpty(dataObject.MAX_PRICE)) {
                    setMinAndMaxPrice({ min: dataObject.MIN_PRICE, max: dataObject.MAX_PRICE });
                    setStartAndEndPrice({ min: dataObject.MIN_PRICE, max: dataObject.MAX_PRICE });
                }
                if (validate.isNotEmpty(dataObject.BRAND_DATA)) {
                    setBrandsList(dataObject.BRAND_DATA);
                }
            } 
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
            setShowFilters(true);
            setAlertData({ message: "Something went wrong", type: "danger" });
        });
    }

    const getAndSetValuesFromServer = (obj, requestFor) => {
        if (!requestFor) {
            if (checkIfNoFilter(sortAndFilter, minAndMaxPrice) && parseInt(sortAndFilter.sort) === 0 && requestFor === undefined && props.history && props.history.location && props.history.location.search && props.history.location.search !== "") {
                props.history.replace(`${props.history.location.pathname}`);
            }
        }
        if (requestFor == "filter" || requestFor == "urlFilter" || !requestFor) {
            setProductIdList([]);
            setStartIndex(0);
        }
        martCatalogService.getProductList(obj).then((response) => {
            setIsLoading(false);
            setOnlyProductsLoader(false);
            if (requestFor == "loadMore") {
                setLoadMoreLoader(false);
            }
            setLoadMore(false);
            if (response.statusCode == "SUCCESS") {
                let productListFromApi = [];
                let dataObject = response.dataObject;
                const name = requestType === "BRAND" ? brandName : dataObject.categoryName;
                setHeaderName(name);
                if (validate.isNotEmpty(dataObject) && requestType != "BRAND") {
                    prepareBreadCrumb(dataObject);
                } else {
                    breadCrumbAction.pushBreadCrumbs({ name: brandName, url: props.location.pathname });
                }
                if (validate.isNotEmpty(dataObject.PRODUCT_LIST)) {
                    if (requestFor === "loadMore") {
                        productListFromApi = [...productList, ...dataObject.PRODUCT_LIST];
                    } else if ((requestFor === "filter" || requestFor === "urlFilter") || !requestFor) {
                        productListFromApi = [...dataObject.PRODUCT_LIST];
                    }
                    setProductList(productListFromApi);
                    if (validate.isNotEmpty(dataObject.PRODUCT_ID_LIST)) {
                        setProductIdList(JSON.parse(dataObject.PRODUCT_ID_LIST));
                    }
                    setSortElements(dataObject.SORT_ELEMENTS);
                    if ((requestFor !== "filter" && requestFor !== "urlFilter")) {
                        if (validate.isNotEmpty(dataObject.THIRD_LEVEL_CATEGORY)) {
                            setSubLevelCategories(dataObject.THIRD_LEVEL_CATEGORY);
                        }
                        if (validate.isNotEmpty(dataObject.MIN_PRICE) && validate.isNotEmpty(dataObject.MAX_PRICE)) {
                            setMinAndMaxPrice({ min: dataObject.MIN_PRICE, max: dataObject.MAX_PRICE });
                            setStartAndEndPrice({ min: dataObject.MIN_PRICE, max: dataObject.MAX_PRICE });
                        }
                        if (validate.isNotEmpty(dataObject.BRAND_DATA)) {
                            setBrandsList(dataObject.BRAND_DATA);
                        }
                    }
                    if (validate.isNotEmpty(dataObject.TOTAL_RECORDS)) {
                        setTotalRecords(dataObject.TOTAL_RECORDS);
                    }
                    if(requestFor == "filter"){
                        setFiltersInUrl();
                    }
                    if (totalRecords > 0 && (requestFor !== "filter" && requestFor)) {
                        if (startIndex + 30 >= totalRecords) {
                            setRecordsCompleted(true);
                        } else {
                            setRecordsCompleted(false);
                        }
                    } else if (dataObject.TOTAL_RECORDS && (!requestFor || requestFor === "filter" || requestFor === "urlFilter")) {
                        if (count >= dataObject.TOTAL_RECORDS) {
                            setRecordsCompleted(true);
                        } else {
                            setRecordsCompleted(false);
                        }
                    }
                } else {
                    if (requestFor === "filter" || requestFor === "urlFilter" || !requestFor) {
                        setRecordsCompleted(true);
                        setProductList([]);
                    }
                    if (requestFor == "filter") {
                        setFiltersInUrl();
                    } 
                }
            }
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
            setShowFilters(true);
            setAlertData({ message: "Something went wrong", type: "danger" });
        });
    }

    const prepareBreadCrumb = (dataObject) => {

        const breadCrumbs = [];
        const topCategoryName_Id = getCategoryIdFromParam(props?.match?.params?.topCategoryName_Id);
        const parentCategoryName_Id = getCategoryIdFromParam(props?.match?.params?.parentCategoryName_Id);
        let categoryIds = [];
        if(topCategoryName_Id){
            categoryIds.push(topCategoryName_Id)
        }
        if(parentCategoryName_Id){
            categoryIds.push(parentCategoryName_Id)
        }

        const categoryDetails = martCatalogHelper.getCategoryDetailsFromCategoryIds(categoryIds);
        let url = "/categories";
        categoryIds.map(catId => {
            if (categoryDetails && categoryDetails[catId]) {
                url += "/" + getCategoryNameForUrl(categoryDetails[catId].categoryName, catId);
                breadCrumbs.push({ name: categoryDetails[catId].categoryName, url: url })
            }
        });
        breadCrumbs.push({ name: dataObject.categoryName, url: props.location.pathname })
        breadCrumbAction.pushBreadCrumbs(breadCrumbs);
    }

    const setFiltersInUrl = () => {
        let filterString = "";
        if (previousValue) {
            if (validate.isNotEmpty(minAndMaxPrice) && (minAndMaxPrice.min !== sortAndFilter.priceRange.min || minAndMaxPrice.max !== sortAndFilter.priceRange.max) &&
                (previousValue.filteredRange.min !== sortAndFilter.priceRange.min || previousValue.filteredRange.max !== sortAndFilter.priceRange.max)) {
                filterString += `p::${sortAndFilter.priceRange.min}:${sortAndFilter.priceRange.max},`;
            } else if (parseInt(startAndEndPrice.min) == sortAndFilter.priceRange.min && parseInt(startAndEndPrice.max) == sortAndFilter.priceRange.max) {
                filterString += "";
            } else if (urlPriceFilter) {
                filterString += `p::${urlPriceFilter},`;
            }
            if (checkIfFilterApplied(sortAndFilter, previousValue)) {
                filterString += `m::${startAndEndPrice.min}:${startAndEndPrice.max},`;
            } else if (urlStartAndEndPrice) {
                filterString += `m::${urlStartAndEndPrice},`;
            }
            if (!isEqual(previousValue.filteredBrands, sortAndFilter.brands)) {
                let brandString = "";
                sortAndFilter.brands.map(each => {
                    each = each.replace(/,/g, "-comma-")
                    brandString += `${each}:`
                });
                if (brandString !== "") {
                    brandString = brandString.substring(0, brandString.length - 1);
                    filterString += brandString !== "" ? `b::${brandString},` : ""
                }
            } else if (urlBrandFilter) {
                filterString += `b::${urlBrandFilter},`
            }
            if (!isEqual(previousValue.filteredSubCategories, sortAndFilter.subLevelCategories)) {
                let categoryString = "";
                sortAndFilter.subLevelCategories.map(each => {
                    each = each.replace(/,/g, "-comma-")
                    categoryString += `${each}:`
                })
                if (categoryString !== "") {
                    categoryString = categoryString.substring(0, categoryString.length - 1);
                    filterString += categoryString !== "" ? `c::${categoryString},` : ""
                }
            } else if (urlCategoryFilter) {
                filterString += `c::${urlCategoryFilter},`
            }
            if (previousValue.filteredOutOfStock != sortAndFilter.excludeOutOfStock) {
                filterString += sortAndFilter.excludeOutOfStock ? `x::Y,` : '';
            } else if (urlExcludeOutOfStock === "Y") {
                filterString += `x::${urlExcludeOutOfStock},`;
            }
            if (validate.isNotEmpty(sortAndFilter.sort) && (parseInt(sortAndFilter.sort) !== parseInt(previousValue.filteredSort))) {
                filterString += `s::${sortAndFilter.sort}`;
            } else if (urlSort) {
                filterString += `s::${urlSort}`;
            }
            if (filterString !== "") {
                filterString = encodeURIComponent(filterString);
                props.history.replace(`?${filterString}`)
            }
        }
    }

    const getLoadMoreProducts = () => {
        setLoadMore(true);
        setStartIndex(productList.length);
    }

    const populateProductSummary = (productsList, loadMoreLoader) => {
        return (
            <div className='d-flex flex-wrap home-page-products-slider w-100' style={{'gap':'0.5rem 0rem'}}>
                {productsList.map((eachProduct) => {
                    return (
                        <div className='h-100 category-cards'>
                            <ProductSummaryCard product={eachProduct} history={props.history} isDropDownRequired={true} topCategoryNameId = {props?.match?.params?.topCategoryName_Id} parentCategoryNameId = {props?.match?.params?.parentCategoryName_Id} currentCategoryNameId = {props?.match?.params?.categoryNameId ?? props?.match?.params?.currentCategoryName_Id} />
                        </div>
                    );
                })}
                {!recordsCompleted ?
                    <div className="mt-n2 px-2 w-100">
                     {!loadMoreLoader && <LoadMoreButton name={`Load ${validate.isNotEmpty(totalRecords) && totalRecords - productsList?.length > count ? count : totalRecords - productsList?.length} More Products from ${headerName}`} isLoading={loadMore} hide={loadMore} handleLoadMore={() => getLoadMoreProducts()} />}
                    </div>
                    :
                    <React.Fragment>
                        <div className="alert alert-warning w-100 text-center mb-0 rounded-pill pt-2" role="alert"><strong>Huh..! We don't have any more products.</strong></div>
                    </React.Fragment>
                }
               
                {loadMoreLoader && <CategoryDetailGhostImage onlyProducts={true} />}
            </div>
        )
    }

    const applySortAndFilter = (props) => {
        setLoadMore(false);
        setFilterRequest(true);
        setOnlyProductsLoader(true);
        setSortAndFilter({ subLevelCategories: [...props.subLevelCategories], brands: [...props.brands], excludeOutOfStock: props.excludeOutOfStock, priceRange: { ...props.priceRange }, sort: props.sort });
    }

    const showSelectedSort = (sortIndex) => {
        if (parseInt(sortAndFilter.sort) !== parseInt(sortIndex)) {
            setFilterRequest(true);
            setOnlyProductsLoader(true);
            setSelectedSort(sortIndex);
            sortAndFilter["sort"] = sortIndex;
        }
    }

    const OnRemoveFilter = (filterId, type) => {
        setOnlyProductsLoader(true);
        setFilterRequest(true);
        if (type == "subLevelCategories") {
            sortAndFilter[type] = sortAndFilter.subLevelCategories.filter((each) => each !== filterId);
        } else if (type == "brands") {
            sortAndFilter[type] = sortAndFilter.brands.filter((each) => each !== filterId);
        } else if (type == "excludeOutOfStock") {
            sortAndFilter[type] = false;
        } else if (type == "priceRange") {
            sortAndFilter[type] = minAndMaxPrice;
        }
    }

    const closeAlertMessage = () => {
        setAlertData({ message: "", type: "" });
    }

    return (
        <React.Fragment>
            <MetaTitle metaKey={`${requestType == "CATEGORY" ? `${!currentCategoryId.includes("CUSTOM_") ? `MART_${currentCategoryId}` : ""}` : requestType == "BRAND" ? `BRAND_${brandName}` : ""}`} defaultValue={`Online Pharmacy Store in India. Best value on medicines-MedPlus`}/>
            {alertData && alertData.message && <Alert alertInfo={alertData} onDurationEnd={closeAlertMessage} duration={5000} />}
            {isLoading && <CategoryDetailGhostImage viewAll={true} />}
            {!isLoading && <section className="px-2 py-3">
                {validate.isNotEmpty(headerName) && <h2 className="px-2">{headerName}</h2>}
                {!showFilters && <div className="align-items-center d-flex justify-content-between mb-3 px-2">
                    <div>
                        <button className="btn border-sort-btn filter mr-4 ml-0" onClick={() => toggleFilterModal()}>
                            <svg className="mr-2 align-middle" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="mr-2 mt-n1">
                                <g id="Group_22672" data-name="Group 22672" transform="translate(-1727 -423)">
                                    <rect id="Rectangle_6527" data-name="Rectangle 6527" width="18" height="18" rx="3" transform="translate(1727 423)" fill="#fff"></rect>
                                    <path id="Icon_awesome-filter" data-name="Icon awesome-filter" d="M15.249,0H.751a.751.751,0,0,0-.53,1.28L6,7.061V13.5a.75.75,0,0,0,.32.614l2.5,1.749A.75.75,0,0,0,10,15.249V7.061l5.78-5.78A.751.751,0,0,0,15.249,0Z" transform="translate(1728 424)"></path>
                                </g>
                            </svg>
                            All Filters
                            {!checkIfNoFilter(sortAndFilter, minAndMaxPrice) && <span className="online"></span>}
                        </button>
                        {validate.isNotEmpty(sortElements) && Object.keys(sortElements).length > 0 &&
                            <React.Fragment>
                                <strong className="font-14">Sort By:</strong>
                                {Object.entries(sortElements).map(([key, value]) => {
                                    return (<button type='button' role="button" className={selectedSort == key ? "btn border-sort-btn active" : "btn border-sort-btn"} onClick={() => { showSelectedSort(key) }}>{value}</button>);
                                })
                                }
                            </React.Fragment>
                        }
                    </div>
                    <p className="mb-0 font-14 text-secondary"> {productList?.length} / {Validate().isNotEmpty(totalRecords) ? totalRecords : 0} </p>
                </div>}
                {!checkIfNoFilter(sortAndFilter, minAndMaxPrice) && !onlyProductsLoader && <div className={"selected-filter-container px-2"}>
                    {validate.isNotEmpty(sortAndFilter) &&
                        Object.keys(sortAndFilter).map((each) => {
                            if (validate.isNotEmpty(sortAndFilter[each])) {
                                let selectedIds = [];
                                if (each == "subLevelCategories" && sortAndFilter.subLevelCategories.length >= 1) {
                                    sortAndFilter[each].map((eachElement) => {
                                        selectedIds.push(eachElement);
                                    })
                                    return (<FilterNames selectedIds={selectedIds} subLevelCategories={subLevelCategories} type={each} removeSelectedFilter={OnRemoveFilter} />);
                                } else if (each == "brands" && sortAndFilter.brands.length >= 1) {
                                    sortAndFilter[each].map((eachElement) => {
                                        selectedIds.push(eachElement);
                                    })
                                    return (<FilterNames selectedIds={selectedIds} type={each} removeSelectedFilter={OnRemoveFilter} />);
                                } else if (each == "excludeOutOfStock" && sortAndFilter.excludeOutOfStock) {
                                    selectedIds.push("In Stock");
                                    return (<FilterNames selectedIds={selectedIds} type={each} removeSelectedFilter={OnRemoveFilter} />);
                                } else if (each == "priceRange" && validate.isNotEmpty(sortAndFilter.priceRange) && validate.isNotEmpty(sortAndFilter.priceRange.min) && validate.isNotEmpty(sortAndFilter.priceRange.max) && (parseInt(sortAndFilter.priceRange.min) !== parseInt(startAndEndPrice.min) || parseInt(sortAndFilter.priceRange.max) !== parseInt(startAndEndPrice.max))) {
                                    selectedIds.push(sortAndFilter.priceRange);
                                    return (<FilterNames selectedIds={selectedIds} type={each} removeSelectedFilter={OnRemoveFilter} />);
                                }
                            }
                        })
                    }
                </div>}
                {onlyProductsLoader && <CategoryDetailGhostImage onlyProducts={true} />}
                {filterModalOpen && <CategoryDetailFilter startAndEndPrice={startAndEndPrice} toggleFilterModal={toggleFilterModal} filterModalOpen={filterModalOpen} selectedSubCategoryId={selectedSubCategoryId} subLevelCategories={subLevelCategories} brandsList={brandsList} minAndMaxPrice={minAndMaxPrice} sortElements={sortElements} sortAndFilter={{ ...sortAndFilter }} applySortAndFilter={applySortAndFilter} requestType={requestType} setSelectedSort={setSelectedSort}/>}
                {validate.isNotEmpty(productIdList) && productIdList.length > 0 &&
                    <React.Fragment>
                        {populateProductSummary(productList, loadMoreLoader)}
                    </React.Fragment>
                }
                {validate.isEmpty(productIdList) && productIdList.length <= 0 && recordsCompleted && <NoProductsFound showrequest={false} message={"Huh..! We don't have any more products as per search criteria"} />}
            </section>
            }
        </React.Fragment>

    );
}

export default CategoryDetail;