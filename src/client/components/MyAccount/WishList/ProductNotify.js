import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProductThumbNail from '../../Common/ProductThumbNail';
import Validate from '../../../helpers/Validate';
import MyAccountService from '../../../services/MyAccountService';

const ProductNotify = (props) =>{

    let product = props.notifyProduct;
    const [productQty, setProductQty] = useState("");
    const [isnotifingProduct, setNotifingProduct] = useState(false);
    const validate = Validate();
    const myAccountService = MyAccountService();
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const CloseButton = <button type="button" onClick={() => props.toggleModel(false,product)} className="close" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect fill="none" width="24" height="24"/>
                            <path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z"/>
                            </svg>
                        </button>

    const notifyProductInfo = (productId,requestedQty) => {
        if(validate.isEmpty(requestedQty) || isNaN(requestedQty) || 0 >= parseInt(requestedQty) || 99 < parseInt(requestedQty)){
            setErrorMsg("Please enter valid quantity for this product");
            return false;
        }
        setNotifingProduct(true);
        myAccountService.productNotifyMe(productId, requestedQty).then(response => {
            setNotifingProduct(false);
            setSuccessMsg("");
            setErrorMsg("");
            if(validate.isNotEmpty(response) && response.statusCode == "SUCCESS"){
                setSuccessMsg("We will reply back to your Email Id /  Mobile on stock availability");
                document.getElementById("closeBtn").click();
                props.showSuccessMsg("We will reply back to your Email Id /  Mobile on stock availability");
            }else{
                if(response.message == "Product already notified"){
                   setErrorMsg("You have already requested to notify for this product");
                }
                else{
                    setErrorMsg(response.message);
                }
            }
        }).catch(function(error) {
            console.log(error);
            setNotifingProduct(false);
        });
    }

    return (
        <React.Fragment>
            <div>
                <Modal isOpen={props.modal} backdrop="static" keyboard={false} toggle={() => props.toggleModel(false,product)} className="my-account-modal modal-lg modal-dialog-centered">
                    <ModalHeader toggle={() => props.toggleModel(false,product)} close={CloseButton}>
                        Requesting for Product
                    </ModalHeader>
                        <ModalBody>
                            <div className="row mx-0">
                                <div className="col-6">
                                    <div className="get-notified-carousel carousel slide" data-ride="carousel">
                                    {/* <ol className="carousel-indicators">
                                        <li data-target=".get-notified-carousel" data-slide-to="0" className="active"></li>
                                        <li data-target=".get-notified-carousel" data-slide-to="1"></li>
                                        <li data-target=".get-notified-carousel" data-slide-to="2"></li>
                                    </ol> */}
                                    <div className="carousel-inner">
                                        <div className="carousel-item text-center active">
                                            <ProductThumbNail imageUrl={product.imageUrl} productId={product.productId} className="img-fluid" svgClassName={"img-fluid"} 
                                                productName={product.productName} svgHeight={'100'} svgWidth={"100"} height="136" auditForm={product.attribute.auditFo}  imagesCount={product.imageUploadCount} 
                                                isGeneral={(product.isGeneral=="Y" || product.attribute.auditFo === "GEN") ? true : false}/>
                                        </div>
                                        <div className="carousel-item text-center">
                                            <ProductThumbNail imageUrl={product.imageUrl} productId={product.productId} className="img-fluid" svgClassName={"img-fluid"} 
                                                productName={product.productName} svgHeight={'100'} svgWidth={"100"} height="136" auditForm={product.attribute.auditFo} imagesCount={product.imageUploadCount} 
                                                isGeneral={(product.isGeneral=="Y" || product.attribute.auditFo === "GEN") ? true : false}/>
                                        </div>
                                        <div className="carousel-item text-center">
                                            <img className="img-fluid" src="https://static1.medplusindia.com:555/products/JOHN0063_S.jpg" alt="Product Name" height="136"/>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h6> {product.productName} </h6>
                                    <h5>Need this product?</h5>
                                    <p>We will try and source it for you</p>
                                    <div className="form-group filled-form mt-5 mb-2">
                                        <input type="text" className="form-control" id="request-quantity" name="Request Product Quantity" max="99" onBlur={event => setProductQty(event.target.value)} maxLength="30" required autocomplete="off" placeholder=" "/>
                                        <label className="select-label">Enter quantity for this product <sup className="text-brand">*</sup></label>
                                    </div>
                                    {validate.isNotEmpty(errorMsg) && <sup className="text-brand">{errorMsg}</sup> }
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button type="button" className="brand-secondary btn px-5 rounded-pill" data-dismiss="modal" id="closeBtn" onClick={() => props.toggleModel(false,product)}>{validate.isEmpty(successMsg) ? "Cancel" : "Close"}</button>
                                {!isnotifingProduct ?
                                <button type="button" className="btn btn-brand-gradient rounded-pill ml-3 px-5" onClick={() => notifyProductInfo(product.productId,productQty)}>Submit</button>
                                :
                                <button  type="button" className="btn btn-brand-gradient rounded-pill ml-3 px-5">
                                    <React.Fragment>
                                        <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                        <span className="sr-only"></span>
                                    </React.Fragment>
                                </button>
                                }
                            </div>
                        </ModalBody>
                    </Modal>
            </div>  
        </React.Fragment>
    )
}

export default ProductNotify ;