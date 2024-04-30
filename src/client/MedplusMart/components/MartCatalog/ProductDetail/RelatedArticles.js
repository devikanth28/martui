import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import moment from "moment";
import SliderNextArrow from '../../../../components/MedplusLabs/components/Common/SliderNextArrow';
import SliderPrevArrow from '../../../../components/MedplusLabs/components/Common/SliderPrevArrow';
import RelatedArticlesGhostImage from './RelatedArticlesGhostImage';
import Validate from '../../../../helpers/Validate';
import MartCatalogService from '../../../services/MartCatalogService';
import { getBlogUrl } from '../../../../helpers/CommonUtil';
import RelatedArticles from '../../../../components/Blog/RelatedArticles';
const RelatedArticlesInProductDetail = (props) => {
    const validate = Validate();
    const martCatalogService = MartCatalogService();
    const [articles,setArticles] = useState([]);
    const [areArticlesLoading,setArticlesLoading] = useState(false);

    useEffect(()=>{
        getProductRelatedArticles();
    }, [props?.articleLinks, props?.productNameId]);

    const getProductRelatedArticles=()=>{
        setArticlesLoading(true);
        martCatalogService.getProductRelatedArticles({postIds:props.articleLinks}).then(response=>{
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode ==='SUCCESS' && validate.isNotEmpty(response.dataObject)){
            setArticles(response.dataObject);
            } else {
                setArticles([]);
            }
            setArticlesLoading(false);
        }).catch(function(error){
            console.log(error);
            setArticlesLoading(false);
        })
    }

    return (
        <React.Fragment>
            {areArticlesLoading && <RelatedArticlesGhostImage/>}
            {!areArticlesLoading && validate.isNotEmpty(articles) && 
            <React.Fragment>
                    <section className='mb-3'>
                        <div className='p-3'>
                        <h3>Related Articles</h3>
                            <RelatedArticles blogPostArticles={articles} history={props.history} />
                            </div>
                    </section>
                </React.Fragment>
            }
        </React.Fragment>
    )
}
export default RelatedArticlesInProductDetail