import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import SliderNextArrow from '../../../components/MedplusLabs/components/Common/SliderNextArrow';
import SliderPrevArrow from '../../../components/MedplusLabs/components/Common/SliderPrevArrow';
import { getDecodedURL } from '../../../helpers/CommonUtil';
import Validate from '../../../helpers/Validate';
import DoctorConsultationService from '../../services/DoctorConsultationService';
import DoctorImage from './DoctorImage';

export default (props) => {

  const sliderCategoryPageResponsive = {
    "home": [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      }
    ],
    "category": [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 8,
        }
      }
    ]
  }
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    swipe: true,
    swipeToSlide: true,
    variableWidth: false,
    prevArrow: <SliderPrevArrow />,
    nextArrow: <SliderNextArrow />,
    slidesToShow: ((props.source == "category" || props.showFullWidth) ? 9 : 3),
    responsive: ((props.source == "category" || props.showFullWidth) ? sliderCategoryPageResponsive.category : sliderCategoryPageResponsive.home)
  }
  const getSliderContent = () => {
    return (
      <Slider className="doctor-slider custom-slide-arrows inner-arrows" {...sliderSettings}>
        {doctors.map((doctor, index) => {
          return (
            <div className="item" key={index}>
              <a href={'/doctorconsultation/doctor/' + getDecodedURL(doctor.name).toLowerCase() + '_' + doctor.doctorId} aria-label={doctor.name} title={doctor.name}>
                <div className={props.isHomePage ? "card m-2" : "card"}>
                  <div className="card-body p-2">
                    <div className={props.isHomePage ? " " : "img-container"}>
                      <DoctorImage doctorInfo={doctor} className={props.isHomePage ? "mb-2 mx-auto" : "rounded-circle"} history={props.history} id={doctor.doctorId} height="96" />
                    </div>
                    <h6 className="card-title mb-1" style={{ 'height': 'unset' }}>{"Dr. " + doctor.name}</h6>
                    <span className="text-secondary text-truncate d-block small text-center">{doctor.speciality.join(", ")}</span>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </Slider>
    )
  }

  const doctorConsultationService = DoctorConsultationService();
  const validate = Validate();
  const [doctors, setDoctors] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getPreviouslyConsultedDoctors();
  }, []);

  const getPreviouslyConsultedDoctors = () => {
    setLoader(true);
    doctorConsultationService.getPreviouslyConsultedDoctors().then((response) => {
      if (validate.isNotEmpty(response) && response.statusCode == "SUCCESS" && validate.isNotEmpty(response.dataObject.doctors)) {
        setDoctors(response.dataObject.doctors);
        if (validate.isNotEmpty(props.setAvailable)) {
          props.setAvailable(true);
        }
      } else {
        setDoctors([]);
        if (validate.isNotEmpty(props.setAvailable)) {
          props.setAvailable(false);
        }
      }
      setLoader(false);
    }).catch(function (error) {
      console.log(error);
      setDoctors([]);
      setLoader(false);
      if (validate.isNotEmpty(props.setAvailable)) {
        props.setAvailable(false);
      }
    });
  }

  const getGhostImage = () => {
    return (
      <React.Fragment>
        <div className="bg-transparent m-0 mb-4 p-0 ph-col-4 ph-item ph-row">
          <div className="m-0 ph-col-4"></div>
        </div>
        <section className="shadow-none pt-1">
          <div className="condition-based-test-slider d-flex justify-content-around w-100">
            <div className="card border-0 col">
              <div className="card-body p-2">
                <div className="img-container border mb-4 mt-5">
                  <div className="ph-row m-4">
                    <div className="rounded-circle m-0" style={{ "height": "65px", "width": "65px" }}></div>
                  </div>
                </div>
                <div className="m-0  mb-4 p-0 ph-item ph-row">
                  <div className="ph-col-12 m-0"></div>
                </div>
                <div className="m-0  mb-4 p-0 ph-item ph-row">
                  <div className="ph-col-12 m-0"></div>
                </div>
              </div>
            </div>
            <div className="card border-0 col">
              <div className="card-body p-2">
                <div className="img-container border mb-4 mt-5">
                  <div className="ph-row m-4">
                    <div className="rounded-circle m-0" style={{ "height": "65px", "width": "65px" }}></div>
                  </div>
                </div>
                <div className="m-0 mb-4 p-0 ph-item ph-row">
                  <div className="ph-col-12 m-0"></div>
                </div>
                <div className="m-0 mb-4 p-0 ph-item ph-row">
                  <div className="ph-col-12 m-0"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {!loader && validate.isNotEmpty(doctors) ?
        <React.Fragment>
          <section className={props.isHomePage ? "h-100" : "shadow-none"}>
            <div className="p-3">
              <div className={props.isHomePage ? "d-flex align-items-center justify-content-between mb-1" : "d-flex align-items-center justify-content-between mb-3"}>
                <h5 className="m-0">{props.sectionTitle}</h5>
              </div>
              <div className={props.isHomePage ? "home-page-slider-container condition-based-test-slider mb-n2" : "home-page-slider-container condition-based-test-slider mb-n3 mx-n3"}>
                {validate.isNotEmpty(doctors) && getSliderContent()}
              </div>
            </div>
          </section>
        </React.Fragment>
        : null}
      {loader ? getGhostImage() : null}
    </React.Fragment>
  );
}