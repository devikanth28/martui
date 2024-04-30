import React from "react"
import Slider from "react-slick";
import Validate from '../../helpers/Validate';
const CategoryProducts =(props) =>{
    const validate = Validate();
    const otherTestNameSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 250,
        initialSlide: 0,
        variableWidth: true,
    };
    function getOtherNames(otherNames) {
        var otherTestNames = otherNames.map((eachName, index) =>
            //<div className="item" key={index}>
                <button className="badge badge-pill border btn btn-sm" role="button">{eachName}</button>
            //</div>
        );
        return otherTestNames;
    }
    const getProductsCards = (productsList)=>{
        var productsCards = productsList.map((each, index) =>
            <div className="each-test-card">
                <div className="test-card card mx-2">
                    <div class="card-body p-2">
                        <a href="javascript:void(0)" title={each.title}><h6 class="card-title">{each.title}</h6></a>
                        {validate.isNotEmpty(each.otherNames) && each.otherNames.length > 0 && <React.Fragment>
                                <small className="mb-2">Also known as:</small>
                                {/* <Slider className="other-test-names-carousel mb-3" {...otherTestNameSettings}> */}
                               <div className='other-test-names-container'> 
                                    {getOtherNames(each.otherNames)}
                                </div>
                                {/* </Slider> */}
                            </React.Fragment>
                        }
                        <div className="d-flex align-items-center mb-3">
                            <h6 className="mb-0"><strong className="rupee">&#x20B9;</strong>&nbsp;{each.price}</h6>
                            {validate.isNotEmpty(each.discountedPrice) && <p className="mb-0 text-secondary font-14 ml-2">&#x20B9;&nbsp;<del>{each.discountedPrice}</del></p>}
                        </div>

                        {/* {validate.isNotEmpty(each.couponAvailable) && <p className="text-success mt-2 mb-2 small">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" className="mr-2 align-text-top">
                                <g transform="translate(0.198 -0.206)">
                                    <rect fill="none" width="18" height="18" transform="translate(-0.198 0.206)"></rect>
                                    <path fill="#08CE73" d="M9,18a1.663,1.663,0,0,1-1.137-.444L6.719,16.493a.561.561,0,0,0-.383-.149.589.589,0,0,0-.08.005l-1.578.214a1.722,1.722,0,0,1-.234.015,1.612,1.612,0,0,1-1.606-1.3l-.274-1.506a.529.529,0,0,0-.286-.377L.871,12.682a1.533,1.533,0,0,1-.7-2.075l.7-1.373a.507.507,0,0,0,0-.466l-.7-1.373A1.505,1.505,0,0,1,.074,6.237a1.578,1.578,0,0,1,.8-.918L2.278,4.6a.53.53,0,0,0,.286-.377L2.839,2.72a1.612,1.612,0,0,1,1.6-1.3,1.747,1.747,0,0,1,.235.016l1.578.214a.594.594,0,0,0,.078.005.563.563,0,0,0,.384-.149L7.863.444a1.679,1.679,0,0,1,2.273,0l1.145,1.063a.564.564,0,0,0,.385.15.592.592,0,0,0,.078-.005l1.578-.214a1.744,1.744,0,0,1,.235-.016,1.613,1.613,0,0,1,1.6,1.3l.274,1.5a.53.53,0,0,0,.286.378l1.407.716a1.578,1.578,0,0,1,.8.918,1.505,1.505,0,0,1-.095,1.157l-.7,1.373a.507.507,0,0,0,0,.466l.7,1.373a1.533,1.533,0,0,1-.7,2.075l-1.407.716a.529.529,0,0,0-.286.377l-.274,1.506a1.613,1.613,0,0,1-1.606,1.3,1.75,1.75,0,0,1-.234-.016l-1.578-.214a.589.589,0,0,0-.08-.005.561.561,0,0,0-.383.149l-1.145,1.063A1.663,1.663,0,0,1,9,18Zm2.339-8.329A2.025,2.025,0,1,0,13.363,11.7,2.027,2.027,0,0,0,11.339,9.671Zm2.148-4.3a.406.406,0,0,0-.254.09l-8.5,6.881a.4.4,0,1,0,.509.629l8.5-6.88a.405.405,0,0,0-.256-.72Zm-6.6-.969A2.025,2.025,0,1,0,8.909,6.431,2.027,2.027,0,0,0,6.884,4.406Zm4.455,8.5A1.215,1.215,0,1,1,12.554,11.7,1.216,1.216,0,0,1,11.339,12.911ZM6.884,7.646A1.215,1.215,0,1,1,8.1,6.431,1.216,1.216,0,0,1,6.884,7.646Z" transform="translate(-0.198 0.206)"></path>
                                </g>
                            </svg>
                            {each.couponAvailable}
                        </p>} */}
                          { <button type="button" className="btn btn-block btn-link-secondary btn-sm text-dark">Member Price&nbsp;&nbsp;<small>&#x20B9;</small>&nbsp;30.00</button> }
                    </div>
                    <div className="card-footer p-0"><button role="button" className="btn btn-block btn-brand-gradient rounded-pill">Add to Cart</button></div>
                </div>
            </div>
        );
        return productsCards;
    }
    return(
        <React.Fragment>
            <div className="align-items-center d-flex justify-content-between mb-4">
                <div>
                    <strong className="font-14">Sort By:</strong>
                    <button className="btn border-sort-btn active">Popularity</button>
                    <button className="btn border-sort-btn">High Price</button>
                    <button className="btn border-sort-btn">Low Price</button>
                </div>
                <p className="mb-0 font-14 text-secondary">140 Items</p>
            </div>
            <div className="test-card-container">
                {getProductsCards(props.productsList)}
            </div>
            <button className="brand-secondary btn px-5 rounded-pill">Load More (18 Products)</button>
            

            {/* <TestCardSlider testFilters={PopularHealthTestFiltersJson} sectionTitle="Popular Diagnostic Tests" sliderData ={ PopularTestJson }/> */}
            {/* Ghost Image */}

            <div className="d-none">

                <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent d-flex align-items-center justify-content-between">
                    <div className="ph-col-2 m-0"></div>
                    <div className="ph-col-2 m-0"></div>
                </div>
                <section className="shadow-none">
                    <div className="home-page-slider-container d-flex justify-content-around p-0">

                        <div className="item" style={{ "width": "20%" }}>
                            <div className="test-card card mr-2 my-4">
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

                        <div className="item" style={{ "width": "20%" }}>
                            <div className="test-card card mx-2 my-4">
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


                        <div className="item" style={{ "width": "20%" }}>
                            <div className="test-card card mx-2 my-4">
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

                        <div className="item" style={{ "width": "20%" }}>
                            <div className="test-card card mx-2 my-4">
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

                        <div className="item" style={{ "width": "20%" }}>
                            <div className="test-card card ml-2 my-4">
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
export default CategoryProducts;