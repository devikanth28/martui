import React from 'react'
//import { CallForBookSlot,CardiacCtToDiagnostic, DiagnosticStoreLocation } from '../../Analytics/Analytics';
import StrecturedComponent from './StrecturedComponent';
const Cardiac = (props) => {
    const CardiacData={
        imgUrl:require("../../images/common/Revolution_Maxima.png"),
        title:"CARDIAC  CT",
        itemOfferedPrice:"4150",
        mrp:13600,
        imgDesc:"Cardiac-CT Machine",
        phoneNumber:6300532067,
        slicePoints:"128",
        showinclusive:true
    }

    //events for Cardic-ct

    // const AnalyticsCardiacCtToDiagnostic=()=>{
    //     CardiacCtToDiagnostic(CardiacData.title);
    // }

    // const ClickToBookYourSlot=()=>{
    //     CallForBookSlot(CardiacData.title);
    // }
    // const ClickStoreLocation=(storeLocation)=>{
    //     DiagnosticStoreLocation(storeLocation,CardiacData.title)
    // }
    return (
        <React.Fragment>
            <StrecturedComponent plan={CardiacData}/>
        </React.Fragment>
    )
}

export default Cardiac