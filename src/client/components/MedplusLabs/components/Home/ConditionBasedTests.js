import React from 'react';
import Slider from "react-slick";
import SliderPrevArrow from "../Common/SliderPrevArrow";
import SliderNextArrow from "../Common/SliderNextArrow";
import LabCatalogService from "../../Services/LabCatalogService";
import LabCategoryDefaultIcons from "../../constants/LabCategoryDefaultIcons";
import { getCategoryNameForUrl } from '../../../../helpers/CommonUtil';
import { DiagnosticsCatalog } from '../../../../Analytics/Analytics'
import { DIAGNOSTICS_URL_PREFIX } from '../../constants/LabConstants';
import { Link } from 'react-router-dom';
import Validate from '../../../../helpers/Validate';

export default function ConditionBasedTests(props) {
    const [configuredCategoryData, setConfiguredCategoryData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true);
    const categoryId = props.categoryId;
    const defaultIcons = LabCategoryDefaultIcons();
    const labCatalogService = LabCatalogService();
    const validate = Validate();
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        swipeToSlide: true,
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
                    slidesToShow: 9,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 7,
                }
            }
        ]
    }

    const getSubCategoryAndTestsInfo = () => {
        setIsLoading(true)
        labCatalogService.getSubCategoryAndTestsInfo({ categoryId: categoryId, categoryType: 'CONFIGURED' }).then((response) => {
            if (validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.subCategories)) {
                setConfiguredCategoryData(response.dataObject.subCategories);
            }
            setIsLoading(false)
        }).catch(function (error) {
            console.log("Error while getting sub categories", error);
            setIsLoading(false)
        });
    }

    React.useEffect(() => {
        getSubCategoryAndTestsInfo()
    }, [])

    function getConditionBasedSlider() {
        return (
            <React.Fragment>
                {configuredCategoryData.map((each) => {
                    return (
                        <div key={each.categoryId}>
                            <Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/${getCategoryNameForUrl(each.name, each.categoryId)}`} title={each.name} aria-label={each.name} role="link" onClick={() => { DiagnosticsCatalog(props.sectionTitle, each.name) }}>
                                <div className="card">
                                    <div class="card-body p-2">
                                        <div className="img-container">
                                            {/* {each.image && <img src={each.image} alt={each.name} title={each.name} className="img-fluid" />}
                                                     {each.svg && <span dangerouslySetInnerHTML={{ __html: each.svg }}></span>}
                                                         {(!each.image && !each.svg) && <span dangerouslySetInnerHTML={{ __html: defaultIcons.getRelatedIcon(each.name) }}></span>} */}
                                            <span dangerouslySetInnerHTML={{ __html: defaultIcons.getRelatedIcon(each.name) }}></span>
                                        </div>
                                        <h6 class="card-title">{each.name}</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </React.Fragment>

            //  <Slider className="condition-based-test-slider custom-slide-arrows" {...settings}>
            //     {configuredCategoryData.map((each) => {
            //         return (
            //             <div className="item" key={each.categoryId}>
            //                 <Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/${getCategoryNameForUrl(each.name,each.categoryId)}`} title={each.name} aria-label={each.name} aria-role="button" onClick= {()=> {DiagnosticsCatalog(props.sectionTitle,each.name)}}>
            //                     <div className="card border-0">
            //                         <div class="card-body p-2">
            //                             <div className="img-container border">
            //                                 {/* {each.image && <img src={each.image} alt={each.name} title={each.name} className="img-fluid" />}
            //                                 {each.svg && <span dangerouslySetInnerHTML={{ __html: each.svg }}></span>}
            //                                 {(!each.image && !each.svg) && <span dangerouslySetInnerHTML={{ __html: defaultIcons.getRelatedIcon(each.name) }}></span>} */}
            //                                 <span dangerouslySetInnerHTML={{ __html: defaultIcons.getRelatedIcon(each.name) }}></span>
            //                             </div>
            //                             <h6 class="card-title">{each.name}</h6>
            //                         </div>
            //                     </div>
            //                 </Link>
            //             </div>
            //         )
            //     })}
            //  </Slider>
        )
    }
    if (isLoading) {
        return (
            <React.Fragment>
                {/* Ghost Image Here */}
                <section>
                    <div className='home-page-slider-container condition-based-test-slider p-4 d-flex' style={{ "gap": "1rem" }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(() => {
                            return (
                                <div className='card'>
                                    <div className='card-body p-2'>
                                        <div className='img-container'>
                                            <div className='ph-row ph-item mt-4 p-0'>
                                                <div className='ph-picture' style={{ "height": "3rem", "width": "3rem" }}></div>
                                            </div>
                                        </div>
                                        <div className="ph-row ph-item p-0 m-0 mb-4">
                                            <div className="ph-col-12 m-0"></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </React.Fragment>
        )

    } else
        return (
            <React.Fragment>
                {configuredCategoryData.length > 0 ?
                    (<React.Fragment>
                        <div className="d-flex align-items-center justify-content-between align-items-center mb-3">
                            <h5 className="m-0">{props.sectionTitle}</h5>
                            {/* {props.showViewAll && <button className="btn brand-secondary px-4" type="button">View All</button> } */}
                        </div>
                        <section>
                            <div className={"home-page-slider-container condition-based-test-slider p-3 d-flex"}>
                                {getConditionBasedSlider()}
                            </div>
                        </section>
                    </React.Fragment>)
                    : <React.Fragment></React.Fragment>
                }
            </React.Fragment>
        )
}
