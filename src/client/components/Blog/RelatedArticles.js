import React, {useState } from 'react'
import Slider from "react-slick";
import SliderPrevArrow from '../MedplusLabs/components/Common/SliderPrevArrow';
import SliderNextArrow from '../MedplusLabs/components/Common/SliderNextArrow'
import { getBlogUrl } from '../../helpers/CommonUtil';
import { Link } from 'react-router-dom';
import moment from 'moment';
import SocialProfiles from '../../MedplusMart/components/MartCatalog/ProductDetail/SocialProfiles';
import BrokenBannerImage from "../../images/common/SomeThing-Went-Wrong-h210.svg"

const RelatedArticles = (props) => {
  const [showSocialIcons, setShowSocialIcons] = useState(false)
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    swipeToSlide: true,
    variableWidth: false,
    prevArrow: <SliderPrevArrow />,
    nextArrow: <SliderNextArrow />,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
          breakpoint: 1366,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
    ]

  }
  return (
    <React.Fragment>
      {showSocialIcons && <SocialProfiles isOpen={showSocialIcons} setIsOpen={setShowSocialIcons}/>}
      <Slider className="custom-slide-arrows" {...settings}>
        {props.blogPostArticles.map((each) => {
          let date = new Date(each.dateCreated);
          return (
            <div className='pr-3'>
              <div className='related-card pb-0 test-card mb-3' style={{'min-height':'unset'}}>
                <Link to={getBlogUrl(each.postId, each.title)} title={each.title} role="link" className='d-flex justify-content-center'>
                  <img src={each.featuredMedia?.featuredImage ? each.featuredMedia.featuredImage : ''} alt={each.title} className='img-fluid' onError={(e)=>{e.target.onerror = null; e.target.src = BrokenBannerImage;}} />
                </Link>
                <div className='p-3 d-flex justify-content-between flex-column related-card-body'>
                  <div>
                    <Link to={getBlogUrl(each.postId, each.title)} title={each.title} role="link">
                      <h6 className='font-weight-normal truncate-line-2 mb-0'dangerouslySetInnerHTML={{ __html: each.title }}/>
                    </Link>
                    <small className='text-secondary'>{`by MedPlus Team ,${moment(date).format("MMMM DD, YYYY")}`}</small>
                    <div className='my-3 truncate-line-2' dangerouslySetInnerHTML={{ __html: each.summary }}></div>
                  </div>
                  <div className='btn-fullArticle'>
                    <button type="button" aria-role="button" aria-label='Share this Article' title="Share this Article" className="btn btn-link ml-n2" onClick={() => setShowSocialIcons(!showSocialIcons)}>
                      Share
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" className='mx-2'>
                        <g id="share-icn" transform="translate(-1734 -1071)" clip-path="url(#clip-path)">
                          <path id="share-icn-2" data-name="share-icn" d="M21,11.813a2.794,2.794,0,0,1-2.082-.937l-7.508,4.047c.008.089.027.174.027.265s-.018.164-.025.246l7.518,4.051a2.8,2.8,0,1,1-.742,1.89c0-.038.009-.073.011-.111l-7.584-4.088a2.814,2.814,0,1,1-.015-3.989l7.6-4.095c0-.031-.009-.061-.009-.092A2.813,2.813,0,1,1,21,11.813Z" transform="translate(1731.19 1067.812)" fill="#080808" fill-rule="evenodd"></path>
                        </g>
                      </svg>
                    </button>
                    <Link to={getBlogUrl(each.postId, each.title)} title={each.title} className="btn" role="link">
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
            </div>
          )
        })}
      </Slider>
    </React.Fragment>
  )
}

export default RelatedArticles
