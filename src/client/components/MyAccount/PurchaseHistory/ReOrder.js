import React, { useState ,useEffect} from 'react';
import Validate from '../../../helpers/Validate';
import ProductThumbNail from '../../Common/ProductThumbNail';
import QuantityDropDown from '../../Common/QuantityDropDown';
import { OrderDetailsGhostImage } from './PurchaseHistoryGhostImage';
import CheckoutService from '../../../services/CheckoutService';
import Alert ,{ALERT_TYPE_ERROR, ALERT_TYPE_INFO, ALERT_TYPE_SUCCESS } from '../../Common/Alert';
import CONFIG from '../../../constants/ServerConfig';
import CartAction from '../../../../redux/action/CartAction';
import LocalDB from '../../../DataBase/LocalDB';
import {getProductUrl} from '../../../helpers/CommonUtil';

const ReOrder = (props) => {
    const validate = Validate();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [isProceedLoading, setProceedLoading] = useState(false);
    const cartAction =  CartAction();

    const [selectedProducts,setSelectedProducts] = useState({}); 
    const [productQty,setProductQty] = useState({}); 
    const reOrderDetails = props.reOrderDetails;
    const [qtyInStock,setQtyInStock] = useState({});
    const checkoutService = CheckoutService();
    const [isAddToCartEnabled,setAddToCartEndabled] = useState(false);
    const [reOrderId, setReOrderId]= useState(LocalDB.getValue("reOrderId"));
    const [comingFromOrderDetails, setComingFromOrderDetails]= useState(validate.isNotEmpty(LocalDB.getValue("previousPage")) && LocalDB.getValue("previousPage") === "OrderDetails");
    const [comingFromInvoiceDetails, setComingFromInvoiceDetails]= useState(validate.isNotEmpty(LocalDB.getValue("previousPage")) && LocalDB.getValue("previousPage") === "InvoiceDetails");
    const [comingFromRefillDetails, setComingRefillDetails]= useState(validate.isNotEmpty(LocalDB.getValue("previousPage")) && LocalDB.getValue("previousPage") === "RefillDetails");

    const selectProductForReorder  = (productId,qty)=>{
        if(productId in selectedProducts){
            let tempSelectedProducts = {};
            Object.keys(selectedProducts).map((pid)=>{
                if(productId != pid){
                    tempSelectedProducts[pid] = selectedProducts[pid];
                }
            });
            setSelectedProducts(tempSelectedProducts);
        } else {
            setSelectedProducts({...selectedProducts,[productId]:qty});
        }
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
        if(validate.isEmpty(selectedProducts)) {
            setAlertInfo({message:"Select atleast one Product for proceed", type: ALERT_TYPE_INFO});
            return;
        }
        setProceedLoading(true);
        let prouductDetails = [];
        Object.entries(selectedProducts).map(([pId,qty])=>{
                let productIdQty = {};
                productIdQty["productId"] = pId;
                productIdQty["quantity"] = productQty[pId];  
                prouductDetails.push(productIdQty);
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


    const prepareProdctForAddToCart = ()=>{
        let tempSelectedProducts = {};
        let tempProductQty = {};
        Object.values(props.reOrderDetails).map((eachReOrderDetail)=>{
            if(validate.isNotEmpty(eachReOrderDetail)){
                let productId = eachReOrderDetail["productId"];
                tempProductQty[productId] = eachReOrderDetail["orderPacks"];
                if(eachReOrderDetail["isInStock"]){
                    tempSelectedProducts[productId] =  eachReOrderDetail["orderPacks"];
                }
            }
        });
        setProductQty(tempProductQty);
        setSelectedProducts(tempSelectedProducts);
        //setAddToCartEndabled(isAddToCartEnabledForReorder(tempSelectedProducts));
    }

    const updateCartQty = (id,qty)=>{
        setProductQty({...productQty,[id]:qty});
    }

    useEffect(() => {
        prepareProdctForAddToCart();
        LocalDB.removeValue("reOrderId");
        LocalDB.removeValue("previousPage");
    }, []);

    return (
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <div className="header">
                <p>
                    <a className="pointer" onClick={()=>{LocalDB.setValue('fromOrderDetails', reOrderId); 
                        if(comingFromOrderDetails){props.history.goBack(); /* props.openSpecificComponent("PURCHASE_HISTORY_DETAIL") */}
                        else if(comingFromInvoiceDetails){props.history.goBack(); /* props.openSpecificComponent("INVOICE_DETAIL") */}
                        else if(comingFromRefillDetails){props.openRefillInfo();}
                        else{props.history.goBack(); /* props.openSpecificComponent("PURCHASE_HISTORY_LIST") */}}}>
                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <g transform="translate(-48.941 -316.765)">
                                <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"></rect>
                                <path fill="#000000" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"></path>
                            </g>
                        </svg>
                        Back to {(comingFromOrderDetails || comingFromInvoiceDetails) ? 'Order Details' : comingFromRefillDetails ? 'Refill Details' : 'purchase history'}
                    </a>
                </p>
            </div>
            {validate.isEmpty(reOrderDetails) && <OrderDetailsGhostImage/>}
            {validate.isNotEmpty(reOrderDetails) &&
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
                        {Object.entries(reOrderDetails).map(([productId,eachReOrderDetail])=>{
                            if(validate.isNotEmpty(eachReOrderDetail)){
                                let imageUrlInfo = props.productImageURLs[productId];
                                let productName  = eachReOrderDetail["productName"];
                                let productUrl = CONFIG.REDIRECT_HOME_URL + getProductUrl(productName, productId);
                                return ( 
                                <tr key={productId}>
                                    <td colSpan="4">
                                        <div className="custom-control custom-checkbox">
                                            {productId in selectedProducts} 
                                            <input  type="checkbox" checked={productId in selectedProducts}  
                                                className="custom-control-input" id={"product-"+productId} 
                                                onClick={()=>selectProductForReorder(productId,productQty[productId])} 
                                                disabled={!eachReOrderDetail["isInStock"]}/>
                                            <label className="custom-control-label" htmlFor={"product-"+productId}>
                                                {imageUrlInfo && <div className="product-img-container"><ProductThumbNail imageUrl={imageUrlInfo.imageUrl} productId={productId} imagesCount={imageUrlInfo.imageUploadCount} 
                                                    productName={eachReOrderDetail["productName"]} height="45" auditForm={eachReOrderDetail["auditFormSubName"]}
                                                    isGeneral={(imageUrlInfo.isGeneral=="Y" || eachReOrderDetail["auditFormSubName"] === "GEN") ? true : false} />
                                                </div>}
                                                <div>
                                                    <a className="text-dark font-weight-bold" href={productUrl} title={eachReOrderDetail["productName"]}>{eachReOrderDetail["productName"]}</a>
                                                    {!eachReOrderDetail["isInStock"] &&
                                                        <div className="W-100">
                                                            <span className="badge badge-brand pt-1 mr-2">Out Of Stock</span>
                                                            {eachReOrderDetail["isGeneral"] != "Y" && <a className="text-primary align-text-top ml-3" href={productUrl} title="Alternatives Available">Alternatives Available</a>}
                                                        </div>
                                                    }
                                                </div>
                                            </label>
                                        </div>
                                    </td>
                                    {/* {validate.isNotEmpty(productDetails["CATALOG_RESTRICTED_QTY"])?productDetails["CATALOG_RESTRICTED_QTY"]:0} */}
                                    <td nowrap="true">{parseFloat(eachReOrderDetail["packSize"]).toFixed(0)}</td>
                                    {eachReOrderDetail["isInStock"] && 
                                    <td nowrap="true">
                                        <div className="mb-2">
                                            <QuantityDropDown 
                                            productQty={productQty} restrictedQty= {eachReOrderDetail["catalogRestrictedQty"]} 
                                            selectedQty={productQty[productId]} 
                                            productId={productId} updateCartQty={updateCartQty}/>
                                            <span>{productQty[productId]*eachReOrderDetail["packSize"]} Units</span>
                                        </div>
                                        <span className="text-brand">{validate.isNotEmpty(qtyInStock[productId]) ? "Available Quantity is " + qtyInStock[productId]:""} </span>
                                    </td>}
                                    {!eachReOrderDetail["isInStock"] && 
                                    <td nowrap="true"><span>{productQty[productId]*eachReOrderDetail["packSize"]} Units</span></td>}
                                    <td nowrap="true"><strong className="rupee">&#x20B9;</strong>  {parseFloat(eachReOrderDetail["packMrp"]).toFixed(2)}</td>
                                </tr>)
                            }
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="text-right">
                    <button type="button" className="btn btn-brand px-4" onClick={()=>addToCart()} disabled={validate.isEmpty(selectedProducts)}>
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

export default ReOrder;