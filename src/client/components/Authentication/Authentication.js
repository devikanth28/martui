import Validate from "../../helpers/Validate";
import LocalDB from "../../DataBase/LocalDB";
import Cookies from "js-cookie";

const Authentication = {
  /*isLoggedInThroughMobile(userInfo) {
    if (
      Validate().isNotEmpty(userInfo) &&
      Validate().isNotEmpty(LocalDB.getValue("SERVICE_MOBILE_NUMBER")) &&
      Validate().isEmpty(Validate().mobileNumber(LocalDB.getValue("SERVICE_MOBILE_NUMBER")))
    ) {
      return true;
    } else {
      return false;
    }
  },*/
  isAuthenticated(userInfo) {
    if (Validate().isNotEmpty(userInfo)) {
      return true;
    } else {
      return false;
    }
  },
  
  isCookieAuthenticated(userInfo) {
	try {
	  if (Validate().isNotEmpty(userInfo.userLoginId) && Validate().isNotEmpty(LocalDB.getValue("SESSIONID"))) {
		  return true;
	  } else {
		  return false;
	  }
	} catch(err) {
	  console.log(err);
	}
  },

  cookieBasedAuth(userInfo){
    try {
      if (typeof window === 'undefined') {
        return;
      }
      if(Validate().isEmpty(window)){
        return;
      }
      if (Validate().isNotEmpty(userInfo.userLoginId) && Validate().isNotEmpty(LocalDB.getValue("SESSIONID"))) {
        return true;
      } else {
          LocalDB.setValue("fromPage",window.location.href);
          LocalDB.setValue("toPage", -2);
          return false;
      }
    } catch(err){
      console.log(err);
    }
  },

  isSubscriptionLogin(props, userInfo) {
    if ((!this.isAuthenticated(userInfo) || Validate().isEmpty(userInfo))) {
      try {
	        if (typeof window === 'undefined') {
	          return;
	        }
	        if(Validate().isEmpty(window)){
	          return;
	        }
	        let url = props.location.pathname; //window.location.pathname;
	        if (url) {
	          url = url.substring(1, url.length);
	          LocalDB.setValue("fromPage", url);
	          LocalDB.setValue("toPage", -1);
	        }
      } catch (err) {
    	  console.log(err);
      }
    }
    return (
      Validate().isNotEmpty(userInfo) && this.isAuthenticated(userInfo)
    );
  },
};

export default Authentication;