import React from "react";
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { getLabSelectedLocality } from "../../../../redux/action/LocalityAction";
import Validate from "../../../helpers/Validate";
import PickStore from "./PickStore";

const OtherStores = (props) => {
    const validate = Validate();
    const selectedLocality = getLabSelectedLocality();

    return (
        <React.Fragment>
            <Modal backdrop="static" keyboard={false} className={"modal-dialog-centered"} isOpen={props.isOpen} autoFocus={false}>
                <ModalBody className="p-4">
                    <div className="d-flex justify-content-between">
                        <p className="font-weight-bold">Available tests at the center</p>
                        {validate.isNotEmpty(props.partiallySelectedStore) && <p className="text-secondary font-12">({props.partiallySelectedStore.availableTestCodes.length} {props.partiallySelectedStore.availableTestCodes.length > 1 ? 'tests' : 'test'})</p>}
                    </div>
                    {/* Deliverytype is used to remove the column structure in the address tag */}
                    <PickStore eachStoreInfo={props.partiallySelectedStore.pathLabStore} selectedDeliveryType={props.selectedDeliveryType} deliveryType={"DOCTOR_CLINIC"} modalType locationLatLong={selectedLocality.locationLatLong} />
                    <ul class="list-group">
                        {validate.isNotEmpty(props.partiallySelectedStore) && props.partiallySelectedStore.availableTestCodes.map((testCode) => { return (<li class="list-group-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24.621 24" className="align-text-bottom mr-2 ml-n2">
                                <g id="tickmark_black_icon_18px" transform="translate(-1458 -558)">
                                    <rect id="Rectangle_5706" data-name="Rectangle 5706" width="24" height="24" rx="3" transform="translate(1458 558)" fill="#fff"></rect>
                                    <path id="Icon_feather-check" data-name="Icon feather-check" d="M26,9,12.25,23,6,16.636" transform="translate(1454.5 554.5)" fill="none" stroke="#08CE73" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                                </g>
                            </svg>
                            {props.shoppingCartListMap[testCode]}</li>) })}
                        {validate.isNotEmpty(props.partiallySelectedStore) && props.partiallySelectedStore.unAvailableTestCodes.map((testCode) => { return (<li class="list-group-item disabled">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"  className="ml-n2 mr-2 align-text-bottom">
                                <g id="remove_black_icon_24px" transform="translate(-762 -1061)">
                                    <g id="Group_15963" data-name="Group 15963" transform="translate(762 1061)">
                                        <rect id="Rectangle_3306" data-name="Rectangle 3306" width="24" height="24" transform="translate(0 0)" fill="none" />
                                        <rect id="Rectangle_3307" data-name="Rectangle 3307" width="24" height="1.908" rx="0.636" transform="translate(0 11.046)" fill="rgb(108 117 125 / 50%)" />
                                    </g>
                                </g>
                            </svg>
                            {props.shoppingCartListMap[testCode]}</li>) })}
                    </ul>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-center ">
                    <button role="button" className="brand-secondary btn px-5 rounded-pill py-2" onClick={() => props.setisPartialTestOpen(!props.isOpen)}>Cancel</button>
                    <button role="button" className="btn-brand-gradient btn rounded-pill px-5 py-2 text-white" onClick={() => { props.saveSampleCollectionInfo() }}>Select Store &amp; Continue</button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}
export default OtherStores

