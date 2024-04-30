import React, { useState } from "react";
import { Modal, ModalBody ,ModalHeader} from 'reactstrap';
import { InlineShareButtons } from 'sharethis-reactjs';

const SocialProfiles = (props) => {
    return (
        <React.Fragment>
            <Modal className="modal-lg" isOpen={props.isOpen}  toggle={() => props.setIsOpen(!props.isOpen)} centered>
                <ModalBody className="p-0">
                    <div className="d-flex align-items-center border-bottom justify-content-between p-3">
                        <h5 className="mb-0 shareit">{props.shareText ? props.shareText : "Share This Product At"}</h5>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" onClick={() => props.setIsOpen(!props.isOpen)} className="pointer">
                            <g id="close_black_icon_24px" transform="translate(-48.941 -281.937)">
                                <rect id="Rectangle_3290" data-name="Rectangle 3290" width="24" height="24" transform="translate(48.941 281.937)" fill="none" />
                                <path id="Path_1951" data-name="Path 1951" d="M72.622,304.007,62.517,293.924,72.6,283.84a1.108,1.108,0,0,0-1.567-1.566L60.945,292.356l-10.083-10.1a1.109,1.109,0,0,0-1.567,1.568l10.083,10.1L49.295,304.007a1.108,1.108,0,1,0,1.509,1.624c.02-.018.039-.037.058-.057L60.945,295.49l10.084,10.084a1.108,1.108,0,0,0,1.566,0h0a1.09,1.09,0,0,0,.052-1.541Z" fill="#080808" />
                            </g>
                        </svg>
                    </div>
                    <div className="p-3">
                        <InlineShareButtons
                            config={{
                                alignment: 'center',  // alignment of buttons (left, center, right)
                                color: 'social',      // set the color of buttons (social, white)
                                enabled: true,        // show/hide buttons (true, false)
                                font_size: 16,        // font size for the buttons
                                labels: 'cta',        // button labels (cta, counts, null)
                                language: 'en',       // which language to use (see LANGUAGES)
                                networks: [           // which networks to include (see SHARING NETWORKS)
                                    'whatsapp',
                                    'messenger',
                                    'twitter',
                                    'linkedin'
                                ],
                                padding: 12,          // padding within buttons (INTEGER)
                                radius: 4,            // the corner radius on each button (INTEGER)
                                show_total: true,
                                size: 40,             // the size of each button (INTEGER)
                                url: props.encodedUrl? props.encodedUrl : '', // url to share the information
                            }}
                        />

                    </div>
                    
                </ModalBody>

            </Modal>
        </React.Fragment>
    )
}
export default SocialProfiles