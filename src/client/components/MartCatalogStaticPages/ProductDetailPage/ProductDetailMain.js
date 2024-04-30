import React from 'react'
import ProductImage from './ProductImage'
import CardSlider from '../HomePage/CardSlider'
import RecentlyViewdProducts from './ProductDetailPagePlaceholders/RecentlyViewdProducts'
import { TopSellers } from '../HomePage/staticData'
import ProductOffers from './ProductOffers'
import MoreProducts from './MoreProducts'
import SimilarProducts from './SimilarProducts'
import ApplicableOffers from './ApplicableOffers'
import Sellersinfo from './Sellersinfo'
import Productinfo from './Productinfo'
import RelatedLabArticles from '../../MedplusLabs/components/labCatalog/RelatedLabArticles'
import RelatedArticles from '../ProductDetailPage/RelatedArticles'
const ProductDetailMain = () => {
  return (
    <React.Fragment>
    <div className="row mx-0">
            <div className="col-8 px-0">
                 <ProductImage/>
                 <Productinfo/>
                 <Sellersinfo/>
                 <CardSlider slidesToShow="4" sectionTitle="Recommended Products" data ={TopSellers}/>
                 <RecentlyViewdProducts/>
                 <CardSlider slidesToShow="4" sectionTitle="Recently Viewed Products" data ={TopSellers}/>
                 <RecentlyViewdProducts/>
                 <RelatedArticles/>
            </div>
            <div className='col-4'> 
                <ProductOffers/>
                <ApplicableOffers/>
                <SimilarProducts/>
                <MoreProducts/>               
            </div>
    </div>
<RelatedLabArticles/>    
</React.Fragment>
  )
}
export default ProductDetailMain