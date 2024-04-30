import React from 'react';
import DoctorList from "./DoctorList"
import DoctorSlider from "./DoctorSlider"
import DoctorHomePageSeperator from './DoctorHomePageSeperator';
function DoctorCategeryPage(props) {
    return (
        <React.Fragment>
            <DoctorHomePageSeperator/>
            <DoctorSlider source="category" sectionTitle="Previously Consulted Doctors"/>
            <DoctorList title="List of Doctors" />
        </React.Fragment>
    );
}

export default DoctorCategeryPage;