import React, { useEffect } from "react";
import Validate from "../../helpers/Validate";
import LocalDB from "../../DataBase/LocalDB";
import Cookies from "js-cookie";
import CONFIG from "../../constants/ServerConfig";
import axios from "axios";

const BotHelper = () => {

    const validate = Validate();

    useEffect(() => {
        if(validate.isEmpty(Cookies.get("b_token") || validate.isEmpty(Cookies.get("s_token")))){
            setBotTokens();
        }
    },[]);

    const setBotTokens = async () => {
        Cookies.remove("s_token");
        Cookies.remove("b_token");
        let sessionId = LocalDB.getValue("SESSIONID");
        let existingBotToken = Cookies.get("b_token");
        const botDetails = await getBotTokens(sessionId, existingBotToken);
        if (validate.isNotEmpty(botDetails)) {
          if (validate.isNotEmpty(botDetails.b_token)) {
            const botToken = decodeURIComponent(botDetails.b_token);
            Cookies.set('b_token', botToken, {path: '/', secure:true});
          }
          if (validate.isNotEmpty(botDetails.s_token)) {
            const sessionToken = botDetails.s_token;
            Cookies.set('s_token', sessionToken, {path: '/', secure:true});
          }
        }
      }
    
      const getBotTokens = async (sessionId, botToken) => {
        let response = null;
        await axios.get(CONFIG.API.BOT.GET_BOT_TOKEN.PATH, {
            params: { SESSIONID: sessionId, botToken: botToken },
          }).then((res) => {
            if (res && res.data && res.data.statusCode == "SUCCESS") {
              response = res.data.dataObject;
            }
          }).catch((err) => {
            console.log(err);
          });
        return response;
      }

    return(
        <></>
    )

}

export default BotHelper;