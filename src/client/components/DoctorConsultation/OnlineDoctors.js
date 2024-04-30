import React from 'react';
import HomePageSeperator from "../../images/common/lab-home-seperator.png";
import DoctorsConditionBasedSlider from './DoctorsConditionBasedSlider';
import {specialization} from  '../DoctorConsultation/DoctorsStaticData'
import DoctorConsulatationTypeSlider from './DoctorConsulatationTypeSlider';
import DoctorList from "./DoctorList"
import DoctorHomePageSeperator from './DoctorHomePageSeperator';
import DoctorAppliedFilters from './DoctorAppliedFilters';

function OnlineDoctors(props) {
    return (
        <React.Fragment>
            <DoctorHomePageSeperator props={props}/>
            <DoctorAppliedFilters/>
            <DoctorConsulatationTypeSlider history={props.history} isWalkin= {props.location.state=='walkin'?true:false} isOnline = {props.location.state=='online' ? true :false} title={props.location.state=='online'?"Doctors Online" : 'Doctors Available Near You'}/>
            <DoctorsConditionBasedSlider isOnline={true} showViewAll={true} sectionTitle="By Specialization" conditionBasedTestJson ={ specialization }/>
            <DoctorList title="Other Doctors Available" />
        </React.Fragment>
    )
}
export default OnlineDoctors