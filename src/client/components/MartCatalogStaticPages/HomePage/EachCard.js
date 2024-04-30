import React, { useState } from 'react'
import AddtoCartButton from './AddtoCartButton';

const EachCard = (props) => {
    const [addtoCart , setaddtoCart] = useState(false)
    let data = props.product
    return (
        <React.Fragment>
            <div className="item h-100">
                <div className="card product-card my-3 mx-2">
                    <div className="card-body p-2 pointer">
                        <div>
                            <div className={addtoCart ? "text-center position-relative mb-2 eachCard":"text-center position-relative mb-2" }>
                                <img src={data.imageSrc} className="d-inline-block" alt={data.imagealtname} role="img"/>
                                <a href="javascript:void(0)" className="wishlist-icon btn btn-link no-underline" title="add to wishlist">
                                   { <svg className="not-active" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <g id="wishlist_black_icon_18px" transform="translate(-48.701 -387.452)">
                                            <rect id="BG_Guide" data-name="BG Guide" width="18" height="18" transform="translate(48.701 387.452)" fill="none" />
                                            <g id="Group_14546" data-name="Group 14546" transform="translate(48.941 388.417)">
                                                <path id="Path_22928" data-name="Path 22928" d="M57.821,404.585a1.156,1.156,0,0,1-.763-.286c-.7-.611-1.373-1.186-1.97-1.695a37.336,37.336,0,0,1-4.382-4.111,6.635,6.635,0,0,1-1.766-4.347,5.6,5.6,0,0,1,1.423-3.824,4.834,4.834,0,0,1,3.6-1.566,4.53,4.53,0,0,1,2.83.977,5.657,5.657,0,0,1,1.031,1.045,5.66,5.66,0,0,1,1.032-1.045,4.53,4.53,0,0,1,2.83-.977,4.835,4.835,0,0,1,3.6,1.566,5.6,5.6,0,0,1,1.422,3.824,6.634,6.634,0,0,1-1.766,4.347,36.933,36.933,0,0,1-4.353,4.088c-.608.518-1.291,1.1-2,1.719A1.159,1.159,0,0,1,57.821,404.585ZM53.96,390.043a3.562,3.562,0,0,0-2.65,1.151,4.319,4.319,0,0,0-1.083,2.952,5.358,5.358,0,0,0,1.47,3.525,36.286,36.286,0,0,0,4.2,3.933c.6.509,1.245,1.063,1.92,1.652.686-.6,1.341-1.154,1.922-1.649a36.272,36.272,0,0,0,4.2-3.935,5.356,5.356,0,0,0,1.47-3.525,4.319,4.319,0,0,0-1.083-2.952,3.56,3.56,0,0,0-2.649-1.151,3.273,3.273,0,0,0-2.042.707,4.844,4.844,0,0,0-1.15,1.333.779.779,0,0,1-1.337,0A4.825,4.825,0,0,0,56,390.75,3.274,3.274,0,0,0,53.96,390.043Z" transform="translate(-48.941 -388.756)" fill="#E71C37" />
                                            </g>
                                        </g>
                                    </svg> }
                                </a>
                            </div>
                            <h6 className="truncate-line-2" style={{minHeight :'2.375rem'}}>                          
                               <span>{data.productname}</span>
                            </h6>
                            <div className="d-flex">
                                    <h6 className="mb-0"><strong className="rupee">&#x20B9;</strong>&nbsp;500
                                    </h6>
                                    <p className="mb-0 text-secondary font-14 ml-2">&#x20B9;&nbsp;<del>600</del></p>
                                    <p class="mb-0 font-14 ml-2">( <span className='font-weight-bold'>Save &#x20B9;&nbsp;200</span> )</p>
                                </div>
                            </div>                        
                    </div>
                    <div className="card-footer p-2 bg-white">
                        <AddtoCartButton isavailable = {true} addedStatus= {addtoCart} added= {setaddtoCart} isoutofStock ={false} classStyle = "btn btn-block btn-brand"></AddtoCartButton>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default EachCard