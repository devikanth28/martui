import React, { useState } from 'react'
import AddtoCartButton from '../HomePage/AddtoCartButton';
import Validate from '../../../helpers/Validate';
const SearchAllProduct = (props) => {
    let data = props.data;
    const [addtoCart, setaddtoCart] = useState(false)
    const validate  = Validate();
    let pageCount=[1,2,3]
    return (
        <React.Fragment>
            <section className='wishlist-content'>
                <div className="page-header">
                    <h3 className="font-weight-normal p-2">Showing results for "<span className='text-danger'>para</span>"</h3>
                </div>
                <div className='searchAll-product-list row m-0 px-2'>
                    <div className='w-100 d-flex flex-wrap'>
                        {data.map((each) => {
                            return (
                                <div className='each-product searchall-product'>
                                    <div className='card p-2' style={{"height":"21.063rem"}}>
                                        <div className='photo' style={{ "height": "12rem" }}>
                                            <a href='javascript:void(0)' title={each.productName}>
                                                <img src={each.imageUrl} className="my-3" alt={each.productName}/>
                                            </a>
                                        </div>
                                        <a href="javascript:void(0)" title={each.productName}>
                                            <h6 className='card-title mb-1' style={{ "height": "unset", "max-height": "2.375rem" }}>{each.productName}</h6>
                                        </a>
                                        <div className='d-flex justify-content-between'>
                                            <p className="mb-0 font-weight-bold">
                                                <span className="text-secondary small">packSize</span>
                                                {each.packSize}
                                            </p>
                                            <div className='d-flex'>
                                                <p className="text-right mb-0 font-weight-bold">
                                                    <strong className="rupee"> &#x20b9;</strong>{each.discountedPrice}
                                                </p>
                                                <p className="text-right mb-0 ml-2">
                                                    <span className="text-secondary small">MRP</span>
                                                    <strong className="rupee"> &#x20b9;</strong>
                                                    <del>{each.mrp}</del>
                                                </p>
                                            </div>
                                        </div>
                                        <AddtoCartButton isavailable={true} addedStatus={addtoCart} added={setaddtoCart} isoutofStock={false} classStyle="btn btn-block btn-brand-gradient mt-4 rounded-pill"></AddtoCartButton>
                                    </div>
                                </div>

                            )
                        })}
                    </div>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <button className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {pageCount.map((each) => {
                            return (
                                <li className="page-item"><button className="page-link active-button" href="#">{each}</button></li>
                            )
                        })}
                        <li className="page-item">
                            <button className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </section>
        </React.Fragment>
    )
}

export default SearchAllProduct