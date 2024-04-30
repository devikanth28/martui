import React, { useState, useEffect } from 'react'
import PopularBrands from './PopularBrands';
import Validate from '../../../../../helpers/Validate';
import { fixUrl, getCategoryIdFromParam, getCategoryNameForUrl, getCategoryNameFromParam } from '../../../../../helpers/CommonUtil';
import MartCatalogBanner from '../../../../../components/MedplusLabs/components/Common/LabsCatalogBanner';
import MartCatalogService from '../../../../services/MartCatalogService';
import ProductSummarySlider from '../../../Common/ProductSummarySlider';
import PromotionalBanners from './PromotionalBanners';
import ProductListWithSeperators from '../../../Common/ProductListWithSeperators';
import ShopBySubCategory from './ShopBySubCategory';
import { useSelector } from 'react-redux';
import { getSelectedLocality } from '../../../../../../redux/action/LocalityAction';
import MartCategoryHelper from '../../../../../helpers/MartCategoryHelper';
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction';
import MetaTitle from '../../../../../commonComponents/MetaTitle';

const CategoryHome = (props) => {

    const martCatalogService = MartCatalogService();
    const validate = Validate();
    const breadCrumbAction = BreadCrumbAction();

    const [banners, setBanners] = useState({
		TOP: [],
		BRAND_RIGHT: [],
		SEPARATOR: []
	});
	const [bannersRedirectUrls, setBannersRedirectUrls] = useState({
		TOP: [],
		BRAND_RIGHT: [],
		SEPARATOR: []
	});
    const [brandsData, setBrandsData] = useState({
        popularBrands: [],
        imageUrl: "",
        brandImageVersion : ""
    });
    const [promotionalBannersData, setPromotionalBannersData] = useState({
        promotionRedirectUrls: {},
        bannerPromotionsMap: {}
    });
    const [firstOffer, setFirstOffer] = useState({});
    const [offerProductList, setOfferProductList] = useState({});
    const [isBannersLoading, setBannersLoading] = useState(false);
    const [isProductsLoading, setProductsLoading] = useState(false);

    const categoryNameId = props.match.params.categoryNameId;
    const categoryId = getCategoryIdFromParam(categoryNameId);
    const categoryName = getCategoryNameFromParam(categoryNameId);
    const [secondLevelCategoryData,setSecondLevelCategoryData] = useState([]);
    const selectedLocality = getSelectedLocality();
    const martCategoriesFromRedux = useSelector((state)=>validate.isNotEmpty(state) && validate.isNotEmpty(state.medplusCatalog) && validate.isNotEmpty(state.medplusCatalog.martCatalog) ? state.medplusCatalog.martCatalog : {});
    const catalogData = validate.isNotEmpty(selectedLocality) && validate.isNotEmpty(selectedLocality['catalogId']) ? martCategoriesFromRedux[selectedLocality['catalogId']] : martCategoriesFromRedux['CATALOG_DFT1'];
    const martCategoryHelper =  MartCategoryHelper();
    useEffect(() => {
        correctUrl(categoryId);
        getBrandsAndBanners();
        getDynamicSectionProducts(categoryId);
        getPromotionalBanners();
        getSecondLevelCategories(categoryId);
    }, [categoryNameId]);


    const correctUrl = (categoryIdFromUrl)=> {
        const category = martCategoryHelper.getCategoryDetailsFromCategoryIds([categoryIdFromUrl]);
        if(validate.isNotEmpty(category)){
            const {categoryId,categoryName} = category[categoryIdFromUrl];
            const categoryUrl = "/categories/"+getCategoryNameForUrl(categoryName,categoryId);
            fixUrl(props.location.pathname,categoryUrl);
        }
    }
    const getSecondLevelCategories = (categoryId) =>{
        if(validate.isEmpty(catalogData)) {
            return;
        }
        Object.entries(catalogData).map(([,value])=>{
            if(categoryId === value["categoryId"]){
                setSecondLevelCategoryData(value["subCategoryInfo"]);
            }
            
        })
    }

    const getBrandsAndBanners = () => {
        setBannersLoading(true);
        martCatalogService.getBrandsAndBanners({ REQUEST_TYPE: "CATEGORY", CURRENT_CATEGORY_ID: categoryId }).then((response)=>{
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)) { 
                if(validate.isNotEmpty(response.dataObject.categoryName)){
                    breadCrumbAction.pushBreadCrumbs({ name: response.dataObject.categoryName, url: props.location.pathname });
                }
                if(validate.isNotEmpty(response.dataObject.bannersData)){
                    if (validate.isNotEmpty(response.dataObject.bannersData.bannerPromotion) && validate.isNotEmpty(response.dataObject.bannersData.bannerPromotion.bannerPromoDetails)) {
                        setBanners((banners) => ({...banners, ...response.dataObject.bannersData.bannerPromotion.bannerPromoDetails}));
                    }
                    if(validate.isNotEmpty(response.dataObject.bannersData.topBannerRedirectionUrls)){
                        setBannersRedirectUrls((redirectUrls) => ({...redirectUrls, ...response.dataObject.bannersData.topBannerRedirectionUrls}))
                    }
                }
                if(validate.isNotEmpty(response.dataObject.seperatorBannersData)){
                    if (validate.isNotEmpty(response.dataObject.seperatorBannersData.bannerPromotion) && validate.isNotEmpty(response.dataObject.seperatorBannersData.bannerPromotion.bannerPromoDetails)) {
                        setBanners((banners) => ({...banners, ...response.dataObject.seperatorBannersData.bannerPromotion.bannerPromoDetails}));
                    }
                    if(validate.isNotEmpty(response.dataObject.seperatorBannersData.separatorBannerRedirectionUrls)){
                        setBannersRedirectUrls((redirectUrls) => ({...redirectUrls, ...response.dataObject.seperatorBannersData.separatorBannerRedirectionUrls}))
                    }
                }
                if(validate.isNotEmpty(response.dataObject.brandBanner)){
                    if (validate.isNotEmpty(response.dataObject.brandBanner.bannerPromotion) && validate.isNotEmpty(response.dataObject.brandBanner.bannerPromotion.bannerPromoDetails)) {
                        setBanners((banners) => ({...banners, ...response.dataObject.brandBanner.bannerPromotion.bannerPromoDetails}));
                    }
                    if(validate.isNotEmpty(response.dataObject.brandBanner.brand_rightBannerRedirectionUrls)){
                        setBannersRedirectUrls((redirectUrls) => ({...redirectUrls, ...response.dataObject.brandBanner.brand_rightBannerRedirectionUrls}))
                    }
                }
                if (validate.isNotEmpty(response.dataObject.brandsData)) {
                    setBrandsData((brands) => ({...brands, ...response.dataObject.brandsData}));
                }
            }
            setBannersLoading(false);
        },(err) => {
            setBannersLoading(false);
            console.log(err);
        })
    }

    const getDynamicSectionProducts = (categoryId) => {
        setProductsLoading(true);
        martCatalogService.getDynamicSectionProducts({CURRENT_CATEGORY_ID:categoryId}).then((response) => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)){
                if(validate.isNotEmpty(response.dataObject.firstOffer)) {
                    setFirstOffer(response.dataObject.firstOffer);
                }
                if(validate.isNotEmpty(response.dataObject.offerProductList)){
                    setOfferProductList(response.dataObject.offerProductList);
                }
            }
            setProductsLoading(false);
        }).catch(function(error){
            setProductsLoading(false);
            console.log(error);
        });
    }

    const getPromotionalBanners = () => {
        setBannersLoading(true);
        martCatalogService.getPromotionalBannersForCategory().then((response) => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)){
                setPromotionalBannersData(response.dataObject);
            }
            setBannersLoading(false);
        }, (err)=>{
            setBannersLoading(false);
            throw(err);
        })
    }


    return (
        <React.Fragment>
            <MetaTitle metaKey={`${`MART_${categoryId}`}`} defaultValue={`Online Pharmacy Store in India. Best value on medicines-MedPlus`}/>
            <MartCatalogBanner isBannersLoading={isBannersLoading} isPharmacy={true} redirectUrl={bannersRedirectUrls.TOP[0]} bannerData={banners.TOP[0]} history={props.history} screenLocation={"TOP"} />
            <ShopBySubCategory history={props.history} categoryName={categoryName} secondLevelCategoryData = {secondLevelCategoryData} categoryNameId={categoryNameId} isLoading={isBannersLoading}/>
            <ProductSummarySlider productList={Object.values(firstOffer)[0]} isLoading={isProductsLoading} title={Object.keys(firstOffer)[0]} history={props.history}/>
            <PopularBrands isLoading={isBannersLoading} popularBrands={brandsData.popularBrands} imageUrl={brandsData.imageUrl} brandImageVersion={brandsData.brandImageVersion} bannerData={banners.BRAND_RIGHT[0]} brandRightBannerRedirectionUrl={bannersRedirectUrls.BRAND_RIGHT[0]} history={props.history}/>
            <ProductListWithSeperators seperators = {banners.SEPARATOR}  isSeperatorsLoading = {isBannersLoading} seperatorRedirectionUrls={bannersRedirectUrls.SEPARATOR} productListAgainstTitle={offerProductList} isProductsLoading={isProductsLoading} history={props.history} routePath={props.routePath}/>
            <PromotionalBanners isBannersLoading={isBannersLoading} promotionalBannersData={promotionalBannersData.bannerPromotionsMap} promotionalBannersRedirectUrls={promotionalBannersData.promotionRedirectUrls} categoryName={categoryName}/>
        </React.Fragment>
    );
}

export default CategoryHome;