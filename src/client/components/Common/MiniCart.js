import React, {useState} from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Validate from '../../helpers/Validate';
import { Table } from 'reactstrap';
import SignInPopUp from "../Common/signInModelBox/SignInPopUp";
import Cookies from "js-cookie";
import LocalDB from "../../DataBase/LocalDB";

const MiniCart = (props) => {
    const validate = Validate();
    const [isPopUpOpen, setPopUpOpen] = useState(false);

    const goToPage=() => {
        if (validate.isNotEmpty(LocalDB.getValue('customerId')) && validate.isNotEmpty(LocalDB.getValue("SESSIONID"))) {
            props.history.push('/shoppingCart');
        } else {
            LocalDB.setValue("fromPage", '/shoppingCart');
            LocalDB.setValue("toPage", -1);
            setPopUpOpen(!isPopUpOpen);
        }
    }

    return(
        <React.Fragment>
            <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle color="white" className='border-0'>
                    <span className='border-0 bg-transparent position-relative' id="cart" title="Shopping Cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 30.369 26.488">
                            <path d="M79.065,956.085a.975.975,0,0,0,0,1.95h3.9c1.62,4.005,3.21,8.026,4.816,12.046L86.3,973.637a.977.977,0,0,0,.9,1.35H103.5a1.028,1.028,0,0,0,.99-.975,1.017,1.017,0,0,0-.99-.975H88.666l.84-2.025,15.707-1.26a.99.99,0,0,0,.87-.75l1.95-8.476a1.01,1.01,0,0,0-.96-1.185H85.606l-1.065-2.655a1.013,1.013,0,0,0-.9-.615H79.065Zm7.321,5.206h19.5l-1.515,6.586-14.867,1.185Zm4.1,14.357a3.255,3.255,0,1,0,3.255,3.255A3.272,3.272,0,0,0,90.481,975.647Zm9.781,0a3.255,3.255,0,1,0,3.255,3.255A3.272,3.272,0,0,0,100.263,975.647Zm-9.781,1.95a1.305,1.305,0,1,1-1.305,1.305A1.287,1.287,0,0,1,90.481,977.6Zm9.781,0a1.305,1.305,0,1,1-1.305,1.305A1.306,1.306,0,0,1,100.263,977.6Z" transform="translate(-77.89 -955.87)" fill="#343a40" stroke="#fff" stroke-width="0.2"></path>
                        </svg>
                        <div className="cart-count">{validate.isNotEmpty(props.cartItems) && validate.isNotEmpty(props.cartItems.length) ? props.cartItems.length : 0}</div>
                    </span>
                </DropdownToggle>
                    <DropdownMenu className="w-100 minicart p-0">
                        {validate.isNotEmpty(props.cartItems) && props.cartItems.length > 0 && <div className="p-0">
                            <span className="caret"></span>
                            <div className="header p-3" >
                                <h6 >
                                    Current Pharmacy Order
                                </h6>
                                <span className='clr-cart' onClick={() => props.clearShoppingCart()} >Clear Cart</span>
                            </div>
                            <div className="table-header m-3" >
                                <h6 >
                                    Product Name
                                </h6>
                                <h6 >Qty (Packs)</h6>
                            </div>
                            <div className="cartscrolldiv border rounded">
                                <Table className="table table-hover" >
                                    <tbody>
                                        {props.cartItems.map((eachShoppingCartItem, index) => {
                                            return (<tr key={index}>
                                                <td className="col-sm-6 col-md-6">
                                                    {eachShoppingCartItem.productName}
                                                </td>
                                                <td className="col-sm-1 col-md-1 text-right" >
                                                    {eachShoppingCartItem.quantity}
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
                        {(validate.isEmpty(props.cartItems) || props.cartItems.length == 0) && <p className="m-3 padding-all margin-t-20 alert alert-info"> You have not added any products to Cart </p>}
                    </DropdownMenu>
            </UncontrolledDropdown>
            { isPopUpOpen && <SignInPopUp {...props} setPopUpOpen={setPopUpOpen} displayLogo={true}/> }
        </React.Fragment>
    )
}
export default MiniCart;