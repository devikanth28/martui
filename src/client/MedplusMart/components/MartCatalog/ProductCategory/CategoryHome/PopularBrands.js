import React from "react";
import { Link } from "react-router-dom";
import BannerRedirection from "../../../../../commonComponents/BannerRedirection";
import Validate from "../../../../../helpers/Validate"
import BrandsSlider from "./BrandsSlider";
import PopularBrandsGhostImage from "./PopularBrandsGhostImage";
const PopularBrands = (props) => {
    const validate = Validate();
    const isLoading = validate.isNotEmpty(props.isLoading) ? props.isLoading : true;
    
    const prepareDataForBrandSlider=()=>{
        const popularBrands=props.popularBrands|| [];
        return popularBrands.map(brand=>{
            brand.redirectValue=`/brand/${brand.brandName}`;
            brand.imageUrl=`${props.imageUrl}/brandImages/${brand.imageName}.jpg?v=${props.brandImageVersion}`;
            return brand;
        })
    }

    const brandRightBanner=()=>{
        return(
            <React.Fragment>
                  <div className="col-sm-6 col-md-6 col-lg-6 p-0">
                    <div className="mb-3">
                        <section className="categories-tpt promotion-banner padding-none py-0">
                            <BannerRedirection redirectUrl={props.brandRightBannerRedirectionUrl} banner={props.bannerData} style={{backgroundImage: `url(${props.bannerData.imagePath})`}} noImage={true}/>
                        </section>
                    </div>
                </div>
            </React.Fragment>
        );
    }
    return (
        <React.Fragment>
            {isLoading && <PopularBrandsGhostImage />}
            {!isLoading && validate.isNotEmpty(props.popularBrands) && <div className="row m-0">
                <div className="col-sm-6  pl-0">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                        <h5 className="m-0 my-2">Popular Brands</h5>
                    </div>
                    <section className="categories-tpt pb-0">
                        <div className="container-fluid my-2 p-0 pt-3">
                            <BrandsSlider brands={prepareDataForBrandSlider()}/>
                        </div>
                    </section>
                </div>
                {validate.isNotEmpty(props.bannerData) && brandRightBanner()}
            </div>}
        </React.Fragment>
    );
};

export default PopularBrands;
