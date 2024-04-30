import React from 'react';

const LoadMoreButton=({name,isLoading,hide,handleLoadMore})=>{
    return(
      <button role="button" aria-label="LoadMore" className="btn pointer brand-secondary px-5 mt-2 btn-block rounded-pill custom-btn-lg" disabled={hide} onClick={()=>handleLoadMore()}>
      {isLoading ? 
          <React.Fragment>
              <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
              <span className="sr-only"></span>
          </React.Fragment>
          : <React.Fragment>{name}</React.Fragment>
      }</button>
    );
}

export default LoadMoreButton;