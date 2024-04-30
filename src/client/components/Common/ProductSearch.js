import React, { useState ,useRef, useEffect} from 'react';
import { AsyncTypeahead,Menu} from 'react-bootstrap-typeahead';
import base64 from 'base-64';
import Validate from '../../helpers/Validate';
import CommonHeaderService from '../../services/CommonHeaderService';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Alert, { ALERT_TYPE_ERROR } from './Alert';
import ProductSearchResult from './ProductSearchResult';
import ProductThumbNail from './ProductThumbNail';
import {getCompositionNameForUrl, getProductUrl, prepareUrlName} from '../../helpers/CommonUtil';
import KYMSearchResult from './KYMSearchResult';

const ProductSearch = (props) => {
    const isKym = props.isKym;
    const [productSearchType, setProductSearchType] = useState(isKym ? "M" : "A");
    const [searchedText, setSearchedText] = useState('');
    const productSearchInputRef = useRef();
    const [isLoading, setLoading] = useState(true);
    const validate = Validate();
    const productSearchTypes = isKym ? { "M": "Medicine", "C": "Composition" } : { "A": "All Product", "G": "General Store", "P": "Pharmacy" };
    const commonHeaderService = CommonHeaderService();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [isAllFuzzyResult, setAllFuzzyResultProducts] = useState(false);
    const shoppingCartProducts = validate.isNotEmpty(props.shoppingCartItem) ? props.shoppingCartItem.map(eachItem => eachItem.productId) : [];
    const [suggestions, setSuggestions] = useState([]);
    const [productDiscount, setProductDiscount] = useState(undefined);
    const [recentSearchDisplay, setRecentSearchDisplay] = useState(false);
    const [onlyOneRecord, setOnlyOneRecord] = useState(false);
    const [showCancelButton,setShowCancelButton] = useState(false);
    const [imagesUrls, setImagesUrls] = useState({});
    const [showSearchLoader, setShowSearchLoader] = useState(false);

    useEffect(() => {
        setShowCancelButton(searchedText.length>0 ? true : false);
    }, [searchedText]);

    useEffect(() => {
        setShowSearchLoader(searchedText.length > 2 && isLoading);
    },[searchedText, isLoading])


    if (typeof window !== 'undefined') {
        var recentSearchData = window.localStorage.getItem("RECENTLY_VIEWED_PRODUCT");
        recentSearchData = JSON.parse(recentSearchData);
    }
    const changeProductSearchType = (key) => {
        setSuggestions([]);
        clearSearchResultAndText();
        setProductSearchType(key);
    }
    const getSuggestion = async (searchText) => {
        if(validate.isNotEmpty(searchText) && searchText.trim().length > 2) {
            setRecentSearchDisplay(false);
            setLoading(true);
            setSearchedText(searchText);
            let options = [];
            let enteredSearchText = searchText;
            searchText = base64.encode(productSearchType + "::" + searchText);
            let response = productSearchType == "C" ? await getCompositionsSearch(base64.encode(enteredSearchText)) : await getProductSearch(searchText);
            let productIds  = [];
            if("SUCCESS" === response.statusCode) {
                let productResponse = response?.dataObject?.productResponse;
                let compositions = response?.dataObject?.compositions;
                let imagesUrlsResponse = response?.dataObject?.productImageUrls;
                if(validate.isNotEmpty(productResponse)) {
                    let topProductSuggestions = [];
                    for(const eachProductSuggestions of productResponse) {
                        productIds.push(eachProductSuggestions.productId);
                        if(topProductSuggestions.length == 0) {
                            if(eachProductSuggestions.productId == "FUZZY_RESULT") {
                                setAllFuzzyResultProducts(true);
                            } else {
                                setAllFuzzyResultProducts(false);
                            }
                        }
                        eachProductSuggestions["TYPE"] = "PRODUCT_SUGGESTION";
                        options.push(eachProductSuggestions);
                        topProductSuggestions.push(eachProductSuggestions);
                        if(topProductSuggestions.length >= 15) {
                            break;
                        }
                    }
                    setSuggestions(options);
                    if(options.length == 1) {
                        setOnlyOneRecord(true);
                    }
                }
                if(validate.isNotEmpty(compositions)){
                    compositions.map((eachComposition)=>{
                        eachComposition["TYPE"] = "COMPOSITION_SUGGESTION";
                        options.push(eachComposition);
                    });
                    setSuggestions(options);
                }
                if(validate.isNotEmpty(imagesUrlsResponse)) {
                    setImagesUrls(imagesUrlsResponse);
                }
            } else {
                console.log("Error: " + response?.message);
                setSuggestions([]);
            }
            setLoading(false);
            getProductSpecialDisocount(productIds);
        }
    }

    const getProductSearch = (searchedText) => {
        const searchCriteria = {
            searchQuery : searchedText,
            pageNumber : 1,
            recordsCount : 15,
            allFieldsRequired : true,
        };
        return commonHeaderService.getProductSearch({ searchCriteria: searchCriteria, isKym: isKym });
    }

    const getCompositionsSearch = (searchedText) => {
        return commonHeaderService.getCompositionsSearch({ searchQuery: searchedText, isKym: isKym });
    }

    const getProductSpecialDisocount = (productIds) => {
        if(validate.isEmpty(productIds) || isKym) {
            return;
        }
        commonHeaderService.getDiscountForProductsSearch({productIds: JSON.stringify(productIds)}).then((data) => {
            if(validate.isNotEmpty(data) && data.statusCode === "SUCCESS" && validate.isNotEmpty(data?.dataObject?.productDiscount)){
                setProductDiscount(data.dataObject.productDiscount);
            } else {
                setProductDiscount({});
            }
        });
    }

    const goToProductDetail = (selectedProduct) => {
        setProductToLocalStorage(selectedProduct);
        clearSearchResultAndText();
        productSearchInputRef.current.blur();
        props.history.push("/" + getProductUrl(selectedProduct.productName, selectedProduct.productId));
    }

    const handleKYMItemClick = (selectedProduct) => {
        clearSearchResultAndText();
        productSearchInputRef.current.blur();
        if (productSearchType == "C") {
            props.history.push(`${getCompositionNameForUrl(selectedProduct.compositionId_s, selectedProduct.compositionName_s, isKym)}`);
        } else {
            props.history.push("/kym/" + getProductUrl(selectedProduct.productName, selectedProduct.productId));
        }
    }
    

    const setProductToLocalStorage = (product) => {
        if(typeof window !== 'undefined' && window.localStorage){
            var recentSearchData = window.localStorage.getItem("RECENTLY_VIEWED_PRODUCT");
            recentSearchData = JSON.parse(recentSearchData);
            if(validate.isEmpty(recentSearchData)) {
                recentSearchData = [];
            }
            var index = -1;
            if(validate.isNotEmpty(recentSearchData)) {
                index = recentSearchData.findIndex((eachProduct) => {
                    return eachProduct.productId === product.productId;
                });
            }
            if(index > -1) {
                recentSearchData.splice(index, 1);
            }
            let productInfo = {productId:product.productId, productName:product.productName, manufacturer:product.manufacturer, imageUrl:imagesUrls[product.productId], imageUploadCount:product.imageUploadCount, auditFormSubName:product.auditFormSubName, isGeneral:product.isGeneral}
            recentSearchData.splice(0, 0, productInfo);
            if(recentSearchData.length > 10) {
                recentSearchData.splice(recentSearchData.length-1, 1);
            }
            window.localStorage.setItem("RECENTLY_VIEWED_PRODUCT", JSON.stringify(recentSearchData));
        }
    }

    const selectComposition = (compositionName, compositionId) => {
        clearSearchResultAndText();
        productSearchInputRef.current.blur();
        let compositions = [];
        let campName = compositionName;
        if(validate.isNotEmpty(compositionName)){
            compositions = compositionName.split("+");
        }
        if(compositions.length > 1){
            campName = compositions[0]+"+"+compositions[1];
        }
        var pattern = new RegExp("/", "g");
        campName = campName.replace(pattern,'&frasl;').replace(/%/gi,'percent').replace(/ /g,'-');
        props.history.push(`/compositionProducts/${campName}/${compositionId}`);
    }

    const viewAll = () => {
        const searchTerm  = productSearchInputRef.current.state.text;
        clearSearchResultAndText();
       productSearchInputRef.current.blur();
        props.history.push(`/searchAll/${base64.encode(productSearchType+"::"+searchTerm)}`);
    }

    const clearSearchResultAndText = () => {
        setSearchedText('');
        setSuggestions([]);
        productSearchInputRef.current.clear();
    }

    const prepareResults = (results) => {
        let productList = [];
        let compositionList = [];
        results.map(eachResult =>{
            if(eachResult.TYPE == 'PRODUCT_SUGGESTION') {
                productList.push(eachResult);
            } else if(eachResult.TYPE == 'COMPOSITION_SUGGESTION') {
                compositionList.push(eachResult);
            }
        });
        let typeMap = {};
        if(validate.isNotEmpty(productList)) {
            typeMap["PRODUCT_SUGGESTION"] = productList;
        }
        if(validate.isNotEmpty(compositionList)) {
            typeMap["COMPOSITION_SUGGESTION"] = compositionList;
        }
        return typeMap;
        
    }

    const showAlertInfo = (message) => {
        setAlertInfo({ message: message, type: ALERT_TYPE_ERROR });
    }

    return (
        <React.Fragment>
            {props.isPageBody && <>
                <div className='selectType mt-4 mb-3'>
                    {Object.entries(productSearchTypes).map(([key, value]) => {
                        return (<button type="button" aria-role={value} title={value} className={`btn rounded-pill border font-12 mr-3 custom-badge-chips ${productSearchType == key ? "active" : ""}`} onClick={() => changeProductSearchType(key)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className='mr-2'>
                                <g id="done-icn-16" transform="translate(-262 -283)">
                                    <rect id="Rectangle_12488" data-name="Rectangle 12488" width="16" height="16" rx="8" transform="translate(262 283)" fill="#f8f9fa" />
                                    <path id="np_check_5468232_000000" d="M21,15a6,6,0,1,0,6,6A6,6,0,0,0,21,15Zm2.588,4.952-3.323,3.323a.545.545,0,0,1-.177.118.535.535,0,0,1-.581-.118l-1.671-1.67a.536.536,0,0,1,.757-.757l1.292,1.292,2.945-2.945a.536.536,0,1,1,.758.757Z" transform="translate(249 270)" fill={productSearchType == key ? "#11b094" : "#6c757d"} />
                                </g>
                            </svg>
                            {value}
                        </button>
                        )
                    })}
                </div>
            </>}
            <form className={`${isKym ? 'w-100' : ''} form-inline search`}>
                <div className={`${props.isPageBody ? "" : "input-group"} col p-0 product-search-container`} >
                    {!props.isPageBody && <div className="input-group-prepend  d-none  d-lg-block">
                        <div className="dropdown">
                            <UncontrolledDropdown>
                                <DropdownToggle className="btn btn-light" caret>
                                    {productSearchTypes[productSearchType]}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {Object.entries(productSearchTypes).map(([key, value]) => {
                                        return (<DropdownItem title={value} className={productSearchType == key ? "custom-active" : ""} onClick={() => changeProductSearchType(key)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" className="align-text-top ml-n2 mr-2">
                                                <g id="tickmark_black_icon_18px" transform="translate(-1458 -558)">
                                                    <path id="check" d="M18,6,8.375,15.625,4,11.25" transform="translate(1456 556)" fill="rgba(0,0,0,0)" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                                                </g>
                                            </svg>
                                            {value}
                                        </DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>}
                    {!showCancelButton && !showSearchLoader && <button className="p-0 border-0 icons search-icn pointer" disabled role="button"></button>}
                    {showCancelButton && !showSearchLoader && <button className="p-0 border-0 icons clear-icn pointer" onClick={() => clearSearchResultAndText()} ></button>}
                   

                    <AsyncTypeahead
                        delay ={500}
                        id="ProductSearch"
                        isLoading={showSearchLoader}
                        labelKey = {(suggestion) => validate.isNotEmpty(suggestion.productName) ? `${suggestion.productName}` : `${suggestion.compositionName_s}`}
                        filterBy={() => true}
                        minLength={3}
                        maxResults={100}
                        ref={productSearchInputRef}
                        onKeyDown={event => {
                            if (event.key === 'Enter' && validate.isNotEmpty(event.target.value) && validate.isNotEmpty(event.target.value.trim()) && event.target.value.length >= 3) {
                                setSearchedText(event.target.value);
                                viewAll();
                            }
                        }}
                        onFocus={(event)=>{
                            if(validate.isEmpty(event.target.value)){
                                setRecentSearchDisplay(true);
                            }else{
                                setRecentSearchDisplay(false);
                            }
                        }}
                        onBlur={()=>{setRecentSearchDisplay(false)}}
                        useCache={false}
                        clearButton
                        positionFixed={true}
                        onChange={(text)=>{
                            setShowCancelButton(text?.length>0 ? true : false);
                        }}
                        onSearch={getSuggestion}
                        value={searchedText}
                        placeholder={productSearchType === "M" ? "Search for… Pharmacy products" : productSearchType === "C" ? "Search for composition… Eg: Paracetamol" : productSearchType === "G" ? "Search for... General products" : productSearchType === "P" ? "Search for... Pharma products" : "Search for... General or Pharma products"}
                        inputProps={{ className: props.isPageBody ? 'w-100 bg-gray-300 py-4' : 'w-100' }}
                        options={suggestions}
                        renderMenu = {(suggestions) => {
                            const suggestionMap = validate.isNotEmpty(suggestions) ? prepareResults(suggestions) : [];
                            return(  
                                <React.Fragment>
                                    <Menu id="ProductSearch" className="search-result">
                                        {isLoading && <div className="dropdown-item disabled">Searching...</div>}
                                        {!isLoading && validate.isNotEmpty(suggestions) && Object.keys(suggestionMap).map(eachSuggType => {
                                            let heading = "Suggested Products";
                                            if(isAllFuzzyResult && eachSuggType == "PRODUCT_SUGGESTION") {
                                                heading = "Did you mean?";
                                            } else if(eachSuggType == "COMPOSITION_SUGGESTION") {
                                                heading = "Suggested Compositions";
                                            }
                                            return (
                                                <React.Fragment key={eachSuggType} >
                                                    <Menu.Header>{heading}</Menu.Header>
                                                    <div className={(isKym || eachSuggType == "PRODUCT_SUGGESTION") ? "product-list" : "composition-list"} style={ onlyOneRecord && eachSuggType == "PRODUCT_SUGGESTION" ? { minHeight:'270px'} : { minHeight:'270px'}}>
                                                        {suggestionMap[eachSuggType].map((eachProduct, index) => {
                                                            if (isKym) {
                                                                return (
                                                                    <KYMSearchResult eachSuggType={eachSuggType} isPageBody={props.isPageBody} isAllFuzzyResult={isAllFuzzyResult} showAlertInfo={showAlertInfo} handleKYMItemClick={handleKYMItemClick} selectComposition={selectComposition}
                                                                        shoppingCartProducts={shoppingCartProducts} eachProduct={eachProduct} shoppingCartItem={props.shoppingCartItem} productDiscount={productDiscount} setAlertInfo={setAlertInfo} imagesUrls={imagesUrls} productSearchType={productSearchType} />
                                                                    )
                                                            } else {
                                                                return (
                                                                    <ProductSearchResult eachSuggType={eachSuggType} isAllFuzzyResult={isAllFuzzyResult} showAlertInfo={showAlertInfo} goToProductDetail={goToProductDetail} selectComposition={selectComposition}
                                                                        shoppingCartProducts={shoppingCartProducts} eachProduct={eachProduct} shoppingCartItem={props.shoppingCartItem} productDiscount={productDiscount} setAlertInfo={setAlertInfo} imagesUrls={imagesUrls} />
                                                                )
                                                            }
                                                        })}
                                                    </div>
                                                </React.Fragment>
                                            )
                                        })}
                                        {!isLoading && !isKym && validate.isNotEmpty(suggestionMap) && <div className="dropdown-footer" role="heading"><a href="javascript:void();" className="btn btn-brand btn-block search-btn" onClick={() => viewAll()}>View All Products</a></div>}
                                        {!isLoading && validate.isEmpty(suggestionMap) && <div className="dropdown-item disabled">{isKym ? productSearchType == "M" ? "No Medicine Found" : "No Composition found" : "No Products Found"}</div>}
                                    </Menu>
                                </React.Fragment>
                            )}}
                        >

                    </AsyncTypeahead>
                </div>
                {!isKym && recentSearchDisplay && validate.isEmpty(searchedText) && validate.isNotEmpty(recentSearchData) && 
                    <div className="dropdown-menu recent-search-results d-block">
                        <div className="searches-div">
                            <div class="dropdown-header" role="heading">Recently Searched</div>
                            <div className="recent-search-list">
                                {recentSearchData && recentSearchData.map(eachProduct => {
                                    return (
                                        <a className="dropdown-item" href="javascript:void(0)" title={eachProduct.productName} onMouseDown={() => {setSearchedText(eachProduct.productName);goToProductDetail(eachProduct)}}>
                                            <div className="product-img-container">
                                                <ProductThumbNail imageUrl={eachProduct.imageUrl} productId={eachProduct.productId} imagesCount={eachProduct.imageUploadCount} 
                                                    productName={eachProduct.productName}
                                                    isGeneral={(eachProduct.isGeneral== "Y" || eachProduct.auditFormSubName === "GEN") ? true : false} auditForm={eachProduct.auditFormSubName}></ProductThumbNail>
                                            </div>
                                            <div className="product-details">
                                                <h6 className="product-title text-truncate">{eachProduct.productName}</h6>
                                                <p className="text-truncate small">{eachProduct.manufacturer}</p>
                                            </div>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                        {/* <div className="trending-div">
                            <div class="dropdown-header" role="heading">Trending Products</div>
                            <div className="recent-search-list">
                                <a className="dropdown-item" href="javascript:void(0)" title="CIPRALEX 10MG TAB">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                                        <g transform="translate(-1446 -1015)">
                                            <g fill="#fff" transform="translate(1446 1015)">
                                                <path stroke="none" d="M 12 23.5 C 8.928239822387695 23.5 6.040329933166504 22.30378913879395 3.868269920349121 20.13172912597656 C 1.696210026741028 17.95966911315918 0.5 15.0717601776123 0.5 12 C 0.5 8.928239822387695 1.696210026741028 6.040329933166504 3.868269920349121 3.868269920349121 C 6.040329933166504 1.696210026741028 8.928239822387695 0.5 12 0.5 C 15.0717601776123 0.5 17.95966911315918 1.696210026741028 20.13172912597656 3.868269920349121 C 22.30378913879395 6.040329933166504 23.5 8.928239822387695 23.5 12 C 23.5 15.0717601776123 22.30378913879395 17.95966911315918 20.13172912597656 20.13172912597656 C 17.95966911315918 22.30378913879395 15.0717601776123 23.5 12 23.5 Z"></path>
                                                <path stroke="none" fill="#080808" d="M 12 1 C 9.061790466308594 1 6.299449920654297 2.144199371337891 4.221820831298828 4.221820831298828 C 2.144199371337891 6.299449920654297 1 9.061790466308594 1 12 C 1 14.93820953369141 2.144199371337891 17.7005500793457 4.221820831298828 19.77817916870117 C 6.299449920654297 21.85580062866211 9.061790466308594 23 12 23 C 14.93820953369141 23 17.7005500793457 21.85580062866211 19.77817916870117 19.77817916870117 C 21.85580062866211 17.7005500793457 23 14.93820953369141 23 12 C 23 9.061790466308594 21.85580062866211 6.299449920654297 19.77817916870117 4.221820831298828 C 17.7005500793457 2.144199371337891 14.93820953369141 1 12 1 M 12 0 C 18.62742042541504 0 24 5.372579574584961 24 12 C 24 18.62742042541504 18.62742042541504 24 12 24 C 5.372579574584961 24 0 18.62742042541504 0 12 C 0 5.372579574584961 5.372579574584961 0 12 0 Z"></path>
                                            </g>
                                            <g transform="translate(1451 1020)">
                                                <rect fill="none" width="14" height="14"></rect>
                                                <path fill="#080808" d="M56.449,319.236a.5.5,0,0,1,.324.129l5.049,4.725a.509.509,0,0,1,0,.712l-5.049,4.66a.513.513,0,0,1-.712-.065.508.508,0,0,1,0-.712l4.013-3.754H49.459a.518.518,0,1,1,0-1.036H60.074L56,320.142a.46.46,0,0,1-.194-.388.922.922,0,0,1,.129-.389A2.924,2.924,0,0,1,56.449,319.236Z" transform="translate(-48.454 -317.663)"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <div className="product-details">
                                        <h6 className="product-title">CIPRALEX 10MG TAB</h6>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:void(0)" title="CIPRALEX 10MG TAB">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                                        <g transform="translate(-1446 -1015)">
                                            <g fill="#fff" transform="translate(1446 1015)">
                                                <path stroke="none" d="M 12 23.5 C 8.928239822387695 23.5 6.040329933166504 22.30378913879395 3.868269920349121 20.13172912597656 C 1.696210026741028 17.95966911315918 0.5 15.0717601776123 0.5 12 C 0.5 8.928239822387695 1.696210026741028 6.040329933166504 3.868269920349121 3.868269920349121 C 6.040329933166504 1.696210026741028 8.928239822387695 0.5 12 0.5 C 15.0717601776123 0.5 17.95966911315918 1.696210026741028 20.13172912597656 3.868269920349121 C 22.30378913879395 6.040329933166504 23.5 8.928239822387695 23.5 12 C 23.5 15.0717601776123 22.30378913879395 17.95966911315918 20.13172912597656 20.13172912597656 C 17.95966911315918 22.30378913879395 15.0717601776123 23.5 12 23.5 Z"></path>
                                                <path stroke="none" fill="#080808" d="M 12 1 C 9.061790466308594 1 6.299449920654297 2.144199371337891 4.221820831298828 4.221820831298828 C 2.144199371337891 6.299449920654297 1 9.061790466308594 1 12 C 1 14.93820953369141 2.144199371337891 17.7005500793457 4.221820831298828 19.77817916870117 C 6.299449920654297 21.85580062866211 9.061790466308594 23 12 23 C 14.93820953369141 23 17.7005500793457 21.85580062866211 19.77817916870117 19.77817916870117 C 21.85580062866211 17.7005500793457 23 14.93820953369141 23 12 C 23 9.061790466308594 21.85580062866211 6.299449920654297 19.77817916870117 4.221820831298828 C 17.7005500793457 2.144199371337891 14.93820953369141 1 12 1 M 12 0 C 18.62742042541504 0 24 5.372579574584961 24 12 C 24 18.62742042541504 18.62742042541504 24 12 24 C 5.372579574584961 24 0 18.62742042541504 0 12 C 0 5.372579574584961 5.372579574584961 0 12 0 Z"></path>
                                            </g>
                                            <g transform="translate(1451 1020)">
                                                <rect fill="none" width="14" height="14"></rect>
                                                <path fill="#080808" d="M56.449,319.236a.5.5,0,0,1,.324.129l5.049,4.725a.509.509,0,0,1,0,.712l-5.049,4.66a.513.513,0,0,1-.712-.065.508.508,0,0,1,0-.712l4.013-3.754H49.459a.518.518,0,1,1,0-1.036H60.074L56,320.142a.46.46,0,0,1-.194-.388.922.922,0,0,1,.129-.389A2.924,2.924,0,0,1,56.449,319.236Z" transform="translate(-48.454 -317.663)"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <div className="product-details">
                                        <h6 className="product-title">CIPRALEX 10MG TAB</h6>
                                    </div>
                                </a><a className="dropdown-item" href="javascript:void(0)" title="CIPRALEX 10MG TAB">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                                        <g transform="translate(-1446 -1015)">
                                            <g fill="#fff" transform="translate(1446 1015)">
                                                <path stroke="none" d="M 12 23.5 C 8.928239822387695 23.5 6.040329933166504 22.30378913879395 3.868269920349121 20.13172912597656 C 1.696210026741028 17.95966911315918 0.5 15.0717601776123 0.5 12 C 0.5 8.928239822387695 1.696210026741028 6.040329933166504 3.868269920349121 3.868269920349121 C 6.040329933166504 1.696210026741028 8.928239822387695 0.5 12 0.5 C 15.0717601776123 0.5 17.95966911315918 1.696210026741028 20.13172912597656 3.868269920349121 C 22.30378913879395 6.040329933166504 23.5 8.928239822387695 23.5 12 C 23.5 15.0717601776123 22.30378913879395 17.95966911315918 20.13172912597656 20.13172912597656 C 17.95966911315918 22.30378913879395 15.0717601776123 23.5 12 23.5 Z"></path>
                                                <path stroke="none" fill="#080808" d="M 12 1 C 9.061790466308594 1 6.299449920654297 2.144199371337891 4.221820831298828 4.221820831298828 C 2.144199371337891 6.299449920654297 1 9.061790466308594 1 12 C 1 14.93820953369141 2.144199371337891 17.7005500793457 4.221820831298828 19.77817916870117 C 6.299449920654297 21.85580062866211 9.061790466308594 23 12 23 C 14.93820953369141 23 17.7005500793457 21.85580062866211 19.77817916870117 19.77817916870117 C 21.85580062866211 17.7005500793457 23 14.93820953369141 23 12 C 23 9.061790466308594 21.85580062866211 6.299449920654297 19.77817916870117 4.221820831298828 C 17.7005500793457 2.144199371337891 14.93820953369141 1 12 1 M 12 0 C 18.62742042541504 0 24 5.372579574584961 24 12 C 24 18.62742042541504 18.62742042541504 24 12 24 C 5.372579574584961 24 0 18.62742042541504 0 12 C 0 5.372579574584961 5.372579574584961 0 12 0 Z"></path>
                                            </g>
                                            <g transform="translate(1451 1020)">
                                                <rect fill="none" width="14" height="14"></rect>
                                                <path fill="#080808" d="M56.449,319.236a.5.5,0,0,1,.324.129l5.049,4.725a.509.509,0,0,1,0,.712l-5.049,4.66a.513.513,0,0,1-.712-.065.508.508,0,0,1,0-.712l4.013-3.754H49.459a.518.518,0,1,1,0-1.036H60.074L56,320.142a.46.46,0,0,1-.194-.388.922.922,0,0,1,.129-.389A2.924,2.924,0,0,1,56.449,319.236Z" transform="translate(-48.454 -317.663)"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <div className="product-details">
                                        <h6 className="product-title">CIPRALEX 10MG TAB</h6>
                                    </div>
                                </a><a className="dropdown-item" href="javascript:void(0)" title="CIPRALEX 10MG TAB">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                                        <g transform="translate(-1446 -1015)">
                                            <g fill="#fff" transform="translate(1446 1015)">
                                                <path stroke="none" d="M 12 23.5 C 8.928239822387695 23.5 6.040329933166504 22.30378913879395 3.868269920349121 20.13172912597656 C 1.696210026741028 17.95966911315918 0.5 15.0717601776123 0.5 12 C 0.5 8.928239822387695 1.696210026741028 6.040329933166504 3.868269920349121 3.868269920349121 C 6.040329933166504 1.696210026741028 8.928239822387695 0.5 12 0.5 C 15.0717601776123 0.5 17.95966911315918 1.696210026741028 20.13172912597656 3.868269920349121 C 22.30378913879395 6.040329933166504 23.5 8.928239822387695 23.5 12 C 23.5 15.0717601776123 22.30378913879395 17.95966911315918 20.13172912597656 20.13172912597656 C 17.95966911315918 22.30378913879395 15.0717601776123 23.5 12 23.5 Z"></path>
                                                <path stroke="none" fill="#080808" d="M 12 1 C 9.061790466308594 1 6.299449920654297 2.144199371337891 4.221820831298828 4.221820831298828 C 2.144199371337891 6.299449920654297 1 9.061790466308594 1 12 C 1 14.93820953369141 2.144199371337891 17.7005500793457 4.221820831298828 19.77817916870117 C 6.299449920654297 21.85580062866211 9.061790466308594 23 12 23 C 14.93820953369141 23 17.7005500793457 21.85580062866211 19.77817916870117 19.77817916870117 C 21.85580062866211 17.7005500793457 23 14.93820953369141 23 12 C 23 9.061790466308594 21.85580062866211 6.299449920654297 19.77817916870117 4.221820831298828 C 17.7005500793457 2.144199371337891 14.93820953369141 1 12 1 M 12 0 C 18.62742042541504 0 24 5.372579574584961 24 12 C 24 18.62742042541504 18.62742042541504 24 12 24 C 5.372579574584961 24 0 18.62742042541504 0 12 C 0 5.372579574584961 5.372579574584961 0 12 0 Z"></path>
                                            </g>
                                            <g transform="translate(1451 1020)">
                                                <rect fill="none" width="14" height="14"></rect>
                                                <path fill="#080808" d="M56.449,319.236a.5.5,0,0,1,.324.129l5.049,4.725a.509.509,0,0,1,0,.712l-5.049,4.66a.513.513,0,0,1-.712-.065.508.508,0,0,1,0-.712l4.013-3.754H49.459a.518.518,0,1,1,0-1.036H60.074L56,320.142a.46.46,0,0,1-.194-.388.922.922,0,0,1,.129-.389A2.924,2.924,0,0,1,56.449,319.236Z" transform="translate(-48.454 -317.663)"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <div className="product-details">
                                        <h6 className="product-title">CIPRALEX 10MG TAB</h6>
                                    </div>
                                </a>
                            </div>
                        </div> */}
                    </div>
                }
            </form>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
        </React.Fragment>
    )

}
 export default ProductSearch;
