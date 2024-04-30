import React from 'react';

const CategorySliderGhostImage = () => {

    return (
        <div>
            <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent">
                <div className="ph-col-2 m-0"></div>
            </div>
            <section>
                    <div className='home-page-slider-container condition-based-test-slider p-4 d-flex' style={{ "gap": "1rem" }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => {
                            return (
                                <div className='card'>
                                    <div className='card-body p-2'>
                                        <div className='img-container'>
                                            <div className='ph-row ph-item mt-4 p-0'>
                                                <div className='ph-picture' style={{ "height": "3rem", "width": "3rem" }}></div>
                                            </div>
                                        </div>
                                        <div className="ph-row ph-item p-0 m-0 mb-4">
                                            <div className="ph-col-12 m-0"></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
        </div>
    );
}
export default CategorySliderGhostImage;