import React, { useEffect, useState } from "react";
import BreadCrumbAction from "../../../../../../redux/action/BreadCrumbAction";
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "../../../../../components/Common/Alert";
import Validate from "../../../../../helpers/Validate";
import MartAdminService from "../../../../services/MartAdminService";
import DateValidator from "../../../../../helpers/DateValidator";

const ProductStockInfo = (props) => {
    const [productId, setProductId] = useState();
    const [productStockDetails, setProductStockDetails] = useState();
    const [effectiveStockDetails, setEffectiveStockDetails] = useState();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const breadCrumbAction = BreadCrumbAction();
    const [productSearchLoader, setProductSearchLoader] = useState(false);
    const validate = Validate();

    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: 'Product Discount Info', url: props.location.pathname });
    }, []);

    const closeAlertMessage = () => {
        setAlertInfo({ message: "", type: "" });
    }

    const isAlphaNumericWithoutSpace = (obj) => {
        if (validate.isEmpty(obj)) {
            return false;
        }
        return (typeof obj == "string" && /^[A-Za-z0-9]+$/gi.test(obj));
    }

    const onChangeProductId = (e) => {
        if (validate.isEmpty(e.target.value)) {
            setProductId('');
            return;
        }
        if (!isAlphaNumericWithoutSpace(e.target.value))
            return;
        setProductId((e.target.value).toUpperCase())
    }

    const getStockData = (e) => {
        e.preventDefault();
        setProductSearchLoader(true);
        MartAdminService().getProductStockDetails({ productId }).then(response => {
            if (response.statusCode == 'SUCCESS') {
                setEffectiveStockDetails(response.dataObject.effectiveStockDetails);
                setProductStockDetails(response.dataObject.productStockDetail);
                setAlertInfo({ message: validate.isEmpty(response.dataObject.productStockDetail) ? "Empty stock info" : "", type: ALERT_TYPE_SUCCESS });
            } else {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
            }
            setProductSearchLoader(false);
        }).catch(error => {
            console.log(error);
            setProductSearchLoader(false);
        })
    }

    return (
        <React.Fragment>
            <section>
                <h1 className="h5 p-3 border-bottom mb-0">Find Product Stock Information</h1>
                <div className="p-3">
                    <form className="d-flex align-items-baseline">
                        <div className="mx-2">
                            <div className="each-group has-float-label form-group-error">
                                <input className="form-control w-100" id="productId" maxLength={8} name="productId" placeholder=" " type="text" value={productId} onChange={e => onChangeProductId(e)} />
                                <label htmlFor="productId">
                                    Product ID
                                </label>
                            </div>
                        </div>
                        <div>
                            <button type="button" class="btn btn-brand-gradient ml-3 px-5 height-40 rounded-pill" disabled={productId?.length != 8} onClick={(e) => { getStockData(e) }}>
                                {productSearchLoader ? <span class="spinner-border spinner-border-sm align-text-top mx-5" role="status" aria-hidden="true"></span> : <>Submit</>}
                            </button>
                        </div>
                    </form>
                    {productStockDetails &&
                        <>
                            <br /><hr />
                            <div>
                                {Object.entries(productStockDetails).map(obj => {
                                    return (
                                        <React.Fragment>
                                            <div className="text-center"><strong>Stock Info for WareHouse</strong> : {obj[0]}(backOrder : {obj[1]['backOrder'] == false ? "false" : "true"}) <br /></div>
                                            {obj[1]['barcodeStockDetails'].map(outerKey => {
                                                return (
                                                    <React.Fragment>
                                                        <div>
                                                            <strong>BarCodeDetails</strong>:
                                                            <br />
                                                            BARCODE : {outerKey['barcode']} &nbsp;
                                                            BATCH : {outerKey['batch']} &nbsp;
                                                            MRP : {outerKey['mrp']} &nbsp;
                                                            PACKSIZE : {outerKey['packSize']} &nbsp;
                                                            DATEEXPIRY : {DateValidator().getDateFormat(outerKey['dateExpiry'])} &nbsp;
                                                            <br />
                                                            {(outerKey['batchStockDetails']).map((innerKey) => {
                                                                return (
                                                                    <div>
                                                                        <strong>&nbsp; &nbsp; Batch Stock Details</strong>:
                                                                        &nbsp; batchId : {innerKey['batchId']}
                                                                        &nbsp; quantity : {innerKey['quantity']}
                                                                        &nbsp; unitPrice : {innerKey['unitPrice']}
                                                                        &nbsp; costPriceExtTax : {innerKey['costPriceExtTax']}
                                                                        &nbsp; costPrice : {innerKey['costPrice']}
                                                                        <br />
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </React.Fragment>
                                    )
                                })}
                            </div><br /><hr /></>}
                    {effectiveStockDetails &&
                        <div><br />
                            <div className="text-center"><strong>Effective Stock Info : </strong></div><br />
                            PACKSIZE : {effectiveStockDetails.packsize}
                            &nbsp; MRP : {effectiveStockDetails.mrp}
                            &nbsp; QUANTITY : {effectiveStockDetails.quantity}
                            &nbsp; QUANTITYINPACKS : {effectiveStockDetails.quantityInPacks}
                            <br />
                            {(effectiveStockDetails['barcodeStockDetails']).map((outerKey) => {
                                return (
                                    <React.Fragment>
                                        <strong>BarCodeDetails</strong>:<br />
                                        BARCODE : {outerKey['barcode']}
                                        &nbsp; BATCH : {outerKey['batch']}
                                        &nbsp; MRP : {outerKey['mrp']}
                                        &nbsp; PACKSIZE : {outerKey['packSize']}
                                        &nbsp; DATEEXPIRY : {DateValidator().getDateFormat(outerKey['dateExpiry'])}
                                        <br />
                                        {(outerKey['batchStockDetails']).map((innerKey) => {
                                            return (
                                                <div>
                                                    <strong>&nbsp; &nbsp; Batch Stock Details</strong>:
                                                    &nbsp; batchId : {innerKey['batchId']}
                                                    &nbsp; quantity : {innerKey['quantity']}
                                                    &nbsp; unitPrice : {innerKey['unitPrice']}
                                                    &nbsp; costPriceExtTax : {innerKey['costPriceExtTax']}
                                                    &nbsp; costPrice : {innerKey['costPrice']}
                                                    <br />
                                                </div>
                                            )

                                        })}
                                    </React.Fragment>
                                )
                            })}
                        </div>}
                </div>
            </section>
            <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000' />
        </React.Fragment>
    );
};

export default ProductStockInfo;

//BarCodeDetails:
//BARCODE : 1075533278   BATCH : 03JA2B   MRP : 345.0   PACKSIZE : 1   DATEEXPIRY : Wed Jan 31 00:00:00 IST 2024 
//Batch Stock Details:   batchId : 1075533278   quantity : 1   unitPrice : 270.7149963378906   costPriceExtTax : 270.7149963378906   costPrice : 319.4440002441406