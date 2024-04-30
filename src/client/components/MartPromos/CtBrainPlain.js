import React from 'react'
import StrecturedComponent from './StrecturedComponent'

const CtBrainPlain = () => {
    const CtBrainPlainData={
        imgUrl:require("../../images/common/Revolution_Maxima.png"),
        title:" CT Brain Plain",
        itemOfferedPrice:800,
        mrp:3200,
        imgDesc:"CT Brain Plain Machine",
        phoneNumber:9391012066,
    }
  return (
    <StrecturedComponent plan={CtBrainPlainData}/>
  )
}

export default CtBrainPlain