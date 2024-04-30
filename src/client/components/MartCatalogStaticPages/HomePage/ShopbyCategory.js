import React from 'react'
import Slider from "react-slick";
import SliderNextArrow from '../../MedplusLabs/components/Common/SliderNextArrow';
import SliderPrevArrow from '../../MedplusLabs/components/Common/SliderPrevArrow';
import ShopByCategory from './HomePagePlaceholders/ShopByCategory';
const ShopbyCategory = (props) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        swipeToSlide: true,
        variableWidth: false,
        prevArrow: <SliderPrevArrow />,
        nextArrow: <SliderNextArrow />,
        slidesToShow: 7,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1680,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 7 ,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 7,
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
         function getConditionBasedSlider(ShopbyCategoryJson) {
            return (
                <Slider className="custom-slide-arrows" {...settings}>
                    {ShopbyCategoryJson.map((each) => {
                        return (
                            <div className="item">
                                <a href="javascript:void(0)" title={each.title}>
                                    <div className="card border-0">
                                        <div class="card-body p-2">
                                            <div className="img-container border position-relative text-align-center" style={{"width": "150px","margin":"10px auto","height": "150px","border-radius":"50%","background-color":"#fff"}}>
                                                {each.type == 'image' && <img src={each.imageSrc} alt={each.title} title={each.title} className="img-fluid" role="img" />}
                                                {each.type == 'svg' && <span dangerouslySetInnerHTML={{ __html: each.svg }}>
                                                </span>}
                                            </div>
                                            <h6 class="card-title">{each.title}</h6>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </Slider>
            )
        }
        return (
            <React.Fragment>
                <ShopByCategory/>
                <div className='mb-3'>
                     <h5 className="mb-0">{props.sectionTitle}</h5>
                </div>
                <section className="shadow-none p-4">
                    <div className='condition-based-test-slider'>
                        {getConditionBasedSlider(props.ShopbyCategoryJson)}
                    </div>
                </section>
            </React.Fragment>
        )
}
export default ShopbyCategory