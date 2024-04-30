import React from 'react';
import Slider from "react-slick";
const ConditionBasedTestSlider = (props) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        swipe: false,
        variableWidth: false,
        prevArrow: <SliderPrevArrow />,
        nextArrow: <SliderNextArrow />,
        slidesToShow: 12,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 10,
                }
            },
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 8,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
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
    function getConditionBasedSlider(conditionBasedTestJson) {
        return (
            <Slider className="condition-based-test-slider custom-slide-arrows" {...settings}>
                {conditionBasedTestJson.map((each) => {
                    return (
                        <div className="item">
                            <a href="javascript:void(0)" title={each.title}>
                                <div className="card border-0">
                                    <div class="card-body p-2">
                                        <div className="img-container border">
                                            {each.type == 'image' && <img src={each.imageSrc} alt={each.title} title={each.title} className="img-fluid" />}
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
            <div className="d-flex align-items-center justify-content-between align-items-center mb-3">
                <h5 className="m-0">{props.sectionTitle}</h5>
                {props.showViewAll && <button className="btn brand-secondary px-4" type="button">view All</button> }
            </div>
            <section className="shadow-none">
                <div className="home-page-slider-container condition-based-test-slider pt-3">
                    {getConditionBasedSlider(props.conditionBasedTestJson)}
                </div>
            </section>


            {/* Ghost Image Here */}

            <div className="d-none">
            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent"><div className="ph-col-2 m-0"></div></div>
            <section className="shadow-none">
            <div className="home-page-slider-container condition-based-test-slider pt-3 d-flex justify-content-around">
                    <div className="item">
                            <a>
                                <div className="card border-0">
                                    <div class="card-body p-2">
                                        <div className="img-container border">
                                        <div className="ph-row m-4">
                                            <div className="ph-picture m-0" style={{ "height": "40px", "width": "40px" }}></div>
                                        </div>
                                        </div>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <a>
                                <div className="card border-0">
                                    <div class="card-body p-2">
                                        <div className="img-container border">
                                        <div className="ph-row m-4">
                                            <div className="ph-picture m-0" style={{ "height": "40px", "width": "40px" }}></div>
                                        </div>
                                        </div>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <a>
                                <div className="card border-0">
                                    <div class="card-body p-2">
                                        <div className="img-container border">
                                        <div className="ph-row m-4">
                                            <div className="ph-picture m-0" style={{ "height": "40px", "width": "40px" }}></div>
                                        </div>
                                        </div>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <a>
                                <div className="card border-0">
                                    <div class="card-body p-2">
                                        <div className="img-container border">
                                        <div className="ph-row m-4">
                                            <div className="ph-picture m-0" style={{ "height": "40px", "width": "40px" }}></div>
                                        </div>
                                        </div>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <a>
                                <div className="card border-0">
                                    <div class="card-body p-2">
                                        <div className="img-container border">
                                        <div className="ph-row m-4">
                                            <div className="ph-picture m-0" style={{ "height": "40px", "width": "40px" }}></div>
                                        </div>
                                        </div>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <a>
                                <div className="card border-0">
                                    <div class="card-body p-2">
                                        <div className="img-container border">
                                        <div className="ph-row m-4">
                                            <div className="ph-picture m-0" style={{ "height": "40px", "width": "40px" }}></div>
                                        </div>
                                        </div>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <a>
                                <div className="card border-0">
                                    <div class="card-body p-2">
                                        <div className="img-container border">
                                        <div className="ph-row m-4">
                                            <div className="ph-picture m-0" style={{ "height": "40px", "width": "40px" }}></div>
                                        </div>
                                        </div>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <a>
                                <div className="card border-0">
                                    <div class="card-body p-2">
                                        <div className="img-container border">
                                        <div className="ph-row m-4">
                                            <div className="ph-picture m-0" style={{ "height": "40px", "width": "40px" }}></div>
                                        </div>
                                        </div>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <a>
                                <div className="card border-0">
                                    <div class="card-body p-2">
                                        <div className="img-container border">
                                        <div className="ph-row m-4">
                                            <div className="ph-picture m-0" style={{ "height": "40px", "width": "40px" }}></div>
                                        </div>
                                        </div>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <a>
                                <div className="card border-0">
                                    <div class="card-body p-2">
                                        <div className="img-container border">
                                        <div className="ph-row m-4">
                                            <div className="ph-picture m-0" style={{ "height": "40px", "width": "40px" }}></div>
                                        </div>
                                        </div>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="item">
                            <a>
                                <div className="card border-0">
                                    <div class="card-body p-2">
                                        <div className="img-container border">
                                        <div className="ph-row m-4">
                                            <div className="ph-picture m-0" style={{ "height": "40px", "width": "40px" }}></div>
                                        </div>
                                        </div>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </div>
                                </div>
                            </a>
                        </div>
            </div>
            </section>
            </div>
        </React.Fragment>
    )
}
export default ConditionBasedTestSlider;