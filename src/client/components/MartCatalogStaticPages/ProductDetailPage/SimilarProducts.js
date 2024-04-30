import React from 'react'
import SimilarproductsPlaceholders from './ProductDetailPagePlaceholders/SimilarproductsPlaceholders'

const SimilarProducts = (props) => {
    return (
        <React.Fragment>
            {false && <section className='bg-transparent'>
                <h6>Other Products</h6>
                <div>
                    {[0, 1, 2, 3, 4, 5].map((index) => <section className='shadow-none p-2 OtherProductDetails'>
                        <div className='row mx-0'>
                            <div className='col-2 text-center p-0'>
                                <a href="javascript:void(0)" className='no-underline' title='Horlicks-Promo-Pack-500Gm-X-2'>
                                    <img src="https://static2.medplusmart.com/products/_bec2b3_/HORL0022_S.jpg"
                                        alt="Horlicks-Promo-Pack-500Gm-X-2" className='img-fluid' width="60" />
                                </a>
                            </div>
                            <div className='col-10 pr-0'>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <a href="javascript:void(0)" className='d-block font-14 mb-1 no-underline text-primary'>HUGGIES WONDER PANTS MEGA JUMBO PACK S 120S</a>
                                        <div className="d-flex mb-1">
                                            <h6 className="mb-0"><strong className="rupee">&#x20B9;</strong>&nbsp;500</h6>
                                            <p className="mb-0 text-secondary font-14 ml-2">&#x20B9;&nbsp;<del>600</del></p>
                                        </div>
                                        <p class="mb-0 font-14">Save &#x20B9;&nbsp;200</p>
                                    </div>
                                    <div>
                                        <a href="javascript:void(0)" className="wishlist-icon btn btn-link no-underline" title="add to wishlist">
                                            {<svg className="not-active" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                                <g id="wishlist_black_icon_18px" transform="translate(-48.701 -387.452)">
                                                    <rect id="BG_Guide" data-name="BG Guide" width="18" height="18" transform="translate(48.701 387.452)" fill="none" />
                                                    <g id="Group_14546" data-name="Group 14546" transform="translate(48.941 388.417)">
                                                        <path id="Path_22928" data-name="Path 22928" d="M57.821,404.585a1.156,1.156,0,0,1-.763-.286c-.7-.611-1.373-1.186-1.97-1.695a37.336,37.336,0,0,1-4.382-4.111,6.635,6.635,0,0,1-1.766-4.347,5.6,5.6,0,0,1,1.423-3.824,4.834,4.834,0,0,1,3.6-1.566,4.53,4.53,0,0,1,2.83.977,5.657,5.657,0,0,1,1.031,1.045,5.66,5.66,0,0,1,1.032-1.045,4.53,4.53,0,0,1,2.83-.977,4.835,4.835,0,0,1,3.6,1.566,5.6,5.6,0,0,1,1.422,3.824,6.634,6.634,0,0,1-1.766,4.347,36.933,36.933,0,0,1-4.353,4.088c-.608.518-1.291,1.1-2,1.719A1.159,1.159,0,0,1,57.821,404.585ZM53.96,390.043a3.562,3.562,0,0,0-2.65,1.151,4.319,4.319,0,0,0-1.083,2.952,5.358,5.358,0,0,0,1.47,3.525,36.286,36.286,0,0,0,4.2,3.933c.6.509,1.245,1.063,1.92,1.652.686-.6,1.341-1.154,1.922-1.649a36.272,36.272,0,0,0,4.2-3.935,5.356,5.356,0,0,0,1.47-3.525,4.319,4.319,0,0,0-1.083-2.952,3.56,3.56,0,0,0-2.649-1.151,3.273,3.273,0,0,0-2.042.707,4.844,4.844,0,0,0-1.15,1.333.779.779,0,0,1-1.337,0A4.825,4.825,0,0,0,56,390.75,3.274,3.274,0,0,0,53.96,390.043Z" transform="translate(-48.941 -388.756)" fill="#080808" />
                                                    </g>
                                                </g>
                                            </svg>}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>)}
                </div>
            </section>}
            {true && <div className="border p-0 rounded">
                <div className="px-2">
                    <h4 className="font-16 my-2">Alternatives for DOLO 650MG TAB</h4>
                    <p className="font-14 mb-0 my-2">Drugs with same composition &amp; strength</p>
                </div>

                <div className='similar-products'>
                    <div className='similar-products-scroll alternatives'>
                      {[0,1,2,3,4,5,6].map((each,index) => {return  <div>
                            <div className="border-top p-2">
                                <small className="d-block text-secondary"><span>WYNCLARK PHARMACEUTICALS PVT LTD</span></small>
                                <span>
                                    <a href="/product/parawyn-650mg-tab_para0601" className="font-14 productname">PARAWYN 650MG TAB</a></span><br />
                                <span className="small">10 Units / pack </span><br />
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="m-0">
                                            <small className="rupee">₹<span className="font-weight-bold">19.20</span>
                                                <small className={index%2==0 ? "pricedrop ml-1" : "pricehike ml-1"}>7.0%</small></small>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" className={index%2==0 ? "":"pricehike-rotation"}>
                                                    <g id="bottomcaret_black_icon_18px" transform="translate(-762.18 -983.18)">
                                                        <rect id="Rectangle_4719" data-name="Rectangle 4719" width="18" height="18" transform="translate(780.18 1001.18) rotate(180)" fill="none"></rect>
                                                        <path id="Path_23398" data-name="Path 23398" d="M61.248,563.964a.367.367,0,0,1-.538,0l-2.416-2.808L56.008,558.5c-.165-.192-.007-.465.269-.465h9.4c.277,0,.434.273.269.465l-2.284,2.655Z" transform="translate(710.133 431.054)" fill={index%2==0 ?"#E71C37": '#08CE73'}></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="m-0">
                                            <span className="small instock">In Stock</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>})}
                    </div>
                </div>
                
                <div className="text-center alert alert-warning mb-3"> No more product</div>


            </div>}
            <SimilarproductsPlaceholders />
        </React.Fragment>
    )
}
export default SimilarProducts