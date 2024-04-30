import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Validate from '../../helpers/Validate';
import MartCatalogService from '../../MedplusMart/services/MartCatalogService';
import BlogPostListGhostImage from './BlogPostListGhostImage';
import { getBlogUrl, getDecodedURL } from '../../helpers/CommonUtil';
import BlogPostCategories from './BlogPostCategories';
import Image from '../Common/Image';
import LoadMoreButton from '../../../client/MedplusMart/components/Common/LoadMoreButton';
import BreadCrumbAction from '../../../redux/action/BreadCrumbAction';
import MetaTitle from '../../commonComponents/MetaTitle';
import NoDataFound from '../../images/common/No-data-pana.svg';
import error from '../../images/common/503_Error.svg';
import moment from 'moment';
import SocialProfiles from '../../MedplusMart/components/MartCatalog/ProductDetail/SocialProfiles';

const BlogPostList = (props) => {

  const martCatalogBlogService = MartCatalogService();
  const validate = Validate();
  const breadCrumbAction = BreadCrumbAction();

  const [blogPostsList, setBlogPostList] = useState([]);
  const [isBlogPostLoading, setIsBlogPostLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [noProductsFound, setNoProductsFound] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [showSocialIcons, setShowSocialIcons] = useState(false)
  const categoryId = props.match.params.categoryId;
  const [loadMoreCategoryName,setLoadeMoreCategoryName]=useState("");

  useEffect(() => {
    setStartIndex(0);
    setBlogPostList([]);
    setNoProductsFound(false);
    getBlogPostsList(categoryId,0);
  }, [categoryId]);


  useEffect(() => {
    if(startIndex > 0) {
      getBlogPostsList(categoryId,startIndex);
    }
  },[startIndex]);

  const getCategorynames = (catId,isDecodedUrlRequired=true) => {
    let selectedCategoryName = "";
    const category = categoriesList?.find(categoryInfoMap => catId === categoryInfoMap?.categoryId);
    if(category?.categoryName){
      selectedCategoryName = category.categoryName
    }
    return isDecodedUrlRequired ?  getDecodedURL(selectedCategoryName) : selectedCategoryName;
    }

  const getBlogPostsList = (categoryId,startIndex) => {
    setIsBlogPostLoading(true);
    let obj = { SEARCH_CRITERIA: {startIndex, categoryId} };
    martCatalogBlogService.getBlogPostsList(obj).then((data) => {
      if (validate.isNotEmpty(data?.dataObject) && data.statusCode == "SUCCESS") {
        setIsBlogPostLoading(false);  
        setLoadMore(false);
        setNoProductsFound(false);
        if(startIndex == 0){
          setBlogPostList(data.dataObject);
        } else{
          setBlogPostList([...blogPostsList, ...data.dataObject]);
        }
        if(categoryId){
          let categoryName = "";
          data?.dataObject?.map((category) => {
            if(validate.isNotEmpty(category) && categoryId == Object.keys(category.categories)[0]){
              categoryName = Object.values(category.categories)[0]
              setLoadeMoreCategoryName(categoryName);
            }
          });
          breadCrumbAction.pushBreadCrumbs({name: categoryName, url: props.location.pathname});
        }
        if(data.dataObject.length <10 || data.message === "No articles found"){
          setNoProductsFound(true);
        }
      } else if (data.statusCode === "FAILURE" && data.message === "No articles found") {
          setIsBlogPostLoading(false);
          setNoProductsFound(true);
      } else {
        setLoadMore(false);
        setIsBlogPostLoading(false);
        setBlogPostList([]);
      }
    }).catch((error) => {
      setLoadMore(false);
      setIsBlogPostLoading(false);
      console.log("Error while getting Blog Details", error);
    })
  }

  const getLoadMoreProducts = () => {
    setLoadMore(true);
    setStartIndex(blogPostsList.length);
  }

  const prepareMetaKey = ()=> {
    let categoryName = getCategorynames(categoryId);
    if(categoryName){
    categoryName =categoryName.replaceAll(/[^a-zA-Z0-9-\\]+/g, "").replaceAll("-","_");
   return `BCAT_${categoryName}`.toUpperCase();
    }
  }

  if (!isBlogPostLoading && validate.isEmpty(blogPostsList) && validate.isEmpty(categoriesList)) {
    return (
      <React.Fragment>
        <section className="align-items-center body-height d-flex flex-column justify-content-center">
          <img src={error} alt="Something Went Wrong" title="Something Went Wrong" className="mb-2" height="150" />
          <p class="mb-0"> Huh..! Something Went Wrong! </p>
        </section>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {(!categoryId || prepareMetaKey()) &&  <MetaTitle metaKey={!categoryId ? `MEDPLUS_BLOG` : prepareMetaKey()} isDefaultRequired={!categoryId ? true : false} defaultValue = {categoryId ? getCategorynames(categoryId,false) : ''}/>}
      {showSocialIcons && <SocialProfiles isOpen={showSocialIcons} setIsOpen={setShowSocialIcons}/>}
      <section className='container-fluid'>
        <div className='row p-3'>
          <div className='col-9 border-right pb-3'>
            {isBlogPostLoading && <BlogPostListGhostImage />}
            <div className='pr-3'>
              {validate.isNotEmpty(blogPostsList) && blogPostsList.map((each,index) => {
                return (
                  <React.Fragment>
                    <div className='d-flex'>
                      <div>
                        <Link to={categoryId ? `/healthy-life/info/${each.postId}/${getCategorynames(Object.keys(each.categories)[0])}/${getDecodedURL(each.title)}` : getBlogUrl(each.postId, each.title)} title={each.title} role="link">
                          <Image src={each?.featuredMedia?.featuredImage} alt={each?.title} className='rounded' width="200" />
                        </Link>
                      </div>
                      <div className='card-summary px-3'>
                        <Link to={categoryId ? `/healthy-life/info/${each.postId}/${getCategorynames(Object.keys(each.categories)[0])}/${getDecodedURL(each.title)}` : getBlogUrl(each.postId, each.title)} title={each.title} className="no-underline" role="link">
                          <h4 className='mb-0' dangerouslySetInnerHTML={{ __html: each.title }}></h4>
                        </Link>
                        <small className='text-secondary'>{`by MedPlus Team, ${moment(new Date(each.dateCreated)).format("MMMM DD, YYYY")}`}</small>
                        <div className='mt-3' dangerouslySetInnerHTML={{ __html: each.summary }}></div>
                        <div className='btn-fullArticle'>
                          <button type="button" aria-role="button" aria-label='Share this Article' title="Share this Article" className="btn btn-link ml-n2" onClick={()=>setShowSocialIcons(!showSocialIcons)}>
                            Share
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" className='mx-2'>
                              <g id="share-icn" transform="translate(-1734 -1071)" clip-path="url(#clip-path)">
                                <path id="share-icn-2" data-name="share-icn" d="M21,11.813a2.794,2.794,0,0,1-2.082-.937l-7.508,4.047c.008.089.027.174.027.265s-.018.164-.025.246l7.518,4.051a2.8,2.8,0,1,1-.742,1.89c0-.038.009-.073.011-.111l-7.584-4.088a2.814,2.814,0,1,1-.015-3.989l7.6-4.095c0-.031-.009-.061-.009-.092A2.813,2.813,0,1,1,21,11.813Z" transform="translate(1731.19 1067.812)" fill="#080808" fill-rule="evenodd"></path>
                              </g>
                            </svg>
                          </button>
                          <Link to={categoryId ? `/healthy-life/info/${each.postId}/${getCategorynames(Object.keys(each.categories)[0])}/${getDecodedURL(each.title)}` : getBlogUrl(each.postId, each.title)} title={each.title} className="btn btn-link" role="link">
                            Full Article
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18.001 18" className='mx-2'>
                              <g id="right_black_icon_18px" transform="translate(-48.941 -351.847)">
                                <rect id="BG_Guide" data-name="BG Guide" width="15" height="15" transform="translate(48.941 351.847)" fill="none" />
                                <path id="Path_22926" data-name="Path 22926" d="M58.6,354.508a1.275,1.275,0,0,0-.179.537.771.771,0,0,0,.269.536l5.635,5.188H49.657a.715.715,0,1,0,0,1.431H64.325l-5.546,5.188a.7.7,0,0,0,0,.984.709.709,0,0,0,.984.089l6.977-6.44a.7.7,0,0,0,0-.984l-6.977-6.53a.684.684,0,0,0-.447-.178C58.869,354.24,58.69,354.329,58.6,354.508Z" transform="translate(0 -0.448)" fill="#080808" />
                              </g>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  {index !== blogPostsList.length-1 && <hr className='mt-3 mb-4 border-bottom-0' />}
                  </React.Fragment>
                )
              })}
              {validate.isEmpty(blogPostsList) && !isBlogPostLoading &&
                <React.Fragment>
                  <section className="align-items-center body-height d-flex flex-column justify-content-center">
                    <img src={NoDataFound} alt="No Blogs Found" title="No Blogs Found" className="mb-2" height="150" />
                    <p class="mb-0"> Huh..! No Blogs Found! </p>
                  </section>
                </React.Fragment>
              }
            </div>
            {validate.isNotEmpty(blogPostsList) && !noProductsFound &&
              <div className="w-100 px-2">
                <LoadMoreButton name={`Load More Posts From ${loadMoreCategoryName == "" ? "Healthy-Life" : loadMoreCategoryName}`} isLoading={loadMore} hide={loadMore} handleLoadMore={() => getLoadMoreProducts()} />
              </div>
            }
            {noProductsFound && <div className="alert alert-warning mt-4 mx-3 text-center rounded-pill" role="alert"><strong>Huh..! We don't have any more posts</strong></div>}
          </div>
          <BlogPostCategories categoryId = {categoryId} categoriesList={categoriesList} setCategoriesList={setCategoriesList}/>
        </div>
      </section>
    </React.Fragment>
  );
}

export default BlogPostList;