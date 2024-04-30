import React from 'react'
import Sliders from './Sliders'
import Upload from './Upload'
import MyAccount from './MyAccount'
import CardSlider from './CardSlider'
import ShopbyCategory from './ShopbyCategory';
import Validate from '../../../helpers/Validate';
import LabsCatalogBanner from '../../MedplusLabs/components/Common/LabsCatalogBanner'
import BestPractices from './BestPractices'
import {ShopByCategoryJson,TopSellers,banners,healthblog} from './staticData'
import  { useEffect, useState } from 'react';
import HealthyLife from './HealthyLife'

const Homepage = (props) => {
  const [separatorBanners, setSeparatorBanners] = useState([]);
  const validate = Validate();
  useEffect(() => {
      setSeparatorBanners(validate.isNotEmpty(banners.bannerPromotion.bannerPromoDetails['SEPARATOR']) ? banners.bannerPromotion.bannerPromoDetails['SEPARATOR'] : [])
  });
  return (
    <React.Fragment>
        <Sliders/>
        <Upload/>
        <MyAccount/>
        <ShopbyCategory sectionTitle="Shop by Category" ShopbyCategoryJson ={ShopByCategoryJson}/>
        <CardSlider sectionTitle="Top Sellers" data ={TopSellers} slidesToShow="6" isLoading={true}/>
        <LabsCatalogBanner isBannersLoading={false} bannerData={separatorBanners.filter(bannerData => bannerData.sequenceNo == 1)[0]} history={props.history} screenLocation={"SEPARATOR"} />
        <CardSlider sectionTitle="Best Sellers" data ={TopSellers}  slidesToShow="6" isLoading={true}/>
        <LabsCatalogBanner isBannersLoading={false} bannerData={separatorBanners.filter(bannerData => bannerData.sequenceNo == 2)[0]} history={props.history} screenLocation={"SEPARATOR"} />
        <CardSlider sectionTitle="Recomednded for you" data ={TopSellers}  slidesToShow="6" isLoading={true}/>
        <LabsCatalogBanner isBannersLoading={false} bannerData={separatorBanners.filter(bannerData => bannerData.sequenceNo == 2)[0]} history={props.history} screenLocation={"SEPARATOR"} />
        <CardSlider sectionTitle="You may Also Like" data ={TopSellers}  slidesToShow="6" isLoading={true}/>
        <BestPractices/>
        <HealthyLife data= {healthblog}/>
        <LabsCatalogBanner isBannersLoading={false} bannerData={separatorBanners.filter(bannerData => bannerData.sequenceNo == 3)[0]} history={props.history} screenLocation={"SEPARATOR"} />
    </React.Fragment>
  )
}
export default Homepage