import React, { useState, useEffect } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import MartAdminService from "../../../../services/MartAdminService";
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_INFO, ALERT_TYPE_SUCCESS } from "../../../../../components/Common/Alert";
import BreadCrumbAction from "../../../../../../redux/action/BreadCrumbAction";
import Validate from "../../../../../helpers/Validate";

const ConfigureRedis = (props) => {

    const validate = Validate();
    const breadCrumbAction = BreadCrumbAction();
    const redisdb = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [key, setRedisKey] = useState('');
    const [value, setRedisValue] = useState("");
    const [expiry, setExpiry] = useState('');
    const [dbNo, setDb] = useState("");

    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: 'Configure Redis Info', url: props.location.pathname });
    }, [])

    const validateField = (e) => {
        const RedisKey = /^[a-zA-Z_]+$/;
        let val = e.target.value;
        if ((!RedisKey.test(val) && val.includes(' ')) || val == ' ') {
            setAlertInfo({ message: "use alphabets and under score(_) only", type: ALERT_TYPE_INFO });
            setRedisKey(key);
        } else {
            setRedisKey(e.target.value);
        }
    }

    const closeAlertMessage = () => {
        setAlertInfo({ message: "", type: "" });
    }

    const setExpiryHours = (e) => {
        const expiryHours = /^[0-9]+$/;
        let val = e.target.value;
        if (!expiryHours.test(val)) {
            if(val.length===0){
                setExpiry('');
                return;
            }
            setAlertInfo({ message: "enter possitive integers only", type: ALERT_TYPE_INFO });
            setExpiry(expiry);
        } else {
            setExpiry(e.target.value);
        }
    }

    const configureRedisKey = (e) => {
        e.preventDefault();
        if (validate.isEmpty(key)) {
            setAlertInfo({ message: "Redis Key cannot be empty", type: ALERT_TYPE_INFO });
        } else if (validate.isEmpty(value)) {
            setAlertInfo({ message: "Redis value cannot be empty", type: ALERT_TYPE_INFO });
        }
        else if (validate.isEmpty(dbNo)) {
            setAlertInfo({ message: "Redis DB number cannot be empty", type: ALERT_TYPE_INFO });
        }
        else {
            MartAdminService().saveRedisKeyInfo({ key, value, expiry, dbNo }).then(response => {
                if (response.statusCode == 'SUCCESS') {
                    setAlertInfo({ message: response.message, type: ALERT_TYPE_SUCCESS });
                } else {
                    setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }
    const toggle = () => {
        setDropdownOpen(!dropdownOpen)
    }
    return (
        <section>
                        <h5 className="p-3 mb-0 border-bottom">Configure Redis Info</h5>
            <div className="p-3 row">
                    <form noValidate className="col-12 d-flex flex-wrap">
                        <div className="col-2 form-group form-field form-group-error px-0">
                            <div className="has-float-label">
                                <input type="text" id="RedisKey" name="RedisKey" className="form-control" value={key} placeholder=" " onChange={(event) => { validateField(event) }} />
                                <label htmlFor="RedisKey">Redis Key</label>
                                <p className="d-none">Enter Valid Redis Key</p>
                            </div>

                        </div>
                        <div className="col-2 form-group form-field form-group-error">
                            <div className="has-float-label">
                                <input type="text" id="RedisValue" name="RedisValue" className="form-control" placeholder=" " onChange={(event) => setRedisValue(event.target.value)} />
                                <label htmlFor="RedisValue">Redis Value</label>
                                <p className="d-none">Enter Valid Redis Value</p>
                            </div>
                        </div>
                        <div className="col-2 form-group form-field form-group-error">
                            <div className="has-float-label">
                                <input type="text" id="expiry" name="expiry" className="form-control" value={expiry} placeholder=" " onChange={(event) => setExpiryHours(event)} />
                                <label htmlFor="expiry">Expiry(Hours)</label>
                                <p className="d-none">Enter Valid Expiry Houres</p>
                            </div>
                        </div>
                        <div className="custom-dropdown col-2">
                            <Dropdown isOpen={dropdownOpen} toggle={toggle} onClick={(e) => { e.stopPropagation(); setDb(e.target.innerText) }}>
                                <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                                    {!dbNo && "Select DB"}
                                    {dbNo}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                        <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                                            <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                                            <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                                        </g>
                                    </svg>
                                </DropdownToggle>
                                <DropdownMenu id="dropdDownMenu" className="border-0 shadow">
                                    {redisdb.map((val) => {
                                        return (
                                            <DropdownItem>{val}</DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="col-4 px-0">
                            <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" onClick={(event) => { configureRedisKey(event) }}>Submit</button>
                        </div>
                    </form>
            </div>
            <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000' />
        </section>

    )

}

export default ConfigureRedis;