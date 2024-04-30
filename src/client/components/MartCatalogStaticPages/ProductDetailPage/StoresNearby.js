import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const StoresNearby =(props) => {
    let derivedclass = 'two-column '
    let activeClass ='address-no-style '
    let addressTagClass = 'address-outline '+derivedclass+activeClass;
    const defsCss = `.a{fill:none;}.b{fill:#404040;}`;

    const togglepopover = () => {
        props.setopen(!props.open)
    }
    return(
        <React.Fragment>
             <div>
                <Modal isOpen={props.open} style={{minWidth:'55rem'}}>
                    <ModalBody className='d-flex flex-wrap alternatives'>
                    <div className="d-flex align-items-center justify-content-between getNotified mb-3 w-100">
                            <h4 className='mb-0'>Nearest stores where this product is available</h4>
                            <div onClick={togglepopover}>
                                <svg xmlns="http://www.w3.org/2000/svg" id="close_black_icon_44px" width="24" height="24" viewBox="0 0 44 44.001">
                                    <rect id="Rectangle_3290" data-name="Rectangle 3290" width="44" height="44" transform="translate(0 0.002)" fill="none" />
                                    <path id="Path_1951" data-name="Path 1951" d="M92.355,322.421l-18.526-18.5,18.487-18.5a2.033,2.033,0,0,0-2.873-2.873l-18.5,18.5L52.463,282.508a2.033,2.033,0,0,0-2.873,2.877l18.485,18.539-18.485,18.5a2.033,2.033,0,1,0,2.766,2.98c.037-.033.072-.068.106-.1l18.485-18.5,18.487,18.5a2.031,2.031,0,0,0,2.871,0v0a2,2,0,0,0,.1-2.827Z" transform="translate(-48.94 -281.945)" fill="#6c757d" />
                                </svg>
                            </div>
                        </div>
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(() => {  return (
                            <address className={addressTagClass +' px-2 mr-2'} onClick={e => props.setPickUpStoreInfo(storeInfo.storeId)}>
                                <p className="title">
                                    MEDPLUS MADHAPUR PS
                                </p>
                                <small className="text-capitalize mb-3" style={{ "wordWrap": "break-word" }}>
                                    Shop No.2, H.No.1-74/8, Ground Floor, Hitech City, Madhapur-500 081
                                </small>
                                <p className="title">
                                    <span className="mr-3 small">
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
                                        </svg><a className="text-primary" href={"tel:" + 7660027012} title="Click to Call">7660027012</a>
                                    </span>
                                    <span className='mr-3 small'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <defs>
                                            <style>{defsCss}</style>
                                        </defs>
                                        <g transform="translate(-336.335 -141.914)">
                                            <rect className="a" width="18" height="18" transform="translate(336.335 141.914)"></rect>
                                            <g transform="translate(336.335 141.914)">
                                                <path className="b" d="M348.655,145.064a9,9,0,1,0,9,9A9.011,9.011,0,0,0,348.655,145.064Zm0,17.01a8.01,8.01,0,1,1,8.01-8.01A8.019,8.019,0,0,1,348.655,162.074Z" transform="translate(-339.655 -145.064)"></path>
                                                <g transform="translate(3.732 4.602)">
                                                    <path className="b" d="M351.815,150.1a.985.985,0,0,0-.451.11l-7.087,3.642a.99.99,0,0,0,.242,1.847l2.985.649a.137.137,0,0,1,.1.077l1.272,2.777a.99.99,0,0,0,1.856-.158l2.045-7.7a.991.991,0,0,0-.337-1.023h0A.985.985,0,0,0,351.815,150.1Zm-2.108,8.3a.135.135,0,0,1-.124-.08l-1.3-2.841-3.053-.664a.137.137,0,0,1-.034-.256l6.256-3.216a.136.136,0,0,1,.148.015.138.138,0,0,1,.047.143l-1.8,6.8a.137.137,0,0,1-.121.1Z" transform="translate(-343.741 -150.104)"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <a className="small text-primary" href={"http://maps.google.com/?saddr=17.4487141,78.39306289999999&daddr=17.44072000,78.39265000"} target="_blank" title="Get Directions">
                                        Get Directions
                                    </a>
                                    </span>

                                    <a className="small text-primary" href={"http://maps.google.com/?saddr=17.4487141,78.39306289999999&daddr=17.44072000,78.39265000"} target="_blank" title="Get Directions">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18">
                                        <g transform="translate(-336.82 -179.867)">
                                            <rect fill="none" width="18" height="18" transform="translate(336.82 179.867)"></rect>
                                            <g transform="translate(-1.85 -1.473)">
                                                <g transform="translate(338.67 182.341)">
                                                    <path fill="#404040;" d="M342.225,189.911a.924.924,0,1,0,.924.924A.922.922,0,0,0,342.225,189.911Zm11.484-5.172a.923.923,0,1,0,.923.923.921.921,0,0,0-.923-.923Z" transform="translate(-338.969 -182.613)"></path>
                                                    <path fill="#404040" d="M341.926,197.459l-.113-.184c-1.174-1.91-3.143-5.332-3.143-6.794a3.27,3.27,0,0,1,6.513,0c0,1.116-1.161,3.392-2.184,5.18h6.185c1.19,0,1.654-.69,1.692-1.281a1.19,1.19,0,0,0-1.041-1.3h-1.975a2.143,2.143,0,0,1-1.942-2.39,2.649,2.649,0,0,1,.464-1.558,1.721,1.721,0,0,1,1.442-.723h3.4a8.467,8.467,0,0,1-1.07-3.106,3.271,3.271,0,0,1,6.514,0c0,1.463-1.97,4.884-3.143,6.795l-.113.184-.113-.184c-.4-.653-.991-1.639-1.544-2.668h-3.93a.752.752,0,0,0-.658.371,1.651,1.651,0,0,0-.23.887c0,.681.316,1.371.923,1.371l2.046,0a2.182,2.182,0,0,1,1.983,2.352,2.447,2.447,0,0,1-2.7,2.263H342.4c-.132.221-.254.42-.36.592Zm0-8.926a2.2,2.2,0,0,0-2.235,1.948c0,1.021,1.481,3.7,2.235,5.006.755-1.3,2.236-3.982,2.236-5.006A2.2,2.2,0,0,0,341.926,188.534Zm11.484-5.173a2.171,2.171,0,0,0-2.237,1.947c0,1.023,1.481,3.706,2.237,5.006.754-1.3,2.236-3.983,2.236-5.006A2.2,2.2,0,0,0,353.411,183.361Z" transform="translate(-338.67 -182.341)"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                        Distance 0.03 kms
                                    </a>
                                </p>
                            </address>
                        )})}
                    </ModalBody>
                </Modal>
            </div> 
        </React.Fragment>
    )
}
export default StoresNearby