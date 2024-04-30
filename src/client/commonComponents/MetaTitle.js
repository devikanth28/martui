import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Validate from "../helpers/Validate";
import MetaDataService from "../services/MetaDataService";

const MetaTitle=(props)=>{

    const [metaTitle,setMetaTitle] = useState('');
    const validate =Validate();
    const metaDataService = MetaDataService();
    useEffect(()=>{
        if(validate.isNotEmpty(props.metaKey)){
            getMetaTitle();
        }
    },[props.metaKey]);

    const getMetaTitle=()=>{
        const params={};
        params['metaKey'] = props.metaKey;
        if(validate.isNotEmpty(props.isDefaultRequired)){
            params['isDefaultRequired'] =props.isDefaultRequired;
        }
        metaDataService.getMetaInformation(params).then(response=>{
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === "SUCCESS"){
                if(validate.isNotEmpty(response?.dataObject?.metaTitle)){
                setMetaTitle(response.dataObject.metaTitle); 
                }
                else{
                    setMetaTitle("");
                }
            }     
           }).catch(err=>{
            console.log(err);
            setMetaTitle("");
           });
    }
return (
    <React.Fragment>
            {(validate.isNotEmpty(metaTitle) || validate.isNotEmpty(props.defaultValue)) &&
            <Helmet>
                <title>{validate.isNotEmpty(metaTitle) ? metaTitle : props.defaultValue}</title>
            </Helmet> 
            }
    </React.Fragment>
    );
}

export default MetaTitle;