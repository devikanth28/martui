import React from "react";

const CategoryDetailGhostImage = (props) => {
    return (
        <React.Fragment>
            {!props.onlyProducts ? <React.Fragment>
                
                <section className="home-page-products-slider px-2 py-3">
                    {props.viewAll ?
                    <div>
                        <div className="bg-transparent m-0 pt-2 mb-3 ml-1 p-0 ph-item ph-row">
                    <div className="ph-col-2 m-0" style={{ "height": "1.5rem" }}></div>
                </div>
                <div className="bg-transparent m-0 pt-2 mb-3  p-0 ph-item ph-row">
                    {[1,2,3,4,5].map((each)=>{
                        return(
                            <div className={`ph-col-1 rounded-pill ${each == 1? 'ml-1' :'ml-3'}`} style={{"height":"2rem"}}></div>
                        )
                    })}
                </div>
                        <div className='d-flex flex-wrap w-100'>
                            {[1, 2, 3, 4, 5, 6].map((each) => {
                                return (
                                    <div className="category-card-ghostImage">
                                        <div className=" card mx-2 product-card">
                                            <div className="card-body p-2 pointer">
                                                <div>
                                                    <div className="text-center position-relative mb-2">
                                                        <div className="mt-4 ph-row ph-item py-0 mx-auto" style={{ "width": "9rem" }}>
                                                            <div className="mb-4 mx-auto ph-picture" style={{ "height": "7.125rem","border-radius":"1rem"}}></div>
                                                        </div>
                                                    </div>
                                                    <div className="m-0 mb-2 p-0 ph-item ph-row">
                                                        <div className="m-0 ml-auto mx-3 mx-5 ph-col-10"></div>
                                                    </div>
                                                    <div className="m-0 mb-3 p-0 ph-item ph-row">
                                                        <div className="m-0 ph-col-6"></div>
                                                    </div>
                                                    <div className="m-0 mb-2 p-0 ph-item ph-row">
                                                        <div className="m-0 ph-col-10"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer p-2 bg-white">
                                                <div className="ph-row ph-item p-0 mb-0 rounded-pill">
                                                    <div className="ph-col-12 m-0" style={{ "height": "2.5rem" }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}</div>
                            </div> : [1, 2, 3, 4, 5, 6].map((each) => {
                                return (
                                    <div className="item h-100 my-2" style={{ "width": "18.375rem" }}>
                                        <div className="h-100 card mx-2 product-card">
                                            <div className="card-body p-2 pointer">
                                                <div>
                                                    <div className="text-center position-relative mb-2">
                                                        <div className="mt-4 ph-row ph-item py-0 mx-auto" style={{ "width": "9rem" }}>
                                                            <div className="mb-4 mx-auto ph-picture" style={{ "height": "7.125rem","border-radius":"1rem"}}></div>
                                                        </div>
                                                    </div>
                                                    <div className="m-0 mb-2 p-0 ph-item ph-row">
                                                        <div className="m-0 ml-auto mx-3 mx-5 ph-col-10"></div>
                                                    </div>
                                                    <div className="m-0 mb-3 p-0 ph-item ph-row">
                                                        <div className="m-0 ph-col-6"></div>
                                                    </div>
                                                    <div className="m-0 mb-2 p-0 ph-item ph-row">
                                                        <div className="m-0 ph-col-10"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer p-2 bg-white">
                                                <div className="ph-row ph-item p-0 mb-0 rounded-pill">
                                                    <div className="ph-col-12 m-0" style={{ "height": "2rem" }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                </section>
            </React.Fragment> : <React.Fragment>
                <div className="home-page-products-slider w-100">
                <div className="d-flex flex-wrap">
                {[1, 2, 3, 4, 5, 6].map((each) => {
                        return (
                            <div className="category-card-ghostImage">
                                <div className="card mx-2 product-card">
                                    <div className="card-body p-2 pointer">
                                        <div>
                                            <div className="text-center position-relative mb-2">
                                                <div className="mt-4 ph-row ph-item py-0 mx-auto" style={{ "width": "9rem" }}>
                                                    <div className="mb-4 mx-auto ph-picture" style={{ "height": "7.125rem","border-radius":"1rem"}}></div>
                                                </div>
                                            </div>
                                            <div className="m-0 mb-2 p-0 ph-item ph-row">
                                                <div className="m-0 ml-auto mx-3 mx-5 ph-col-10"></div>
                                            </div>
                                            <div className="m-0 mb-3 p-0 ph-item ph-row">
                                                <div className="m-0 ph-col-6"></div>
                                            </div>
                                            <div className="m-0 mb-2 p-0 ph-item ph-row">
                                                <div className="m-0 ph-col-10"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer p-2 bg-white">
                                        <div className="ph-row ph-item p-0 mb-0 rounded-pill">
                                            <div className="ph-col-12 m-0" style={{ "height": "2.5rem" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                </div>
                
            </React.Fragment>}
            
        </React.Fragment>
    );
}

export default CategoryDetailGhostImage