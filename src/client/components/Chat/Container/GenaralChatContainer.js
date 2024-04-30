import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import GeneralChatDialog from "../Common/GeneralChatDialog";
import MyAccountService from "../../../services/MyAccountService";
import "../css/NeedHelp.css";
import LocalDB from "../../../DataBase/LocalDB";

const GeneralChatContainer = (props) => {
  let sessionToken = LocalDB.getValue("SESSIONID");
  const [user, setUser] = useState(null);
  const [extras, setExtras] = useState(null);
  const myAccountService = MyAccountService();
  useEffect(()=>{
    if(window.parent.location.href.endsWith("chatbot")){
      window.parent.location.href = window.parent.location.href.replace("chatbot","");
      return;
    }
  },[]);
  useEffect(() => {
    if(sessionToken) {
      myAccountService.getLoggedInUserInfo().then(response => {
        if(response != null && response.statusCode != null && "SUCCESS" == response.statusCode && response.dataObject.userInfo) {
          setUser({ id: generateTerminalId(response.dataObject.userInfo.medplusId) });
          setExtras(generateExtras(response.dataObject.userInfo.medplusId));
        } else {
          setUser({ id: generateTerminalId(-1) });
          setExtras(generateExtras(-1));
        }
      }).catch(function(error) {
          console.log(error);
          setUser({ id: generateTerminalId(-1) });
          setExtras(generateExtras(-1));
      })
    } else {
      setUser({ id: generateTerminalId(-1) });
      setExtras(generateExtras(-1));
    }
    return () => { };
  },[sessionToken]);

  const generateTerminalId = (customerId) => {
      const terminalInfo = {
        tabId:
          new Date().getTime().toString(36) + Math.random().toString(36).slice(2),
      };
      if (sessionToken) {
        terminalInfo["customerId"] = customerId;
        terminalInfo["refId"] = customerId;
        terminalInfo["refType"] = "LOGGEDIN_GENERAL";
        terminalInfo["sessionToken"] = sessionToken;
      } else {
        terminalInfo["customerId"] = -1;
        terminalInfo["refType"] = "ANONYMOUS_GENERAL";
      }
      terminalInfo["timestamp"] = new Date().getTime();
      let terminalId = btoa(JSON.stringify(terminalInfo));
      Cookies.set("terminal_id", terminalId, {path: '/' });
      return terminalId;
  };

  const generateExtras = (customerId) => {
      if(sessionToken){
        return {
            eventType: "GENERAL_CHAT",
            customerId: customerId,
            loadHistory: { loadBy: "customerId" },
          };
      } else {
        return {
            eventType: "GENERAL_CHAT",
          };
      }
  };

  const scrollBottom = (messageWindowRef) =>{
    if (messageWindowRef && messageWindowRef.current) {
      const scrollHeight = messageWindowRef.current.scrollHeight;
      messageWindowRef.current.scrollTo({
        left: 0,
        top: scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  return (
    <React.Fragment>
        <div id="embedded_messenger">
          <GeneralChatDialog user={user} scrollBottom={scrollBottom} extras={extras} application = {"WEB"} />
        </div>
    </React.Fragment>
  );
};

export default GeneralChatContainer;