import React from 'react'
//import { CallForBookSlot, CardiacCtToDiagnostic, DiagnosticStoreLocation } from '../../Analytics/Analytics';
import StrecturedComponent from './StrecturedComponent';

const MriLumbarSpine = () => {
    const MriLumbarData=
    {
        imgUrl:require("../../images/common/MRI-Machine.png"),
        title:"3T MRI LUMBAR SPINE",
        itemOfferedPrice:1850,
        mrp:8400,
        imgDesc:"MRI Lumbar Spine Machine",
        phoneNumber:6300532067,
        showinclusive:false
    }
    //events for MRI Lumbar Spine

    // const AnalyticsCardiacCtToDiagnostic=()=>{
    //     CardiacCtToDiagnostic(MriLumbarData.title);
    // }

    // const ClickToBookYourSlot=()=>{
    //     CallForBookSlot(MriLumbarData.title);
    // }
    // const ClickStoreLocation=(storeLocation)=>{
    //     DiagnosticStoreLocation(storeLocation,MriLumbarData.title)
    // }
  return (
    <StrecturedComponent plan={MriLumbarData}/>
  )
}

export default MriLumbarSpine