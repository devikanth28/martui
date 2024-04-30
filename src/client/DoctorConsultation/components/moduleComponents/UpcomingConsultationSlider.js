import React from 'react';
import Slider from "react-slick";
import SliderNextArrow from '../../../components/MedplusLabs/components/Common/SliderNextArrow';
import SliderPrevArrow from '../../../components/MedplusLabs/components/Common/SliderPrevArrow';
import Validate from '../../../helpers/Validate';
import Consultation from './Consultation';

const UpcomingConsultationSlider = (props) => {

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    swipe: true,
    swipeToSlide: true,
    prevArrow: <SliderPrevArrow />,
    nextArrow: <SliderNextArrow />,
    slidesToShow: 1,
    /* responsive: [
        {
            breakpoint: 1920,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1440,
            settings: {
                //variableWidth: true,
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1366,
            settings: {
              //variableWidth: true
              slidesToShow: 3
            }
        },
        {
            breakpoint: 1280,
            settings: {
              slidesToShow: 2,
            }
        }
    ] */
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 1440,
        settings: {
          //variableWidth: true,
          slidesToShow: 1
        }
      },
      {
        breakpoint: 1366,
        settings: {
          //variableWidth: true
          slidesToShow: 1
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const getSliderContent = () => {
    return (
      <Slider className="custom-slide-arrows upcoming-consultation-slider " {...sliderSettings}>
        {consultations.filter(consultation => validate.isNotEmpty(consultation) && validate.isNotEmpty(consultation.doctorServiceInfo)).map((consultation) => {
          return (
            <Consultation toggleChat={props.toggleChat} key={consultation.orderId} consultation={consultation} history={props.history} getUpComingConsultations={props.getUpComingConsultations} setAlertInfo={props.setAlertInfo} />
          );
        })}
      </Slider>
    )
  }

  const validate = Validate();
  const consultations = props.consultations;

  return (
    <React.Fragment>
      <section>
        <div className="p-3">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="m-0">{props.sectionTitle}</h5>
          </div>
          <div className='upcoming-consultation mx-n3 mb-n3'>
            <div className="px-0 mx-n2 mb-0">
              {validate.isNotEmpty(consultations) && getSliderContent()}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default UpcomingConsultationSlider;