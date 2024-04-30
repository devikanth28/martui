import React, { useEffect, useState } from 'react'
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction';
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS, ALERT_TYPE_WARNING } from '../../../../../components/Common/Alert';
import MartAdminService from '../../../../services/MartAdminService';

const ProductDiscountDetail = (props) => {
    const [productId, setProductId] = useState();
    const [productDetails, setProductDetails] = useState();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const breadCrumbAction = BreadCrumbAction();
    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: 'Product Discount Info', url: props.location.pathname });
    }, [productDetails]);
    const closeAlertMessage = () => {
        setAlertInfo({ message: "", type: "" });
    }
    const getProductDiscount = (e) => {
        e.preventDefault();
        MartAdminService().getProductDiscountDetails({productId}).then(response => {
            if (response.statusCode == 'SUCCESS') {
                setProductDetails(response.dataObject.specialPromotion===null?'null':response.dataObject.specialPromotion);
                setAlertInfo({ message: response.dataObject.msg, type: ALERT_TYPE_SUCCESS });
            } else if (response.statusCode == 'WARNING') {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_WARNING });
            } else {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
            }
        }).catch(error => {
            console.log(error);
        })
    }
    return (
        <React.Fragment>
            <section>
                <h1 className='h5 p-3 border-bottom mb-0'>Product Discount Detail</h1>
                <div className='p-3'>
                <div className='d-flex' onSubmit={(e)=>{e.preventDefault()}}>
                    <div className="form-group has-float-label px-0 form-group-error">
                        <input type="text" className="form-control mb-2" placeholder=" " name="productDiscountDetail" value={productId} onChange={e => { setProductId(e.target.value) }} />
                        <label htmlFor='productDiscountDetail'>Enter Product Id</label>
                        <p className="d-none">plz Enter product Discount Detail</p>
                    </div>
                    <button type="submit" className="btn btn-brand-gradient ml-3 px-4 h-100 rounded-pill" disabled={!productId} onClick={e => { getProductDiscount(e) }}>Get Discount Details</button>
                </div>
                {productDetails && <div>
                        {productDetails && <p className="mb-0 font-weight-bold">Discount Details</p>}
                    special promotion : {JSON.stringify(productDetails)}
                </div>
                }
                </div>
                <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000' />
            </section>
        </React.Fragment>
    )
}

export default ProductDiscountDetail