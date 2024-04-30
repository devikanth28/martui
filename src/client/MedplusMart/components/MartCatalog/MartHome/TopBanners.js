import React from "react";
import Slider from "react-slick";
import BannerRedirection from "../../../../commonComponents/BannerRedirection";
import Validate from "../../../../helpers/Validate";
import { bannerSelection } from "../../../../Analytics/Analytics";

const TopBanners = (props) => {

    const validate = Validate();
    const topBanners = validate.isNotEmpty(props.topBanners) ? props.topBanners : [];
    const redirectionUrls = validate.isNotEmpty(props.redirectionUrls) ? props.redirectionUrls : [];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover:true,
        pauseOnDotsHover: true,
        arrows:false,
        appendDots: (dots) => (
            <div>
                <ul className="homepage-main-slider-dots"> {dots} </ul>
            </div>
        ),
        customPaging: (i) => (
            <div key={i}>
                <span> {topBanners[i].subTextLine1} <small className="d-block"> {topBanners[i].subTextLine2} </small> </span>
            </div>
        ),
    };

    const handleTopSelection= (banner) => {
        bannerSelection("HomePage" , banner)
    }

    return (
		<React.Fragment>
			{ validate.isNotEmpty(topBanners) && validate.isNotEmpty(redirectionUrls) &&
                <div className="col-12 px-0">
                    <Slider {...settings} className="homepage-main-slider shadow-sm" role="img" aria-label="OFFERS AT MEDPLUS" >
                        {topBanners.map((banner, index) => {
                            return (
                                    <BannerRedirection banner = {banner} redirectUrl={redirectionUrls[index]} key={index} imageClassName={"img-fluid d-block"} onClickEvent={()=> handleTopSelection(banner)}/>
                            );
                        })}
                    </Slider>
                </div>
            }
		</React.Fragment>
	);
}

export default TopBanners;