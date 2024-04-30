import React from 'react';
import Validate from '../../../helpers/Validate';
import ProductSummarySlider from './ProductSummarySlider';
import MartCatalogBanner from "../../../components/MedplusLabs/components/Common/LabsCatalogBanner";
import MartCatalogBannerGhost from '../../../components/MartCatalogStaticPages/HomePage/HomePagePlaceholders/LabBannerGhost';
import ProductSummarySliderGhostImage from './ProductSummarySliderGhostImage';
import DownloadAddBanner from '../MartCatalog/ProductCategory/CategoryHome/DownloadAppBanner';

const ProductListWithSeperators=(props)=>{
    const validate=Validate();
    const seperators = validate.isNotEmpty(props.seperators) ? props.seperators : [];
    const productListAgainstTitle = validate.isNotEmpty(props.productListAgainstTitle) ? props.productListAgainstTitle : {};
    let bannersCount=0;
    const RenderExtraSeparatorBanner = () => {
        const extraSeparatorBanners = [];
        for(let index = bannersCount; index < seperators.length; index++) {
            let banner = seperators.filter(seperator=>{return seperator.sequenceNo == index+1});
            if(validate.isNotEmpty(banner)){
            extraSeparatorBanners.push(
                <MartCatalogBanner isBannersLoading={props.isSeperatorsLoading} redirectUrl={props.seperatorRedirectionUrls[index]} bannerData={seperators[index]} history={props.history} screenLocation={'SEPARATOR'} isPharmacy={true} />
            );
            }
        }
        return extraSeparatorBanners;
    }

    return(
        <React.Fragment>
            {(props.isSeperatorsLoading || props.isProductsLoading) && 
                [1,2].map(() => {
                    return(
                        <React.Fragment>
                            <ProductSummarySliderGhostImage />
                            <MartCatalogBannerGhost />
                        </React.Fragment>
                    );
                })
            }
            {!props.isSeperatorsLoading && !props.isProductsLoading && validate.isNotEmpty(productListAgainstTitle) &&
                Object.entries(productListAgainstTitle).map(([title,productList], index) => {
                    let banner = seperators.filter(seperator=>{return seperator.sequenceNo == index+1});
                        bannersCount++;
                    return(
                        <React.Fragment>
                            <ProductSummarySlider isLoading={props.isProductsLoading} productList={productList} title={title} history={props.history}/>
                           {validate.isNotEmpty(banner) && <MartCatalogBanner isBannersLoading={props.isSeperatorsLoading} redirectUrl={props.seperatorRedirectionUrls[index]} bannerData={seperators[index]} history={props.history} screenLocation={'SEPARATOR'}  isPharmacy={true}/> }
                        </React.Fragment>
                    );
                })
            }
            {<RenderExtraSeparatorBanner />}
            {props.routePath && props.routePath == "CategoryHome" && <DownloadAddBanner/>}
            </React.Fragment>
    );
}

export default ProductListWithSeperators;