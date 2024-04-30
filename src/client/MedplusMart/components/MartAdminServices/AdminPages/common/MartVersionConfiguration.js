import React, { useEffect, useState } from "react";
import BreadCrumbAction from "../../../../../../redux/action/BreadCrumbAction";
import Alert, { ALERT_TYPE_ERROR } from "../../../../../components/Common/Alert";
import MartAdminService from "../../../../services/MartAdminService";
import {Table } from 'reactstrap';
import Validate from "../../../../../helpers/Validate";
const MartVersionConfiguration = (props) => {
    const [martVersion, setMartVersion] = useState(undefined);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const breadCrumbAction = BreadCrumbAction();
    let staticDisplayData = [{ 'COOKIE VERSION': 'MART_VERSION_NO' }, { 'LAB VERSION': 'LAB_VERSION_NO' }, { 'LAB OUTER VERSION': 'LAB_OUTER_VERSION_NO' }]
    const validate = Validate();
    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: ' Mart Version Configuration', url: props.location.pathname });
        changeVersion();
    }, [])

    const closeAlertMessage = () => {
        setAlertInfo({ message: "", type: "" });
      }

    const changeVersion = (e) => {
        MartAdminService().changeVersion({ name: e?e.target.value:null }).then(response => {
            if(response.statusCode=='SUCCESS'){
                setMartVersion(response.dataObject);
            }else{
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    console.log("martVersions",martVersion)
    return (
        <React.Fragment>
            {martVersion &&
            <section className="admin-screen">
                        <h1 className='h5 p-3 border-bottom mb-0'>Mart Version Configuration</h1>
                {validate.isNotEmpty(staticDisplayData) && <div className='col-8 p-3'>
          <Table bordered className="p-3">
            <thead>
              <tr>
                <th>Key Name</th>
                <th>Current Version</th>
                <th>Actions</th>
              </tr>
            </thead>
            {staticDisplayData.map(obj => {
                                    let value = Object.values(obj)[0];
                                    let key = Object.keys(obj)[0];
                                    return (
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {key}
                                                </td>
                                                <td>
                                                    {martVersion ? martVersion[value] : 0}
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-brand-gradient rounded-pill px-3" value={value} onClick={event => { changeVersion(event) }}>Increment</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                        );
                                })}
          </Table>
        </div>
        }
                    {/* <div className=" d-flex justify-content-center p-4">
                        <div>
                            <table className="table table-responsive table-hover">
                                <thead>
                                    <tr className="bg-gray">
                                        <th>
                                            Key Name
                                        </th>
                                        <th className="text-center">
                                            Current Version
                                        </th>
                                        <th className="text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                {staticDisplayData.map(obj => {
                                    let value = Object.values(obj)[0];
                                    let key = Object.keys(obj)[0];
                                    return (
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {key}
                                                </td>
                                                <td className="text-center">
                                                    {martVersion ? martVersion[value] : 0}
                                                </td>
                                                <td className="text-center">
                                                    <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" value={value} onClick={event => { changeVersion(event) }}>Increment</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                        );
                                })}
                            </table>
                        </div>
                    </div> */}
                <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000' />
            </section>}
        </React.Fragment>
    );
};

export default MartVersionConfiguration;