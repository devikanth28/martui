import React from "react";
import pageNotFoundImg from '../../images/common/page-not-found-img.svg';

const PageNotFound = () => {
    return(
        <div className="page-not-found">
            <h6 className="title">
                404
            </h6>
            <p>Oops…<strong>Page not found</strong></p>
            <img src={pageNotFoundImg} alrt="page not found" title="page not found"/>
            <span>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</span>
            <button className="btn btn-brand px-5">Go to home page</button>
        </div>
    )
}
export default PageNotFound;