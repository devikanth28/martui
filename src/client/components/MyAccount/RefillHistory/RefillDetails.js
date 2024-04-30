import React, { useState, useEffect } from 'react';
import MyAccountService from '../../../services/MyAccountService';
import Validate from '../../../helpers/Validate';
import RefillHistoryGhostImage from './RefillHistoryGhostImage';
import ProductThumbNail from '../../Common/ProductThumbNail';
import moment from "moment";
import OrderRefillBG from '../../../images/common/order-refill-cssbg.svg';
import RefillIntervalIcon from '../../../images/common/refil-interval-icn-cssbg.svg';
import { Modal, ModalBody} from 'reactstrap';
import CheckoutService from '../../../services/CheckoutService';
import Alert ,{ALERT_TYPE_ERROR,ALERT_TYPE_SUCCESS} from '../../Common/Alert';
import ShowPickUpStore from '../../Common/ShowPickUpStore';
import ReOrder from '../PurchaseHistory/ReOrder';
import LocalDB from '../../../DataBase/LocalDB';

const  myAccountService = MyAccountService();
const RefillDetails = (props) => {
    const validate = Validate();
    const refllInterval = [30, 45, 60];
    const [historyLoader, setHistoryLoader] = useState(false);
    const [refilldata, setRefillData] = useState(null);
    const [cancelRefillModal, setCancelRefillModal] = useState(false);
    const [modifyIntervalModal, setModifyIntervalModal ] = useState(false);
    const [selectedInterval, setSelectedInterval] = useState();
    const [nextInterval, setNextInterval] = useState();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [subscribeBtnLoader, setSubscribeBtnLoader] = useState(false);
    
    //Reorder changes
    const [isReOrderOpen, setReOrderOpen] = useState(false);
    const [reOrderDetails,setReOrderDetails] =  useState({});
    const [productImageURLs,setProductImageURLs] =  useState([]);

    let refillOrderTotal = 0;
    let totalCartItem = 0;
    useEffect(() => {
        window.scrollTo(0, 0);
        if(props.match.params.refillId){
            getRefillDetails(props.match.params.refillId);
        }
    }, []);

    const getRefillDetails = (refillId)=> {
        setHistoryLoader(true);
        myAccountService.getRefillHistoryDetails(refillId).then((response)=>{
            setHistoryLoader(false);
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
                if(validate.isNotEmpty(response.dataObject)){
                    setSelectedInterval(parseInt(response.dataObject.REFILL_INTERVAL));
                    setRefillData(response.dataObject);
                }else{
                    redirectToRefillHistory();
                }
            }else {
                if(response.message && response.message=='Empty Refill Order'){
                    redirectToRefillHistory();
                }
                setAlertInfo({message:response.message, type: ""});
            }
        },(err)=>{
            setHistoryLoader(false);
            console.log(err);
        })
    }

    const unSubscribeRefill = (description) =>{
        setHistoryLoader(true);
        myAccountService.unSubscribeRefill(props.match.params.refillId, description).then((response)=>{
            setHistoryLoader(false);
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
                props.history.push("/myRefills");
            }else {
                setAlertInfo({message:response.message, type: ""});
            }
        },(err)=>{
            setHistoryLoader(false);
            console.log(err);
        })
    }


    const subSribeRefill = (refillInterval, cartId) => {
        setSubscribeBtnLoader(true);
         CheckoutService().createRefillOrder(refillInterval,cartId).then(response => {
            setSubscribeBtnLoader(false);
             if(response != null && response.responseData != null && response.statusCode === "SUCCESS") {
                setAlertInfo({message:"Successfully Subscribed", type: ALERT_TYPE_SUCCESS});
             }else if(response != null && response.statusCode == 'FAILURE'){
                props.history.push('/myRefills/');
             }
         }).catch(function(error) {
            setSubscribeBtnLoader(false);
             console.log(error);
         });
    }

    const modifyRefillInterval = (interval)=>{
        setHistoryLoader(true);
        myAccountService.modifyRefillInterval(props.match.params.refillId, interval).then((response)=>{
            setHistoryLoader(false);
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
                let obj = {...refilldata};
                obj["REFILL_INTERVAL"] = response.dataObject.interval;
                obj["REFILL_HEADER"]["refillOrderCreationDate"] = response.dataObject.refillOrderCreationDate;
                setRefillData(obj);
                setSelectedInterval(parseInt(response.dataObject.interval));
            }else {
                setAlertInfo({message:response.message, type: ""});
            }
        },(err)=>{
            setHistoryLoader(false);
            console.log(err);
        })
    }

    const redirectToRefillHistory = () => {
        props.history.push('/myRefills');
    }

    const removeRefillProductResponse = (response, productId) => {
        if(response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
            let obj = {...refilldata};
            let productList = obj.REFILL_ITEMS;
            productList.forEach(each => {
                if(each.productId == productId){
                    each.itemStatus = "INACTIVE";
                }
            });
            if(productList.every(product=> product.itemStatus=="INACTIVE")){
                props.history.push("/myRefills")
            }
            obj.REFILL_ITEMS = [...productList];
            setRefillData(obj);
        }else {
            setAlertInfo({message:response.message, type: ""});
        }
    }
    const updateProductQtyResponse = (response, productId) => {
        if(response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
            let obj = {...refilldata};
            let productList = obj.REFILL_ITEMS;
            productList.forEach(each => {
                if(each.productId == productId){
                    each.quantity = response.dataObject;
                }
            });
            obj.REFILL_ITEMS = [...productList];
            setRefillData(obj);
        }else {
            setAlertInfo({message:response.message, type: ""});
        }
    }

    const redirectToReorder = () => {
        props.history.push({pathname: `/reOrder/${props.match.params.refillId}`, state: {refillData : refilldata, type: "REFILL", prevPage: "REFILL_DETAILS"}});
        let reOrderDetails = {};
        let eachProductDetails;
        let productImgUrls = {};
        LocalDB.setValue("previousPage", "RefillDetails")
        refilldata.REFILL_ITEMS.forEach(eachRefillItem => {
            if (eachRefillItem['itemStatusStatus'] == 'ACTIVE') {
                let eachDetail = {};
                let eachProductId = eachRefillItem['productId'];
                eachProductDetails = refilldata.PRODUCT_DETAILS[eachProductId];
                let restrictedPackQty = 0;
                let packSize = Math.trunc(parseFloat(eachProductDetails['packSize']))
                if (validate.isNotEmpty(eachProductDetails['catalogRestrictedQty'])) {
                    let restrictedUnitQty = Math.trunc(parseFloat(eachProductDetails['catalogRestrictedQty']));
                    restrictedPackQty = ((restrictedUnitQty / packSize) - ((restrictedUnitQty / packSize) % 1));
                }
                eachDetail["productId"] = eachProductId;
                eachDetail['productName'] = eachProductDetails['productName'];
                eachDetail['auditFormSubName'] = eachProductDetails['auditFormSubName'];
                eachDetail['isGeneral'] = eachProductDetails['isGeneral'];
                eachDetail['packSize'] = eachProductDetails['packSize'];
                eachDetail['isInStock'] = eachProductDetails['isInStock'];
                eachDetail['catalogRestrictedQty'] = restrictedPackQty;
                eachDetail['orderPacks'] = eachRefillItem['quantity'] / packSize;
                eachDetail['packMrp'] = eachProductDetails['mrp'];
                reOrderDetails[eachProductId] = eachDetail;
                productImgUrls[eachProductId] = `https://${refilldata['IMAGE_SERVER']}/products/${eachProductId}_S.jpg`;
            }
        });
        setReOrderDetails(reOrderDetails);
        setReOrderOpen(true);
        setProductImageURLs(productImgUrls)
    }
    if (isReOrderOpen && validate.isNotEmpty(reOrderDetails)) {
        return (
            <React.Fragment>
                <section>
                    <div className="purchase-history">
                        <ReOrder history={props.history} fromRefillPage={true} reOrderDetails={reOrderDetails} productImageURLs={productImageURLs} openRefillInfo={() => setReOrderOpen(false)}/>
                    </div>
                </section>
            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
                <section>
                    <div className="refill-history-view">
                        <a href="javascript:void(0)" className="back-btn col-8 pl-0 pr-2 no-underline" title="Back to refill history" role="link" onClick={()=>props.history.push('/myRefills')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                <g transform="translate(-48.941 -316.765)">
                                    <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"></rect>
                                    <path fill="#313131" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"></path>
                                </g>
                            </svg>
                            Back to refill history
                        </a>
                        {historyLoader && 
                        <div className="row m-0">
                            <div class="col-8 pl-0 pr-2">
                                <ul class="product-listview list-group list-group-flush">
                                    <li class="list-group-item px-0">
                                        <div class="col-12 pr-0 border rounded">    
                                        <div class="ph-item mb-0 border-bottom">
                                            <div class="ph-col-1 p-0">
                                                <div class="ph-picture mx-auto" style={{"height":"48px","width": "48px"}}></div>
                                            </div>
                                            <div class="pr-0">
                                                <div class="ph-row">
                                                <div class="ph-col-4"></div>
                                                <div class="ph-col-8 empty"></div>
                                                <div class="ph-col-4"></div>
                                                <div class="ph-col-8 empty"></div>
                                                <div class="ph-col-2"></div>
                                                <div class="ph-col-10 empty"></div>
                                                <div class="ph-col-2"></div>
                                                <div class="ph-col-8 empty"></div>
                                                <div class="ph-col-2"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ph-item mb-0 border-bottom">
                                            <div class="ph-col-1 p-0">
                                                <div class="ph-picture mx-auto" style={{"height":"48px","width": "48px"}}></div>
                                            </div>
                                            <div class="pr-0">
                                                <div class="ph-row">
                                                <div class="ph-col-4"></div>
                                                <div class="ph-col-8 empty"></div>
                                                <div class="ph-col-4"></div>
                                                <div class="ph-col-8 empty"></div>
                                                <div class="ph-col-2"></div>
                                                <div class="ph-col-10 empty"></div>
                                                <div class="ph-col-2"></div>
                                                <div class="ph-col-8 empty"></div>
                                                <div class="ph-col-2"></div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-4 pl-2 pr-0">
                                <div class="border rounded mt-3">
                                    <div class="ph-item m-0 p-0">
                                    <div class="ph-col-12 p-0">
                                        <div class="ph-row p-0 m-3">
                                            <div class="ph-col-6 mb-0"></div>
                                            <div class="ph-col-6 empty mb-0"></div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="col-12 pl-0 pr-2">    
                                    <div class="ph-item mb-0 pt-2">
                                        <div class="px-0">
                                            <div class="ph-row">
                                            <div class="ph-col-8 mb-3"></div>
                                            <div class="ph-col-4 empty mb-3"></div>
                                            <div class="ph-col-8 mb-3"></div>
                                            <div class="ph-col-4 empty mb-3"></div>
                                            <div class="ph-col-8 mb-0"></div>
                                            <div class="ph-col-4 empty mb-0"></div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="border rounded my-3">
                                    <div class="ph-item m-0 p-0 border-bottom">
                                    <div class="ph-col-12 p-0">
                                        <div class="ph-row p-0 m-3">
                                            <div class="ph-col-6 mb-0"></div>
                                            <div class="ph-col-4 empty mb-0"></div>
                                            <div class="ph-col-2 mb-0"></div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="col-12 pl-0 pr-2">    
                                    <div class="ph-item mb-0">
                                        <div>
                                            <div class="ph-row">
                                            <div class="ph-col-8"></div>
                                            <div class="ph-col-4 empty"></div>
                                            <div class="ph-col-8"></div>
                                            <div class="ph-col-4 empty"></div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="border rounded mt-3">
                                    <div class="ph-item m-0 p-0">
                                    <div class="ph-col-12 p-0">
                                        <div class="ph-row p-0 m-3">
                                            <div class="ph-col-6 mb-0"></div>
                                            <div class="ph-col-6 empty mb-0"></div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="col-12 pl-0 pr-2">    
                                    <div class="ph-item mb-0">
                                        <div>
                                            <div class="ph-row">
                                            <div class="ph-col-4"></div>
                                            <div class="ph-col-4 empty"></div>
                                            <div class="ph-col-4"></div>
                                            <div class="ph-col-4"></div>
                                            <div class="ph-col-4 empty"></div>
                                            <div class="ph-col-4"></div>
                                            <div class="ph-col-4"></div>
                                            <div class="ph-col-4 empty"></div>
                                            <div class="ph-col-4"></div>
                                            <div class="ph-col-4"></div>
                                            <div class="ph-col-4 empty"></div>
                                            <div class="ph-col-4"></div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                        {refilldata && !historyLoader &&
                        <div className="row m-0">
                            <div className="col-8 pl-0 pr-2">
                                <section>
                                    <div className="header">
                                        <div>
                                            <img alt="order" src={OrderRefillBG} height="24px"/>
                                            <span className="ml-3 font-weight-normal">Refill Id <strong>{refilldata.REFILL_HEADER.refillId}</strong></span>
                                        </div>
                                        <div className="text-right" >
                                            <span className="font-weight-normal text-secondary flex-center">
                                            {refilldata.REFILL_HEADER.dateCreated && <React.Fragment>Refill created on <strong className="ml-1"> {moment(new Date(refilldata.REFILL_HEADER.dateCreated)).format("MMM DD, YYYY")}</strong></React.Fragment>}
                                            {(refilldata.REFILL_HEADER.dateCreated && (refilldata.REFILL_HEADER.headerStatus=='ACTIVE' && refilldata.REFILL_HEADER.refillOrderCreationDate)) && <span className="dot-separator text-dark"></span>}
                                            {refilldata.REFILL_HEADER.headerStatus=='ACTIVE' && refilldata.REFILL_HEADER.refillOrderCreationDate && <React.Fragment> Next Refill Date <strong className="ml-1">{moment(new Date(refilldata.REFILL_HEADER.refillOrderCreationDate)).format("MMM DD, YYYY")}</strong></React.Fragment>}
                                            </span>
                                        </div>
                                    </div>
                                    <ul className="product-listview list-group list-group-flush">
                                        {refilldata.REFILL_ITEMS && refilldata.REFILL_ITEMS.map(eachItem => {
                                            let noOfPacks = (eachItem.quantity/eachItem.packsize);
                                            let productTotalAmt = noOfPacks*eachItem.packSizeMrp;
                                            if(eachItem.itemStatus=="ACTIVE"){
                                                refillOrderTotal = refillOrderTotal+ productTotalAmt;
                                            }
                                            totalCartItem += 1;
                                            return(eachItem && 
                                                <RefillProduct productDetails={eachItem}
                                                refillItem={eachItem} imageServer={refilldata.IMAGE_SERVER} 
                                                prescriptionDdrugSchedule={refilldata.DRUG_SCHEDULES_FOR_PRESCRIPTION}
                                                refillId={props.match.params.refillId}
                                                removeRefillProductResponse = {removeRefillProductResponse}
                                                updateProductQtyResponse = {updateProductQtyResponse}
                                                />
                                            )
                                        })}
                                    </ul>
                                    {refilldata && refilldata.REFILL_HEADER && refilldata.REFILL_HEADER.headerStatus == 'ACTIVE' &&
                                        <React.Fragment>
                                            <button className="btn brand-secondary rounded-pill m-3 custom-btn-lg" onClick={() => { setCancelRefillModal(true) }}>Unsubscribe</button>
                                            <button className="btn btn-brand-gradient rounded-pill m-3" onClick={() => redirectToReorder()}>Re-order</button>
                                        </React.Fragment>
                                    }
                                </section>
                            </div>
                            <div className="col-4 pl-2 pr-0">
                                {refilldata.REFILL_HEADER.headerStatus=='ACTIVE' &&
                                <section>
                                    <div className="additional-details-section mt-0">
                                        <h6 className="">Select Delivery Interval</h6>
                                        <div className="refill-interval">
                                            {refllInterval.map(eachInterval => {
                                                return(
                                                    <React.Fragment>
                                                        <div className="custom-control custom-radio border-dark" key={eachInterval}>
                                                            <input type="radio" value={eachInterval} className="custom-control-input" 
                                                            id={`${eachInterval}-days-interval`} name="interval-select" 
                                                            checked={eachInterval==selectedInterval}  onClick={(e)=>{setModifyIntervalModal(eachInterval!=selectedInterval);setNextInterval(eachInterval)}}/>
                                                            <label className="custom-control-label" for={`${eachInterval}-days-interval`}>I want to repeat every {eachInterval} days</label>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </section> }
                                {refilldata.DELIVERY_TYPE && refilldata.DELIVERY_TYPE=='S' ?
                                <section className="delivery-detail">
                                    <div className="header">
                                        <p>Delivery Detail</p>
                                        <span className="badge-title success right">Store Pickup</span>
                                    </div>
                                    {refilldata.PICKUP_ADDRESS && refilldata.PICKUP_ADDRESS.address_s &&
                                        <ShowPickUpStore
                                        pickStoreName={refilldata.PICKUP_ADDRESS.name_s}
                                        pickUpAddress={refilldata.PICKUP_ADDRESS.address_s}
                                        locationLatLong={refilldata.PICKUP_ADDRESS.locationLatLong}
                                        phoneNumber={refilldata.PICKUP_ADDRESS.phoneNumber_s}
                                        isSmallAddressRequired={true}
                                        />
                                    }
                                </section>:
                                <section className="delivery-detail">
                                    <div className="header">
                                        <p>Delivery Detail</p>
                                        <span className="badge-title success right">Shipping Address</span>
                                    </div>
                                    {refilldata.SHIPMENT_ADDRESS &&
                                    <div className="body">
                                        <p>{refilldata.SHIPMENT_ADDRESS.firstName} {refilldata.SHIPMENT_ADDRESS.lastName && refilldata.SHIPMENT_ADDRESS.lastName}</p>
                                        <small>
                                        {refilldata.SHIPMENT_ADDRESS.addressLine1} {refilldata.SHIPMENT_ADDRESS.addressLine2 && ','+refilldata.SHIPMENT_ADDRESS.addressLine2}
                                        {refilldata.SHIPMENT_ADDRESS.state} - {refilldata.SHIPMENT_ADDRESS.pinCode}
                                        </small>
                                    </div>}
                                </section>
                                }
                                <section className="cart-summary">
                                    <div className="header">
                                        <p>Cart Summary</p>
                                    </div>
                                    <div className="body">
                                    <p><span>No. Of Items</span><span>{totalCartItem}</span></p>
                                    <p>
                                        <span>Cart MRP Total</span>
                                        <span><strong className="rupee">&#x20B9;</strong>{parseFloat(refillOrderTotal).toFixed(2)}</span>
                                    </p>
                                    <p>
                                        <span>Payment Type</span>
                                        <span>COD</span>
                                    </p>
                                    <hr className="solid mx-n3 my-3 border-bottom-0"/>
                                    <p>
                                        <span>Amount to be paid</span>
                                        <span><strong className="rupee">&#x20B9;</strong>{parseFloat(refillOrderTotal).toFixed(2)}</span>
                                    </p>
                                    </div>
                                </section>
                            </div>
                        </div>}
                    </div>
                    <UnsubscribeConfirmationModal openModal = {cancelRefillModal} toggleModel={()=>{setCancelRefillModal(!cancelRefillModal)}} 
                    handleUnsubscribeConfirmation={(flag, description)=>{
                        setCancelRefillModal(false);
                        if(flag=='true'){
                            unSubscribeRefill(description);
                        }else{
                            return false;
                        }
                    }}/>
                    <ModifyRefillIntervalModal openModal = {modifyIntervalModal} fromInterval={selectedInterval} toInterval={nextInterval} toggleModel={()=>{setModifyIntervalModal(!modifyIntervalModal)}} 
                    handleModifyIntervalConfirmation={(flag,interval)=>{
                        setModifyIntervalModal(false);
                        if(flag=='true'){
                            modifyRefillInterval(interval);
                        }else{
                            return false;
                        }
                    }}/>
                </section>
            </React.Fragment>
        )
    }
}
const RefillProduct = (props) => {
    let noOfPacks = (props.refillItem.quantity/props.refillItem.packsize);
    let productTotalAmt = noOfPacks*props.refillItem.packSizeMrp;
    const [productUpdateLoader, setProductUpdateLoader] = useState(false);
    const [removeItemModal, setRemoveItemModal] = useState(false);
    const [productToBeRemove, setProductToBeRemove] = useState({});
    let qtyToChange = [];
    for (let qty = 1; qty <= props.refillItem.maxRestrictedQty ; qty++) {
        qtyToChange.push(qty);
    }
    const updateProductQty = (productId, qty, packSize) => {
        setProductUpdateLoader(true);
        myAccountService.modifyRefillProductQuantity(props.refillId, productId, qty*packSize).then((response)=>{
            setProductUpdateLoader(false);
            props.updateProductQtyResponse(response,productId);
        },(err)=>{
            setProductUpdateLoader(false);
            console.log(err);
        })
    }

    const removeRefillProductModal = (productId, productName) => {
        setProductToBeRemove({'productId': productId, 'productName': productName});
        setRemoveItemModal(true);
    }
    const removeRefillProduct = (productId, refillId) =>{
        setProductUpdateLoader(true);
        myAccountService.removeRefillProduct(productId,refillId).then((response)=>{
            setProductUpdateLoader(false);
            props.removeRefillProductResponse(response, productId);
        },(err)=>{
            setProductUpdateLoader(false);
            console.log(err);
        })

    }

    if(productUpdateLoader){
        return(
            <React.Fragment>
                <div className="ph-item mb-0">
                    <div className="ph-col-1 p-0">
                        <div className="ph-picture"></div>
                    </div>
                    <div>
                        <div className="ph-row">
                            <div className="ph-col-4"></div>
                            <div className="ph-col-6 empty"></div>
                            <div className="ph-col-2"></div>
                            <div className="ph-col-6"></div>
                            <div className="ph-col-6 empty"></div>
                            <div className="ph-col-2"></div>
                            <div className="ph-col-10 empty"></div>
                            <div className="ph-col-6"></div>
                            <div className="ph-col-6 empty"></div>
                            <div className="ph-col-2"></div>
                            <div className="ph-col-10 empty"></div>
                            <div className="ph-col-8"></div>
                            <div className="ph-col-2 empty"></div>
                            <div className="ph-col-2 "></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
        <li className="list-group-item" key={props.refillItem.productId}>
            <div className="col">
                <a href="javascript:void(0)" title={props.refillItem.productName} className="product-link">
                    <ProductThumbNail imageUrl={`https://${props.imageServer}/products/${props.refillItem.productId}_S.jpg`} productId={props.refillItem.productId} imagesCount={props.refillItem.imageUploadCount} 
                        productName={props.refillItem.productName} width="48" auditForm={props.refillItem.auditFormSubName}
                        isGeneral={(props.refillItem.isGeneral=="Y" || props.refillItem.auditFormSubName === "GEN") ? true : false}/>
                </a>
                <h6>
                    <button className="text-dark font-weight-bold btn p-0" role="button" title={props.refillItem.productName}>{props.refillItem.productName}</button>
                    <small className="text-secondary">{props.refillItem.packsize} Unit(s) / pack <span className="mx-2">|</span> MRP <span className="rupee mx-1 mt-1">&#x20B9;</span>{parseFloat(props.refillItem.packSizeMrp).toFixed(2)}</small>
                </h6>
                <p><small className="font-weight-bold">MRP Total <strong className="rupee">&#x20B9;</strong>{parseFloat(productTotalAmt).toFixed(2)}</small></p>
                {props.refillItem.isPrescriptionRequired && props.refillItem.isPrescriptionRequired == 'Y' &&
                <p className="small text-warning pb-1">
                    <img className="mr-1" src="https://static1.medplusmart.com/medplusmart/assets/new_theme/web/images/org-relax-icon.png?v=125f83d5dad23541b3ca430730172852" alt="Prescription Records" height="12"/>
                    Prescription Required
                </p>}
                {props.refillItem && props.refillItem.itemStatus=='ACTIVE' && 
                <div className="form-group">
                    <select className="form-control d-inline-block rounded-pill" id="changeQty" value={noOfPacks} onChange={(e) => updateProductQty(props.refillItem.productId,e.target.value, props.refillItem.packsize)}>
                        {qtyToChange.map(qty =>
                            <option key={qty} value={qty}>{noOfPacks == qty ? "Qty "+ qty +" (Packs)": qty +" (Packs)"}</option>
                        )}
                    </select>
                    <small className="text-secondary ml-2">{props.refillItem.quantity} Units</small>							
                </div>}
                {props.refillItem && props.refillItem.itemStatus=='INACTIVE' && 
                <div className="form-group">
                    <select className="form-control d-inline-block rounded-pill" id="changeQty" value={noOfPacks} disabled>
                        {qtyToChange.map(qty =>
                            <option key={qty} value={qty}>{noOfPacks == qty ? "Qty "+ qty +" (Packs)": qty +" (Packs)"}</option>
                        )}
                    </select>
                    <small className="text-secondary ml-2">{props.refillItem.quantity} Units</small>							
                </div>}
            </div>
            {props.refillItem && props.refillItem.itemStatus=='ACTIVE' ? 
            <div className="col-3 text-right">
                <button className="btn  btn-outline-danger action rounded-pill" type="button" disabled="" onClick={()=>removeRefillProductModal(props.refillItem.productId, props.refillItem.productName)}>
                    <span className="spinner-border spinner-border-sm d-none align-text-top" role="status" aria-hidden="true"></span>
                    <span className="sr-only"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
                        <g id="Group_5352" data-name="Group 5352" transform="translate(-180.059 -283.942)">
                            <rect id="Rectangle_3094" data-name="Rectangle 3094" width="20" height="20" transform="translate(180.059 283.942)" fill="none"></rect>
                            <g id="Group_5352-2" data-name="Group 5352" transform="translate(182.357 285.718)">
                                <path id="Path_3051" data-name="Path 3051" d="M197.765,288.24H194.01v-.159a2.012,2.012,0,0,0-2-2.02h-2.517a2.01,2.01,0,0,0-2,2.02v.159h-4.115a.568.568,0,1,0,0,1.136h1.417v10.868a2.378,2.378,0,0,0,2.36,2.384h7.2a2.376,2.376,0,0,0,2.358-2.383V289.376h1.059a.568.568,0,0,0,0-1.136Zm-8.276-1.044h2.52a.883.883,0,0,1,.878.885v.157h-4.268v-.157A.884.884,0,0,1,189.489,287.2Zm6.1,13.048a1.245,1.245,0,0,1-1.238,1.247h-7.2a1.244,1.244,0,0,1-1.238-1.247V289.376h9.671Z" transform="translate(-182.808 -286.061)"></path>
                                <path id="Path_3052" data-name="Path 3052" d="M192.249,301.464h.022a.6.6,0,0,0,.594-.571v-6.8a.592.592,0,1,0-1.185,0v6.753A.6.6,0,0,0,192.249,301.464Z" transform="translate(-184.33 -287.337)"></path>
                                <path id="Path_3053" data-name="Path 3053" d="M195.276,301.47h.022a.6.6,0,0,0,.594-.571l0-.051V294.1a.592.592,0,0,0-.592-.566h-.022a.6.6,0,0,0-.57.567v6.751A.6.6,0,0,0,195.276,301.47Z" transform="translate(-184.85 -287.343)"></path>
                                <path id="Path_3054" data-name="Path 3054" d="M189.223,301.464h.022a.6.6,0,0,0,.593-.571v-6.8a.592.592,0,1,0-1.184,0v6.753A.6.6,0,0,0,189.223,301.464Z" transform="translate(-183.811 -287.337)"></path>
                            </g>
                        </g>
                    </svg>
                    Remove
                </button>
            </div>:
            <div className="col-3 text-right">
                <button className="btn  btn-outline-danger rounded-pill action" type="button" disabled>
                    Removed
                </button>
            </div>
            }
        </li>

        <RemoveProductConfirmationModal openModal = {removeItemModal} productName={productToBeRemove.productName} toggleModel={()=>{setRemoveItemModal(!removeItemModal)}} 
            handleConfirmation={(flag)=>{
                setRemoveItemModal(false);
                if(flag=='true'){
                    removeRefillProduct(productToBeRemove.productId, props.refillId);
                    setProductToBeRemove({});
                }else{
                    setProductToBeRemove({});
                    return false;
                }
            }}/>
    </React.Fragment>
    )
}

const  RemoveProductConfirmationModal  = (props) => { 
    return (
        <React.Fragment>
            <Modal className="modal-dialog modal-dialog-centered refill-interval-popup modal-lg" backdrop="static" isOpen={props.openModal} toggle={props.toggleModel} style={{paddingRight: "15px"}}>
                <ModalBody>
                    <div>
                        <img className="img-fluid" src={RefillIntervalIcon} alt="Remove Item" title="Remove Item" />
                        <h6 calssName="mb-3">Are you sure, you want to remove this product?</h6>
                        <p>{props.productName}</p>
                    </div>
                    <div className="text-center mt-4">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill" data-dismiss="modal" value={false} onClick={(e)=>props.handleConfirmation(e.target.value)}>Cancel</button>
                        <button type="button" className="btn btn-brand-gradient rounded-pill ml-3 px-5" value={true} onClick={(e)=>props.handleConfirmation(e.target.value)}>Yes, Remove</button>
                    </div>
                </ModalBody>
            </Modal>    
        </React.Fragment>
      )
  }

const  UnsubscribeConfirmationModal  = (props) => {
    const [description, setDescription] = useState("");
    return (
        <React.Fragment>
            <Modal className="modal-lg modal-dialog modal-dialog-centered refill-interval-popup" isOpen={props.openModal} toggle={props.toggleModel} style={{paddingRight: "15px"}}>
                <ModalBody >
                    <div>
                        <img className="img-fluid" src={RefillIntervalIcon} alt="Cancel Order icon" title="Cancel Order icon" />
                        <h6 className="mb-3">Do you want to Cancel Refill Scheduler?</h6>
                        <div className="form-group">
                            <label for="cancel-order-description" className="sr-only">Cancel Order Description</label>
                            <textarea className="form-control" id="cancel-order-description" rows="4" placeholder="Please provide reason for unsubscribe" onInput={e => setDescription(e.target.value)} maxlength="500"></textarea>
                            <p className="mt-2 small text-right">{description.length}/500</p>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill" data-dismiss="modal" value={false} onClick={(e)=>props.handleUnsubscribeConfirmation(e.target.value,description)}>No</button>
                        <button type="button" className="btn btn-brand-gradient rounded-pill ml-3 px-5" value={true} onClick={(e)=>props.handleUnsubscribeConfirmation(e.target.value,description)}>Yes, UNSUBSCRIBE</button>
                    </div>
                </ModalBody>
            </Modal>    
        </React.Fragment>
    )
}

const  ModifyRefillIntervalModal  = (props) => {
    return (
        <React.Fragment>
            <Modal className="modal-dialog modal-dialog-centered refill-interval-popup modal-lg" isOpen={props.openModal} toggle={props.toggleModel} style={{paddingRight: "15px"}}>
                <ModalBody>
                    <div className="pb-4">
                        <img className="img-fluid" src={RefillIntervalIcon} alt="Modify Refill Interval" title="Modify Refill Interval" />
                        <h6 className="mb-3 h4">Do you want to Change Refill Scheduler?</h6>
                        <p className="mb-4 text-secondary">From repeat every {props.fromInterval} days to repeat every {props.toInterval} days</p>
                    </div>
                    <div className="text-center mt-5">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill" data-dismiss="modal" value={false} onClick={(e)=>props.handleModifyIntervalConfirmation(e.target.value,props.fromInterval)}>No</button>
                        <button type="button" className="btn btn-brand-gradient rounded-pill ml-3 px-5" value={true} onClick={(e)=>props.handleModifyIntervalConfirmation(e.target.value,props.toInterval)}>Yes, Modify</button>
                    </div>
                </ModalBody>
            </Modal>    
        </React.Fragment>
    )
}

export default RefillDetails;