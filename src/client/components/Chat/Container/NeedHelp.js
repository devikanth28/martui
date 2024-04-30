import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import UserInfoAction from "../../../../redux/action/UserInfoAction";
import LocalDB from "../../../DataBase/LocalDB";
import CONFIG from "../../../constants/ServerConfig";
import Validate from "../../../helpers/Validate";
import ChatDialog from "../Common/ChatDialog";
import "../css/NeedHelp.css";

const NeedHelp = (props) => {
  const orderId = props.chatHeaderDetails.orderId;
  const customerId = UserInfoAction().getUserInfo().medplusId;
  const [user, setUser] = useState(null);
  const [extras, setExtras] = useState(null);

  useEffect(() => {
    if(props.startChat){
      setBotTokens();
      return () => { };
    }
  }, [props.startChat]);


  const setBotTokens = async () => {
    Cookies.remove("s_token");
    let tokenId = LocalDB.getValue("SESSIONID");
    let existingBotToken = Cookies.get("b_token");
    const botDetails = await getBotTokens(tokenId, existingBotToken);
    if (Validate().isNotEmpty(botDetails)) {
      if (Validate().isNotEmpty(botDetails.b_token)) {
        const botToken = decodeURIComponent(botDetails.b_token);
        Cookies.set('b_token', botToken, {path: '/', secure:true});
      }
      if (Validate().isNotEmpty(botDetails.s_token)) {
        const sessionToken = botDetails.s_token;
        Cookies.set('s_token', sessionToken, {path: '/', secure:true});
      }
      setUser({ id: generateTerminalId(customerId, orderId) });
      setExtras(generateExtras(props.chatHeaderDetails.displayOrderId, orderId));
    }
  }

  const getBotTokens = async (tokenId, botToken) => {
    let response = null;
    await axios.get(CONFIG.API.BOT.GET_BOT_TOKEN.PATH, {
        params: { tokenId: tokenId, botToken: botToken },
      }).then((res) => {
        if (res && res.data && res.data.statusCode == "SUCCESS") {
          response = res.data.dataObject;
        }
      }).catch((err) => {
        console.log(err);
      });
    return response;
  }

  const generateTerminalId = (customerId, orderId) => {
    if (!customerId) {
      return null;
    }
    const terminalInfo = {
      tabId:
        new Date().getTime().toString(36) + Math.random().toString(36).slice(2),
    };
    if (customerId) {
      terminalInfo["customerId"] = customerId;
    }
    let sessionToken = Cookies.get("s_token");
    if (sessionToken) {
      terminalInfo["sessionToken"] = sessionToken;
    }
    terminalInfo["refId"] = orderId;
    terminalInfo["refType"] = "ORDER";
    terminalInfo["timestamp"] = new Date().getTime();
    let terminalId = btoa(JSON.stringify(terminalInfo));
    Cookies.set("terminal_id", terminalId, {path: '/' });
    return btoa(JSON.stringify(terminalInfo));
  };

  const generateExtras = (displayOrderId, orderId) => {
    if (!orderId) {
      return null;
    }
    return {
      eventType: props.eventType || "ORDER_CHAT",
      orderId: orderId,
      displayOrderId: displayOrderId ? displayOrderId : orderId ,
      loadHistory: { loadBy: "orderId" },
    };
  };

  const scrollBottom = (messageWindowRef) =>{
    if (messageWindowRef && messageWindowRef.current) {
      const scrollHeight = messageWindowRef.current.scrollHeight;
      messageWindowRef.current.scrollTo(0, scrollHeight);
      if(props.parentScrollBottom){
        props.parentScrollBottom();
      }
    }
  }

  return (
    <React.Fragment>
      {props.startChat && 
        <div id="embedded_messenger_sidebar_modal" className="pb-3">
          <ChatDialog chatHeaderDetails={props.chatHeaderDetails} toggleChat={props.toggleChat} user={user} extras={extras} scrollBottom={scrollBottom} application = {"WEB"} />
        </div>
      }
    </React.Fragment>
  );
};

export default NeedHelp;