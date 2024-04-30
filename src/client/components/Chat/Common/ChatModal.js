import React from 'react'
import { Modal, ModalBody } from 'reactstrap';
import NeedHelp from '../Container/NeedHelp';



const ChatModal = (props) => {
    return (
        <React.Fragment>
            <Modal backdrop="static" keyboard={false} className="modal-dialog-right notification" isOpen={props.isModelOpen} toggle={props.toggleChat}>
                <ModalBody className="p-0">
                {props.isModelOpen && <NeedHelp chatHeaderDetails={props.chatHeaderDetails} toggleChat = {props.toggleChat} eventType={props.eventType} startChat={props.isModelOpen}/>}
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default ChatModal
