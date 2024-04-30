import React, { useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Table } from 'reactstrap';
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction';
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_INFO, ALERT_TYPE_SUCCESS } from '../../../../../components/Common/Alert';
import { useInputField } from '../../../../../components/Common/CustomHooks/useInputField';
import Validate from '../../../../../helpers/Validate';
import MartAdminService from '../../../../services/MartAdminService';

const ErrorMessage = (props) => {
  return (
    <div className='invalid-feedback d-block'>{props.message}</div>
  );
};

const EmergencyMessageConfiguration = (props) => {

  const validate = Validate();
  const martAdminService = MartAdminService();
  const breadCrumbAction = BreadCrumbAction();

  const [state, setState] = useState('');
  const [stateError, setStateError] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [emergencyMessages, setEmergencyMessages] = useState({});
  const [emergencyMessagesRows, setEmergencyMessagesRows] = useState({});
  const [areaSec, setAreaSec] = useState(false);
  const [stateSec, setStateSec] = useState(false);
  const [alertInfo, setAlertInfo] = useState({});
  const [emergencyMsg, emergencyMessageError, setEmergencyMsg, setEmergencyMessageError, handleEmergencyMessageChange, handleEmergencyMessageFocus, handleEmergencyMessageBlur] = useInputField('TEXT', 200);
  const [areaName, areaNameError, setAreaName, setAreaNameError, handleAreaNameChange, handleAreaNameFocus, handleAreaNameBlur] = useInputField('ALPHANUMERICSPACE', 20)
  const [selectedArea, setSelectedArea] = useState('ALL');

  useEffect(() => {
    getEmergencyMessageConfiguration();
    breadCrumbAction.pushBreadCrumbs({ name: 'Emergency Message Configuration', url: props.location.pathname });
  }, []);

  const getEmergencyMessageConfiguration = () => {
    martAdminService.getEmergencyMessageConfiguration().then(response => {
      if (validate.isNotEmpty(response) && response.statusCode == 'SUCCESS' && validate.isNotEmpty(response.dataObject)) {
        if (validate.isNotEmpty(response.dataObject.stateList)) {
          setStateList(response.dataObject.stateList);
        }
        if (validate.isNotEmpty(response.dataObject.emergencyMessages)) {
          setEmergencyMessages(response.dataObject.emergencyMessages);
          setEmergencyMessagesRows(response.dataObject.emergencyMessages);
        }
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const onSubmitCreateEmergencyMessage = (e) => {
    e.preventDefault();
    if (selectedArea == 'STATE' && validate.isEmpty(state)) {
      setStateError('This is a mandatory field');
      return;
    }

    if ((selectedArea == 'CITY' || selectedArea == 'WAREHOUSEID')) {
      if (validate.isEmpty(areaName)) {
        setAreaNameError('This is a mandatory field');
        return;
      }

      if (validate.isNotEmpty(areaNameError)) {
        setAreaNameError(areaNameError);
        return;
      }
    }

    if (validate.isEmpty(emergencyMsg)) {
      setEmergencyMessageError('This is a mandatory field');
      return;
    }

    if (validate.isNotEmpty(emergencyMessageError)) {
      setEmergencyMessageError(emergencyMessageError);
      return;
    }

    let createMessageParams = { area: selectedArea, areaName: areaName, state: state, emergencyMsg: emergencyMsg }
    martAdminService.createEmergencyMessage(createMessageParams).then(response => {
      if (validate.isNotEmpty(response)) {
        if (response.statusCode == 'SUCCESS') {
          setAlertInfo({ message: 'Successfully Inserted Emergency Message', type: ALERT_TYPE_SUCCESS });
          const emerMsg = constructingEmergencyMessages();
          setEmergencyMessages(emerMsg);
          setEmergencyMessagesRows(emerMsg);
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

  const deleteEmergencyMsg = (key) => {
    martAdminService.deleteEmergencyMsg({ areaKey: key }).then(response => {
      if (validate.isNotEmpty(response)) {

        if (response.statusCode == 'SUCCESS') {
          setAlertInfo({ message: 'Successfully Removed Emergency Message', type: ALERT_TYPE_SUCCESS });
          const updatedObject = Object.entries(emergencyMessages)
            .filter(([objKey]) => objKey !== key)
            .reduce((acc, [objKey, value]) => {
              acc[objKey] = value;
              return acc;
            }, {});
          setEmergencyMessagesRows(updatedObject);
          setEmergencyMessages(updatedObject)
          resetData();
        }
        else if (response.statusCode == 'FAILURE' && validate.isNotEmpty(response.message)) {
          setAlertInfo({ message: response.message, type: ALERT_TYPE_INFO });
        }
      }
    }).catch((err) => {
      setAlertInfo({ message: 'There is some problem with request. Please try again', type: ALERT_TYPE_ERROR })
      console.log(err);
    })
  }

  const constructingEmergencyMessages = () => {
    let key = '';
    if (validate.isNotEmpty(areaName)) {
      key = selectedArea + '_' + areaName.trim().replace(/\s+/g, '').toUpperCase();
    }
    else if (validate.isNotEmpty(state)) {
      key = selectedArea + '_' + state.trim().replace(/\s+/g, '').toUpperCase();
    }
    else {
      key = selectedArea;
    }
    const emerMsg = { ...emergencyMessages, [key]: emergencyMsg.trim().replace(/\s+/g, ' ') };
    const sortedObj = Object.keys(emerMsg).sort().reduce((acc, key) => {
      acc[key] = emerMsg[key];
      return acc;
    }, {})
    return sortedObj;
  }

  const handleAreaSelection = (area) => {
    setSelectedArea(area);
    if (area == 'ALL') {
      setStateSec(false);
      setAreaSec(false);
    }
    else if (area == 'STATE') {
      setStateSec(true);
      setAreaSec(false);
    } else {
      setStateSec(false);
      setAreaSec(true);
    }
    resetPreviousStates();
  }

  const resetData = () => {
    setSelectedArea('ALL');
    setAreaSec(false);
    setStateSec(false);
    resetPreviousStates();
  }

  const resetPreviousStates = () => {
    setEmergencyMsg('');
    setAreaName('');
    setState('');
    setEmergencyMessageError(false);
    setAreaNameError(false);
    setStateError(false);
  }

  return (
    <React.Fragment>
      {validate.isNotEmpty(alertInfo) && <Alert alertInfo={alertInfo} onDurationEnd={setAlertInfo} duration={3000} />}

      <section >
        <h1 className='h5 mb-0 header p-3'>Emergency Message Configuration</h1>
        <form>
          <div className='p-3'>
            <div className='align-items-baseline col-4'>
              <p className='border-bottom font-weight-bold pb-2'>Select Locality Type</p>
              <div className="form-inline" style={{ "gap": "1rem" }}>
                <div className="input-group">
                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="all" value="ALL" name="Area" checked={"ALL" === selectedArea} onClick={() => handleAreaSelection("ALL")} />
                    <label className="custom-control-label" for="all">ALL</label>
                  </div>
                </div>
                <div className="input-group">
                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="state" value="STATE" name="Area" checked={"STATE" === selectedArea} onClick={() => handleAreaSelection("STATE")} />
                    <label className="custom-control-label" for="state">State</label>
                  </div>
                </div>
                <div className="input-group">
                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="city" value="CITY" checked={"CITY" === selectedArea} onClick={() => handleAreaSelection("CITY")} />
                    <label className="custom-control-label" for="city">City</label>
                  </div>
                </div>
                <div className="input-group">
                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="warehouseid" value="WAREHOUSEID" name="Area" checked={"WAREHOUSEID" === selectedArea} onClick={() => handleAreaSelection("WAREHOUSEID")} />
                    <label className="custom-control-label" for="warehouseid">WAREHOUSEID</label>
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

              {areaSec && <div className='mt-3'>
                <div class="form-group has-float-label mb-3">
                  <input type='text' autoComplete='off' name='areaName' class="form-control" rows={1} placeholder=" " id="areaName" value={areaName} onChange={handleAreaNameChange} onBlur={handleAreaNameBlur} onFocus={handleAreaNameFocus}></input>
                  <label htmlFor="areaName" className="select-label">Enter Area Name</label>
                </div>
                {validate.isNotEmpty(areaNameError) && <ErrorMessage message={areaNameError} />}
              </div>}
            </div>

            <div className=' col-4 pt-3'>
              <div class="form-group has-float-label mb-0">
                <textarea name='emergencyMsg' class="form-control" rows={1} placeholder=" " id="emergencyMsg" value={emergencyMsg} onChange={handleEmergencyMessageChange} onBlur={handleEmergencyMessageBlur} onFocus={handleEmergencyMessageFocus}></textarea>
                <label htmlFor="emergencyMsg" className="select-label">Emergency Message</label>
              </div>
              {validate.isNotEmpty(emergencyMessageError) && <ErrorMessage message={emergencyMessageError} />}
            </div>

          </div>
        </form>

        {validate.isNotEmpty(emergencyMessagesRows) && <div className='col-8 p-3'>
          <Table bordered>
            <thead>
              <tr>
                <th>Area</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

              {Object.entries(emergencyMessagesRows).map(([key, value]) => {
                return (
                  <tr>
                    <td>{key.replace('_', ':')}</td>
                    <td>{value}</td>
                    <td onClick={() => deleteEmergencyMsg(key)}> <button className='btn brand-secondary rounded-pill'>Remove</button></td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
        }
              <div className='d-flex  justify-content-end p-3'>
                <button type='button' role='button' class='brand-secondary btn px-5 rounded-pill' onClick={resetData}>clear</button>
                <button type='submit' role='button' class='btn-brand-gradient btn px-5 rounded-pill ml-3' onClick={onSubmitCreateEmergencyMessage}>Save</button>
              </div>
      </section>
    </React.Fragment >
  );
};

export default EmergencyMessageConfiguration;
