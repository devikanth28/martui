import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getCategoryNameForUrl } from "../../../../helpers/CommonUtil";
import Validate from "../../../../helpers/Validate";
import BookTestButton from "./testDetail/BookTestButton";
import SeoStructureDataSchema from '../Common/SeoStructureDataSchema'
import Slider from "react-slick";
import { sendMemberEvent } from '../../../../Analytics/Analytics'
import { MEDPLUS_ADVANTAGE_HOME } from "../../../Subscription/constants/SubscriptionConstants";
import { DIAGNOSTICS_URL_PREFIX, getServiceOption } from "../../constants/LabConstants";
import { Link } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
const altNameSlider = {
    dots: false,
    infinite: false,
    arrows: false,
    variableWidth: true
};
const EachTest = (props) => {
    let eachTest = props.eachTest;
    let categoryName = props.categoryName;
    let categoryId = props.categoryId;
    let cardIndex=props.cardIndex;
    const validate = Validate();

    function getOtherNames(otherNames) {
        var otherTestNames = otherNames.map((eachName, index) =>
            <div className="item mt-0 mb-3" key={index}>
                <button role="button" className={index == otherNames.length - 1 ? "badge badge-pill border btn btn-sm no-hover lab-alt-btn" : "no-hover lab-alt-btn badge badge-pill border btn btn-sm mr-1"}>{eachName}</button>
            </div>
        );
        return otherTestNames;
    }

    const isSubscribed = useSelector(state => {
        if (validate.isNotEmpty(state.labCatalog) && validate.isNotEmpty(state.labCatalog.isSubscribed) && validate.isNotEmpty(state.userInfo) && validate.isNotEmpty(state.userInfo.userInfo)) {
            return state.labCatalog.isSubscribed;
        }
    })
    const Alternatepopover = (
        <Popover id="popover-basic">
            {validate.isNotEmpty(eachTest.alternateKeywords) &&
                <React.Fragment>
                    <Popover.Header as="h3">Also Known as</Popover.Header>
                    <Popover.Body>
                        <ul className="bg-white list-unstyled list-arrow mb-0">
                            {eachTest.alternateKeywords.map((eachName) => {
                                return (
                                    <React.Fragment>
                                        <li className="d-flex">
                                            <p className="mb-0" style={{ "word-wrap":"break-word"}}>{eachName}</p></li>
                                    </React.Fragment>
                                )
                            })}
                        </ul>
                    </Popover.Body>
                </React.Fragment>
            }
        </Popover>
    );
    return (
        <React.Fragment>
            <React.Fragment>
                <SeoStructureDataSchema name={eachTest.name} alternateName={eachTest.alternateKeywords} price={eachTest.price} mrp={eachTest.mrp} subscriptionPrice={eachTest.subscriptionPrice} />
            </React.Fragment>
            <div className="item h-100">
                <div className={((validate.isNotEmpty(eachTest.subscriptionPrice)) || eachTest.available) ? "test-card h-100 card mx-2 subscription" : "test-card h-100 card mx-2"}>
                    <Link name="test-detail" role="link" aria-label="testCard" to={`${DIAGNOSTICS_URL_PREFIX}/testdetails/${categoryName ? (getCategoryNameForUrl(categoryName, categoryId) + "/") : ""}` + `${getCategoryNameForUrl(eachTest.name, eachTest.code)}`} className="card-body p-0 link-tag">
                        <div className="card-body p-2 pointer">
                            <div>
                                <div className="d-flex justify-content-between no-gutters">
                                    <div className="col" title={eachTest.name}>
                                        <h6 className="card-title">{eachTest.name}</h6>
                                    </div>
                                   {validate.isNotEmpty(eachTest.alternateKeywords) && <div onClick={(event)=>event.stopPropagation()}>
                                        <OverlayTrigger trigger="hover" placement={cardIndex} overlay={Alternatepopover}>
                                            <div className="popover-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" class="cursor-pointer"><g id="note_black_icon_18px" transform="translate(0.5 0.5)"><path id="Icon_awesome-info-circle" data-name="Icon awesome-info-circle" d="M8.563.563a8,8,0,1,0,8,8A8,8,0,0,0,8.563.563Zm0,3.548A1.355,1.355,0,1,1,7.208,5.466,1.355,1.355,0,0,1,8.563,4.111ZM10.369,12.3a.387.387,0,0,1-.387.387H7.143a.387.387,0,0,1-.387-.387V11.53a.387.387,0,0,1,.387-.387H7.53V9.079H7.143a.387.387,0,0,1-.387-.387V7.917a.387.387,0,0,1,.387-.387H9.208a.387.387,0,0,1,.387.387v3.226h.387a.387.387,0,0,1,.387.387Z" transform="translate(-0.563 -0.563)" fill="none" stroke="#6c757d" stroke-width="1"></path></g></svg></div>
                                        </OverlayTrigger>
                                    </div>
                                    }
                                </div>
                            </div>
                            {isSubscribed ?
                                    <div className="d-flex justify-content-between mb-2 align-items-center">
                                        <div className="font-16">
                                            <p className="mb-2">{validate.isNotEmpty(eachTest?.mrp) && 
                                                <span class="ml-1 small">MRP&nbsp;
                                                    <span className="rupee">&#x20B9;</span>
                                                    {validate.isNotEmpty(eachTest.subscriptionPrice)?<del>{parseFloat(eachTest.mrp).toFixed(2)}</del>:parseFloat(eachTest.mrp).toFixed(2)}
                                                </span>}
                                            </p>
                                            <p className="mb-0">{validate.isNotEmpty(eachTest.subscriptionPrice) && 
                                                <h6 class="ml-1 small mb-0">MA Price&nbsp;
                                                    <span className="rupee">&#x20B9;</span>
                                                    <span className="font-weight-bold">{parseFloat(eachTest.subscriptionPrice).toFixed(2)}</span></h6>}
                                            </p>
                                        </div>
                                    {eachTest.available && <BookTestButton testCode={eachTest.code} available={eachTest.available} classStyle="btn btn-block btn-brand-gradient rounded-pill w-50" isButton={false} ></BookTestButton>}</div>:
                            
                            <React.Fragment>
                            {(validate.isNotEmpty(eachTest.subscriptionPrice)) &&
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    {validate.isNotEmpty(eachTest.subscriptionPrice) && 
                                        <div>
                                            <p class="small text-secondary mb-0">MA Price</p>
                                            <h6 className="font-weight-bold mb-0"><strong class="rupee"> ₹</strong>{parseFloat(eachTest.subscriptionPrice).toFixed(2)}</h6>
                                        </div>}
                                    {validate.isNotEmpty(eachTest.subscriptionPlanPrice)  && <Link role="link" to={`${MEDPLUS_ADVANTAGE_HOME}`} className='brand-secondary btn font-12 rounded-pill py-1 w-50' onClick={()=>{sendMemberEvent(eachTest.name);}}>Get MedPlus <br />Advantage For<span class="ml-1 rupee small">₹</span>{parseInt(eachTest.subscriptionPlanPrice)}</Link>}
                                
                                </div>}
                                
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div>
                                    <p class="small text-secondary mb-0">MRP</p>
                                    {validate.isNotEmpty(eachTest?.mrp) && <h6 className="font-weight-bold mb-0"><strong class="rupee"> ₹</strong>{parseFloat(eachTest.mrp).toFixed(2)}</h6>}
                                </div>
                                {eachTest.available && <BookTestButton testCode={eachTest.code} available={eachTest.available} classStyle="btn btn-brand-gradient rounded-pill w-50" isButton={false} ></BookTestButton>}
                            </div>
                            </React.Fragment>
                        }
                        </div>
                    </Link>
                    {validate.isNotEmpty(eachTest.serviceOption) &&
                    <div class="card-footer bg-warning-75">
                        <p class="font-12 text-secondary mb-1">Sample Collection Option</p>
                        <h6 class="font-14 mb-0">{getServiceOption(eachTest.serviceOption)}</h6>
                    </div>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default EachTest