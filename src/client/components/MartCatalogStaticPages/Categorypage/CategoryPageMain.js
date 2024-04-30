import React from 'react'
import BaByneedsBanner from './BaByneedsBanner'
import ShopByBabyNeeds from './ShopByBabyNeeds'
import CardSlider from '../HomePage/CardSlider'
import PopularBrands from './PopularBrands'
import PromotinalOffers from './PromotinalOffers'
import { TopSellers } from '../HomePage/staticData'
const CategoryPageMain = () => {
  return (
      <React.Fragment>
    <BaByneedsBanner/>
    <ShopByBabyNeeds/>
    <CardSlider  sectionTitle="Top Sellers" data ={TopSellers} slidesToShow="6" isLoading={true}/>
    <PopularBrands/>
    <PromotinalOffers/>
    </React.Fragment>
  )
}

export default CategoryPageMain