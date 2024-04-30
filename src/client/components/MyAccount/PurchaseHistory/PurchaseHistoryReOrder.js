import React, { useState ,useEffect} from 'react';
import Validate from '../../../helpers/Validate';
import ProductThumbNail from '../../Common/ProductThumbNail';
import QuantityDropDown from '../../Common/QuantityDropDown';
import { OrderDetailsGhostImage } from './PurchaseHistoryGhostImage';
import CheckoutService from '../../../services/CheckoutService';
import Alert ,{ALERT_TYPE_ERROR,ALERT_TYPE_INFO,ALERT_TYPE_SUCCESS} from '../../Common/Alert';
import CONFIG from '../../../constants/ServerConfig';
import CartAction from '../../../../redux/action/CartAction';
import LocalDB from '../../../DataBase/LocalDB';
import {getProductUrl} from '../../../helpers/CommonUtil';

const PurchaseHistoryReOrder = (props) => {
    const validate = Validate();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [isProceedLoading, setProceedLoading] = useState(false);
    const cartAction =  CartAction();
    const purchaseDetails = props.purchaseDetails;
    const outOfStockList = purchaseDetails.outOfStockList;
    const productInfo = purchaseDetails.productInfoMap;
    const reOrderProductQty = {};
    const [productQty,setProductQty] = useState({});
    const [qtyInStock,setQtyInStock] = useState({});
    const [selectedProdcts,setSelectedProducts]= useState({});
    const checkoutService = CheckoutService();
    const [isAddToCartEnabled,setAddToCartEndabled] = useState(false);
    const [reOrderId, setReOrderId]= useState(LocalDB.getValue("reOrderId"));
    const [comingFromOrderDetails, setComingFromOrderDetails]= useState(validate.isNotEmpty(LocalDB.getValue("previousPage")) && LocalDB.getValue("previousPage") === "OrderDetails");
    const [comingFromInvoiceDetails, setComingFromInvoiceDetails]= useState(validate.isNotEmpty(LocalDB.getValue("previousPage")) && LocalDB.getValue("previousPage") === "InvoiceDetails");

    const selectProductForReorder  = (productId)=>{
        setSelectedProducts({...selectedProdcts,[productId]:!selectedProdcts[productId]});
        /* let tempSelectedProducts = selectedProdcts;
        tempSelectedProducts[productId] = !selectedProdcts[productId];
        setAddToCartEndabled(isAddToCartEnabledForReorder(selectedProdcts));
        setSelectedProducts(tempSelectedProducts); */
        //console.log(tempSelectedProducts);

    }

    const isAddToCartEnabledForReorder = (selectedProductsForReorder) =>{
        let count = 0;
        Object.entries(selectedProductsForReorder).map(([pId,value])=>{
            if(value){
                count = count+ 1;
            }
        });
        if(count > 0){
           return true;
        } else {
            return false;
        }
    }
    
    const addToCart = () => {
        if(!(isAddToCartEnabledForReorder(selectedProdcts))) {
            setAlertInfo({message:"Select atleast one Product for proceed", type: ALERT_TYPE_INFO});
            return;
        }
        setProceedLoading(true);
        let prouductDetails = [];
        Object.entries(selectedProdcts).map(([pId,value])=>{
            if(value){
                let productIdQty = {};
                productIdQty["productId"] = pId;
                productIdQty["quantity"] = productQty[pId]; 
                prouductDetails.push(productIdQty);
            } 
        }) 
        checkoutService.addBulkProductToCart(prouductDetails).then(response => {
            setProceedLoading(false);
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                setQtyInStock({});
                cartAction.updateShoppingCartInfo();
                window.location.href='/shoppingCart';
            } else if("FAILURE" == response.statusCode && response.message == "PARTIAL_AVAILABLE"){
                setQtyInStock(response.responseData.QTY_IN_STOCK);
            } else {
                setAlertInfo({message:response.message, type: ALERT_TYPE_ERROR});
            }
        }).catch(function(error) {
            setProceedLoading(false);
            console.log(error);
        });
    }


const prepareReorderQty = ()=>{
    let tempProdQty = {};
    let tempSelectedProducts = {};
    purchaseDetails && purchaseDetails.orderItems && purchaseDetails.orderItems.map((omsOrderItem)=>{
        let productId = omsOrderItem.productId;
        if(validate.isNotEmpty(reOrderProductQty[productId])){
            let qty = reOrderProductQty[productId];
            qty += omsOrderItem.quantity;
            reOrderProductQty[productId] = qty;
        } else {
            reOrderProductQty[productId] = omsOrderItem.quantity;
        }
        let productDetails = productInfo[productId];
        let packSize = parseInt(productDetails["PACK_SIZE"]);
        if(validate.isNotEmpty(productDetails["CATALOG_RESTRICTED_QTY"])){
            let restrictedUnitQty = parseInt(productDetails["CATALOG_RESTRICTED_QTY"]);
            const restrictedPackQty =  (restrictedUnitQty/packSize)-((restrictedUnitQty/packSize)%1);
            productDetails["CATALOG_RESTRICTED_QTY"] = restrictedPackQty;
        }
        let packQty = parseInt(reOrderProductQty[productId]/packSize);
        if((reOrderProductQty[productId] % packSize) > 0){
            packQty = packQty + 1;
        }
        productDetails["IS_GENERAL"] = omsOrderItem.isGeneral;
        productInfo[productId] = productDetails;
        tempProdQty[productId] =  packQty;
        if(outOfStockList.includes(productId)){
            tempSelectedProducts[productId] = false;
        } else {
            tempSelectedProducts[productId] = true;
        }
    });
    setProductQty(tempProdQty);
    setSelectedProducts(tempSelectedProducts);
    setAddToCartEndabled(isAddToCartEnabledForReorder(tempSelectedProducts));
}
    const updateCartQty = (id,qty)=>{
        setProductQty({...productQty,[id]:qty});
    }

    useEffect(() => {
        validate.scrollToTop();
        prepareReorderQty();
        LocalDB.removeValue("reOrderId");
        LocalDB.removeValue("previousPage");
    }, []);

    return (
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <div className="header">
                <p>
                    <a className="pointer" onClick={()=>{LocalDB.setValue('fromOrderDetails', reOrderId); 
                        if(comingFromOrderDetails){ props.history.goBack();/* props.openSpecificComponent("PURCHASE_HISTORY_DETAIL") */}
                        else if(comingFromInvoiceDetails){ props.history.goBack(); /* props.openSpecificComponent("INVOICE_DETAIL") */}
                        else{ props.history.goBack(); /* props.openSpecificComponent("PURCHASE_HISTORY_LIST") */}}}>
                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <g transform="translate(-48.941 -316.765)">
                                <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"></rect>
                                <path fill="#000000" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"></path>
                            </g>
                        </svg>
                        Back to {(comingFromOrderDetails || comingFromInvoiceDetails) ? 'Order Details' : 'purchase history'}
                    </a>
                </p>
            </div>
            {validate.isEmpty(purchaseDetails) && <OrderDetailsGhostImage/>}
            {validate.isNotEmpty(purchaseDetails) &&
            <div className="re-order-section body-height">
                <h6 className="title">Re-Order</h6>
                <div className="border rounded mb-3">
                    <table className="table border-0 mb-0">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col" colSpan="4" nowrap="true">Product Name</th>
                                <th scope="col" nowrap="true">Pack Size</th>
                                <th scope="col" nowrap="true">Quantity</th>
                                <th scope="col" nowrap="true">MRP (Per Pack)</th>
                            </tr>
                        </thead>
                        <tbody>
                        {productInfo && Object.entries(productInfo).map(([productId,productDetails])=>{
                          let imageUrlInfo = props.productImageURLs[productId];

                          let productName  = productDetails["NAME"];
                          let id = productId;
                          let productUrl = CONFIG.REDIRECT_HOME_URL + getProductUrl(productName, id);
                        return ( validate.isNotEmpty(productInfo[productId]) &&
                            <tr key={productId}>
                                <td colSpan="4">
                                    <div className="custom-control custom-checkbox">
                                        <input  type="checkbox" checked={selectedProdcts[productId]}  
                                            className="custom-control-input" id={"product-"+productId} 
                                            onClick={()=>selectProductForReorder(productId)} 
                                            value={selectedProdcts[productId]}
                                            disabled={outOfStockList.includes(productId)}/>
                                        <label className="custom-control-label" htmlFor={"product-"+productId}>
                                            {/* <img src={ProductImage} height="45"/> */}
                                            {imageUrlInfo && <div className="product-img-container"> <ProductThumbNail imageUrl={imageUrlInfo.imageUrl} productId={productId} imagesCount={imageUrlInfo.imageUploadCount} 
                                                productName={productDetails["NAME"]} height="45" auditForm={productDetails["AUDIT_FORM_SUB_NAME"]}
                                                isGeneral={(imageUrlInfo.isGeneral=="Y" || productDetails["AUDIT_FORM_SUB_NAME"] === "GEN") ? true : false} />
                                            </div>
                                            }
                                            <div>
                                                <a className="text-dark font-weight-bold" href={productUrl} title={productDetails["NAME"]}>{productDetails["NAME"]}</a>
                                                {outOfStockList.includes(productId) &&
                                                <div className="w-100">
                                                    <span className="badge">Out Of Stock</span>
                                                    {productDetails["IS_GENERAL"] != "Y" && <a href={productUrl} className="text-primary align-text-top ml-3" title="Alternatives Available">Alternatives Available</a>}
                                                </div>
                                                }
                                            </div>
                                        </label>
                                    </div>
                                    {/* {outOfStockList.includes(productId) &&
                                    <div className="left-padding">
                                        <span className="badge badge-brand pt-1 mr-2">Out Of Stock</span>
                                        {productDetails["IS_GENERAL"] != "Y" && <a href={CONFIG.REDIRECT_HOME_URL + getProductUrl(productDetails["NAME"], productId)} className="alt-msg" title="Alternatives Available">Alternatives Available</a>}
                                    </div>
                                    } */}
                                </td>
                                {/* {validate.isNotEmpty(productDetails["CATALOG_RESTRICTED_QTY"])?productDetails["CATALOG_RESTRICTED_QTY"]:0} */}
                                <td nowrap="true">{parseFloat(productDetails["PACK_SIZE"]).toFixed(0)}</td>
                                {!outOfStockList.includes(productId) && 
                                <td nowrap="true">
                                    <div className="mb-2">
                                        <QuantityDropDown 
                                        productQty={productQty} restrictedQty= {productInfo[productId]["CATALOG_RESTRICTED_QTY"]} 
                                        selectedQty={productQty[productId]} 
                                        productId={productId} updateCartQty={updateCartQty}/>
                                        <span>{productQty[productId]*productDetails["PACK_SIZE"]} Units</span>
                                    </div>
                                    <span className="text-brand">{validate.isNotEmpty(qtyInStock[productId]) ? "Available Quantity is " + qtyInStock[productId]:""} </span>
                                </td>}
                                {outOfStockList.includes(productId) && 
                                    <td nowrap="true"><span>{productQty[productId]*productDetails["PACK_SIZE"]} Units</span></td>}
                                <td nowrap="true"><strong className="rupee">&#x20B9;</strong>  {parseFloat(productDetails["MRP"]).toFixed(2)}</td>
                            </tr>)})}
                        </tbody>
                    </table>
                </div>
                <div className="text-right">
                    <button type="button" className="btn btn-brand px-4" onClick={()=>addToCart()} disabled={!isAddToCartEnabled}>
                    {isProceedLoading ? "" :"Add & Proceed"}
                    {isProceedLoading &&
                        <React.Fragment>
                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                            <span className="sr-only"></span>
                        </React.Fragment>
                    }</button>
                </div>
            </div>}
        </React.Fragment>
    );
}

export default PurchaseHistoryReOrder;