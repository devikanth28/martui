import React from 'react'
//import { CallForBookSlot, CardiacCtToDiagnostic, DiagnosticStoreLocation } from '../../Analytics/Analytics';
import StrecturedComponent from './StrecturedComponent';
const MriBrainPlain = () => {
    const MriBrainPlanData=
    {
        imgUrl:require("../../images/common/MRI-Machine.png"),
        title:"3T MRI BRAIN PLAIN",
        itemOfferedPrice:"1850",
        mrp:8400,
        imgDesc:"MRI Brain Plan",
        phoneNumber:6300532067,
        showinclusive:false
    }

    //events for Mri Brain Plain

    // const AnalyticsCardiacCtToDiagnostic=()=>{
    //     CardiacCtToDiagnostic(MriBrainPlanData.title);
    // }

    // const ClickToBookYourSlot=()=>{
    //     CallForBookSlot(MriBrainPlanData.title);
    // }
    // const ClickStoreLocation=(storeLocation)=>{
    //     DiagnosticStoreLocation(storeLocation,MriBrainPlanData.title)
    // }
    return (
        <React.Fragment>
            <StrecturedComponent plan={MriBrainPlanData}/>
        </React.Fragment>
    )
}

export default MriBrainPlain