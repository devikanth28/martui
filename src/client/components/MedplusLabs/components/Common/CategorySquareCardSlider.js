import React from "react";
import Slider from "react-slick";
import SliderPrevArrow from "./SliderPrevArrow";
import SliderNextArrow from "./SliderNextArrow";
import LabCatalogService from "../../Services/LabCatalogService";
import { getCategoryNameForUrl } from "../../../../helpers/CommonUtil";
import { DIAGNOSTICS_URL_PREFIX } from "../../constants/LabConstants";
import { Link } from "react-router-dom";
import FadeInSection from "../../../../MedplusMart/components/MartCatalog/ProductCategory/CategoryDetail/Fadein";

const CategorySquareCardSlider =(props) =>{
    const [isLoading,setIsLoading] = React.useState(true)
    const [categoryData,setCategoryData] = React.useState([])
    const labCatalogService = LabCatalogService()
    const imagesDict = {
        "BIOCHEMISTRY": "BioChemistry_test.svg",
        "CLINICALPATHOLOGY": "clinicalPathology_test.svg",
        "HEMATOLOGY": "Hematology_test.png",
        "MICROBIOLOGY": "Microbology_test.svg",
        "MOLECULARBIOLOGY": "MolecularBiology_test.svg",
        "PROFILEPARAMETERS": "ProfileParameters_test.svg",
        "SEROLOGY": "Serology_test.svg",
        "CTSCAN": "CtScan_test.png",
        "DIGITALXRAY": "DigitalXRay_test.png",
        "MAMOGRAPHY": "Mamography_test.png",
        "MRI": "Mri_test.png",
        "ULTRASOUND": "UltraSound_test.png",
        "Default": "Default.svg"
    }
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        swipeToSlide: true,
        variableWidth: false,
        prevArrow: <SliderPrevArrow/>,
        nextArrow: <SliderNextArrow/>,
        slidesToShow: 6,
        responsive: [
            {
                breakpoint: 1366,
                settings: {
                  slidesToShow: 5,
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
    }
    function getCategories(){
        setIsLoading(true)
        if(props.categoryType === "DERIVED"){
            labCatalogService.getSubCategories({categoryId:props.categoryId,categoryType: props.categoryType}).then((response)=>{
                if (response.dataObject) {
                    setCategoryData(response.dataObject);
                }
                setIsLoading(false)
            }).catch(function(error) {
                console.log("Error while getting sub categories", error);
                setIsLoading(false)
            });
        }else{
            labCatalogService.getSubCategoryAndTestsInfo({categoryId:props.categoryId,categoryType: props.categoryType}).then((response)=>{
                if (response.dataObject) {
                    setCategoryData(response.dataObject.subCategories);
                }
                setIsLoading(false)
            }).catch(function(error) {
                console.log("Error while getting sub categories", error);
                setIsLoading(false)
            });
        }
    }

    const getImageUrl=(imageName) => {
        return (imagesDict[imageName] || imagesDict["Default"])
    }
    React.useEffect(() => {
        getCategories();
    },[])

    function getSliderContent(sliderContent) {
        return(
        <Slider className="square-card-slider custom-slide-arrows" {...settings}>
                {sliderContent.map((each) => {
                    return (
                        <div className="item" key={each.categoryId}>
                            <div className="card mx-2 my-3">
                                <Link to={`${DIAGNOSTICS_URL_PREFIX}` + (props.categoryType==='CONFIGURED'? `/sub-category` : `/department`) + `/${getCategoryNameForUrl(each.name,each.categoryId)}`} aria-label={each.name} className="d-block no-underline" title={each.name}>
                                    <div class="card-body p-0">
                                            <div className="img-container" style={{ "minHeight": "111px" }}>
                                            <FadeInSection>
                                                <img src={each.image ? each.image : require(`../../../../images/common/${getImageUrl(each.name)}`)} alt={each.name} title={each.name} className="img-fluid" />
                                            </FadeInSection>
                                            </div>
                                    </div>
                                    <div className="card-footer bg-transparent py-2 px-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="mb-0 text-truncate">{each.name}</h6>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                                <g transform="translate(-906.838 786) rotate(-90)">
                                                    <rect fill="none" width="24" height="24" transform="translate(762 906.838)"/>
                                                    <path fill="#080808" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)"/>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        )
    }
    return(
        <React.Fragment>
            {!isLoading ? 
                ((categoryData && categoryData.length > 0) ?
                    <React.Fragment>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h5 className="m-0">{props.sectionTitle}</h5>
                        </div>
                        <section className=""> 
                            <div className={"department-slider-container py-2 px-4"}>
                                {getSliderContent(categoryData)}
                            </div>
                        </section>
                    </React.Fragment>
                    :
                    <React.Fragment></React.Fragment>
                )
                :
                <React.Fragment>
                    {/* Ghost Image Here */}
                    <div>
                        {/* <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="ph-row px-0 ph-item w-100">
                            <div className="ph-col-2" style={{"height":"1rem"}}></div>
                            </div>
                        </div> */}

                        <section>
                        <div className="ph-row px-0 ph-item mb-0 pb-0 pl-4">
                            <div className="ph-col-2 mb-0" style={{"height":"1rem"}}></div>
                            </div>
                            <div className="d-flex">
                                {[1, 2, 3, 4, 5].map(() => {
                                    return (
                                        <div className="ph-row ph-item p-4 mb-0" style={{ "width": "20%" }}>
                                            <div className="ph-picture mb-3" style={{ "height": "10rem" }}></div>
                                            <div className="ph-col-12" style={{ "height": "1rem" }}></div>
                                        </div>
                                    )
                                })}

                            {/* <div className="ph-row ph-item p-4 mb-0" style={{"width":"20%"}}>
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
                            </div> */}
                            </div>
                        </section>
                    </div>
                </React.Fragment>
            }
    </React.Fragment>
    )
}
export default CategorySquareCardSlider;