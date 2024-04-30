import React, { useState, useEffect } from 'react';
import HealthyLife from "./HealthyLife";
import MartBestPractices from "./MartBestPractices";
import MyAccountCards from './MyAccountCards';
import ShopByCategory from './ShopByCategory';
import MartHomeTopBanners from './MartHomeTopBanners';
import HomePageUploadPrescription from './HomePageUploadPrescription';
import Validate from "../../../../helpers/Validate";
import MartCatalogService from "../../../services/MartCatalogService";
import ProductsListWithSeperators from '../../Common/ProductListWithSeperators';
import { useSelector } from 'react-redux';
import EmergencyMessages from './EmergencyMessages';

const MartHome = (props) => {
	const validate = Validate();
	const martCatalogService = MartCatalogService();
	const userInfo = useSelector(state=>state && state.userInfo ? state.userInfo.userInfo : null);
	const [banners, setBanners] = useState({
		TOP: [],
		SEPARATOR: [],
	});
	const [bannersRedirectUrls, setBannersRedirectUrls] = useState({
		TOP: [],
		SEPARATOR: [],
	});
	const [isBannersLoading, setBannersLoading] = useState(true);
	const [dynamicSectionProducts,setDynamicSectionProducts]=useState({});
    const [isDynamicSectionProductsLoading,setDynamicSectionProductsLoading]=useState(false);
	const [isTopBannerLoading,setTopBannerLoading]=useState(true);
	const [isTopRightBannerLoading,setTopRightBannerLoading]=useState(true);
	
	useEffect(() => {
		if (validate.isEmpty(banners.TOP)) {
			getBanners("TOP");
		}
		if (validate.isEmpty(banners.SEPARATOR)) {
			getBanners("SEPARATOR");
		}
		if(validate.isEmpty(dynamicSectionProducts)){
			getDynamicSectionProducts();
		}
	}, []);

	const getDynamicSectionProducts =()=>{
        setDynamicSectionProductsLoading(true);
        martCatalogService.getDynamicSectionProducts().then(response=>{
			if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)){
				let products=response.dataObject.firstOffer;
				if(validate.isNotEmpty(response.dataObject.firstOffer)) {
                    products={...response.dataObject.firstOffer};
                }
                if(validate.isNotEmpty(response.dataObject.offerProductList)){
					products={...products,...response.dataObject.offerProductList};
                }
				setDynamicSectionProducts(products);
            }
            setDynamicSectionProductsLoading(false);
        }).catch(function(error){
            setDynamicSectionProductsLoading(false);
            console.log(error);
        })
    }

	const getBanners = (screenLocation) => {
		martCatalogService.getBanners({ REQUEST_OBJ: { catalogId: "CATALOG_HYD1", requestFor: "WEB", pageName: "HOME", screenLocation: screenLocation }}).then((bannersData) => {
            const { statusCode, dataObject } = bannersData;
            if ( statusCode === "SUCCESS" && validate.isNotEmpty(dataObject) && validate.isNotEmpty(dataObject.bannerPromotion) && validate.isNotEmpty(dataObject.bannerPromotion.bannerPromoDetails) && validate.isNotEmpty(dataObject.topBannerRedirectionUrls)) {
                setBanners((banners) => ({...banners, ...dataObject.bannerPromotion.bannerPromoDetails}));
                setBannersRedirectUrls((bannersRedirectUrls) => ({...bannersRedirectUrls,...dataObject.topBannerRedirectionUrls}));
            }
			switch(screenLocation){
				case "SEPARATOR":
					setBannersLoading(false);
					break;
				case "TOP":
					setTopBannerLoading(false);
					break;
			}
        }).catch((err) => {
            setBannersLoading(false);
			setTopBannerLoading(false);
            console.log(err);
        });
	};

	return (
		<React.Fragment>
			<EmergencyMessages/>
			<MartHomeTopBanners banners={banners} bannersRedirectUrls={bannersRedirectUrls} isTopBannerLoading={isTopBannerLoading} />
			<HomePageUploadPrescription />
			{validate.isNotEmpty(userInfo) && <MyAccountCards history={props.history} />}
			<div className='row no-gutters'>
				<div className='col-12'>
					<ShopByCategory sectionTitle="Shop by Category" history={props.history}/>
				</div>
			</div>
			
			<ProductsListWithSeperators seperators = {banners.SEPARATOR}  isSeperatorsLoading = {isBannersLoading} seperatorRedirectionUrls={bannersRedirectUrls.SEPARATOR} productListAgainstTitle={dynamicSectionProducts} isProductsLoading={isDynamicSectionProductsLoading} history={props.history}/>
			<MartBestPractices />
			<HealthyLife/>
		</React.Fragment>
	);
};

export default MartHome;
