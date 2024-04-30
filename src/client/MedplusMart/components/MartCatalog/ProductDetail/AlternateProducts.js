import React, { useEffect, useRef, useState } from 'react';
import Validate from '../../../../helpers/Validate';
import MartCatalogService from '../../../services/MartCatalogService';
import AlternateProductCard from '../../Common/AlternateProductCard';
import LoadMoreButton from '../../Common/LoadMoreButton';
import SimilarProductCardGhostImage from './SimilarProductsGhostImage';
import GenericAlternatives from '../../../../KnowYourMedicine/components/GenericAlternatives';

const AlternateProducts=(props)=>{

  const validate= Validate();
  const martCatalogService= MartCatalogService();
  const [alternateProducts,setAlternateProducts] = useState([]);
  const [alternateProductIds,setAlternateProductIds] = useState([]);
  const [isAlternateProductsLoading,setAlternateProductsLoading] = useState(false);
  const pageNo=useRef(1);
  const recordsPerPage=10;
  const maxRecords = 999;
  const suggestedAlternativeFlag = validate.isNotEmpty(props.membershipPrice) ? 'N' :'Y';

  useEffect(()=>{
      if(validate.isEmpty(alternateProducts) && validate.isNotEmpty(props.productId)){
          getAlternateProducts();
      }
  },[])
  const getAlternateProducts= ()=>{
      setAlternateProductsLoading(true);
      let params={productId:props.productId,pageNo:pageNo.current,recordsPerPage:recordsPerPage,maxRecords:maxRecords};
      if(props.isKym){
        params['isKym']=true;
      }else{
        params['suggestedAlternativeRequired']=suggestedAlternativeFlag;
      }
      const index=(pageNo.current-1)*recordsPerPage;
      params={...params,alternateProductIds:JSON.stringify(alternateProductIds.slice(index,index+recordsPerPage))};
      martCatalogService.getAlternateProducts(params).then(response=>{
          if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode == 'SUCCESS' && validate.isNotEmpty(response.dataObject)){
            pageNo.current++;
            if(validate.isNotEmpty(response.dataObject.alternateProducts)){
                setAlternateProducts([...alternateProducts,...response.dataObject.alternateProducts]);
                if (!props.isKym) {
                    props.handleAlternativeProduct(response.dataObject.suggestedAlternativeProduct, response.dataObject.suggestedAlternativeProductDiscountInfo);
                    props.setIsAlternativeProductsAvailable(true);
                }
            }
            if(validate.isNotEmpty(response.dataObject.alternateProductIds)){
                setAlternateProductIds(response.dataObject.alternateProductIds);
            }
          }
          setAlternateProductsLoading(false);
      }).catch(function(error){
          console.log(error);
          setAlternateProductsLoading(false);
      })
  }

  return(
      <React.Fragment>
        {validate.isNotEmpty(alternateProducts) &&
        <section className={!props.isKym ? "border p-0" : ""}>
                {props.isKym ?<p className={`p-3 mb-0`}>Other Generic Alternative</p>:<div className={`px-2`}>
                    <h4 className="font-16 my-2">{`Alternatives for ${props.productName}`}</h4>
                    <p className="font-14 mb-0 my-2">Drugs with same composition &amp; strength</p>
                </div>}
               {validate.isNotEmpty(alternateProducts) && 
               <div className='similar-products'>
                    <div className={'similar-products-scroll alternatives'}>
                            {alternateProducts.map((product) => {
                                return (props.isKym ? <GenericAlternatives product={product} {...props} /> : <AlternateProductCard product={product} history={props.history} />);
                            })}
                        {((alternateProductIds.slice((pageNo.current-1)*recordsPerPage).length>0) || (!isAlternateProductsLoading && (alternateProductIds.slice((pageNo.current-1)*recordsPerPage).length<=0 && pageNo.current!=2 ))) && <div className='d-flex justify-content-center mb-3 mx-5'>
                            {alternateProductIds.slice((pageNo.current-1)*recordsPerPage).length>0  && <LoadMoreButton name={'Load More'} isLoading= {isAlternateProductsLoading} hide ={false} handleLoadMore={()=>{getAlternateProducts();}}/>}
                    {!isAlternateProductsLoading && (alternateProductIds.slice((pageNo.current-1)*recordsPerPage).length<=0 && pageNo.current!=2) && <div className="text-center alert alert-warning mb-0 rounded-pill"> Huh..! We don't have any more products</div> }  
                        </div>}
                    
                    </div>
           </div>}
        </section>
            }   
        {isAlternateProductsLoading && pageNo.current == 1 && <SimilarProductCardGhostImage />}
      </React.Fragment>
  );
}
export default AlternateProducts;