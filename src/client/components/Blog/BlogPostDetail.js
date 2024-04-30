import React, { useEffect, useState } from 'react';
import Validate from '../../helpers/Validate';
import BlogPostDetailGhostImage from './BlogPostDetailGhostImage';
import BlogPostCategories from './BlogPostCategories';
import MartCatalogService from '../../MedplusMart/services/MartCatalogService';
import RelatedArticles from './RelatedArticles';
import BreadCrumbAction from '../../../redux/action/BreadCrumbAction';
import { getDecodedURL } from '../../helpers/CommonUtil';
import MetaTitle from '../../commonComponents/MetaTitle';
import SocialProfiles from '../../MedplusMart/components/MartCatalog/ProductDetail/SocialProfiles';
import moment from 'moment';
import BrokenBannerImage from "../../images/broken-banner-image.png"

const BlogPostDetail = (props) => {

  const validate = Validate();
  const martCatalogService = MartCatalogService();
  const breadCrumbAction = BreadCrumbAction();

  const [isBlogPostLoading, setIsBlogPostLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [blogPostDetail, setBlogPostDetail] = useState({});
  const [recentArticles, setRecentArticles] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [showSocialIcons, setShowSocialIcons] = useState(false)
  const categoryName = props.match.params.categoryName;

  useEffect(() => {
    getBlogPostDetail();
  }, [props.match.params.postId]);

  useEffect(() =>{
    if(validate.isNotEmpty(categoriesList) && validate.isNotEmpty(blogPostDetail)){
      prepareBreadCrumb(blogPostDetail);
    }
  },[categoriesList,blogPostDetail]);


  const prepareBreadCrumb = (postDetails) => {
    let categoryId = validate.isNotEmpty(postDetails) && Object.keys(postDetails.categories)[0];
    let breadCrumbs = [];
    const category = categoriesList?.find(categoryInfoMap => categoryId === categoryInfoMap.categoryId);
    if(category?.categoryName && categoryName){
    breadCrumbs.push({name: category?.categoryName, url: `/healthy-life/${categoryId}/${getDecodedURL(category?.categoryName)}`})
    }
    breadCrumbs.push({name: postDetails.title, url: props.location.pathname })
    breadCrumbAction.pushBreadCrumbs(breadCrumbs);
  }

  const getBlogPostDetail = () => {
    setIsBlogPostLoading(true);
    martCatalogService.getBlogPostDetail({ "postId": props.match.params.postId }).then((data) => {
      if (data.statusCode === "SUCCESS" && validate.isNotEmpty(data) && validate.isNotEmpty(data.dataObject)) {
        setIsBlogPostLoading(false);
        setBlogPostDetail(data.dataObject?.postDetails);
        setRecentArticles(data.dataObject?.recentPosts);
        setRelatedArticles(data.dataObject?.relatedPosts);
      }
    }).catch((error) => {
      console.log(error);
      setIsBlogPostLoading(false);
    })
  }

  const prepareMetaKey = ()=> {
    let postName = blogPostDetail.title;
    postName = postName.replaceAll('&#038;','&').replaceAll(/[^a-zA-Z0-9]+/g, "");
    return `BPAGE_${postName}`.toUpperCase();
  }

  return (
    <React.Fragment>
      {blogPostDetail?.title && <MetaTitle metaKey={prepareMetaKey()} isDefaultRequired={false} defaultValue={blogPostDetail?.title}/> }
      {showSocialIcons && <SocialProfiles isOpen={showSocialIcons} setIsOpen={setShowSocialIcons}/>}
      <section className='row mx-0 py-3'>
        <div className='col-9 border-right pr-3 post-detail card-summary'>
          {isBlogPostLoading && <BlogPostDetailGhostImage />}
          {validate.isNotEmpty(blogPostDetail) &&
            <React.Fragment>
              <img src={blogPostDetail?.featuredMedia?.featuredImage ? blogPostDetail.featuredMedia.featuredImage : ''} alt={blogPostDetail?.title} className='img-fluid' onError={(e)=>{ e.target.onerror = null; e.target.src = BrokenBannerImage;}} />
              <div className='d-flex justify-content-between align-items-center btn-fullArticle'>
                <h1 className='mb-0 mt-2 page-content' dangerouslySetInnerHTML={{ __html: blogPostDetail?.title }}/>
                <button type="button" aria-role="button" aria-label='Share this Article' title="Share this Article" className="btn btn-link" onClick={() => setShowSocialIcons(!showSocialIcons)}>
                  Share
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" className='mx-2'>
                    <g id="share-icn" transform="translate(-1734 -1071)" clip-path="url(#clip-path)">
                      <path id="share-icn-2" data-name="share-icn" d="M21,11.813a2.794,2.794,0,0,1-2.082-.937l-7.508,4.047c.008.089.027.174.027.265s-.018.164-.025.246l7.518,4.051a2.8,2.8,0,1,1-.742,1.89c0-.038.009-.073.011-.111l-7.584-4.088a2.814,2.814,0,1,1-.015-3.989l7.6-4.095c0-.031-.009-.061-.009-.092A2.813,2.813,0,1,1,21,11.813Z" transform="translate(1731.19 1067.812)" fill="#080808" fill-rule="evenodd"></path>
                    </g>
                  </svg>
                </button>
              </div>
              <p className='text-secondary'>{`by MedPlus Team, ${moment(new Date(blogPostDetail?.dateCreated)).format("MMMM DD, YYYY")}`}</p>
              <div className='mb-5' dangerouslySetInnerHTML={{ __html: blogPostDetail?.content }}></div>
            </React.Fragment>
          }
          {validate.isNotEmpty(recentArticles) &&
            <div className='mb-3'>
              <h3>Recent Articles</h3>
              <div>
                <RelatedArticles blogPostArticles={recentArticles}/>
              </div>
            </div>
          }
          {validate.isNotEmpty(relatedArticles) &&
            <div className='mb-3'>
              <h3>Related Articles</h3>
              <div>
                <RelatedArticles blogPostArticles={relatedArticles}/>
              </div>
            </div>
          }
        </div>
        <BlogPostCategories categoriesList={categoriesList} setCategoriesList={setCategoriesList}/>
      </section>
    </React.Fragment>
  );
}

export default BlogPostDetail;