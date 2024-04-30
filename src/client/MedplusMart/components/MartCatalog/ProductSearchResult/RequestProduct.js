import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap'
import BreadCrumbAction from "../../../../../redux/action/BreadCrumbAction";
import Alert, { ALERT_TYPE_ERROR } from "../../../../components/Common/Alert";
import { useInputField } from "../../../../components/Common/CustomHooks/useInputField";
import SignInPopUp from "../../../../components/Common/signInModelBox/SignInPopUp";
import LocalDB from "../../../../DataBase/LocalDB";
import Validate from "../../../../helpers/Validate";
import MyAccountService from "../../../../services/MyAccountService";
import RequestProductResponsePopUp from "./RequestProductResponsePopUp";

const ErrorMessage = (props) => {
    return (
        <div className='invalid-feedback'>{props.message}</div>
    );
};

const productTypeList = [{productTypeId : "G", productTypeName : "General Product"},{productTypeId : "P", productTypeName : "Pharmacy Product"},{productTypeId : "N", productTypeName : "Not Clear"}];

const RequestProduct = (props) => {

    const breadCrumbAction = BreadCrumbAction();

    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: ' Request A Product', url: props.location.pathname });
    }, [props.location.pathname]);

    const validate = Validate();
    const userInfo  = useSelector(state => validate.isNotEmpty(state) && validate.isNotEmpty(state.userInfo) && validate.isNotEmpty(state.userInfo.userInfo) ?  state.userInfo.userInfo : {});

    const [openDropdown, setOpenDropdown] = useState(false);
    const [requestedProductType, setRequestedProductType] = useState({
        productTypeId : "",
        productTypeName : ""
    });
    const [requestedProductTypeError, setRequestedProductTypeError] = useState(false);
    const [showResponsePopup, setShowResponsePopup] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });

    const [ productName, productNameError, setProductName, setProductNameError, handleProductNameChange, onProductNameFocus, onProductNameBlur ] = useInputField("TEXT", 50);
    const [ productBrand, productBrandError, setProductBrand, setProductBrandError, handleBrandChange, onBrandFocus, onBrandBlur ] = useInputField("TEXT", 30);
    const [ productPrice, productPriceError, setProductPrice, setProductPriceError, handlePriceChange, onPriceFocus, onPriceBlur ] = useInputField("NUMBER", 5);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(validate.isEmpty(requestedProductType.productTypeName)){
            setRequestedProductTypeError(true);
            return;
        }
        if(validate.isEmpty(productName)){
            setProductNameError("Product Name is required");
            return;
        }
        if(validate.isNotEmpty(productNameError) || validate.isNotEmpty(productBrandError) || validate.isNotEmpty(productPriceError)){
            return;
        }
        submitFormData(requestedProductType.productTypeId, productName, productBrand, productPrice);
    }

    const submitFormData = (productType, productName, brand, price) => {
        MyAccountService().saveRequestedProduct(productType, productName, brand, price).then((response) => {
            if(validate.isNotEmpty(response)){
                if("SUCCESS" === response.statusCode && validate.isNotEmpty(response.message) && "SUCCESS" === response.message) {
                    setShowResponsePopup(true);
                } else if ("FAILURE" === response.statusCode && validate.isNotEmpty(response.message)) {
                    setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
                }
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const clearForm = () => {
        setOpenDropdown(false);
        setShowResponsePopup(false);
        setRequestedProductTypeError(false);
        setRequestedProductType({
            productTypeId : "",
            productTypeName : ""
        });
        setProductName("");
        setProductBrand("");
        setProductPrice("");
        setProductNameError("");
        setProductBrandError("");
        setProductPriceError("");
    }

    if(validate.isEmpty(userInfo)) {
        LocalDB.setValue("fromPage", "requestProduct");
        LocalDB.setValue("toPage", -1);
        return (
            <SignInPopUp {...props} displayLogo={true}/>
        );
    }

    return (
        <React.Fragment>
            <section className='shadow-none p-3 CustomerFeedback'>
                <h5 className="sectionHeading mb-4">Request a Product
                    <span className='underline'></span>
                </h5>
                <div className='container px-5 d-flex justify-content-center'>
                    <div className='w-75'>
                        <div className="mb-4 subs-register-dropdown">
                            <label className="dropdown-label" style={{ zIndex: "1001" }}>Product Type<sup className='text-danger'> *</sup></label>
                            <Dropdown isOpen={openDropdown} toggle={() => setOpenDropdown(!openDropdown)}>
                                <DropdownToggle caret color="white" className="btn-block border">
                                    <span> { validate.isNotEmpty(requestedProductType.productTypeName) ? requestedProductType.productTypeName : "Select Type" } </span>
                                </DropdownToggle>
                                <DropdownMenu className="w-100">
                                    {productTypeList.map((productType) => {
                                        return(
                                            <DropdownItem key={productType.productTypeId} value = {productType.productTypeName} onClick = {() => {setRequestedProductType(productType); setRequestedProductTypeError(false);}}>{productType.productTypeName}</DropdownItem>
                                        );
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                            { requestedProductTypeError && <div class="text-danger small">This is mandatory Field</div> }
                        </div>
                        <div className="form-group has-float-label mb-4">
                            <input name="Product Name" id="productName" maxLength="50" placeholder=" " type="text" autoComplete="off" className={`form-control${productNameError ? ' is-invalid' : ''}`} value={productName} onChange={handleProductNameChange} onBlur={onProductNameBlur} onFocus={onProductNameFocus} />
                            <label htmlFor="productName" className="select-label text-capitalize">Product Name<sup className="text-danger"> *</sup></label>
                            <ErrorMessage message = {productNameError} />
                        </div>
                        <div className="form-group has-float-label mb-4">
                            <input name="Brand" id="brand" maxLength="30" placeholder=" " type="text" autoComplete="off" className={`form-control${productBrandError ? ' is-invalid' : ''}`} value={productBrand} onChange={handleBrandChange} onBlur={onBrandBlur} onFocus={onBrandFocus} />
                            <label htmlFor="brand" className="select-label">Brand</label>
                            <ErrorMessage message = {productBrandError} />
                        </div>
                        <div className="form-group has-float-label mb-4">
                            <input name="Price" id="price" maxLength="5" placeholder=" " type="text" autoComplete="off" className={`form-control${productPriceError ? ' is-invalid' : ''}`} value={productPrice} onChange={handlePriceChange} onBlur={onPriceBlur} onFocus={onPriceFocus} />
                            <label htmlFor="price" className="select-label">Price</label>
                            <ErrorMessage message = {productPriceError} />
                        </div>
                    </div>
                </div>
                <hr className="solid mb-3" />
                <div className="d-flex justify-content-end">
                    <button className='btn btn-dark px-5 rounded-pill' onClick={(event) => handleSubmit(event)}>Submit</button>
                </div>
            </section>
            <RequestProductResponsePopUp showResponsePopup = {showResponsePopup} clearForm = {clearForm} history = {props.history} />
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
        </React.Fragment>
    )
}

export default RequestProduct;