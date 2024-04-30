import React, { useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Table } from 'reactstrap';
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction';
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_INFO, ALERT_TYPE_SUCCESS } from '../../../../../components/Common/Alert';
import { useInputField } from '../../../../../components/Common/CustomHooks/useInputField';
import Validate from '../../../../../helpers/Validate';
import MartAdminService from '../../../../services/MartAdminService';



const ErrorMessage = (props) => {
    return (<div className='invalid-feedback d-block'>{props.message}</div>);
}


const HolidaysEtaConfiguration = (props) => {

    const validate = Validate();
    const martAdminService = MartAdminService();
    const breadCrumbAction = BreadCrumbAction();

    const [stateList, setStateList] = useState([]);
    const [holidaysETAList, setHolidaysETAList] = useState({});
    const [holidaysETAListRows, setHolidaysETAListRows] = useState({});
    const [state, setState] = useState('');
    const [area, setArea] = useState('ALL');
    const [stateSec, setStateSec] = useState(false);
    const [citySec, setCitySec] = useState(false);
    const [warehouseSec, setWarehouseSec] = useState(false);
    const [stateError, setStateError] = useState(false);
    const [alertInfo, setAlertInfo] = useState({});

    const [cityName, cityNameError, setCityName, setCityNameError, handleCityNameChange, handleCityNameFocus, handleCityNameBlur] = useInputField('ALPHANUMERICSPACE', 20)
    const [warehouseId, warehouseIdError, setWarehouseId, setWarehouseIdError, handleWarehouseIdChange, handleWarehouseIdFocus, handleWarehouseIdBlur] = useInputField('ALPHANUMERICSPACE', 20)
    const [startDate, startDateError, setStartDate, setStartDateError, handleStartDateChange, handleStartDateFocus, handleStartDateBlur] = useInputField('TEXT', 10);
    const [noOfDays, noOfDaysError, setNoOfDays, setNoOfDaysError, handleNoOfDaysChange, handleNoOfDaysFocus, handleNoOfDaysBlur] = useInputField('NUMBER', 3)

    useEffect(() => {
        getHolidaysETAConfiguration();
        breadCrumbAction.pushBreadCrumbs({ name: 'Holidays ETA Configuration', url: props.location.pathname });
    }, []);

    const getHolidaysETAConfiguration = () => {
        martAdminService.getHolidaysETAConfiguration().then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === 'SUCCESS' && validate.isNotEmpty(response.dataObject)) {
                if (validate.isNotEmpty(response.dataObject.stateList)) {
                    setStateList(response.dataObject.stateList);
                }
                if (validate.isNotEmpty(response.dataObject.holidaysETAList)) {
                    setHolidaysETAList(response.dataObject.holidaysETAList);
                    setHolidaysETAListRows(response.dataObject.holidaysETAList);
                }
            }
        })
    }

    const addHolidaysETA = (e) => {
        e.preventDefault();
        if (area === 'STATE') {
            if (validate.isEmpty(state)) {
                setStateError('This is a mandatory field');
                return;
            }
        }
        else if (area === 'CITY') {
            if (validate.isEmpty(cityName)) {
                setCityNameError('This is a mandatory field');
                return;
            }
            if (validate.isNotEmpty(cityNameError)) {
                setCityNameError(cityNameError);
                return;
            }
        } else if (area === 'WAREHOUSEID') {
            if (validate.isEmpty(warehouseId)) {
                setWarehouseIdError('This is a mandatory field');
                return;
            }
            if (validate.isNotEmpty(warehouseIdError)) {
                setWarehouseIdError(warehouseIdError);
                return;
            }
        }

        if (validate.isEmpty(startDate)) {
            setStartDateError('This is a mandatory field');
            return;
        }
        if (validate.isEmpty(noOfDays)) {
            setNoOfDaysError('This is a mandatory field');
            return;
        }
        if (validate.isNotEmpty(startDateError)) {
            setStartDateError(startDateError);
            return;
        }
        if (validate.isNotEmpty(noOfDaysError)) {
            setNoOfDaysError(noOfDaysError);
            return;
        }

        const addHolidaysETAParams = { area: area, areaName: validate.isNotEmpty(cityName) ? cityName : warehouseId, state: state, fromDate: startDate, noOfDays: noOfDays }
        martAdminService.addHolidaysETA(addHolidaysETAParams).then(response => {
            if (validate.isNotEmpty(response)) {
                if (response.statusCode === 'SUCCESS' && validate.isNotEmpty(response.dataObject)) {
                    setAlertInfo({ message: 'SUCCESSFULLY INSERTED ETA HOURS', type: ALERT_TYPE_SUCCESS })
                    if (validate.isNotEmpty(response.dataObject)) {
                        setHolidaysETAList(response.dataObject);
                        setHolidaysETAListRows(response.dataObject);
                    }
                    resetData();
                }
                else if (response.statusCode == 'FAILURE' && validate.isNotEmpty(response.message)) {
                    setAlertInfo({ message: response.message, type: ALERT_TYPE_INFO });
                }
            }
        }).catch((err) => {
            setAlertInfo({ message: 'There is some problem with request. Please try again.', type: ALERT_TYPE_ERROR });
            console.log(err);
        })
    }

    const deleteHolidaysETAConfig = (deleteparams) => {
        martAdminService.deleteHolidaysETAConfig(deleteparams).then(response => {
            if (validate.isNotEmpty(response)) {
                if (response.statusCode === 'SUCCESS') {
                    setAlertInfo({ message: 'SUCCESSFULLY REMOVED ETA RECORD', type: ALERT_TYPE_SUCCESS });
                    const areaKey = deleteparams.areaKey;
                    const date = deleteparams.date;
                    var updatedObject = { ...holidaysETAList }
                    updatedObject[areaKey] = updatedObject[areaKey].filter(item => item != date);
                    if (validate.isEmpty(updatedObject[areaKey])) {
                        updatedObject = Object.entries(updatedObject)
                            .filter(([objKey]) => objKey !== areaKey)
                            .reduce((acc, [objKey, value]) => {
                                acc[objKey] = value;
                                return acc;
                            }, {});
                    }
                    setHolidaysETAList(updatedObject);
                    setHolidaysETAListRows(updatedObject);
                    resetPreviousStates();
                } else if (response.statusCode === 'FAILURE' && validate.isNotEmpty(response.message)) {
                    setAlertInfo({ message: response.message, type: ALERT_TYPE_INFO });
                }

            }
        }).catch((err) => {
            setAlertInfo({ message: 'There is some problem with request. Please try again.', type: ALERT_TYPE_ERROR });
            console.log(err);
        })

    }

    const handleArea = (selectedOption) => {
        setArea(selectedOption);
        if (selectedOption === 'ALL') {
            setStateSec(false);
            setCitySec(false);
            setWarehouseSec(false);
        }
        else if (selectedOption == 'STATE') {
            setStateSec(true);
            setCitySec(false);
            setWarehouseSec(false);
        }
        else if (selectedOption === 'CITY') {
            setStateSec(false);
            setCitySec(true);
            setWarehouseSec(false);
        }
        else {
            setStateSec(false);
            setCitySec(false);
            setWarehouseSec(true);
        }
        resetPreviousStates();
    }

    const resetData = () => {
        setArea('ALL');
        setCitySec(false);
        setStateSec(false);
        setWarehouseSec(false);
        resetPreviousStates();
    }

    const resetPreviousStates = () => {
        setState('');
        setCityName('');
        setWarehouseId('');
        setStartDate('');
        setNoOfDays('');
        setCityNameError('');
        setWarehouseIdError('');
        setStartDateError('');
        setNoOfDaysError('');
    }


    return (
        <React.Fragment>
            {validate.isNotEmpty(alertInfo) && <Alert alertInfo={alertInfo} onDurationEnd={setAlertInfo} duration={3000} />}
            <section>
                <h1 className='h5 mb-3 header p-3'>Holidays ETA Configuration</h1>
                <form onSubmit={addHolidaysETA}>
                    <div className='p-3'>
                        <div className='align-items-baseline w-25 mb-3'>
                            <p className='border-bottom font-12 pb-2'>Select Locality Type</p>


                            <div className="form-inline" style={{ "gap": "1rem" }}>
                                <div className="input-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="all" value="ALL" name="Area" checked={"ALL" === area} onClick={() => handleArea("ALL")} />
                                        <label className="custom-control-label" for="all">ALL</label>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="state" value="STATE" name="Area" checked={"STATE" === area} onClick={() => handleArea("STATE")} />
                                        <label className="custom-control-label" for="state">State</label>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="city" value="CITY" checked={"CITY" === area} onClick={() => handleArea("CITY")} />
                                        <label className="custom-control-label" for="city">City</label>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="warehouseid" value="WAREHOUSEID" name="Area" checked={"WAREHOUSEID" === area} onClick={() => handleArea("WAREHOUSEID")} />
                                        <label className="custom-control-label" for="warehouseid">WarehouseID</label>
                                    </div>
                                </div>
                            </div>

                            {stateSec &&
                                <Typeahead
                                    name="state"
                                    placeholder={"Select State"}
                                    id="state"
                                    labelKey={(eachLocation) => `${eachLocation}`}
                                    maxResults={100}
                                    clearButton
                                    className='mt-3'
                                    options={stateList}
                                    onKeyDown={event => {
                                        if (event.key === 'Enter') {
                                            setState(event[0]);
                                            setStateError(false);
                                        }
                                    }}
                                    onChange={(e) => { setState(e[0]); setStateError(false); }} />
                            }
                            {stateError && <ErrorMessage message='This is a mandatory field' />}


                            {citySec && <div className='mt-3'>
                                <div class="form-group has-float-label mb-3">
                                    <input type='text' autoComplete='off' name='areaName' class="form-control" rows={1} placeholder=" " id="areaName" value={cityName} onChange={handleCityNameChange} onBlur={handleCityNameBlur} onFocus={handleCityNameFocus} />
                                    <label htmlFor="areaName" className="select-label">Enter city name</label>
                                </div>
                                {validate.isNotEmpty(cityNameError) && <ErrorMessage message={cityNameError} />}
                            </div>}

                            {warehouseSec && <div className='mt-3'>
                                <div class="form-group has-float-label mb-3">
                                    <input type='text' autoComplete='off' name='warehouseId' class="form-control" rows={1} placeholder=" " id="warehouseId" value={warehouseId} onChange={handleWarehouseIdChange} onBlur={handleWarehouseIdBlur} onFocus={handleWarehouseIdFocus} />
                                    <label htmlFor="warehouseId" className="select-label">Enter warehouse Id</label>
                                </div>
                                {validate.isNotEmpty(warehouseIdError) && <ErrorMessage message={warehouseIdError} />}
                            </div>}

                        </div>



                        <div className='col-3 pt-3 px-0'>
                            <div className='form-group each-group has-float-label form-group-error'>
                                <input className='form-control type-address' type='date' id='fromDate' value={startDate} name='fromDate' placeholder=' ' onChange={handleStartDateChange} onFocus={handleStartDateFocus} onBlur={handleStartDateBlur} />
                                <label htmlFor='fromDate' className='select-label'>start Date(YYYY-MM-DD)</label>
                                {validate.isNotEmpty(startDateError) && <ErrorMessage message={startDateError} />}
                            </div>
                        </div>

                        <div className='col-2 px-0 mb-3'>
                            <div className='form-group has-float-label form-group-error'>
                                <input className='form-control type-address' autocomplete='off' name='noOfDays' placeholder=" " id='noOfDays' value={noOfDays} onChange={handleNoOfDaysChange} onFocus={handleNoOfDaysFocus} onBlur={handleNoOfDaysBlur} />
                                <label htmlFor="noOfDays" className="select-label">Enter no of Days</label>
                                {validate.isNotEmpty(noOfDaysError) && <ErrorMessage message={noOfDaysError} />}
                            </div>
                        </div>



                    </div>
                        <div className='p-3 text-right'>
                            <button type='button' className='btn brand-secondary custom-btn-lg px-5 rounded-pill' onClick={resetData}>clear</button>
                            <button type='submit' role='button' className='btn btn-brand-gradient custom-btn-lg px-5 rounded-pill ml-3'>Save</button>
                        </div>
                </form>


                <div>
                    {validate.isNotEmpty(holidaysETAListRows) && <div className='col-8 p-3'>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Area</th>
                                    <th>Holidays Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            {Object.keys(holidaysETAListRows).sort().map((key) => {
                                return (
                                    <tbody>
                                        {holidaysETAListRows[key].map((value, index) => {
                                            return (
                                                <tr>
                                                    <td>{index === 0 ? key.replace('_', ':') : ''}</td>
                                                    <td>{value.trim()}</td>
                                                    <td onClick={() => deleteHolidaysETAConfig({ areaKey: key, date: value })}><button className='btn brand-secondary rounded-pill'>Remove</button></td>

                                                </tr>
                                            )
                                        })}
                                    </tbody>)
                            })}
                        </Table>
                    </div>
                    }
                </div>
            </section>
        </React.Fragment>
    )
}

export default HolidaysEtaConfiguration;