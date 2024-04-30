import React,{useState} from 'react';
import Slider from 'react-slick';
import SliderNextArrow from '../../../../../components/MedplusLabs/components/Common/SliderNextArrow';
import SliderPrevArrow from '../../../../../components/MedplusLabs/components/Common/SliderPrevArrow';
import { Modal, ModalBody } from 'reactstrap';
// import PharmaModal from './PharmaModal';
const PharmaBannerSlider = (props) => {
    const  [isopen, setOpen] = useState(false);
    const [imageURL,setImageURL] = useState();
    const [longDescription,setLongDescription] = useState();
    const toggleChangeAddressModal = () =>{ setOpen(!isopen);}
    const banners = props.banners;
    const setImageURLAndPopupState = (isOpenState,imageURLVal,longDesc) =>{
        setOpen(isOpenState);
        setImageURL(imageURLVal); 
        setLongDescription(longDesc);
    }
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
        {/* <PharmaModal isopen={isopen} toggleChangeAddressModal= {toggleChangeAddressModal} /> */}
            <section className="shadow-none">
                <div className="card border-0">
                    <div className="card-body px-3 pt-3 pb-0">
                        <h5 className="mb-0">Current Offers</h5>
                        <div className="custom-slide-arrows d-block p-0 mb-0">
                            <div className="content w-100 p-3 ">
                                <Slider {...settings}>
                                    {Object.entries(banners).map(([key,value]) =>{
                                        return(
                                        <div className="item">
                                        <div className="currentOffers mx-3">
                                            <div className="row no-gutters" dangerouslySetInnerHTML={{ __html: value["subTextLine1"] }}>
                                            </div>
                                            <div className="col-xs-12 col-sm-12">
                                                <p>{value["subTextLine2"]}</p>
                                                <div className="margin-t-b"><a href="javaScript:void(0);" title="View Details" onClick ={()=> setImageURLAndPopupState(!isopen,value["imagePath"],value["longDescription"])} className="btn btn-outline-dark btn-block btn-sm gtm-promo-banner rounded-pill custom-btn-lg" >View Details</a></div>
                                            </div>
                                        </div>
                                    </div>  ) 
                                    })}
                                        
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {isopen && 
            <React.Fragment>
            <Modal className="modal-lg  modal-dialog-centered offersDialog" backdrop="static" isOpen={isopen} toggle={true}>
                <ModalBody className='p-0'>
                    <div>
                                <button type="button" className="close icons" onClick={toggleChangeAddressModal} style={{"right":"0px"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <rect fill="none" width="24" height="24"></rect>
                                        <path d="M20.76,19.55l-7.58-7.56,7.56-7.56a.846.846,0,0,0-.04-1.18.822.822,0,0,0-1.13,0L12,10.81,4.44,3.24A.827.827,0,0,0,3.27,4.41l7.56,7.58L3.27,19.55a.835.835,0,0,0,1.14,1.22l.04-.04L12,13.17l7.56,7.56a.833.833,0,0,0,1.17,0h0a.821.821,0,0,0,.04-1.16A.031.031,0,0,0,20.76,19.55Z"></path>
                                    </svg>
                                </button>
                        <div className="row m-0">
                            <div className="col-xs-12 col-sm-4 offerModalinfo">
                                <div className="py-3">
                                    <img className="img-fluid" src={imageURL} alt="FlexiRewards Offer" />
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-8 promotionOffers mt-3" dangerouslySetInnerHTML={{ __html: longDescription }}>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>}
        </React.Fragment>
        
    );
}

export default PharmaBannerSlider;