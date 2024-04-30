import React from 'react'

const TopSearchGhsotImage = () => {
    return (
        <section className='p-4'>
            <div className="ph-row ph-item p-0 mb-4">
                <div className="ph-col-4" style={{ "height": "2rem" }}></div>
            </div>
            <ul className='search-product-list row pl-3'>
                {Array.from(Array(50).keys()).map(() => {
                    return (
                        <div className="p-0 ph-item ph-row w-25 mb-4">
                            <div className="ph-col-6"></div>
                        </div>
                    )
                })}
            </ul>

            <div className="ph-row ph-item p-0 mb-4">
                <div className="ph-col-4" style={{ "height": "2rem" }}></div>
            </div>
            <ul className='search-product-list row pl-3'>
                {Array.from(Array(50).keys()).map(() => {
                    return (
                        <div className="p-0 ph-item ph-row w-25 mb-4">
                            <div className="ph-col-6"></div>
                        </div>
                    )
                })}
            </ul>
        </section>
    )
}

export default TopSearchGhsotImage