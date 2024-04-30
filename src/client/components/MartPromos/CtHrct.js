import React from 'react'
import StrecturedComponent from './StrecturedComponent'

const CtHrct = () => {
    const CtHrctData={
        imgUrl:require("../../images/common/Revolution_Maxima.png"),
        title:"CT - HRCT For Chest",
        itemOfferedPrice:1450,
        mrp:5800,
        imgDesc:"CT-HRCT Machine",
        phoneNumber:9391012066,
    }
  return (
    <StrecturedComponent plan={CtHrctData}/>
  )
}

export default CtHrct