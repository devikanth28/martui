import React, { useEffect, useState } from  'react';
import Validate from '../../helpers/Validate';
import Slider from "react-slick";
const TestCardSlider =(props) =>{
    const validate = Validate();
    const otherTestNameSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 250,
        initialSlide: 0,
        variableWidth: true,
    };
    const [selectedFilter, setSelectedFilter] = useState("");
    const selectFilterSettings ={
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        slidesToShow: 1,
        swipe: false,
        variableWidth: true,
        prevArrow: <FilterSliderPrevArrow/>,
        nextArrow: <FilterSliderNextArrow/>,
        slidesToShow: 6,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 5,
                }
              },
            {
                breakpoint: 1366,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                }
              },
              {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                }
              },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            }
          ]
    }
    const testSliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        swipe: false,
        variableWidth: false,
        prevArrow: <SliderPrevArrow/>,
        nextArrow: <SliderNextArrow/>,
        slidesToShow: 6,
        responsive: [
            {
                breakpoint: 1366,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 5,
                }
              },
              {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 3,
                }
              },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
              }
            }
          ]
    };
    useEffect(() => {
        if(validate.isNotEmpty(props.testFilters)){
            setSelectedFilter(props.testFilters[0])
        }
      });
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
      function FilterSliderPrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18">
                    <g transform="translate(-868.477 780) rotate(-90)">
                        <rect fill="none" width="18" height="18" transform="translate(762 868.477)"/>
                        <path fill="#080808" d="M60.371,465.782l-4.156,4.156a.942.942,0,0,0,1.332,1.332l3.49-3.48,3.491,3.491a.945.945,0,0,0,1.611-.666.936.936,0,0,0-.279-.666L61.7,465.782A.945.945,0,0,0,60.371,465.782Z" transform="translate(710.138 408.731)"/>
                    </g>
                </svg>
            </div>
        );
      }
      function FilterSliderNextArrow(props) {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="5.153" height="8.589" viewBox="0 0 5.153 8.589">
                    <path d="M6.431,13.461a.859.859,0,1,1,1.225-1.2l3.436,3.493a.859.859,0,0,1,0,1.2L7.772,20.332a.859.859,0,1,1-1.225-1.2l2.727-2.776Z" transform="translate(-6.184 -12)"/>
                </svg>
            </div>
        );
      }
    const getPopolarTestsSlider = (sliderData) => {
        return(
            <Slider className="popular-test-slider custom-slide-arrows" {...testSliderSettings}>
                {sliderData.map((each) => {
                    return (
                        <div className="item">
                            <div className="test-card card mx-3 my-4">
                                <div className="card-body p-2">
                                    <a href="javascript:void(0)" title={each.title}><h6 className="card-title">{each.title}
                                    </h6>
                                    </a>
                                    { props.showParameters && validate.isNotEmpty(each.otherNames) && each.otherNames.length > 0 && <React.Fragment>
                                            <small className="mb-2">Also known as:</small>
                                            <div className="other-test-names-container">
                                                {getOtherNames(each.otherNames)}
                                            </div>
                                        </React.Fragment>
                                    }
                                    {!props.showParameters && validate.isNotEmpty(each.includedParameters) && <React.Fragment>
                                        <p className="mb-3 text-secondary">Includes {each.includedParameters} Parameters</p>
                                        </React.Fragment>}
                                    <div className="d-flex mb-3">
                                        <h6 className="mb-0"><strong className="rupee">&#x20B9;</strong>&nbsp;{each.price}
                                        </h6>
                                        {validate.isNotEmpty(each.discountedPrice) && <p className="mb-0 text-secondary font-14 ml-2">&#x20B9;&nbsp;<del>{each.discountedPrice}</del></p>}
                                    </div>

                                    { <button type="button" className="btn btn-block btn-link-secondary btn-sm text-dark">Member Price&nbsp;&nbsp;<small>&#x20B9;</small>;&nbsp;30.00</button>}
                                </div>
                                
                                <div className="card-footer p-0"><button className="btn btn-brand btn-block" >Add to Cart</button></div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        )
        
    }
    function getOtherNames(otherNames) {
        var otherTestNames = otherNames.map((eachName, index) =>
            // <div className="item" key={index}>
                <button className={index == otherNames.length-1 ?"badge badge-pill border btn btn-sm":"badge badge-pill border btn btn-sm mr-1"} role="button">{eachName}</button>
            //</div>
        );
        return otherTestNames;
    }
    var testFiltersCards;
    function getFilters(testFilters) {
        testFiltersCards= testFilters.map((eachFilter, index) =>{
            <div className="item" key={index}>
                <button className={ selectedFilter == eachFilter ? "btn btn-badge active": "btn btn-badge"} role="button" onClick={()=>setSelectedFilter(eachFilter)}>{eachFilter}</button>
           </div>
       })
        return testFiltersCards;
    }
    return(
        <React.Fragment>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="m-0">{props.sectionTitle}</h5>
                {validate.isEmpty(props.testFilters) && <button onClick={()=>props.history.push("/viewAll")} className="btn brand-secondary px-4">View All</button>}
            </div>
            {validate.isNotEmpty(props.testFilters) && 
            <div className="d-flex align-items-center justify-content-between mb-3">

                <div className="test-filter-container w-50">
                    <Slider className="select-test-filter" {...selectFilterSettings}>
                             {props.testFilters.map((eachFilter, index) =>{
                                 return(<div className="item" key={index}>
                                     <button className={ selectedFilter == eachFilter ? "btn btn-badge active": "btn btn-badge"} role="button" onClick={()=>setSelectedFilter(eachFilter)}>{eachFilter}</button>
                                </div>
                                )
                            })}
                    </Slider>
                </div>
                <button  className="btn brand-secondary px-4">View All</button>
            </div>
            }
            <section className="shadow-none">
                <div className="home-page-slider-container">
                    {getPopolarTestsSlider(props.sliderData)}
                </div>
            </section>


            {/* Ghost Image */}

            <div className="d-none">

                <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent d-flex align-items-center justify-content-between">
                    <div className="ph-col-2 m-0"></div>
                    <div className="ph-col-2 m-0"></div>
                </div>
                <section className="shadow-none">
                    <div className="home-page-slider-container d-flex justify-content-around">

                        <div className="item" style={{ "width": "17%" }}>
                            <div className="test-card card mx-3 my-4">
                                <div className="card-body p-2">
                                    <a>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </a>
                                    <React.Fragment>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-6 m-0"></div></div>
                                        <div className="other-test-names-container">
                                            <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-4 m-0"></div></div>
                                        </div>
                                    </React.Fragment>
                                    <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-6 m-0"></div></div>

                                    <button type="button" className="btn btn-block btn-link-secondary btn-sm text-dark"><div className="ph-row ph-item p-0 my-2"><div className="ph-col-12 m-0"></div></div></button>
                                </div>
                                <div className="card-footer p-0"><a className="bg-white btn btn-block btn-link py-2 border-0"><div className="ph-row ph-item p-0 my-2"><div className="ph-col-12 m-0"></div></div></a></div>
                            </div>
                        </div>

                        <div className="item" style={{ "width": "17%" }}>
                            <div className="test-card card mx-3 my-4">
                                <div className="card-body p-2">
                                    <a>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </a>
                                    <React.Fragment>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-6 m-0"></div></div>
                                        <div className="other-test-names-container">
                                            <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-4 m-0"></div></div>
                                        </div>
                                    </React.Fragment>
                                    <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-6 m-0"></div></div>

                                    <button type="button" className="btn btn-block btn-link-secondary btn-sm text-dark"><div className="ph-row ph-item p-0 my-2"><div className="ph-col-12 m-0"></div></div></button>
                                </div>
                                <div className="card-footer p-0"><a className="bg-white btn btn-block btn-link py-2 border-0"><div className="ph-row ph-item p-0 my-2"><div className="ph-col-12 m-0"></div></div></a></div>
                            </div>
                        </div>


                        <div className="item" style={{ "width": "17%" }}>
                            <div className="test-card card mx-3 my-4">
                                <div className="card-body p-2">
                                    <a>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </a>
                                    <React.Fragment>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-6 m-0"></div></div>
                                        <div className="other-test-names-container">
                                            <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-4 m-0"></div></div>
                                        </div>
                                    </React.Fragment>
                                    <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-6 m-0"></div></div>

                                    <button type="button" className="btn btn-block btn-link-secondary btn-sm text-dark"><div className="ph-row ph-item p-0 my-2"><div className="ph-col-12 m-0"></div></div></button>
                                </div>
                                <div className="card-footer p-0"><a className="bg-white btn btn-block btn-link py-2 border-0"><div className="ph-row ph-item p-0 my-2"><div className="ph-col-12 m-0"></div></div></a></div>
                            </div>
                        </div>

                        <div className="item" style={{ "width": "17%" }}>
                            <div className="test-card card mx-3 my-4">
                                <div className="card-body p-2">
                                    <a>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </a>
                                    <React.Fragment>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-6 m-0"></div></div>
                                        <div className="other-test-names-container">
                                            <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-4 m-0"></div></div>
                                        </div>
                                    </React.Fragment>
                                    <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-6 m-0"></div></div>

                                    <button type="button" className="btn btn-block btn-link-secondary btn-sm text-dark"><div className="ph-row ph-item p-0 my-2"><div className="ph-col-12 m-0"></div></div></button>
                                </div>
                                <div className="card-footer p-0"><a className="bg-white btn btn-block btn-link py-2 border-0"><div className="ph-row ph-item p-0 my-2"><div className="ph-col-12 m-0"></div></div></a></div>
                            </div>
                        </div>

                        <div className="item" style={{ "width": "17%" }}>
                            <div className="test-card card mx-3 my-4">
                                <div className="card-body p-2">
                                    <a>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </a>
                                    <React.Fragment>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-6 m-0"></div></div>
                                        <div className="other-test-names-container">
                                            <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-4 m-0"></div></div>
                                        </div>
                                    </React.Fragment>
                                    <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-6 m-0"></div></div>

                                    <button type="button" className="btn btn-block btn-link-secondary btn-sm text-dark"><div className="ph-row ph-item p-0 my-2"><div className="ph-col-12 m-0"></div></div></button>
                                </div>
                                <div className="card-footer p-0"><a className="bg-white btn btn-block btn-link py-2 border-0"><div className="ph-row ph-item p-0 my-2"><div className="ph-col-12 m-0"></div></div></a></div>
                            </div>
                        </div>


                        <div className="item" style={{ "width": "17%" }}>
                            <div className="test-card card mx-3 my-4">
                                <div className="card-body p-2">
                                    <a>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-12 m-0"></div></div>
                                    </a>
                                    <React.Fragment>
                                        <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-6 m-0"></div></div>
                                        <div className="other-test-names-container">
                                            <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-4 m-0"></div></div>
                                        </div>
                                    </React.Fragment>
                                    <div className="ph-row ph-item p-0 m-0 mb-4"><div className="ph-col-6 m-0"></div></div>

                                    <button type="button" className="btn btn-block btn-link-secondary btn-sm text-dark"><div className="ph-row ph-item p-0 my-2"><div className="ph-col-12 m-0"></div></div></button>
                                </div>
                                <div className="card-footer p-0"><a className="bg-white btn btn-block btn-link py-2 border-0"><div className="ph-row ph-item p-0 my-2"><div className="ph-col-12 m-0"></div></div></a></div>
                            </div>
                        </div>


                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}
export default TestCardSlider;
