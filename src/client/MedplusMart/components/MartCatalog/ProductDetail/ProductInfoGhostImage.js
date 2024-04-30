import React from "react";

const ProductInfoGhostImage = () => {
    return (
		<React.Fragment>
			<div className="d-flex fluid__instructions justify-content-between w-100">
				<div className="fluid_description w-50 pl-4">
					<div className="ph-row">
						<div className="mb-2 mt-2 ph-col-4"></div>
						<div className="mb-2 mt-2 ph-col-8 empty"></div>
						<div className="my-2 ph-col-12" style={{ "height": "1.5rem" }} ></div>
						<div className="my-2 ph-col-6"></div>
						<div className="my-2 ph-col-6 empty"></div>
						<div className="my-2 ph-col-6"></div>
						<div className="my-2 ph-col-6 empty"></div>
						<div className="my-2 ph-col-4 "></div>
						<div className="my-2 ph-col-8 empty"></div>
						<div className="my-2 ph-col-2 " style={{ "height": "2.5rem" }} ></div>
						<div className="m ml-2 my-2 ph-col-2" style={{ "height": "2.5rem" }} ></div>
					</div>
				</div>
				<div className="fluid_checkout w-25">
					<div className="p-0 ph-row ph-item pl-5">
                        <div class="mb-2 col-6 ml-5" style={{"height":"2rem","border-radius":"2rem"}}></div>
						<div className="ph-col-12" style={{ "height": "1rem" }}></div>
						<div className="ph-col-12"></div>
						<div className="my-2 ph-col-12"></div>
					</div>
					<div className="ph-row p-o ph-item">
						<div className="ml-5 my-2 ph-col-10" style={{ "height": "2rem" }} ></div>
						<div className="ml-5 my-2 ph-col-10" style={{ "height": "2rem" }} ></div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default ProductInfoGhostImage