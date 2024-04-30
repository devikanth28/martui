import React from 'react'
import StrecturedComponent from './StrecturedComponent'

const Mammography = () => {
    const MammographyData=
    {
        imgUrl:require("../../images/common/Lilac-Cassette.png"),
        title:"Mammography",
        itemOfferedPrice:1300,
        mrp:2200,
        imgDesc:"Mammography Machine",
        subTitle:"Both Breasts",
        phoneNumber:6300532067,
        showinclusive:true
    }
  return (
    <StrecturedComponent plan={MammographyData}/>
  )
}

export default Mammography