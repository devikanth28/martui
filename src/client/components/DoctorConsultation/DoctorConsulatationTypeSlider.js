import React from 'react';
import DoctorCard from "./DoctorCard"
import Slider from "react-slick";

const DoctorConsulatationTypeSlider = (props) => {

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
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            }
        ]
    }
    function SliderPrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(-868.477 786) rotate(-90)"><rect fill="none" width="24" height="24" transform="translate(762 868.477)" /><path fill="#e71c37" d="M61.848,465.874l-5.541,5.541a1.256,1.256,0,1,0,1.776,1.776l4.653-4.64,4.655,4.655a1.261,1.261,0,0,0,2.149-.888,1.248,1.248,0,0,0-.373-.888l-5.543-5.556A1.26,1.26,0,0,0,61.848,465.874Z" transform="translate(711.498 410.651)" /></g></svg>
            </div>
        );
    }
    function SliderNextArrow(props) {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(-906.838 786) rotate(-90)"><rect fill="none" width="24" height="24" transform="translate(762 906.838)" /><path fill="#e71c37" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" /></g></svg>
            </div>
        );
    }
    function getDoctorsSlider() {
        return (
            <Slider className="condition-based-test-slider custom-slide-arrows inner-arrows" {...settings}>
                 {getDoctorCards()}
            </Slider>
        )
    }
    function getDoctorCards(){
        return(
            [1,2,3,4,5,6,7].map((each)=>{
                return(
                    <React.Fragment>
                        <div className="item px-2">
                            <DoctorCard history={props.history} isOnline ={props.isOnline} isWalkin = {props.isWalkin}/> 
                        </div>
                    </React.Fragment>
                    
                )
            })
        )
    }


    return (
        <React.Fragment>
            <section className="shadow-none">
                <div className='p-3'>
                    <div className="d-flex align-items-center justify-content-between align-items-center mb-3">
                        <h5 className="m-0">{props.title}</h5>
                        <button className="btn brand-secondary px-4 rounded-pill" type="button">view All</button>
                    </div>
                    <div className="doctor-list-container mx-0 d-block pb-3 mx-n3">
                        <div>
                            {getDoctorsSlider()}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default DoctorConsulatationTypeSlider