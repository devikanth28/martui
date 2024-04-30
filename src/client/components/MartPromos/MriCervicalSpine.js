import React from 'react'
//import { CallForBookSlot, CardiacCtToDiagnostic, DiagnosticStoreLocation } from '../../Analytics/Analytics'
import StrecturedComponent from './StrecturedComponent'

const MriCervicalSpine = () => {
    const MriCervicalSpineData=
    {
        imgUrl:require("../../images/common/MRI-Machine.png"),
        title:"3T MRI CERVICAL SPINE",
        itemOfferedPrice:"1850",
        mrp:8400,
        imgDesc:"MRI Cervical Spine Machine",
        phoneNumber:6300532067,
        showinclusive:false
    }
    //events for MRI Cervical Spine

    // const AnalyticsCardiacCtToDiagnostic=()=>{
    //     CardiacCtToDiagnostic(MriCervicalSpineData.title);
    // }

    // const ClickToBookYourSlot=()=>{
    //     CallForBookSlot(MriCervicalSpineData.title);
    // }
    // const ClickStoreLocation=(storeLocation)=>{
    //     DiagnosticStoreLocation(storeLocation,MriCervicalSpineData.title)
    // }
  return (
    <StrecturedComponent plan={MriCervicalSpineData}/>
  )
}

export default MriCervicalSpine