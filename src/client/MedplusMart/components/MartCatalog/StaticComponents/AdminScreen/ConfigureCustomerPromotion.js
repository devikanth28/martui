import React, { useEffect, useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem }  from 'reactstrap';
import BreadCrumbAction from "../../../../../../redux/action/BreadCrumbAction";
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_INFO, ALERT_TYPE_SUCCESS } from "../../../../../components/Common/Alert";
import Validate from "../../../../../helpers/Validate";
import MartAdminService from "../../../../services/MartAdminService";
const ConfCustomerPromotion = (props) => {
    const [dropdownOpen,setDropdownOpen] = useState([false,false,false,false]);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const promotionType = ['Promotion','Campaign'];
    const options = ['Yes','No'];
    const [promoType,setPromoType] = useState(undefined);
    const [promoId,setPromoId] = useState(null);
    const [toDate,setToDate] = useState(null);
    const [uniqueType,setUniqueType] = useState(undefined);
    const [noOfDays,setNoOfDays] = useState(null);
    const [communicateToUser,setCommunicationToUser] = useState(undefined);
    const [showPopup,setShowPopup] = useState('Select Type');
    const [errorMessage,setErrorMessage] = useState(['','','','','','',''])
    const breadCrumbAction = BreadCrumbAction();
    const validate = Validate();
    const closeAlertMessage = () => {
        setAlertInfo({ message: "", type: "" });
    }
    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: 'Configure Customer Promotion', url: props.location.pathname });
    },[])
    const toggle=(val)=>{
        const changeDropdownOpen = dropdownOpen.map((o,i)=>{
            if(i===val){
                return !o;
            }else{
                return o;
            }
        })
        setDropdownOpen(changeDropdownOpen);
    }
    const handleOnBlur=(message,value,index)=>{
        if(validate.isEmpty(value)){
            const errorMsg = errorMessage.map((o,i)=>{
                if(i===index){
                    return message+' cannot be empty';
                }else{
                    return '';
                }
            })
            setErrorMessage(errorMsg);
        }else{
            const errorMsg = errorMessage.map((o,i)=>{
                if(i===index){
                    return '';
                }
            })
            setErrorMessage(errorMsg);
        }
    }

    const saveCustomerPromotion=(e)=>{
        e.preventDefault();
        MartAdminService().saveCustomerPromotion({promoType:promoType.charAt(0).toUpperCase(),promoId,toDate,uniqueType:uniqueType.charAt(0).toUpperCase(),noOfDays,communicateToUser:communicateToUser.charAt(0).toUpperCase(),showPopup:showPopup.charAt(0).toUpperCase()}).then(response=>{
            if(response.statusCode=='SUCCESS'){
                setAlertInfo({ message:  response.message, type: ALERT_TYPE_SUCCESS });
            }else{
                setAlertInfo({ message:  response.message, type: ALERT_TYPE_ERROR });
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return(
        <section>
                    <h1 className="h5 p-3 mb-0 border-bottom">Configure Customer Promotion</h1>
            <div className="py-3">
                            {/* <div className="custom-dropdown">
                                <Dropdown isOpen={dropdownOpen[0]} toggle={()=>{toggle(0)}} onBlur={()=>{handleOnBlur('PromoType',promoType,0)}}>
                                <p className="">PromoType <span style={{'color':'red'}}>*</span></p>
                                    <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                                        {promoType?promoType:'Select Type'}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                            <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                                                <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                                                <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                                            </g>
                                        </svg>
                                    </DropdownToggle>
                                    <DropdownMenu id="dropdDownMenu scrollable-menu" className="border-0 shadow">
                                    {promotionType.map(obj=>{
                                        return(
                                        <DropdownItem onClick={()=>{setPromoType(obj)}} >
                                           {obj}
                                        </DropdownItem>
                                        )
                                    })}
                                    </DropdownMenu>
                                    
                                    </Dropdown>
                            </div> */}
                            <div className="col-4 mb-3" style={{ gap: '1rem' }}>
                                <label className="font-12 text-secondary mb-0">Select PromoType</label>
                                <div className="d-flex">
                                {promotionType.map((val) => (
                                    <div className="input-group w-auto mr-3" key={val}>
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                checked={promoType === val}
                                                id={val}
                                                value={val}
                                                name="promoType"
                                                onChange={() => setPromoType(val)}
                                            />
                                            <label className="custom-control-label pointer" htmlFor={val}>
                                                {val}
                                            </label>
                                        </div>
                                    </div>
                                ))}</div>
                                {validate.isNotEmpty(errorMessage[0]) &&
                                    <div className="invalid-feedback d-block">
                                        {errorMessage[0]}
                                    </div>
                                }
                            </div>
                        <div className="form-group form-field col-2 mb-3">
                            <div className="has-float-label">
                                <input type="text" id="promoId" name="promoId" value={promoId} className="form-control" placeholder=" " onChange={(e)=>{setPromoId(e.target.value)}} onBlur={()=>{handleOnBlur('Promo Id',promoId,1)}}/>
                                <label htmlFor="promoId">Promo ID</label>
                                    {validate.isNotEmpty(errorMessage[1]) &&
                                        <div className="invalid-feedback d-block">
                                            {errorMessage[1]}
                                        </div>
                                    }
                            </div>
                        </div>
                        <div className="form-group form-field col-2 my-3">
                            <div className="has-float-label">
                                <input type="date" id="promoExpiryDate" name="promoExpiryDate" value={toDate} className="form-control" placeholder=" " onChange={(e)=>{setToDate(e.target.value)}} onBlur={()=>{handleOnBlur('Promo Expiry Date',toDate,2)}}/>
                                <label htmlFor="promoExpiryDate">Promo Expiry Date</label>
                                {validate.isNotEmpty(errorMessage[2]) &&
                                        <div className="invalid-feedback d-block">
                                            {errorMessage[2]}
                                        </div>
                                    }
                            </div>
                        </div>
                        {/* <div className="custom-dropdown">
                                <Dropdown isOpen={dropdownOpen[1]} toggle={()=>{toggle(1)}} onBlur={()=>{handleOnBlur('Unique Coupon Per Customer',uniqueType,3)}}>
                                <p className="">Unique Coupon Per Customer <span style={{'color':'red'}}>*</span></p>
                                    <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                                        {uniqueType?uniqueType:'Select type'}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                            <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                                                <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                                                <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                                            </g>
                                        </svg>
                                    </DropdownToggle>
                                    <DropdownMenu id="dropdDownMenu scrollable-menu" className="border-0 shadow">
                                        {options.map(obj=>{
                                            return (
                                                <DropdownItem size="sm" tag="a"onClick={()=>{setUniqueType(obj)}}>
                                                    {obj}
                                                </DropdownItem>
                                            )
                                        })}
                                    </DropdownMenu>
                                    {validate.isNotEmpty(errorMessage[3]) &&
                                        <div className="invalid-feedback d-block">
                                            {errorMessage[3]}
                                        </div>
                                    }
                                </Dropdown>
                            </div> */}
                            
                        <div className="form-group form-field col-2">
                            <div className="has-float-label">
                                <input type="text" id="activeNoOfDays" name="Active No Of Days" value={noOfDays} className="form-control" placeholder=" " onChange={(e)=>{setNoOfDays(e.target.value)}} onBlur={()=>{handleOnBlur('Active Days For Coupon',noOfDays,4)}}/>
                                <label htmlFor="activeNoOfDays">Active Days For Coupon</label>
                                {validate.isNotEmpty(errorMessage[4]) &&
                                        <div className="invalid-feedback d-block">
                                            {errorMessage[4]}
                                        </div>
                                    }
                            </div>
                        </div>
                        {/* <div className="custom-dropdown">
                                <Dropdown isOpen={dropdownOpen[2]} toggle={()=>{toggle(2)}} onBlur={()=>{handleOnBlur('Communicate to User',communicateToUser,5)}}>
                                    <p className="">Communicate to User <span style={{'color':'red'}}>*</span></p>
                                    <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                                        {communicateToUser?communicateToUser:'Select type'}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                            <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                                                <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                                                <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                                            </g>
                                        </svg>
                                    </DropdownToggle>
                                    <DropdownMenu id="dropdDownMenu" className="border-0 shadow">
                                        {options.map(obj => {
                                            return (
                                                <DropdownItem size="sm" tag="a" onClick={() => { setCommunicationToUser(obj) }}>
                                                    {obj}
                                                </DropdownItem>
                                            )
                                        })}
                                    </DropdownMenu>
                                    {validate.isNotEmpty(errorMessage[5]) &&
                                        <div className="invalid-feedback d-block">
                                            {errorMessage[5]}
                                        </div>
                                    }
                                </Dropdown>
                            </div> */}
                            <div className="col-4 mb-3" style={{ gap: '1rem' }}>
                                <label className="font-12 text-secondary mb-0">Communicate to User</label>
                                <div className="d-flex">
                                {options.map((val) => (
                                    <div className="input-group w-auto mr-3" key={val}>
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                checked={communicateToUser === val}
                                                id={"C"+val}
                                                value={val}
                                                name="user"
                                                onChange={() => setCommunicationToUser(val)}
                                            />
                                            <label className="custom-control-label pointer" htmlFor={"C"+val}>
                                                {val}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                {validate.isNotEmpty(errorMessage[5]) &&
                                        <div className="invalid-feedback d-block">
                                            {errorMessage[5]}
                                        </div>
                                    }
                            </div>
                        {/* <div className="custom-dropdown">
                                <Dropdown isOpen={dropdownOpen[3]} toggle={()=>{toggle(3)}} onBlur={()=>{handleOnBlur('Show Popup',showPopup,6)}}>
                                <p className="">Show Popup <span style={{'color':'red'}}>*</span></p>
                                    <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                                        {showPopup?showPopup:'Select type'}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                            <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                                                <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                                                <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                                            </g>
                                        </svg>
                                    </DropdownToggle>
                                    <DropdownMenu id="dropdDownMenu" className="border-0 shadow">
                                        {options.map(obj => {
                                            return (
                                                <DropdownItem size="sm" tag="a" onClick={() => { setShowPopup(obj) }}>
                                                    {obj}
                                                </DropdownItem>
                                            )
                                        })}
                                    </DropdownMenu>
                                    {validate.isNotEmpty(errorMessage[6]) &&
                                        <div className="invalid-feedback d-block">
                                            {errorMessage[6]}
                                        </div>
                                    }
                                </Dropdown>
                            </div> */}
                            <div className="col-4 mb-3" style={{ gap: '1rem' }}>
                                <label className="font-12 text-secondary mb-0">Show Popup</label>
                                <div className="d-flex">
                                {options.map((val) => (
                                    <div className="input-group w-auto mr-3" key={val}>
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                checked={showPopup === val}
                                                id={"S"+val}
                                                value={val}
                                                name="popUp"
                                                onChange={() => setShowPopup(val)}
                                            />
                                            <label className="custom-control-label pointer" htmlFor={"S"+val}>
                                                {val}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                {validate.isNotEmpty(errorMessage[6]) &&
                                        <div className="invalid-feedback d-block">
                                            {errorMessage[6]}
                                        </div>
                                    }
                            </div>
                            <div className="col-4 mb-3" style={{ gap: '1rem' }}>
                                <label className="font-12 text-secondary mb-0">Unique Coupon Per Customer</label>
                                <div className="d-flex">
                                {options.map((val) => (
                                    <div className="input-group w-auto mr-3" key={val}>
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                checked={uniqueType === val}
                                                id={"P"+val}
                                                value={val}
                                                name="couponPerCustomer"
                                                onChange={() => setUniqueType(val)}
                                            />
                                            <label className="custom-control-label pointer" htmlFor={"P"+val}>
                                                {val}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                {validate.isNotEmpty(errorMessage[3]) &&
                                        <div className="invalid-feedback d-block">
                                            {errorMessage[3]}
                                        </div>
                                    }
                            </div>
                        <div className="col-12 d-flex justify-content-end">
                            <button role="button" type="button" className="btn btn-brand-gradient px-5 rounded-pill" onClick={(e)=>{saveCustomerPromotion(e)}}>Save</button>
                        </div>
                </div>
            <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000' />
        </section>
    )

}

export default ConfCustomerPromotion;