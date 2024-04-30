import React from "react";
import Slider from "react-slick";
import SliderNextArrow from "../../../components/MedplusLabs/components/Common/SliderNextArrow";
import SliderPrevArrow from "../../../components/MedplusLabs/components/Common/SliderPrevArrow";
import Validate from "../../../helpers/Validate";
import ProductSummaryCard from "./ProductSummaryCard";
import ProductSummarySliderGhostImage from "./ProductSummarySliderGhostImage";

const ProductSummarySlider = (props) => {

    const validate = Validate();
    const productList = validate.isNotEmpty(props.productList) ? props.productList : [];
    var isLoading = validate.isNotEmpty(props.isLoading) ? props.isLoading : true;

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        swipeToSlide: true,
        variableWidth: false,
        prevArrow: <SliderPrevArrow />,
        nextArrow: <SliderNextArrow />,
        slidesToShow: props.isProductDetail ? 5 : 7,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: props.isProductDetail ? 5 : 7,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1680,
                settings: {
                    slidesToShow: props.isProductDetail ? 4 : 6,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: props.isProductDetail ? 3 : 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1368,
                settings: {
                    slidesToShow: props.isProductDetail ? 3 : 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: props.isProductDetail ? 3 : 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: props.isProductDetail ? 3 : 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: props.isProductDetail ? 3 : 4,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <React.Fragment>
            {isLoading && <ProductSummarySliderGhostImage />}
            {(validate.isNotEmpty(props.title) && validate.isNotEmpty(productList)) && <div className="mb-2"><h5 className="mb-0">{props.title}</h5></div>}
            {!isLoading && validate.isNotEmpty(productList) && <section className="section-seperator">
                <div className="home-page-slider-container pb-0 px-3 pt-0 mb-0 mx-n2">
                    <Slider className="custom-slide-arrows home-page-products-slider" {...settings}>
                        {productList.map((eachProduct) => {
                            return (
                                <ProductSummaryCard product={eachProduct} history={props.history} width={142} height={170}/>
                            );
                        })}
                    </Slider>
                </div>
            </section>}
        </React.Fragment>
    )
}

export default ProductSummarySlider;