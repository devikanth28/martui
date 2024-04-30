import React, { useEffect, useState } from "react"
import Validate from "../../../helpers/Validate";
import MyAccountService from "../../../services/MyAccountService";
import Alert from '../../Common/Alert';
import { OrderDetailsGhostImage } from "./PurchaseHistoryGhostImage";
import ProductThumbNail from '../../Common/ProductThumbNail';
import QuantityDropDown from "../../Common/QuantityDropDown";
import CheckoutService from "../../../services/CheckoutService";
import CartAction from "../../../../redux/action/CartAction";
import LocalDB from "../../../DataBase/LocalDB";

export default (props) => {
    
    const validate = Validate();
    const [reOrderLoader, setReOrderLoader] = useState(true);
    const [alertInfo, setAlertInfo] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [productQty, setProductQty] = useState({});
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isProceedLoading, setIsProceedLoading] = useState(false);
    const [qtyInStock, setQtyInStock] = useState({});
    const [fromPage, setFromPage] = useState("");
    const cartAction = CartAction();
    useEffect(() => {
        let {match : {params : {reOrderId}}} = props;
        let {location : {state : {storeId, type, refillData, prevPage}}} = props;
        setFromPage(prevPage);
        if(type === "INVOICE"){
            
            MyAccountService().getReInvoiceDetails(reOrderId, storeId, true).then(data => {
                if(validate.isNotEmpty(data) && validate.isNotEmpty(data.dataObject) && data.statusCode === "SUCCESS"){
                    let orderItemsFromApi = data.dataObject.orderHistoryItemDTOs;
                    setOrderItems(orderItemsFromApi);
                    let productQtyMap = {};
                    let selectedProductList = [];
                    orderItemsFromApi.map(each => {
                        productQtyMap[each.productId] = each.quantity%each.packSize === 0 ? each.quantity/each.packSize : parseInt(each.quantity/each.packSize) + 1;
                        if(each.availQty > 0){
                            selectedProductList.push(each.productId);
                        }
                    });
                    setProductQty(productQtyMap);
                    setSelectedProducts(selectedProductList);
                    setOrderItems(orderItemsFromApi);
                }else{
                    
                }
                setReOrderLoader(false);
            });
        }else if(type === "REFILL"){
            if(validate.isEmpty(refillData)){

            }
            let productData = [];
            let productQtyMap = {};
            let selectedProductList = [];
            let products = refillData.REFILL_ITEMS;
            products.map(each => {
                let eachProduct = {};
                eachProduct["productId"] = each.productId;
                eachProduct["productName"] = each.productName;
                eachProduct["productImage"] = `https://${refillData['IMAGE_SERVER']}/products/${each.productId}_S.jpg`;
                eachProduct["isGeneral"] = each.isGeneral;
                eachProduct["availQty"] = each.itemStatus === "ACTIVE" ? 99 : 0;
                if(each.itemStatus === "ACTIVE"){
                    productQtyMap[each.productId] = each.quantity/each.packsize;
                    selectedProductList.push(each.productId);
                }
                eachProduct["packSize"] = each.packsize;
                eachProduct["resQty"] = each.maxRestrictedQty;
                eachProduct["mrpPerUnit"] = each.packSizeMrp;
                eachProduct["imageUploadCount"] = each.imageUploadCount;
                eachProduct["auditForm"] = each.auditFormSubName;
                productData.push(eachProduct);
            })
            setOrderItems(productData);
            setProductQty(productQtyMap);
            setSelectedProducts(selectedProductList);
            setReOrderLoader(false);
        }else{
            MyAccountService().getReorderDetails(reOrderId, true).then(data => {
                if(validate.isNotEmpty(data) && validate.isNotEmpty(data.dataObject) && data.statusCode === "SUCCESS"){
                    let orderItemsFromApi = data.dataObject.orderHistoryItemDTOs;
                    let productIds = [];
                    let products = [];
                    orderItemsFromApi.map(each => {
                        if (!productIds.includes(each.productId)) {
                            productIds.push(each.productId);
                            products.push(each);
                        } else {
                            let orderIndex = undefined;
                            let newOrderItem = each;
                            products.map((eachOrder, index) => {
                                if (eachOrder.productId === each.productId) {
                                    orderIndex = index;
                                    newOrderItem.quantity = parseInt(newOrderItem.quantity) + ((eachOrder.quantity / eachOrder.packSize) * newOrderItem.packSize);
                                }
                            });
                            products.splice(orderIndex, 1, newOrderItem);
                        }
                    })
                    setOrderItems(products);
                    let productQtyMap = {};
                    let selectedProductList = [];
                    products.map(each => {
                        if (!productQtyMap[each.productId]) {
                            productQtyMap[each.productId] = 0;
                        }
                        productQtyMap[each.productId] += each.quantity%each.packSize === 0 ? each.quantity/each.packSize : parseInt(each.quantity/each.packSize) + 1;
                        if(each.availQty > 0){
                            selectedProductList.push(each.productId);
                        }
                    });
                    setProductQty(productQtyMap);
                    setSelectedProducts(selectedProductList);
                }else{
                    
                }
                setReOrderLoader(false);
            });
        }
    }, []);

    const addToCart = () => {
        if(validate.isEmpty(selectedProducts)) {
            setAlertInfo({message:"Select atleast one Product for proceed", type: ALERT_TYPE_INFO});
            return;
        }
        let productDetails = [];
        selectedProducts.map((each)=>{
            let productIdQty = {};
            productIdQty["productId"] = each;
            productIdQty["quantity"] = productQty[each];  
            productDetails.push(productIdQty);
        })
        setIsProceedLoading(true);
        CheckoutService().addBulkProductToCart(productDetails).then(response => {
            if(response.statusCode === "SUCCESS"){
                setQtyInStock({});
                cartAction.updateShoppingCartInfo();
                props.history.push("/shoppingCart");
            }else if("FAILURE" == response.statusCode && response.message == "PARTIAL_AVAILABLE"){
                setQtyInStock(response.responseData.QTY_IN_STOCK);
            }else{
                setAlertInfo({message:response.message, type: ALERT_TYPE_ERROR});
            }
            setIsProceedLoading(false);
        });
    }

    const setProductInProductListState = (productId) => {
        let selectedProductsInState = [...selectedProducts];
        if(selectedProductsInState.includes(productId)){
            selectedProductsInState.splice(selectedProductsInState.indexOf(productId),1);
        } else {
            selectedProductsInState.push(productId);
        }
        setSelectedProducts(selectedProductsInState);
    }

    if(reOrderLoader){
        return <OrderDetailsGhostImage />
    }

    return  <React.Fragment>
                <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
                <section>
                    <div className="purchase-history">
                        <div className="header">
                            <p>
                                <a className="pointer" onClick={() => {LocalDB.setValue("fromReOrderPage" , true); props.history.goBack();}}>
                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                        <g transform="translate(-48.941 -316.765)">
                                            <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"></rect>
                                            <path fill="#000000" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"></path>
                                        </g>
                                    </svg>
                                    Back to {fromPage === "REFILL_DETAILS" ? `Refill Details` : fromPage === "ORDER_HISTORY" ? `Purchase History` : fromPage === "ORDER_DETAILS" ? `Order Details` : `Previous Page`}
                                </a>
                            </p>
                        </div>
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
                                        {orderItems.map(each => {
                                            let productUrl = `/product/${each.productName.replace("/","&frasl;").replace("%","percent").replace(/ /g, '-')}/${each.productId}`;
                                            return  <tr key={each.productId}>
                                                        <td colSpan="4">
                                                            <div className="custom-control custom-checkbox">
                                                                <input  type="checkbox" checked={selectedProducts.includes(each.productId)}  
                                                                    className="custom-control-input" id={"product-"+each.productId} 
                                                                    onClick={() => {setProductInProductListState(each.productId)}} 
                                                                    disabled={each.availQty < 1}/>
                                                                <label className="custom-control-label" htmlFor={"product-"+each.productId}>
                                                                    <div className="product-img-container">
                                                                        <ProductThumbNail imageUrl={each.productImage} productId={each.productId} imagesCount={each.imageUploadCount} 
                                                                            productName={each.productName} height="45" auditForm={each.auditForm}
                                                                            isGeneral={(each.isGeneral=="Y" || each.auditForm === "GEN") ? true : false} />
                                                                    </div>
                                                                    <div>
                                                                        <a className="text-dark font-weight-bold" href={productUrl} title={each.productName}>{each.productName}</a>
                                                                        {(!each.availQty || each.availQty < 1) &&
                                                                            <div className="W-100">
                                                                                <span className="badge badge-brand pt-1 mr-2">Out Of Stock</span>
                                                                                {each.isGeneral != "Y" && <a className="text-primary align-text-top ml-3" href={productUrl} title="Alternatives Available">Alternatives Available</a>}
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td nowrap="true">{parseInt(each.packSize)}</td>
                                                        {each.availQty > 0 ? 
                                                            <td nowrap="true">
                                                                <div className="mb-2">
                                                                    <QuantityDropDown 
                                                                        productQty={productQty} restrictedQty= {each.resQty} 
                                                                        selectedQty={productQty[each.productId]} 
                                                                        productId={each.productId} updateCartQty={(productId, qty) => setProductQty({...productQty, [productId]:qty})}/>
                                                                    <span>{productQty[each.productId] * each.packSize} Units</span>
                                                                </div>
                                                                <span className="text-brand">{validate.isNotEmpty(qtyInStock[each.productId]) ? "Available Quantity is " + qtyInStock[each.productId]:""} </span>
                                                            </td>
                                                            :
                                                            <td nowrap="true"><span>{productQty[each.productId] * each.packSize} Units</span></td>
                                                            } 
                                                            <td nowrap="true"><strong className="rupee">&#x20B9;</strong>{each.mrpPerUnit && parseFloat(each.mrpPerUnit * each.packSize).toFixed(2)}</td>
                                                    </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-right">
                                <button type="button" className="btn btn-brand-gradient rounded-pill px-4 custom-btn-lg" onClick={() => addToCart()} disabled={validate.isEmpty(selectedProducts)}>
                                    {isProceedLoading ? "" :"Add & Proceed"}
                                    {isProceedLoading &&
                                        <React.Fragment>
                                    <div className="spinner-loader">
                                        <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                        <span className="sr-only"></span>
                                    </div>
                                        </React.Fragment>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
}