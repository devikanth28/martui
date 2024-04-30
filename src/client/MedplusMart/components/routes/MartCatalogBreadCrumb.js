import React from 'react';
import { Link } from 'react-router-dom';
import CONFIG from '../../../constants/ServerConfig';
import Validate from '../../../helpers/Validate';

const MartCatalogBreadCrumb = (props) => {
    const validate=Validate();
    let postId=props.match.params.postId;
    let categoryId=props.match.params.categoryId;
    const categoryName=props.match.params.categoryName;
    const postName=props.match.params.postName;
    const goToHome = () => {
       window.location.href = CONFIG.REDIRECT_HOME_URL;
    }
     
    return (
        <React.Fragment>
            {props.isBlog && <nav aria-label="breadcrumb bg-none"  className='m-3 px-3 py-1' style={{ "background-color": "#2b2d42" }}>
            <ol className="breadcrumb m-0 bgclr-tpt" itemScope itemType='https://schema.org/BreadcrumbList'>
                <React.Fragment>
                    <li className='breadcrumb-item bg-none p-0 mb-0 martBreadCrumbList' itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                        <span itemProp='name' content='home'>
                        <a href="/" className="breadCrumbItemDisable" itemprop="item" title="Home">Home</a>
                            <meta itemProp='position' content='1'></meta>
                        </span>
                    </li>
                    <li className="breadcrumb-item martBreadCrumbList" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                        <span itemProp='name' content="HealthLife" >
                            <a href='/healthy-life' itemprop="item" title="HealthLife" className={props.routePath=="health_Life"?"breadCrumbItem":"breadCrumbItemDisable"}>HealthLife</a>
                            <meta itemProp='position' content='2'></meta>
                        </span>
                    </li>
                    {props.routePath=="blogPostCategoryDetail"?<li className="breadcrumb-item martBreadCrumbList" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                            <span itemProp="name" content={categoryName} >
                                {props.routePath == "blogPostCategoryDetail"?<a href={`/healthy-life/category/${categoryId}/${categoryName}`} title={categoryName} className={props.routePath=="blogPostCategoryDetail"?"breadCrumbItemDisable":"breadCrumbItem"}>{categoryName}</a>:<a href="javascript:void(o)" title={categoryName} className={props.routePath=="blogPostCategories"?"breadCrumbItem":"breadCrumbItemDisable"}>{categoryName}</a>}
                            </span>
                            <meta itemProp='position' content={props.routePath == "blogPostCategoryDetail"?'3':'4'}></meta>
                    </li>:``}
                    {validate.isNotEmpty(categoryId)  ? <li className="breadcrumb-item martBreadCrumbList" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                            <span itemProp="name" content={categoryName} >
                                {props.routePath == "blogPostCategoryDetail"?<a href={`/healthy-life/category/${categoryId}/${categoryName}`} title={categoryName} className={props.routePath=="blogPostCategoryDetail"?"breadCrumbItem":"breadCrumbItemDisable"}>{categoryName}</a>:<a href="javascript:void(o)" title={categoryName} className={props.routePath=="blogPostCategories"?"breadCrumbItem":"breadCrumbItemDisable"}>{categoryName}</a>}
                            </span>
                            <meta itemProp='position' content={props.routePath == "blogPostCategories"?'3':'4'}></meta>
                    </li>:(validate.isNotEmpty(postId)&& validate.isNotEmpty(postName))?<li className="breadcrumb-item martBreadCrumbList" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                            <span itemProp="name" content={postName} >
                           <a href="javascript:void(0)" title={postName} className="breadCrumbItem">{postName}</a>
                            </span>
                            <meta itemProp='position' content='4'></meta>
                    </li>:``}
                </React.Fragment>
            </ol>
            <h2 class="ml-3 text-white">Healthy Life</h2>
        </nav>
            }
            {!props.isBlog &&
            <nav aria-label="breadcrumb bg-none">
                <ol className="breadcrumb m-0 bgclr-tpt" itemScope itemType='https://schema.org/BreadcrumbList'>
                    {!(props.routePath == 'signInPopUp' || props.routePath == 'signin-otp-verify') &&
                        <React.Fragment>
                            <li className='breadcrumb-item bg-none p-0 mb-0' itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                                <span itemProp='name' content='home'>
                                    <Link to="/" itemProp='item' title = "Home"> Home </Link>
                                    <meta itemProp='position' content='1'></meta>
                                </span>
                            </li>
                            {props.routePath == 'paybackPoints' &&
                                <li className="breadcrumb-item text-brand" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                                    <span itemProp='name' content="paybackPoints">
                                        <span  title="MedPlus Payback Points" >MedPlus Payback Points</span>
                                        <meta itemProp='position' content='2'></meta>
                                    </span>
                                </li>
                            }
                        </React.Fragment>
                    }
                </ol>
            </nav>}
        </React.Fragment>
    );
}

export default MartCatalogBreadCrumb;