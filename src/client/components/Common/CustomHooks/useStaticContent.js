import { useEffect, useState } from "react"
import Validate from "../../../helpers/Validate";
import LabCatalogService from "../../MedplusLabs/Services/LabCatalogService";

const useStaticContent = (requestObject) => {

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [content, setContent] = useState({});

    const validate = Validate();

    useEffect(() => {
        getStaticContent(requestObject);
    }, [requestObject.itemId]);

    const getStaticContent = (requestObject) => {
        if(validate.isEmpty(requestObject) || validate.isEmpty(requestObject.itemId)){
            setIsContentLoading(false);
            return;
        }
        LabCatalogService().getLabStaticContent(requestObject).then((response) => {
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode){
                if(validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.result)){
                    setContent(response.dataObject.result);
                }
            } else {
                setContent({});
            }
            setIsContentLoading(false);
        }).catch(function(error) {
            console.log("Error while getting category description", error);
            setIsContentLoading(false);
        });
    }

    return [isContentLoading, content]
}

export default useStaticContent;