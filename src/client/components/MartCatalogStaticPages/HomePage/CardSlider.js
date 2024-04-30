import React from 'react'
import { useEffect, useState } from 'react';
import Slider from "react-slick";
import EachCard from './EachCard'
import SliderNextArrow from '../../MedplusLabs/components/Common/SliderNextArrow';
import SliderPrevArrow from '../../MedplusLabs/components/Common/SliderPrevArrow';
import TopOffers from './HomePagePlaceholders/TopOffers';
const CardSlider = (props) => {
    const testSummaryList = props.data
    const testSliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        swipeToSlide: true,
        variableWidth: false,
        prevArrow: <SliderPrevArrow />,
        nextArrow: <SliderNextArrow />,
        slidesToShow:parseInt(props.slidesToShow),
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: parseInt(props.slidesToShow),
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1680,
                settings: {
                    slidesToShow: 4,
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
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    const getPopolarTestsSlider = (sliderData) => {
        return (
            <Slider className="custom-slide-arrows" {...testSliderSettings}>
                {sliderData.map((each) => {
                    return (
                        <EachCard product={each}></EachCard>
                    );
                })}
            </Slider>
        )
    }
    return (
        <React.Fragment>
            {props.isLoading && <TopOffers/>}
            <div className='mb-3'>
                <div className="mb-3">
                    <h5 className="m-0">{props.sectionTitle}</h5>
                </div>
                <section className='py-3 px-4'>
                    <div className="home-page-slider-container home-page-products-slider square-card-slider mb-0">
                        {getPopolarTestsSlider(testSummaryList)}
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}
export default CardSlider