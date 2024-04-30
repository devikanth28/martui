import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CommonDropDown from "../../Common/CommonDropDown";
import BreadCrumbAction from "../../../../../../redux/action/BreadCrumbAction";
import MartAdminService from "../../../../services/MartAdminService";
import { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "../../../../../components/Common/Alert";

const MainNavigationForCatalog = (props) => {

    const [catalogIds, setCatalogIds] = useState([]);
    const [selectedCatalogId, setSelectedCatalogId] = useState(undefined);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });


    const breadCrumbAction = BreadCrumbAction();

    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: "Main Navigation for Catalog", url: props.location.pathname });
        getCatalogs();
    }, []);

    const getCatalogs = () => {
        MartAdminService().getCatalogs().then(response => {
            if("SUCCESS" === response?.statusCode && response.dataObject?.catalogIds) {
                setCatalogIds([...['ALL'],...response.dataObject.catalogIds]);
            } else {
                setAlertInfo({ message: response?.message ? response.message : 'Unable to get catalogIds', type: ALERT_TYPE_ERROR });
            }
        }).catch(err => {
            console.log(err);
            setAlertInfo({ message: 'Something went wrong!', type: ALERT_TYPE_ERROR });
        })
    }
    
    const handleSubmit = () => {
        MartAdminService().generateMainNavigation({catalogId: selectedCatalogId !== 'ALL' ? selectedCatalogId : null}).then(response => {
            if("SUCCESS" === response?.statusCode && response.message) {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_SUCCESS });
            } else {
                setAlertInfo({ message: response?.message ? response.message : 'Unable to generate main navigation', type: ALERT_TYPE_ERROR });
            }
        }).catch(err => {
            console.log(err);
            setAlertInfo({ message: 'Request has been timed-out', type: ALERT_TYPE_ERROR });
        })
    }

    const handleAreaSelection = (catalogId) => {
        setSelectedCatalogId(catalogId)
    }

    return <CommonDropDown selectTypes = {catalogIds} handleSubmit = {handleSubmit} title = {"Main Navigation for Catalog"} initialText = { selectedCatalogId ? selectedCatalogId : "All"} handleAreaSelection = {handleAreaSelection} alertInfo={alertInfo} setAlertInfo={setAlertInfo} />

}

export default MainNavigationForCatalog;