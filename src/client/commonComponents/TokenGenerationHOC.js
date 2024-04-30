import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import UserInfoAction from "../../redux/action/UserInfoAction";
import { SET_LAB_SELECTED_LOCALITY, SET_SELECTED_LOCALITY } from "../../redux/reducer/LocalityReducer";
import { SET_TOKEN_VALIDATE } from "../../redux/reducer/TokenValidateReducer";
import LocalDB from "../DataBase/LocalDB";
import { removeCustomerDetailsFromRedux } from "../helpers/CommonUtil";
import Validate from "../helpers/Validate";
import MyAccountService from "../services/MyAccountService";
import { SET_ALL_VERSION_DATA } from "../../redux/reducer/VersionConfigurationReducer";
import { RESET_MART_CATALOG_DATA } from "../../redux/reducer/MedplusCatalogReducer";

const TokenGenerationHOC = (Component) => {

    return withRouter((props) => {

        const [tokenLoader, setTokenLoader] = useState(true);
        const [versionLoader, setVersionLoader] = useState(true);

        const dispatch = useDispatch();
        const validate = Validate();
        const userInfoAction = UserInfoAction();
        const myAccountService = MyAccountService();
        const locality = useSelector(state => state.locality && state.locality.selectedLocality);
        const isValidToken = useSelector(state => state.tokenValidateReducer && state.tokenValidateReducer.isValidToken);
        const versionData = useSelector(state => state.versionConfigurationReducer && state.versionConfigurationReducer.versionData);

        useEffect(()=> {
            const tokenId = LocalDB.getValue("SESSIONID");
            if(!isValidToken){
                if ((validate.isNotEmpty(tokenId))) {
                    validateToken();
                } else if(validate.isEmpty(tokenId)){
                    setTokenLoader(true);
                    removeCustomerDetailsFromRedux()
                    generateToken();
                }
                setVersionLoader(true);
                getVersionKeys();
            } else {
                setTokenLoader(false);
                setVersionLoader(false);
            }
        },[isValidToken]);

        const generateToken = async () => {
            await myAccountService.generateToken({anonymousUser : "anonymous", LOCALITY : validate.isNotEmpty(locality) ? JSON.stringify(locality) : undefined}).then((data) => {
                if(validate.isNotEmpty(data) && data.statusCode == "SUCCESS" && validate.isNotEmpty(data.dataObject)){
                    LocalDB.setValue("SESSIONID", data.dataObject.tokenId);
                    dispatch({ type: SET_TOKEN_VALIDATE, data: true });
                    setLocalityInRedux(data.dataObject.locInfo, data.dataObject.labLocalityInfo);
                }
                setTokenLoader(false);
            }).catch((error) => {
                console.log(error);
                setTokenLoader(false);
            })
        }

        const validateToken = async () => {
            await myAccountService.validateToken({LOCALITY : validate.isNotEmpty(locality) ? JSON.stringify(locality) : undefined}).then(async (data) => {
                if(validate.isNotEmpty(data) && data.statusCode == "SUCCESS" && validate.isNotEmpty(data.dataObject)){
                    LocalDB.setValue("SESSIONID", data.dataObject.tokenId);
                    dispatch({ type: SET_TOKEN_VALIDATE, data: true });
                    setLocalityInRedux(data.dataObject.locInfo, data.dataObject.labLocalityInfo);
                    if(validate.isNotEmpty(data.dataObject.customer)){
                        await userInfoAction.reloadUserInfo();
                    } else {
                        removeCustomerDetailsFromRedux();
                    }
                }
                setTokenLoader(false);
            }).catch((error) => {
                console.log(error);
                setTokenLoader(false);
            })
        }

        const setLocalityInRedux =(locality, labLocality)=>{
            if(locality){
                dispatch({
                    type: SET_SELECTED_LOCALITY,
                    data: locality
                });
            }
            if(Validate().isNotEmpty(labLocality)){
                dispatch({
                    type: SET_LAB_SELECTED_LOCALITY,
                    data: labLocality
                });
            }
        }

        const getVersionKeys = () => {
            myAccountService.getVersionKeys().then((data) => {
                if(data.statusCode == "SUCCESS" && validate.isNotEmpty(data.dataObject)){
                    dispatch({type : SET_ALL_VERSION_DATA, data: data.dataObject});
                    if(validate.isNotEmpty(versionData)){
                        if(versionData.MART_CATALOG_VERSION_NO !==  data.dataObject.MART_CATALOG_VERSION_NO || versionData.MART_VERSION_NO !== data.dataObject.MART_VERSION_NO){
                            dispatch({type:RESET_MART_CATALOG_DATA});
                        }
                    }
                }
                setVersionLoader(false);
            }).catch((error) => {
                console.log(error);
                setVersionLoader(false);
            })
        }

        if(tokenLoader || versionLoader){
            return(
                <React.Fragment/>
            )
        }
        return <Component {...props}/>
    })
}

export default TokenGenerationHOC;