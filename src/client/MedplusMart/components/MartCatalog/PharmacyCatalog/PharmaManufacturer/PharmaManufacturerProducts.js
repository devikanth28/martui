import React, { useEffect, useRef, useState } from "react";
import BreadCrumbAction from "../../../../../../redux/action/BreadCrumbAction";
import { fixUrl, getCompositionNameForUrl } from "../../../../../helpers/CommonUtil";
import Validate from "../../../../../helpers/Validate";
import MartCatalogService from "../../../../services/MartCatalogService";
import LoadMoreButton from "../../../Common/LoadMoreButton";
import NoProductsFound from "../../../Common/NoProductsFound";
import ProductSummaryCard from "../../../Common/ProductSummaryCard";
import CategoryDetailGhostImage from "../../ProductCategory/CategoryDetail/CategoryDetailGhostImage";
import {popOverPlacement} from '../PharmaCategoryDetail/PharmacyCategoryDetail'
import { loadMoreProductsCount } from "../../../../../components/Common/Constants/MartConstants";

const PharmaManufacturerProducts = (props) => {

	const validate = Validate();
    const martCatalogService = MartCatalogService();
    const breadCrumbAction = BreadCrumbAction();

    const manufacturer = props.match.params.manufacturer;
    const compositionId = props.match.params.compositionId;
    const [compositionName,setCompostionName] = useState(validate.isNotEmpty(props.match.params.compositionName) ? props.match.params.compositionName.replaceAll("-", " ") : null);
    const currentProductsShown = useRef(0);

	const [productInfoList, setProductInfoList] = useState([]);
	const [productIdList, setProductIdList] = useState([]);
    const [totalProductFound, setTotalProductFound] = useState(0);
	const [isProductInfoListLoading, setProductInfoListLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const pageNo = useRef(1);

    useEffect(() => {
        resetToInitialState();
        if (props.routePath == 'compositionProducts') {
            getCompositionProductDetails();
        } else {
            getPharmacyProductsOfManufacturer();
            breadCrumbAction.pushBreadCrumbs({name: manufacturer, url: props.location.pathname})
        }
    }, [manufacturer, compositionId]);

    const resetToInitialState = () => {
        pageNo.current = 1;
        currentProductsShown.current = 0;
        setProductInfoList([]);
    }

    const getPharmacyProductsOfManufacturer = () => {
        setProductInfoListLoading(true);
        if(validate.isEmpty(manufacturer)){
            return;
        }
        martCatalogService.getPharmacyProductsOfManufacturer(manufacturer).then((response) => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
                if(validate.isNotEmpty(response.dataObject.productInfoList)) {
                    setProductInfoList(response.dataObject.productInfoList);
                    currentProductsShown.current = response.dataObject.productInfoList.length;
                }
                if(validate.isNotEmpty(response.dataObject.productIdString)) {
                    setProductIdList(JSON.parse(response.dataObject.productIdString));
                }
                if(validate.isNumeric(response.dataObject.totalProductFound)) {
                    setTotalProductFound(response.dataObject.totalProductFound);
                }
            }
            setProductInfoListLoading(false);
        }).catch((error) => {
            console.log(error);
            setProductInfoListLoading(false);
        })
    }

    const getMorePharmacyProductsOfManufacturer = () => {
        setProductInfoListLoading(true);
        if(validate.isEmpty(manufacturer) || validate.isEmpty(productIdList) || currentProductsShown.current > totalProductFound){
            return;
        }
        martCatalogService.getMorePharmacyProductsOfManufacturer(JSON.stringify(productIdList.slice(currentProductsShown.current, currentProductsShown.current + 30))).then((response) => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.productInfoList)) {
                setProductInfoList([...productInfoList, ...response.dataObject.productInfoList]);
                currentProductsShown.current += response.dataObject.productInfoList.length;
            }
            setProductInfoListLoading(false);
            setLoadMore(false);
        }).catch((error) => {
            console.log(error);
            setProductInfoListLoading(false);
        })
    }

    const getCompositionProductDetails = () => {
        setProductInfoListLoading(true);
        if (validate.isEmpty(compositionId)) {
            return;
        }
        let compositionProductsPayload = {
            compositionId: compositionId,
            pageNo: pageNo.current,
            recordsPerPage: 30,
            maxRecords: 800,
            isKym : props.isKym,
            productIdString: JSON.stringify(productIdList.slice(productInfoList.length, productInfoList.length + 30))
        }

        martCatalogService.getCompositionProductDetails(compositionProductsPayload).then((response) => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
                if (validate.isNotEmpty(response.dataObject.compositionProducts)) {
                    if(pageNo.current==1){
                        setProductInfoList(response.dataObject.compositionProducts);
                    }else{
                        setProductInfoList([...productInfoList, ...response.dataObject.compositionProducts]);
                    }
                    currentProductsShown.current += response.dataObject.compositionProducts.length;
                }
                pageNo.current++; 
                if (validate.isNotEmpty(response.dataObject.productIds)) {
                    setProductIdList(response.dataObject.productIds);
                    setTotalProductFound(response.dataObject.productIds.length)
                }
                if(validate.isNotEmpty(response?.dataObject?.compositionName)){
                    breadCrumbAction.pushBreadCrumbs({name: response.dataObject.compositionName, url: props.location.pathname})
                    let compositionNameFromResponse = response.dataObject.compositionName;
                    setCompostionName(compositionNameFromResponse);
                    const correctUrl = getCompositionNameForUrl(compositionId,compositionNameFromResponse, props.isKym);
                    fixUrl(props.location.pathname,correctUrl);
                }
            }
            setProductInfoListLoading(false);
            setLoadMore(false);
        }).catch((error) => {
            console.log(error);
            setProductInfoListLoading(false);
            setLoadMore(false);
        })
    }

    const LoadMoreProducts = () => {
        setLoadMore(true);
        if(props.routePath == 'compositionProducts'){
            getCompositionProductDetails();
        } else{
            getMorePharmacyProductsOfManufacturer();
        }
    }



	return (
		<React.Fragment>
			{validate.isNotEmpty(productInfoList) && productInfoList.length > 0 &&
            <React.Fragment>
                <div>
                    <section className='py-3 px-2'>
                        <div className="align-items-center d-flex justify-content-between mb-3 px-2">
                                <h5 className="mb-0" title={`${props.routePath == 'compositionProducts' ? compositionName : manufacturer} Products`}> {props.routePath == 'compositionProducts' ? compositionName : manufacturer} Products </h5>
                                <p className="mb-0 font-14 text-secondary"> {productInfoList?.length} / {Validate().isNotEmpty(totalProductFound) ? totalProductFound : 0} </p>
                        </div>
                        <div className="d-flex flex-wrap home-page-products-slider w-100" style={{'gap':'0.5rem 0rem'}}>
                                {productInfoList.map((product, index) => (
                                    <div className="drugInfo-all-products">
                                        <ProductSummaryCard product={product} isDropDownRequired={true} showinformation={true} cardIndex={`${popOverPlacement(index + 1)}`} height={170} width={142} isKym={props.isKym} compositionId={compositionId}/>
                                    </div>
                                ))}
                        </div>
                        
                    {currentProductsShown.current < totalProductFound ?
                        <div className="w-100 px-2">
                            {!loadMore && <LoadMoreButton name={`Load ${validate.isNotEmpty(totalProductFound) && totalProductFound - productInfoList?.length > loadMoreProductsCount ? loadMoreProductsCount : totalProductFound - productInfoList?.length} More Products from ${props.routePath == "compositionProducts" ? compositionName : manufacturer}`} isLoading={loadMore} hide={loadMore} handleLoadMore={() => LoadMoreProducts()} />}
                        </div>
                        :
                        <React.Fragment>
                            {currentProductsShown.current > 20 && <div className="alert alert-warning w-100 text-center mb-0 rounded-pill mx-2 mt-2" role="alert"><strong>Huh..! We don't have any more products</strong></div>}
                        </React.Fragment>
                    }
                </section>
                </div>
                </React.Fragment>
            }
            {!isProductInfoListLoading && productInfoList?.length <= 0 && <React.Fragment>
                <NoProductsFound showrequest={false} message={"Huh..! We don't have any more products."} />
            </React.Fragment>}
            {isProductInfoListLoading && <section className="px-2 py-3">
                <div className="ph-row ph-item p-0 ml-2">
                    <div className="ph-col-4" style={{"height":"1.5rem"}}></div>
                </div>
                <CategoryDetailGhostImage onlyProducts={true} /></section>}
		</React.Fragment>
	);
};

export default PharmaManufacturerProducts;
