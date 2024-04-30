import React, { useState,useEffect } from "react";
import Validate from "../../../../../helpers/Validate";
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '../../../../../components/Common/Alert';
import MartAdminService from "../../../../services/MartAdminService";
import BreadCrumbAction from "../../../../../../redux/action/BreadCrumbAction";

const ConfigureUpSellProductsHeading = props => {
    const [upsellProductHeading, setUpsellProductHeading] = useState('');
    const [alertData, setAlertData] = useState({});

    const validate = Validate();
    const adminService = MartAdminService();
    const breadCrumbAction = BreadCrumbAction();

    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: 'Configure Upsell Products Heading for ShoppingCart', url: props.location.pathname });
        getUpsellProductsHeading();
    }, []);

    const getUpsellProductsHeading = () => {
        adminService.getUpsellProductsHeading().then(data => {
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.message)) {
                if ("SUCCESS" == data.statusCode && validate.isNotEmpty(data.dataObject))
                    setUpsellProductHeading(data.dataObject);
                if ("FAILURE" == data.statusCode && "REDIRECT_TO_HOME" == data.message)
                    props.history.push("/")
            }
        }).catch(e => {
            console.log(e);
        })
    }

    const handleChange = e => {
        setUpsellProductHeading(e.target.value);
    }

    const saveUpsellProductsHeading = () => {
        adminService.saveUpsellProductsHeading({upSellProductsHeading:upsellProductHeading}).then(data => {
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.message)) {
                if ("SUCCESS" == data.statusCode) {
                    setAlertData({message: "UpSell Products Heading configuration saved successfully",type: ALERT_TYPE_SUCCESS});
                }
                if ("FAILURE" == data.statusCode) {
                    setAlertData({ message: data.message, type: ALERT_TYPE_ERROR });
                }
            }
        }).catch(e => {
            console.log("Error while saving configure upsell products heading for shopping cart", e);
        })
    }

    const clearError = () => {
        setAlertData({});
    }

    return (
        <React.Fragment>
            {alertData && <Alert alertInfo={alertData} onDurationEnd={clearError} duration={5000} />}
            <section>
                <h1 className='h5 mb-0 p-3 border-bottom'>Configure Up Sell Products Heading for Shopping Cart</h1>
                <div className="d-flex p-3">
                    {/* <span>Configure Up Sell Products Heading</span>
                    <input type="text" className='p-2 ml-2' value = {upsellProductHeading} onChange={(e) => { handleChange(e) }} /> */}
                                <div className="col-3 each-group form-group-error has-float-label px-0">
                                <input className="form-control w-100" id="customerId" name="customerId" value = {upsellProductHeading} placeholder=" " type="text" onChange={(e) => { handleChange(e) }}/>
                                <label htmlFor="customerId">
                                Configure Up Sell Product
                                </label>
                                <p className="d-none">Enter Valid Products Heading</p>
                                </div>
                    <button type="button" className="btn btn-brand-gradient rounded-pill px-5 custom-btn-lg ml-3" onClick={() => saveUpsellProductsHeading()}>Submit</button>
                </div>
               
            </section>
        </React.Fragment>
    )
}

export default ConfigureUpSellProductsHeading;