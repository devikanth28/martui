import React, { useEffect, useRef, useState } from 'react';
import Validate from '../../../../helpers/Validate';
import MartCatalogService from '../../../services/MartCatalogService';
import LoadMoreButton from '../../Common/LoadMoreButton';
import NoProductsFound from '../../Common/NoProductsFound';
import ProductSummaryCard from '../../Common/ProductSummaryCard';
import CategoryDetailGhostImage from '../ProductCategory/CategoryDetail/CategoryDetailGhostImage';

const GeneralProductSearchResult = (props) => {

    const [isProductsLoading,setProductsLoading] = useState(false); 
    const [products,setProducts] = useState([]);
    const pageNo = useRef(1);
    const isFuzzyResult = useRef(false);
    const allProductsLoaded = useRef(false);
    const martCatalogService = MartCatalogService();
    const validate = Validate();
    const recordsCount = 16;

    useEffect(()=>{
        if(validate.isNotEmpty(props.encodedKeyword)){
            resetToInitialState();
            getSearchResults();
        }
    }, [props.encodedKeyword]);

    const resetToInitialState = ()=> {
        pageNo.current=1;
        allProductsLoaded.current=false;
        isFuzzyResult.current=false;
    }

    const getSearchResults = () => {
        const searchCriteria = {
            searchQuery : props.encodedKeyword,
            pageNumber : pageNo.current,
            recordsCount : recordsCount,
            allFieldsRequired:true,
            productType:'Y',
        };
        setProductsLoading(true);
        martCatalogService.getSearchResults({"searchCriteria" : JSON.stringify(searchCriteria)}).then((response) => {
            if(validate.isNotEmpty(response) && response.statusCode ==='SUCCESS' && validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.products)){
                if(response.dataObject.products && response.dataObject.products.length<recordsCount){
                    allProductsLoaded.current=true;
                }
                if(response.dataObject.isFuzzyResult){
                    isFuzzyResult.current=true;
                }
                if(pageNo.current==1){
                    setProducts(response.dataObject.products);
                }
                else{
                    setProducts([...products,...response.dataObject.products]);
                }
                pageNo.current++;   
            }
            setProductsLoading(false);
        }).catch((err) => {
            console.log(err);
            setProductsLoading(false);
        });
    }


    return(
        <React.Fragment>
        {isProductsLoading && pageNo.current==1 && <CategoryDetailGhostImage onlyProducts={false} viewAll={true}/>}
        {validate.isNotEmpty(products) &&
        <React.Fragment>
        <div className='pt-3 d-flex justify-content-between align-items-center'>
        {isFuzzyResult.current ?
            <div>
            <h5 className='small mb-0'>No results related to "<span className='text-danger'>{props.searchKeyword}</span>"</h5>
            <h3 className='font-weight-normal'>Did you mean?</h3>
            </div> :
            <h5 className="mt-2 showing-result">Showing results for &quot;<span className="text-brand">{props.searchKeyword}</span>&quot;
            </h5>
        }
        <h6 class="font-weight-light pt-1 mb-0">{`Product found ${products.length}`}</h6>
        </div>
        <section className='px-2 py-3'>
        <div className='d-flex flex-wrap home-page-products-slider w-100' style={{'gap':'0.5rem 0rem'}}>
            {products.map((product) => {
                return (
                    <div className='drugInfo-all-products'>
                        <ProductSummaryCard product={product} isDropDownRequired={true} height={props.height} width={props.height}/>
                    </div>
                );
            })}
        </div>
        {!allProductsLoaded.current && <div className='mx-2'><LoadMoreButton name={`Load More Products From ${validate.isNotEmpty(props.searchKeyword) && props.searchKeyword}`} isLoading = {isProductsLoading} hide ={false} handleLoadMore={()=>{getSearchResults();}}/></div>}
        {!isProductsLoading && allProductsLoaded.current && 
        <div className="alert alert-warning text-center rounded-pill mb-0 mt-2" role="alert"><strong>Huh..! We don't have any more products</strong></div>}
        </section>
        </React.Fragment>
        }
        {validate.isEmpty(products) && !isProductsLoading && <NoProductsFound />}
    </React.Fragment>
    )

}
export default GeneralProductSearchResult;