import React from 'react';
import Slider from 'react-slick';
function RelatedArticlesSlider(props) {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        initialSlide: 0,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        pauseOnHover: true,
        swipe: true,
        swipeToSlide: true
    }
    return (
        <React.Fragment>
            <section className="shadow-none">
                <div className="card border-0">
                    <div className="card-body px-3 pt-3 pb-0">
                        <h5 className="mb-0">Related Articles</h5>
                        <small className="text-secondary">Knowledge sharing is important to us...</small>
                        <div className="lab-customer-review-container d-block p-0 mb-0">
                            <div className="content w-100 py-3 px-0">
                                <Slider className="customer-feedback-slider" {...settings}>
                                    <div className="item mb-n3">
                                        <div>
                                            <h6>The Different Types Of Covid-19 Tests</h6>
                                            <p className="text-secondary font-14">by MedPlus Team, June 17, 2021 <span className="mx-2">|</span>
                                                <a href="javascript:void(0)" className="text-primary no-underline">Share
                                                    <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                        <g id="leftchevron_black_icon_24px" transform="translate(16.321 0) rotate(90)">
                                                            <rect id="Rectangle_4722" data-name="Rectangle 4722" width="16" height="16" transform="translate(0 0.321)" fill="none" />
                                                            <path id="Icon_material-share" data-name="Icon material-share" d="M6.777,6.361a1.316,1.316,0,0,0-.886.348L2.67,4.834a1.479,1.479,0,0,0,.041-.316A1.479,1.479,0,0,0,2.67,4.2L5.855,2.345a1.352,1.352,0,1,0-.434-.989,1.479,1.479,0,0,0,.041.316L2.277,3.529a1.355,1.355,0,1,0,0,1.979l3.217,1.88a1.275,1.275,0,0,0-.036.294A1.319,1.319,0,1,0,6.777,6.361Z" transform="translate(4 12.65) rotate(-90)" fill="#007bff" />
                                                        </g>
                                                    </svg>
                                                </a>
                                            </p>
                                            <span className="d-block mb-2">I booked Master Health Checkup from MedPlus Lab. They came right on time and the report was delivered on the same day. Their prices are also very reasonable considering the quality of service which they provide.</span>
                                            <a className="btn btn-link no-underline px-0" href="javascript:void(0)" title="Read Full Article">
                                                Read Full Article
                                                <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                    <g id="leftchevron_black_icon_24px" transform="translate(16 0) rotate(90)">
                                                        <rect id="Rectangle_4722" data-name="Rectangle 4722" width="16" height="16" transform="translate(0 0)" fill="none" />
                                                        <path id="Path_23401" data-name="Path 23401" d="M3.938.244.243,3.938A.837.837,0,0,0,1.427,5.122l3.1-3.093,3.1,3.1A.84.84,0,0,0,9.065,4.54a.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,3.938.244Z" transform="translate(3.626 5.355)" fill="#e71c37" />
                                                    </g>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="item mb-n3">
                                        <div>
                                            <h6>The Different Types Of Covid-19 Tests</h6>
                                            <p className="text-secondary font-14">by MedPlus Team, June 17, 2021 <span className="mx-2">|</span>
                                                <a href="javascript:void(0)" className="text-primary no-underline">Share
                                                    <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                        <g id="leftchevron_black_icon_24px" transform="translate(16.321 0) rotate(90)">
                                                            <rect id="Rectangle_4722" data-name="Rectangle 4722" width="16" height="16" transform="translate(0 0.321)" fill="none" />
                                                            <path id="Icon_material-share" data-name="Icon material-share" d="M6.777,6.361a1.316,1.316,0,0,0-.886.348L2.67,4.834a1.479,1.479,0,0,0,.041-.316A1.479,1.479,0,0,0,2.67,4.2L5.855,2.345a1.352,1.352,0,1,0-.434-.989,1.479,1.479,0,0,0,.041.316L2.277,3.529a1.355,1.355,0,1,0,0,1.979l3.217,1.88a1.275,1.275,0,0,0-.036.294A1.319,1.319,0,1,0,6.777,6.361Z" transform="translate(4 12.65) rotate(-90)" fill="#007bff" />
                                                        </g>
                                                    </svg>
                                                </a>
                                            </p>
                                            <span className="d-block mb-2">I booked Master Health Checkup from MedPlus Lab. They came right on time and the report was delivered on the same day. Their prices are also very reasonable considering the quality of service which they provide.</span>
                                            <a className="btn btn-link no-underline px-0" href="javascript:void(0)" title="Read Full Article">
                                                Read Full Article
                                                <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                    <g id="leftchevron_black_icon_24px" transform="translate(16 0) rotate(90)">
                                                        <rect id="Rectangle_4722" data-name="Rectangle 4722" width="16" height="16" transform="translate(0 0)" fill="none" />
                                                        <path id="Path_23401" data-name="Path 23401" d="M3.938.244.243,3.938A.837.837,0,0,0,1.427,5.122l3.1-3.093,3.1,3.1A.84.84,0,0,0,9.065,4.54a.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,3.938.244Z" transform="translate(3.626 5.355)" fill="#e71c37" />
                                                    </g>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="item mb-n3">
                                        <div>
                                            <h6>The Different Types Of Covid-19 Tests</h6>
                                            <p className="text-secondary font-14">by MedPlus Team, June 17, 2021 <span className="mx-2">|</span>
                                                <a href="javascript:void(0)" className="text-primary no-underline">Share
                                                    <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                        <g id="leftchevron_black_icon_24px" transform="translate(16.321 0) rotate(90)">
                                                            <rect id="Rectangle_4722" data-name="Rectangle 4722" width="16" height="16" transform="translate(0 0.321)" fill="none" />
                                                            <path id="Icon_material-share" data-name="Icon material-share" d="M6.777,6.361a1.316,1.316,0,0,0-.886.348L2.67,4.834a1.479,1.479,0,0,0,.041-.316A1.479,1.479,0,0,0,2.67,4.2L5.855,2.345a1.352,1.352,0,1,0-.434-.989,1.479,1.479,0,0,0,.041.316L2.277,3.529a1.355,1.355,0,1,0,0,1.979l3.217,1.88a1.275,1.275,0,0,0-.036.294A1.319,1.319,0,1,0,6.777,6.361Z" transform="translate(4 12.65) rotate(-90)" fill="#007bff" />
                                                        </g>
                                                    </svg>
                                                </a>
                                            </p>
                                            <span className="d-block mb-2">I booked Master Health Checkup from MedPlus Lab. They came right on time and the report was delivered on the same day. Their prices are also very reasonable considering the quality of service which they provide.</span>
                                            <a className="btn btn-link no-underline px-0" href="javascript:void(0)" title="Read Full Article">
                                                Read Full Article
                                                <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                    <g id="leftchevron_black_icon_24px" transform="translate(16 0) rotate(90)">
                                                        <rect id="Rectangle_4722" data-name="Rectangle 4722" width="16" height="16" transform="translate(0 0)" fill="none" />
                                                        <path id="Path_23401" data-name="Path 23401" d="M3.938.244.243,3.938A.837.837,0,0,0,1.427,5.122l3.1-3.093,3.1,3.1A.84.84,0,0,0,9.065,4.54a.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,3.938.244Z" transform="translate(3.626 5.355)" fill="#e71c37" />
                                                    </g>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="item mb-n3">
                                        <div>
                                            <h6>The Different Types Of Covid-19 Tests</h6>
                                            <p className="text-secondary font-14">by MedPlus Team, June 17, 2021 <span className="mx-2">|</span>
                                                <a href="javascript:void(0)" className="text-primary no-underline">Share
                                                    <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                        <g id="leftchevron_black_icon_24px" transform="translate(16.321 0) rotate(90)">
                                                            <rect id="Rectangle_4722" data-name="Rectangle 4722" width="16" height="16" transform="translate(0 0.321)" fill="none" />
                                                            <path id="Icon_material-share" data-name="Icon material-share" d="M6.777,6.361a1.316,1.316,0,0,0-.886.348L2.67,4.834a1.479,1.479,0,0,0,.041-.316A1.479,1.479,0,0,0,2.67,4.2L5.855,2.345a1.352,1.352,0,1,0-.434-.989,1.479,1.479,0,0,0,.041.316L2.277,3.529a1.355,1.355,0,1,0,0,1.979l3.217,1.88a1.275,1.275,0,0,0-.036.294A1.319,1.319,0,1,0,6.777,6.361Z" transform="translate(4 12.65) rotate(-90)" fill="#007bff" />
                                                        </g>
                                                    </svg>
                                                </a>
                                            </p>
                                            <span className="d-block mb-2">I booked Master Health Checkup from MedPlus Lab. They came right on time and the report was delivered on the same day. Their prices are also very reasonable considering the quality of service which they provide.</span>
                                            <a className="btn btn-link no-underline px-0" href="javascript:void(0)" title="Read Full Article">
                                                Read Full Article
                                                <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                    <g id="leftchevron_black_icon_24px" transform="translate(16 0) rotate(90)">
                                                        <rect id="Rectangle_4722" data-name="Rectangle 4722" width="16" height="16" transform="translate(0 0)" fill="none" />
                                                        <path id="Path_23401" data-name="Path 23401" d="M3.938.244.243,3.938A.837.837,0,0,0,1.427,5.122l3.1-3.093,3.1,3.1A.84.84,0,0,0,9.065,4.54a.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,3.938.244Z" transform="translate(3.626 5.355)" fill="#e71c37" />
                                                    </g>
                                                </svg>
                                            </a>
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

export default RelatedArticlesSlider;