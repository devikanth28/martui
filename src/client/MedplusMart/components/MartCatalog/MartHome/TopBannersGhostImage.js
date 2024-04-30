import React from "react"

const TopBannersGhostImage = () => {

    return(
		<section className="px-0 mr-0 col">
			<div className="ph-row ph-item p-0 m-0">
				<div className="ph-picture mb-0" style={{ height: "20rem" }}></div>
			</div>
			<div className="d-flex justify-content-between px-xl-5 mt-1">
				{[1, 2, 3, 4, 5,6,7].map(() => {
					return (
						<div className="mt-2 p-0 ph-item ph-row">
							<div className="mb-0 ph-col-12"></div>
							<div className="empty mb-0 ph-col-10"></div>
							<div className="ph-col-12"></div>
						</div>
					);
				})}
			</div>
		</section>
    );
}

export default TopBannersGhostImage;