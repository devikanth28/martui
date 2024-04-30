import React, { useState } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import ProductZoomPlaceholder from './ProductDetailPagePlaceholders/ProductZoomPlaceholder';
import AddtoCartButton from '../HomePage/AddtoCartButton'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import StoresNearby from './StoresNearby';


const ProductImage = (props) => {
    const [selectedImage, setSelectedImage] = useState('https://static2.medplusmart.com/products/_9612b4_/COMP0018_S.jpg')
    const [addtoCart, setaddtoCart] = useState(false)
    const [storeNearMe, setStoreNearMe] = useState(false)
    return (
        <React.Fragment>
            <section className='p-3 Product-Section'>
                <div>
                    <div className="Product-Detail">
                        <div className='product-detail-container border-all mr-3'>
                            <div className='product-image-container-small'>
                                <a href="#" className="m-1 active" title='complain' onClick={() => setSelectedImage("https://static2.medplusmart.com/products/_9612b4_/COMP0018_S.jpg")} >
                                    <img id="img_01" title='complain' src="https://static2.medplusmart.com/products/_9612b4_/COMP0018_S.jpg" /></a>
                                <a href="#" className="m-1" title='complain' onClick={() => setSelectedImage("https://static2.medplusmart.com/products/_da597b_/COMP0018_1_S.jpg")}>
                                    <img id="img_01" title='complain' src="https://static2.medplusmart.com/products/_da597b_/COMP0018_1_S.jpg" /></a>
                                <a href="#" className="m-1" title='Nutration inforamtion' onClick={() => setSelectedImage("https://static2.medplusmart.com/products/_95e3a2_/COMP0018_2_S.jpg")}>
                                    <img id="img_01" title='Nutration inforamtion' src="https://static2.medplusmart.com/products/_95e3a2_/COMP0018_2_S.jpg" /></a>
                                <a href="#" className="m-1" title='Nutration inforamtion' onClick={() => setSelectedImage("https://static2.medplusmart.com/products/_95e3a2_/COMP0018_2_S.jpg")}>
                                    <img id="img_01" title='Nutration inforamtion' src="https://static2.medplusmart.com/products/_95e3a2_/COMP0018_2_S.jpg" /></a>
                            </div>
                            <div className='product-image-container-large'>
                                <div>
                                    <a className="btn btn-link btn-small icnwishlist txtctr" href="javascript:;" title="Add to WishList">
                                        <svg className="not-active" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                            <g id="wishlist_black_icon_18px" transform="translate(-48.701 -387.452)">
                                                <rect id="BG_Guide" data-name="BG Guide" width="18" height="18" transform="translate(48.701 387.452)" fill="none" />
                                                <g id="Group_14546" data-name="Group 14546" transform="translate(48.941 388.417)">
                                                    <path id="Path_22928" data-name="Path 22928" d="M57.821,404.585a1.156,1.156,0,0,1-.763-.286c-.7-.611-1.373-1.186-1.97-1.695a37.336,37.336,0,0,1-4.382-4.111,6.635,6.635,0,0,1-1.766-4.347,5.6,5.6,0,0,1,1.423-3.824,4.834,4.834,0,0,1,3.6-1.566,4.53,4.53,0,0,1,2.83.977,5.657,5.657,0,0,1,1.031,1.045,5.66,5.66,0,0,1,1.032-1.045,4.53,4.53,0,0,1,2.83-.977,4.835,4.835,0,0,1,3.6,1.566,5.6,5.6,0,0,1,1.422,3.824,6.634,6.634,0,0,1-1.766,4.347,36.933,36.933,0,0,1-4.353,4.088c-.608.518-1.291,1.1-2,1.719A1.159,1.159,0,0,1,57.821,404.585ZM53.96,390.043a3.562,3.562,0,0,0-2.65,1.151,4.319,4.319,0,0,0-1.083,2.952,5.358,5.358,0,0,0,1.47,3.525,36.286,36.286,0,0,0,4.2,3.933c.6.509,1.245,1.063,1.92,1.652.686-.6,1.341-1.154,1.922-1.649a36.272,36.272,0,0,0,4.2-3.935,5.356,5.356,0,0,0,1.47-3.525,4.319,4.319,0,0,0-1.083-2.952,3.56,3.56,0,0,0-2.649-1.151,3.273,3.273,0,0,0-2.042.707,4.844,4.844,0,0,0-1.15,1.333.779.779,0,0,1-1.337,0A4.825,4.825,0,0,0,56,390.75,3.274,3.274,0,0,0,53.96,390.043Z" transform="translate(-48.941 -388.756)" fill="#888" />
                                                </g>
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                                <ReactImageMagnify {...{
                                    smallImage: {
                                        alt: 'Wristwatch by Ted Baker London',
                                        isFluidWidth: true,
                                        src: 'https://static2.medplusmart.com/products/_9612b4_/COMP0018_L.jpg',
                                        width: 192,
                                    },
                                    largeImage: {
                                        src: 'https://static2.medplusmart.com/products/_9612b4_/COMP0018_L.jpg',
                                        width: 1200,
                                        height: 2800,
                                    },
                                    enlargedImageContainerDimensions: {
                                        width: '300%',
                                        height: '150%'
                                    },
                                    enlargedImageClassName: 'largeimage'
                                }} />
                            </div>
                        </div>
                        {true && <div className="product-detail-instructions">
                            <div className='product-detail-description col-8'>
                                <span className="d-block">
                                    <a className="composition-title composition-underline small" href="/brand/COMPLAN" title="COMPLAN">COMPLAN</a>
                                </span>
                                <h5 className="composition-header">COMPLAN PISTA BADAM REFILL 500GM</h5>
                                <p className="font-14 mb-0  mt-2 composition-country">Country of origin: INDIA</p>
                                <p className="mb-0 mt-2">
                                    <a href="javascript:void(0)" className="font-14  composition-country text-decoration-none"> Seller Information
                                        <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="8" viewBox="0 0 16 8">
                                            <path fill="#2699fb" d="M4.52,14.5A2.482,2.482,0,0,1,7,12.02h3.2V10.5H7a4,4,0,1,0,0,8h3.2V16.98H7A2.482,2.482,0,0,1,4.52,14.5Zm3.28.8h6.4V13.7H7.8ZM15,10.5H11.8v1.52H15a2.48,2.48,0,0,1,0,4.96H11.8V18.5H15a4,4,0,0,0,0-8Z" transform="translate(-3 -10.5)"></path>
                                        </svg>
                                    </a>
                                </p>
                                <div>
                                    <div className="font-14 mt-3 strong composition-title">
                                        Other Variants
                                    </div>
                                    <div className="prod-variant">
                                        <ul className="list-inline">
                                            <li><a href="javascript:void(0)" title="200 grams" className='disabled'>200 grams</a></li>
                                            <li><a href="javascript:void();" title="500 grams" className='active'>500 grams</a></li>
                                            <li><a href="javascript:void(0)" title="200 grams">200 grams</a></li>
                                            <li><a href="javascript:void();" title="500 grams" className='active'>500 grams</a></li>
                                            <li><a href="javascript:void(0)" title="200 grams">200 grams</a></li>
                                            <li><a href="javascript:void();" title="500 grams" className="active">500 grams</a></li>
                                            <li><a href="javascript:void(0)" title="200 grams">200 grams</a></li>
                                            <li><a href="javascript:void();" title="500 grams" className="active">500 grams</a></li>
                                        </ul>
                                    </div>
                                    <div className='d-flex additional-info'>
                                        <div>
                                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                <path fill="#E71C37" d="M9.571,6.678a.752.752,0,0,1,.75-.75h.5a.752.752,0,0,1,.75.75v.5a.752.752,0,0,1-.75.75h-.5a.752.752,0,0,1-.75-.75Zm3,7.25h-4v-1h1v-3h-1v-1h3v4h1Zm-2-12a8,8,0,1,0,8,8,8,8,0,0,0-8-8Zm0,14.5a6.5,6.5,0,1,1,6.5-6.5A6.5,6.5,0,0,1,10.571,16.428Z" transform="translate(-2.571 -1.928)"></path>
                                            </svg>
                                        </div>
                                        <p className='mb-0 info'>Sale of this Medicine is restricted. Please choose from alternatives</p>        
                                    </div>
                                </div>
                            </div>
                            <div className='product-detail-checkout'>
                                <div className="text-right">
                                    <span>
                                        <a className='btn btn-link btn-small pr-0'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
                                                <g id="Group_22090" data-name="Group 22090" transform="translate(-843 -225)">
                                                    <g id="Ellipse_1106" data-name="Ellipse 1106" transform="translate(843 225)" fill="#fff" stroke="#afb5ba" stroke-width="1">
                                                        <circle cx="22" cy="22" r="22" stroke="none" />
                                                        <circle cx="22" cy="22" r="21.5" fill="none" />
                                                    </g>
                                                    <g id="Group_21948" data-name="Group 21948">
                                                        <rect id="Rectangle_5817" data-name="Rectangle 5817" width="24" height="24" rx="12" transform="translate(853 235)" fill="none" />
                                                        <path id="Icon_material-share" data-name="Icon material-share" d="M19.5,17.078a2.912,2.912,0,0,0-1.96.77L10.41,13.7a3.273,3.273,0,0,0,.09-.7,3.273,3.273,0,0,0-.09-.7l7.05-4.109A2.993,2.993,0,1,0,16.5,6a3.273,3.273,0,0,0,.09.7L9.54,10.809a3,3,0,1,0,0,4.379l7.12,4.159a2.82,2.82,0,0,0-.08.65,2.92,2.92,0,1,0,2.92-2.92Z" transform="translate(849.5 234)" fill="#6c757d" />
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </span>
                                    <h4 className="mb-0"><small className="rupee">₹</small>&nbsp;300</h4>
                                    <p className="mt-1 font-14 mb-2">
                                        MRP
                                        <small className="rupee">&nbsp;₹</small>
                                        <strike className="text-secondary">&nbsp;325</strike>
                                    </p>
                                </div>
                                <div>
                                    <span className="inclusive text-secondary text-right d-block mb-1">Inclusive of all Taxes</span>
                                </div>
                                <div className="disc-offer-badge"><p className='mb-0'>FLAT Rs 25.00 OFF</p></div>
                                <div className='mt-3'>
                                    {!addtoCart && <AddtoCartButton isavailable={true} getNotified={true} addedStatus={addtoCart} added={setaddtoCart} isoutofStock={true} classStyle="btn btn-block btn-brand custom-btn-lg shadow"></AddtoCartButton>}
                                    {addtoCart && <UncontrolledDropdown className='dropdown'>
                                        <DropdownToggle caret color="black" className='btn-block' style={{ height: '3rem' }}>
                                            Qty 1
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>0</DropdownItem>
                                            <DropdownItem>1</DropdownItem>
                                            <DropdownItem>2</DropdownItem>
                                            <DropdownItem>3</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>}

                                </div>
                            </div>
                        </div>}
                        {false && <div className="product-detail-instructions row no-gutters">
                            <div className="product-detail-description col-8">
                                <div className="py-1 mb-1">
                                    <span className="align-text-top badge badge-pill mr-1 prescription">Rx</span>Prescription Required
                                </div>
                                <div className="p-0 mb-3">
                                    <a className="small composition-title composition-underline" href="/manufacturer/MICRO LABS LIMITED" title="MICRO LABS LIMITED">Mfg/Mkt: micro labs limited</a>
                                    <h4 className="text-uppercase mt-0 composition-country">DOLO 650MG TAB</h4>
                                </div>
                                <div className='mb-3'>
                                    <p className="composition-title small mb-0">Composition</p>
                                    <div className="pr-3 font-14 strong mb-3">
                                        <a href="javascript:void(0);" className="composition-country composition-underline font-weight-bold" title="Click to view relevant composition's products">Paracetamol 650 MG</a>
                                    </div>
                                    <p className="composition-title small mb-1">Therapeutic Class</p>
                                    <div>
                                        <a href="/drugsInfo/medicines/central-nervous-system_10039/non-opioid-analgesics-n-antipyretics_10050" title="Non-Opioid Analgesics &amp; Antipyretics" className="composition-country composition-underline font-weight-bold">Non-Opioid Analgesics &amp; Antipyretics</a>
                                    </div>
                                </div>
                                <p className="composition-country font-14 font-weight-bold mb-0">Country of origin: INDIA</p>
                                <p className="font-weight-bold mb-0 mt-1">
                                    <a href="javascript:void(0)" className="font-14  composition-country text-decoration-none"> Seller Information
                                        <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="8" viewBox="0 0 16 8">
                                            <path fill="#2699fb" d="M4.52,14.5A2.482,2.482,0,0,1,7,12.02h3.2V10.5H7a4,4,0,1,0,0,8h3.2V16.98H7A2.482,2.482,0,0,1,4.52,14.5Zm3.28.8h6.4V13.7H7.8ZM15,10.5H11.8v1.52H15a2.48,2.48,0,0,1,0,4.96H11.8V18.5H15a4,4,0,0,0,0-8Z" transform="translate(-3 -10.5)"></path>
                                        </svg>
                                    </a>
                                </p>
                            </div>

                            <div className="product-detail-checkout col-4 p-0">
                                <div className="text-right">
                                    <span>
                                        <a className="btn btn-link btn-small pr-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
                                                <g id="Group_22090" data-name="Group 22090" transform="translate(-843 -225)">
                                                    <g id="Ellipse_1106" data-name="Ellipse 1106" transform="translate(843 225)" fill="#fff" stroke="#afb5ba" stroke-width="1">
                                                        <circle cx="22" cy="22" r="22" stroke="none"></circle>
                                                        <circle cx="22" cy="22" r="21.5" fill="none"></circle>
                                                    </g>
                                                    <g id="Group_21948" data-name="Group 21948">
                                                        <rect id="Rectangle_5817" data-name="Rectangle 5817" width="24" height="24" rx="12" transform="translate(853 235)" fill="none"></rect>
                                                        <path id="Icon_material-share" data-name="Icon material-share" d="M19.5,17.078a2.912,2.912,0,0,0-1.96.77L10.41,13.7a3.273,3.273,0,0,0,.09-.7,3.273,3.273,0,0,0-.09-.7l7.05-4.109A2.993,2.993,0,1,0,16.5,6a3.273,3.273,0,0,0,.09.7L9.54,10.809a3,3,0,1,0,0,4.379l7.12,4.159a2.82,2.82,0,0,0-.08.65,2.92,2.92,0,1,0,2.92-2.92Z" transform="translate(849.5 234)" fill="#6c757d"></path>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </span>
                                    <p className="mb-0 text-secondary font-14">15 Units/pack</p>
                                    <h4 className="mb-0">
                                        <small className="rupee">₹</small>&nbsp;300
                                    </h4>
                                    <p className="font-14 mb-0">MRP
                                        <small className="rupee">&nbsp;₹</small>
                                        <strike className="text-secondary">&nbsp;325</strike>
                                    </p>
                                </div>
                                <div>
                                    <span className="inclusive text-secondary text-right d-block mb-1">Inclusive of all Taxes</span>
                                </div>
                                <div className="disc-offer-badge">
                                    <p className="mb-0">FLAT Rs 25.00 OFF
                                        <small className="d-block">On bills above <span className="rupee">₹</span> 1000.0</small>
                                    </p>
                                </div>
                                <div className='position-relative'>
                                    <svg id="note_black_icon_18px" xmlns="http://www.w3.org/2000/svg" className='position-absolute' style={{"top":"0.25rem"}} width="18" height="18" viewBox="0 0 18 18"><path id="Icon_awesome-info-circle" data-name="Icon awesome-info-circle" d="M9.563.563a9,9,0,1,0,9,9A9,9,0,0,0,9.563.563Zm0,3.992A1.524,1.524,0,1,1,8.038,6.079,1.524,1.524,0,0,1,9.563,4.554Zm2.032,9.218a.436.436,0,0,1-.435.435H7.966a.436.436,0,0,1-.435-.435V12.9a.436.436,0,0,1,.435-.435H8.4V10.143H7.966a.436.436,0,0,1-.435-.435V8.837A.436.436,0,0,1,7.966,8.4h2.323a.436.436,0,0,1,.435.435v3.629h.435a.436.436,0,0,1,.435.435Z" transform="translate(-0.563 -0.563)"></path></svg>
                                    <p className='pl-4'>our services are not currently available in this location <a className='text-info' href="javascript:void(0)" title="change location"change location>change location</a></p>
                                </div>
                                <div className='mt-3'>
                                    {!addtoCart && <AddtoCartButton isavailable={true} getNotified={false} addedStatus={addtoCart} added={setaddtoCart} isoutofStock={false} classStyle="btn btn-block btn-brand custom-btn-lg shadow"></AddtoCartButton>}
                                    {addtoCart && <UncontrolledDropdown className='dropdown'>
                                        <DropdownToggle caret color="black" className='btn-block' style={{ height: '3rem' }}>
                                            Qty 1
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>0</DropdownItem>
                                            <DropdownItem>1</DropdownItem>
                                            <DropdownItem>2</DropdownItem>
                                            <DropdownItem>3</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>}
                                </div>
                                </div>
                            <div className='d-flex my-2'>
                                <svg id="note_black_icon_18px" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                    <path id="Icon_awesome-info-circle" data-name="Icon awesome-info-circle" d="M9.563.563a9,9,0,1,0,9,9A9,9,0,0,0,9.563.563Zm0,3.992A1.524,1.524,0,1,1,8.038,6.079,1.524,1.524,0,0,1,9.563,4.554Zm2.032,9.218a.436.436,0,0,1-.435.435H7.966a.436.436,0,0,1-.435-.435V12.9a.436.436,0,0,1,.435-.435H8.4V10.143H7.966a.436.436,0,0,1-.435-.435V8.837A.436.436,0,0,1,7.966,8.4h2.323a.436.436,0,0,1,.435.435v3.629h.435a.436.436,0,0,1,.435.435Z" transform="translate(-0.563 -0.563)" fill="#dc3545"/>
                                </svg>
                                <h6 className='text-danger ml-2'>this product has been discontinued by the manufacture and replaced with</h6>
                            </div>
                            <div class="align-items-center col-12 d-flex p-3 justify-content-between" style={{"border":"1px solid"}}>
                                <span class="mb-0">COMPLAN CHOCOLATE REFILL 500GM</span>
                                <button type="button" class="brand-secondary  border border-danger btn px-5 ">VIEW PRODUCT</button>
                            </div>
                        </div>}
                        
                    </div>
                </div>
                <div className='customfooter'>
                    <hr className="my-4 solid" />
                    <div className="row no-gutters">
                        <div className="align-items-center col d-flex" onClick={()=>setStoreNearMe(!storeNearMe)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="38.932" height="32.729" viewBox="0 0 38.932 32.729">
                                <g transform="translate(-1825.002 -387.548)">
                                    <path fill="#404040" stroke="rgba(0,0,0,0)" stroke-miterlimit="0" d="M15072.245,16384.555l-9.014-3.006-8.076,3.006h-.752l-8.072-3.006-9.018,3.006a1.4,1.4,0,0,1-.937-.189c-.374-.184-.374-.562-.374-.937l2.064-15.79a1.466,1.466,0,0,1,.748-.753l8.454-3.01c.189-.185.563,0,.753,0l6.944,2.821,2.443-1.127.941,1.879-2.442.941v13.722l6.386-2.257-.563-7.9a1.113,1.113,0,0,0,.748.189,2.354,2.354,0,0,0,1.127-.189l.563,8.084,7.327,2.258-1.689-13.537-3.006-1.126c.374-.563.563-1.316.938-1.88l3.38,1.316a.8.8,0,0,1,.752.748l2.064,15.79a.685.685,0,0,1-.748.752c0,.189-.378.189-.563.189Zm-24.413-4.511,6.386,2.258v-13.537l-5.448-2.253Zm-7.7-11.279-1.689,13.537,7.323-2.258.752-13.532Zm21.962,1.164s-3.006-6.016-4.511-8.647a6.137,6.137,0,0,1,2.632-7.895,6.073,6.073,0,0,1,7.9,2.631,5.771,5.771,0,0,1,0,5.264c-.942,1.69-4.511,8.647-4.511,8.647a.677.677,0,0,1-.682.423A1,1,0,0,1,15062.092,16369.929Zm-2.067-11.279a2.821,2.821,0,1,0,2.82-2.82A2.894,2.894,0,0,0,15060.024,16358.649Z" transform="translate(-13210.5 -15964.777)"></path>
                                </g>
                            </svg>
                            <p className="mb-0">
                                <a href="javascript:void(0);" className="btn btn-link text-primary text-left">Also available at the<br/> following stores near you</a>
                            </p>
                        </div>
                        <div className="align-items-center col d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="49.023" height="31.01" viewBox="0 0 49.023 31.01">
                                <g transform="translate(0 -94.062)">
                                    <g transform="translate(0 94.062)">
                                        <path d="M45.591,107.208l-1.27-5.078a.768.768,0,0,0,.608-.751v-.819a3.227,3.227,0,0,0-3.224-3.224H35.923V95.648a1.588,1.588,0,0,0-1.586-1.586H4.861a1.588,1.588,0,0,0-1.586,1.586v13.919a.768.768,0,1,0,1.535,0V95.648a.051.051,0,0,1,.051-.051H34.336a.051.051,0,0,1,.051.051v13.919a.768.768,0,1,0,1.535,0v-.87h9.059a2.512,2.512,0,0,1,2.385,1.74H44.98a.768.768,0,0,0-.768.768v1.637a2.408,2.408,0,0,0,2.405,2.405h.87v3.377H45.48a4.86,4.86,0,0,0-9.188,0h-.37v-5.782a.768.768,0,1,0-1.535,0v5.782H18.462a4.86,4.86,0,0,0-9.188,0H4.861a.051.051,0,0,1-.051-.051v-1.689H8.136a.768.768,0,1,0,0-1.535H.768a.768.768,0,1,0,0,1.535H3.275v1.689a1.588,1.588,0,0,0,1.586,1.586H9.008c0,.017,0,.034,0,.051a4.861,4.861,0,1,0,9.723,0c0-.017,0-.034,0-.051h17.3c0,.017,0,.034,0,.051a4.861,4.861,0,1,0,9.723,0c0-.017,0-.034,0-.051h2.509a.768.768,0,0,0,.768-.768V111.2A4.049,4.049,0,0,0,45.591,107.208Zm-9.668-8.336h5.782a1.691,1.691,0,0,1,1.689,1.689v.051H35.923Zm0,8.29v-5.015h6.821L44,107.162ZM13.868,123.537a3.326,3.326,0,1,1,3.326-3.326A3.33,3.33,0,0,1,13.868,123.537Zm27.019,0a3.326,3.326,0,1,1,3.326-3.326A3.33,3.33,0,0,1,40.886,123.537Zm6.6-9.825h-.87a.871.871,0,0,1-.87-.87v-.87h1.74v1.74Z" transform="translate(0 -94.062)"></path>
                                    </g>
                                    <g transform="translate(12.281 118.625)">
                                        <path d="M129.853,350.6a1.586,1.586,0,1,0,1.586,1.586A1.588,1.588,0,0,0,129.853,350.6Z" transform="translate(-128.267 -350.597)"></path>
                                    </g>
                                    <g transform="translate(39.3 118.625)">
                                        <path d="M412.041,350.6a1.586,1.586,0,1,0,1.586,1.586A1.588,1.588,0,0,0,412.041,350.6Z" transform="translate(-410.455 -350.597)"></path>
                                    </g>
                                    <g transform="translate(19.65 115.35)">
                                        <path d="M217.457,316.393H205.995a.768.768,0,1,0,0,1.535h11.463a.768.768,0,1,0,0-1.535Z" transform="translate(-205.227 -316.393)"></path>
                                    </g>
                                    <g transform="translate(1.637 112.075)">
                                        <path d="M27.695,282.188H17.87a.768.768,0,0,0,0,1.535h9.825a.768.768,0,0,0,0-1.535Z" transform="translate(-17.102 -282.188)"></path>
                                    </g>
                                    <g transform="translate(13.919 101.431)">
                                        <path d="M158.143,171.247a.768.768,0,0,0-1.085,0l-6.826,6.826-3.551-3.551a.768.768,0,0,0-1.085,1.085l4.094,4.094a.767.767,0,0,0,1.085,0l7.369-7.369A.768.768,0,0,0,158.143,171.247Z" transform="translate(-145.37 -171.023)"></path>
                                    </g>
                                </g>
                            </svg>
                            <div className="mx-3 mb-0">
                                <p className="small text-secondary mb-0">Delivery option
                                </p>
                                <p className="m-0 font-weight-bold">
                                    Delivery by Mar 22, 2022
                                </p>
                            </div>

                        </div>
                    </div>
                </div>


                <div className='customfooter'>
                    <hr className="my-4 solid" />
                    <div className="row no-gutters">
                        <div className="align-items-center col d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="38.932" height="32.729" viewBox="0 0 38.932 32.729">
                                <g transform="translate(-1825.002 -387.548)">
                                    <path fill="#404040" stroke="rgba(0,0,0,0)" stroke-miterlimit="0" d="M15072.245,16384.555l-9.014-3.006-8.076,3.006h-.752l-8.072-3.006-9.018,3.006a1.4,1.4,0,0,1-.937-.189c-.374-.184-.374-.562-.374-.937l2.064-15.79a1.466,1.466,0,0,1,.748-.753l8.454-3.01c.189-.185.563,0,.753,0l6.944,2.821,2.443-1.127.941,1.879-2.442.941v13.722l6.386-2.257-.563-7.9a1.113,1.113,0,0,0,.748.189,2.354,2.354,0,0,0,1.127-.189l.563,8.084,7.327,2.258-1.689-13.537-3.006-1.126c.374-.563.563-1.316.938-1.88l3.38,1.316a.8.8,0,0,1,.752.748l2.064,15.79a.685.685,0,0,1-.748.752c0,.189-.378.189-.563.189Zm-24.413-4.511,6.386,2.258v-13.537l-5.448-2.253Zm-7.7-11.279-1.689,13.537,7.323-2.258.752-13.532Zm21.962,1.164s-3.006-6.016-4.511-8.647a6.137,6.137,0,0,1,2.632-7.895,6.073,6.073,0,0,1,7.9,2.631,5.771,5.771,0,0,1,0,5.264c-.942,1.69-4.511,8.647-4.511,8.647a.677.677,0,0,1-.682.423A1,1,0,0,1,15062.092,16369.929Zm-2.067-11.279a2.821,2.821,0,1,0,2.82-2.82A2.894,2.894,0,0,0,15060.024,16358.649Z" transform="translate(-13210.5 -15964.777)"></path>
                                </g>
                            </svg>
                            <p className="mb-0">
                                <a href="javascript:void(0);" className="btn btn-link text-primary text-left">Also available at the<br/> following stores near you</a>
                            </p>
                        </div>
                        <div className='col'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className='mr-2 align-text-bottom' viewBox="0 0 24.001 24">
                                <g id="note_color_icon_24px" transform="translate(-144.721 -286)">
                                    <rect id="Rectangle_3284" data-name="Rectangle 3284" width="24" height="24" transform="translate(144.721 286)" fill="none" />
                                    <g id="Group_14533" data-name="Group 14533" transform="translate(145 286)">
                                        <path id="Path_3786" data-name="Path 3786" d="M10.9.039A11.86,11.86,0,0,0,1.35,17.358a2.833,2.833,0,0,1,.143,2.292L0,23.723l4.315-1.438a2.817,2.817,0,0,1,2.169.149A11.862,11.862,0,1,0,10.9.039Z" transform="translate(0 0)" fill="#fc8019" />
                                        <ellipse id="Ellipse_667" data-name="Ellipse 667" cx="9.688" cy="9.688" rx="9.688" ry="9.688" transform="translate(2.093 2.093)" fill="#fff" />
                                        <path id="Union_128" data-name="Union 128" d="M0,12.369v-6.8a1.309,1.309,0,0,1,1.395-1.2,1.309,1.309,0,0,1,1.4,1.2v6.8a1.308,1.308,0,0,1-1.4,1.2A1.308,1.308,0,0,1,0,12.369ZM0,1.395a1.4,1.4,0,1,1,1.395,1.4A1.4,1.4,0,0,1,0,1.395Z" transform="translate(10.467 4.885)" fill="#9b9b9b" />
                                    </g>
                                </g>
                            </svg>
                            <span className='text-warning'>Click 'Get Notified' and enter your details if you want us to source this product for you.</span>
                        </div>
                    </div>
                </div>



            </section>
            <ProductZoomPlaceholder />
            <StoresNearby open={storeNearMe} setopen={setStoreNearMe} />
        </React.Fragment>
    )
}
export default ProductImage