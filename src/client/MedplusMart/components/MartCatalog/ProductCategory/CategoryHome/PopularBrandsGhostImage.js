import React from "react";

const PopularBrandsGhostImage = () => {
    return (
        <div className="my-4 mx-1 row">
            <div className="col-6 pl-0">
                <section className="shop-by-category" style={{"height":"14rem"}}>
                    <div class="p-0 ph-item ph-row">
                        <div class="ml-3 mt-4 ph-col-2" style={{"height":"1.2rem"}}></div>
                    </div>
                    <div className="d-flex px-4">
                        {[1,2,3,4,5].map(()=>{
                            return(
                                <div className="popular-brands-ghostimage">
                                <div className="card border-0  pt-3">
                                    <div className="card-body p-2 text-center">
                                        <div className="img-container border">
                                            <div className="m-4 ph-row">
                                                <div className="m-0 ph-picture ph-item rounded-circle" style={{ width: "5rem", height: "5rem" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                   
                    </div>
                </section>
            </div>
            <div className="col-6 pl-0">
                <div style={{ background: "#fff" }}>
                    <div className="ph-row ph-item p-0">
                        <div className="ph-picture ph-item mb-0" style={{ height: "14rem" }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularBrandsGhostImage;
