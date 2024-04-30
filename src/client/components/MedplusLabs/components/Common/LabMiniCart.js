import React, { useEffect, useState } from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Table } from 'reactstrap';
import Validate from "../../../../helpers/Validate";
import LabCheckoutAction from "../../../../../redux/action/LabCheckoutAction";
import LabCheckOutService from "../../Services/LabCheckoutService";
import LabNewCheckoutAction from "../../redux/action/LabNewCheckoutAction";
import SignInPopUp from "../../../Common/signInModelBox/SignInPopUp";
import LocalDB from "../../../../DataBase/LocalDB";
import { DIAGNOSTICS_URL_PREFIX } from "../../constants/LabConstants";

const LabMiniCart = (props) =>{

   const validate = Validate();
   const labShoppingCart = LabCheckoutAction().getLabShoppingCart();
   const labCheckoutService = LabCheckOutService();
   const labNewCheckoutAction = LabNewCheckoutAction();
   const [isPopUpOpen, setPopUpOpen] = useState(false);

   let cartItems ;
   if(validate.isNotEmpty(labShoppingCart)){
     cartItems = labShoppingCart.shoppingCartItems; 
   }

    useEffect(() => {
        syncLabShoppingCart();
    }, []);

    const syncLabShoppingCart = () => {
        labCheckoutService.getLabShoppingCart().then((data)=>{
            if(validate.isNotEmpty(data)){
                if(data.statusCode == 'SUCCESS' && validate.isNotEmpty(data.responseData) && validate.isNotEmpty(data.responseData.shoppingCart)){
                    labNewCheckoutAction.saveLabShoppingCart(data.responseData.shoppingCart);
                }else if(data.statusCode == 'FAILURE' && validate.isNotEmpty(data.message) && data.message == 'Lab Shopping Cart is empty'){
                    labNewCheckoutAction.clearLabShoppingCart()
                }
            }
        }).catch((error) => { 
            console.log(error);
        })
    } 

    const clearLabShoppingCart = () =>{
        labCheckoutService.clearLabShoppingCart().then(response =>{
            labNewCheckoutAction.clearLabShoppingCart();
        }).catch((error) =>{
            console.log(error);
            return;
        }); 
    }

    const goToPage=() => {
        if (validate.isNotEmpty(LocalDB.getValue('customerId')) && validate.isNotEmpty(LocalDB.getValue("SESSIONID"))) {
            props.history.push(`${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`);
        } else {
            LocalDB.setValue("fromPage", `${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`);
            LocalDB.setValue("toPage", -1);
            setPopUpOpen(!isPopUpOpen);
        }
        
    }

    return(
        <React.Fragment>
             <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle color="white" className='border-0'>
                    <a href="javascript:void(0);" id="cart" title="Shopping Cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 30.369 26.488">
                            <path d="M79.065,956.085a.975.975,0,0,0,0,1.95h3.9c1.62,4.005,3.21,8.026,4.816,12.046L86.3,973.637a.977.977,0,0,0,.9,1.35H103.5a1.028,1.028,0,0,0,.99-.975,1.017,1.017,0,0,0-.99-.975H88.666l.84-2.025,15.707-1.26a.99.99,0,0,0,.87-.75l1.95-8.476a1.01,1.01,0,0,0-.96-1.185H85.606l-1.065-2.655a1.013,1.013,0,0,0-.9-.615H79.065Zm7.321,5.206h19.5l-1.515,6.586-14.867,1.185Zm4.1,14.357a3.255,3.255,0,1,0,3.255,3.255A3.272,3.272,0,0,0,90.481,975.647Zm9.781,0a3.255,3.255,0,1,0,3.255,3.255A3.272,3.272,0,0,0,100.263,975.647Zm-9.781,1.95a1.305,1.305,0,1,1-1.305,1.305A1.287,1.287,0,0,1,90.481,977.6Zm9.781,0a1.305,1.305,0,1,1-1.305,1.305A1.306,1.306,0,0,1,100.263,977.6Z" transform="translate(-77.89 -955.87)" fill="#343a40" stroke="#fff" strokeWidth="0.2"></path>
                        </svg>
                        <div className="cart-count">{validate.isNotEmpty(cartItems) && cartItems.length > 0 ? cartItems.length : 0}</div>
                    </a>
                </DropdownToggle>
                    <DropdownMenu className="w-100 minicart p-0">
                        {validate.isNotEmpty(cartItems) && cartItems.length > 0 && <div className="p-0">
                            <span className="caret"></span>
                            <div className="header p-3" >
                                <h6 >
                                    Current Diagnostics Order
                                </h6>
                               {/*  <a href="javascript:void(0);" >Clear Cart</a> */}
                                {props.isLoggedInCustomer && <a href="javascript:void(0);" onClick={() => clearLabShoppingCart()} >Clear Cart</a>}
                            </div>
                            <div className="table-header m-3" >
                                <h6 >
                                    Test Name
                                </h6>
                            </div>
                            <div className="cartscrolldiv border rounded">
                                <Table className="table table-hover" >
                                    <tbody>
                                        {cartItems.map((eachShoppingCartItem) => {
                                            return (<tr key={eachShoppingCartItem.testId}>
                                                <td className="col-sm-6 col-md-6">
                                                    {eachShoppingCartItem.testName}
                                                </td>                                               
                                            </tr>)
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                            <div>
                                <button className="btn btn-brand-gradient border-0 btn-block" type="button" id="pharmaCheckOutBtn" onClick={() => goToPage()} >View Shopping Cart</button>
                            </div>
                        </div>}
                        {(validate.isEmpty(cartItems) || cartItems.length == 0) && <p className="m-3 padding-all margin-t-20 alert alert-info"> No tests/profiles are added to the cart </p>}
                    </DropdownMenu>
            </UncontrolledDropdown>

            { isPopUpOpen && <SignInPopUp {...props} setPopUpOpen={setPopUpOpen} displayLogo={true}/> }
        </React.Fragment>
    )

}

export default LabMiniCart;