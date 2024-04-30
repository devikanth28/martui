import React from 'react';
import HomePageSeperator from "../../images/common/lab-home-seperator.png";
import DoctorsConditionBasedSlider from './DoctorsConditionBasedSlider';
import {specialization} from  '../DoctorConsultation/DoctorsStaticData'
import DoctorList from "./DoctorList"
import DoctorHomePageSeperator from './DoctorHomePageSeperator';

function DoctorConsultation(props) {
    return (
        <React.Fragment>
            <DoctorHomePageSeperator props={props}/>
            <DoctorsConditionBasedSlider showViewAll={true} sectionTitle="By Specialization" conditionBasedTestJson ={ specialization }/>
            <DoctorList title="Other Doctors Available" />
        </React.Fragment>
    )
}
export default DoctorConsultation