import React from "react"
import Slider from "react-slick";

const SquareCardSlider =(props) =>{
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        swipe: false,
        variableWidth: false,
        prevArrow: <SliderPrevArrow/>,
        nextArrow: <SliderNextArrow/>,
        slidesToShow: 5,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
              }
            }
          ]
    }
    function SliderPrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(-868.477 786) rotate(-90)"><rect fill="none" width="24" height="24" transform="translate(762 868.477)"/><path fill="#e71c37" d="M61.848,465.874l-5.541,5.541a1.256,1.256,0,1,0,1.776,1.776l4.653-4.64,4.655,4.655a1.261,1.261,0,0,0,2.149-.888,1.248,1.248,0,0,0-.373-.888l-5.543-5.556A1.26,1.26,0,0,0,61.848,465.874Z" transform="translate(711.498 410.651)"/></g></svg>
            </div>
        );
      }
      function SliderNextArrow(props) {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(-906.838 786) rotate(-90)"><rect fill="none" width="24" height="24" transform="translate(762 906.838)"/><path fill="#e71c37" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)"/></g></svg>
            </div>
        );
      }
      function getSliderContent(sliderContent) {
        return(
        <Slider className="square-card-slider custom-slide-arrows" {...settings}>
                {sliderContent.map((each) => {
                    return (
                        <div className="item" onClick={()=>props.history.push("/labCategoryPage")}>
                            <a href="javascript:void(0)" title={each.title}>
                                <div className="card mx-3 my-4">
                                    <div class="card-body p-2">
                                        <div className="img-container" style={{minHeight:'170px'}}>
                                            <img src={each.imageSrc} alt={each.title} title={each.title} className="img-fluid"/>
                                        </div>
                                    </div>
                                    <div className="card-footer p-0">
                                        <div className="d-flex justify-content-between align-items-center py-2 px-3 bg-white">
                                            <h6 className="mb-0">{each.title}</h6>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                                <g transform="translate(-906.838 786) rotate(-90)">
                                                    <rect fill="none" width="24" height="24" transform="translate(762 906.838)"/>
                                                    <path fill="#080808" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)"/>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    );
                })}
            </Slider>
        )
    }
    return(
        <React.Fragment>
        <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="m-0">{props.sliderTitle}</h5>
        </div>
        <section className="shadow-none"> 
            <div className="department-slider-container">
                {getSliderContent(props.sliderContent)}
            </div>
        </section>
        
        
        
          {/* Ghost Image Here */}
            <div class="d-none">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="ph-row px-0 ph-item w-100 bg-light">
                <div className="ph-col-4"></div>
                </div>
            </div>

            <section>
                <div className="d-flex">
                <div className="ph-row ph-item p-4 mb-0" style={{"width":"20%"}}>
                    <div className="ph-picture mb-3" style={{ "height": "10rem" }}></div>
                    <div className="ph-col-12"></div>
                </div>

                <div className="ph-row ph-item p-4 mb-0" style={{"width":"20%"}}>
                    <div className="ph-picture mb-3" style={{ "height": "10rem" }}></div>
                    <div className="ph-col-12"></div>
                </div>


                <div className="ph-row ph-item p-4 mb-0" style={{"width":"20%"}}>
                    <div className="ph-picture mb-3" style={{ "height": "10rem" }}></div>
                    <div className="ph-col-12"></div>
                </div>

                <div className="ph-row ph-item p-4 mb-0" style={{"width":"20%"}}>
                    <div className="ph-picture mb-3" style={{ "height": "10rem" }}></div>
                    <div className="ph-col-12"></div>
                </div>

                <div className="ph-row ph-item p-4 mb-0" style={{"width":"20%"}}>
                    <div className="ph-picture mb-3" style={{ "height": "10rem" }}></div>
                    <div className="ph-col-12"></div>
                </div>
                </div>
            </section>
            </div>
    </React.Fragment>
    )
}
export default SquareCardSlider;