import React from 'react'
import ProductCompositionCard from './ProductCompositionCard'
import { popOverPlacement } from '../helpers/CommonUtil'


const KymCompositionSearchResult = (props) => {
    return(
        <React.Fragment>
            <div className='m-3'>
                <section className='py-3 px-2'>
                    <div className='align-items-center d-flex justify-content-between mb-3 px-2'>
                        <h5 className='mb-0' title={"Pantoprazole 40 MG Products"}> Pantoprazole 40 MG Products</h5>
                        <p className="mb-0 font-14 text-secondary">30/800</p>
                    </div>
                    <div className="d-flex flex-wrap home-page-products-slider w-100" style={{'gap':'0.5rem 0rem'}}>
                        {[0,1, 2, 3, 4, 5, 6, 7].map((index) => (
                             <div className="drugInfo-all-products">
                                    <ProductCompositionCard cardIndex={`${popOverPlacement(index + 1)}`} genericMedicine={true}></ProductCompositionCard>
                             </div>
                        ))}
                        {/* example for the Branded Medicine  */}
                        <div className="drugInfo-all-products">
                            <ProductCompositionCard cardIndex={`${popOverPlacement(2)}`} ></ProductCompositionCard>
                        </div>
                        
                    </div>
                </section>
            </div>

        </React.Fragment>
    )





}

export default KymCompositionSearchResult