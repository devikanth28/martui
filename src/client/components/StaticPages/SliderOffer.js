import React,{useState} from 'react';
import Slider from 'react-slick';
import SliderNextArrow from '../MedplusLabs/components/Common/SliderNextArrow';
import SliderPrevArrow from '../MedplusLabs/components/Common/SliderPrevArrow';
import PharmaModal from './PharmaModal';
function SliderOffer(props) {
    const  [isopen, setOpen] = useState(false)
    const toggleChangeAddressModal = () =>{ setOpen(!isopen);}
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        swipeToSlide: true,
        variableWidth: false, 
        prevArrow: <SliderPrevArrow />,
        nextArrow: <SliderNextArrow />,      
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1680,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1368,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    return (
        <React.Fragment>
        <PharmaModal isopen={isopen} toggleChangeAddressModal= {toggleChangeAddressModal} />
            <section className="shadow-none">
                <div className="card border-0">
                    <div className="card-body px-3 pt-3 pb-0">
                        <h5 className="mb-0">Current Offers</h5>
                        <div className="custom-slide-arrows d-block p-0 mb-0">
                            <div className="content w-100 p-3 ">
                                <Slider {...settings}>
                                    <div className="item">
                                        <div className="currentOffers mx-3">
                                            <div className="row m-0">
                                                <div className="col-xs-4 col-sm-4 p-0">
                                                    <div className="discountHeading mt-3 px-0"><span className="upto">Up to</span>35%</div>
                                                </div>
                                                <div className="col-xs-8 col-sm-8">
                                                    <h3 className="help-heading m-0 pb-3">Savings on<br/>Medicines</h3>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12">
                                                <p>Offer valid on all purchases, when you choose FlexiRewards</p>
                                                <div className="margin-t-b"><a href="javaScript:void(0);" title="View Details" onClick ={()=> setOpen(!isopen)} className="btn btn-outline-dark btn-block  btn-sm  gtm-promo-banner" >View Details</a></div>
                                            </div>
                                        </div>
                                    </div>       
                                    <div className="item">
                                        <div className="currentOffers mx-3">
                                            <div className="row m-0">
                                                <div className="col-xs-4 col-sm-4 p-0">
                                                    <div className="discountHeading mt-3 px-0"><span className="upto">Up to</span>35%</div>
                                                </div>
                                                <div className="col-xs-8 col-sm-8">
                                                    <h3 className="help-heading m-0 pb-3">Savings on<br />Medicines</h3>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12">
                                                <p>Offer valid on all purchases, when you choose FlexiRewards</p>
                                                <div className="margin-t-b"><a href="javaScript:void(0);" title="View Details" className="btn btn-outline-dark btn-block  btn-sm  gtm-promo-banner" >View Details</a></div>
                                            </div>
                                        </div>
                                    </div>      
                                    <div className="item">
                                        <div className="currentOffers mx-3">
                                            <div className="row m-0">
                                                <div className="col-xs-4 col-sm-4 p-0">
                                                    <div className="discountHeading mt-3 px-0"><span className="upto">Up to</span>35%</div>
                                                </div>
                                                <div className="col-xs-8 col-sm-8">
                                                    <h3 className="help-heading m-0 pb-3">Savings on<br />Medicines</h3>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12">
                                                <p>Offer valid on all purchases, when you choose FlexiRewards</p>
                                                <div className="margin-t-b"><a href="javaScript:void(0);" title="View Details" className="btn btn-outline-dark btn-block  btn-sm  gtm-promo-banner"  >View Details</a></div>
                                            </div>
                                        </div>
                                    </div> 
                                    <div className="item">
                                    <div className="currentOffers mx-3">
                                        <div className="row m-0">
                                            <div className="col-xs-4 col-sm-4 p-0">
                                                <div className="discountHeading mt-3 px-0"><span className="upto">Up to</span>35%</div>
                                            </div>
                                            <div className="col-xs-8 col-sm-8">
                                                <h3 className="help-heading m-0 pb-3">Savings on<br />Medicines</h3>
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 ">
                                            <p>Offer valid on all purchases, when you choose FlexiRewards</p>
                                            <div className="margin-t-b"><a href="javaScript:void(0);" title="View Details" className="btn btn-outline-dark btn-block  btn-sm  gtm-promo-banner" >View Details</a></div>
                                        </div>
                                    </div>
                                </div> 
                                    <div className="item">
                                        <div className="currentOffers mx-3">
                                            <div className="row m-0">
                                                <div className="col-xs-4 col-sm-4 p-0">
                                                    <div className="discountHeading mt-3 px-0"><span className="upto">Up to</span>35%</div>
                                                </div>
                                                <div className="col-xs-8 col-sm-8">
                                                    <h3 className="help-heading m-0 pb-3">Savings on<br />Medicines</h3>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12">
                                                <p>Offer valid on all purchases, when you choose FlexiRewards</p>
                                                <div className="margin-t-b"><a href="javaScript:void(0);" title="View Details" className="btn btn-outline-dark btn-block  btn-sm  gtm-promo-banner" >View Details</a></div>
                                            </div>
                                        </div>
                                    </div>                                      
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default SliderOffer;