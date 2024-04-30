import React  from "react";
import CONFIG from "../../constants/ServerConfig";
import Validate from "../../helpers/Validate";
import useStaticContent from "../Common/CustomHooks/useStaticContent";
import MetaTitle from '../../commonComponents/MetaTitle';
import { getNameFromUrl } from "../../helpers/CommonUtil";

const MarketingPromo = (props) => {

    const validate = Validate();
    const promoId = props.match.params.id;

    const [isContentLoading, content] = useStaticContent({itemId: `WEB-${promoId}`,contentType:'ALL'});

    const Loader = ()=> {
        return(
        <div class="v-center-promo">
            <div class="spinner-border"></div>
        </div>
        );
    }
    const RedirectToHomepage = ()=> {
    window.location.href = CONFIG.REDIRECT_HOME_URL;
      return null;
    }
    const prepareMetaKey = (promoName)=> {
        let metakey = "";
        metakey =  getNameFromUrl(promoName);
        metakey = metakey.replaceAll(/[^a-zA-Z0-9-\\]+/g, "").replaceAll("-","_");
        metakey = `LPAGE_${metakey ? metakey : ''}`?.toUpperCase();
        return metakey;
    }

    return(<React.Fragment>
        {prepareMetaKey(promoId) && <MetaTitle metaKey={prepareMetaKey(promoId)}/>}
        {isContentLoading && <Loader/>}
        {(!isContentLoading && validate.isNotEmpty(content) && validate.isNotEmpty(content.DESC))
         && <div dangerouslySetInnerHTML={{ __html: content.DESC }}/>}
        {(!isContentLoading && (validate.isEmpty(content) || validate.isEmpty(content.DESC))) && <RedirectToHomepage/>}
        </React.Fragment>);    
}
export default MarketingPromo;