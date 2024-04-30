import React from 'react';
import Image from '../../../components/Common/Image';
import { getCategoryNameForUrl } from '../../../helpers/CommonUtil';
import Validate from '../../../helpers/Validate';
import { getStaticImageUrls } from './CatalogUrls';
import { shopByCategory } from '../../../Analytics/Analytics';
import FadeInSection from '../MartCatalog/ProductCategory/CategoryDetail/Fadein';



const CategoryCard=(props)=>{
    const validate = Validate();
    const getLinksForStaticCatgeory = (categoryName, redirectTo) => {
        if(validate.isNotEmpty(categoryName) && categoryName == 'Pharmacy'){
            props.history.push(redirectTo);
        }
        if(validate.isNotEmpty(categoryName) && categoryName == 'Diagnostics'){
            window.open(redirectTo, "_blank");
        }
        if(validate.isNotEmpty(categoryName) && categoryName == 'MedPlus Advantage'){
            window.open(redirectTo, "_blank");
        }
        if(validate.isNotEmpty(categoryName) && categoryName == 'Doctors'){
            window.open(redirectTo, "_blank");
        }
    }

    const getCategoryImageUrls = (categoryId) => {
        let url = "";
        if(props?.categoryIcons?.length > 0) {
            props.categoryIcons.map((eachBanner) => {
                if(eachBanner.subTextLine1 === "MART_" + categoryId) {
                    url = eachBanner.imagePath;
                    return;
                }
            })
        }
        return url;
    }

    return (
        <React.Fragment>
            <div className="square-card-slider" key={props.category.categoryName}>
                <div className="category-card card">
                    <button className='btn btn-link p-0' title={props.category.categoryName} onClick={() =>{shopByCategory(props.category.categoryName); validate.isNotEmpty(props.category.categoryId) ? props.history.push(`/categories/${getCategoryNameForUrl(props.category.categoryName,props.category.categoryId)}`): getLinksForStaticCatgeory(props.category.categoryName,props.category.redirectTo)}} role="button">
                        <div class="card-body p-0 postion-relative">
                            {(props.category.categoryName == 'Diagnostics' || props.category.categoryName == 'MedPlus Advantage' || props.category.categoryName == 'Doctors' || props.category.categoryId == "10110") &&  <span class="badge badge-success text-dark badge-pill m-2" style={{"animation":"hoverWave 1s linear infinite",'position':'absolute','left':'0'}}>New</span> }
                                <div className="img-container" style={{ "minHeight": "111px" }}>
                                   <FadeInSection>
                                    <Image src={`${validate.isNotEmpty(props.category.categoryId) ? getCategoryImageUrls(props.category.categoryId) : getStaticImageUrls(props.category.categoryName)}`} alt={props.category.categoryName} title={props.category.categoryName} className="img-fluid" />
                                  </FadeInSection>
                                </div>
                        </div>
                        <div className="card-footer bg-transparent p-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <h6 className="mb-0 text-truncate">{props.category.categoryName}
                                </h6>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                    <g transform="translate(-906.838 786) rotate(-90)">
                                        <rect fill="none" width="24" height="24" transform="translate(762 906.838)" />
                                        <path fill="#080808" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>
            </div>


        </React.Fragment>
    //     <div className="item">
    //     <a href="javascript:void(0);" title={props.category.categoryName} onClick={() => validate.isNotEmpty(props.category.categoryId) ? props.history.push(`/categories/${getCategoryNameForUrl(props.category.categoryName,props.category.categoryId)}`): getLinksForStaticCatgeory(props.category.categoryName,props.category.redirectTo)}>
    //         <div className="card border-0">
    //             <div class="card-body p-2">
    //                 <div className="img-container border position-relative text-align-center" style={{"width": "150px","margin":"10px auto","height": "150px","border-radius":"50%","background-color":"#fff"}}>
    //                      <img src={`${validate.isNotEmpty(props.category.categoryId) ? getCategoryUrls(props.category.categoryId): getStaticImageUrls(props.category.categoryName)}`} alt={props.category.categoryName} title={props.category.categoryName} className="img-fluid" role="img" />
    //                 </div>
    //                 <h6 className="card-title">{props.category.categoryName}
    //                 <br/>
    //                 {(props.category.categoryName == 'Diagnostics' || props.category.categoryName == 'Medplus Advantage' || props.category.categoryName == 'Doctors') &&  <span class="badge badge-success" style={{"animation":"hoverWave 1s linear infinite"}}>New</span> }</h6>
    //             </div>
    //         </div>
    //     </a>
    // </div>
    );
}
export default CategoryCard;
