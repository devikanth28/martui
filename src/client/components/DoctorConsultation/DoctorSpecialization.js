import React from 'react';
import DoctorList from './DoctorList';
import HomePageSeperator from "../../images/common/lab-home-seperator.png";
import DoctorSpecializationDetails from './DoctorSpecializationDetails';
import DoctorHomePageSeperator from './DoctorHomePageSeperator';
import Diabaties from './Diabaties';

function DoctorSpecialization(props) {
    return (
        <React.Fragment>
            <DoctorHomePageSeperator props={props}/>
            <DoctorSpecializationDetails/>
            <Diabaties/>
            <DoctorList history={props.history} title="Doctors Available in Cardiology"/>
        </React.Fragment>
    )
}
export default DoctorSpecialization