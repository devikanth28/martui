import React from "react";

const TopRightBannersGhostImage = (props) => {

    return(
		<div className="col-3 pl-3 position-relative">
			<div className="ph-row ph-item p-0 m-0 position-absolute" style={{"top":"2.5rem","right":"0rem"}}>
				<div className="ph-picture mb-0" style={{ height: "11.5rem" }} ></div>
			</div>
		</div>
    );
}

export default TopRightBannersGhostImage;