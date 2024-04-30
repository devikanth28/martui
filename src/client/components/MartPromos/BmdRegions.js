import React from 'react'
import StrecturedComponent from './StrecturedComponent'

const BmdRegions = () => {
    const BmdRegionsData={
        imgUrl:require("../../images/common/BMDmachine.jpg"),
        title:"BMD - 2 Regions",
        itemOfferedPrice:750,
        mrp:3000,
        imgDesc:"BMD - 2 Regions Machine",
        phoneNumber:9391012066,
        subTitle:"Dexa Scan"
    }
  return (
    <StrecturedComponent plan={BmdRegionsData}/>
  )
}

export default BmdRegions