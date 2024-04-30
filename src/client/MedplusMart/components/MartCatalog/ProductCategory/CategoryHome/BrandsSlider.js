import React from "react";
import Brand from "./Brand";
import Slider from "react-slick";
import Validate from '../../../../../helpers/Validate';
import SliderNextArrow from "../../../../../components/MedplusLabs/components/Common/SliderNextArrow";
import SliderPrevArrow from "../../../../../components/MedplusLabs/components/Common/SliderPrevArrow";

const BrandsSlider = (props) => {

    const brands=props.brands;
    const validate=Validate();
    const sliderCategoryPageResponsive = {
        home: [
            {
                breakpoint: 1680,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1368,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
        ],
        category: [],
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        swipe: true,
        swipeToSlide: true,
        variableWidth: false,
        prevArrow: <SliderPrevArrow />,
        nextArrow: <SliderNextArrow />,
        slidesToShow: props.source == "category" ? 9 : 5,
        responsive: props.source == "category" ? sliderCategoryPageResponsive.category : sliderCategoryPageResponsive.home,
    };

    return (
        <React.Fragment>
            {validate.isNotEmpty(brands) &&<section className="shadow-none h-100">
                <div className="px-3" style={{"padding-bottom":"2.1rem"}}>
                  <div className="d-flex align-items-center justify-content-between">
                  </div>
                    <div className="shop-by-category mb-n3 mb-sm-3 mx-n3">
                        <Slider className="custom-slide-arrows inner-arrows" {...settings}>
                            {brands.map((brand) => {
                                return(<Brand brand={brand}/>)
                            })}
                        </Slider>
                    </div>
                </div>
            </section>}
        </React.Fragment>
    );
}

export default BrandsSlider;