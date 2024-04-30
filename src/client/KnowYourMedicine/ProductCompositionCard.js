import React from 'react'
import { Button } from 'react-bootstrap';
import  OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


const productdetail = (
    <Popover id="popover-basic">
    {
        <React.Fragment>
            <Popover.Header as="h6">Other Information</Popover.Header>
            <Popover.Body>
               <ul className="list-unstyled mb-0">
               <li className="row no-gutters"> 
                    <span className="text-secondary font-12 col-4 text-right">Pack Size: </span>
                    <span className="font-weight-bold ml-2 col font-12">12</span>
                </li>
                 <li className="row no-gutters">
                    <span className="text-secondary font-12 col-4 text-right">Comp: </span>
                    <span className="font-weight-bold ml-2 col font-12">paracetomal</span>
                </li>
                 <li className="row no-gutters">
                    <span className="text-secondary font-12 col-4 text-right">Mfg: </span>
                    <span className="font-weight-bold ml-2 col font-12">cipla</span>
                </li>
               </ul>
            </Popover.Body>
        </React.Fragment>
    }
</Popover>
)


const ProductCompositionCard = (props) => {
    return(
        <div className='h-100'>
            <div className='card mx-2 mb-2 product-card position-relative' style={{'min-height':'20rem'}}>
                <div className='card-body p-3'>
                        <span className="wishlist-icon btn btn-link no-underline" onClick={(e) => e.stopPropagation()}>
                                <OverlayTrigger trigger="hover" placement={props.cardIndex} overlay={productdetail}>
                                        <div className="popover-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 17 17"><g id="note_black_icon_18px" transform="translate(0.5 0.5)"><path id="Icon_awesome-info-circle" data-name="Icon awesome-info-circle" d="M8.563.563a8,8,0,1,0,8,8A8,8,0,0,0,8.563.563Zm0,3.548A1.355,1.355,0,1,1,7.208,5.466,1.355,1.355,0,0,1,8.563,4.111ZM10.369,12.3a.387.387,0,0,1-.387.387H7.143a.387.387,0,0,1-.387-.387V11.53a.387.387,0,0,1,.387-.387H7.53V9.079H7.143a.387.387,0,0,1-.387-.387V7.917a.387.387,0,0,1,.387-.387H9.208a.387.387,0,0,1,.387.387v3.226h.387a.387.387,0,0,1,.387.387Z" transform="translate(-0.563 -0.563)" fill="none" stroke="#6c757d" stroke-width="1"></path></g></svg></div>
                                </OverlayTrigger>
                        </span>
                        <div className=' pointer'>
                                <div className='text-center mb-2'>
                                    <div>
                                        <img src={"https://static2.medplusmart.com/products/_8a9d86_/ADD_0001_S.jpg"}
                                            alt={"product Name"} className={"d-inline-block"} width={142} height={170}/>
                                    </div>
                                </div>

                                <div className="d-flex flex-column justify-content-between">
                                    <div className=''> 
                                        <span className={`p-2 mb-2 mt-2 badge font-12 generic-medicine-pill-color badge-pill font-weight-bolder ${props.genericMedicine ? "generic-medicine-pill-color" :"branded-medicine-pill-color"}`}>{props.genericMedicine ? "Generic Medicine" :"Branded Medicine"}</span>
                                    </div>
                                    <div>
                                        <p className='font-12 text-secondary mb-1'>MedPlus</p>
                                    </div>
                                    
                                    <div>
                                    <h6 className={'truncate-line-2 font-16 font-weight-bolder mb-3'} style={{ minHeight: '2.375rem' }}>
                                        <span title={"Agipan 40MG Tab"}>{"Agipan 40MG Tab"}</span>
                                    </h6>
                                    </div>
                                    <div>
                                        <h6 className="mb-0 text-secondary font-12"><span className='text-secondary'>MRP &nbsp;<strong className="rupee">&#x20B9;</strong><span className='text-dark'>500</span></span></h6>
                                    </div>
                                </div>
                        </div>
                </div>
                <div className='card-footer bg-white p-2 border-0'>
                                <button className='btn btn-sm btn-block btn-dark rounded-pill'> Know more</button>
                        </div>
            </div>
        </div>
    )
}

export default ProductCompositionCard;
