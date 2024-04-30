import React, {useState} from "react";
import Validate from "../../../../helpers/Validate";
import EachTest from "./EachTest";

const CategoryProducts = (props) => {

    const validate = Validate();

    
    let pathTests = props.pathTests;
    const popOverPlacement = (cardIndexplace)=>{
        if(window.screen.width>1280 &&  window.screen.width<=1680){
           return cardIndexplace % 3  ? "right" : "left";
        }
        else if(window.screen.width<=1280){
            return cardIndexplace % 3  ? "right" : "left";
        }
        else if(window.screen.width>1680){
            return cardIndexplace % 5  ? "right" : "left";
        }
        else{
            return cardIndexplace % 3 ? "right" : "left"
        }
    }
    const getProductsCards = (productsList) => {
        var productsCards = productsList.map((each,index) =>
            <div className="each-test-card" key={each.code}>
                <EachTest cardIndex={`${popOverPlacement(index+1)}`} key={each.code} eachTest={each} history={props.history} categoryName={props.categoryName} categoryId={props.categoryId}></EachTest>
            </div>
        );
        return productsCards;
    }

    return (
        <React.Fragment>
            {validate.isNotEmpty(pathTests) && pathTests.length > 0 &&
                <div>
                    <div className="test-card-container">
                        {getProductsCards(pathTests)}
                    </div>
                    {validate.isNotEmpty(props.totalRecords) && props.totalRecords - pathTests.length > 0 &&
                    <button role="button" aria-label="LoadMore" className="brand-secondary btn px-5 rounded-pill mt-2 btn-block custom-btn-lg" disabled={props.loadMore} onClick={()=>props.handleLoadMore()}>
                    {props.loadMore ? 
                        <React.Fragment>
                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                            <span className="sr-only"></span>
                        </React.Fragment>
                        : <React.Fragment>Load {props.pageLength} More Tests From {props.catName}</React.Fragment>
                    }</button>}
                </div>}
        </React.Fragment>
    )
}
export default CategoryProducts;