import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Validate from "../../../../helpers/Validate";

function NearByCollectionCenterssModal(props) {

    // const [model, setModel] = useState(false)
    const [model, setModel] = useState(false)
    const toggleModal=()=>{
        setModel(!model)
    }
    const CloseButton = <button type="button" role="button" onClick={toggleModal} className="close" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect fill="none" width="24" height="24"/>
                            <path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z"/>
                            </svg>
                        </button>
    return (
        <div>
            <p className="font-14 m-0">
                <button className="btn btn-link shadow-none text-primary ml-n2" role="button" onClick={toggleModal} title="Collection centres or Labs near you">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" className='mr-3 ml-1 v-align-middle'>
                        <g id="distance_black_icon_36px" transform="translate(0 0.048)">
                            <rect id="Rectangle_3302" data-name="Rectangle 3302" width="36" height="36" transform="translate(0 -0.048)" fill="none" />
                            <g id="Group_14582" data-name="Group 14582" transform="translate(5 6.952)">
                                <g id="Group_14581" data-name="Group 14581" transform="translate(0 0)">
                                    <path id="Union_179" data-name="Union 179" d="M-10359.42-4651.042c-1.711-2.78-4.58-7.772-4.58-9.949,0-2.671,2.611-4.536,4.957-4.536s4.952,1.865,4.952,4.536c0,1.306-1,3.737-2.976,7.236h8.506c.965,0,2.12-.421,2.192-1.615a1.476,1.476,0,0,0-1.271-1.61h-2.835c-2.006,0-3.057-1.862-3.057-3.7a4.054,4.054,0,0,1,.721-2.4,2.72,2.72,0,0,1,2.283-1.145h4.516a11.522,11.522,0,0,1-1.4-4.239c0-2.674,2.611-4.537,4.955-4.537s4.952,1.862,4.952,4.537c0,2.06-2.486,6.546-4.575,9.946l-.377.614-.377-.614c-.56-.913-1.384-2.292-2.167-3.733h-5.53a.842.842,0,0,0-.741.421,2.151,2.151,0,0,0-.291,1.147c0,.858.372,1.729,1.085,1.729l2.98.005a3.4,3.4,0,0,1,3.093,3.66,3.566,3.566,0,0,1-1.1,2.411,4.313,4.313,0,0,1-3.062,1.095h-9.657c-.154.252-.3.5-.453.739l-.372.614Zm-1.654-11.765a2.364,2.364,0,0,0-.949,1.816c0,.98,1.082,3.423,2.98,6.734,1.9-3.309,2.979-5.751,2.979-6.734a2.359,2.359,0,0,0-.952-1.816,3.335,3.335,0,0,0-2.026-.746A3.348,3.348,0,0,0-10361.074-4662.807Zm15.64-5.657c0,.978,1.082,3.42,2.981,6.731,1.9-3.308,2.98-5.75,2.98-6.731a2.351,2.351,0,0,0-.952-1.816,3.327,3.327,0,0,0-2.028-.746A2.863,2.863,0,0,0-10345.435-4668.463Zm-15.192,7.592a1.585,1.585,0,0,1,1.584-1.584,1.586,1.586,0,0,1,1.584,1.584,1.586,1.586,0,0,1-1.584,1.584A1.585,1.585,0,0,1-10360.627-4660.871Zm16.59-7.473a1.585,1.585,0,0,1,1.584-1.584,1.585,1.585,0,0,1,1.584,1.584,1.585,1.585,0,0,1-1.584,1.584A1.585,1.585,0,0,1-10344.037-4668.344Z" transform="translate(10363.75 4672.75)" fill="#080808" />
                                </g>
                            </g>
                        </g>
                    </svg>
                    Collection centres or Labs near you
                </button>
            </p>
            <Modal backdrop="static" keyboard={false} isOpen={model} className="modal-dialog modal-dialog-centered modal-xl my-account-modal" tabIndex="-1" autoFocus={false}>
                <ModalHeader close={CloseButton}>
                    Collection centres or Labs near you
                </ModalHeader>
                <ModalBody className="p-3">
                    <div className="scroll-content">
                        <div className="nearbystore">
                            <div class="address-container px-0 mx-0">
                                <PrepareNearByCollectionCenters {...props}/>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

const PrepareNearByCollectionCenters = (props) => {
    const validate = Validate();

    return(
        <React.Fragment>
            {validate.isNotEmpty(props.nearByCollectionCenters) && props.nearByCollectionCenters.map(eachCollectionCenter => {
                return(validate.isNotEmpty(eachCollectionCenter) &&
                    <React.Fragment>
                        <address class="address-outline mx-2 three-column no-select">
                            <p class="title">{eachCollectionCenter.name}</p>
                            <small class="text-capitalize mb-3" style={{overflowWrap : "break-word"}}>{eachCollectionCenter.address}</small>
                            <p class="title">
                                <span class="mr-3 small">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <g transform="translate(-180.438 -213.832)">
                                        <rect width="24" height="24" transform="translate(180.438 213.832)" fill="none"></rect>
                                        <g transform="translate(182.199 215.78)">
                                            <g transform="translate(0 1.429)">
                                                <path d="M185.394,217.171a2.043,2.043,0,0,0-.705.124,3.87,3.87,0,0,0-.728.361l-.369.26a3.029,3.029,0,0,0-.264.236,3.822,3.822,0,0,0-.979,1.742c-.771,2.889,1.118,7.237,4.7,10.82,3,3,6.621,4.87,9.442,4.87a5.349,5.349,0,0,0,1.377-.171,3.8,3.8,0,0,0,1.738-.975,2.837,2.837,0,0,0,.265-.3l.262-.374a3.9,3.9,0,0,0,.334-.689,2.167,2.167,0,0,0-.821-2.518l-2.625-1.833a2.261,2.261,0,0,0-3.063.546l-.509.731-.126-.089a24.713,24.713,0,0,1-5.47-5.468l-.089-.127.732-.51a2.2,2.2,0,0,0,.545-3.063l-1.832-2.624A2.229,2.229,0,0,0,185.394,217.171Zm11.1,17.253c-2.524,0-5.828-1.735-8.623-4.53-3.246-3.247-5.057-7.237-4.4-9.7a2.668,2.668,0,0,1,.678-1.22,1.807,1.807,0,0,1,.135-.126l.318-.225a2.535,2.535,0,0,1,.493-.24,1.03,1.03,0,0,1,1.162.4l1.831,2.622a1.042,1.042,0,0,1-.257,1.449l-1.193.833a.576.576,0,0,0-.16.783,24.809,24.809,0,0,0,6.813,6.815.585.585,0,0,0,.785-.16l.833-1.195a1.071,1.071,0,0,1,1.447-.257l2.624,1.833a1.006,1.006,0,0,1,.4,1.163l-.007.017a2.439,2.439,0,0,1-.206.435l-.223.321a1.537,1.537,0,0,1-.156.173,2.649,2.649,0,0,1-1.219.677A4.167,4.167,0,0,1,196.492,234.424Z" transform="translate(-182.178 -217.171)" fill="#343a40"></path>
                                            </g>
                                            <g transform="translate(9.963)">
                                                <path d="M192.615,215.757a.58.58,0,0,0-.034,1.158,9.141,9.141,0,0,1,8.548,8.546.589.589,0,0,0,.621.543.579.579,0,0,0,.537-.615,10.284,10.284,0,0,0-3-6.636h0a10.28,10.28,0,0,0-6.634-3Z" transform="translate(-192.036 -215.757)" fill="#343a40"></path>
                                            </g>
                                            <g transform="translate(8.736 3.129)">
                                                <path d="M191.427,218.853a.611.611,0,0,0-.6.544.58.58,0,0,0,.145.419.572.572,0,0,0,.4.2h0a6.708,6.708,0,0,1,6.274,6.275.589.589,0,0,0,.621.541h0a.578.578,0,0,0,.536-.613,7.869,7.869,0,0,0-7.362-7.36Z" transform="translate(-190.822 -218.853)" fill="#343a40"></path>
                                            </g>
                                        </g>
                                    </g>
                                    </svg>
                                    <a class="text-primary" role="link" href={"tel:"+ eachCollectionCenter.phoneNumber} title="Click to Call">{eachCollectionCenter.phoneNumber}</a>
                                </span>
                                <a class="small text-primary" role="link" href={"http://maps.google.com/?saddr="+ props.selectedLocality.locationLatLong +"&daddr="+ eachCollectionCenter.locationLatLong} target="_blank" title="Get Directions">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <g transform="translate(-336.335 -141.914)">
                                            <rect width="18" height="18" transform="translate(336.335 141.914)" fill="none"></rect>
                                            <g transform="translate(336.335 141.914)">
                                                <path d="M348.655,145.064a9,9,0,1,0,9,9A9.011,9.011,0,0,0,348.655,145.064Zm0,17.01a8.01,8.01,0,1,1,8.01-8.01A8.019,8.019,0,0,1,348.655,162.074Z" transform="translate(-339.655 -145.064)" fill="#404040"></path>
                                                <g transform="translate(3.732 4.602)">
                                                    <path d="M351.815,150.1a.985.985,0,0,0-.451.11l-7.087,3.642a.99.99,0,0,0,.242,1.847l2.985.649a.137.137,0,0,1,.1.077l1.272,2.777a.99.99,0,0,0,1.856-.158l2.045-7.7a.991.991,0,0,0-.337-1.023h0A.985.985,0,0,0,351.815,150.1Zm-2.108,8.3a.135.135,0,0,1-.124-.08l-1.3-2.841-3.053-.664a.137.137,0,0,1-.034-.256l6.256-3.216a.136.136,0,0,1,.148.015.138.138,0,0,1,.047.143l-1.8,6.8a.137.137,0,0,1-.121.1Z" transform="translate(-343.741 -150.104)" fill="#404040"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    Get Directions
                                </a>
                            </p>
                        </address>
                    </React.Fragment>
                    
                )
            })}
        </React.Fragment>
    );
}

export default NearByCollectionCenterssModal;