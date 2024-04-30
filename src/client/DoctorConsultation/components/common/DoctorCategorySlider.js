import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import {CATEGORY_LIST_TYPE_SYMPTOMS, CATEGORY_LIST_TYPE_SPECIALIZATIONS, getConsultationString, prepareCategories} from "../../constants/DoctorConsultationConstants";
import Validate from '../../../helpers/Validate';
import DoctorConsultationService from '../../services/DoctorConsultationService';
import SliderPrevArrow from "../../../components/MedplusLabs/components/Common/SliderPrevArrow";
import SliderNextArrow from "../../../components/MedplusLabs/components/Common/SliderNextArrow";
import CategorySliderGhostImage from "../moduleComponents/CategorySliderGhostImage";
import DoctorCategoryCard from './DoctorCategoryCard';

const DoctorCategorySlider = (props) => {

    const doctorConsultationService = DoctorConsultationService();
    const validate = Validate();
    const visitType = validate.isNotEmpty(props.visitType) ? props.visitType : '';
    const consultationType = getConsultationString(visitType);
    const categoryType = props.categoryListType == CATEGORY_LIST_TYPE_SYMPTOMS ? "symptoms" : "specialization";
    const [doctorCategoryLoader, setDoctorCategoryLoader] = useState(true);
    const [categories, setCategories] = useState([]);

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
        slidesToShow: props.showFullWidth ? 10 : 7,
        responsive: props.showFullWidth ? [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 8,
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
                    slidesToShow: 8,
                }
            }
        ] : [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 6,
                }
            },
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 6,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                }
            }
        ]
    }

    useEffect(() => {
        if (props.categoryListType == CATEGORY_LIST_TYPE_SYMPTOMS) {
            getSymptomsList();
        } else if (props.categoryListType == CATEGORY_LIST_TYPE_SPECIALIZATIONS) {
            getSpecializationsList();
        }
    }, []);

    const getSymptomsList = () => {
        setDoctorCategoryLoader(true);
        doctorConsultationService.getSymptomsList({consultationType: visitType}).then((response) => {
            if (validate.isNotEmpty(response) && response.statusCode == "SUCCESS") {
                let symptoms = response.dataObject.symptoms;
                setCategories(prepareCategories(props.categoryListType, ...symptoms));
                if (validate.isNotEmpty(props.setAvailable)) {
                    props.setAvailable(true);
                }
            } else {
                if (validate.isNotEmpty(props.setAvailable)) {
                    props.setAvailable(false);
                }
            }
            setDoctorCategoryLoader(false);
        }).catch(function (error) {
            console.log(error);
            setDoctorCategoryLoader(false);
            if (validate.isNotEmpty(props.setAvailable)) {
                props.setAvailable(false);
            }
        });
    }

    const getSpecializationsList = () => {
        setDoctorCategoryLoader(true);
        doctorConsultationService.getSpecializationsList({consultationType: visitType}).then((response) => {
            if (validate.isNotEmpty(response.dataObject) && response.statusCode === "SUCCESS") {
                let specialities = response.dataObject.specialities;
                setCategories(prepareCategories(props.categoryListType, ...specialities));
                if (validate.isNotEmpty(props.setAvailable)) {
                    props.setAvailable(true);
                }
            } else {
                if (validate.isNotEmpty(props.setAvailable)) {
                    props.setAvailable(false);
                }
            }
            setDoctorCategoryLoader(false);
        }).catch(function (error) {
            console.log(error);
            setDoctorCategoryLoader(false);
            if (validate.isNotEmpty(props.setAvailable)) {
                props.setAvailable(false);
            }
        });
    }

    const goToViewAllCategories = () => {
        props.history.push(`/doctorconsultation/allCategories/${categoryType}/${consultationType ? consultationType : ''}`);
    }

    const getConditionBasedSlider = () => {
        return (
            <React.Fragment>
                {categories.map((eachCategory) => {
                    return <div>
                        <DoctorCategoryCard sectionTitle={(props.categoryListType == CATEGORY_LIST_TYPE_SYMPTOMS) ? "By Symptoms" : "By Specialization"} category={eachCategory} categoryType={categoryType} consultationType={consultationType} history={props.history} /> 
                    </div>
                })}
            </React.Fragment>
            // <Slider className="condition-based-test-slider custom-slide-arrows inner-arrows" {...settings}>
            //     {categories.map((eachCategory) => {
            //         return <div className="item">
            //             <DoctorCategoryCard sectionTitle={(props.categoryListType == CATEGORY_LIST_TYPE_SYMPTOMS) ? "By Symptoms" : "By Specialization"} category={eachCategory} categoryType={categoryType} consultationType={consultationType} history={props.history} />
            //         </div>
            //     })}
            // </Slider>
        );
    }

    return (
        <React.Fragment>
            {!doctorCategoryLoader && validate.isNotEmpty(categories) &&
                <React.Fragment>
                    <div className="d-flex align-items-center justify-content-between align-items-center mb-3">
                        <h5 className="m-0">{(props.categoryListType == CATEGORY_LIST_TYPE_SYMPTOMS) ? "By Symptoms" : "By Specialization"}</h5>
                     {(props.showViewAll == undefined || props.showViewAll) && <button className="btn brand-secondary px-4 rounded-pill" onClick={() => goToViewAllCategories()} type="button" role="button">View All</button>}
                    </div>
                    <section  style={props.isHomePage ? {"height" : "calc(100% - 51px)"} : {}}>
                        <div className={props.isHomePage ? "h-100 d-flex align-items-center" : "d-flex align-items-center"}>
                            <div className={`w-100 ${props.isHomePage ? "condition-based-test-slider" : "doctor-category"} mb-0 p-3 d-flex`}>
                                {getConditionBasedSlider()}
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            }
            {doctorCategoryLoader && validate.isEmpty(categories) &&
                <CategorySliderGhostImage/>
            }
        </React.Fragment>
    );
}
export default DoctorCategorySlider;