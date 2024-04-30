import React from 'react'
import StrecturedComponent from './StrecturedComponent'

const CtWholeAbdomen = () => {
    const CtHrctData={
        imgUrl:require("../../images/common/Revolution_Maxima.png"),
        title:" CT - Whole Abdomen And Pelvis Plain",
        itemOfferedPrice:1450,
        mrp:5800,
        imgDesc:" CT - Whole Abdomen And Pelvis Plain Machine",
        phoneNumber:9391012066,
    }
  return (
    <StrecturedComponent plan={CtHrctData}/>
  )
}

export default CtWholeAbdomen