import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import BreadCrumbAction from "../../../../../redux/action/BreadCrumbAction";
import BannerRedirection from "../../../../commonComponents/BannerRedirection";
import MetaTitle from "../../../../commonComponents/MetaTitle";
import Validate from "../../../../helpers/Validate";
import MartCatalogService from "../../../services/MartCatalogService";
import PromotionsGhostImage from "./PromotionsGhostImage";
import { pharmacySeperators , bannerSelection} from "../../../../Analytics/Analytics";

const Promotions = (props) => {

    const [promotionsRedirectUrls, setPromotionsRedirectUrls] = useState({});
    const [promotionBanners, setPromotionBanners] = useState({});
    const [selectedPromotion, setSelectedPromotion] = useState("ALL");
    const [isPromotionsLoading, setPromotionsLoading] = useState(false);
    const validate = Validate();
    const martCatalogService = MartCatalogService();
    const breadCrumbAction = BreadCrumbAction();

    useEffect(() => {
        if (validate.isEmpty(promotionBanners)) {
            getPromotions();
        }
        breadCrumbAction.pushBreadCrumbs({ name: 'Promotions', url: props.location.pathname });
    }, [])

    const getPromotions = async () => {
        try {
            setPromotionsLoading(true);
            const response = await martCatalogService.getPromotions();
            setPromotionsLoading(false);
            if (validate.isNotEmpty(response) && response.statusCode === 'SUCCESS' && validate.isNotEmpty(response.dataObject)) {

                if (validate.isNotEmpty(response.dataObject.bannerPromotionsMap)) {
                    setPromotionBanners({ ...response.dataObject.bannerPromotionsMap });
                }
                if (validate.isNotEmpty(response.dataObject.promotionRedirectUrls)) {
                    setPromotionsRedirectUrls({ ...response.dataObject.promotionRedirectUrls });
                }
            }
        }
        catch (err) {
            setPromotionsLoading(false);
            console.log(err);
        }
    }

    const handleClick =(bannerDetails,sectionbanner) => {
        if(sectionbanner == 'TOP') {
            bannerSelection("Promotions" , bannerDetails)
        } else {
            pharmacySeperators(props.history.location.pathname,bannerDetails.alternativeValue)
        }
     
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dots: true,
        dotsClass: "slick-dots slick-promotions",
        customPaging: function (i) {
            return (
                <a href="javascript:void(0)" title=" ">
                    <div className="custom-arrows-promotions"></div>
                </a>
            );
        },
    }

    const preparePromotions = () => {
        const promotions = [];
        const redirectionUrls = [];
        if (selectedPromotion !== 'ALL') {
            promotions.push(...promotionBanners[selectedPromotion]);
            redirectionUrls.push(...promotionsRedirectUrls[selectedPromotion]);
        }
        else {
            Object.entries(promotionBanners).map(([key, value]) => {
                promotions.push(...value);
                redirectionUrls.push(...promotionsRedirectUrls[key]);
            });
        }
        return promotions.map((banner, index) => {
            const redirectUrl = redirectionUrls[index];
            return (
                <div className="itemcard test-card" style={{minHeight:"unset"}}>
                    <BannerRedirection redirectUrl={redirectUrl} banner={banner} imageClassName={"img-fluid rounded-xl"} onClickEvent={()=>handleClick(banner,'seperator')}/>
                </div>
            )
        });
    }

 

    return (
        <React.Fragment>
        <MetaTitle  defaultValue={"Online Pharmacy Store in India. Best value on medicines-MedPlus"}/>
            {isPromotionsLoading && <PromotionsGhostImage />}
            {!isPromotionsLoading && validate.isNotEmpty(promotionBanners) &&
                <React.Fragment>
                    <Slider className="promotions-banner-slider" {...settings}>
                        {validate.isNotEmpty(promotionBanners) && validate.isNotEmpty(promotionsRedirectUrls) && validate.isNotEmpty(promotionBanners.TOP) && promotionBanners.TOP.map((banner, index) => {
                            const redirectUrl = promotionsRedirectUrls.TOP[index];
                            return (
                                <div>
                                    <BannerRedirection redirectUrl={redirectUrl} banner={banner} imageClassName={"img-fluid rounded-xl"} onClickEvent={()=>handleClick(banner,'TOP')}/>
                                </div>
                            );
                        })}
                    </Slider>
                    <div className="my-account-health-records my-0 my-lg-4">
                        <div className='d-flex justify-content-center flex-wrap filter-by-container'>
                            {Object.keys(promotionBanners).length > 0 && ['ALL', ...Object.keys(promotionBanners)].map((key) => {
                                if (key !== 'TOP') {
                                    return (<button className={`btn btn-badge ${selectedPromotion == key ? 'active' : ''}`} onClick={() => { setSelectedPromotion(key) }}>{key}</button>);
                                }
                            })}
                        </div>
                    </div>
                    <div className='row  promotions no-gutters'>
                        {Object.keys(promotionBanners).length > 0 && Object.keys(promotionsRedirectUrls).length > 0 &&
                            <React.Fragment>
                                {preparePromotions()}
                            </React.Fragment>}
                    </div>
                    <p className="font-12 mb-0 pt-2"><span className='text-danger'>*</span>Only for selected localities</p>
                </React.Fragment>}
        </React.Fragment>
    );
}

export default Promotions;