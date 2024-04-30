import React from "react";
import { Link } from "react-router-dom";
import BannerRedirection from "../../../../../commonComponents/BannerRedirection";
import Validate from "../../../../../helpers/Validate";
import PromotionalBannersGhostImage from "./PromotionalBannersGhostImage";
import { pharmacySeperators } from "../../../../../Analytics/Analytics";

const PromotionalBanners = (props) => {

    const validate = Validate();

    const isBannersLoading = validate.isNotEmpty(props.isBannersLoading) ? props.isBannersLoading : false;
    const categoryName = validate.isNotEmpty(props.categoryName) ? props.categoryName.toUpperCase() : "";
    const promotionalBannersData = validate.isNotEmpty(props.promotionalBannersData) ? props.promotionalBannersData[categoryName] : [];
    const promotionalBannersRedirectUrls = validate.isNotEmpty(props.promotionalBannersRedirectUrls) ? props.promotionalBannersRedirectUrls[categoryName] : [];

    const handleClick =(bannerDetails) => {
        pharmacySeperators('categories',bannerDetails.alternativeValue)
    }

    return (
        <React.Fragment>
            {isBannersLoading && <PromotionalBannersGhostImage />}
            {!isBannersLoading && validate.isNotEmpty(promotionalBannersData) && validate.isNotEmpty(promotionalBannersRedirectUrls) && <React.Fragment>
            <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="m-0">Promotional Offer For You</h5>
                    <Link to={"/promotions"}>
                        <button type="button" role="button" className="btn brand-secondary px-4 rounded-pill">View All</button>
                    </Link>
                </div>
                <section className="categories">
                <div className="container-fluid">
                    <div className="clearfix"></div>
                    <div className="row promotions">
                        {promotionalBannersData.map((bannerData, index) => {
                            return(
                                <React.Fragment>
                                    <div className="itemcard test-card" style={{'min-height':'unset'}}>
                                                <figure>
                                            <BannerRedirection redirectUrl={promotionalBannersRedirectUrls[index]} banner = {bannerData} imageClassName={"img-fluid rounded-xl"} onClickEvent={()=>handleClick(bannerData)}/> 
                                                </figure>
                                        <div className="footer-offer">
                                            <h4 className="mb-3 ml-3">
                                                <small> {bannerData.subTextLine1} </small>
                                                <strong className="text-danger"> {bannerData.subTextLine2} <sup> * </sup> </strong>
                                            </h4>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </section>
            </React.Fragment>}
            
        </React.Fragment>
     )
}

export default PromotionalBanners;