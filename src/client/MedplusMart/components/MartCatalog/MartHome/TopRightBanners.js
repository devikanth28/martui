import React from "react";
import Slider from "react-slick";
import Validate from "../../../../helpers/Validate";
import { withRouter } from "react-router";
import BannerRedirection from "../../../../commonComponents/BannerRedirection";

const TopRightBanners = withRouter((props) => {

    const banner = [];
    const validate = Validate();
    const topRightBanners = validate.isNotEmpty(props.topRightBanners) ? props.topRightBanners : [];
    const redirectionUrls = validate.isNotEmpty(props.redirectionUrls) ? props.redirectionUrls : [];
    const length = (topRightBanners.length % 2 === 0 ? topRightBanners.length : topRightBanners.length - 1);

    const sideScrollSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        customPaging: function (i) {
			return (
				<div className="custompagination rounded">
					<span></span>
				</div>
			);
		},
		dots: true,
        dotsClass: "slick-dots d-flex justify-content-center",
    }

    for (let bannerIndex = 0; bannerIndex < topRightBanners.length-1; bannerIndex += 1) {
        banner.push(
            <BannerRedirection redirectUrl = {redirectionUrls[bannerIndex]} banner={banner} key={bannerIndex} noImage={true}>
            <div key={bannerIndex}>
                <div className="slider-img-content"  style={{'backgroundImage': `url(${topRightBanners[bannerIndex].imagePath})` }} ></div>
            </div>
            </BannerRedirection>
        );
    };

    return (
		<React.Fragment>
			{validate.isNotEmpty(banner) &&
                <div className="col-3 pr-0 homepage-aside-slider">
                    <div>
                        <Slider {...sideScrollSettings}>
                            {banner}
                        </Slider>
                    </div>
                </div>
			}
		</React.Fragment>
	);
});

export default TopRightBanners;