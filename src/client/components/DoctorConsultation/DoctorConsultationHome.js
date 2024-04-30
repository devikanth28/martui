import React from "react"
import {specialization,symptoms} from  '../DoctorConsultation/DoctorsStaticData'
import DoctorsConditionBasedSlider from "./DoctorsConditionBasedSlider"; 
import HomePageSeperator from "../../images/common/lab-home-seperator.png";
import DoctorSplitBanner from "./DoctorSplitBanner"
import DoctorSlider from "./DoctorSlider"
import DoctorHomePageSeperator from "./DoctorHomePageSeperator";
import UpcomingConsulationSlider from "./UpcomingConsulationSlider"
import PracticesWeOffer from "../LabHomePage/PracticesWeOffer"
import LabsFrequentlyAskedQuestions from "../LabHomePage/LabsFrequentlyAskedQuestions"
import LabCustomerReviews from "../LabHomePage/LabCustomerReviews"
import UpcomingConsultation from "../DoctorConsultation/UpcomingConsultation"

const DoctorConsultationHome=(props)=>{
    return(
        <React.Fragment>
            <DoctorSplitBanner history={props.history}/>
            <div className="my-32">
                <div className="row my-32">
                    <div className="col-8">
                        <div className="h-100">
                            <DoctorsConditionBasedSlider showViewAll={true} sectionTitle="By Specialization" conditionBasedTestJson ={ specialization }/>
                        </div>
                    </div>
                    <div className="col-4">
                        <DoctorSlider sectionTitle="Previously Consulted Doctors"/>
                    </div>
                </div>
                <a href="javascript:void(0)" title="click to know more" className="my-4 d-block pb-2">
                    <img src={HomePageSeperator} alt="Click to know more" className="w-100"/>
                </a>
                <div className="row my-32">
                    <div className="col-8">
                        <DoctorsConditionBasedSlider showViewAll={true} sectionTitle="By Symptoms" conditionBasedTestJson ={ symptoms }/>
                    </div>
                    <div className="col-4">
                        <UpcomingConsulationSlider sectionTitle="Upcoming Consultation"/>
                    </div>
                </div>
                <UpcomingConsultation/>
            </div>
          {/*   <DoctorsConditionBasedSlider showViewAll={true} sectionTitle="By Specialization" conditionBasedTestJson ={ specialization }/> */}
            <DoctorHomePageSeperator props={props}/>
            {/* <DoctorsConditionBasedSlider showViewAll={true} sectionTitle="By Symptoms" conditionBasedTestJson ={ symptoms }/> */}
            <PracticesWeOffer isFromProductDetail={false}/>
            <LabsFrequentlyAskedQuestions/>
            <LabCustomerReviews/>
        </React.Fragment>
    )
}
export default DoctorConsultationHome