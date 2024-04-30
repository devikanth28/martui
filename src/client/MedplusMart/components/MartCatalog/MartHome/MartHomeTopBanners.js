import React from "react";
import Validate from "../../../../helpers/Validate";
import TopBanners from "./TopBanners";
import TopBannersGhostImage from "./TopBannersGhostImage";

const MartHomeTopBanners = (props) => {

    const validate = Validate();

    return (
        <React.Fragment>
            {(props.isTopBannerLoading || (!props.isTopBannerLoading && validate.isNotEmpty(props?.banners?.TOP))) && <div className="topbanners-homepage">
                <div className="row mx-0">
                    { props.isTopBannerLoading && <TopBannersGhostImage /> }
                    { !props.isTopBannerLoading && validate.isNotEmpty(props?.banners?.TOP) && validate.isNotEmpty(props?.bannersRedirectUrls?.TOP) && <TopBanners topBanners = {props.banners.TOP} redirectionUrls = {props.bannersRedirectUrls.TOP} /> }
                </div>
            </div>}
        </React.Fragment>
    );
};

export default MartHomeTopBanners;
