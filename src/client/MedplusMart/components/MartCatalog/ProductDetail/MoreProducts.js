import React from 'react';
import { Link } from 'react-router-dom';
import { getCategoryIdFromParam, getCategoryNameForUrl, getCategoryNameFromParam } from '../../../../helpers/CommonUtil';
import Validate from '../../../../helpers/Validate';

const MoreProducts = (props) => {

    const validate = Validate();

    return (
        <React.Fragment>
            {validate.isNotEmpty(props.product) && props.product.isGeneral === 'Y' &&
                <div className={`content-conatiner shadow-sm ${window.screen.width > 1024 ? "bg-white rounded-xl" : ""}`}>
                    <ul class="product-list-container p-0 More-Products">
                        {validate.isNotEmpty(props.product.brand) && <li className="list-element">
                            <Link to={`/brand/${props.product.brand}`} className="p-2 btn btn-link d-flex justify-content-between align-items-center no-underline" role="link">
                                <span>More Products from {props.product.brand}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                    <g id="rightchevron_black_icon_24px" transform="translate(-906.838 786) rotate(-90)">
                                        <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none"></rect>
                                        <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808"></path>
                                    </g>
                                </svg>
                            </Link>
                        </li>}
                        {validate.isNotEmpty(props.categoryNames) && Object.keys(props.categoryNames).length > 0 && Object.keys(props.categoryNames).map(key =>
                            <React.Fragment>
                                {<li className='list-element'>
                                    <Link to={`/categories/${getCategoryNameForUrl(props.categoryNames[key], getCategoryIdFromParam(key))}`} className="p-2 btn btn-link d-flex justify-content-between align-items-center no-underline" role="link">
                                        <span>More {props.categoryNames[key]}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                            <g id="rightchevron_black_icon_24px" transform="translate(-906.838 786) rotate(-90)">
                                                <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none"></rect>
                                                <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808"></path>
                                            </g>
                                        </svg>
                                    </Link>
                                </li>}
                                {validate.isNotEmpty(props.product.brand) && validate.isNotEmpty(props.categoryNames) && <li className='list-element'>
                                    <Link to={`/categories/${getCategoryNameForUrl(props.categoryNames[key], getCategoryIdFromParam(key)) + "?b::" + props.product.brand}`} className="p-2 btn btn-link d-flex justify-content-between align-items-center no-underline" role="link">
                                        <span>More {props.categoryNames[key]} from {props.product.brand}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                            <g id="rightchevron_black_icon_24px" transform="translate(-906.838 786) rotate(-90)">
                                                <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none"></rect>
                                                <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808"></path>
                                            </g>
                                        </svg>
                                    </Link>
                                </li>}
                            </React.Fragment>)
                        }
                    </ul>
                </div>}
        </React.Fragment>
    )
}
export default MoreProducts;